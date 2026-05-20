"use client";

import { useEffect } from "react";

/**
 * RevealObserver Component
 * 
 * Unified IntersectionObserver for scroll-reveal animations.
 * Replaces redundant inline scripts and solves memory leak issues.
 */
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -100px 0px",
        threshold: 0.1,
      }
    );

    const observeElements = () => {
      const reveals = document.querySelectorAll(".reveal:not(.reveal--visible)");
      reveals.forEach((el) => observer.observe(el));
    };

    // Initial observation
    observeElements();

    // Since Next.js uses client-side navigation, we need to observe 
    // new elements when the DOM changes.
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}
