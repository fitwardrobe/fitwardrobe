"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Global boundary caught error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
      <div className="w-20 h-20 bg-terracotta/10 rounded-full flex items-center justify-center mb-8 border border-terracotta/20">
        <AlertCircle className="w-10 h-10 text-terracotta" />
      </div>

      <div className="max-w-xl space-y-6">
        <h1 className="text-4xl md:text-5xl font-heading text-navy">
          Something went wrong
        </h1>
        <p className="text-lg text-gray-600">
          We encountered an unexpected error while trying to display this page. 
          Your wardrobe data is safe—this is just a temporary glitch in the matrix.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
          <button
            onClick={() => reset()}
            className="btn btn--primary flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-5 h-5" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="btn btn--secondary flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>

      {error.digest && (
        <div className="absolute bottom-8 text-xs text-gray-300 font-mono">
          Error ID: {error.digest}
        </div>
      )}
    </main>
  );
}
