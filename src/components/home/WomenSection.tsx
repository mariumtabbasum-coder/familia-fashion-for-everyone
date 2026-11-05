import React from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { ArrowRight } from 'lucide-react';

export const WomenSection: React.FC = () => {
  const { navigateTo, setSelectedCategory, setSelectedSubcategory, setQuickViewProduct } = useEcommerce();

  const womenProducts = PRODUCTS.filter((p) => p.category === 'women').slice(0, 4);

  const womenCategories = [
    { name: 'Dresses', image: '/assets/women/dresses/w-dr-01.jpg' },
    { name: 'Tops', image: '/assets/women/tops/w-tp-01.jpg' },
    { name: 'Jeans', image: '/assets/women/jeans/w-jn-01.jpg' },
    { name: 'Co-ords', image: '/assets/women/co-ords/w-cd-01.jpg' },
    { name: 'Activewear', image: '/assets/women/activewear/w-aw-01.jpg' },
  ];

  return (
    <section className="py-16 bg-[#F8FBFA] border-t border-[#D9E8EC]" aria-label="Women Collection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Women Banner matching Screen 7 in reference */}
        <div className="rounded-3xl bg-gradient-to-r from-[#CFE6F3]/40 via-white to-[#FF8F86]/20 border border-[#D9E8EC] p-6 sm:p-10 overflow-hidden mb-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#477C82]">
                Women&apos;s Collection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#254653] leading-tight">
                Elegant. Confident. You.
              </h2>
              <p className="text-base text-[#607985] max-w-md">
                Discover the latest trends in women’s fashion. Lightweight florals, relaxed tailoring, and conscious organic cotton staples designed to flatter every silhouette.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('/women')}
                  className="px-7 py-3 rounded-full bg-[#477C82] text-white text-sm font-medium hover:bg-[#39656a] transition-all shadow-xs flex items-center gap-2 group cursor-pointer"
                >
                  <span>Shop Women</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Banner Photo matching Screen 7 (stylish woman in pink shirt & white trousers) */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden aspect-[16/10] border-2 border-white shadow-md bg-white">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
                  alt="Elegant woman wearing pink linen top and white trousers"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 5 Subcategory Shortcuts (Dresses, Tops, Jeans, Co-ords, Activewear) matching Screen 7 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {womenCategories.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setSelectedCategory('women');
                setSelectedSubcategory(item.name);
                navigateTo('/women');
              }}
              className="group bg-white rounded-2xl p-3 border border-[#D9E8EC] hover:border-[#CFE6F3] hover:shadow-md transition-all text-center flex flex-col items-center cursor-pointer"
            >
              <div className="w-full aspect-[3/4] rounded-xl overflow-hidden mb-2.5 bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <span className="text-sm font-semibold text-[#254653] group-hover:text-[#477C82] transition-colors">
                {item.name}
              </span>
            </button>
          ))}
        </div>

        {/* Women's Product Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-2xl font-bold text-[#254653]">
              Highlighted Women&apos;s Styles
            </h3>
            <button
              onClick={() => navigateTo('/women')}
              className="text-sm font-semibold text-[#477C82] hover:text-[#254653] flex items-center gap-1 group cursor-pointer"
            >
              Explore Women&apos;s Store
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {womenProducts.map((product) => (
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
