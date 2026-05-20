"use client";

import Link from 'next/link';
import { posts } from '@/data/posts';
import { useState, useMemo } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function BlogIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    return ['All', ...new Set(posts.map(post => post.category))];
  }, []);

  const filteredPosts = useMemo(() => {
    return posts
      .filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <Navbar />
      <main id="content">
        <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-10))' }}>
          <div className="container">
            <div className="section-header">
              <h1>Wardrobe Intelligence</h1>
              <p>
                Guides, insights, and mental models to help you build a more intentional relationship with your clothes.
              </p>
            </div>

            {/* Search and Filters */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'space-between', marginBottom: 'var(--space-8)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-bg-alt)', border: '1px solid var(--color-mist)' }}>
              <div style={{ position: 'relative', flex: '1 1 300px' }}>
                <input 
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-pill)', border: '1px solid var(--color-mist)', outline: 'none', backgroundColor: 'var(--color-white)', fontFamily: 'inherit', fontSize: 'var(--text-base)' }}
                />
                <svg style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: 'var(--color-text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-2)', overflowX: 'auto', paddingBottom: '4px', flex: '1 1 100%' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{ 
                      backgroundColor: selectedCategory === cat ? 'var(--color-navy)' : 'var(--color-bg-primary)',
                      color: selectedCategory === cat ? 'var(--color-white)' : 'var(--color-text-muted)',
                      border: '1px solid ' + (selectedCategory === cat ? 'transparent' : 'var(--color-mist)'),
                      borderRadius: 'var(--radius-pill)',
                      padding: '0.5rem 1rem',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 500,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Post Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid--3">
                {filteredPosts.map((post) => (
                  <Link 
                    key={post.slug} 
                    href={`/blog/${post.slug}`}
                    className="feature-card"
                    style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid var(--color-mist)', borderRadius: 'var(--radius-lg)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-sage)', border: '1px solid var(--color-mist)', padding: '2px 8px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg-alt)' }}>
                        {post.category}
                      </span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    
                    <h3 style={{ marginBottom: 'var(--space-2)', color: 'var(--color-navy)', fontSize: 'var(--text-xl)' }}>
                      {post.title}
                    </h3>
                    
                    <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', flexGrow: 1 }}>
                      {post.excerpt}
                    </p>

                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-navy)', marginTop: 'auto' }}>
                      Read Article
                      <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--space-8)', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-mist)' }}>
                <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-muted)', fontWeight: 500 }}>No articles found matching your criteria.</h3>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                  style={{ marginTop: 'var(--space-4)', color: 'var(--color-sage)', textDecoration: 'underline', fontSize: 'var(--text-sm)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
