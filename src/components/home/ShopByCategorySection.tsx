import React from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { CategoryId } from '../../types';
import { ArrowRight } from 'lucide-react';
import { getResponsiveAsset } from '../../utils/responsiveAssets';

interface CategoryCardItem {
  id: CategoryId;
  name: string;
  image: string;
  itemCount: string;
}

const CATEGORY_ITEMS: CategoryCardItem[] = [
  {
    id: 'women',
    name: 'Women',
    image: '/assets/women_banner_crisp.jpg',
    itemCount: 'Dresses, Tops, Denim',
  },
  {
    id: 'men',
    name: 'Men',
    image: '/assets/men_banner_crisp.jpg',
    itemCount: 'Shirts, Jackets, Chinos',
  },
  {
    id: 'kids-baby',
    name: 'Kids & Baby',
    image: '/assets/kids_baby_crisp.jpg',
    itemCount: 'Playwear & Organic Baby Rompers',
  },
  {
    id: 'teens',
    name: 'Teens',
    image: '/assets/teens_banner_crisp.jpg',
    itemCount: 'Streetwear & Hoodies',
  },
  {
    id: 'sale',
    name: 'Sale %',
    image: '/assets/sale_banner_crisp.jpg',
    itemCount: 'Up to 50% Off',
  },
];

export const ShopByCategorySection: React.FC = () => {
  const { navigateTo } = useEcommerce();

  return (
    <section className="py-10 sm:py-14 bg-[#F8FBFA]" aria-label="Shop by Category">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#477C82]">
              Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#254653] mt-1">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => navigateTo('/shop')}
            className="text-xs font-semibold text-[#477C82] hover:text-[#254653] inline-flex items-center gap-1 transition-colors group cursor-pointer self-start sm:self-auto"
          >
            <span>View All Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 5 Apparel Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {CATEGORY_ITEMS.map((cat) => {
            const responsiveImage = getResponsiveAsset(cat.image);
            return <div
              key={cat.id}
              onClick={() => navigateTo(`/${cat.id}`)}
              className="group bg-white rounded-2xl border border-[#D9E8EC] overflow-hidden hover:border-[#1C4E57]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col cursor-pointer active:scale-97 last:col-span-2 sm:last:col-span-1 md:last:col-span-1"
            >
              {/* Image with zoom on hover */}
              <div className="relative aspect-[3/4] bg-[#F0F7F8] overflow-hidden">
                <img
                  src={responsiveImage.src}
                  srcSet={responsiveImage.srcSet}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  width={1200}
                  height={896}
                  alt={`${cat.name} fashion apparel`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-112 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-65 group-hover:opacity-40 transition-opacity duration-300" />
                <span className="absolute bottom-2.5 left-3 text-white font-serif font-bold text-sm drop-shadow-sm group-hover:translate-y-[-2px] transition-transform duration-300">
                  {cat.name}
                </span>
              </div>

              {/* Card Footer with Shop Now link */}
              <div className="p-3 flex items-center justify-between bg-white group-hover:bg-[#F0F7F8] transition-colors duration-200">
                <span className="text-[11px] font-semibold text-[#477C82] group-hover:text-[#1C4E57] transition-colors">
                  Shop Now
                </span>
                <ArrowRight className="w-3 h-3 text-[#477C82] group-hover:text-[#1C4E57] group-hover:translate-x-1.5 transition-all duration-300" />
              </div>
            </div>;
          })}
        </div>
      </div>
    </section>
  );
};
