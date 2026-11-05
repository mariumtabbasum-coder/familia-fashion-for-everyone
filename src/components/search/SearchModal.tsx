import { useEffect, useMemo, useRef, useState } from 'react';
import type { FC } from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { PRODUCTS } from '../../data/products';
import type { CategoryId } from '../../types';
import { ArrowRight, Search, Star, X } from 'lucide-react';

type CategoryFilter = 'all' | CategoryId | 'shoes' | 'accessories';

const categories: ReadonlyArray<{ id: CategoryFilter; label: string }> = [
  { id: 'all', label: 'All Categories' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'kids', label: 'Kids' },
  { id: 'baby', label: 'Baby' },
  { id: 'teens', label: 'Teens' },
  { id: 'shoes', label: 'Shoes' },
  { id: 'accessories', label: 'Accessories' },
];

export const SearchModal: FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useEcommerce();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<CategoryFilter>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSearchOpen) {
      setSearchTerm('');
      setSelectedCategoryFilter('all');
      return;
    }

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 50);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsSearchOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen, setIsSearchOpen]);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();

    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategoryFilter === 'all'
        || product.category === selectedCategoryFilter
        || (selectedCategoryFilter === 'kids' && product.category === 'kids-baby')
        || (selectedCategoryFilter === 'baby' && product.category === 'kids-baby');
      const matchesText = !query
        || product.name.toLocaleLowerCase().includes(query)
        || product.subcategory.toLocaleLowerCase().includes(query)
        || product.tags.some((tag) => tag.toLocaleLowerCase().includes(query));

      return matchesCategory && matchesText;
    });
  }, [searchTerm, selectedCategoryFilter]);

  const handleProductSelect = (productId: string) => {
    const product = PRODUCTS.find(({ id }) => id === productId);
    if (!product) return;

    setIsSearchOpen(false);
    navigateTo(`/product/${product.slug}`);
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6 md:p-20">
      <button
        type="button"
        aria-label="Close search"
        className="fixed inset-0 cursor-default bg-[#254653]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-[#D9E8EC] bg-white text-left text-[#254653] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <h2 id="search-modal-title" className="sr-only">Search products</h2>

        <div className="flex items-center gap-3 border-b border-[#D9E8EC] p-4 sm:p-6">
          <Search aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-[#477C82]" />
          <input
            ref={inputRef}
            aria-label="Search products"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            placeholder="Search dresses, shirts, kids denim, baby rompers..."
            className="w-full bg-transparent font-sans text-base text-[#254653] outline-none placeholder:text-gray-400 sm:text-lg"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="rounded-md px-2 py-1 text-xs text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="ml-1 rounded-full p-2 text-gray-500 transition-colors hover:bg-[#F0F7F8] hover:text-[#477C82]"
            aria-label="Close search"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto border-b border-[#D9E8EC] bg-[#F8FBFA] px-4 py-3 text-xs sm:px-6">
          <span className="flex-shrink-0 font-medium text-[#607985]">Filter:</span>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={selectedCategoryFilter === category.id}
              onClick={() => setSelectedCategoryFilter(category.id)}
              className={`flex-shrink-0 rounded-full px-3 py-1.5 font-medium transition-colors ${
                selectedCategoryFilter === category.id
                  ? 'bg-[#477C82] text-white shadow-xs'
                  : 'border border-[#D9E8EC] bg-white text-[#254653] hover:border-[#477C82]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6" aria-live="polite">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="mb-1 text-base font-semibold text-[#254653]">No products found</p>
              <p className="text-sm text-[#607985]">
                We couldn&apos;t find anything matching &quot;{searchTerm}&quot;. Try searching for &quot;dress&quot;, &quot;shirt&quot;, or &quot;denim&quot;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleProductSelect(product.id)}
                  className="group flex w-full items-center gap-3.5 rounded-xl border border-[#D9E8EC] p-3 text-left transition-all hover:border-[#CFE6F3] hover:bg-[#F0F7F8]"
                >
                  <span className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={product.images[0]}
                      alt=""
                      width={64}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    {product.discountPercentage != null && (
                      <span className="absolute left-1 top-1 rounded bg-[#FF8F86] px-1 text-[9px] font-bold text-white">
                        -{product.discountPercentage}%
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="mb-1 flex items-center gap-1.5">
                      <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-[#477C82]">
                        {product.category}
                      </span>
                      <span aria-hidden="true" className="text-[10px] text-gray-500">•</span>
                      <span className="flex flex-shrink-0 items-center text-[11px] font-medium text-amber-600">
                        <Star aria-hidden="true" className="mr-0.5 h-3 w-3 fill-amber-400 stroke-amber-500" />
                        {product.rating}
                      </span>
                    </span>
                    <span className="block truncate text-sm font-semibold text-[#254653] transition-colors group-hover:text-[#477C82]">
                      {product.name}
                    </span>
                    <span className="mt-1 flex items-center gap-2">
                      <span className="text-sm font-bold text-[#254653]">${product.price.toFixed(2)}</span>
                      {product.originalPrice != null && (
                        <span className="text-xs text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </span>
                  </span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-gray-500 transition-all group-hover:translate-x-1 group-hover:text-[#477C82]" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#D9E8EC] bg-[#F8FBFA] px-6 py-3 text-xs text-[#607985]">
          <span>Showing {filteredProducts.length} items</span>
          <span className="text-[11px]">Press ESC to close</span>
        </div>
      </section>
    </div>
  );
};
