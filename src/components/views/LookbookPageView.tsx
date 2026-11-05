import React, { useState } from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { LOOKBOOK_COLLECTIONS, PRODUCTS } from '../../data/products';
import { LookbookItem, Product } from '../../types';
import { Sparkles, ShoppingBag, ArrowRight, Check } from 'lucide-react';

export const LookbookPageView: React.FC = () => {
  const { addToCart, navigateTo } = useEcommerce();
  const [selectedLook, setSelectedLook] = useState<LookbookItem>(LOOKBOOK_COLLECTIONS[0]);
  const [addedAll, setAddedAll] = useState(false);

  const getLookProducts = (productIds: string[]): Product[] => {
    return PRODUCTS.filter((p) => productIds.includes(p.id));
  };

  const currentProducts = getLookProducts(selectedLook.featuredProductIds);

  const handleAddAll = () => {
    currentProducts.forEach((p) => {
      addToCart(p, p.colors[0], p.sizes[0] || 'M', 1);
    });
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 2500);
  };

  return (
    <div className="py-10 bg-[#F8FBFA]" aria-label="Family Lookbook Collections">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B8DED0]/40 text-[#477C82] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Harmonious Outfits</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#254653]">
            Matching Styles. Stronger Bonds.
          </h1>
          <p className="text-sm sm:text-base text-[#607985]">
            Explore coordinated family capsules curated for holiday cards, vacations, and sunny weekend memories.
          </p>
        </div>

        {/* Lookbook selector tabs */}
        <div className="flex justify-center gap-2 overflow-x-auto no-scrollbar py-2">
          {LOOKBOOK_COLLECTIONS.map((look) => {
            const isSelected = selectedLook.id === look.id;
            return (
              <button
                key={look.id}
                onClick={() => setSelectedLook(look)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#477C82] text-white shadow-xs'
                    : 'bg-white border border-[#D9E8EC] text-[#254653] hover:border-[#477C82]'
                }`}
              >
                {look.title}
              </button>
            );
          })}
        </div>

        {/* Featured Look Display */}
        <div className="bg-white rounded-3xl border border-[#D9E8EC] p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 border border-[#D9E8EC]">
              <img
                src={selectedLook.image}
                alt={selectedLook.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#477C82] shadow-xs">
                {selectedLook.tag}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#477C82]">
                Lookbook Capsule
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#254653] mt-1">
                {selectedLook.title}
              </h2>
              <p className="text-sm text-[#607985] mt-2 leading-relaxed">
                {selectedLook.subtitle}
              </p>
            </div>

            {/* Products inside this look */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#607985]">
                Matching Pieces in this Set:
              </h4>
              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {currentProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-[#D9E8EC] bg-[#F8FBFA] hover:bg-white transition-colors"
                  >
                    <div
                      onClick={() => navigateTo(`/product/${p.slug}`)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-12 h-14 object-cover rounded-lg bg-gray-100"
                      />
                      <div>
                        <h5 className="font-serif font-bold text-xs text-[#254653] hover:text-[#477C82]">
                          {p.name}
                        </h5>
                        <span className="text-xs font-semibold text-[#254653]">
                          ${p.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(p, p.colors[0], p.sizes[0] || 'M', 1)}
                      className="px-3 py-1 rounded-full bg-[#477C82] hover:bg-[#39656a] text-white text-[11px] font-medium transition-colors"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddAll}
              className={`w-full py-3.5 rounded-full font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 ${
                addedAll
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#FF8F86] hover:bg-[#f27e74] text-white'
              }`}
            >
              {addedAll ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Entire Set Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add All {currentProducts.length} Pieces to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
