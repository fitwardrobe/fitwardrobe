"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/site/logo"
import { NAV_LINKS } from "@/data/home"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      setOpen(false)
      toggleRef.current?.focus()
    }
    // Keep keyboard focus inside the open menu: everything behind it is inert.
    const behind = [document.getElementById("content"), document.querySelector(".fw-footer")]
    behind.forEach((el) => el?.setAttribute("inert", ""))
    document.addEventListener("keydown", onKey)
    document.documentElement.classList.add("fw-menu-open")
    return () => {
      behind.forEach((el) => el?.removeAttribute("inert"))
      document.removeEventListener("keydown", onKey)
      document.documentElement.classList.remove("fw-menu-open")
    }
  }, [open])

  return (
    <header
      className={`fw-header ${scrolled || open || pathname !== "/" ? "is-solid" : ""} ${open ? "is-open" : ""}`}
    >
      <div className="fw-container fw-header__inner">
        <Link href="/" className="fw-header__home" aria-label="FitWardrobe home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="fw-header__nav">
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="fw-header__link">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/#join" className="fw-btn fw-btn--primary fw-btn--sm fw-header__cta">
          Join early access
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="fw-header__toggle"
          aria-expanded={open}
          aria-controls="fw-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} strokeWidth={1.75} /> : <Menu size={24} strokeWidth={1.75} />}
        </button>
      </div>

      <div id="fw-mobile-menu" className="fw-menu" hidden={!open}>
        <nav aria-label="Mobile" className="fw-container">
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="fw-menu__link" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#faq" className="fw-menu__link" onClick={() => setOpen(false)}>
                FAQ
              </Link>
            </li>
          </ul>
          <Link
            href="/#join"
            className="fw-btn fw-btn--primary fw-btn--block"
            onClick={() => setOpen(false)}
          >
            Join early access
          </Link>
        </nav>
      </div>
    </header>
  )
}
