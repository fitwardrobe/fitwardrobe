"use client"

import { useEffect, useRef } from "react"

/** Thin gold bar at the top of the window showing how far through the article you are. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = document.getElementById(targetId)
    if (!el || !bar.current) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1
      bar.current?.style.setProperty("--p", p.toFixed(3))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [targetId])
  return <div ref={bar} className="a13-progress" aria-hidden="true" />
}
