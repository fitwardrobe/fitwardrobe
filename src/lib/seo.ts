import { posts } from '@/data/posts';
import { Metadata } from 'next';
import { SITE_CONFIG } from './config';

export const BASE_URL = SITE_CONFIG.landingUrl;

export function getBlogPostMetadata(slug: string): Metadata {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  const url = `${BASE_URL}/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: url,
      siteName: 'FitWardrobe',
      type: 'article',
      publishedTime: post.date,
      authors: ['FitWardrobe Team'],
      section: post.category,
      tags: [post.category, 'Sustainable Fashion', 'Digital Wardrobe'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export function getGlobalMetadata(): Metadata {
  const baseUrl = SITE_CONFIG.landingUrl.replace(/\/$/, "");
  
  return {
    metadataBase: new URL(baseUrl || "http://localhost:3000"),
    title: {
      default: 'FitWardrobe | AI Outfit Planner & Capsule Wardrobe',
      template: '%s | FitWardrobe',
    },
    description: 'FitWardrobe helps you fit your wardrobe to your lifestyle with AI. Plan outfits, build capsule wardrobes. Photos stay on device. Free beta available.',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: BASE_URL,
      siteName: 'FitWardrobe',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@fitwardrobe',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generates JSON-LD BreadcrumbList schema for a given page
 */
export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith('http') ? item.item : `${SITE_CONFIG.landingUrl.replace(/\/$/, "")}/${item.item.replace(/^\//, "")}`
    }))
  };
}
