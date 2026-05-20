# 👗 FitWardrobe | AI-Powered Outfit Planner
[![Built with Next.js](https://img.shields.io/badge/Next.js-15+-black?logo=next.js)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-sage.svg)](LICENSE)

FitWardrobe is a privacy-first, high-fidelity wardrobe platform that balances advanced AI features with strict data sovereignty. While wardrobe photos are processed transiently by secure cloud APIs (Google Gemini and Groq) for high-quality fashion insights, your primary fashion data and uncompressed images stay encrypted and stored on your device—ensuring your personal style never enters a permanent style profile or tracking database.

## ✨ Key Features

- **API-Level Privacy**: Clothing analysis and outfit generation powered by Google Gemini (Vision) and Groq (Reasoning), implemented with a privacy-first API configuration that prevents model training on user data.
- **Capsule Builder**: Intelligent suggestions to help you own less, but better quality.
- **Cost Per Wear**: Integrated tracking to measure the true value of your wardrobe.
- **High-Fidelity UI**: Premium, high-performance landing page with optimized reveal animations and accessibility focus.

## 🚀 Technical Architecture

- **Engine**: [Next.js 15+](https://nextjs.org/) (App Router & Static Site Generation)
- **Styling**: Hardened CSS Design System + [Tailwind CSS](https://tailwindcss.com/)
- **Structured Data**: Comprehensive JSON-LD (Organization, FAQ, SoftwareApplication, Breadcrumbs)
- **Monitoring**: Site telemetry via Google Analytics (GA4) and Vercel Speed Insights (limited to non-wardrobe interaction data).
- **Stack**: TypeScript, Radix UI, Lucide React, pnpm.

## 🛠️ Development & Deployment

### 1. Installation
```bash
pnpm install
```

### 2. Local Development
```bash
pnpm dev
```

### 3. Production Build
```bash
pnpm build
```

The optimized static output is generated in the `.next` directory, ready for deployment on [Vercel](https://vercel.com).

## 🛡️ Security & Privacy

- **Hybrid Storage & Analysis**: While uncompressed clothing photos remain encrypted and stored locally on your device, specific image-based analysis is performed via the **Google Gemini Vision API** in the cloud. This process is transient; we use a "Zero-Training" configuration that prevents AI providers from storing or using your images for model training.
- **Zero Tracker Tracking**: Your personal fashion data is never shared with analytics or advertising platforms. We maintain a strict boundary between AI analysis APIs (Gemini/Groq) and cloud trackers. Analytics (GA4) are restricted to site performance metrics and do not contain wardrobe metadata.
- **Consent & Privacy Compliance**: Use of AI features requires explicit user consent within the app. Transient images sent for analysis are handled according to our [Privacy Policy](https://fitwardrobe.me/privacy), with zero persistent server-side storage of personal photos. Basic features remain functional offline, though AI-powered styling will be limited.
- **Enterprise Hardening**: Configured with strict Security Headers (CSP, HSTS) via `vercel.json`.

---

## 📄 Legal & Compliance

- [Privacy Policy](https://fitwardrobe.me/privacy)
- [Terms of Service](https://fitwardrobe.me/terms)
- [Accessibility Statement](https://fitwardrobe.me/accessibility)

© 2026 FitWardrobe. All rights reserved.
