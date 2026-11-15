// Progressive enhancement: if the browser lacks CSS scroll-driven animations
// (Safari < 18, Firefox < 132), drive the same effect from a scroll listener.
(function () {
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supported = CSS.supports('animation-timeline: view()');

  if (!supported && !reduced) {
    document.documentElement.classList.add('no-sda');

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  }

  // The veil rides the scroll for every browser. CSS scroll timelines measure
  // progress against the whole document, so a viewport-sized range does not
  // survive the remap; this does.
  if (!reduced) {
    var veil = document.querySelector('.hero-veil');
    var hint = document.querySelector('.scroll-hint');
    if (veil) {
      var apply = function () {
        var p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.88)));
        veil.style.transform = 'translateY(' + (100 - p * 100) + '%)';
        if (hint) hint.style.opacity = String(Math.max(0, 1 - p * 2.5));
      };
      addEventListener('scroll', apply, { passive: true });
      addEventListener('resize', apply, { passive: true });
      apply();
    }
  }

  // Language. The inline script in <head> already picked it (?lang= > saved
  // choice > Portuguese) before the page painted; here the buttons get wired,
  // and the title, description and translated attributes follow the choice.
  var root = document.documentElement;
  var ptTitle = document.title;
  var metaDesc = document.querySelector('meta[name="description"]');
  var ptDesc = metaDesc ? metaDesc.getAttribute('content') : '';
  var ATTRS = ['alt', 'title', 'aria-label'];

  function setLang(lang, save) {
    var en = lang === 'en';
    root.setAttribute('data-lang', en ? 'en' : 'pt');
    root.lang = en ? 'en' : 'pt-BR';
    document.title = en ? (root.dataset.titleEn || ptTitle) : ptTitle;
    if (metaDesc) metaDesc.setAttribute('content', en ? (root.dataset.descEn || ptDesc) : ptDesc);
    ATTRS.forEach(function (a) {
      document.querySelectorAll('[data-en-' + a + ']').forEach(function (el) {
        if (!el.hasAttribute('data-pt-' + a)) el.setAttribute('data-pt-' + a, el.getAttribute(a) || '');
        el.setAttribute(a, el.getAttribute((en ? 'data-en-' : 'data-pt-') + a));
      });
    });
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === (en ? 'en' : 'pt')));
    });
    if (save) { try { localStorage.setItem('lang', en ? 'en' : 'pt'); } catch (e) {} }
  }

  setLang(root.getAttribute('data-lang'), false);
  document.querySelectorAll('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-set-lang'), true); });
  });

  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
