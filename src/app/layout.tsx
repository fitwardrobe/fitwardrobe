import Script from "next/script";
import { Jost, Noto_Serif_Display } from "next/font/google";

import "./base.css"
import "./maison.css"
import "./theme13.css"
import "./pages13.css"
import { getGlobalMetadata } from "@/lib/seo"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { RevealObserver } from "@/components/reveal-observer"
import { GLOBAL_SCHEMAS } from "@/data/schemas";
import { CLARITY_ID, CONSENT_KEY, CONSENT_REGIONS, GA_ID, INTERNAL_KEY } from "@/lib/analytics"
import { AnalyticsEvents } from "@/components/site/analytics-events"
import { ConsentBanner } from "@/components/site/consent-banner"
import { VercelAnalytics } from "@/components/site/vercel-analytics"

export const metadata = getGlobalMetadata()


// Brand faces ("Maison", Oct 2026): Noto Serif Display (a high-contrast Didone) for display,
// Jost for text. Bodoni Moda was tried first but its files carry no kerning ("W ork"). next/font
// self-hosts them with the build and adds size-adjusted fallbacks, so every visitor gets the
// real faces (the old CDN fonts with font-display: optional often fell back to Georgia/Arial).
const serif = Noto_Serif_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
})
const sans = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${sans.variable}`}>
      <head>
        {/* Structured Data (JSON-LD) */}
        {GLOBAL_SCHEMAS.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body>
        {/* Accessibility Support */}
         <a href="#content" className="fw-skip">
          Skip to main content
        </a>

        {/* Google Analytics (GA4) with Consent Mode v2.
            Order matters: consent defaults and config are queued before gtag.js loads. */}
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            var noAds = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
            gtag('consent', 'default', Object.assign({ analytics_storage: 'granted' }, noAds));
            gtag('consent', 'default', Object.assign({ analytics_storage: 'denied', region: ${JSON.stringify(CONSENT_REGIONS)}, wait_for_update: 500 }, noAds));
            var internal = false;
            try {
              var choice = localStorage.getItem('${CONSENT_KEY}');
              if (choice === 'granted' || choice === 'denied') gtag('consent', 'update', { analytics_storage: choice });
              if (/[?&]internal=1/.test(location.search)) localStorage.setItem('${INTERNAL_KEY}', '1');
              if (/[?&]internal=0/.test(location.search)) localStorage.removeItem('${INTERNAL_KEY}');
              internal = localStorage.getItem('${INTERNAL_KEY}') === '1';
            } catch (e) {}
            var parts = location.pathname.split('/').filter(Boolean);
            var first = parts[0] || '';
            var type = !first ? 'home'
              : first === 'blog' ? (parts.length > 1 ? 'blog_post' : 'blog_index')
              : ['capsule-wardrobe', 'outfit-planner', 'minimalist-wardrobe'].indexOf(first) > -1 ? 'guide'
              : ['privacy', 'terms', 'cookies', 'security', 'accessibility'].indexOf(first) > -1 ? 'legal'
              : ['support', 'ai-transparency', 'about'].indexOf(first) > -1 ? 'info' : 'other';
            gtag('js', new Date());
            var cfg = { content_group: type, page_type: type };
            if (internal) cfg.traffic_type = 'internal';
            gtag('config', '${GA_ID}', cfg);
          `}
        </Script>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
        {/* Microsoft Clarity (heatmaps, session recordings), only once a project ID is set.
            Same consent rule as GA: cookieless "no-consent" mode for European visitors until
            they accept; the founder's own visits are not recorded. Inputs are masked by default. */}
        {CLARITY_ID ? (
          <Script id="clarity-init" strategy="lazyOnload">
            {`
              (function () {
                if (/^(localhost|127\\.0\\.0\\.1|\\[::1\\])$/.test(location.hostname)) return;
                try { if (localStorage.getItem('${INTERNAL_KEY}') === '1') return; } catch (e) {}
                (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${CLARITY_ID}");
                var choice = null, tz = '';
                try { choice = localStorage.getItem('${CONSENT_KEY}'); } catch (e) {}
                try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
                var europe = tz.indexOf('Europe/') === 0 || /^Atlantic\\/(Reykjavik|Canary|Madeira|Azores|Faroe)$/.test(tz);
                var granted = choice === 'granted' || (!choice && !europe);
                window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: granted ? 'granted' : 'denied' });
              })();
            `}
          </Script>
        ) : null}
        <VercelAnalytics />
        <AnalyticsEvents />
        <ConsentBanner />

        <RevealObserver />
        <SiteHeader />
        <main id="content" tabIndex={-1}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
