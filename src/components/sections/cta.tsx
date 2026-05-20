"use client"

import { SITE_CONFIG } from "@/lib/config"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-(--space-20) bg-(--color-navy) text-(--color-cream) text-center" id="download" aria-labelledby="ctaHeading">
      <div className="container mx-auto px-(--content-padding)">
        <span className="inline-block font-body text-(--color-sage) font-semibold tracking-[0.08em] uppercase mb-(--space-3) reveal">
          Ready to Start?
        </span>
        <h2 id="ctaHeading" className="text-(--text-4xl) font-bold mb-6 reveal reveal--delay-1">
          Dress Better, Stay Private.
        </h2>
        <p className="max-w-[600px] mx-auto text-(--text-lg) opacity-80 mb-10 reveal reveal--delay-2">
          Download FitWardrobe for free. Quick sign-in, your data
          stays on your device, no strings attached.
        </p>
        
        <div className="flex flex-wrap justify-center gap-(--space-4) reveal reveal--delay-3">
          <Button asChild size="lg" className="bg-(--color-cream) hover:bg-white text-(--color-navy) font-bold rounded-sm px-10 h-14">
            <a href={SITE_CONFIG.apkDownloadUrl} download className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download for Android
            </a>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="bg-transparent border-[1.5px] border-[rgba(247,245,242,0.4)] text-(--color-cream) font-semibold rounded-sm px-10 h-14 hover:bg-[rgba(247,245,242,0.1)]">
            <a href={SITE_CONFIG.webAppUrl} target="_blank" rel="noopener">
              Try Web App
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
