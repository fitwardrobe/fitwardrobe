import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/config'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'Googlebot-Extended', 'anthropic-ai', 'cohere-ai'],
        allow: '/',
      }
    ],
    sitemap: `${SITE_CONFIG.landingUrl}/sitemap.xml`,
  }
}
