import React, { useEffect, useState } from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { Truck, ShieldCheck, RotateCcw, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { showToast } = useEcommerce();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isSuccess) return;
    const resetTimer = window.setTimeout(() => {
      setIsSuccess(false);
      setEmail('');
    }, 2500);
    return () => window.clearTimeout(resetTimer);
  }, [isSuccess]);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = email.trim();
    if (!trimmed) {
      setError('Please enter your email address.');
      return;
    }
    if (!validateEmail(trimmed)) {
      setError('Please provide a valid email address (e.g., name@domain.com).');
      return;
    }

    setIsSuccess(true);
    showToast('Welcome to FAMILIA! Your 15% discount code is FAMILIA15.', 'success');
  };

  return (
    <section id="newsletter" className="py-12 sm:py-16 bg-white border-t border-[#D9E8EC]" aria-label="Newsletter Subscription">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-[#F8FBFA] to-white border border-[#D9E8EC] p-8 sm:p-12 shadow-xs text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#477C82]">
            Stay Connected
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#254653] mt-1.5 mb-3 text-balance">
            Join Our Family
          </h2>
          <p className="text-sm text-[#607985] max-w-md mx-auto mb-6 leading-relaxed">
            Get the latest trends, exclusive seasonal discounts, and family styling inspiration straight to your inbox.
          </p>

          {isSuccess ? (
            <div className="bg-[#B8DED0]/30 border border-[#B8DED0] rounded-2xl p-5 text-center text-[#254653] space-y-2 animate-in fade-in duration-300">
              <CheckCircle2 className="w-8 h-8 text-[#477C82] mx-auto" />
              <h4 className="font-serif font-bold text-base">You&apos;re On the VIP List!</h4>
              <p className="text-xs text-[#607985]">
                Use coupon code <span className="font-bold text-[#254653] bg-white px-2 py-0.5 rounded border border-[#D9E8EC]">FAMILIA15</span> for 15% off your first family order.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setEmail('');
                }}
                className="text-xs font-semibold text-[#477C82] hover:underline mt-2 cursor-pointer"
              >
                Sign up another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3" noValidate>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  className={`flex-1 px-4 py-3 rounded-full text-sm bg-white border outline-none transition-all ${
                    error
                      ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                      : 'border-[#D9E8EC] focus:border-[#477C82] focus:ring-2 focus:ring-[#CFE6F3]/40'
                  }`}
                  aria-label="Email address for newsletter"
                  required
                />
                <button
                  type="submit"
                  className="px-7 py-3 rounded-full bg-[#1C4E57] hover:bg-[#143B42] text-white text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 shrink-0 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5 transition-transform hover:translate-x-0.5" />
                </button>
              </div>

              {error && (
                <p className="text-xs text-red-600 flex items-center justify-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {error}
                </p>
              )}

              <p className="text-[11px] text-[#607985]">
                By subscribing, you agree to receive promotional emails. Unsubscribe anytime.
              </p>
            </form>
          )}

          {/* 3 Trust Markers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-[#D9E8EC]/70">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-left">
              <div className="w-9 h-9 rounded-full bg-[#CFE6F3]/40 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4 text-[#477C82]" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#254653]">Free Shipping</h5>
                <p className="text-[11px] text-[#607985]">On all orders over $50</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-left">
              <div className="w-9 h-9 rounded-full bg-[#B8DED0]/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#477C82]" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#254653]">Secure Checkout</h5>
                <p className="text-[11px] text-[#607985]">Protected payments</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-left">
              <div className="w-9 h-9 rounded-full bg-[#CFE6F3]/40 flex items-center justify-center shrink-0">
                <RotateCcw className="w-4 h-4 text-[#477C82]" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#254653]">30-Day Returns</h5>
                <p className="text-[11px] text-[#607985]">Hassle-free exchanges</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
