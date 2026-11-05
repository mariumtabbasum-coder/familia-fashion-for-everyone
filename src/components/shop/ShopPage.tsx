import React, { useState, useMemo } from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { CATEGORIES, PRODUCTS } from '../../data/products';
import { CategoryId } from '../../types';
import { ProductCard } from '../product/ProductCard';
import familyLookbookImg from '../../assets/images/family_lookbook_fashion_1792841854700.jpg';
import {
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Tag,
  ArrowRight,
  CheckCircle2,
  Filter,
  Grid,
  RotateCcw,
  ShoppingBag,
  Heart,
  ChevronRight,
  X,
} from 'lucide-react';

interface CategoryHeroMeta {
  label: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  highlights: string[];
}

const CATEGORY_META: Record<string, CategoryHeroMeta> = {
  all: {
    label: 'A L L   C O L L E C T I O N S',
    title: 'Style for Every Generation',
    subtitle: 'Harmonious palettes and coordinated cuts designed for women, men, kids, babies, and teens.',
    badge: 'Apparel Catalog',
    image: '/assets/hero_family_clear.jpg',
    highlights: ['All Sizes 0M - XXL', '100% Organic Fabrics', 'Coordinated Palettes'],
  },
  women: {
    label: "W O M E N ' S   C O L L E C T I O N",
    title: "Women's Collection",
    subtitle: 'Elegant. Confident. You.',
    badge: "Women's Fashion",
    image: '/assets/women_banner_crisp.jpg',
    highlights: ['Pure Washed Linen', 'Breathable Silhouettes', 'Timeless Elegance'],
  },
  men: {
    label: "M E N ' S   C O L L E C T I O N",
    title: "Men's Collection",
    subtitle: 'Modern Looks. Everyday Comfort.',
    badge: "Men's Essentials",
    image: '/assets/men_banner_crisp.jpg',
    highlights: ['Crisp Chambray Weaves', 'Easy-Iron Cotton', 'Everyday Comfort'],
  },
  'kids-baby': {
    label: 'K I D S   &   B A B Y',
    title: 'Kids & Baby',
    subtitle: 'Little Styles. Big Smiles.',
    badge: 'Kids & Baby Clothing',
    image: '/assets/kids_baby_crisp.jpg',
    highlights: ['Play-Ready Clothing Sets', 'Organic Newborn Rompers', 'Sibling Matching'],
  },
  kids: {
    label: 'K I D S   &   B A B Y',
    title: 'Kids & Baby',
    subtitle: 'Little Styles. Big Smiles.',
    badge: 'Kids & Baby Clothing',
    image: '/assets/kids_baby_crisp.jpg',
    highlights: ['Play-Ready Clothing Sets', 'Organic Newborn Rompers', 'Sibling Matching'],
  },
  baby: {
    label: 'K I D S   &   B A B Y',
    title: 'Kids & Baby',
    subtitle: 'Little Styles. Big Smiles.',
    badge: 'Kids & Baby Clothing',
    image: '/assets/kids_baby_crisp.jpg',
    highlights: ['Play-Ready Clothing Sets', 'Organic Newborn Rompers', 'Sibling Matching'],
  },
  teens: {
    label: "T E E N S '   C O L L E C T I O N",
    title: "Teens' Collection",
    subtitle: 'Trendy Silhouettes. Express Your Vibe.',
    badge: 'Youth & Streetwear',
    image: '/assets/teens_banner_crisp.jpg',
    highlights: ['Relaxed Vintage Washes', 'Heavyweight Cotton', 'Everyday Essentials'],
  },
  sale: {
    label: 'M I D - S E A S O N   S A L E',
    title: 'Mid-Season Family Sale',
    subtitle: 'Special Markdowns. Up to 50% Off.',
    badge: 'Up to 50% Off',
    image: '/assets/sale_banner_crisp.jpg',
    highlights: ['Up to 50% Savings', 'Full Family Styles', '60-Day Easy Returns'],
  },
};

export const ShopPage: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    setQuickViewProduct,
    navigateTo,
  } = useEcommerce();
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlySale, setOnlySale] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Active meta details
  const activeMeta = CATEGORY_META[selectedCategory] || CATEGORY_META.all;

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && selectedCategory !== 'sale') {
        if (selectedCategory === 'kids-baby') {
          if (product.category !== 'kids' && product.category !== 'baby' && product.category !== 'kids-baby') {
            return false;
          }
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }
      if (selectedCategory === 'sale' && !product.isSale) {
        return false;
      }

      // Subcategory filter with robust matching and Sale handling
      if (selectedSubcategory !== 'all') {
        if (selectedCategory === 'sale') {
          if (selectedSubcategory === 'Women Sale') {
            if (product.category !== 'women') return false;
          } else if (selectedSubcategory === 'Men Sale') {
            if (product.category !== 'men') return false;
          } else if (selectedSubcategory === 'Kids & Baby Sale') {
            if (product.category !== 'kids' && product.category !== 'baby' && product.category !== 'kids-baby') return false;
          } else if (selectedSubcategory === 'Teens Sale') {
            if (product.category !== 'teens') return false;
          } else if (selectedSubcategory === 'Under $25') {
            if (product.price >= 25) return false;
          } else if (selectedSubcategory === 'Clearance') {
            if (!product.discountPercentage || product.discountPercentage < 22) return false;
          } else if (product.subcategory !== selectedSubcategory) {
            return false;
          }
        } else {
          const cleanSub = (s: string) => s.toLowerCase().replace(/[-_]/g, ' ').replace(/ clothing| essentials| & sets/g, '').replace(/\s+/g, ' ').trim();
          const normSelected = cleanSub(selectedSubcategory);
          const normProd = cleanSub(product.subcategory);
          const matchesMain = product.subcategory === selectedSubcategory || normProd === normSelected;
          const matchesSecondary = product.subcategories?.some(
            (s) => s === selectedSubcategory || cleanSub(s) === normSelected
          );
          if (!matchesMain && !matchesSecondary) {
            return false;
          }
        }
      }

      // Size filter
      if (selectedSize !== 'all' && !product.sizes.includes(selectedSize)) {
        return false;
      }

      // Sale toggle
      if (onlySale && !product.isSale) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured
    });
  }, [selectedCategory, selectedSubcategory, selectedSize, onlySale, sortBy]);

  // Current category definition
  const currentCategoryObj =
    selectedCategory !== 'all'
      ? CATEGORIES.find((c) => c.id === selectedCategory)
      : null;

  // Available subcategories for current view
  const availableSubcategories = useMemo(() => {
    if (selectedCategory === 'kids-baby' || selectedCategory === 'kids' || selectedCategory === 'baby') {
      return ['Boys', 'Girls', 'Clothing Sets', 'Newborn', 'Rompers', 'T-shirts', 'Organic Essentials'];
    }
    if (selectedCategory !== 'all' && currentCategoryObj) {
      return currentCategoryObj.featuredSubcategories;
    }
    const set = new Set<string>();
    PRODUCTS.forEach((p) => set.add(p.subcategory));
    return Array.from(set);
  }, [selectedCategory, currentCategoryObj]);

  const sizesList = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3-4Y', '7-8Y', '0-3M'];

  const categoryTabList: { id: CategoryId | 'all'; name: string; isSale?: boolean }[] = [
    { id: 'all', name: 'All Clothing' },
    { id: 'women', name: 'Women' },
    { id: 'men', name: 'Men' },
    { id: 'kids-baby', name: 'Kids & Baby' },
    { id: 'teens', name: 'Teens' },
    { id: 'sale', name: 'Sale %', isSale: true },
  ];

  const clearAllFilters = () => {
    setSelectedSubcategory('all');
    setSelectedSize('all');
    setOnlySale(false);
  };

  const hasActiveFilters = selectedSubcategory !== 'all' || selectedSize !== 'all' || onlySale;

  return (
    <div className="py-6 sm:py-10 bg-[#F8FBFA] min-h-screen" aria-label="Shop Catalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Bar */}
        <nav className="flex items-center gap-2 text-xs text-[#607985] mb-4 overflow-x-auto whitespace-nowrap py-1">
          <button 
            onClick={() => navigateTo('/')}
            className="hover:text-[#477C82] hover:underline transition-colors font-medium cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <button 
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSubcategory('all');
            }}
            className={`hover:text-[#477C82] transition-colors font-medium cursor-pointer ${
              selectedCategory === 'all' ? 'text-[#254653] font-bold' : ''
            }`}
          >
            Collections
          </button>
          {selectedCategory !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-[#254653] font-bold capitalize">
                {selectedCategory}
              </span>
            </>
          )}
          {selectedSubcategory !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-[#477C82] font-semibold">
                {selectedSubcategory}
              </span>
            </>
          )}
          <span className="ml-auto hidden md:inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#477C82] bg-[#EAF4F9] px-2.5 py-0.5 rounded-full border border-[#D9E8EC]">
            <Sparkles className="w-3 h-3 text-[#477C82]" />
            {filteredProducts.length} Styles Available
          </span>
        </nav>

        {/* 1. SEAMLESS LUXURY HERO BANNER (Exact Style from Home Header & reference image_f15d46f5.png) */}
        <div className="relative rounded-2xl lg:rounded-3xl bg-gradient-to-r from-[#D7EEF8] via-[#E2F4F2] to-[#CFEBE0] border border-[#CFE6F3]/80 overflow-hidden shadow-2xs mb-8 group/banner">
          
          {/* Subtle decorative botanical leaf silhouettes in background corners */}
          <svg
            className="absolute -bottom-4 -left-4 w-36 h-36 text-[#9BD0C0]/35 pointer-events-none select-none z-0"
            viewBox="0 0 120 120"
            fill="currentColor"
          >
            <path d="M20,100 C15,70 40,40 70,30 C60,50 50,75 20,100 Z" />
            <path d="M40,110 C45,75 75,55 105,45 C90,65 75,90 40,110 Z" />
            <path d="M10,80 C20,55 50,45 80,45 C65,65 45,75 10,80 Z" opacity="0.6" />
          </svg>

          <svg
            className="absolute -top-6 -left-6 w-32 h-32 text-[#9BD0C0]/25 pointer-events-none select-none z-0"
            viewBox="0 0 120 120"
            fill="currentColor"
          >
            <path d="M10,20 C40,15 70,40 80,70 C60,60 35,50 10,20 Z" />
            <path d="M0,45 C35,40 55,70 65,100 C45,85 20,70 0,45 Z" />
          </svg>

          {/* Soft ambient blur */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#CFE6F3]/30 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[420px] lg:min-h-[450px] items-stretch relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-11 xl:p-12 flex flex-col justify-between">
              <div>
                {/* Small uppercase label */}
                <div className="inline-block mb-3 sm:mb-4">
                  <span className="text-[11px] sm:text-xs font-semibold text-[#477C82] tracking-[0.25em] uppercase font-sans">
                    {activeMeta.label}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-bold text-[#254653] leading-[1.08] tracking-tight text-left">
                  {activeMeta.title}
                </h1>

                {/* Subtitle */}
                <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-[15px] text-[#56747D] leading-relaxed max-w-md font-sans text-left">
                  {activeMeta.subtitle}
                </p>

                {/* Action Buttons matching reference image */}
                <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-3.5">
                  <button
                    onClick={() => {
                      const el = document.getElementById('products-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#1C4E57] hover:bg-[#143B42] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2 group/btn"
                  >
                    <span>Shop Now</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                </div>
              </div>

              {/* Bottom-Left Sparkle Indicators & Item Count */}
              <div className="mt-6 sm:mt-8 pt-2 flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white text-[#1C4E57] shadow-sm ring-1 ring-[#D6EBF0]">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#1C4E57]/40 shadow-2xs" />
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white/60 text-[#34606A]/70">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="ml-2 text-xs font-medium text-[#477C82]">
                  {filteredProducts.length} Styles Available
                </span>
              </div>
            </div>

            {/* Right-side Fashion Image: Full-bleed with seamless blend overlay (NO separate card border) */}
            <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[380px] lg:min-h-[450px] flex items-center justify-end overflow-hidden group/heroimg">
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={activeMeta.image}
                  alt={activeMeta.title}
                  className="w-full h-full object-cover object-[center_20%] lg:object-[center_24%] transition-transform duration-700 ease-out group-hover/heroimg:scale-104"
                  loading="eager"
                />
                {/* Seamless blend gradient on the left edge into the pale mint background matching home header */}
                <div className="absolute inset-y-0 left-0 w-20 sm:w-28 lg:w-36 bg-gradient-to-r from-[#E2F4F2] via-[#E2F4F2]/60 to-transparent pointer-events-none hidden lg:block" />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#E2F4F2]/60 to-transparent pointer-events-none lg:hidden" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. DEDICATED HORIZONTAL CATEGORY NAVIGATION BAR (NO AWKWARD WRAPPING) */}
        <div className="bg-white rounded-2xl border border-[#D9E8EC] p-2.5 mb-6 shadow-xs max-w-full overflow-hidden">
          <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-visible touch-pan-x overscroll-x-contain pt-1 pb-2.5 px-1">
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {categoryTabList.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id as CategoryId | 'all');
                      setSelectedSubcategory('all');
                    }}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap active:scale-97 ${
                      isSelected
                        ? 'bg-[#1C4E57] text-white shadow-sm ring-1 ring-[#1C4E57]'
                        : cat.isSale
                        ? 'bg-[#FFF5F5] hover:bg-[#FFEAE8] text-[#E05244] border border-[#FF8F86]/40 hover:border-[#E05244] hover:shadow-xs hover:-translate-y-0.5'
                        : 'bg-[#F8FBFA] hover:bg-white text-[#254653] hover:text-[#1C4E57] border border-[#D9E8EC] hover:border-[#477C82]/60 hover:shadow-xs hover:-translate-y-0.5'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {cat.isSale && !isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E05244] animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subcategory Filter Chips Row */}
          {availableSubcategories.length > 0 && (
            <div className="pt-2.5 mt-2.5 border-t border-[#D9E8EC]/70 flex items-center gap-1.5 overflow-x-auto scrollbar-visible touch-pan-x overscroll-x-contain pt-1 pb-2 px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#607985] mr-1 shrink-0">
                Filter:
              </span>
              <button
                onClick={() => setSelectedSubcategory('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-97 ${
                  selectedSubcategory === 'all'
                    ? 'bg-[#477C82] text-white shadow-2xs'
                    : 'bg-white hover:bg-[#F0F7F8] text-[#56747D] hover:text-[#254653] border border-[#D9E8EC] hover:border-[#477C82]/40'
                }`}
              >
                All Styles
              </button>
              {availableSubcategories.map((subcat) => {
                const isSubSelected = selectedSubcategory === subcat;
                return (
                  <button
                    key={subcat}
                    onClick={() => setSelectedSubcategory(subcat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-97 ${
                      isSubSelected
                        ? 'bg-[#477C82] text-white shadow-2xs'
                        : 'bg-white hover:bg-[#F0F7F8] text-[#56747D] hover:text-[#254653] border border-[#D9E8EC] hover:border-[#477C82]/40 hover:-translate-y-0.5'
                    }`}
                  >
                    {subcat}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. TOOLBAR: SORT & CONTROLS */}
        <div className="bg-white rounded-2xl border border-[#D9E8EC] p-3.5 sm:p-4 mb-8 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden px-3.5 py-2 rounded-xl border border-[#D9E8EC] hover:bg-[#F0F7F8] text-xs font-semibold text-[#254653] flex items-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#477C82]" />
              Filters
            </button>
            <span className="text-xs text-[#607985]">
              Showing <strong className="text-[#254653] font-bold">{filteredProducts.length}</strong> styles
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-[#FF8F86] hover:text-[#d94f44] flex items-center gap-1 transition-colors cursor-pointer ml-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <label className="hidden sm:flex items-center gap-2 cursor-pointer text-xs font-medium text-[#254653] hover:text-[#1C4E57] select-none">
              <input
                type="checkbox"
                checked={onlySale}
                onChange={(e) => setOnlySale(e.target.checked)}
                className="rounded border-[#D9E8EC] text-[#477C82] focus:ring-[#477C82] cursor-pointer"
              />
              <span className="flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#FF8F86]" />
                Sale items only
              </span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#607985] hidden sm:inline font-medium">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-[#F8FBFA] hover:bg-white transition-colors border border-[#D9E8EC] hover:border-[#477C82]/60 rounded-xl px-3.5 py-2 pr-8 text-xs font-semibold text-[#254653] outline-none focus:border-[#477C82] cursor-pointer shadow-2xs"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-3 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. CATALOG MAIN LAYOUT: SIDEBAR & PRODUCT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 bg-white rounded-3xl p-6 border border-[#D9E8EC] shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#D9E8EC]">
              <h3 className="font-serif font-bold text-base text-[#254653] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#477C82]" />
                Filters
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-semibold text-[#FF8F86] hover:underline cursor-pointer"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Subcategories */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#607985] mb-2.5">
                Category Types
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedSubcategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedSubcategory === 'all'
                      ? 'bg-[#F0F7F8] text-[#1C4E57] font-bold shadow-2xs'
                      : 'text-[#254653] hover:bg-[#F8FBFA] hover:text-[#477C82]'
                  }`}
                >
                  All Types
                </button>
                {availableSubcategories.map((subcat) => (
                  <button
                    key={subcat}
                    onClick={() => setSelectedSubcategory(subcat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      selectedSubcategory === subcat
                        ? 'bg-[#F0F7F8] text-[#1C4E57] font-bold shadow-2xs'
                        : 'text-[#254653] hover:bg-[#F8FBFA] hover:text-[#477C82]'
                    }`}
                  >
                    {subcat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="pt-4 border-t border-[#D9E8EC]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#607985] mb-2.5">
                Size
              </h4>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setSelectedSize('all')}
                  className={`py-2 text-xs rounded-xl border font-semibold transition-all cursor-pointer ${
                    selectedSize === 'all'
                      ? 'bg-[#1C4E57] text-white border-[#1C4E57] shadow-xs'
                      : 'bg-white text-[#254653] border-[#D9E8EC] hover:border-[#477C82] hover:bg-[#F8FBFA]'
                  }`}
                >
                  All
                </button>
                {sizesList.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 text-xs rounded-xl border font-medium transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#1C4E57] text-white border-[#1C4E57] shadow-xs'
                        : 'bg-white text-[#254653] border-[#D9E8EC] hover:border-[#477C82] hover:bg-[#F8FBFA]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Sale filter */}
            <div className="pt-4 border-t border-[#D9E8EC]">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#254653] hover:text-[#1C4E57] select-none">
                <input
                  type="checkbox"
                  checked={onlySale}
                  onChange={(e) => setOnlySale(e.target.checked)}
                  className="rounded border-[#D9E8EC] text-[#477C82] focus:ring-[#477C82] cursor-pointer"
                />
                <span className="flex items-center gap-1.5 font-semibold text-[#254653]">
                  <Tag className="w-3.5 h-3.5 text-[#FF8F86]" />
                  Discounted / Sale Only
                </span>
              </label>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#D9E8EC] p-12 text-center space-y-4 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-[#F0F7F8] border border-[#CFE6F3] text-[#477C82] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#254653]">
                  No matching styles found
                </h3>
                <p className="text-sm text-[#607985] max-w-sm mx-auto leading-relaxed">
                  We could not find any items matching your selected criteria. Try resetting your filters to explore more options.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-7 py-3 rounded-full bg-[#1C4E57] hover:bg-[#143B42] text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Filter Drawer / Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div
            className="fixed inset-0 bg-[#254653]/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              <div className="p-4 flex items-center justify-between border-b border-[#D9E8EC]">
                <h3 className="font-serif font-bold text-base text-[#254653] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#477C82]" />
                  Filter Products
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 text-gray-400 hover:text-[#477C82] hover:bg-[#F0F7F8] rounded-full transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-6">
                {/* Subcategories */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#607985]">
                      Category Types
                    </h4>
                    {selectedSubcategory !== 'all' && (
                      <button
                        onClick={() => setSelectedSubcategory('all')}
                        className="text-[11px] font-semibold text-[#FF8F86] hover:underline"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedSubcategory('all')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedSubcategory === 'all'
                          ? 'bg-[#F0F7F8] text-[#1C4E57] font-bold shadow-2xs'
                          : 'text-[#254653] hover:bg-[#F8FBFA]'
                      }`}
                    >
                      All Types
                    </button>
                    {availableSubcategories.map((subcat) => (
                      <button
                        key={subcat}
                        onClick={() => setSelectedSubcategory(subcat)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          selectedSubcategory === subcat
                            ? 'bg-[#F0F7F8] text-[#1C4E57] font-bold shadow-2xs'
                            : 'text-[#254653] hover:bg-[#F8FBFA]'
                        }`}
                      >
                        {subcat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="pt-4 border-t border-[#D9E8EC]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#607985] mb-2.5">
                    Size
                  </h4>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => setSelectedSize('all')}
                      className={`py-2 text-xs rounded-xl border font-semibold transition-all cursor-pointer ${
                        selectedSize === 'all'
                          ? 'bg-[#1C4E57] text-white border-[#1C4E57] shadow-xs'
                          : 'bg-white text-[#254653] border-[#D9E8EC]'
                      }`}
                    >
                      All
                    </button>
                    {sizesList.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 text-xs rounded-xl border font-medium transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-[#1C4E57] text-white border-[#1C4E57] shadow-xs'
                            : 'bg-white text-[#254653] border-[#D9E8EC]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sale filter */}
                <div className="pt-4 border-t border-[#D9E8EC]">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#254653] select-none">
                    <input
                      type="checkbox"
                      checked={onlySale}
                      onChange={(e) => setOnlySale(e.target.checked)}
                      className="rounded border-[#D9E8EC] text-[#477C82] focus:ring-[#477C82] cursor-pointer"
                    />
                    <span className="flex items-center gap-1.5 font-semibold text-[#254653]">
                      <Tag className="w-3.5 h-3.5 text-[#FF8F86]" />
                      Discounted / Sale Only
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#D9E8EC] bg-[#F8FBFA] flex items-center gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 px-3 rounded-xl border border-[#D9E8EC] text-xs font-bold text-[#607985] hover:bg-white transition-all text-center"
              >
                Reset All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#1C4E57] text-white text-xs font-bold hover:bg-[#143B42] transition-all text-center shadow-sm"
              >
                View ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
