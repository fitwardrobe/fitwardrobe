import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/config'
import { posts } from '@/data/posts'
import { privacyData } from '@/data/legal/privacy'
import { termsData } from '@/data/legal/terms'

export const dynamic = 'force-static'

// Date the core pages last changed. Update when their content changes (not on every build).
const SITE_UPDATED = '2026-10-18'

// "October 23, 2026" -> "2026-10-23", never earlier than SITE_UPDATED (the redesign release).
const legalDate = (lastUpdated: string) => {
  const d = new Date(`${lastUpdated} 12:00 UTC`).toISOString().slice(0, 10)
  return d > SITE_UPDATED ? d : SITE_UPDATED
}

// Core pages that changed after SITE_UPDATED. Legal pages follow their "Last updated" line.
const PAGE_UPDATED: Record<string, string> = {
  '/privacy': legalDate(privacyData.lastUpdated),
  '/terms': legalDate(termsData.lastUpdated),
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.landingUrl.replace(/\/$/, '');

  // Blog posts
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: post.updated ?? post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Core pages
  const routes = [
    '',
    '/blog',
    '/about',
    '/capsule-wardrobe',
    '/outfit-planner',
    '/minimalist-wardrobe',
    '/ai-transparency',
    '/privacy',
    '/terms',
    '/cookies',
    '/security',
    '/accessibility',
    '/support',
  ].map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified: PAGE_UPDATED[route] ?? SITE_UPDATED,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes, ...blogPosts]
}
