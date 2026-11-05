import React, { useState } from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { Truck, ShieldCheck, Headphones, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const NewsletterContactSection: React.FC = () => {
  const { showToast } = useEcommerce();

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [contactSuccess, setContactSuccess] = useState(false);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');

    const emailTrimmed = newsletterEmail.trim();
    if (!emailTrimmed) {
      setNewsletterError('Please enter your email address.');
      return;
    }
    if (!validateEmail(emailTrimmed)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }

    setNewsletterSuccess(true);
    showToast('Welcome to the Familia! Check your inbox for your 15% discount code.', 'success');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; message?: string } = {};

    const nameTrimmed = contactName.trim();
    const emailTrimmed = contactEmail.trim();
    const messageTrimmed = contactMessage.trim();

    // Name validation (no numbers allowed per prompt requirements)
    if (!nameTrimmed) {
      newErrors.name = 'Full name is required.';
    } else if (/\d/.test(nameTrimmed)) {
      newErrors.name = 'Name should not contain numbers.';
    } else if (nameTrimmed.length < 2) {
      newErrors.name = 'Please provide a valid name.';
    }

    // Email validation
    if (!emailTrimmed) {
      newErrors.email = 'Email address is required.';
    } else if (!validateEmail(emailTrimmed)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    // Message validation
    if (!messageTrimmed) {
      newErrors.message = 'Please type a message.';
    } else if (messageTrimmed.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmittingContact(true);
      setTimeout(() => {
        setIsSubmittingContact(false);
        setContactSuccess(true);
        showToast('Thank you! Your message has been received (Demo).', 'success');
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      }, 600);
    }
  };

  return (
    <section className="py-16 bg-white border-t border-[#D9E8EC]" aria-label="Newsletter and Contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Join Our Family (Newsletter) matching Screen 11 */}
          <div className="lg:col-span-6 bg-[#F8FBFA] rounded-3xl p-6 sm:p-10 border border-[#D9E8EC] flex flex-col justify-between shadow-xs">
            <div>
              <div className="inline-block text-xs font-semibold uppercase tracking-wider text-[#477C82] mb-1">
                Stay Connected
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#254653] leading-tight">
                Join Our Family
              </h2>
              <p className="text-sm text-[#607985] mt-2 mb-6">
                Get the latest trends, exclusive offers and more — straight to your inbox.
              </p>

              {newsletterSuccess ? (
                <div className="bg-[#B8DED0]/30 border border-[#B8DED0] rounded-2xl p-5 text-center text-[#254653] space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#477C82] mx-auto" />
                  <h4 className="font-serif font-bold text-base">You&apos;re On the VIP List!</h4>
                  <p className="text-xs text-[#607985]">
                    We&apos;ve sent a 15% off welcome voucher to <span className="font-semibold text-[#254653]">{newsletterEmail}</span>. (Demo Mode: No real email was dispatched)
                  </p>
                  <button
                    onClick={() => {
                      setNewsletterSuccess(false);
                      setNewsletterEmail('');
                    }}
                    className="text-xs font-semibold text-[#477C82] underline mt-1"
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3" noValidate>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        setNewsletterError('');
                      }}
                      placeholder="Enter your email address"
                      className={`flex-1 px-4 py-3 rounded-full text-sm bg-white border outline-none transition-all ${
                        newsletterError
                          ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                          : 'border-[#D9E8EC] focus:border-[#477C82] focus:ring-2 focus:ring-[#CFE6F3]/40'
                      }`}
                      aria-label="Email address for newsletter"
                      required
                    />
                    <button
                      type="submit"
                      className="px-7 py-3 rounded-full bg-[#477C82] hover:bg-[#39656a] text-white text-sm font-semibold transition-all shadow-xs shrink-0"
                    >
                      Subscribe
                    </button>
                  </div>
                  {newsletterError && (
                    <p className="text-xs text-red-600 flex items-center gap-1 pl-3 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {newsletterError}
                    </p>
                  )}
                  <p className="text-[11px] text-[#607985] pl-3">
                    By subscribing you agree to receive promotional updates. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>

            {/* 3 Trust Cards Below Newsletter (Screen 11) */}
            <div className="grid grid-cols-3 gap-3 pt-8 mt-8 border-t border-[#D9E8EC]">
              <div className="bg-white rounded-xl p-3 border border-[#D9E8EC] text-center">
                <Truck className="w-5 h-5 text-[#477C82] mx-auto mb-1.5" />
                <h5 className="text-xs font-bold text-[#254653]">Free Shipping</h5>
                <p className="text-[10px] text-[#607985]">Over $50</p>
              </div>

              <div className="bg-white rounded-xl p-3 border border-[#D9E8EC] text-center">
                <ShieldCheck className="w-5 h-5 text-[#477C82] mx-auto mb-1.5" />
                <h5 className="text-xs font-bold text-[#254653]">Secure Payments</h5>
                <p className="text-[10px] text-[#607985]">100% Secure</p>
              </div>

              <div className="bg-white rounded-xl p-3 border border-[#D9E8EC] text-center">
                <Headphones className="w-5 h-5 text-[#477C82] mx-auto mb-1.5" />
                <h5 className="text-xs font-bold text-[#254653]">24/7 Support</h5>
                <p className="text-[10px] text-[#607985]">We&apos;re here to help</p>
              </div>
            </div>
          </div>

          {/* Right Column: Get in Touch (Contact Form) matching Screen 11 */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-10 border border-[#D9E8EC] shadow-xs flex flex-col justify-between">
            <div>
              <div className="inline-block text-xs font-semibold uppercase tracking-wider text-[#477C82] mb-1">
                Reach Out
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#254653] leading-tight">
                Get in Touch
              </h2>
              <p className="text-sm text-[#607985] mt-1 mb-6">
                We&apos;d love to hear from you! Our team usually responds within 24 hours.
              </p>

              {contactSuccess ? (
                <div className="bg-[#CFE6F3]/40 border border-[#CFE6F3] rounded-2xl p-6 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#477C82] mx-auto" />
                  <h4 className="font-serif font-bold text-lg text-[#254653]">Message Dispatched!</h4>
                  <p className="text-xs text-[#607985] max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out to Familia Customer Care. Since this is an interactive design portfolio demo, your test inquiry has been logged locally.
                  </p>
                  <button
                    onClick={() => setContactSuccess(false)}
                    className="px-5 py-2 rounded-full bg-[#477C82] text-white text-xs font-medium hover:bg-[#39656a] transition-all"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4" noValidate>
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-medium text-[#254653] mb-1" htmlFor="contact-name">
                      Name <span className="text-[#FF8F86]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={contactName}
                      onChange={(e) => {
                        setContactName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Your name"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm bg-[#F8FBFA] border outline-none transition-all ${
                        errors.name
                          ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                          : 'border-[#D9E8EC] focus:border-[#477C82] focus:bg-white'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-500 mt-1 pl-1 font-medium">{errors.name}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-xs font-medium text-[#254653] mb-1" htmlFor="contact-email">
                      Email <span className="text-[#FF8F86]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => {
                        setContactEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="Your email address"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm bg-[#F8FBFA] border outline-none transition-all ${
                        errors.email
                          ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                          : 'border-[#D9E8EC] focus:border-[#477C82] focus:bg-white'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-500 mt-1 pl-1 font-medium">{errors.email}</p>
                    )}
                  </div>

                  {/* Message field */}
                  <div>
                    <label className="block text-xs font-medium text-[#254653] mb-1" htmlFor="contact-message">
                      Message <span className="text-[#FF8F86]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => {
                        setContactMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      placeholder="How can we help your family find the perfect fit?"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm bg-[#F8FBFA] border outline-none transition-all resize-none ${
                        errors.message
                          ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                          : 'border-[#D9E8EC] focus:border-[#477C82] focus:bg-white'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-500 mt-1 pl-1 font-medium">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button (Coral Accent #FF8F86 matching Screen 11) */}
                  <button
                    type="submit"
                    disabled={isSubmittingContact}
                    className="w-full py-3.5 rounded-full bg-[#FF8F86] hover:bg-[#f27e74] text-white font-semibold text-sm transition-all shadow-xs hover:shadow-md active:scale-99 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    <span>{isSubmittingContact ? 'Sending...' : 'Send Message'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
