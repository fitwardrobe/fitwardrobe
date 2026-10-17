import { SITE_CONFIG } from "@/lib/config";

// Site-wide structured data. The homepage adds its own FAQPage built from the
// visible FAQ (src/data/home.ts), so answers in search always match the page.
export const GLOBAL_SCHEMAS = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FitWardrobe",
    "url": SITE_CONFIG.landingUrl,
    "logo": `${SITE_CONFIG.landingUrl}/brand/icon-512.png`,
    "founder": {
      "@type": "Person",
      "name": "Aryan Panwar",
      "url": "https://aryanpanwar.in"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": SITE_CONFIG.contactEmail,
      "contactType": "customer support"
    },
    "sameAs": [
      "https://instagram.com/fitwardrobe",
      "https://x.com/fitwardrobe",
      SITE_CONFIG.telegramUrl,
      SITE_CONFIG.discordUrl,
      SITE_CONFIG.social.github
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FitWardrobe",
    "url": SITE_CONFIG.landingUrl
  }
];
