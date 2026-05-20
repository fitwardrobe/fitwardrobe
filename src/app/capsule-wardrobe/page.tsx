import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config";
import Link from "next/link";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Capsule Wardrobe Builder | FitWardrobe",
  description: "Build a more versatile wardrobe with less. Our AI helps you create a minimalist capsule wardrobe that works for your lifestyle.",
};

export default function CapsuleWardrobePage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Capsule Wardrobe", item: "/capsule-wardrobe" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <main className="feature-page pt-32 container">
        <section className="hero-section text-center mb-16">
          <span className="section-label reveal">Minimalism Meets AI</span>
          <h1 className="reveal reveal--delay-1">Build Your Perfect Capsule</h1>
          <p className="hero__subtitle reveal reveal--delay-2 mx-auto">
            FitWardrobe is a privacy-first AI capsule wardrobe builder designed to help you organize your closet, reduce decision fatigue, and curate a minimalist collection. Our advanced AI identifies your most-worn pieces, suggests versatile additions, and builds a sustainable wardrobe plan tailored for your lifestyle—all while keeping your clothing photos 100% private on-device.
          </p>
        </section>

        <section className="feature-section">
          <div className="grid grid--2 items-center">
            <div className="reveal">
              <h2>What exactly is a capsule wardrobe?</h2>
              <div className="section-content">
                <p>
                  A capsule wardrobe is a curated collection of essential items that
                  don't go out of fashion, which can then be augmented with seasonal
                  pieces.
                </p>
                <p>
                  By focusing on versatile, high-quality items that all work
                  together, you can create dozens of outfits from just a few pieces,
                  saving you time, money, and decision fatigue. **Research shows that the average person only wears 20% of their wardrobe**, making a curated capsule a highly effective tool for sustainable fashion.
                </p>
              </div>
            </div>
            <div className="reveal reveal--delay-1 p-8 bg-sage/5 rounded-2xl">
              <h4 className="mb-4">The 30-Item Challenge</h4>
              <p className="text-sm mb-4">
                Most FitWardrobe users start with a 30-item capsule. Our AI
                analyzes your current wardrobe and identifies the "Core 30" that
                provide the most versatility.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Versatility Score</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-mist h-1.5 rounded-full overflow-hidden">
                  <div className="bg-sage h-full w-[85%]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="feature-section">
          <div className="section-header reveal">
            <h2>How exactly does the AI capsule builder work?</h2>
          </div>
          <div className="grid grid--3">
            <div className="feature-card reveal reveal--delay-1">
              <div className="text-3xl mb-4 font-bold text-sage/40">01</div>
              <h3>Audit</h3>
              <p>Our AI analyzes your entire digital wardrobe to identify your most-worn and most-versatile pieces.</p>
            </div>
            <div className="feature-card reveal reveal--delay-2">
              <div className="text-3xl mb-4 font-bold text-sage/40">02</div>
              <h3>Gap Analysis</h3>
              <p>We identify missing "bridge" pieces that would connect your existing items into multiple new outfits.</p>
            </div>
            <div className="feature-card reveal reveal--delay-3">
              <div className="text-3xl mb-4 font-bold text-sage/40">03</div>
              <h3>Curation</h3>
              <p>Generate a 33-piece seasonal plan that covers work, weekend, and evening occasions.</p>
            </div>
          </div>
        </section>

        <section className="section--dark rounded-2xl p-12 mb-20 reveal">
          <div className="grid grid--2 items-center">
            <div>
              <h2 className="text-white">Ready to simplify your style?</h2>
              <p className="text-cream/80 mb-8">
                Join 5,000+ users who have reclaimed their mornings with a
                FitWardrobe capsule.
              </p>
              <div className="btn-group">
                <a href={SITE_CONFIG.apkDownloadUrl} className="btn btn--primary">
                  Download App
                </a>
                <Link href="/minimalist-wardrobe" className="btn btn--outline">
                  Learn Minimalism
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
               <div className="p-8 bg-white/5 rounded-xl border border-white/10">
                  <p className="italic text-lg mb-4">"FitWardrobe helped me cut my wardrobe by 60% while actually increasing the number of outfits I wear."</p>
                  <p className="font-semibold text-cream">— Sarah M., Beta User</p>
               </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
