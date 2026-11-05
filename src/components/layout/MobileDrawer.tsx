import React, { useState } from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { CATEGORIES } from '../../data/products';
import { CategoryId } from '../../types';
import { FamiliaLogo } from '../ui/FamiliaLogo';
import {
  X,
  ChevronDown,
} from 'lucide-react';

export const MobileDrawer: React.FC = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    navigateTo,
  } = useEcommerce();

  const [expandedCategory, setExpandedCategory] = useState<CategoryId | null>(null);

  if (!isMobileMenuOpen) return null;

  const handleCategoryClick = (catId: CategoryId) => {
    navigateTo(`/${catId}`);
    setIsMobileMenuOpen(false);
  };

  const handleViewNav = (view: 'home' | 'shop' | 'product' | 'cart' | 'wishlist' | 'lookbook' | 'about' | 'blog' | 'contact' | 'account') => {
    if (view === 'home') navigateTo('/');
    else navigateTo(`/${view}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      {/* Dark overlay backdrop */}
      <div
        className="fixed inset-0 bg-[#254653]/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Slide-out drawer panel */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300">
        <div>
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-[#D9E8EC]">
            <FamiliaLogo size="sm" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-[#477C82] hover:bg-[#F0F7F8] rounded-full transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Navigation List */}
          <div className="p-4 space-y-1">
            <div className="text-[11px] font-semibold text-[#607985] uppercase tracking-wider px-3 mb-2">
              Collections
            </div>

            <button
              onClick={() => handleViewNav('home')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[#254653] hover:bg-[#F0F7F8] hover:text-[#477C82] transition-colors cursor-pointer"
            >
              Home
            </button>

            <button
              onClick={() => handleViewNav('about')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[#254653] hover:bg-[#F0F7F8] hover:text-[#477C82] transition-colors cursor-pointer"
            >
              About
            </button>

            {CATEGORIES.map((cat) => {
              const isExpanded = expandedCategory === cat.id;
              const isSale = cat.id === 'sale';

              return (
                <div key={cat.id} className="rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`flex-1 text-left px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                        isSale ? 'text-[#FF8F86] font-semibold' : 'text-[#254653] hover:text-[#477C82]'
                      }`}
                    >
                      {cat.name}
                      {cat.badge && (
                        <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF8F86]/15 text-[#FF8F86]">
                          {cat.badge}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                      className="p-2.5 text-gray-400 hover:text-[#477C82] cursor-pointer"
                      aria-label={`Toggle ${cat.name} subcategories`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180 text-[#477C82]' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Subcategories list */}
                  {isExpanded && (
                    <div className="pl-6 pr-3 py-2 bg-[#F0F7F8] rounded-lg space-y-1 mb-1 animate-in fade-in">
                      {cat.featuredSubcategories.map((subcat) => (
                        <button
                          key={subcat}
                          onClick={() => handleCategoryClick(cat.id)}
                          className="w-full text-left py-1 text-xs text-[#607985] hover:text-[#477C82] transition-colors cursor-pointer"
                        >
                          {subcat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-[#D9E8EC] bg-[#F8FBFA] text-xs text-[#607985]">
          <p className="font-serif font-bold text-[#254653] mb-1">FAMILIA</p>
          <p>Style. Comfort. Together.</p>
          <p className="text-[10px] text-gray-400 mt-2">© 2026 FAMILIA Fashion Inc.</p>
        </div>
      </div>
    </div>
  );
};
