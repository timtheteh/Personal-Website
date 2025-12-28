"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import { blogTags } from '@/content/blog/tags';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  thumbnail: string;
  tags: string[];
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from API route
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching blog posts:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen px-4 tablet:px-6 desktop:px-8 py-12 tablet:py-16 desktop:py-20">
        <div className="max-w-[1200px] border-2 border-green-500 mx-auto">
          <div className="text-center py-12">
            <div className="text-foreground/50">Loading blog posts...</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 tablet:px-6 desktop:px-8 py-12 tablet:py-16 desktop:py-20">
      <div className="max-w-[1200px] border-2 border-green-500 mx-auto">
        {/* Header Section - Two columns on desktop/tablet, one column on mobile */}
        <div className="flex flex-col tablet:flex-row gap-8 tablet:gap-12 desktop:gap-12 mb-8 tablet:mb-12">
          {/* Column 1: Image (placeholder) - Desktop/Tablet only */}
          <div className="w-full tablet:w-[40%] hidden tablet:flex items-center justify-center">
            <div className="w-full aspect-square max-w-[400px] rounded-2xl bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center">
              <span className="text-foreground/50">Image placeholder</span>
            </div>
          </div>
          
          {/* Column 2: Card Component */}
          <div className="w-full tablet:w-[60%] flex items-center justify-center tablet:pr-8 desktop:pr-8">
            <Card className="p-8">
              <h1 className="text-5xl font-bold mb-4">Blog</h1>
              <p className="text-foreground/70">
                Welcome to my blog! Here you&apos;ll find articles about web development, technology, and my experiences.
              </p>
            </Card>
          </div>
        </div>
        
        {/* Search, Filter, and Sort Controls */}
        <div className="mb-6 tablet:mb-8">
          {/* Desktop/Tablet: Single row */}
          <div className="hidden tablet:flex items-center gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#2C2C2C] border-2 border-white/30 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-brandcolour1 transition-[border-color]"
              />
            </div>
            {/* Filter Button */}
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2C2C2C] border-2 border-white/30 text-foreground hover:border-brandcolour1 transition-[border-color]">
            Filter
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            {/* Sort Button */}
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2C2C2C] border-2 border-white/30 text-foreground hover:border-brandcolour1 transition-[border-color]">
            Sort
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </button>
          </div>
          
          {/* Mobile: Two rows */}
          <div className="flex flex-col gap-4 tablet:hidden">
            {/* First row: Search Bar */}
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#2C2C2C] border-2 border-white/30 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-brandcolour1 transition-[border-color]"
              />
            </div>
            {/* Second row: Filter and Sort Buttons */}
            <div className="flex gap-4">
              <button className="flex items-center justify-center gap-2 flex-1 px-6 py-3 rounded-lg bg-[#2C2C2C] border-2 border-white/30 text-foreground hover:border-brandcolour1 transition-[border-color]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
              </button>
              <button className="flex items-center justify-center gap-2 flex-1 px-6 py-3 rounded-lg bg-[#2C2C2C] border-2 border-white/30 text-foreground hover:border-brandcolour1 transition-[border-color]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                Sort
              </button>
            </div>
          </div>
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col rounded-2xl border-2 border-white/30 overflow-hidden hover:border-brandcolour1 transition-[border-color] cursor-pointer no-underline hover:no-underline text-inherit hover:text-inherit"
            >
              {/* Thumbnail */}
              <div className="w-full aspect-video bg-gradient-to-br from-brandcolour1/20 to-brandcolour2/20 flex items-center justify-center">
                <span className="text-foreground/50 text-sm">Thumbnail</span>
              </div>
              {/* Description Section */}
              <div className="p-4 flex flex-col gap-2 bg-[#2C2C2C] flex-1">
                <h2 className="text-xl font-semibold text-brandcolour2">{post.title}</h2>
                <p className="text-sm text-foreground/70">{post.description}</p>
                <span className="text-xs text-brandcolour1 font-mono mt-2">{post.date}</span>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags?.map((tagSlug) => {
                    const tag = blogTags[tagSlug];
                    if (!tag) return null;
                    return (
                      <span
                        key={tagSlug}
                        className="px-2 py-1 text-xs font-mono rounded"
                        style={{ 
                          backgroundColor: tag.color + '20',
                          color: tag.color,
                          border: `1px solid ${tag.color}40`
                        }}
                      >
                        {tag.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
