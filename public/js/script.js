/* ============================================================
   FitWardrobe v2 — Script
   ============================================================ */
(function () {
  'use strict';

  /* --------------------------------------------------------
     1. Scroll-triggered reveal animations (IntersectionObserver)
     -------------------------------------------------------- */
  function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(function (el) {
        el.classList.add('reveal--visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --------------------------------------------------------
     2. Sticky nav shadow on scroll
     -------------------------------------------------------- */
  function initNavScroll() {
    var nav = document.getElementById('nav');
    if (!nav) return;

    var scrolled = false;

    function onScroll() {
      var shouldBeScrolled = window.scrollY > 10;
      if (shouldBeScrolled !== scrolled) {
        scrolled = shouldBeScrolled;
        nav.classList.toggle('nav--scrolled', scrolled);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --------------------------------------------------------
     3. Mobile navigation
     -------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.getElementById('navToggle');
    var mobile = document.getElementById('mobileMenu');
    var overlay = document.getElementById('navOverlay');
    if (!toggle || !mobile || !overlay) return;

    var isOpen = false;

    function openMenu() {
      isOpen = true;
      toggle.classList.add('nav__toggle--open');
      toggle.setAttribute('aria-expanded', 'true');
      mobile.classList.add('nav__mobile--open');
      overlay.classList.add('nav__overlay--visible');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      isOpen = false;
      toggle.classList.remove('nav__toggle--open');
      toggle.setAttribute('aria-expanded', 'false');
      mobile.classList.remove('nav__mobile--open');
      overlay.classList.remove('nav__overlay--visible');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      isOpen ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    // Close on link click
    var links = mobile.querySelectorAll('.nav__mobile-link, .nav__mobile-cta a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* --------------------------------------------------------
     4. Smooth scroll for anchor links
     -------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        var navHeight = document.getElementById('nav')
          ? document.getElementById('nav').offsetHeight
          : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

        window.scrollTo({ top: top, behavior: 'smooth' });

        // Update URL hash without scroll jump
        history.pushState(null, '', targetId);
      });
    });
  }

  /* --------------------------------------------------------
     5. Active nav link highlight on scroll
     -------------------------------------------------------- */
  function initActiveNavLinks() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav__link');
    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.toggle(
                'nav__link--active',
                link.getAttribute('href') === '#' + id
              );
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* --------------------------------------------------------
     Initialize everything on DOM ready
     -------------------------------------------------------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initRevealAnimations();
    initNavScroll();
    initMobileNav();
    initSmoothScroll();
    initActiveNavLinks();
  }
})();
