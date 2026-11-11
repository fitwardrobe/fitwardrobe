import { Metadata } from "next";
import Link from "next/link";
import { getBreadcrumbSchema, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { JoinBand } from "@/components/site/join-band";
import { PageFigure } from "@/components/site/page-figure";
import { HERO_IMAGES, INLINE_IMAGES } from "@/data/images";

const TITLE = "What to wear to work, by dress code";
const DESCRIPTION =
  "What to wear to work for every dress code, from casual to business formal, with outfit formulas you can build from clothes you already own.";

export const metadata: Metadata = pageMetadata("/what-to-wear-to-work/", TITLE, DESCRIPTION);

const CHECKS = [
  {
    title: "The dress code",
    text: "Go by what people at your level wear, not the handbook's most relaxed line. If the policy says smart casual but your team wears blazers to meetings, the team is the dress code.",
  },
  {
    title: "The day's plans",
    text: "Clients, a presentation or senior visitors: go one step up. A site visit or an office move: shoes you can stand in all day.",
  },
  {
    title: "The weather and your commute",
    text: "A cycle across Berlin, a humid metro ride in Bengaluru and a wet walk to the Tube need different shoes and layers. In a Toronto winter, many people commute in boots and keep office shoes under the desk.",
  },
];

const DRESS_CODES = [
  ["Casual", "Jeans, T-shirts and trainers, clean and in good shape. Gym kit doesn't count. Common in start-ups, tech teams and studios."],
  ["Smart casual", "Casual clothes made sharper: dark jeans or chinos, a shirt, polo or fine knit, clean trainers or loafers."],
  ["Business casual", "Office clothes without the suit: tailored trousers or a skirt, a shirt or blouse, leather shoes, usually no tie."],
  ["Business formal", "A suit, or a dress with a matching jacket, in a dark colour, with formal shoes. Still usual in law and banking."],
];

const FORMULAS = [
  {
    code: "Casual",
    outfits: [
      {
        who: "Women",
        outfit: "Dark straight jeans, a striped or plain T-shirt, a cardigan, white trainers.",
        why: "Nothing is faded, sporty or see-through, which is where casual offices draw the line.",
      },
      {
        who: "Men",
        outfit: "Dark jeans or chinos, a heavyweight plain T-shirt, an overshirt, leather trainers.",
        why: "The overshirt adds a collar and some structure, so it still looks considered on a video call.",
      },
    ],
  },
  {
    code: "Smart casual",
    outfits: [
      {
        who: "Women",
        outfit: "Dark jeans or cropped trousers, a fine-knit jumper or silky top, loafers or ankle boots.",
        why: "Polished shoes and a fine knit lift a casual base without looking like office uniform.",
      },
      {
        who: "Men",
        outfit: "Chinos, an oxford shirt or knitted polo, an unstructured navy blazer, suede loafers.",
        why: "A collar and a jacket look smart, while chinos and soft shoes stop it looking like a suit.",
      },
    ],
  },
  {
    code: "Business casual",
    outfits: [
      {
        who: "Women",
        outfit: "Tailored trousers or a knee-length skirt, a blouse or fine knit, a blazer, loafers or low heels.",
        why: "Every piece is office wear, but top and bottom don't match, which is what separates it from a suit.",
      },
      {
        who: "Men",
        outfit: "Grey wool trousers, a light blue shirt with no tie, a merino jumper or blazer, brown leather shoes.",
        why: "Tailored trousers and leather shoes carry the formality, so nobody misses the tie.",
      },
    ],
  },
  {
    code: "Business formal",
    outfits: [
      {
        who: "Women",
        outfit: "A navy or charcoal trouser or skirt suit, a plain shell top or white shirt, court shoes or smart flats.",
        why: "A matching jacket and bottom is the clearest sign of formality, so the rest can stay plain.",
      },
      {
        who: "Men",
        outfit: "A navy or charcoal suit, a white shirt, a plain tie, black oxfords.",
        why: "It is the most formal everyday combination, so you can't be underdressed in it.",
      },
    ],
  },
];

const GREY_AREAS = [
  ["Jeans", "Yes in casual and most smart casual offices: dark, no rips, worn with a smarter top. In business casual, often Fridays only. In business formal, no."],
  ["Trainers", "Plain leather or canvas pairs pass in most casual and smart casual offices. Running shoes and chunky, logo-heavy pairs read as gym kit."],
  ["Shorts", "Rarely, even in hot cities. Some casual workplaces allow tailored, knee-length shorts in summer. If nobody on your floor wears them, wait."],
  ["Leggings", "As trousers, mostly in casual workplaces. Opaque leggings under a long jumper or dress are more widely accepted; ponte trousers are the business casual version."],
  ["Polo shirts", "A plain or knitted polo is smart casual almost everywhere. Under a blazer, a knitted one can pass for business casual, depending on your workplace. Big logos are weekend wear."],
];

const TOMORROW = [
  {
    title: "Check tomorrow",
    text: "Look at your calendar and the forecast, then give the day one word: desk, client, presentation or travel.",
  },
  {
    title: "Start with one piece",
    text: "Choose the piece the day depends on, such as the blazer for a 10am pitch, and build the rest around it.",
  },
  {
    title: "Lay out the whole outfit",
    text: "Top, bottom, layer, shoes and belt. Iron anything that needs it tonight.",
  },
  {
    title: "Pick one swap",
    text: "Decide the change that rescues a surprise: a jumper for a cold office, boots if it rains.",
  },
];

const FAQ = [
  {
    q: "What should I wear to work tomorrow?",
    a: "Check your workplace's dress code, tomorrow's plans and the forecast for your commute, then lay out one complete outfit tonight, shoes included, one step smarter if there's a client meeting or presentation. If you're stuck, dark trousers, a plain shirt or fine knit and leather shoes suit most offices.",
  },
  {
    q: "Are jeans OK for work?",
    a: "In casual and most smart casual workplaces, yes, if they're dark, clean and free of rips and worn with a smarter top. Business casual offices often allow them only on Fridays; business formal offices don't. If you're new, watch what colleagues wear first.",
  },
  {
    q: "What does business formal mean?",
    a: "Business formal means a suit, or a dress or skirt with a matching jacket, in a dark colour, worn with a plain shirt or top and polished shoes. Men usually add a tie. You'll mostly meet it in law, banking and some client-facing roles, and at interviews in those fields.",
  },
  {
    q: "What should I wear for a video interview?",
    a: "Dress as you would for the interview in person, in plain colours that look calm on camera. Wear the whole outfit, not just the top half, in case you need to stand up.",
  },
  {
    q: "What should I wear on my first day?",
    a: "Dress one step above the everyday dress code, in an outfit you've worn before so nothing pinches or needs adjusting. A blazer is the easiest step up, and it comes off if you turn out to be overdressed. If you're unsure, ask your manager or recruiter what people usually wear.",
  },
];

const GUIDES = [
  { href: "/outfit-planner/", label: "An outfit planner for the clothes you own" },
  { href: "/capsule-wardrobe/", label: "Building a capsule wardrobe from what you own" },
  { href: "/blog/7-rule-for-outfits/", label: "How to plan outfits for the week" },
  { href: "/blog/capsule-wardrobe-essentials-checklist/", label: "A capsule wardrobe checklist to start with" },
];

export default function WhatToWearToWorkPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "What to wear to work", item: "/what-to-wear-to-work/" },
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
        eyebrow="What to wear to work"
        title="What to wear to work: outfit formulas for every dress code."
        lead="Match your workplace's dress code first, then adjust for the day: one step smarter for a client meeting or presentation, your usual level for a desk day. Every formula below comes with a line on why it works."
        image={HERO_IMAGES.work}
        crumbs={[{ label: "Home", href: "/" }, { label: "What to wear to work" }]}
      >
        <a href="#join-work_guide_end" className="h13-btn h13-btn--gold">Join early access</a>
        <a href="#dress-codes" className="h13-btn h13-btn--line">Outfits by dress code</a>
      </PageHero>

      <section className="fw-section fw-page__section" aria-labelledby="check">
        <div className="fw-container fw-page__narrow">
          <h2 id="check" className="fw-h2">What to wear to work: the 30-second check</h2>
          <p>Three things settle most mornings. Check them in this order.</p>
          <ol className="fw-page__steps">
            {CHECKS.map((c, i) => (
              <li key={c.title}>
                <span className="fw-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="fw-sans">{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="fw-page__note">
            If they clash, the day&apos;s plans win: a rainy day with a client meeting still gets
            the blazer, with a coat over it.
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section fw-page__band" aria-labelledby="dress-codes">
        <div className="fw-container fw-page__narrow">
          <h2 id="dress-codes" className="fw-h2">Work dress codes, from casual to business formal</h2>
          <p>Most workplaces sit somewhere on this four-step scale.</p>
          <table className="fw-page__table">
            <thead>
              <tr>
                <th scope="col">Dress code</th>
                <th scope="col">What it usually means</th>
              </tr>
            </thead>
            <tbody>
              {DRESS_CODES.map(([code, meaning]) => (
                <tr key={code}>
                  <th scope="row">{code}</th>
                  <td>{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fw-page__note">
            Each formula has a version for women and for men. Swap trousers for a skirt or a dress
            at the same level of formality.
          </p>
          <div className="fw-page__two">
            {FORMULAS.map((d) => (
              <div key={d.code}>
                <h3 className="fw-sans">{d.code}</h3>
                <ul className="fw-page__list">
                  {d.outfits.map((o) => (
                    <li key={o.outfit}>
                      <strong>{o.who}:</strong> {o.outfit}
                      <br />
                      <em>Why it works:</em> {o.why}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="fw-page__note">
            The labels shift between countries. In the US, business casual is the everyday office
            term and smart casual usually means a step more relaxed. In the UK, smart casual is far
            more common, and a British office that asks for it often expects much the same as
            American business casual. If the label is all you have, look at what your manager wears
            on an ordinary Tuesday.
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section" aria-labelledby="appropriate">
        <div className="fw-container fw-page__narrow">
          <h2 id="appropriate" className="fw-h2">Is it appropriate for work? Jeans, trainers and other grey areas</h2>
          <p>The honest answer is often that it depends on your workplace. These are the usual lines.</p>
          <dl className="fw-page__faq">
            {GREY_AREAS.map(([item, answer]) => (
              <div key={item}>
                <dt>{item}</dt>
                <dd>{answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="fw-section fw-page__section fw-page__band" aria-labelledby="tomorrow">
        <div className="fw-container fw-page__narrow">
          <h2 id="tomorrow" className="fw-h2">What to wear to work tomorrow: plan it the night before</h2>
          <p>
            Choosing at night takes five minutes. Choosing at 7.45am, with the trousers you wanted
            still in the wash, usually ends with whatever is nearest.
          </p>
          <ol className="fw-page__steps">
            {TOMORROW.map((s, i) => (
              <li key={s.title}>
                <span className="fw-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="fw-sans">{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="fw-page__note">
            To plan five days at once, see{" "}
            <Link href="/blog/7-rule-for-outfits/" className="fw-link">
              how to plan outfits for the week
            </Link>
            . If choosing is the slow part, an{" "}
            <Link href="/outfit-planner/" className="fw-link">
              outfit planner app
            </Link>{" "}
            can suggest one from your own clothes.
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section" aria-labelledby="interview">
        <div className="fw-container fw-page__narrow fw-page__prose">
          <h2 id="interview" className="fw-h2">Interview and first-day outfits</h2>
          <p>
            For an interview, dress one step above the everyday dress code. If the team wears smart
            casual, go business casual; if they wear business casual, a suit or a blazer with
            tailored trousers is safe. Ask the recruiter what people wear. It&apos;s a normal
            question.
          </p>
          <p>
            On video, plain mid-tone colours look better than fine stripes or small checks, which
            can flicker on screen.
          </p>
          <p>
            Use the same rule on your first day, in something you&apos;ve worn before, so nothing
            pinches or slips while you meet everyone. A blazer is the easy step up because it comes
            off if you&apos;re overdressed. By Friday you&apos;ll know the real dress code.
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section fw-page__band" aria-labelledby="hybrid">
        <div className="fw-container fw-page__narrow fw-page__prose">
          <h2 id="hybrid" className="fw-h2">Dressing for a hybrid week from one small wardrobe</h2>
          <PageFigure
            image={INLINE_IMAGES.workWeek}
            alt="Five work outfits laid out side by side, all from one small wardrobe: a navy blazer and white shirt with charcoal trousers and brown loafers; a cream knit with navy trousers and white trainers; a light-blue oxford shirt with dark jeans and tan loafers; a green cardigan over a white T-shirt with a black midi skirt and black ankle boots; and the navy blazer over a striped top with cream wide-leg trousers and white trainers"
            caption="Five work outfits from one small wardrobe."
          />
          <p>
            On a hybrid week, let the office days set the standard and the home days borrow from
            them. A fine knit works on a video call and under a blazer; dark trousers are
            comfortable at the kitchen table and smart enough for a meeting.
          </p>
          <p>
            In the photo, the navy blazer appears twice, over a white shirt and then over a striped
            top, and so do the white trainers. Repeats like that keep a hybrid wardrobe small.
          </p>
          <p>
            You don&apos;t need separate work-from-home clothes. To choose the pieces deliberately,
            our{" "}
            <Link href="/capsule-wardrobe/" className="fw-link">
              capsule wardrobe planner
            </Link>{" "}
            guide shows how to build one from what you already own.
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section" aria-labelledby="fitwardrobe">
        <div className="fw-container fw-page__narrow">
          <h2 id="fitwardrobe" className="fw-h2">How FitWardrobe helps you pick a work outfit</h2>
          <p>
            FitWardrobe is our app, and it isn&apos;t available yet. It&apos;s coming to Android and
            the web; on an iPhone you&apos;ll be able to use the web version.
          </p>
          <ul className="fw-page__list">
            <li>Photograph your clothes once. Each piece is tagged by type, colour, pattern, season and formality, and you can correct any tag.</li>
            <li>Choose Work or a job interview and get a complete outfit from your own clothes, with one line on why it works and one or two alternatives.</li>
            <li>Build an outfit around one piece, such as a blazer you haven&apos;t worked out how to wear.</li>
            <li>Keep or skip each outfit. Your choices shape later suggestions.</li>
          </ul>
          <p className="fw-page__note">
            It can get things wrong, and you can tell it when it does. It doesn&apos;t check the
            weather, read your calendar, judge fit or track what you&apos;ve worn. Your wardrobe is
            stored on your device; to tag a piece or suggest an outfit, a photo or item details go to
            a cloud AI service, as our{" "}
            <Link href="/ai-transparency/" className="fw-link">
              AI transparency page
            </Link>{" "}
            explains. It&apos;s free during early access.
          </p>
        </div>
      </section>

      <section className="fw-section fw-page__section fw-page__band" aria-labelledby="work-faq">
        <div className="fw-container fw-page__narrow">
          <h2 id="work-faq" className="fw-h2">Work outfit questions</h2>
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

      <section className="fw-section fw-page__section" aria-labelledby="work-guides">
        <div className="fw-container fw-page__narrow">
          <h2 id="work-guides" className="fw-h2">More outfit planning guides</h2>
          <ul className="fw-page__links">
            {GUIDES.map((g) => (
              <li key={g.href}>
                <Link href={g.href}>{g.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JoinBand
        location="work_guide_end"
        title={<>Tomorrow&apos;s outfit, from <span className="h13-gold">what you own.</span></>}
      />
    </div>
  );
}
