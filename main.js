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

  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
