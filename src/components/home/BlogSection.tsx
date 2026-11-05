import React from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { BLOG_POSTS } from '../../data/products';
import { BlogPost } from '../../types';
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { navigateTo } = useEcommerce();

  const handleReadArticle = (post: BlogPost) => {
    navigateTo(`/blog/${post.slug}`);
  };

  return (
    <section className="py-16 bg-[#F8FBFA] border-t border-[#D9E8EC]" aria-label="Style Guide and Editorial Blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Screen 10 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#D9E8EC]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#477C82] mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Editorial Journal</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#254653]">
              Style Guide & Blog
            </h2>
            <p className="text-sm text-[#607985] mt-1">
              Fashion tips, outfit ideas, and more for the whole family.
            </p>
          </div>
          <button
            onClick={() => navigateTo('/blog')}
            className="mt-4 sm:mt-0 text-sm font-semibold text-[#477C82] hover:text-[#254653] flex items-center gap-1 group self-start sm:self-auto cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Article Cards (matching Screen 10) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => handleReadArticle(post)}
              className="group bg-white rounded-2xl overflow-hidden border border-[#D9E8EC] hover:border-[#CFE6F3] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Article Image */}
                <div className="aspect-[16/10] bg-gray-100 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-[#477C82] px-2.5 py-0.5 rounded-full shadow-2xs">
                    {post.category}
                  </span>
                </div>

                {/* Article Content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-3 text-xs text-[#607985] mb-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#477C82]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#477C82]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#254653] group-hover:text-[#477C82] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#607985] mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More Link */}
              <div className="px-5 pb-5 pt-1">
                <span className="text-xs font-semibold text-[#477C82] group-hover:text-[#254653] flex items-center gap-1">
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
