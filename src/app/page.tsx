"use client"

import { Hero } from "@/components/sections/hero"
import { TrustBar } from "@/components/sections/trust-bar"
import { Privacy } from "@/components/sections/privacy"
import { Features } from "@/components/sections/features"
import { WhoItIsFor } from "@/components/sections/who-it-is-for"
import { UseCases } from "@/components/sections/use-cases"
import { HowItWorks } from "@/components/sections/how-it-works"
import { BetaDownload } from "@/components/sections/beta-download"
import { Community } from "@/components/sections/community"
import { FAQ } from "@/components/sections/faq"
import { CTA } from "@/components/sections/cta"

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Privacy />
      <Features />
      <WhoItIsFor />
      <UseCases />
      <HowItWorks />
      <BetaDownload />
      <Community />
      <FAQ />
      <CTA />
    </main>
  )
}
