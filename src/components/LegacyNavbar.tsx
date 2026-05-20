import React from 'react';

export function LegacyNavbar() {
  const html = `
  <nav class="nav" id="nav" aria-label="Main navigation">
    <div class="container nav__inner">
      <a href="/" class="nav__logo" aria-label="FitWardrobe home">
        <img class="nav__logo-icon" src="/assets/logo.png" alt="FitWardrobe Logo" width="36" height="36" loading="lazy">
        <span>FitWardrobe</span>
      </a>
      <ul class="nav__links" id="navLinks">
        <li><a href="/#features" class="nav__link">Features</a></li>
        <li><a href="/outfit-planner" class="nav__link">Outfit Planner</a></li>
        <li><a href="/blog" class="nav__link">Blog</a></li>
        <li><a href="/#download" class="nav__link">Download</a></li>
      </ul>
      <a href="/#download" class="btn btn--primary btn--sm nav__cta">Get Started Free</a>
      <button class="nav__toggle" id="navToggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobileMenu">
        <span class="nav__toggle-bar"></span>
        <span class="nav__toggle-bar"></span>
        <span class="nav__toggle-bar"></span>
      </button>
    </div>
    <div class="nav__mobile" id="mobileMenu" role="dialog" aria-label="Navigation menu">
      <a href="/#features" class="nav__mobile-link">Features</a>
      <a href="/outfit-planner" class="nav__mobile-link">Outfit Planner</a>
      <a href="/blog" class="nav__mobile-link">Blog</a>
      <a href="/#download" class="nav__mobile-link">Download</a>
      <div class="nav__mobile-cta">
        <a href="/#download" class="btn btn--primary" style="width: 100%">Get Started Free</a>
      </div>
    </div>
    <div class="nav__overlay" id="navOverlay" aria-hidden="true"></div>
  </nav>
  `;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
