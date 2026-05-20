import React from 'react';

export function LegacyFooter() {
  const html = `
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer__grid">
        <div>
          <a href="/" class="nav__logo" style="color: var(--color-cream); margin-bottom: var(--space-2)" aria-label="FitWardrobe home">
            <img class="nav__logo-icon" src="/assets/logo.png" alt="FitWardrobe Logo" width="36" height="36" loading="lazy">
            <span>FitWardrobe</span>
          </a>
          <p class="footer__brand-description">Your private AI stylist. Smart fashion advice — your wardrobe stays on your device.</p>
        </div>
        <div>
          <h3 class="footer__heading">Product</h3>
          <a href="/" class="footer__link">Home</a>
          <a href="/capsule-wardrobe" class="footer__link">Capsule Wardrobe</a>
          <a href="/outfit-planner" class="footer__link">Outfit Planner</a>
          <a href="/minimalist-wardrobe" class="footer__link">Minimalist Wardrobe</a>
          <a href="/blog" class="footer__link">Blog</a>
        </div>
        <div>
          <h3 class="footer__heading">Legal</h3>
          <a href="/privacy" class="footer__link">Privacy Policy</a>
          <a href="/terms" class="footer__link">Terms of Service</a>
          <a href="/cookies" class="footer__link">Cookie Policy</a>
        </div>
        <div>
          <h3 class="footer__heading">Connect</h3>
          <a href="mailto:fitwardrobee@gmail.com" class="footer__link">fitwardrobee@gmail.com</a>
          <a href="/support" class="footer__link">Support</a>
        </div>
      </div>
      <div class="footer__bottom">
        <span>&copy; 2026 FitWardrobe. All rights reserved.</span>
      </div>
    </div>
  </footer>
  `;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
