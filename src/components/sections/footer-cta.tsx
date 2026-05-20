"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Smartphone, Globe } from "lucide-react"

export function FooterCTA() {
  return (
    <section className="py-(--space-20) bg-(--color-cream) border-t border-(--color-mist)">
      <div className="container mx-auto px-(--content-padding) text-center">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-bold mb-(--space-4) text-(--color-navy) reveal">
            Dress Better, Stay Private.
          </h2>
          <p className="text-(--color-text-muted) mb-(--space-10) reveal reveal--delay-1">
            Build your digital wardrobe today and experience styling that respects your data.
          </p>
          
          <div className="flex flex-wrap justify-center gap-(--space-4) reveal reveal--delay-2">
            <Button asChild size="lg" className="bg-(--color-sage) hover:bg-[#6a8a79] text-white px-8 h-12 rounded-md group">
              <a href="https://fitwardrobe.vercel.app/download/fitwardrobe.apk" className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Download for Android
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-(--color-navy) text-(--color-navy) px-8 h-12 rounded-md hover:bg-(--color-navy) hover:text-(--color-cream)">
              <Link href="https://app.fitwardrobe.me" className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Try Web App (Beta)
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
