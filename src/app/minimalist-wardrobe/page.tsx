import { Metadata } from "next";
import Link from "next/link";
import { getBreadcrumbSchema, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { JoinBand } from "@/components/site/join-band";
import { PageFigure } from "@/components/site/page-figure";
import { HERO_IMAGES, INLINE_IMAGES } from "@/data/images";

const TITLE = "Minimalist wardrobe essentials and first steps";
const DESCRIPTION =
  "Minimalist wardrobe essentials for women and men, the principles that keep a wardrobe small, and how to start with the clothes you already own.";

export const metadata: Metadata = pageMetadata("/minimalist-wardrobe/", TITLE, DESCRIPTION);

const PRINCIPLES = [
  {
    title: "Own what you wear",
    text: "Keep the pieces you actually reach for. If something hasn't been worn in a year, ask honestly whether it will be. Judge coats and summer clothes against their own season.",
  },
  {
    title: "Make everything work together",
    text: "A short colour palette and simple shapes mean most tops go with most bottoms, so fewer clothes make more outfits. Two or three neutrals and one accent colour are plenty.",
  },
  {
    title: "Choose quality over quantity",
    text: "Buy less often and buy better: fabrics and construction that last, in cuts you know suit you. Better doesn't have to mean new; a well-made second-hand coat counts.",
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

const WOMEN = [
  "Three plain T-shirts or vest tops: white, black and one other neutral",
  "A white or pale blue shirt that tucks into trousers and layers open over a T-shirt",
  "A Breton or simple striped top, the one pattern that goes with nearly everything",
  "A fine-knit jumper or polo neck in grey, camel or cream",
  "Dark straight-leg jeans and one pair of tailored trousers in navy or black",
  "A midi skirt or shirt dress that works with trainers and with boots",
  "A blazer in navy, grey or camel",
  "A coat for your weather: a trench where it's mild and wet, wool where winters are cold",
  "White leather trainers, loafers or flats, and ankle boots",
  "A structured tote that fits a laptop, and a small crossbody bag",
];

const MEN = [
  "Three plain crew-neck T-shirts: white, grey and navy or black",
  "A white oxford shirt, plus one in light blue or chambray",
  "A plain or knitted polo for days that need a collar but not a shirt",
  "A merino or lambswool crew-neck in grey or navy",
  "Dark jeans, chinos in navy or stone, and charcoal tailored trousers",
  "A navy blazer that works with jeans as well as trousers",
  "A casual jacket, such as a field jacket or overshirt, and a coat for your climate",
  "White leather trainers, brown loafers or derbies, and Chelsea boots",
  "A leather belt that suits the shoes you wear most",
];

const FAQ: { q: string; a: string; link?: { href: string; text: string } }[] = [
  {
    q: "How many clothes are in a minimalist wardrobe?",
    a: "There's no set number, because minimalism is about owning what you wear rather than hitting a count. If you want a target, borrow one from capsule wardrobes: Project 333 allows 33 items, shoes and accessories included, for three months. A simpler test is to count what you actually wore last season and start from there.",
  },
  {
    q: "What is the difference between a minimalist and a capsule wardrobe?",
    a: "Minimalism is a general aim: own less, and keep only what you use. A capsule wardrobe is one way to get there: you pick pieces that all work together, often to a set number, and look at them again each season. Most capsules are fairly minimal, but a small wardrobe isn't a capsule if its pieces don't go together.",
    link: { href: "/blog/what-is-a-capsule-wardrobe/", text: "What a capsule wardrobe is, and how to build one" },
  },
  {
    q: "Does a minimalist wardrobe have to be black, white and grey?",
    a: "No. Minimalism is a way of choosing clothes, not a colour scheme. A wardrobe built on navy, cream and forest green is just as minimal if every piece works with the others. An all black-and-white wardrobe can look samey; navy or camel adds depth.",
  },
  {
    q: "Do I need to buy new clothes to start a minimalist wardrobe?",
    a: "Usually not. Sort what you own, then wear only the keepers for a few weeks. Real gaps show up quickly, such as having no shoes that work with your smart trousers, and those are the only things worth buying, one at a time.",
  },
  {
    q: "Can an app help me keep a minimalist wardrobe?",
    a: "A digital wardrobe app shows everything you own in one place, which makes duplicates and gaps easier to see. FitWardrobe is our app, and it isn't available yet. Coming to Android and the web, it suggests outfits using only the clothes you've added, each with a short reason, and it's free during early access.",
  },
];

export default function MinimalistWardrobePage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Minimalist wardrobe", item: "/minimalist-wardrobe/" },
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
        eyebrow="Minimalist wardrobe"
        title="A minimalist wardrobe: the essentials, and how to start."
        lead="A minimalist wardrobe is a deliberately small set of clothes you wear often and that work well together. It is less about a number and more about owning only what earns its place. Below: the principles, the essentials for women and men, and how to start."
        image={HERO_IMAGES.minimalist}
        crumbs={[{ label: "Home", href: "/" }, { label: "Minimalist wardrobe" }]}
      >
        <a href="#pr-title" className="h13-btn h13-btn--gold">The four principles</a>
        <Link href="/capsule-wardrobe/" className="h13-btn h13-btn--line">Capsule wardrobe guide</Link>
      </PageHero>

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
          <PageFigure
            image={INLINE_IMAGES.tenPieces}
            alt="Ten wardrobe basics laid out in two rows: a white T-shirt, an oxford shirt, dark jeans, tailored trousers, a navy knit, a navy blazer, a camel coat, white trainers, brown loafers, and a tote bag with a belt"
          />
          <ul className="fw-page__list">
            {ESSENTIALS.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          <p className="fw-page__note">
            Adjust for your climate, work and life. For a fuller list by category, see our{" "}
            <Link href="/blog/capsule-wardrobe-essentials-checklist/" className="fw-link">
              capsule wardrobe checklist
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section" aria-labelledby="women-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="women-title" className="fw-h2">Minimalist wardrobe essentials for women</h2>
          <p>
            Swap freely between this list and the next: the job a piece does matters more than
            which rail it came from.
          </p>
          <ul className="fw-page__list">
            {WOMEN.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
          <p className="fw-page__note">
            Heels, sandals and a dressier dress earn a place only if your calendar uses them. If
            weddings, festivals or religious occasions fill part of your year, give those clothes
            their own small section rather than stretching everyday basics to cover them.
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section fw-page__band" aria-labelledby="men-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="men-title" className="fw-h2">Minimalist wardrobe essentials for men</h2>
          <p>
            Men&apos;s wardrobes usually have fewer categories, so shirts, knitwear and shoes do most
            of the work of making one day&apos;s outfit look different from the next.
          </p>
          <ul className="fw-page__list">
            {MEN.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <p className="fw-page__note">
            Shorts and sandals are essentials only where summers are long. In a hot climate, trade
            the wool for linen and cotton and the boots for sandals; somewhere cold, add a second
            jumper and waterproof boots.
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
            Before you buy anything, go through the lists above and mark what you own that fits and
            that you&apos;d wear this month. The gaps are usually smaller than they look, and
            they&apos;re the only things worth shopping for.
          </p>
          <p>
            While you sort, four kinds of clothes can go straight into the set-aside pile: pieces
            that only work with one other thing, near-duplicates that do the same job (three almost
            identical grey jumpers), clothes for a life you don&apos;t live, and anything that
            doesn&apos;t fit now.
          </p>
          <p>
            A capsule wardrobe is the seasonal version of the same idea; see our{" "}
            <Link href="/capsule-wardrobe/" className="fw-link">
              capsule wardrobe guide
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section fw-page__band" aria-labelledby="min-faq-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="min-faq-title" className="fw-h2">Minimalist wardrobe questions</h2>
          <dl className="fw-page__faq">
            {FAQ.map((f) => (
              <div key={f.q}>
                <dt>{f.q}</dt>
                <dd>
                  {f.a}
                  {f.link ? (
                    <>
                      <br />
                      <Link href={f.link.href} className="fw-link">
                        {f.link.text}
                      </Link>
                    </>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <JoinBand location="minimalist_guide" title={<>More outfits from <span className="h13-gold">fewer clothes.</span></>} />
    </div>
  );
}
