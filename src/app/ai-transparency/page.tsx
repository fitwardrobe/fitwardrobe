import { Metadata } from "next";
import Link from "next/link";
import { getBreadcrumbSchema, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { JoinBand } from "@/components/site/join-band";

const TITLE = "How FitWardrobe's AI works";
const DESCRIPTION =
  "What FitWardrobe's AI does with your clothing photos, where your wardrobe is stored, which services process it, and where the AI can get things wrong.";

export const metadata: Metadata = pageMetadata("/ai-transparency/", TITLE, DESCRIPTION);

const FLOW = [
  {
    title: "You add a piece",
    text: "You photograph a piece of clothing. The photo is saved in your wardrobe on your own device.",
  },
  {
    title: "The photo is tagged",
    text: "To tag it, the photo is sent to a cloud AI service, which returns the type, colour, season and formality. You can correct any tag.",
  },
  {
    title: "You ask for an outfit",
    text: "When you pick an occasion, the details of your items are sent to a cloud AI service, which suggests an outfit from those items with a short reason.",
  },
  {
    title: "It learns your taste",
    text: "The outfits you keep or skip are stored on your device and used to shape the next suggestion.",
  },
];

const FAQ = [
  {
    q: "Which AI services does FitWardrobe use?",
    a: "Tagging and outfit suggestions are processed by third-party cloud AI services: Google's Gemini API and Groq. The exact models change as providers update them; our privacy policy lists the services we send data to.",
  },
  {
    q: "Is my wardrobe uploaded to FitWardrobe's servers?",
    a: "No. Your photos, items and outfits are stored on your own device. Photos and item details are sent to a cloud AI service only when you tag a piece or ask for an outfit, and we don't keep copies on our servers.",
  },
  {
    q: "Is my data used to train AI models?",
    a: "We don't train models on your wardrobe. How each AI provider handles the requests we send is governed by its own terms; our privacy policy explains which services receive data and why.",
  },
  {
    q: "Does the AI work offline?",
    a: "No. Tagging and outfit suggestions need an internet connection because they run on a cloud AI service.",
  },
  {
    q: "Can I delete my data?",
    a: "Yes. Your wardrobe is stored on your device, so you can delete pieces in the app, or remove everything by deleting the app or clearing the site's data in your browser.",
  },
];

export default function AiTransparencyPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "How the AI works", item: "/ai-transparency/" },
  ]);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="fw h13 p13 fw-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageHero
        compact
        eyebrow="AI transparency"
        title="How FitWardrobe's AI works."
        lead="FitWardrobe uses cloud AI for two jobs: tagging the clothes you photograph and suggesting outfits from them. Your wardrobe itself is stored on your device. This page explains what is sent, where, and where the AI can get things wrong."
        crumbs={[{ label: "Home", href: "/" }, { label: "How our AI works" }]}
        meta={
          <>
            <span className="p13-chip">Tagging: Google Gemini API</span>
            <span className="p13-chip">Outfits: Groq</span>
            <span className="p13-chip">Wardrobe stored on your device</span>
          </>
        }
      />

      <section className="fw-section fw-page__section" aria-labelledby="flow-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="flow-title" className="fw-h2">What happens to a photo</h2>
          <ol className="fw-page__steps">
            {FLOW.map((f, i) => (
              <li key={f.title}>
                <span className="fw-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="fw-sans">{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="fw-section fw-page__section fw-page__band" aria-labelledby="limits-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="limits-title" className="fw-h2">What the AI is good at, and where it fails</h2>
          <div className="fw-page__two">
            <div>
              <h3 className="fw-sans">Good at</h3>
              <ul className="fw-page__list">
                <li>Tagging type, colour and season from a clear photo</li>
                <li>Suggesting colour combinations you may not have tried</li>
                <li>Building an outfit around one piece you want to wear</li>
                <li>Explaining, in a sentence, why an outfit works</li>
              </ul>
            </div>
            <div>
              <h3 className="fw-sans">Can get wrong</h3>
              <ul className="fw-page__list">
                <li>Regional and ethnic wear it hasn&apos;t seen often</li>
                <li>How a fabric feels, from a photo alone</li>
                <li>Real-time weather</li>
                <li>How a piece fits your body</li>
              </ul>
            </div>
          </div>
          <p className="fw-page__note">
            When it gets something wrong, you can correct the tag or skip the outfit, and it uses
            that the next time.
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section" aria-labelledby="ai-faq-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="ai-faq-title" className="fw-h2">Questions about the AI</h2>
          <dl className="fw-page__faq">
            {FAQ.map((f) => (
              <div key={f.q}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="fw-page__note">
            Full details are in our <Link href="/privacy/" className="fw-link">privacy policy</Link>.
            Questions? Write to{" "}
            <a href="mailto:privacy@fitwardrobe.me" className="fw-link">privacy@fitwardrobe.me</a>.
          </p>
        </div>
      </section>

      <JoinBand location="ai_transparency" />
    </div>
  );
}
