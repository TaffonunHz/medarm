    (function(){
      // basic helpers
      function q(sel){return document.querySelector(sel)}
      function qa(sel){return Array.prototype.slice.call(document.querySelectorAll(sel))}

      document.addEventListener('DOMContentLoaded', function () {
        // year
        var yearEl = q('#year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

        // close mobile menu on nav click
        var navToggle = q('#nav-toggle');
        var navLinks = qa('.nav-links a');
        if (navLinks && navToggle) {
          navLinks.forEach(function (link) {
            link.addEventListener('click', function () { navToggle.checked = false; });
          });
        }

        // image modal
        var imgs = qa('.gallery-grid .img-wrap img, .about .img-wrap img');
        if (imgs.length) {
          var modal = document.createElement('div');
          Object.assign(modal.style, {
            position:'fixed', inset:'0', background:'rgba(0,0,0,0.6)', display:'flex',
            alignItems:'center', justifyContent:'center', padding:'20px', zIndex:9999,
            cursor:'zoom-out', visibility:'hidden', opacity:0, transition:'opacity 200ms ease'
          });
          var modalImg = document.createElement('img');
          Object.assign(modalImg.style, { maxWidth:'100%', maxHeight:'100%', borderRadius:'10px' });
          modal.appendChild(modalImg);
          document.body.appendChild(modal);
          function showModal(src, alt){ modalImg.src = src; modalImg.alt = alt||''; modal.style.visibility='visible'; modal.style.opacity=1; }
          function hideModal(){ modal.style.opacity=0; setTimeout(function(){ modal.style.visibility='hidden'; modalImg.src=''; },200); }
          imgs.forEach(function(img){ img.style.cursor='zoom-in'; img.addEventListener('click', function(e){ showModal(e.currentTarget.src, e.currentTarget.alt); }); });
          modal.addEventListener('click', hideModal);
          document.addEventListener('keydown', function(e){ if(e.key==='Escape') hideModal(); });
        }

        // ===== hide-on-scroll: header shows on scroll up, hides on scroll down =====
        var header = q('header');
        if (!header) return;

        var lastScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        var ticking = false;
        var delta = 8;             // минимальный шаг для реакции
        var showOffset = 64;       // если близко к верху (px), всегда показываем

        // ensure initial classes
        header.classList.remove('hidden');
        header.classList.add('visible');

        window.addEventListener('scroll', function() {
          lastKnownScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
          if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
          }
        }, {passive:true});

        var lastKnownScrollY = lastScrollY;

        function updateHeader() {
          var currentY = lastKnownScrollY;
          var diff = currentY - lastScrollY;

          // если прокрутили вниз больше порога и не у верха — прячем
          if (diff > delta && currentY > showOffset) {
            if (!header.classList.contains('hidden')) {
              header.classList.remove('visible');
              header.classList.add('hidden');
            }
          }
          // если прокрутили вверх больше порога — показываем
          else if (diff < -delta || currentY <= showOffset) {
            if (!header.classList.contains('visible')) {
              header.classList.remove('hidden');
              header.classList.add('visible');
            }
          }
          lastScrollY = currentY;
          ticking = false;
        }
        // =======================================================================
      });
    })();