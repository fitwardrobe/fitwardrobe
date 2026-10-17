import { posts } from '@/data/posts';
import { Metadata } from 'next';
import { SITE_CONFIG } from './config';

export const BASE_URL = SITE_CONFIG.landingUrl;

const DEFAULT_OG_IMAGE = {
  url: '/images/home/og-home-dusk.jpg',
  width: 1200,
  height: 630,
  alt: 'FitWardrobe: outfits from the clothes you already own',
};

/**
 * Metadata for a standalone page: unique title and description, a self-referencing
 * canonical (trailing slash, resolved against metadataBase) and matching social tags.
 */
export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = path.endsWith('/') ? path : `${path}/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'FitWardrobe', type: 'website', images: [DEFAULT_OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [DEFAULT_OG_IMAGE.url] },
  };
}

/** Every page is exported as /path/index.html, so canonical URLs end in a slash. */
const withSlash = (u: string) => (u.endsWith("/") || u.includes("#") ? u : `${u}/`)

export function getBlogPostMetadata(slug: string): Metadata {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  const url = `${BASE_URL}/blog/${slug}/`;

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
      authors: ['Aryan Panwar'],
      images: [DEFAULT_OG_IMAGE],
      section: post.category,
      tags: [post.category, 'Sustainable Fashion', 'Digital Wardrobe'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export function getGlobalMetadata(): Metadata {
  const baseUrl = SITE_CONFIG.landingUrl.replace(/\/$/, "");
  
  return {
    metadataBase: new URL(baseUrl || "http://localhost:3000"),
    title: {
      default: 'FitWardrobe: AI wardrobe app for the clothes you own',
      template: '%s | FitWardrobe',
    },
    description: 'A digital wardrobe that plans outfits only from clothes you own, with a reason for each pick. Android and web, coming soon. Join the early-access list.',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'FitWardrobe',
      images: [DEFAULT_OG_IMAGE],
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
      "item": withSlash(item.item.startsWith('http') ? item.item : `${SITE_CONFIG.landingUrl.replace(/\/$/, "")}/${item.item.replace(/^\//, "")}`)
    }))
  };
}
