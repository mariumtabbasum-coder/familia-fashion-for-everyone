import React, { useState } from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { CategoryId } from '../../types';
import { ChevronRight, Sparkles } from 'lucide-react';

interface CategoryShortcutItem {
  id: CategoryId;
  name: string;
  sublabel: string;
  renderIcon: () => React.ReactNode;
  isSale?: boolean;
}

const SHORTCUT_CATEGORIES: CategoryShortcutItem[] = [
  {
    id: 'women',
    name: 'Women',
    sublabel: 'Shop Now',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 3h6l1.8 3.5-1.8 3.5 3 11H6l3-11-1.8-3.5L9 3z" />
        <path d="M10 7a2 2 0 0 0 4 0" />
      </svg>
    ),
  },
  {
    id: 'men',
    name: 'Men',
    sublabel: 'Shop Now',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M6 3h12l-2 5-4-1.5-4 1.5L6 3z" />
        <path d="M12 6.5v14.5" />
        <path d="M6 3v18h12V3" />
        <path d="M9.5 21v-7h5v7" />
      </svg>
    ),
  },
  {
    id: 'kids-baby',
    name: 'Kids & Baby',
    sublabel: 'Shop Now',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="7.5" r="4" />
        <path d="M5.5 21v-2a4.5 4.5 0 0 1 4.5-4.5h4a4.5 4.5 0 0 1 4.5 4.5v2" />
        <circle cx="10" cy="7" r="0.5" fill="currentColor" />
        <circle cx="14" cy="7" r="0.5" fill="currentColor" />
        <path d="M10.5 9.5c.8.6 2.2.6 3 0" />
      </svg>
    ),
  },
  {
    id: 'teens',
    name: 'Teens',
    sublabel: 'Shop Now',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M5 9v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9a4.5 4.5 0 0 0-4.5-4.5h-5A4.5 4.5 0 0 0 5 9z" />
        <path d="M9 4.5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5" />
        <path d="M8.5 12h7" />
        <path d="M12 9v6" />
      </svg>
    ),
  },
  {
    id: 'sale',
    name: 'Sale',
    sublabel: 'Up to 50%',
    isSale: true,
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2" />
        <path d="M12 9l4 4" />
      </svg>
    ),
  },
];

export const HeroSection: React.FC = () => {
  const { navigateTo } = useEcommerce();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      label: 'N E W   S E A S O N',
      line1: 'Style for',
      line2: 'Every Generation',
      sub1: 'Modern looks for every member of your family.',
      sub2: 'Comfort, quality and style — all in one place.',
      ctaPrimary: 'Shop Now',
      image: '/assets/hero_family_clear.jpg',
      alt: 'FAMILIA smiling modern family of four in coordinated sage and cream apparel',
    },
    {
      label: 'S P R I N G   C A P S U L E',
      line1: 'Coordinated Looks',
      line2: 'For Every Age',
      sub1: 'From everyday organic cotton staples to festive',
      sub2: 'matching milestone collections for the whole family.',
      ctaPrimary: 'Shop Now',
      image: '/assets/hero_family_spring.jpg',
      alt: 'FAMILIA family in coordinated warm neutral knitwear and jackets',
    },
  ];

  const slide = heroSlides[currentSlide % heroSlides.length];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handleShortcutClick = (catId: CategoryId) => {
    navigateTo(`/${catId}`);
  };

  return (
    <section className="pt-3 pb-6 sm:pt-5 sm:pb-8 bg-[#F4F9FB]" aria-label="FAMILIA Homepage Screen 1">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* HERO BANNER */}
        <div className="relative rounded-2xl lg:rounded-3xl bg-gradient-to-r from-[#D7EEF8] via-[#E2F4F2] to-[#CFEBE0] border border-[#CFE6F3]/80 overflow-hidden shadow-2xs">
            
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

            {/* Subtle soft gradient blurs */}
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#CFE6F3]/30 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[420px] lg:min-h-[450px] items-stretch relative z-10">
              
              {/* Left-side Content (approximately 55% space) */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-11 xl:p-12 flex flex-col justify-between">
                <div>
                  {/* Small uppercase label */}
                  <div className="inline-block mb-3 sm:mb-4">
                    <span className="text-[11px] sm:text-xs font-semibold text-[#477C82] tracking-[0.25em] uppercase font-sans">
                      {slide.label}
                    </span>
                  </div>

                  {/* Main heading, preserving exact words and line breaks */}
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-bold text-[#254653] leading-[1.08] tracking-tight text-left">
                    {slide.line1}
                    <br />
                    {slide.line2}
                  </h1>

                  {/* Supporting text */}
                  <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-[14px] text-[#56747D] leading-relaxed max-w-md font-sans text-left">
                    {slide.sub1}
                    <br className="hidden sm:inline" />
                    {' '}
                    {slide.sub2}
                  </p>

                  {/* Buttons */}
                  <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-3.5">
                    {/* Primary Button */}
                    <button
                      onClick={() => navigateTo('/shop')}
                      className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#1C4E57] hover:bg-[#143B42] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2 group/btn"
                    >
                      <span>{slide.ctaPrimary}</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                  </div>
                </div>

                {/* Bottom-Left Carousel Indicators matching reference image: [✦]  •  [✦] */}
                <div className="mt-6 sm:mt-8 pt-2 flex items-center gap-2.5">
                  <button
                    onClick={() => setCurrentSlide(0)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 ${
                      currentSlide % 2 === 0
                        ? 'bg-white text-[#1C4E57] shadow-sm ring-1 ring-[#D6EBF0]'
                        : 'bg-white/40 text-[#34606A]/60 hover:bg-white/70 hover:text-[#1C4E57]'
                    }`}
                    aria-label="Slide 1"
                    title="Slide 1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>

                  <div className="w-1.5 h-1.5 rounded-full bg-white/90 shadow-2xs" />

                  <button
                    onClick={() => setCurrentSlide(1)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 ${
                      currentSlide % 2 === 1
                        ? 'bg-white text-[#1C4E57] shadow-sm ring-1 ring-[#D6EBF0]'
                        : 'bg-white/40 text-[#34606A]/60 hover:bg-white/70 hover:text-[#1C4E57]'
                    }`}
                    aria-label="Slide 2"
                    title="Slide 2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right-side Fashion Image: Family of four from exact reference photo */}
              <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[380px] lg:min-h-[450px] flex items-center justify-end overflow-hidden group/heroimg">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover object-[center_20%] lg:object-[center_24%] transition-transform duration-700 ease-out group-hover/heroimg:scale-104"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  {/* Subtle blend gradient on the left edge into the pale mint background */}
                  <div className="absolute inset-y-0 left-0 w-16 sm:w-20 bg-gradient-to-r from-[#E2F4F2] via-[#E2F4F2]/50 to-transparent pointer-events-none hidden lg:block" />
                  <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#E2F4F2]/40 to-transparent pointer-events-none lg:hidden" />
                </div>

                {/* Circular Next-Arrow Button near the lower-right */}
                <button
                  onClick={handleNextSlide}
                  className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#254653] hover:text-white hover:bg-[#1C4E57] shadow-md hover:shadow-xl border border-[#D9E8EC] hover:border-[#1C4E57] flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 z-20"
                  aria-label="Next slide"
                  title="Next slide"
                >
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

            </div>
          </div>

          {/* 4. CATEGORY SHORTCUT BAR (5 Clothing Cards across bottom) */}
          <div className="mt-3 sm:mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 lg:gap-3.5">
              {SHORTCUT_CATEGORIES.map((cat) => {
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleShortcutClick(cat.id)}
                    className="group flex flex-col items-center justify-center py-2.5 px-2 sm:py-3.5 sm:px-2.5 rounded-2xl bg-[#EEF7F8] hover:bg-white border border-[#D6EBF0] hover:border-[#477C82] shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer active:scale-95 last:col-span-2 sm:last:col-span-1 md:last:col-span-1"
                  >
                    {/* Centered outline icon matching reference drawing */}
                    <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-1.5 transition-transform duration-300 group-hover:scale-115 text-[#3A6F78] group-hover:text-[#1C4E57]">
                      {cat.renderIcon()}
                    </div>

                    {/* Category name */}
                    <span className="text-xs sm:text-[13px] font-semibold font-sans tracking-tight leading-tight text-[#254653] group-hover:text-[#1C4E57] transition-colors duration-200">
                      {cat.name}
                    </span>

                    {/* Secondary label */}
                    <span className="text-[10px] sm:text-[11px] font-medium mt-0.5 leading-tight text-[#5C7C85] group-hover:text-[#477C82] transition-colors duration-200">
                      {cat.sublabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
  );
};
