import React from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { ArrowRight } from 'lucide-react';

export const KidsBabySection: React.FC = () => {
  const { navigateTo, setSelectedCategory, setSelectedSubcategory, setQuickViewProduct } = useEcommerce();

  const kidsProducts = PRODUCTS.filter((p) => p.category === 'kids' || p.category === 'baby').slice(0, 4);

  const subcategories = [
    {
      name: 'Boys',
      subcategory: 'Boys',
      action: 'Explore Boys',
      image: '/assets/kids-baby/boys/kb-by-01.jpg',
    },
    {
      name: 'Girls',
      subcategory: 'Girls',
      action: 'Explore Girls',
      image: '/assets/kids-baby/girls/kb-gl-01.jpg',
    },
    {
      name: 'Clothing Sets',
      subcategory: 'Clothing Sets',
      action: 'Shop Sets',
      image: '/assets/kids-baby/clothing-sets/kb-cs-01.jpg',
    },
    {
      name: 'Newborn',
      subcategory: 'Newborn',
      action: 'Shop Newborn',
      image: '/assets/kids-baby/newborn/kb-nb-01.jpg',
    },
  ];

  const handleSubcategoryClick = (subcat: string) => {
    setSelectedCategory('kids-baby');
    setSelectedSubcategory(subcat);
    navigateTo('/shop');
  };

  const handleExploreAll = () => {
    setSelectedCategory('kids-baby');
    setSelectedSubcategory('all');
    navigateTo('/shop');
  };

  return (
    <section className="py-16 bg-[#F8FBFA]" aria-label="Kids & Baby Collection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Hero Banner matching Screen 5 in reference */}
        <div className="rounded-3xl bg-gradient-to-r from-[#CFE6F3]/50 via-white to-[#B8DED0]/40 border border-[#D9E8EC] p-6 sm:p-10 overflow-hidden mb-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#477C82]">
                Kids &amp; Baby Collection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#254653] leading-tight">
                Little Looks, Big Smiles.
              </h2>
              <p className="text-base text-[#607985] max-w-md">
                Comfortable, cute and made for endless adventures. Soft organic fabrics that keep up with daily playtime and bedtime cuddles.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleSubcategoryClick('Boys')}
                  className="px-6 py-3 rounded-full bg-[#477C82] text-white text-sm font-medium hover:bg-[#39656a] transition-all shadow-xs cursor-pointer"
                >
                  Shop Boys
                </button>
                <button
                  onClick={() => handleSubcategoryClick('Girls')}
                  className="px-6 py-3 rounded-full bg-white text-[#254653] text-sm font-medium border border-[#CFE6F3] hover:border-[#477C82] transition-all cursor-pointer"
                >
                  Shop Girls
                </button>
                <button
                  onClick={handleExploreAll}
                  className="px-6 py-3 rounded-full bg-white/70 text-[#477C82] text-sm font-medium border border-[#D9E8EC] hover:bg-white transition-all cursor-pointer"
                >
                  All Kids &amp; Baby
                </button>
              </div>
            </div>

            {/* Banner Photo */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden aspect-[16/10] border-2 border-white shadow-md bg-white">
                <img
                  src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop"
                  alt="Two smiling children in matching pastel casualwear"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Category Pill Cards (Boys, Girls, Clothing Sets, Newborn) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {subcategories.map((item) => (
            <button
              key={item.name}
              onClick={() => handleSubcategoryClick(item.subcategory)}
              className="group bg-white rounded-2xl p-4 border border-[#D9E8EC] hover:border-[#CFE6F3] hover:shadow-md transition-all text-center cursor-pointer"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-[#F0F7F8] relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif font-bold text-base text-[#254653] group-hover:text-[#477C82] transition-colors">
                {item.name}
              </h3>
              <span className="text-xs text-[#607985] group-hover:text-[#477C82] flex items-center justify-center gap-1 mt-0.5">
                {item.action}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          ))}
        </div>

        {/* Featured Kids & Baby Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-2xl font-bold text-[#254653]">
              Trending for Little Ones
            </h3>
            <button
              onClick={handleExploreAll}
              className="text-sm font-semibold text-[#477C82] hover:text-[#254653] flex items-center gap-1 group cursor-pointer"
            >
              Explore All Kids &amp; Baby
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {kidsProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
