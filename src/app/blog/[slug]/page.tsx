import { posts } from '@/data/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArticleView } from '@/components/blog/article-view';

interface Props {
  params: Promise<{ slug: string }>;
}

// A quiet early-access box before the third H2: most readers never reach the end of a post.
const MID_CTA =
  '<aside class="mid-cta" aria-label="Early access"><p class="mid-cta__title">Plan outfits from the clothes you already own</p>' +
  '<p>FitWardrobe is coming soon to Android and the web. Free during early access.</p>' +
  '<a class="mid-cta__link" href="/#join" data-cta-location="blog_post_mid">Join early access</a></aside>'

function withMidArticleCta(html: string): string {
  let count = 0
  return html.replace(/<h2[\s>]/g, (m) => (++count === 3 ? MID_CTA + m : m))
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

import { getBlogPostMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return getBlogPostMetadata(slug);
}

import '../blog-content.css';

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ArticleView slug={post.slug} category={post.category} />
      <div className="progress-bar" role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100}></div>
      
      {/* Inject JSON-LD Scripts */}
      {post.jsonLd?.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ld }}
        />
      ))}

      <article
        className="blog-wrapper section-content"
        dangerouslySetInnerHTML={{
          // Wide tables scroll sideways on phones, so keyboard users must be able to focus them.
          __html: withMidArticleCta(post.content.replace(/<table(?![^>]*tabindex)/g, '<table tabindex="0"')),
        }}
      />

      <div className="container container--narrow pb-20">
        <div className="blog-cta reveal">
          <h3>Plan outfits from the clothes you already own</h3>
          <p>
            FitWardrobe is coming soon to Android and the web. Join the early-access list and we&apos;ll email you the day it opens.
          </p>
          <Link
            href="/#join"
            className="btn btn--primary"
          >
            Join early access
          </Link>
        </div>
      </div>
    </>
  );
}

