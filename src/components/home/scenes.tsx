"use client"

import { useState } from "react"
import { preload } from "react-dom"
import { EarlyAccessForm } from "@/components/home/early-access-form"
import { Picture } from "@/components/home/picture"
import { GARMENTS } from "@/data/home"
import { track } from "@/lib/analytics"

/* Sample wardrobe: real pixel sizes of each cut-out (full, 240px thumb) to avoid layout shift. */
const CUT: Record<string, [number, number, number, number]> = {
  overshirt: [530, 560, 227, 240],
  blazer: [537, 560, 230, 240],
  denim: [560, 551, 240, 236],
  oxford: [528, 560, 226, 240],
  tee: [560, 556, 240, 238],
  trousers: [345, 560, 148, 240],
  jeans: [337, 560, 144, 240],
  loafers: [560, 462, 240, 198],
  sneakers: [560, 470, 240, 201],
}
const nameOf = (id: string) => GARMENTS.find((g) => g.id === id)?.name ?? id

type Outfit = { key: string; label: string; day: string; pieces: string[]; why: string }

const OFFICE: Outfit = {
  key: "office",
  label: "Office",
  day: "Thursday · Office",
  pieces: ["blazer", "oxford", "trousers", "loafers"],
  why: "Navy and light blue read sharp without a tie, and cream trousers keep it from feeling stiff.",
}
const WEEKEND: Outfit = {
  key: "weekend",
  label: "Weekend",
  day: "Saturday · Lunch with friends",
  pieces: ["denim", "tee", "trousers", "sneakers"],
  why: "Mid-blue denim over cream keeps it relaxed but put together.",
}
const HOME: Outfit = {
  key: "home",
  label: "At home",
  day: "Sunday · At home",
  pieces: ["overshirt", "tee", "trousers", "loafers"],
  why: "Olive and cream are an easy pair, and brown loafers pull the earth tones together.",
}
const DINNER: Outfit = {
  key: "dinner",
  label: "Dinner",
  day: "Friday · Dinner out",
  pieces: ["overshirt", "tee", "jeans", "loafers"],
  why: "Olive over white is an easy pair, and brown loafers lift dark jeans for the evening.",
}

/* ------------------------------------------------------------------ */
/* 1. Hero: two photographs edge to edge, the copy and a glass note     */
/* ------------------------------------------------------------------ */
const NOTE_OUTFITS = [OFFICE, HOME, WEEKEND]

export function HeroScene() {
  // The hero photo is the LCP element: start fetching it before the CSS is parsed.
  preload("/images/home/hero-960.avif", {
    as: "image",
    type: "image/avif",
    fetchPriority: "high",
    imageSrcSet:
      "/images/home/hero-640.avif 640w, /images/home/hero-960.avif 960w, /images/home/hero-1122.avif 1122w",
    imageSizes: "(min-width: 1024px) 50vw, 100vw",
  })
  const [i, setI] = useState(0)
  const o = NOTE_OUTFITS[i]
  const [d, occ] = o.day.split(" · ")

  return (
    <section className="fw-mh" aria-labelledby="hero-title">
      <div className="fw-mh__media">
        <div className="fw-mh__ph fw-mh__ph--a">
          <Picture
            name="hero"
            widths={[640, 960, 1122]}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt="A man in an olive overshirt and cream trousers sits on the arm of a sofa with a coffee, looking out of a sunlit window"
            priority
          />
        </div>
        <div className="fw-mh__ph fw-mh__ph--b">
          <Picture
            name="occasion-work"
            widths={[480, 800]}
            sizes="50vw"
            width={800}
            height={1000}
            alt="The same man walking through a bright office in a navy blazer and light-blue shirt"
          />
        </div>
      </div>

      <div className="fw-container fw-mh__inner">
        <div className="fw-mh__copy">
          <h1 id="hero-title" className="fw-mh__title">
            <span>Outfits from the clothes</span> <span>you already own.</span>
          </h1>
          <p className="fw-mh__lead">
            Photograph what you own. FitWardrobe builds outfits from those clothes, with a short note
            on why each one works.
          </p>
          <div id="hero-form" className="fw-mh__form">
            <EarlyAccessForm tone="glass" location="hero" />
          </div>
        </div>

        <aside className="fw-mh__note fw-glass fw-glass--light" aria-label="Example outfit note">
          <p className="fw-note__top fw-caps">
            <b>{d}</b>
            <span>{occ}</span>
          </p>
          <div className="fw-note__pieces">
            {o.pieces.map((id) => (
              <span key={`${o.key}-${id}`}>
                <img
                  src={`/images/home/g-${id}-cut-240.webp`}
                  alt={nameOf(id)}
                  width={CUT[id][2]}
                  height={CUT[id][3]}
                  loading="lazy"
                  decoding="async"
                />
              </span>
            ))}
          </div>
          <p key={o.key} className="fw-note__why" aria-live="polite">
            &ldquo;{o.why}&rdquo;
          </p>
          <div className="fw-note__tabs" role="group" aria-label="Example outfits">
            {NOTE_OUTFITS.map((n, k) => (
              <button
                key={n.key}
                type="button"
                aria-pressed={k === i}
                onClick={() => {
                  setI(k)
                  track("outfit_demo", { cta_text: n.label, cta_location: "hero_note" })
                }}
              >
                {n.label}
              </button>
            ))}
          </div>
          <p className="fw-note__cap">Design preview of the app&apos;s outfit note.</p>
        </aside>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 2. How it works: the brass rail (the page's one dark band)           */
/* ------------------------------------------------------------------ */
const RAIL_OUTFITS = [OFFICE, WEEKEND, DINNER]

const STEPS = [
  {
    title: "Add your clothes",
    text: "Take a photo of each piece. It's tagged by type, colour and season, and you can correct anything it gets wrong.",
  },
  {
    title: "Tell it your taste",
    text: "Pick the styles you like and the colours you avoid. Every outfit you keep or skip sharpens the next suggestion.",
  },
  {
    title: "Get an outfit",
    text: "Say where you're going and get a complete outfit from your own clothes, with a short note on why it works.",
  },
]

export function RailScene() {
  const [i, setI] = useState(0)
  const o = RAIL_OUTFITS[i]

  return (
    <section id="how-it-works" className="fw-section fw-rail" aria-labelledby="how-title">
      <div className="fw-container">
        <h2 id="how-title" className="fw-h2 fw-rail__title" data-reveal>
          From your closet to a finished outfit.
        </h2>
        <ol className="fw-rail__steps" data-stagger>
          {STEPS.map((s, k) => (
            <li key={s.title}>
              <span className="fw-num" aria-hidden="true">
                {String(k + 1).padStart(2, "0")}
              </span>
              <h3 className="fw-sans">{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>

        <figure className="fw-rail__figure" aria-label="Design preview: an outfit chosen from one wardrobe">
          <div className="fw-rail__bar">
            <div className="fw-rail__items">
              {o.pieces.map((id) => (
                <div key={`${o.key}-${id}`} className="fw-hang">
                  <img
                    src={`/images/home/g-${id}-cut.webp`}
                    alt=""
                    width={CUT[id][0]}
                    height={CUT[id][1]}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="fw-caps">{nameOf(id)}</span>
                </div>
              ))}
            </div>
          </div>
          <figcaption className="fw-rail__quote">
            <span className="fw-caps">{o.day}</span>
            <p key={o.key} className="fw-rail__why" aria-live="polite">
              &ldquo;{o.why}&rdquo;
            </p>
          </figcaption>
        </figure>

        <div className="fw-rail__chips" role="group" aria-label="Example outfits">
          {RAIL_OUTFITS.map((n, k) => (
            <button
              key={n.key}
              type="button"
              aria-pressed={k === i}
              onClick={() => {
                setI(k)
                track("outfit_demo", { cta_text: n.label, cta_location: "rail" })
              }}
            >
              {n.label}
            </button>
          ))}
        </div>
        <p className="fw-caption">Design preview of the new app. Every piece comes from one wardrobe of nine.</p>
      </div>
    </section>
  )
}
