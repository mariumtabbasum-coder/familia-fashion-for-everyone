import React from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import {
  Heart,
  ShieldCheck,
  Leaf,
  ArrowRight,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const AboutPageView: React.FC = () => {
  const { navigateTo } = useEcommerce();

  const metrics = [
    { value: '10+', label: 'Years of Experience' },
    { value: '500K+', label: 'Happy Families' },
    { value: '50+', label: 'Countries' },
    { value: '100%', label: 'Customer Satisfaction' },
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Generational Craftsmanship',
      description:
        'We design pieces engineered to endure real family life. Garments are reinforced at stress points, double-stitched at seams, and built to be handed down from older siblings to younger ones without losing shape.',
    },
    {
      icon: Leaf,
      title: 'Certified Skin-Safe Fibres',
      description:
        'From our newborn kimono rompers to our relaxed linen shirts, we exclusively source certified organic cotton, French linen, and non-toxic hypoallergenic dyes that are ultra-gentle on the most sensitive skin.',
    },
    {
      icon: Heart,
      title: 'Effortless Harmony',
      description:
        'Family coordination should feel natural and joyful, never rigid or identical. Our master color palettes (soft sage, sky blue, sand, off-white, and warm coral) allow everyone to express their individuality while matching effortlessly.',
    },
  ];

  return (
    <div role="region" className="py-6 sm:py-10 bg-[#F8FBFA] text-[#254653]" aria-label="About Familia - Our Story Section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#5C7C85]" aria-label="Breadcrumb">
          <button
            onClick={() => navigateTo('/')}
            className="hover:text-[#1C4E57] hover:underline cursor-pointer transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#A3B8BE]" />
          <span className="font-semibold text-[#1C4E57]">Our Story & About Familia</span>
        </nav>

        {/* 1. SEAMLESS HERO STORY BANNER (Compact, edge-to-edge image, matching home & collection headers) */}
        <div className="relative rounded-2xl lg:rounded-3xl bg-gradient-to-r from-[#D7EEF8] via-[#E2F4F2] to-[#CFEBE0] border border-[#CFE6F3]/80 overflow-hidden shadow-2xs mb-8">
          
          {/* Decorative botanical leaves in background corners */}
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

          {/* Ambient soft glow blur */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#CFE6F3]/30 rounded-full blur-3xl pointer-events-none -z-0" />

          {/* Two-Column Story Layout: Edge-to-edge Image on the right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[420px] lg:min-h-[450px] items-stretch relative z-10">
            
            {/* Left Story Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-11 xl:p-12 flex flex-col justify-between">
              <div>
                {/* Tag */}
                <div className="inline-block mb-3 sm:mb-4">
                  <span className="text-[11px] sm:text-xs font-semibold text-[#477C82] tracking-[0.25em] uppercase font-sans">
                    OUR STORY
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-bold text-[#254653] leading-[1.08] tracking-tight text-left">
                  More Than Just<br />
                  Clothing — It&apos;s Family.
                </h1>

                {/* Story Body Copy */}
                <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-[15px] text-[#56747D] leading-relaxed max-w-md font-sans text-left">
                  At Familia, we believe that great style brings people together. Our journey began with a simple idea — to create high-quality, comfortable and stylish clothing for every member of your family.
                </p>

                <p className="mt-2 text-xs sm:text-sm text-[#6A858D] leading-relaxed max-w-md font-sans text-left">
                  From morning school runs to Sunday picnics, weekend milestones and family portraits, our coordinated collections are crafted with love to make everyday moments feel extraordinary.
                </p>

                {/* Action Buttons with hover effects */}
                <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-3.5">
                  <button
                    onClick={() => navigateTo('/shop')}
                    className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#1C4E57] hover:bg-[#143B42] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2 group/btn"
                  >
                    <span>Shop Collections</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Bottom indicator badge */}
              <div className="mt-6 sm:mt-8 pt-2 flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white text-[#1C4E57] shadow-sm ring-1 ring-[#D6EBF0]">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#1C4E57]/40 shadow-2xs" />
                <span className="text-xs font-medium text-[#477C82]">
                  Authentic Generational Fashion
                </span>
              </div>
            </div>

            {/* Right Family Image: Full-bleed edge-to-edge covering right side completely with seamless blend */}
            <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[380px] lg:min-h-[450px] flex items-center justify-end overflow-hidden group/heroimg">
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src="/assets/about_family_crisp.jpg"
                  alt="Crystal clear portrait of smiling happy family wearing coordinated FAMILIA apparel outdoors"
                  className="w-full h-full object-cover object-[center_20%] lg:object-[center_24%] transition-transform duration-700 ease-out group-hover/heroimg:scale-104"
                  loading="eager"
                />
                {/* Seamless blend gradient on the left edge into the pale mint background matching home & collection headers */}
                <div className="absolute inset-y-0 left-0 w-20 sm:w-28 lg:w-36 bg-gradient-to-r from-[#E2F4F2] via-[#E2F4F2]/60 to-transparent pointer-events-none hidden lg:block" />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#E2F4F2]/60 to-transparent pointer-events-none lg:hidden" />

                {/* Crisp Quality Badge */}
                <div className="absolute bottom-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-[#1E3E47] shadow-sm border border-[#CFE7EE] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#477C82]" />
                  <span>Curated Family Sizing</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. THE 4 METRIC STAT CARDS PLACED RIGHT UNDERNEATH THE HEADER BANNER */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 sm:p-7 border border-[#D9E8EC] shadow-2xs hover:shadow-lg hover:border-[#9BD0C0] hover:-translate-y-1.5 active:scale-98 transition-all duration-300 text-center cursor-default group"
            >
              <div className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E3E47] group-hover:text-[#1C4E57] group-hover:scale-105 transition-all duration-200 inline-block">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-[#56747D] group-hover:text-[#254653] mt-1.5 transition-colors duration-200">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* 2. THE THREE FOUNDATIONAL PILLARS */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold tracking-widest text-[#477C82] uppercase">
              Our Principles
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#254653]">
              How We Design For Every Generation
            </h2>
            <p className="text-sm text-[#5C7C85] leading-relaxed">
              Every detail is considered — from hypoallergenic seams for newborns to resilient denims for active kids and timeless tailoring for parents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 sm:p-8 border border-[#D9E8EC] hover:border-[#5DAEA7]/60 shadow-2xs hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group cursor-default"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#EAF5F8] text-[#1C4E57] group-hover:bg-[#1C4E57] group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center mb-5 shadow-2xs">
                      <Icon className="w-7 h-7 transition-transform" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#254653] group-hover:text-[#1C4E57] mb-3 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C7C85] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="w-8 group-hover:w-16 h-0.5 bg-[#5DAEA7] mt-6 rounded-full transition-all duration-300" />
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. SUSTAINABILITY & ETHICAL PROMISE */}
        <div className="rounded-3xl bg-white border border-[#D9E8EC] p-6 sm:p-10 lg:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-semibold tracking-widest text-[#477C82] uppercase">
                Ethical Fashion
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#254653]">
                Clothing Made to Be Cherished, Not Discarded
              </h3>
              <p className="text-xs sm:text-sm text-[#5C7C85] leading-relaxed">
                Fast fashion fills landfills; family heirlooms fill photo albums. We partner with vetted fair-wage ateliers around the globe to ensure fair working conditions and low-impact packaging.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F4F9FB] border border-[#DCEEF2] hover:bg-white hover:shadow-md transition-all">
                <div className="text-sm font-bold text-[#1C4E57] flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5DAEA7]" />
                  <span>100% GOTS Certified Cotton</span>
                </div>
                <p className="text-xs text-[#5C7C85] leading-relaxed">
                  Pesticide-free organic cotton grown with up to 91% less water than conventional fabrics.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#F4F9FB] border border-[#DCEEF2] hover:bg-white hover:shadow-md transition-all">
                <div className="text-sm font-bold text-[#1C4E57] flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5DAEA7]" />
                  <span>Pre-Shrunk & Colorfast</span>
                </div>
                <p className="text-xs text-[#5C7C85] leading-relaxed">
                  Laboratory tested for 50+ wash cycles without fading or shrinkage so hand-me-downs stay fresh.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#F4F9FB] border border-[#DCEEF2] hover:bg-white hover:shadow-md transition-all">
                <div className="text-sm font-bold text-[#1C4E57] flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5DAEA7]" />
                  <span>Biodegradable Packaging</span>
                </div>
                <p className="text-xs text-[#5C7C85] leading-relaxed">
                  Every order ships in 100% recycled paper mailers with zero single-use plastic wrapping.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#F4F9FB] border border-[#DCEEF2] hover:bg-white hover:shadow-md transition-all">
                <div className="text-sm font-bold text-[#1C4E57] flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5DAEA7]" />
                  <span>60-Day Easy Family Returns</span>
                </div>
                <p className="text-xs text-[#5C7C85] leading-relaxed">
                  Try on outfits in the comfort of your living room with complimentary prepaid return labels.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. INVITATION CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-[#CFE6F3]/60 via-[#E4F4F1] to-[#B8DED0]/50 p-8 sm:p-12 text-center border border-[#CFE7EE] shadow-xs">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#254653]">
              Find Outfits Your Whole Family Will Love
            </h2>
            <p className="text-xs sm:text-sm text-[#5C7C85] leading-relaxed">
              Explore timeless pieces for women, men, boys, girls, babies, and teens — designed to blend seamlessly together.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => navigateTo('/shop')}
                className="px-8 py-3.5 rounded-full bg-[#1C4E57] hover:bg-[#143B42] text-white text-sm font-semibold shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Explore All Outfits
              </button>
              <button
                onClick={() => navigateTo('/')}
                className="px-7 py-3.5 rounded-full bg-white hover:bg-[#F0F7F8] text-[#254653] text-sm font-semibold border border-[#CFE7EE] hover:border-[#1C4E57] shadow-2xs hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
