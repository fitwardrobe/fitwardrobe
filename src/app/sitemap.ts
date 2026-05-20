import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/config'
import { posts } from '@/data/posts'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.landingUrl.replace(/\/$/, '');

  // Blog posts
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Core pages
  const routes = [
    '',
    '/blog',
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
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes, ...blogPosts]
}
