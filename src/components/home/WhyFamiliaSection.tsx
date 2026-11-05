import React from 'react';
import { ShieldCheck, Sparkles, Tag, Users } from 'lucide-react';

export const WhyFamiliaSection: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Premium Quality',
      subtitle: 'Certified skin-friendly organic weaves',
    },
    {
      icon: Sparkles,
      title: 'Trendy Styles',
      subtitle: 'Coordinated designs across all ages',
    },
    {
      icon: Tag,
      title: 'Affordable Prices',
      subtitle: 'Direct-to-family everyday value',
    },
    {
      icon: Users,
      title: 'For All Ages',
      subtitle: 'Newborns to grandparents together',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F4F9FB] border-t border-[#D6EBF0]" aria-label="Why Choose FAMILIA">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl p-6 sm:p-7 bg-white border border-[#DCEEF2] hover:border-[#9BD0C0] shadow-2xs hover:shadow-xl hover:-translate-y-2 active:scale-98 transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
              >
                {/* Circular Icon Container matching reference image 2 */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#9BD0C0] bg-white text-[#254653] group-hover:bg-[#1C4E57] group-hover:border-[#1C4E57] group-hover:text-white group-hover:scale-115 group-hover:rotate-6 group-hover:shadow-md transition-all duration-300 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Pillar Title */}
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#254653] group-hover:text-[#1C4E57] mb-1.5 transition-colors duration-200">
                  {pillar.title}
                </h3>

                {/* Pillar Subtitle */}
                <p className="text-xs sm:text-[13px] text-[#5C7C85] group-hover:text-[#254653] leading-relaxed max-w-[210px] transition-colors duration-200">
                  {pillar.subtitle}
                </p>

                {/* Subtle bottom indicator glow on hover */}
                <div className="w-0 group-hover:w-10 h-0.5 bg-[#477C82] mt-3.5 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
