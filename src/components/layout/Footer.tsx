import React from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { CATEGORIES } from '../../data/products';
import { FamiliaLogo } from '../ui/FamiliaLogo';
import { CategoryId } from '../../types';
import {
  ShieldCheck,
  Sparkles,
  Tag,
  Users,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Heart,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, activeView } = useEcommerce();

  const handleCategoryClick = (catId: CategoryId) => {
    navigateTo(`/${catId}`);
  };

  const handleViewClick = (view: 'home' | 'shop' | 'product' | 'cart' | 'wishlist' | 'lookbook' | 'about' | 'blog' | 'contact' | 'account') => {
    if (view === 'home') navigateTo('/');
    else navigateTo(`/${view}`);
  };

  return (
    <footer className="bg-white border-t border-[#D9E8EC] mt-16 text-[#254653]">
      {/* Brand Value Pillars Bar on subpages (homepage already features dedicated interactive section) */}
      {activeView !== 'home' && (
        <div className="border-b border-[#D9E8EC] bg-[#F0F7F8]/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="group rounded-2xl p-4 sm:p-5 bg-white border border-[#DCEEF2] hover:border-[#9BD0C0] shadow-2xs hover:shadow-xl hover:-translate-y-2 active:scale-98 transition-all duration-300 flex flex-col items-center cursor-pointer">
              <div className="w-14 h-14 rounded-full border border-[#9BD0C0] bg-white text-[#254653] group-hover:bg-[#1C4E57] group-hover:border-[#1C4E57] group-hover:text-white group-hover:scale-115 group-hover:rotate-6 group-hover:shadow-md transition-all duration-300 flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#254653] group-hover:text-[#1C4E57] transition-colors">
                Premium Quality
              </h4>
              <p className="text-xs text-[#5C7C85] group-hover:text-[#254653] mt-1 transition-colors">
                Certified skin-friendly organic weaves
              </p>
            </div>

            <div className="group rounded-2xl p-4 sm:p-5 bg-white border border-[#DCEEF2] hover:border-[#9BD0C0] shadow-2xs hover:shadow-xl hover:-translate-y-2 active:scale-98 transition-all duration-300 flex flex-col items-center cursor-pointer">
              <div className="w-14 h-14 rounded-full border border-[#9BD0C0] bg-white text-[#254653] group-hover:bg-[#1C4E57] group-hover:border-[#1C4E57] group-hover:text-white group-hover:scale-115 group-hover:rotate-6 group-hover:shadow-md transition-all duration-300 flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#254653] group-hover:text-[#1C4E57] transition-colors">
                Trendy Styles
              </h4>
              <p className="text-xs text-[#5C7C85] group-hover:text-[#254653] mt-1 transition-colors">
                Coordinated designs across all ages
              </p>
            </div>

            <div className="group rounded-2xl p-4 sm:p-5 bg-white border border-[#DCEEF2] hover:border-[#9BD0C0] shadow-2xs hover:shadow-xl hover:-translate-y-2 active:scale-98 transition-all duration-300 flex flex-col items-center cursor-pointer">
              <div className="w-14 h-14 rounded-full border border-[#9BD0C0] bg-white text-[#254653] group-hover:bg-[#1C4E57] group-hover:border-[#1C4E57] group-hover:text-white group-hover:scale-115 group-hover:rotate-6 group-hover:shadow-md transition-all duration-300 flex items-center justify-center mb-3">
                <Tag className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#254653] group-hover:text-[#1C4E57] transition-colors">
                Affordable Prices
              </h4>
              <p className="text-xs text-[#5C7C85] group-hover:text-[#254653] mt-1 transition-colors">
                Direct-to-family everyday value
              </p>
            </div>

            <div className="group rounded-2xl p-4 sm:p-5 bg-white border border-[#DCEEF2] hover:border-[#9BD0C0] shadow-2xs hover:shadow-xl hover:-translate-y-2 active:scale-98 transition-all duration-300 flex flex-col items-center cursor-pointer">
              <div className="w-14 h-14 rounded-full border border-[#9BD0C0] bg-white text-[#254653] group-hover:bg-[#1C4E57] group-hover:border-[#1C4E57] group-hover:text-white group-hover:scale-115 group-hover:rotate-6 group-hover:shadow-md transition-all duration-300 flex items-center justify-center mb-3">
                <Users className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#254653] group-hover:text-[#1C4E57] transition-colors">
                For All Ages
              </h4>
              <p className="text-xs text-[#5C7C85] group-hover:text-[#254653] mt-1 transition-colors">
                Newborns to grandparents together
              </p>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <FamiliaLogo size="md" />
            <p className="text-sm text-[#607985] max-w-sm leading-relaxed">
              One Brand. Every Generation. From everyday essentials to special milestones — Familia brings together stylish, comfortable and high-quality clothing for the whole family.
            </p>
            <div className="font-serif italic text-[#477C82] text-sm flex items-center gap-1.5">
              <span>Style. Comfort. Together.</span>
              <Heart className="w-3.5 h-3.5 text-[#FF8F86] fill-[#FF8F86]" />
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#social"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-[#F0F7F8] hover:bg-[#1C4E57] flex items-center justify-center text-[#477C82] hover:text-white hover:scale-110 hover:shadow-xs active:scale-95 transition-all duration-200 cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-[#F0F7F8] hover:bg-[#1C4E57] flex items-center justify-center text-[#477C82] hover:text-white hover:scale-110 hover:shadow-xs active:scale-95 transition-all duration-200 cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-[#F0F7F8] hover:bg-[#1C4E57] flex items-center justify-center text-[#477C82] hover:text-white hover:scale-110 hover:shadow-xs active:scale-95 transition-all duration-200 cursor-pointer"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleViewClick('contact');
                }}
                className="w-9 h-9 rounded-full bg-[#F0F7F8] hover:bg-[#1C4E57] flex items-center justify-center text-[#477C82] hover:text-white hover:scale-110 hover:shadow-xs active:scale-95 transition-all duration-200 cursor-pointer"
                aria-label="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-serif font-bold text-base text-[#254653] mb-4">Shop Collections</h4>
            <ul className="space-y-2 text-sm text-[#607985]">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="hover:text-[#1C4E57] hover:translate-x-1 transition-all duration-200 cursor-pointer"
                  >
                    {cat.name}&apos;s Clothing
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleCategoryClick('sale')}
                  className="text-[#FF8F86] font-semibold hover:text-[#e05244] hover:underline cursor-pointer"
                >
                  Mid-Season Sale (Up to 50%)
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-serif font-bold text-base text-[#254653] mb-4">About Familia</h4>
            <ul className="space-y-2 text-sm text-[#607985]">
              <li>
                <button onClick={() => handleViewClick('about')} className="hover:text-[#477C82] transition-colors">
                  Our Story & Heritage
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('lookbook')} className="hover:text-[#477C82] transition-colors">
                  Family Lookbook
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('blog')} className="hover:text-[#477C82] transition-colors">
                  Style Guide & Blog
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('contact')} className="hover:text-[#477C82] transition-colors">
                  Sustainability Pledge
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('about')} className="hover:text-[#477C82] transition-colors">
                  Careers at Familia
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif font-bold text-base text-[#254653] mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-[#607985]">
              <li>
                <button onClick={() => handleViewClick('cart')} className="hover:text-[#477C82] transition-colors">
                  Shopping Cart
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('wishlist')} className="hover:text-[#477C82] transition-colors">
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('contact')} className="hover:text-[#477C82] transition-colors">
                  Shipping & Easy Returns
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('account')} className="hover:text-[#477C82] transition-colors">
                  My Account
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('contact')} className="hover:text-[#477C82] transition-colors">
                  Help Center & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('contact')} className="hover:text-[#477C82] transition-colors">
                  Contact Customer Care
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="border-t border-[#D9E8EC] mt-10 sm:mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#607985] text-center sm:text-left">
          <p className="max-w-full">© {new Date().getFullYear()} FAMILIA Inc. All rights reserved. Fashion for Everyone.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1.5 text-xs max-w-full">
            <span className="hover:underline cursor-pointer whitespace-nowrap">Privacy Policy</span>
            <span className="text-gray-300">•</span>
            <span className="hover:underline cursor-pointer whitespace-nowrap">Terms of Service</span>
            <span className="text-gray-300">•</span>
            <span className="hover:underline cursor-pointer whitespace-nowrap">Accessibility</span>
            <span className="text-gray-300">•</span>
            <span className="text-[#477C82] font-semibold whitespace-nowrap">Demo Store</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
