"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, X } from "lucide-react"

/**
 * Reveals [data-reveal] and [data-stagger] elements once as they enter the viewport.
 * Content is only hidden after this runs (html.fw-js), so it is never lost without JS.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-stagger]"))
    if (!("IntersectionObserver" in window) || els.length === 0) return
    document.documentElement.classList.add("fw-js")
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in")
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    )
    // Read every position first, then write classes, so the browser lays out once.
    const vh = window.innerHeight
    const onScreen = els.map((el) => el.getBoundingClientRect().top < vh)
    els.forEach((el, i) => {
      // Anything already on screen at load shows immediately.
      if (onScreen[i]) el.classList.add("is-in")
      else io.observe(el)
    })
    return () => {
      io.disconnect()
      document.documentElement.classList.remove("fw-js")
    }
  }, [])
  return null
}

/**
 * Mobile-only bar that appears once the hero form has scrolled away and hides from the final sign-up
 * onwards, so it never covers the footer (Cookie settings, legal links).
 */
export function StickyCta() {
  const [heroGone, setHeroGone] = useState(false)
  const [joinReached, setJoinReached] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("hero-form")
    const join = document.getElementById("join")
    if (!hero || !join || !("IntersectionObserver" in window)) return
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0)
        if (e.target === join) setJoinReached(e.isIntersecting || e.boundingClientRect.top < 0)
      }
    })
    io.observe(hero)
    io.observe(join)
    return () => io.disconnect()
  }, [])

  const show = heroGone && !joinReached && !dismissed
  return (
    <div className={`fw-sticky ${show ? "is-shown" : ""}`} aria-hidden={!show}>
      <Link href="/#join" className="fw-btn fw-btn--primary fw-sticky__btn" tabIndex={show ? 0 : -1}>
        Join early access
        <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" className="fw-btn__arrow" />
      </Link>
      <button
        type="button"
        className="fw-sticky__close"
        aria-label="Hide this bar"
        tabIndex={show ? 0 : -1}
        onClick={() => {
          setDismissed(true)
          // The bar is about to be hidden: move focus somewhere sensible.
          document.getElementById("content")?.focus({ preventScroll: true })
        }}
      >
        <X size={18} strokeWidth={1.75} />
      </button>
    </div>
  )
}
