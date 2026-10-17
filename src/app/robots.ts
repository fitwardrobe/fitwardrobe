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
        userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User', 'ClaudeBot', 'Claude-SearchBot', 'Google-Extended', 'Applebot-Extended', 'cohere-ai'],
        allow: '/',
      }
    ],
    sitemap: `${SITE_CONFIG.landingUrl}/sitemap.xml`,
  }
}
