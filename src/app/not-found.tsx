"use client";

import Link from "next/link";
import Image from "next/image";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
      <div className="relative w-full max-w-md mb-8 aspect-square reveal reveal--visible">
        {/* Using the generated high-fidelity illustration */}
        <Image
          src="/lost_clothing_404_illustration_1774537261533.png"
          alt="Illustration of an empty clothing hanger in a minimalist setting"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="max-w-lg space-y-6 reveal reveal--visible reveal--delay-1">
        <h1 className="text-4xl md:text-5xl font-heading text-navy">
          This Page has been Misplaced
        </h1>
        <p className="text-lg text-gray-600">
          Like that one sock that never came back from the laundry, the page
          you are looking for seems to have disappeared into the void.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="btn btn--primary flex items-center justify-center gap-2 mx-auto w-fit"
          >
            <MoveLeft className="w-5 h-5" />
            Return to Wardrobe
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 text-sm text-gray-400 font-medium tracking-widest uppercase reveal reveal--visible reveal--delay-2">
        Error 404 — Page Not Found
      </div>
    </main>
  );
}
