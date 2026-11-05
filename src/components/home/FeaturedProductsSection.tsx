import React, { useState } from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedProductsSection: React.FC = () => {
  const { navigateTo, setQuickViewProduct } = useEcommerce();
  const [activeTab, setActiveTab] = useState<'all' | 'women' | 'men' | 'kids' | 'essentials'>('all');

  // Curated mixture across categories: women, men, kids, baby, shoes, accessories
  const featuredProductIds = [
    'floral-maxi-dress',     // Women's clothing
    'mens-casual-shirt',     // Men's clothing
    'kids-denim-jacket',     // Children's clothing
    'baby-romper',           // Baby clothing
    'summer-dress',          // Women's clothing
    'mens-field-jacket',     // Men's clothing
    'teen-oversized-hoodie', // Teen's clothing
    'cozy-knit-sweater',     // Women's clothing
  ];

  const featuredList = PRODUCTS.filter((p) => featuredProductIds.includes(p.id));

  const displayedProducts = featuredList.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'women') return p.category === 'women';
    if (activeTab === 'men') return p.category === 'men';
    if (activeTab === 'kids') return p.category === 'kids' || p.category === 'baby' || p.category === 'kids-baby';
    if (activeTab === 'essentials') return p.category === 'teens';
    return true;
  });

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-[#D9E8EC]" aria-label="Featured Products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#477C82] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#477C82]" />
              <span>Curated Selection</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#254653]">
              Featured Products
            </h2>
            <p className="text-sm text-[#607985] mt-1">
              Hand-picked bestsellers and timeless staples for the entire family.
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Picks' },
              { id: 'women', label: 'Women' },
              { id: 'men', label: 'Men' },
              { id: 'kids', label: 'Kids & Baby' },
              { id: 'essentials', label: 'Shoes & Bags' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#477C82] text-white shadow-xs'
                    : 'bg-[#F8FBFA] text-[#254653] hover:bg-[#F0F7F8] border border-[#D9E8EC]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Explore All Products CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigateTo('/shop')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white hover:bg-[#F0F7F8] text-[#254653] font-medium text-sm border border-[#CFE6F3] hover:border-[#477C82] transition-all shadow-xs cursor-pointer group"
          >
            <span>Explore All {PRODUCTS.length} Styles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#477C82]" />
          </button>
        </div>
      </div>
    </section>
  );
};
