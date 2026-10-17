import { Metadata } from "next";
import Link from "next/link";
import { getBreadcrumbSchema, pageMetadata } from "@/lib/seo";

const TITLE = "Minimalist wardrobe: principles and first steps";
const DESCRIPTION =
  "What a minimalist wardrobe is, the principles that keep it small, and a simple way to start with the clothes you already own.";

export const metadata: Metadata = pageMetadata("/minimalist-wardrobe/", TITLE, DESCRIPTION);

const PRINCIPLES = [
  {
    title: "Own what you wear",
    text: "Keep the pieces you actually reach for. If something hasn't been worn in a year, ask honestly whether it will be.",
  },
  {
    title: "Make everything work together",
    text: "A short colour palette and simple shapes mean most tops go with most bottoms, so fewer clothes make more outfits.",
  },
  {
    title: "Choose quality over quantity",
    text: "Buy less often and buy better: fabrics and construction that last, in cuts you know suit you.",
  },
  {
    title: "Add one, think about one",
    text: "When something new comes in, consider whether something old should go, so the wardrobe stays the size you chose.",
  },
];

const ESSENTIALS = [
  "Plain T-shirts in white and a neutral",
  "A button-down or oxford shirt",
  "Dark, straight jeans",
  "Tailored trousers or chinos",
  "A neutral knit",
  "A blazer or smart overshirt",
  "A coat suited to your climate",
  "Clean everyday trainers",
  "One pair of smarter shoes",
  "A simple belt and bag",
];

export default function MinimalistWardrobePage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Minimalist wardrobe", item: "/minimalist-wardrobe/" },
  ]);

  return (
    <div className="fw fw-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="fw-page__hero">
        <div className="fw-container fw-page__narrow">
          <p className="fw-kicker">Minimalist wardrobe</p>
          <h1 className="fw-display fw-page__title">A minimalist wardrobe, starting with what you own</h1>
          <p className="fw-lead">
            A minimalist wardrobe is a deliberately small set of clothes you wear often and that
            work well together. It is less about a number and more about owning only what earns its
            place.
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section" aria-labelledby="pr-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="pr-title" className="fw-h2">Four principles that keep it small</h2>
          <ol className="fw-page__steps">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title}>
                <span className="fw-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="fw-sans">{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="fw-section fw-page__section fw-page__band" aria-labelledby="ess-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="ess-title" className="fw-h2">Ten pieces most minimalist wardrobes include</h2>
          <ul className="fw-page__list">
            {ESSENTIALS.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          <p className="fw-page__note">
            Adjust for your climate, work and life. The full list, with what to look for in each,
            is in our{" "}
            <Link href="/blog/minimalist-wardrobe-essentials/" className="fw-link">
              minimalist wardrobe essentials guide
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section" aria-labelledby="start-title">
        <div className="fw-container fw-page__narrow fw-page__prose">
          <h2 id="start-title" className="fw-h2">How to start this week</h2>
          <p>
            Take everything out, keep what you wore in the last season, and set aside the rest for
            a month before deciding. Then plan a week of outfits from what is left. If the week
            works, your wardrobe is already closer to minimal than you think.
          </p>
          <p>
            A capsule wardrobe is the seasonal version of the same idea; see our{" "}
            <Link href="/capsule-wardrobe/" className="fw-link">
              capsule wardrobe guide
            </Link>
            .
          </p>
          <div className="fw-page__cta">
            <h2>Get more outfits from fewer clothes</h2>
            <p>
              FitWardrobe, coming soon to Android and the web, suggests outfits only from clothes
              you own. Join the early-access list and we&apos;ll email you the day it opens.
            </p>
            <Link href="/#join" className="fw-btn fw-btn--primary">
              Join early access
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
