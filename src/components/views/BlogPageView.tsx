import React from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { BLOG_POSTS } from '../../data/products';
import { BlogPost } from '../../types';
import { Calendar, Clock, ArrowLeft, Share2, Tag, BookOpen } from 'lucide-react';

export const BlogPageView: React.FC = () => {
  const { selectedBlogSlug, setSelectedBlogSlug, navigateTo } = useEcommerce();

  const currentPost: BlogPost | undefined = BLOG_POSTS.find((p) => p.slug === selectedBlogSlug);

  if (currentPost) {
    return (
      <article className="py-12 bg-[#F8FBFA]" aria-label={currentPost.title}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <button
            onClick={() => setSelectedBlogSlug(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#477C82] hover:text-[#254653] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <header className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-[#B8DED0]/40 text-[#477C82] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {currentPost.category}
              </span>
              <span className="text-xs text-[#607985] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#477C82]" />
                {currentPost.readTime}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#254653] leading-tight">
              {currentPost.title}
            </h1>

            <div className="flex items-center gap-3 text-xs text-[#607985] pb-4 border-b border-[#D9E8EC]">
              <span className="font-semibold text-[#254653]">By {currentPost.author.name}</span>
              <span>•</span>
              <span>{currentPost.author.role}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#477C82]" />
                {currentPost.date}
              </span>
            </div>
          </header>

          {/* Hero Article Image */}
          <div className="rounded-3xl overflow-hidden aspect-[16/9] border border-[#D9E8EC] shadow-md bg-gray-100">
            <img
              src={currentPost.image}
              alt={currentPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Excerpt Lead */}
          <p className="text-lg sm:text-xl text-[#254653] font-serif italic border-l-4 border-[#477C82] pl-4 py-1">
            &quot;{currentPost.excerpt}&quot;
          </p>

          {/* Article Body */}
          <div className="space-y-5 text-sm sm:text-base text-[#607985] leading-relaxed font-sans">
            {currentPost.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Next / Related CTA */}
          <div className="pt-8 border-t border-[#D9E8EC] flex items-center justify-between">
            <button
              onClick={() => setSelectedBlogSlug(null)}
              className="text-xs font-semibold text-[#477C82] hover:underline"
            >
              ← Read other stories
            </button>
            <button
              onClick={() => navigateTo('/shop')}
              className="px-6 py-2.5 rounded-full bg-[#477C82] text-white text-xs font-semibold hover:bg-[#39656a] cursor-pointer"
            >
              Shop Featured Collections
            </button>
          </div>
        </div>
      </article>
    );
  }

  // All Articles Grid
  return (
    <div role="region" className="py-12 bg-[#F8FBFA]" aria-label="Style Guide and Editorial Journal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B8DED0]/40 text-[#477C82] text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Familia Editorial</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#254653]">
            Style Guide & Blog
          </h1>
          <p className="text-sm text-[#607985]">
            Curated tips on seasonal packing, coordinating family portraits, caring for organic fabrics, and living in comfort together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedBlogSlug(post.slug)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#D9E8EC] hover:border-[#CFE6F3] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] bg-gray-100 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 text-[11px] font-bold text-[#477C82] px-3 py-1 rounded-full shadow-2xs">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[#607985] mb-2 font-medium">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="font-serif font-bold text-xl text-[#254653] group-hover:text-[#477C82] transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#607985] mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <span className="text-xs font-semibold text-[#477C82] group-hover:text-[#254653] inline-flex items-center gap-1">
                  Read Full Story →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
