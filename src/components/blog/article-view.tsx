"use client"

import { useEffect } from "react"
import { track } from "@/lib/analytics"

/** Sends one article_view per post view, with its category, for cluster-level reporting. */
export function ArticleView({ slug, category }: { slug: string; category: string }) {
  useEffect(() => {
    track("article_view", { post_category: category, page_type: "blog_post", content_id: slug })
  }, [slug, category])
  return null
}
