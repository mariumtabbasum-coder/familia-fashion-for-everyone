import React from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { ArrowRight, Shirt, Sparkles } from 'lucide-react';

export const MenSection: React.FC = () => {
  const { navigateTo, setSelectedCategory, setSelectedSubcategory, setQuickViewProduct } = useEcommerce();

  const menProducts = PRODUCTS.filter((p) => p.category === 'men').slice(0, 4);

  const menCategories = [
    { name: 'Shirts', subcategory: 'Shirts', image: '/assets/men/shirts/m-sh-01.jpg' },
    { name: 'T-Shirts', subcategory: 'T-shirts', image: '/assets/men/t-shirts/m-ts-01.jpg' },
    { name: 'Jeans', subcategory: 'Jeans', image: '/assets/men/jeans/m-jn-01.jpg' },
    { name: 'Trousers', subcategory: 'Trousers', image: '/assets/men/trousers/m-tr-01.jpg' },
    { name: 'Jackets', subcategory: 'Jackets', image: '/assets/men/jackets/m-jk-01.jpg' },
    { name: 'Activewear', subcategory: 'Activewear', image: '/assets/men/activewear/m-aw-01.jpg' },
  ];

  return (
    <section className="py-16 bg-white border-t border-[#D9E8EC]" aria-label="Men Collection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Men's Banner matching Screen 6 in reference */}
        <div className="rounded-3xl bg-gradient-to-r from-[#F0F7F8] via-white to-[#CFE6F3]/40 border border-[#D9E8EC] p-6 sm:p-10 overflow-hidden mb-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#477C82]">
                Men&apos;s Collection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#254653] leading-tight">
                Modern Styles for Modern Men.
              </h2>
              <p className="text-base text-[#607985] max-w-md">
                From casual weekend essentials to polished smart attire. Breathable natural linens, tailored cuts, and built-to-last construction.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('/men')}
                  className="px-7 py-3 rounded-full bg-[#477C82] text-white text-sm font-medium hover:bg-[#39656a] transition-all shadow-xs flex items-center gap-2 group cursor-pointer"
                >
                  <span>Shop Men</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Banner Photo of stylish man in sunglasses matching Screen 6 */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden aspect-[16/10] border-2 border-white shadow-md bg-white">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop"
                  alt="Stylish man wearing green shirt and sunglasses outdoors"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 6 Category Shortcuts (Shirts, T-Shirts, Jeans, Trousers, Jackets, Activewear) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {menCategories.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setSelectedCategory('men');
                setSelectedSubcategory(item.subcategory);
                navigateTo('/men');
              }}
              className="group bg-[#F8FBFA] rounded-2xl p-3 border border-[#D9E8EC] hover:border-[#CFE6F3] hover:bg-white hover:shadow-md transition-all text-center flex flex-col items-center cursor-pointer"
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

        {/* Men's Product Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-2xl font-bold text-[#254653]">
              Curated Men&apos;s Essentials
            </h3>
            <button
              onClick={() => navigateTo('/men')}
              className="text-sm font-semibold text-[#477C82] hover:text-[#254653] flex items-center gap-1 group cursor-pointer"
            >
              View Full Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {menProducts.map((product) => (
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
