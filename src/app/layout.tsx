import { Newsreader, Archivo } from "next/font/google"
import Script from "next/script";

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { getGlobalMetadata } from "@/lib/seo"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RevealObserver } from "@/components/reveal-observer"
import { GLOBAL_SCHEMAS } from "@/data/schemas";

export const metadata = getGlobalMetadata()

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${archivo.variable}`}
    >
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
      <body className="min-h-screen bg-background font-body antialiased">
        {/* Accessibility Support */}
        <a 
          href="#content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:px-6 focus:py-3 focus:bg-cta focus:text-white focus:rounded-full focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-cta/50 focus:animate-in focus:slide-in-from-top-4 duration-300"
        >
          Skip to main content
        </a>

        {/* Google Analytics (GA4) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <RevealObserver />
          <Navbar />
          <main id="content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
