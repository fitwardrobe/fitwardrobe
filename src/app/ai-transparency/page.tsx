import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Transparency | FitWardrobe",
  description: "Learn how FitWardrobe uses Google Gemini and Groq AI to power your private digital stylist.",
};

export default function AiTransparencyPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "AI Transparency", item: "/ai-transparency" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <main className="transparency-page pt-32 container container--narrow">
        <section className="hero-section text-center mb-16">
          <span className="section-label reveal">
            <span role="img" aria-label="sparkles">✨</span> 100% AI Transparency Verified
          </span>
          <h1 className="reveal reveal--delay-1">How Our AI Works</h1>
          <p className="hero__subtitle reveal reveal--delay-2 mx-auto">
            At FitWardrobe, we believe you should know exactly what happens when
            you click "Generate Outfit" or "Analyze Photo."
          </p>
        </section>

        <section className="feature-section">
          <div className="section-header reveal">
            <h2>The Technology Stack</h2>
            <p>
              We use a hybrid AI architecture to balance speed, intelligence, and
              privacy.
            </p>
          </div>

          <div className="grid grid--2">
            <div className="feature-card reveal reveal--delay-1">
              <span className="section-label" style={{ fontSize: '0.75rem' }}>Image Analysis</span>
              <h3 className="mt-2 text-navy">Google Gemini 2.0 Flash</h3>
              <div className="section-content">
                <p className="mb-4">
                  Powers our "Snap & Tag" feature. It looks at your photos to
                  identify clothing items with high precision.
                </p>
                <ul className="space-y-2 text-sm">
                  <li><strong>Input:</strong> Garment Photographs</li>
                  <li><strong>Output:</strong> Tags (Type, Color, Style)</li>
                  <li><strong>Privacy:</strong> Temporary processing, no storage.</li>
                </ul>
              </div>
            </div>

            <div className="feature-card reveal reveal--delay-2">
              <span className="section-label" style={{ fontSize: '0.75rem' }}>Styling & Chat</span>
              <h3 className="mt-2 text-navy">Groq AI (Llama 3 Powered)</h3>
              <div className="section-content">
                <p className="mb-4">
                  Powers our styling engine and chat assistant. It takes your
                  digital tags and reasons like a personal stylist.
                </p>
                <ul className="space-y-2 text-sm">
                  <li><strong>Input:</strong> Wardrobe Tags + Chat Context</li>
                  <li><strong>Output:</strong> Recommendations & Advice</li>
                  <li><strong>Privacy:</strong> No data used for training.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section--alt p-8 rounded-lg feature-section reveal">
          <h2 className="text-center mb-8">
            <span role="img" aria-hidden="true">⚠️</span> What AI Can & Cannot Do
          </h2>
          <div className="grid grid--2">
            <div className="p-4 section-content">
              <h4 className="flex items-center gap-2 mb-4 font-semibold" style={{ color: "#1E7E34" }}>
                <span role="img" aria-hidden="true">✅</span> What it's great at:
              </h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Organizing 100+ items in seconds</li>
                <li>Suggesting fresh color combinations</li>
                <li>Reminding you of clothes you forgot you had</li>
                <li>Building capsule wardrobes efficiently</li>
              </ul>
            </div>
            <div className="p-4 section-content">
              <h4 className="flex items-center gap-2 mb-4 font-semibold" style={{ color: "#DC3545" }}>
                <span role="img" aria-hidden="true">❌</span> Where it can fail:
              </h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Identifying hyper-local Indian ethnic wear</li>
                <li>Understanding fabric "feel" through photos</li>
                <li>Accounting for real-time weather changes</li>
                <li>Perfectly matching your body type nuances</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="feature-section">
          <div className="section-header reveal mb-10">
            <h2>Common Questions</h2>
          </div>

          <div className="space-y-12">
            <div className="reveal reveal--delay-1">
              <h3 className="text-xl font-semibold mb-3 text-navy">Is the AI training on my photos?</h3>
              <div className="section-content text-muted-foreground">
                <p>
                  No. We specifically use API configurations that prevent our
                  providers (Google and Groq) from using your data to train their
                  models. Your wardrobe is your business.
                </p>
              </div>
            </div>

            <div className="reveal reveal--delay-2">
              <h3 className="text-xl font-semibold mb-3 text-navy">Can FitWardrobe employees see my clothes?</h3>
              <div className="section-content text-muted-foreground">
                <p>
                  Unless you explicitly send us a support screenshot, no. Your
                  wardrobe data is stored in a local database on your own device. We
                  only store your email address for account sync.
                </p>
              </div>
            </div>

            <div className="reveal reveal--delay-3">
              <h3 className="text-xl font-semibold mb-3 text-navy">Why use two different AI systems?</h3>
              <div className="section-content text-muted-foreground">
                <p>
                  Gemini is a "multimodal" expert - it's the best at seeing. Groq is
                  a "reasoning" expert - it's the best at thinking fast. By
                  combining them, we give you a stylist that's both smart and
                  lightning fast.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section--dark text-center p-12 rounded-xl mb-16 reveal">
          <h2>Help Us Improve</h2>
          <p className="mb-8 opacity-80">Our AI is in Beta. If it makes a mistake, tell us!</p>
          <Link
            href="/support"
            className="btn btn--primary"
          >
            Send Feedback
          </Link>
        </section>
      </main>
    </>
  );
}
