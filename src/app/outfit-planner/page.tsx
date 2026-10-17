import { Metadata } from "next";
import Link from "next/link";
import { getBreadcrumbSchema, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { JoinBand } from "@/components/site/join-band";
import { HERO_IMAGES } from "@/data/images";

const TITLE = "AI outfit planner app for the clothes you own";
const DESCRIPTION =
  "An outfit planner app for Android and the web: pick the occasion and get an outfit from clothes you own, with a reason it works. Free in early access.";

export const metadata: Metadata = pageMetadata("/outfit-planner/", TITLE, DESCRIPTION);

const STEPS = [
  {
    title: "Add the clothes you own",
    text: "Photograph each piece. It is tagged by type, colour and season, and you can correct anything it gets wrong.",
  },
  {
    title: "Pick the occasion",
    text: "The office, a wedding, an interview, a trip or a slow Sunday. The occasion sets how formal the outfit should be.",
  },
  {
    title: "Get an outfit with a reason",
    text: "FitWardrobe puts together an outfit from your clothes only, with a sentence on why the pieces work together.",
  },
  {
    title: "Keep it or skip it",
    text: "Every outfit you keep or skip shapes the next suggestion, so it gets closer to how you like to dress.",
  },
];

const OCCASIONS = [
  ["Work", "Smart, comfortable pieces that hold up from the first meeting to the last."],
  ["Wedding guest", "Dressier combinations that respect the dress code without outshining anyone."],
  ["Job interview", "Polished, quiet outfits that suit the industry you are interviewing in."],
  ["Travel", "Layers that mix with each other, so a small bag covers a long trip."],
  ["Festive", "Occasion wear, from a kurta and Nehru jacket to a velvet blazer."],
  ["Weekend", "Relaxed outfits that still look put together."],
];

const FAQ = [
  {
    q: "Is there an app that puts outfits together from my own clothes?",
    a: "Yes. Several wardrobe apps build outfits from the clothes you photograph, either with you choosing the pieces or with AI suggestions. Our comparison of digital wardrobe apps lists what each one offers. FitWardrobe, coming soon to Android and the web, suggests a complete outfit for the occasion you pick, using only your clothes.",
  },
  {
    q: "Is there a free outfit planner app?",
    a: "Most wardrobe apps are free to download with paid extras, so check each listing. FitWardrobe will be free during early access.",
  },
  {
    q: "What is an outfit planner app?",
    a: "An outfit planner app keeps a record of the clothes you own and helps you decide what to wear, either by letting you build outfits yourself or by suggesting them. FitWardrobe suggests outfits for a chosen occasion using only clothes you own, each with a short reason.",
  },
  {
    q: "Does FitWardrobe suggest clothes to buy?",
    a: "Outfit suggestions are built only from the pieces you have added, so you can get more from what is already in your wardrobe.",
  },
  {
    q: "When can I use it?",
    a: "FitWardrobe is coming soon to Android and the web; on an iPhone you'll be able to use the web version in your browser. Join the early-access list and we'll email you the day it opens.",
  },
  {
    q: "What happens to my clothing photos?",
    a: "Your wardrobe is stored on your device. To tag a piece or suggest an outfit, the photo or item details are sent to a cloud AI service for processing, and we don't keep copies on our servers.",
  },
];

const GUIDES = [
  { href: "/blog/best-digital-wardrobe-apps/", label: "Digital wardrobe and outfit planner apps compared" },
  { href: "/blog/7-rule-for-outfits/", label: "How to plan a week of outfits" },
  { href: "/blog/fashion-outfit-rules-formulas/", label: "The 3-3-3 rule for clothes" },
  { href: "/blog/obscure-fashion-rules-explained/", label: "The sandwich rule and other outfit rules" },
  { href: "/blog/capsule-wardrobe-packing-guide/", label: "Packing a travel capsule" },
  { href: "/capsule-wardrobe/", label: "Building a capsule wardrobe from what you own" },
];

export default function OutfitPlannerPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Outfit planner", item: "/outfit-planner/" },
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
        eyebrow="AI outfit planner app · Coming soon"
        title="Plan outfits from the clothes you already own."
        lead="FitWardrobe is an outfit planner for Android and the web. Tell it where you're going and it puts together an outfit from your own wardrobe, with a short note on why it works."
        image={HERO_IMAGES.outfitPlanner}
        crumbs={[{ label: "Home", href: "/" }, { label: "Outfit planner" }]}
      >
        <a href="#join-outfit_planner" className="h13-btn h13-btn--gold">Join early access</a>
        <a href="#how-title" className="h13-btn h13-btn--line">How it works</a>
      </PageHero>

      <section className="fw-section fw-page__section" aria-labelledby="how-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="how-title" className="fw-h2">How the outfit planner works</h2>
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

      <section className="fw-section fw-page__section fw-page__band" aria-labelledby="occ-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="occ-title" className="fw-h2">What to wear, by occasion</h2>
          <table className="fw-page__table">
            <thead>
              <tr>
                <th scope="col">Occasion</th>
                <th scope="col">What it plans for</th>
              </tr>
            </thead>
            <tbody>
              {OCCASIONS.map(([o, d]) => (
                <tr key={o}>
                  <th scope="row">{o}</th>
                  <td>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fw-page__note">
            Suggestions come only from the pieces you have added. It can get things wrong, and you
            can tell it when it does.
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section" aria-labelledby="why-title">
        <div className="fw-container fw-page__narrow fw-page__prose">
          <h2 id="why-title" className="fw-h2">Why plan from what you own</h2>
          <p>
            Most of us already own enough to get dressed well; the problem is seeing the
            combinations. In 2022, UK adults had not worn about a quarter of their clothes in the
            past year, according to{" "}
            <a
              className="fw-link"
              href="https://wrap.ngo/media-centre/press-releases/nations-wardrobes-hold-16-billion-items-unworn-clothes-people-open-new"
              rel="noopener"
            >
              research by WRAP
            </a>
            . Planning outfits from your own wardrobe puts those pieces back into rotation, and a
            short reason with each outfit helps you learn what works for you.
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section fw-page__band" aria-labelledby="op-faq-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="op-faq-title" className="fw-h2">Outfit planner questions</h2>
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

      <section className="fw-section fw-page__section" aria-labelledby="op-more-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="op-more-title" className="fw-h2">Outfit planning guides</h2>
          <ul className="fw-page__links">
            {GUIDES.map((g) => (
              <li key={g.href}>
                <Link href={g.href}>{g.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JoinBand location="outfit_planner" title={<>Be the first to try the <span className="h13-gold">outfit planner.</span></>} />
    </div>
  );
}
