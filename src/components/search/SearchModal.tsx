import React, { useState, useEffect, useRef } from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { PRODUCTS } from '../../data/products';
import { Search, X, ArrowRight, Tag, Star } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useEcommerce();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategoryFilter === 'all' || product.category === selectedCategoryFilter;
    const matchesText =
      searchTerm.trim() === '' ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesText;
  });

  const handleProductSelect = (id: string) => {
    const prod = PRODUCTS.find((p) => p.id === id);
    navigateTo(`/product/${prod ? prod.slug : id}`);
    setIsSearchOpen(false);
  };

  const categoriesList = [
    { id: 'all', label: 'All Categories' },
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'kids', label: 'Kids' },
    { id: 'baby', label: 'Baby' },
    { id: 'teens', label: 'Teens' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'accessories', label: 'Accessories' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center items-start">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#254653]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-[#D9E8EC] z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#D9E8EC] flex items-center gap-3">
          <Search className="w-6 h-6 text-[#477C82] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dresses, shirts, kids denim, baby rompers..."
            className="w-full text-base sm:text-lg outline-none text-[#254653] placeholder-gray-400 bg-transparent font-sans"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded-md"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-gray-400 hover:text-[#477C82] hover:bg-[#F0F7F8] rounded-full transition-colors ml-1"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Pills */}
        <div className="px-4 sm:px-6 py-3 bg-[#F8FBFA] border-b border-[#D9E8EC] flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <span className="text-[#607985] font-medium flex-shrink-0">Filter:</span>
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors flex-shrink-0 ${
                selectedCategoryFilter === cat.id
                  ? 'bg-[#477C82] text-white shadow-xs'
                  : 'bg-white border border-[#D9E8EC] text-[#254653] hover:border-[#477C82]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-base text-[#254653] font-semibold mb-1">No products found</p>
              <p className="text-sm text-[#607985]">
                We couldn&apos;t find anything matching &quot;{searchTerm}&quot;. Try searching for &quot;dress&quot;, &quot;shirt&quot;, or &quot;denim&quot;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductSelect(product.id)}
                  className="group flex items-center gap-3.5 p-3 rounded-xl border border-[#D9E8EC] hover:border-[#CFE6F3] hover:bg-[#F0F7F8] cursor-pointer transition-all"
                >
                  <div className="w-16 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {product.discountPercentage && (
                      <span className="absolute top-1 left-1 bg-[#FF8F86] text-white text-[9px] font-bold px-1 rounded">
                        -{product.discountPercentage}%
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#477C82]">
                        {product.category}
                      </span>
                      <span className="text-[10px] text-gray-400">•</span>
                      <div className="flex items-center text-[11px] text-amber-500 font-medium">
                        <Star className="w-3 h-3 fill-amber-400 stroke-amber-400 mr-0.5" />
                        {product.rating}
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-[#254653] group-hover:text-[#477C82] truncate transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-[#254653]">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#477C82] group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#F8FBFA] border-t border-[#D9E8EC] text-xs text-[#607985] flex items-center justify-between">
          <span>Showing {filteredProducts.length} items</span>
          <span className="text-[11px]">Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
