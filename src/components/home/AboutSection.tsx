import React from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { navigateTo } = useEcommerce();

  const metrics = [
    { value: '10+', label: 'Years of Experience' },
    { value: '500K+', label: 'Happy Families' },
    { value: '50+', label: 'Countries' },
    { value: '100%', label: 'Customer Satisfaction' },
  ];

  return (
    <section id="about-us" className="py-10 sm:py-16 bg-[#F8FBFA]" aria-label="About Familia - Our Story">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Soft rounded card container matching image_b5887549.png */}
        <div className="relative rounded-3xl lg:rounded-[36px] bg-[#EAF5F8] border border-[#CFE7EE] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs">
          
          {/* Decorative botanical leaves in bottom-left corner */}
          <svg
            className="absolute -bottom-6 -left-6 w-44 h-44 text-[#9BD0C0]/35 pointer-events-none select-none z-0"
            viewBox="0 0 160 160"
            fill="currentColor"
          >
            <path d="M25,145 C20,105 50,65 95,50 C80,75 70,110 25,145 Z" />
            <path d="M55,155 C60,110 100,85 140,70 C120,95 100,130 55,155 Z" />
            <path d="M15,115 C30,80 70,65 110,65 C90,90 60,105 15,115 Z" opacity="0.6" />
          </svg>

          {/* Decorative subtle ambient blur */}
          <div className="absolute top-0 right-1/3 w-80 h-80 bg-[#CFE6F3]/40 rounded-full blur-3xl pointer-events-none -z-0" />

          {/* Upper Story Content: Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Story Text */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Tag */}
              <div className="inline-block mb-2.5">
                <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#477C82]">
                  OUR STORY
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1E3E47] leading-[1.15] tracking-tight">
                More Than Just<br />
                Clothing — It&apos;s Family.
              </h2>

              {/* Body Text */}
              <p className="mt-4 text-sm sm:text-base text-[#56747D] leading-relaxed max-w-lg">
                At Familia, we believe that great style brings people together. Our journey began with a simple idea — to create high-quality, comfortable and stylish clothing for every member of your family.
              </p>

              {/* Call to Action Capsule Button */}
              <div className="mt-6 sm:mt-8">
                <button
                  onClick={() => navigateTo('/about')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#5DAEA7] hover:bg-[#479891] text-white text-sm sm:text-[15px] font-medium shadow-xs hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 group cursor-pointer"
                >
                  <span>Our Story</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Family Image matching reference photo */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden border-2 border-white/80 shadow-md group bg-white aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/assets/about_family_crisp.jpg"
                  alt="Happy smiling family laughing together in coordinated FAMILIA attire"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>

          {/* 4 Metric Counter Boxes Below */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mt-8 sm:mt-12 relative z-10">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-white/90 hover:bg-white backdrop-blur-xs rounded-2xl p-4 sm:p-6 border border-white/90 shadow-2xs hover:shadow-lg hover:-translate-y-1.5 active:scale-98 transition-all duration-300 text-center cursor-default group"
              >
                <div className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E3E47] group-hover:text-[#477C82] group-hover:scale-105 transition-all duration-200 inline-block">
                  {metric.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#56747D] group-hover:text-[#254653] mt-1 transition-colors duration-200">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
