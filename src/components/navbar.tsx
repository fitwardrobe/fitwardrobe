"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <nav className={`nav ${isOpen ? 'nav--mobile-active' : ''}`} id="nav" aria-label="Main navigation">
      <div className="container nav__inner">
        <Link href="/" className="nav__logo" aria-label="FitWardrobe home">
          <Image
            className="nav__logo-icon"
            src="/assets/logo.png"
            alt="FitWardrobe Logo"
            width={36}
            height={36}
          />
          <span>FitWardrobe</span>
        </Link>

        <ul className="nav__links" id="navLinks">
          <li><Link href="/#features" className="nav__link">Features</Link></li>
          <li><Link href="/capsule-wardrobe" className="nav__link">Capsule Wardrobe</Link></li>
          <li><Link href="/outfit-planner" className="nav__link">Outfit Planner</Link></li>
          <li><Link href="/#how-it-works" className="nav__link">How It Works</Link></li>
          <li><Link href="/blog/" className="nav__link">Blog</Link></li>
          <li><Link href="/#download-beta" className="nav__link">Download</Link></li>
        </ul>

        <Link href="/#download-beta" className="btn btn--primary btn--sm nav__cta">
          Get Started Free
        </Link>

        <button
          className="nav__toggle"
          id="navToggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobileMenu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="nav__toggle-bar"></span>
          <span className="nav__toggle-bar"></span>
          <span className="nav__toggle-bar"></span>
        </button>
      </div>

      <div
        className="nav__mobile"
        id="mobileMenu"
        role="dialog"
        aria-label="Navigation menu"
      >
        <Link href="/#features" className="nav__mobile-link" onClick={() => setIsOpen(false)}>Features</Link>
        <Link href="/capsule-wardrobe" className="nav__mobile-link" onClick={() => setIsOpen(false)}>Capsule Wardrobe</Link>
        <Link href="/outfit-planner" className="nav__mobile-link" onClick={() => setIsOpen(false)}>Outfit Planner</Link>
        <Link href="/#how-it-works" className="nav__mobile-link" onClick={() => setIsOpen(false)}>How It Works</Link>
        <Link href="/blog/" className="nav__mobile-link" onClick={() => setIsOpen(false)}>Blog</Link>
        <Link href="/#download-beta" className="nav__mobile-link" onClick={() => setIsOpen(false)}>Download</Link>
        <div className="nav__mobile-cta">
          <Link href="/#download-beta" className="btn btn--primary" style={{ width: "100%" }} onClick={() => setIsOpen(false)}>
            Get Started Free
          </Link>
        </div>
      </div>
      <div 
        className="nav__overlay" 
        id="navOverlay" 
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      ></div>
    </nav>
  )
}
