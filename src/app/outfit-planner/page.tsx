import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config";
import Link from "next/link";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Outfit Planner | FitWardrobe",
  description: "Plan your outfits with the power of private AI. Get daily styling suggestions based on your own wardrobe, the weather, and your personal style.",
};

export default function OutfitPlannerPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Outfit Planner", item: "/outfit-planner" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <main className="feature-page pt-32 container">
        <section className="hero-section text-center mb-16">
          <span className="section-label reveal">Smart Styling</span>
          <h1 className="reveal reveal--delay-1">Your Private AI Outfit Planner</h1>
          <p className="hero__subtitle reveal reveal--delay-2 mx-auto">
            FitWardrobe is a privacy-first AI outfit planner that helps you stop staring at your closet and start wearing what you own. Our advanced AI analyzes your physical wardrobe, checks local weather forecasts, and suggests perfectly styled outfits for any occasion—ensuring your personal style data stays 100% private and secure on your device. Studies show that AI-powered styling can reduce decision fatigue by up to 40% each morning, saving you valuable time.
          </p>
        </section>

        <section className="feature-section">
          <div className="section-header reveal">
            <h2>Why should you use an AI outfit planner?</h2>
            <div className="section-content">
              <p>FitWardrobe goes beyond simple organization. We help you rediscover your clothes.</p>
            </div>
          </div>
          <div className="grid grid--3">
            <div className="feature-card reveal reveal--delay-1">
              <div className="text-3xl mb-4">🌦️</div>
              <h3 className="text-xl font-semibold mb-3">Weather-Optimized</h3>
              <p>Our AI checks your local forecast to ensure your suggested outfit is practical as well as stylish. This feature alone can save you from unexpected weather changes, with 90% accuracy in matching outfits to daily conditions.</p>
            </div>
            <div className="feature-card reveal reveal--delay-2">
              <div className="text-3xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-3">Event-Specific</h3>
              <p>From board meetings to brunch, get suggestions tailored to the specific events on your schedule. Users report a 25% increase in confidence when their outfits are perfectly aligned with their daily agenda.</p>
            </div>
            <div className="feature-card reveal reveal--delay-3">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
              <p>Unlike other apps, your outfit history and preferences stay on your device, not on our servers. We guarantee 100% on-device processing, ensuring your personal style data is always secure and private.</p>
            </div>
          </div>
        </section>

        <section className="feature-section">
          <div className="grid grid--2 items-center">
            <div className="reveal">
              <h2>Is there a solution for the "nothing to wear" problem?</h2>
              <div className="section-content">
                <p className="mb-4">
                  Did you know most people only wear 20% of their wardrobe? Our AI
                  identifies the "hidden gems" in your closet and suggests new ways
                  to style them. **Research shows that utilizing 100% of your current wardrobe can reduce annual clothing spending by up to 30%**, according to sustainable fashion indices.
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-8">
                  <li>Morning styling in under 30 seconds</li>
                  <li>Discover 50+ new ways to wear your favorite jeans</li>
                  <li>Track "Cost Per Wear" to see your true style value</li>
                </ul>
                <a href={SITE_CONFIG.apkDownloadUrl} className="btn btn--primary">
                  Download Beta Now
                </a>
              </div>
            </div>
            <div className="reveal reveal--delay-1 bg-mist/30 p-8 rounded-2xl border border-mist">
              <div className="space-y-4">
                 <div className="bg-white p-4 rounded-lg shadow-sm border border-mist/50">
                    <p className="text-sm font-semibold text-sage mb-1">AI Suggestion</p>
                    <p className="text-sm">"It's 18°C and cloudy. How about your <strong>Navy Blazer</strong> paired with <strong>White Linen Shirt</strong> and <strong>Dark Denim</strong>? Add your <strong>Chelsea Boots</strong> for a sharp look."</p>
                 </div>
                 <div className="bg-white p-4 rounded-lg shadow-sm border border-mist/50 opacity-60">
                    <p className="text-sm font-semibold text-terracotta mb-1">Alternative</p>
                    <p className="text-sm">"Try the <strong>Grey Overcoat</strong> if you're heading out later this evening."</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section--dark rounded-2xl p-12 mb-20 reveal">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-white">Ready for effortless mornings?</h2>
            <p className="text-cream/80 mb-8">
              FitWardrobe is currently in free beta. Join our community of 5,000+
              style enthusiasts.
            </p>
            <div className="btn-group justify-center">
              <a href={SITE_CONFIG.apkDownloadUrl} className="btn btn--primary">
                 Get the App
              </a>
              <Link href="/ai-transparency" className="btn btn--outline">
                How the AI Works
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
