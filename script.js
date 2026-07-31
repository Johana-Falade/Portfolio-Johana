(function () {
  'use strict';

  // ===== SCROLL REVEAL =====
  var els = document.querySelectorAll('.js-reveal');
  if (els.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    els.forEach(function (el) { obs.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ===== HEADER SCROLL =====
  var header = document.getElementById('siteNav');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('js-scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  // ===== SMOOTH SCROLL + CLOSE MOBILE NAV =====
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
      var collapse = document.getElementById('navCollapse');
      if (collapse && collapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(collapse).hide();
      }
    });
  });

  // ===== ESCAPE CLOSES MOBILE NAV =====
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var collapse = document.getElementById('navCollapse');
    if (collapse && collapse.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(collapse).hide();
      var toggler = document.querySelector('.navbar-toggler');
      if (toggler) toggler.focus();
    }
  });

  // ===== CLICK OUTSIDE CLOSES MOBILE NAV =====
  document.addEventListener('click', function (e) {
    var collapse = document.getElementById('navCollapse');
    var toggler = document.querySelector('.navbar-toggler');
    if (collapse && collapse.classList.contains('show') &&
        !collapse.contains(e.target) && !toggler.contains(e.target)) {
      bootstrap.Collapse.getOrCreateInstance(collapse).hide();
    }
  });

  // ===== ACTIVE NAV LINK =====
  var sections = document.querySelectorAll('section[id]');
  var links = document.querySelectorAll('.navbar-nav .nav-link');
  function highlight() {
    var y = window.scrollY + 120;
    sections.forEach(function (s) {
      if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
        var id = s.getAttribute('id');
        links.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }
  if (sections.length) {
    window.addEventListener('scroll', highlight, { passive: true });
    highlight();
  }

})();
