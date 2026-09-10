// Progressive enhancement: if the browser lacks CSS scroll-driven animations
// (Safari < 18, Firefox < 132), fall back to IntersectionObserver reveals.
(function () {
  var supported = CSS.supports('animation-timeline: view()');
  if (!supported) {
    document.documentElement.classList.add('no-sda');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

    // hero fade, done cheaply on scroll
    var media = document.querySelector('.hero-media');
    if (media) {
      var onScroll = function () {
        var p = Math.min(1, window.scrollY / (window.innerHeight * 0.9));
        media.style.opacity = String(1 - p);
        media.style.transform = 'scale(' + (1 + p * 0.06) + ')';
      };
      addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
