import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { CategoryId } from '../../types';
import { FamiliaLogo } from '../ui/FamiliaLogo';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface DropdownItem {
  label: string;
  subcategory?: string;
}

interface NavCategory {
  id: CategoryId;
  name: string;
  isSale?: boolean;
  items: DropdownItem[];
}

const NAV_CATEGORIES: NavCategory[] = [
  {
    id: 'women',
    name: 'Women',
    items: [
      { label: "All Women's Clothing" },
      { label: 'Dresses', subcategory: 'Dresses' },
      { label: 'Tops', subcategory: 'Tops' },
      { label: 'Jeans', subcategory: 'Jeans' },
      { label: 'Co-ords', subcategory: 'Co-ords' },
      { label: 'Activewear', subcategory: 'Activewear' },
      { label: 'Outerwear', subcategory: 'Outerwear' },
      { label: 'Lingerie & Sleep', subcategory: 'Lingerie' },
      { label: 'Plus Size & Curve', subcategory: 'Plus Size' },
    ],
  },
  {
    id: 'men',
    name: 'Men',
    items: [
      { label: "All Men's Clothing" },
      { label: 'Shirts', subcategory: 'Shirts' },
      { label: 'T-shirts', subcategory: 'T-shirts' },
      { label: 'Jeans', subcategory: 'Jeans' },
      { label: 'Trousers', subcategory: 'Trousers' },
      { label: 'Jackets', subcategory: 'Jackets' },
      { label: 'Activewear', subcategory: 'Activewear' },
    ],
  },
  {
    id: 'kids-baby',
    name: 'Kids & Baby',
    items: [
      { label: "All Kids & Baby Clothing" },
      { label: 'Boys Clothing', subcategory: 'Boys' },
      { label: 'Girls Clothing', subcategory: 'Girls' },
      { label: 'Clothing Sets', subcategory: 'Clothing Sets' },
      { label: 'Newborn Essentials', subcategory: 'Newborn' },
      { label: 'Baby Rompers & Sets', subcategory: 'Rompers' },
      { label: 'Kids T-Shirts', subcategory: 'T-shirts' },
      { label: 'Organic Cotton Staples', subcategory: 'Organic Essentials' },
    ],
  },
  {
    id: 'teens',
    name: 'Teens',
    items: [
      { label: "All Teens' Fashion" },
      { label: 'Casualwear', subcategory: 'Casualwear' },
      { label: 'Dresses', subcategory: 'Dresses' },
      { label: 'Tops', subcategory: 'Tops' },
      { label: 'Jeans', subcategory: 'Jeans' },
      { label: 'Streetwear', subcategory: 'Streetwear' },
      { label: 'Hoodies', subcategory: 'Hoodies' },
    ],
  },
  {
    id: 'sale',
    name: 'Sale',
    isSale: true,
    items: [
      { label: 'All Sale Items' },
      { label: "Women's Sale", subcategory: 'Women Sale' },
      { label: "Men's Sale", subcategory: 'Men Sale' },
      { label: "Kids & Baby Sale", subcategory: 'Kids & Baby Sale' },
      { label: "Teens' Sale", subcategory: 'Teens Sale' },
      { label: 'Under $25', subcategory: 'Under $25' },
      { label: 'Clearance (Up to 50% Off)', subcategory: 'Clearance' },
    ],
  },
];

export interface HeaderProps {
  isEmbedded?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isEmbedded = false }) => {
  const {
    cartItemsCount,
    wishlist,
    currentPath,
    navigateTo,
    setSelectedSubcategory,
    setIsSearchOpen,
    setIsMobileMenuOpen,
  } = useEcommerce();

  // Single active dropdown state for the navbar
  const [activeDropdown, setActiveDropdown] = useState<CategoryId | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback((catId: CategoryId) => {
    clearCloseTimeout();
    // Instantly close previous dropdown and open this category's dropdown
    setActiveDropdown(catId);
  }, [clearCloseTimeout]);

  const handleMouseLeave = useCallback(() => {
    clearCloseTimeout();
    // Gentle 120ms timeout so pointer moving between trigger and menu doesn't flicker,
    // but moving to an adjacent category immediately clears this and updates!
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  }, [clearCloseTimeout]);

  const handleDropdownMouseEnter = useCallback((catId: CategoryId) => {
    clearCloseTimeout();
    setActiveDropdown(catId);
  }, [clearCloseTimeout]);

  const handleCategoryClick = useCallback((catId: CategoryId, e: React.MouseEvent) => {
    // On coarse pointer / touch devices, first tap toggles dropdown
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch && activeDropdown !== catId) {
      e.preventDefault();
      clearCloseTimeout();
      setActiveDropdown(catId);
      return;
    }

    clearCloseTimeout();
    setActiveDropdown(null);
    navigateTo(`/${catId}`);
    setSelectedSubcategory('all');
  }, [activeDropdown, clearCloseTimeout, navigateTo, setSelectedSubcategory]);

  const handleSubItemClick = useCallback((catId: CategoryId, subcategory?: string) => {
    clearCloseTimeout();
    setActiveDropdown(null);
    navigateTo(`/${catId}`);
    setSelectedSubcategory(subcategory || 'all');
  }, [clearCloseTimeout, navigateTo, setSelectedSubcategory]);

  const handleHomeClick = useCallback(() => {
    clearCloseTimeout();
    setActiveDropdown(null);
    navigateTo('/');
  }, [clearCloseTimeout, navigateTo]);

  // Keyboard navigation & click outside dismiss
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        clearCloseTimeout();
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearCloseTimeout();
        if (activeDropdown && buttonRefs.current[activeDropdown]) {
          buttonRefs.current[activeDropdown]?.focus();
        }
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      clearCloseTimeout();
    };
  }, [activeDropdown, clearCloseTimeout]);

  const isHomeActive = currentPath === '/' || currentPath === '';

  return (
    <>
      <header
        className={
          isEmbedded
            ? 'relative w-full z-30 bg-white rounded-2xl border border-[#D9E8EC] shadow-2xs transition-all'
            : 'fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#D9E8EC] shadow-xs transition-shadow'
        }
      >
        {/* Top Announcement Bar (omitted in embedded container mode) */}
        {!isEmbedded && (
          <div className="bg-[#CFE6F3]/50 text-[#254653] py-1.5 px-3 sm:px-4 text-[11px] sm:text-xs text-center border-b border-[#D9E8EC]/50 font-medium flex items-center justify-center gap-2 sm:gap-3 tracking-wide truncate">
            <span className="hidden sm:inline">✨ One Brand. Every Generation.</span>
            <span className="truncate">Free standard shipping on orders over $50</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">30-Day Easy Returns</span>
          </div>
        )}

        {/* Main Header Bar */}
        <div className={isEmbedded ? 'px-2 sm:px-4 lg:px-6' : 'max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'}>
          <div className={`flex items-center justify-between ${isEmbedded ? 'h-14 sm:h-16' : 'h-16 sm:h-18 lg:h-20'}`}>
            {/* Left: Brand Logo */}
            <button
              onClick={handleHomeClick}
              className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#477C82] rounded-lg py-1 pr-1 sm:pr-2 cursor-pointer shrink-0"
              aria-label="FAMILIA Home"
            >
              <FamiliaLogo size="md" />
            </button>

            {/* Center: Desktop Navigation Bar with Compact Dropdowns */}
            <nav
              ref={navRef}
              className="hidden lg:flex items-center space-x-0.5 xl:space-x-1.5 2xl:space-x-2"
              aria-label="Main Navigation"
            >
              {/* Home link */}
              <button
                onClick={handleHomeClick}
                className={`px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-medium rounded-xl transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  isHomeActive && !activeDropdown && currentPath === '/'
                    ? 'text-[#254653] font-semibold bg-[#E8F3F4]'
                    : 'text-[#254653]/85 hover:text-[#1C4E57] hover:bg-[#E8F3F4]/60'
                }`}
              >
                Home
              </button>

              {/* About link placed right next to Home */}
              <button
                onClick={() => {
                  clearCloseTimeout();
                  setActiveDropdown(null);
                  navigateTo('/about');
                }}
                className={`px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-medium rounded-xl transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  currentPath === '/about'
                    ? 'text-[#254653] font-semibold bg-[#E8F3F4]'
                    : 'text-[#254653]/85 hover:text-[#1C4E57] hover:bg-[#E8F3F4]/60'
                }`}
              >
              About
            </button>

            {/* Category Dropdowns */}
            {NAV_CATEGORIES.map((cat) => {
              const isSale = cat.isSale;
              const isOpen = activeDropdown === cat.id;
              const isCurrent = currentPath === `/${cat.id}`;

              return (
                <div
                  key={cat.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(cat.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    ref={(el) => {
                      buttonRefs.current[cat.id] = el;
                    }}
                    onClick={(e) => handleCategoryClick(cat.id, e)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        clearCloseTimeout();
                        setActiveDropdown(cat.id);
                      }
                    }}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-controls={`dropdown-${cat.id}`}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-[13px] xl:text-sm font-medium rounded-xl transition-all duration-150 cursor-pointer whitespace-nowrap ${
                      isSale
                        ? isOpen || isCurrent
                          ? 'text-[#E86759] font-semibold bg-[#FFEBE8]'
                          : 'text-[#E86759] font-semibold hover:bg-[#FFEBE8]/70'
                        : isOpen || isCurrent
                        ? 'text-[#254653] font-semibold bg-[#E8F3F4]'
                        : 'text-[#254653]/85 hover:text-[#1C4E57] hover:bg-[#E8F3F4]/60'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen
                          ? 'rotate-180 text-[#254653]'
                          : isSale
                          ? 'text-[#E86759]/80'
                          : 'text-[#5C7C85]'
                      }`}
                    />
                  </button>

                  {/* Clean, Compact Dropdown Panel */}
                  {isOpen && (
                    <div
                      className={`absolute top-full ${
                        cat.id === 'sale' ? 'right-0' : 'left-0'
                      } pt-1.5 z-50`}
                      onMouseEnter={() => handleDropdownMouseEnter(cat.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div
                        id={`dropdown-${cat.id}`}
                        role="menu"
                        aria-label={`${cat.name} menu`}
                        className="w-56 py-1.5 bg-white rounded-xl shadow-xl border border-[#D9E8EC] text-left ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-100"
                      >
                        {cat.items.map((item, idx) => {
                          const isFirst = idx === 0;
                          return (
                            <button
                              key={item.label}
                              role="menuitem"
                              onClick={() => handleSubItemClick(cat.id, item.subcategory)}
                              className={`w-full text-left px-3.5 py-2 text-[13px] font-sans transition-colors cursor-pointer flex items-center justify-between group ${
                                isFirst
                                  ? 'font-semibold text-[#477C82] hover:bg-[#F0F7F8] border-b border-[#D9E8EC]/60 mb-1'
                                  : isSale
                                  ? 'text-[#254653] hover:text-[#FF8F86] hover:bg-[#FF8F86]/10 font-medium'
                                  : 'text-[#254653] hover:text-[#477C82] hover:bg-[#F0F7F8] font-medium'
                              }`}
                            >
                              <span className="truncate">{item.label}</span>
                              {isFirst && (
                                <ChevronRight className="w-3.5 h-3.5 text-[#477C82] opacity-70 group-hover:translate-x-0.5 transition-transform shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right: Search, Account, Wishlist, Cart Actions + Mobile/Tablet Hamburger Menu */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-[#EAF5F6] hover:bg-[#DCEEEF] text-[#254653] hover:text-[#1C4E57] flex items-center justify-center transition-all duration-200 border border-[#D3E8EC]/60 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              aria-label="Search clothing catalog"
              title="Search"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 transition-transform group-hover:scale-110" />
            </button>

            {/* Account Link (Visible on mobile, tablet, and desktop) */}
            <button
              onClick={() => {
                clearCloseTimeout();
                setActiveDropdown(null);
                navigateTo('/account');
              }}
              className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 hover:bg-[#F0F7F8] active:scale-95 shrink-0 ${
                currentPath === '/account'
                  ? 'text-[#1C4E57] bg-[#E8F3F4]'
                  : 'text-[#254653] hover:text-[#1C4E57]'
              }`}
              aria-label="Account sign in and profile"
              title="Account"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </button>

            {/* Wishlist Link with Badge */}
            <button
              onClick={() => {
                clearCloseTimeout();
                setActiveDropdown(null);
                navigateTo('/wishlist');
              }}
              className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-200 relative cursor-pointer hover:scale-105 hover:bg-[#F0F7F8] active:scale-95 shrink-0 ${
                currentPath === '/wishlist'
                  ? 'text-[#E86759] bg-[#FFEBE8]'
                  : 'text-[#254653] hover:text-[#E86759]'
              }`}
              aria-label={`Wishlist with ${wishlist.length} saved items`}
              title="Wishlist"
            >
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 transition-transform hover:scale-110" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 min-w-3.5 sm:h-4 sm:min-w-4 px-0.5 items-center justify-center rounded-full bg-[#E86759] text-[8px] sm:text-[9px] font-bold text-white shadow-2xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart / Shopping Bag with Badge */}
            <button
              onClick={() => {
                clearCloseTimeout();
                setActiveDropdown(null);
                navigateTo('/cart');
              }}
              className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-200 relative cursor-pointer hover:scale-105 hover:bg-[#F0F7F8] active:scale-95 shrink-0 ${
                currentPath === '/cart'
                  ? 'text-[#1C4E57] bg-[#E8F3F4]'
                  : 'text-[#254653] hover:text-[#1C4E57]'
              }`}
              aria-label={`Shopping cart with ${cartItemsCount} items`}
              title="Shopping Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 transition-transform hover:-rotate-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 min-w-3.5 sm:h-4 sm:min-w-4 px-0.5 items-center justify-center rounded-full bg-[#1C4E57] text-[8px] sm:text-[9px] font-bold text-white shadow-2xs">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile & Tablet Hamburger Menu Button (Right Side, lg:hidden) */}
            <button
              onClick={() => {
                clearCloseTimeout();
                setActiveDropdown(null);
                setIsMobileMenuOpen(true);
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-xl text-[#254653] hover:text-[#477C82] hover:bg-[#F0F7F8] flex items-center justify-center lg:hidden transition-all duration-150 cursor-pointer active:scale-95 border border-[#D9E8EC] bg-[#F8FBFA] shadow-2xs shrink-0"
              aria-label="Open mobile navigation menu"
              title="Menu"
            >
              <Menu className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#254653]" />
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* Dedicated fixed navbar compensating spacer to eliminate layout jump */}
    {!isEmbedded && (
      <div
        className="h-[92px] sm:h-[102px] lg:h-[112px] w-full shrink-0 pointer-events-none select-none"
        aria-hidden="true"
      />
    )}
  </>
  );
};
