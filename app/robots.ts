import { MetadataRoute } from 'next'
import { siteOrigin } from '@/lib/seo'

// Crawlers that fetch pages to answer questions or train models. They are named so that the policy
// is explicit and easy to change per bot, instead of being implied by the wildcard.
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
  'cohere-ai',
  'meta-externalagent',
  'Amazonbot',
  'DuckAssistBot',
]

// Private or non-content routes. The most specific rule wins, so the two /api/ paths that serve
// images stay crawlable (social cards and post covers).
const privatePaths = ['/api/', '/auth/', '/settings/', '/oauth/', '/blog/create', '/blog/*/edit', '/resume/print']
const publicApi = ['/api/og', '/api/image/']

export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin()
  return {
    rules: [
      { userAgent: '*', allow: ['/', ...publicApi], disallow: privatePaths },
      { userAgent: aiCrawlers, allow: ['/', ...publicApi], disallow: privatePaths },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  }
}
