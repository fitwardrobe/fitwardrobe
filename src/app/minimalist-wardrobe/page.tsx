import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config";
import Link from "next/link";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Minimalist Wardrobe Guide | FitWardrobe",
  description: "The essential pieces for a complete minimalist wardrobe. Learn how to build a smaller, higher-quality wardrobe with AI.",
};

export default function MinimalistWardrobePage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Minimalist Wardrobe", item: "/minimalist-wardrobe" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <main className="feature-page pt-32 container">
        <section className="hero-section text-center mb-16">
          <span className="section-label reveal">The Minimalist Mindset</span>
          <h1 className="reveal reveal--delay-1">The Essential Minimalist Wardrobe</h1>
          <p className="hero__subtitle reveal reveal--delay-2 mx-auto">
            FitWardrobe is a minimalist wardrobe guide designed to help you own less but wear more. Our privacy-first AI identifies the foundational pieces for your lifestyle, helping you build a high-quality, versatile wardrobe that lasts—ensuring you focus on staples that provide a high return on investment (ROI) for your personal style.
          </p>
        </section>

        <section className="feature-section">
          <div className="section-header reveal">
            <h2>What are the 10 core essentials for a minimalist wardrobe?</h2>
            <div className="section-content">
              <p>If you're starting from scratch, these are the items that provide the highest return on investment.</p>
            </div>
          </div>
          <div className="grid grid--2">
            <div className="reveal reveal--delay-1 p-6 bg-sage/5 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">01. The Perfect White Tee</h3>
              <p className="text-sm">Heavyweight cotton, classic fit. Works under a blazer or on its own. **Studies show 80% of stylish wardrobes are built on this essential foundational piece.**</p>
            </div>
            <div className="reveal reveal--delay-2 p-6 bg-sage/5 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">02. Dark Wash Denim</h3>
              <p className="text-sm">Versatile enough for casual Fridays and weekend outings.</p>
            </div>
            <div className="reveal reveal--delay-3 p-6 bg-sage/5 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">03. Navy/Black Blazer</h3>
              <p className="text-sm">The ultimate "elevator" piece for any casual look.</p>
            </div>
            <div className="reveal reveal--delay-4 p-6 bg-sage/5 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">04. Neutral Knitwear</h3>
              <p className="text-sm">Cashmere or merino wool in grey, navy, or camel.</p>
            </div>
          </div>
        </section>

        <section className="feature-section">
          <div className="section-header reveal">
            <h2>How does AI support a minimalist lifestyle?</h2>
          </div>
          <div className="grid grid--3">
            <div className="feature-card reveal reveal--delay-1">
              <h3 className="text-xl font-semibold mb-3">Cost Per Wear</h3>
              <p>Our app tracks how often you wear each item, helping you identify true essentials vs. impulse buys.</p>
            </div>
            <div className="feature-card reveal reveal--delay-2">
              <h3 className="text-xl font-semibold mb-3">Outfit Maximizer</h3>
              <p>Before you buy anything new, ask our AI if it works with at least 5 items you already own.</p>
            </div>
            <div className="feature-card reveal reveal--delay-3">
              <h3 className="text-xl font-semibold mb-3">Digital Closet</h3>
              <p>Seeing your entire wardrobe on your phone prevents you from buying duplicates of what you have.</p>
            </div>
          </div>
        </section>

        <section className="section--dark rounded-2xl p-12 mb-20 reveal">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-white">Ready for a lighter closet?</h2>
            <p className="text-cream/80 mb-8">
              FitWardrobe is free during beta. Discover your true style by
              removing the noise.
            </p>
            <div className="btn-group justify-center">
              <a href={SITE_CONFIG.apkDownloadUrl} className="btn btn--primary">
                Download App
              </a>
              <Link href="/capsule-wardrobe" className="btn btn--outline">
                Build a Capsule
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
