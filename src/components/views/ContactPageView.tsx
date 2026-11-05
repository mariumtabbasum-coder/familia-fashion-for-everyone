import React from 'react';
import { NewsletterContactSection } from '../home/NewsletterContactSection';
import { MapPin, Phone, Mail, Clock, HelpCircle } from 'lucide-react';

export const ContactPageView: React.FC = () => {
  return (
    <div className="py-10 bg-[#F8FBFA]" aria-label="Customer Support & Contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#477C82]">
            We&apos;re Here For Your Family
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#254653]">
            Customer Care & Contact
          </h1>
          <p className="text-sm text-[#607985]">
            Have questions about family sizing, sustainable fabrics, or order status? Get in touch with our friendly team.
          </p>
        </div>

        {/* 4 Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#D9E8EC] shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#F0F7F8] flex items-center justify-center text-[#477C82]">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-[#254653]">Phone Inquiries</h4>
            <p className="text-xs text-[#607985]">+1 (800) 555-FAMILIA</p>
            <p className="text-[10px] text-gray-400">Mon-Fri 8am-8pm EST</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#D9E8EC] shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#F0F7F8] flex items-center justify-center text-[#477C82]">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-[#254653]">Email Support</h4>
            <p className="text-xs text-[#607985]">care@familia-fashion.demo</p>
            <p className="text-[10px] text-gray-400">Response within 24h</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#D9E8EC] shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#F0F7F8] flex items-center justify-center text-[#477C82]">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-[#254653]">Design Flagship</h4>
            <p className="text-xs text-[#607985]">420 Harmony Boulevard</p>
            <p className="text-[10px] text-gray-400">New York, NY 10012</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#D9E8EC] shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#F0F7F8] flex items-center justify-center text-[#477C82]">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-[#254653]">30-Day Easy Returns</h4>
            <p className="text-xs text-[#607985]">Free return labels included</p>
            <p className="text-[10px] text-gray-400">Instant credit upon scan</p>
          </div>
        </div>

        {/* Form and Newsletter matching Screen 11 */}
        <NewsletterContactSection />

        {/* FAQs */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D9E8EC] shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#477C82]" />
            <h3 className="font-serif text-2xl font-bold text-[#254653]">
              Frequently Asked Questions
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#607985] leading-relaxed">
            <div className="space-y-1.5 p-4 rounded-2xl bg-[#F8FBFA] border border-[#D9E8EC]">
              <h5 className="font-bold text-[#254653] text-sm">How do family matching sizes work?</h5>
              <p>
                Each item has independent sizing tailored for its specific age bracket. Simply pick Mom&apos;s dress size, Dad&apos;s shirt size, and children&apos;s age ranges using our universal Size Guide.
              </p>
            </div>
            <div className="space-y-1.5 p-4 rounded-2xl bg-[#F8FBFA] border border-[#D9E8EC]">
              <h5 className="font-bold text-[#254653] text-sm">Are the baby garments organic?</h5>
              <p>
                Yes! 100% of our baby rompers, kimono bodysuits, and newborn essentials are certified GOTS organic cotton and dyed with non-irritating, water-based inks.
              </p>
            </div>
            <div className="space-y-1.5 p-4 rounded-2xl bg-[#F8FBFA] border border-[#D9E8EC]">
              <h5 className="font-bold text-[#254653] text-sm">What is your shipping policy?</h5>
              <p>
                Orders over $50 qualify for free standard domestic shipping (3-5 business days). Expedited shipping is available at checkout.
              </p>
            </div>
            <div className="space-y-1.5 p-4 rounded-2xl bg-[#F8FBFA] border border-[#D9E8EC]">
              <h5 className="font-bold text-[#254653] text-sm">Is this a real store?</h5>
              <p>
                This website is a frontend portfolio demonstration crafted with fidelity to the approved Familia Figma design system. No actual credit card transactions or physical shipments are fulfilled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
