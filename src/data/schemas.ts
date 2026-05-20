import { SITE_CONFIG } from "@/lib/config";

export const GLOBAL_SCHEMAS = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FitWardrobe",
    "url": SITE_CONFIG.landingUrl,
    "logo": `${SITE_CONFIG.landingUrl}/assets/logo.png`,
    "contactPoint": { 
      "@type": "ContactPoint", 
      "email": SITE_CONFIG.contactEmail, 
      "contactType": "customer support" 
    },
    "sameAs": [
      "https://instagram.com/fitwardrobe", 
      SITE_CONFIG.telegramUrl, 
      SITE_CONFIG.social.github
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FitWardrobe",
    "alternateName": ["Fit Wardrobe", "FitWardrobe App"],
    "applicationCategory": "LifestyleApplication",
    "applicationSubCategory": "Wardrobe Management & AI Styling",
    "description": "Privacy-first AI wardrobe organizer and outfit planner. FitWardrobe stores your clothing photos locally and uses Google Gemini and Groq AI to suggest outfits, build capsule wardrobes, and track cost per wear without cloud uploads.",
    "operatingSystem": ["Android"],
    "softwareRequirements": "Android 8.0+ (iOS support planned for 2026)",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "AI outfit suggestions (Powered by Groq)",
      "Automatic clothing recognition (Powered by Gemini)",
      "Capsule wardrobe builder",
      "Local photo storage & Privacy-first design",
      "Cost per wear tracking",
      "Digital wardrobe organization",
      "Seasonal wardrobe management",
      "No cloud data sharing"
    ],
    "keywords": "wardrobe app, outfit planner, capsule wardrobe, AI wardrobe, privacy wardrobe app, wardrobe organizer, stylebook alternative android, clothing organization, minimalist wardrobe, outfit planner app",
    "softwareVersion": "1.0.1 Beta",
    "author": {
      "@type": "Organization",
      "name": "FitWardrobe",
      "url": SITE_CONFIG.landingUrl
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { 
        "@type": "Question", 
        "name": "What exactly is a Beta?", 
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": "Beta means the app is in the final stages of testing. Most features work perfectly, but you might occasionally encounter minor bugs." 
        } 
      },
      { 
        "@type": "Question", 
        "name": "Is my data really private?", 
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": "Yes. FitWardrobe is built with a local-first philosophy. Your clothing photos and personal style data remain encrypted on your device and never leave your control." 
        } 
      },
      { 
        "@type": "Question", 
        "name": "When will the iOS version be available?", 
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": "The iOS TestFlight beta is expected in March 2026. Join the Telegram channel to be first to know." 
        } 
      },
      { 
        "@type": "Question", 
        "name": "Will the app remain free after beta?", 
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": "Yes. Core privacy-first styling features will always be free. Beta testers receive early adopter status with free access to any future premium features." 
        } 
      }
    ]
  }
];
