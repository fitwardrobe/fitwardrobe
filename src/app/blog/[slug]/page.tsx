import { posts } from '@/data/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
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
      <div className="progress-bar" role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100}></div>
      
      {/* Inject JSON-LD Scripts */}
      {post.jsonLd?.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ld }}
        />
      ))}

      <main 
        id="content" 
        className="blog-wrapper section-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      <div className="container container--narrow pb-20">
        <div className="blog-cta reveal">
          <h3>Start Smarter Wardrobe Habits</h3>
          <p>
            Ready to see which clothes you actually wear? Track your wear frequency and make data-driven wardrobe decisions with FitWardrobe.
          </p>
          <Link 
            href="/#download-beta" 
            className="btn btn--primary"
          >
            Get Started for Free
          </Link>
        </div>
      </div>
    </>
  );
}

