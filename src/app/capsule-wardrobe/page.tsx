import { Metadata } from "next";
import Link from "next/link";
import { getBreadcrumbSchema, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { JoinBand } from "@/components/site/join-band";
import { HERO_IMAGES } from "@/data/images";

const TITLE = "AI capsule wardrobe generator and planner";
const DESCRIPTION =
  "Build a capsule wardrobe from clothes you already own: how many pieces, which basics, and how an AI capsule wardrobe generator turns them into outfits.";

export const metadata: Metadata = pageMetadata("/capsule-wardrobe/", TITLE, DESCRIPTION);

const STEPS = [
  {
    title: "Take stock of what you own",
    text: "Pull out everything for the season and sort it into keep, maybe and let go. Most capsules are built from clothes already in the wardrobe, not from a shopping list.",
  },
  {
    title: "Pick a short colour palette",
    text: "Choose two or three neutrals and one or two accent colours. The tighter the palette, the more pieces combine with each other.",
  },
  {
    title: "Choose your core pieces",
    text: "Keep the tops, bottoms, layers and shoes you reach for most and that work with several other pieces. Many people land between 25 and 40 items for a season.",
  },
  {
    title: "Plan outfits before you need them",
    text: "Put combinations together for the week ahead, including the occasions you have coming up. This is where a capsule saves time each morning.",
  },
  {
    title: "Review at the end of the season",
    text: "Note what you never wore and what you wished you had. Replace gaps deliberately, one piece at a time.",
  },
];

const FAQ = [
  {
    q: "What is a capsule wardrobe?",
    a: "A capsule wardrobe is a small set of versatile clothes that all work together, so you can make many outfits from fewer pieces. The idea is usually credited to London boutique owner Susie Faux in the 1970s and was popularised by Donna Karan's 1985 'Seven Easy Pieces' collection.",
  },
  {
    q: "How many items should a capsule wardrobe have?",
    a: "There is no fixed number. Project 333 uses 33 items, including shoes and accessories, for three months; many people settle between 25 and 40 pieces for a season. Start with what you actually wear and adjust.",
  },
  {
    q: "Is there a capsule wardrobe app?",
    a: "Yes. A digital wardrobe app keeps every piece you own in one place, so you can see your capsule at a glance and plan outfits from it. FitWardrobe, coming soon to Android and the web, tags each piece you photograph and suggests outfits for an occasion using only your clothes.",
  },
  {
    q: "Can AI build a capsule wardrobe from my own clothes?",
    a: "AI can help you see the capsule inside the clothes you already have. Some tools suggest pieces to buy; a planner like FitWardrobe starts from photos of your own clothes and suggests outfits from only those, each with a short reason. You still decide what stays in the capsule.",
  },
  {
    q: "Do I need to buy new clothes for a capsule wardrobe?",
    a: "Usually not. Most people can build a working capsule from what they already own and only fill real gaps later.",
  },
];

const GUIDES = [
  { href: "/blog/what-is-a-capsule-wardrobe/", label: "What a capsule wardrobe is, in detail" },
  { href: "/blog/how-many-items-capsule-wardrobe/", label: "How many pieces a capsule wardrobe needs" },
  { href: "/blog/capsule-wardrobe-essentials-checklist/", label: "A capsule wardrobe checklist to start with" },
  { href: "/blog/capsule-wardrobe-rules-explained/", label: "Capsule wardrobe rules: 3-3-3, 70/30 and more" },
  { href: "/blog/capsule-wardrobe-mistakes/", label: "Common capsule wardrobe mistakes" },
  { href: "/blog/capsule-wardrobe-packing-guide/", label: "A travel capsule for packing light" },
];

export default function CapsuleWardrobePage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Capsule wardrobe", item: "/capsule-wardrobe/" },
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
        eyebrow="AI capsule wardrobe planner"
        title="An AI capsule wardrobe, built from what you already own."
        lead="A capsule wardrobe is a small set of versatile clothes that all work together, so you get more outfits from fewer pieces. Here is how to build one from your current wardrobe, and how an app turns it into outfits."
        image={HERO_IMAGES.capsule}
        crumbs={[{ label: "Home", href: "/" }, { label: "Capsule wardrobe" }]}
      >
        <a href="#steps-title" className="h13-btn h13-btn--gold">Build one in five steps</a>
        <Link href="/blog/how-many-items-capsule-wardrobe/" className="h13-btn h13-btn--line">How many pieces?</Link>
      </PageHero>

      <section className="fw-section fw-page__section" aria-labelledby="why-title">
        <div className="fw-container fw-page__narrow fw-page__prose">
          <h2 id="why-title" className="fw-h2">Why a capsule works</h2>
          <p>
            Most wardrobes hold clothes that rarely get worn: in 2022, UK adults had not worn
            about a quarter of their clothes in the past year, according to{" "}
            <a
              className="fw-link"
              href="https://wrap.ngo/media-centre/press-releases/nations-wardrobes-hold-16-billion-items-unworn-clothes-people-open-new"
              rel="noopener"
            >
              research by WRAP
            </a>
            . A capsule turns that around: fewer pieces, each chosen because it works with the
            others, so getting dressed takes less thought.
          </p>
          <p>
            The idea is older than the word. It is usually credited to London boutique owner Susie
            Faux in the 1970s, and Donna Karan&apos;s 1985 &quot;Seven Easy Pieces&quot; made it
            mainstream. Today the best-known version is Project 333 by Courtney Carver: 33 items,
            including shoes and accessories, worn for three months.
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section fw-page__band" aria-labelledby="steps-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="steps-title" className="fw-h2">How to build one in five steps</h2>
          <ol className="fw-page__steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="fw-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="fw-sans">{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="fw-section fw-page__section" aria-labelledby="app-title">
        <div className="fw-container fw-page__narrow fw-page__prose">
          <h2 id="app-title" className="fw-h2">Capsule wardrobe generator or planner?</h2>
          <p>
            Most &quot;capsule wardrobe generators&quot; hand you a list of pieces to buy. A capsule
            wardrobe planner works the other way round: it starts from the clothes you already
            have and shows you the outfits inside them. If the goal is to own less, start with a
            planner.
          </p>
          <p>
            The hard part of a capsule is not choosing the pieces, it is remembering how they go
            together on a busy morning. FitWardrobe is a digital wardrobe app, coming soon to
            Android and the web, built for exactly that:
          </p>
          <ul className="fw-page__list">
            <li>Photograph each piece; it is tagged by type, colour, pattern and season, and you can correct any tag.</li>
            <li>Pick an occasion and get an outfit built only from your clothes, with a short reason it works.</li>
            <li>Keep or skip suggestions, and it learns how you like to dress.</li>
            <li>Your wardrobe is stored on your device; photos go to a cloud AI service only for tagging and suggestions.</li>
          </ul>
          <p className="fw-page__note">
            <Link href="/ai-transparency/" className="fw-link">What happens to your photos</Link>
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section fw-page__band" aria-labelledby="capsule-faq-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="capsule-faq-title" className="fw-h2">Capsule wardrobe questions</h2>
          <dl className="fw-page__faq">
            {FAQ.map((f) => (
              <div key={f.q}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="fw-section fw-page__section" aria-labelledby="more-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="more-title" className="fw-h2">More capsule wardrobe guides</h2>
          <ul className="fw-page__links">
            {GUIDES.map((g) => (
              <li key={g.href}>
                <Link href={g.href}>{g.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JoinBand location="capsule_guide" title={<>Turn your capsule into <span className="h13-gold">outfits.</span></>} />
    </div>
  );
}
