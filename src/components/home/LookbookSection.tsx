import React, { useState } from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { LOOKBOOK_COLLECTIONS, PRODUCTS } from '../../data/products';
import { LookbookItem, Product } from '../../types';
import { ArrowRight, Sparkles, X, ShoppingBag } from 'lucide-react';

export const LookbookSection: React.FC = () => {
  const { navigateTo, addToCart } = useEcommerce();
  const [activeLook, setActiveLook] = useState<LookbookItem | null>(null);

  const handleOpenLook = (look: LookbookItem) => {
    setActiveLook(look);
  };

  const getLookProducts = (productIds: string[]): Product[] => {
    return PRODUCTS.filter((p) => productIds.includes(p.id));
  };

  return (
    <section className="py-16 bg-white border-t border-[#D9E8EC]" aria-label="Family Matching Lookbook">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner matching Screen 8 in reference */}
        <div className="rounded-3xl bg-gradient-to-r from-[#CFE6F3]/50 via-[#F0F7F8] to-[#B8DED0]/40 border border-[#D9E8EC] p-6 sm:p-10 overflow-hidden mb-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#477C82] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#477C82]" />
                Family Matching Lookbook
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#254653] leading-tight">
                Matching Styles. Stronger Bonds.
              </h2>
              <p className="text-base text-[#607985] max-w-md">
                Perfect outfits for your perfect moments. Coordinated palettes and complementary cuts designed so every generation looks and feels harmonious together.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('/lookbook')}
                  className="px-7 py-3 rounded-full bg-[#477C82] text-white text-sm font-medium hover:bg-[#39656a] transition-all shadow-xs flex items-center gap-2 group cursor-pointer"
                >
                  <span>Explore Lookbook</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Banner Photo matching Screen 8 */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden aspect-[16/10] border-2 border-white shadow-md bg-white">
                <img
                  src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop"
                  alt="Coordinated family laughing together in pastel outfits"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Lookbook Cards (Family Looks, Casual Vibes, Beach Ready, Festive Wear) matching Screen 8 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOOKBOOK_COLLECTIONS.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenLook(item)}
              className="group bg-[#F8FBFA] rounded-2xl overflow-hidden border border-[#D9E8EC] hover:border-[#CFE6F3] hover:shadow-lg transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {item.badge && (
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#477C82] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                    {item.badge}
                  </span>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/95 text-[#254653] font-semibold text-xs px-3.5 py-1.5 rounded-full shadow-md">
                    Shop The Look
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#477C82]">
                    {item.tag}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#254653] mt-1 group-hover:text-[#477C82] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#607985] mt-1 line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#D9E8EC]/60 flex items-center justify-between text-xs font-semibold text-[#477C82]">
                  <span>{item.featuredProductIds.length} items in this look</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Shop The Look Modal */}
      {activeLook && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center">
          <div
            className="fixed inset-0 bg-[#254653]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setActiveLook(null)}
          />

          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-[#D9E8EC] z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-5 border-b border-[#D9E8EC] flex items-center justify-between bg-[#F8FBFA]">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#477C82]">
                  Shop The Look
                </span>
                <h3 className="font-serif text-xl font-bold text-[#254653]">
                  {activeLook.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLook(null)}
                className="p-2 text-gray-400 hover:text-[#477C82] rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Look Image banner */}
            <div className="relative aspect-[16/8] bg-gray-100 overflow-hidden">
              <img
                src={activeLook.image}
                alt={activeLook.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 text-white">
                <p className="text-xs sm:text-sm font-medium">{activeLook.subtitle}</p>
              </div>
            </div>

            {/* Items Included */}
            <div className="p-6 max-h-[45vh] overflow-y-auto space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#607985]">
                Matching Pieces in this Set
              </h4>
              <div className="space-y-3">
                {getLookProducts(activeLook.featuredProductIds).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-[#D9E8EC] bg-white hover:bg-[#F0F7F8] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-14 h-16 rounded-lg object-cover bg-gray-50 border border-[#D9E8EC]"
                      />
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#477C82]">
                          {product.category}
                        </span>
                        <h5 className="text-sm font-bold text-[#254653]">{product.name}</h5>
                        <p className="text-xs font-semibold text-[#254653]">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        addToCart(product, product.colors[0], product.sizes[0] || 'M', 1)
                      }
                      className="px-3.5 py-1.5 rounded-full bg-[#477C82] hover:bg-[#39656a] text-white text-xs font-medium flex items-center gap-1.5 shadow-2xs transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add Item
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#F8FBFA] border-t border-[#D9E8EC] flex justify-end">
              <button
                onClick={() => {
                  getLookProducts(activeLook.featuredProductIds).forEach((p) => {
                    addToCart(p, p.colors[0], p.sizes[0] || 'M', 1);
                  });
                  setActiveLook(null);
                }}
                className="px-6 py-2.5 rounded-full bg-[#477C82] text-white font-medium text-xs hover:bg-[#39656a] transition-all shadow-xs"
              >
                Add Entire Outfit to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
