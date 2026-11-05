import React from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import familyLookbookImg from '../../assets/images/family_lookbook_fashion_1792841854700.jpg';

export const EditorialPromoBanner: React.FC = () => {
  const { navigateTo } = useEcommerce();

  return (
    <section className="py-12 sm:py-16 bg-[#F8FBFA] border-t border-[#D9E8EC]" aria-label="Family Lookbook Banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#CFE6F3]/50 via-[#F0F7F8] to-[#B8DED0]/40 border border-[#D9E8EC] hover:border-[#477C82]/40 transition-all duration-500 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs hover:shadow-lg group/card">
          
          {/* Subtle background glow effect on card hover */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#B8DED0]/20 rounded-full blur-3xl pointer-events-none group-hover/card:bg-[#B8DED0]/35 transition-all duration-700" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#CFE6F3]/25 rounded-full blur-3xl pointer-events-none group-hover/card:bg-[#CFE6F3]/40 transition-all duration-700" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Copy & CTA */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#D9E8EC] shadow-2xs hover:border-[#477C82] hover:bg-white transition-all cursor-default">
                <Sparkles className="w-3.5 h-3.5 text-[#477C82] animate-pulse" />
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#477C82]">
                  New Spring/Summer Lookbook
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#254653] leading-[1.12] text-balance">
                Matching Styles. <br />
                <span className="italic font-normal text-[#39656a]">Stronger Bonds.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#607985] max-w-lg leading-relaxed">
                Coordinated palettes and complementary cuts designed so every generation looks and feels harmonious together. Perfect outfits for family reunions, milestones, and weekend memories.
              </p>

              {/* Feature Highlights Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#254653] bg-white/70 hover:bg-white px-3 py-1.5 rounded-full border border-[#D9E8EC] transition-all hover:border-[#477C82]/50 hover:shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#477C82]" />
                  GOTS Organic Linen & Cotton
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#254653] bg-white/70 hover:bg-white px-3 py-1.5 rounded-full border border-[#D9E8EC] transition-all hover:border-[#477C82]/50 hover:shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#477C82]" />
                  Infant to Adult XL Matching
                </span>
              </div>

              {/* CTA Action Buttons with enhanced hover */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => navigateTo('/shop')}
                  className="px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#254653] hover:text-[#1C4E57] text-sm font-semibold border border-[#D9E8EC] hover:border-[#477C82] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
                >
                  View All Outfits
                </button>
              </div>
            </div>

            {/* Right Column: Editorial Photo with high fashion styling */}
            <div className="lg:col-span-6">
              <div 
                onClick={() => navigateTo('/lookbook')}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/10] border-2 border-white shadow-xl hover:shadow-2xl bg-white group/img cursor-pointer transition-all duration-500 hover:-translate-y-1"
              >
                <img
                  src={familyLookbookImg}
                  alt="Stylish modern family wearing coordinated sage green, off-white, and blush spring clothing"
                  className="w-full h-full object-cover object-center group-hover/img:scale-106 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Subtle soft gradient overlay and seamless edge blend */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover/img:opacity-25 transition-opacity duration-300" />
                <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white/60 via-white/20 to-transparent pointer-events-none hidden sm:block" />

                {/* Floating pill badge - positioned at bottom-left corner so family members are fully visible */}
                <div className="absolute bottom-2.5 left-2.5 sm:bottom-3.5 sm:left-3.5 bg-white/95 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-[#254653] shadow-md border border-[#D9E8EC] flex items-center gap-1.5 group-hover/img:bg-white group-hover/img:border-[#477C82]/50 transition-all">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#3EA28E] animate-pulse shrink-0" />
                  <span className="whitespace-nowrap font-medium">Family Capsule 2026</span>
                </div>

                {/* Quick explore overlay badge on hover */}
                <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 bg-black/50 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-medium px-2.5 sm:px-3 py-1 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
                  <Heart className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#FF8F86] fill-[#FF8F86]" />
                  <span>Tap to view collection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
