import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, Plus } from "lucide-react"
import { Picture } from "@/components/home/picture"
import { EarlyAccessForm } from "@/components/home/early-access-form"
import { PhonePreview } from "@/components/home/phone"
import { Icon } from "@/components/home/icon"
import { RevealOnScroll, StickyCta } from "@/components/home/motion"
import { FAQS, FEATURES, GARMENTS, GUIDES, HERO_CHIPS, STEPS, STRIP, STYLES, TRUST } from "@/data/home"

const TITLE = "FitWardrobe: Digital Wardrobe & AI Outfit Planner App"
const DESCRIPTION =
  "A digital wardrobe app that plans outfits only from clothes you already own, with a reason for every pick. Android and web, coming soon. Free in early access."

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    type: "website",
    images: [
      {
        url: "/images/home/og-home-dusk.jpg",
        width: 1200,
        height: 630,
        alt: "A man in a forest-green jacket sitting on stone steps outside a glass house at dusk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/home/og-home-dusk.jpg"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

/** Illustrative taste profile for the design preview (five style axes, 0–1). */
const PROFILE = [
  { label: "Minimal", v: 0.82 },
  { label: "Classic", v: 0.7 },
  { label: "Smart casual", v: 0.9 },
  { label: "Streetwear", v: 0.38 },
  { label: "Relaxed", v: 0.62 },
]

function Radar() {
  const c = 70
  const r = 52
  const pt = (i: number, k: number) => {
    const a = (Math.PI * 2 * i) / PROFILE.length - Math.PI / 2
    return `${(c + Math.cos(a) * r * k).toFixed(1)},${(c + Math.sin(a) * r * k).toFixed(1)}`
  }
  const ring = (k: number) => PROFILE.map((_, i) => pt(i, k)).join(" ")
  return (
    <svg viewBox="0 0 140 140" className="h13-radar" aria-hidden="true">
      {[1, 0.66, 0.33].map((k) => (
        <polygon key={k} points={ring(k)} className="h13-radar__ring" />
      ))}
      {PROFILE.map((_, i) => (
        <line key={i} x1={c} y1={c} x2={pt(i, 1).split(",")[0]} y2={pt(i, 1).split(",")[1]} className="h13-radar__ring" />
      ))}
      <polygon points={PROFILE.map((p, i) => pt(i, p.v)).join(" ")} className="h13-radar__shape" />
    </svg>
  )
}

export default function HomePage() {
  return (
    <div className="fw h13">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RevealOnScroll />

      {/* 1 — Hero: dusk photograph, headline left, app preview right */}
      <section className="h13-hero" aria-labelledby="hero-title">
        <div className="h13-hero__bg">
          <picture>
            <source
              media="(max-width: 760px)"
              type="image/avif"
              srcSet="/images/home/hero-dusk-m-640.avif 640w, /images/home/hero-dusk-m-1024.avif 1024w"
              sizes="100vw"
            />
            <source
              media="(max-width: 760px)"
              type="image/webp"
              srcSet="/images/home/hero-dusk-m-640.webp 640w, /images/home/hero-dusk-m-1024.webp 1024w"
              sizes="100vw"
            />
            <source
              type="image/avif"
              srcSet="/images/home/hero-dusk-768.avif 768w, /images/home/hero-dusk-1280.avif 1280w, /images/home/hero-dusk-1536.avif 1536w"
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet="/images/home/hero-dusk-768.webp 768w, /images/home/hero-dusk-1280.webp 1280w, /images/home/hero-dusk-1536.webp 1536w"
              sizes="100vw"
            />
            <img
              src="/images/home/hero-dusk-1536.webp"
              alt="A man in a forest-green jacket and cream trousers sitting on stone steps outside a glass house at dusk"
              width={1536}
              height={1024}
              fetchPriority="high"
              decoding="sync"
            />
          </picture>
        </div>

        <div className="fw-container h13-hero__grid">
          <div className="h13-hero__copy">
            <p className="h13-eyebrow">Digital wardrobe &amp; AI outfit planner</p>
            <h1 id="hero-title" className="h13-hero__title">
              Dress smarter
              <span>with what you own.</span>
            </h1>
            <p className="h13-hero__lead">
              FitWardrobe is a digital wardrobe app that plans outfits only from the clothes you
              already own, and tells you in one line why each look works.
            </p>
            <div id="hero-form" className="h13-hero__ctas" data-cta-location="hero">
              <Link href="/#join" className="h13-btn h13-btn--gold">
                Join early access
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" className="fw-btn__arrow" />
              </Link>
              <Link href="/#how-it-works" className="h13-btn h13-btn--line" data-cta="">
                See how it works
              </Link>
            </div>
            <p className="h13-hero__meta">Free during early access · Android and web, coming soon</p>
          </div>

          <div className="h13-hero__app">
            <PhonePreview variant="today" />
            <ul className="h13-chips">
              {HERO_CHIPS.map((c) => (
                <li key={c.title} className="h13-chip">
                  <span className="h13-chip__icon">
                    <Icon name={c.icon} size={18} />
                  </span>
                  <span>
                    <b>{c.title}</b>
                    {c.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2 — Strip: what it is, in four lines */}
      <section className="h13-strip" aria-label="FitWardrobe at a glance">
        <ul className="fw-container h13-strip__list">
          {STRIP.map((s) => (
            <li key={s.title}>
              <span className="h13-strip__icon">
                <Icon name={s.icon} />
              </span>
              <span>
                <b>{s.title}</b>
                {s.text}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3 — Taste: profile + wardrobe previews over the walnut wardrobe */}
      <section id="features" className="h13-sec h13-express" aria-labelledby="express-title">
        <div className="fw-container h13-express__grid">
          <div className="h13-express__copy" data-reveal>
            <p className="h13-eyebrow h13-eyebrow--dark">More than a wardrobe app</p>
            <h2 id="express-title" className="h13-h2">
              A digital wardrobe that learns your taste.
            </h2>
            <p className="h13-lead">
              Tell FitWardrobe the styles you like and the colours you avoid. It learns from every
              outfit you keep or skip, so the next one feels more like you.
            </p>
            <Link href="/#how-it-works" className="h13-btn h13-btn--green" data-cta="" data-cta-location="taste">
              See how it works
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" className="fw-btn__arrow" />
            </Link>
          </div>

          <div className="h13-express__art" data-reveal>
            <div className="h13-express__photo">
              <Picture
                name="walnut-wardrobe"
                widths={[768, 1280]}
                sizes="(min-width: 1024px) 50vw, 100vw"
                width={1536}
                height={1024}
                alt=""
              />
            </div>
            <div className="h13-card h13-card--profile" aria-hidden="true">
              <span className="h13-card__title">Your style profile</span>
              <Radar />
              <span className="h13-card__tags">
                {PROFILE.map((p) => (
                  <span key={p.label}>{p.label}</span>
                ))}
              </span>
            </div>
            <div className="h13-card h13-card--wardrobe" aria-hidden="true">
              <span className="h13-card__title">Your wardrobe</span>
              <span className="h13-card__sub">{GARMENTS.length} pieces</span>
              <span className="h13-card__grid">
                {["overshirt", "oxford", "trousers", "jeans", "loafers", "sneakers"].map((id) => (
                  <span key={id} className="h13-tile">
                    <img src={`/images/home/g-${id}-cut-240.webp`} alt="" width={120} height={120} loading="lazy" />
                  </span>
                ))}
              </span>
              <span className="h13-card__add">
                <Plus size={16} strokeWidth={2} />
              </span>
            </div>
            <p className="h13-art-cap">Design preview</p>
          </div>
        </div>
      </section>

      {/* 4 — Styles for every occasion */}
      <section id="styles" className="h13-sec h13-styles" aria-labelledby="styles-title">
        <div className="fw-container">
          <div className="h13-head" data-reveal>
            <div>
              <p className="h13-eyebrow h13-eyebrow--dark">Outfit ideas for</p>
              <h2 id="styles-title" className="h13-h2">
                Every chapter of your life.
              </h2>
            </div>
            <p className="h13-lead">
              From the office to a weekend away. Tell it where you&apos;re going and it builds the
              outfit from your own wardrobe.
            </p>
          </div>
        </div>
        <ul className="h13-looks" data-stagger tabIndex={0} aria-label="Style examples">
          {STYLES.map((s) => (
            <li key={s.id} className="h13-look">
              <Picture
                name={`look-${s.id}`}
                widths={[400, 720]}
                sizes="(min-width: 1180px) 16vw, (min-width: 761px) 30vw, 62vw"
                width={1024}
                height={1536}
                alt={s.alt}
              />
              <span className="h13-look__text">
                <b>{s.title}</b>
                {s.text}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 5 — Features on the green band */}
      <section className="h13-features" aria-labelledby="features-title">
        <div className="h13-features__bg">
          <Picture
            name="dressing-room"
            widths={[768, 1280]}
            sizes="(min-width: 1024px) 62vw, 100vw"
            width={1536}
            height={1024}
            alt=""
          />
        </div>
        <div className="fw-container h13-features__grid">
          <div className="h13-features__app" data-reveal>
            <PhonePreview variant="idea" />
          </div>
          <div className="h13-features__copy" data-reveal>
            <p className="h13-eyebrow">Features</p>
            <h2 id="features-title" className="h13-h2 h13-h2--light">
              An outfit planner that <span className="h13-gold">explains every pick.</span>
            </h2>
            <p className="h13-lead h13-lead--light">
              Add your clothes once. Then ask the outfit planner whenever you need something to wear.
            </p>
            <ul className="h13-flist">
              {FEATURES.map((f) => (
                <li key={f.title}>
                  <span className="h13-flist__icon">
                    <Icon name={f.icon} />
                  </span>
                  <span>
                    <b>{f.title}</b>
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/#join" className="h13-btn h13-btn--gold" data-cta-location="features">
              Join early access
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" className="fw-btn__arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6 — How it works */}
      <section id="how-it-works" className="h13-sec h13-steps" aria-labelledby="steps-title">
        <div className="fw-container h13-steps__grid">
          <div data-reveal>
            <p className="h13-eyebrow h13-eyebrow--dark">How it works</p>
            <h2 id="steps-title" className="h13-h2">
              From your wardrobe to an outfit, in four steps.
            </h2>
            <p className="h13-lead">Set it up in a few minutes. It gets better every time you use it.</p>
          </div>
          <ol className="h13-steps__list" data-stagger>
            {STEPS.map((s, i) => (
              <li key={s.title} className="h13-step">
                <span className="h13-step__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="h13-step__icon">
                  <Icon name={s.icon} size={22} />
                </span>
                <h3 className="h13-step__title">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7 — Privacy and trust (in place of testimonials: there are no users yet) */}
      <section id="privacy" className="h13-sec h13-trust" aria-labelledby="trust-title">
        <div className="fw-container">
          <div className="h13-head" data-reveal>
            <div>
              <p className="h13-eyebrow h13-eyebrow--dark">Privacy and trust</p>
              <h2 id="trust-title" className="h13-h2">
                Your wardrobe stays yours.
              </h2>
            </div>
            <p className="h13-lead">
              Plain answers on where your photos go, who builds this, and how to reach him.
            </p>
          </div>
          <ul className="h13-trust__list" data-stagger>
            {TRUST.map((t) => (
              <li key={t.title} className="h13-tcard">
                <span className="h13-tcard__icon">
                  <Icon name={t.icon} size={22} />
                </span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                <Link href={t.href} className="h13-tcard__link">
                  {t.link}
                  <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8 — Guides (links into the four topic clusters) */}
      <section className="h13-sec h13-guides" aria-labelledby="guides-title">
        <div className="fw-container">
          <div className="h13-head" data-reveal>
            <div>
              <p className="h13-eyebrow h13-eyebrow--dark">From the blog</p>
              <h2 id="guides-title" className="h13-h2">
                Wardrobe apps, compared honestly.
              </h2>
            </div>
            <p className="h13-lead">
              The guides readers search for most: which wardrobe app suits you, what to use on
              Android, and what a digital wardrobe actually is.
            </p>
          </div>
          <ul className="h13-guides__list" data-stagger>
            {GUIDES.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="h13-guide">
                  <span className="h13-guide__topic">{g.topic}</span>
                  <span className="h13-guide__title">{g.title}</span>
                  <ArrowRight size={20} strokeWidth={1.25} aria-hidden="true" className="h13-guide__arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9 — FAQ */}
      <section id="faq" className="h13-sec h13-faq" aria-labelledby="faq-title">
        <div className="fw-container h13-faq__grid">
          <div data-reveal>
            <p className="h13-eyebrow h13-eyebrow--dark">Questions</p>
            <h2 id="faq-title" className="h13-h2">
              Common questions.
            </h2>
            <p className="h13-lead">
              Anything else?{" "}
              <Link href="/support/" className="fw-link">
                Ask us directly
              </Link>
            </p>
          </div>
          <div className="h13-faq__list" data-reveal>
            {FAQS.map((f) => (
              <details key={f.q} className="h13-faq__item">
                <summary>
                  <span>{f.q}</span>
                  <Plus size={20} strokeWidth={1.25} aria-hidden="true" className="h13-faq__icon" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Early access over the dusk terrace */}
      <section id="join" className="h13-join" aria-labelledby="join-title">
        <span id="download-beta" className="fw-anchor" aria-hidden="true" />
        <div className="h13-join__bg">
          <Picture
            name="terrace-dusk"
            widths={[768, 1280, 1536]}
            sizes="100vw"
            width={1536}
            height={1024}
            alt=""
          />
        </div>
        <div className="fw-container h13-join__grid">
          <div className="h13-join__copy" data-reveal>
            <p className="h13-eyebrow">Get it first</p>
            <h2 id="join-title" className="h13-h2 h13-h2--light">
              Be the first to try <span className="h13-gold">FitWardrobe.</span>
            </h2>
            <p className="h13-lead h13-lead--light">
              Leave your email and we&apos;ll write the day early access opens. Android and the web
              first; on an iPhone, use the web version.
            </p>
            <EarlyAccessForm tone="glass" location="join" />
            <ul className="h13-join__perks">
              {["An email the day it opens", "Early previews of the new app", "A direct line to the founder"].map(
                (p) => (
                  <li key={p}>
                    <Check size={16} strokeWidth={2} aria-hidden="true" />
                    {p}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="h13-join__app" data-reveal>
            <PhonePreview variant="wardrobe" />
          </div>
        </div>
      </section>

      <StickyCta />
    </div>
  )
}
