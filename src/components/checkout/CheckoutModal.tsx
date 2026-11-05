import React, { useState } from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Truck,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Check,
  Lock,
} from 'lucide-react';

// Regex patterns for checkout validation
const REGEX_FULL_NAME = /^[a-zA-Z\s'-]{3,60}$/;
const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGEX_ADDRESS = /^[a-zA-Z0-9\s,.'#-]{5,100}$/;
const REGEX_CITY = /^[a-zA-Z\s.-]{2,50}$/;
const REGEX_POSTAL = /^[A-Za-z0-9\s-]{3,10}$/;
const REGEX_PHONE = /^(\+?[0-9]{1,4}[\s-]?)?(\(?[0-9]{2,5}\)?[\s-]?)?[0-9]{3,4}[\s-]?[0-9]{3,4}$/;
const REGEX_CARD_NUM = /^(\d{4}[\s-]?){3}\d{4}$/;
const REGEX_CARD_EXP = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
const REGEX_CARD_CVV = /^[0-9]{3,4}$/;

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    shippingFee,
    clearCart,
    showToast,
  } = useEcommerce();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');

  // Shipping form state
  const [fullName, setFullName] = useState('Elena Vance');
  const [email, setEmail] = useState('elena.vance@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('Springfield');
  const [postalCode, setPostalCode] = useState('97477');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
  const [shippingTouched, setShippingTouched] = useState<Record<string, boolean>>({});

  // Payment form state
  const [cardName, setCardName] = useState('Elena Vance');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});
  const [paymentTouched, setPaymentTouched] = useState<Record<string, boolean>>({});

  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const validateShippingField = (field: string, val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return 'This field is required.';
    switch (field) {
      case 'fullName':
        if (!REGEX_FULL_NAME.test(trimmed)) return 'Name must be letters, spaces, hyphens (min 3 chars).';
        break;
      case 'email':
        if (!REGEX_EMAIL.test(trimmed)) return 'Please provide a valid email address.';
        break;
      case 'phone':
        if (!REGEX_PHONE.test(trimmed)) return 'Please provide a valid phone number.';
        break;
      case 'address':
        if (!REGEX_ADDRESS.test(trimmed)) return 'Please provide a valid street address (min 5 chars).';
        break;
      case 'city':
        if (!REGEX_CITY.test(trimmed)) return 'City must contain letters and spaces (min 2 chars).';
        break;
      case 'postalCode':
        if (!REGEX_POSTAL.test(trimmed)) return 'Please provide a valid postal/ZIP code format.';
        break;
    }
    return undefined;
  };

  const validatePaymentField = (field: string, val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return 'Required.';
    switch (field) {
      case 'cardName':
        if (!REGEX_FULL_NAME.test(trimmed)) return 'Name on card must contain letters and spaces.';
        break;
      case 'cardNumber':
        if (!REGEX_CARD_NUM.test(trimmed)) return 'Please provide a 16-digit card number.';
        break;
      case 'cardExpiry':
        if (!REGEX_CARD_EXP.test(trimmed)) return 'Format MM/YY.';
        break;
      case 'cardCvv':
        if (!REGEX_CARD_CVV.test(trimmed)) return '3 or 4 digits.';
        break;
    }
    return undefined;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setShippingTouched({
      fullName: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      postalCode: true,
    });

    const errors: Record<string, string> = {};
    const nameErr = validateShippingField('fullName', fullName);
    const emailErr = validateShippingField('email', email);
    const phoneErr = validateShippingField('phone', phone);
    const addrErr = validateShippingField('address', address);
    const cityErr = validateShippingField('city', city);
    const postErr = validateShippingField('postalCode', postalCode);

    if (nameErr) errors.fullName = nameErr;
    if (emailErr) errors.email = emailErr;
    if (phoneErr) errors.phone = phoneErr;
    if (addrErr) errors.address = addrErr;
    if (cityErr) errors.city = cityErr;
    if (postErr) errors.postalCode = postErr;

    setShippingErrors(errors);

    if (Object.keys(errors).length === 0) {
      setStep('payment');
    } else {
      showToast('Please correct highlighted fields before continuing.', 'error');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentTouched({
      cardName: true,
      cardNumber: true,
      cardExpiry: true,
      cardCvv: true,
    });

    const errors: Record<string, string> = {};
    const cNameErr = validatePaymentField('cardName', cardName);
    const cNumErr = validatePaymentField('cardNumber', cardNumber);
    const cExpErr = validatePaymentField('cardExpiry', cardExpiry);
    const cCvvErr = validatePaymentField('cardCvv', cardCvv);

    if (cNameErr) errors.cardName = cNameErr;
    if (cNumErr) errors.cardNumber = cNumErr;
    if (cExpErr) errors.cardExpiry = cExpErr;
    if (cCvvErr) errors.cardCvv = cCvvErr;

    setPaymentErrors(errors);

    if (Object.keys(errors).length === 0) {
      const orderId = 'FAM-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmedOrderId(orderId);
      setStep('confirmed');
      clearCart();
      showToast(`Order ${orderId} placed successfully!`, 'success');
    } else {
      showToast('Please correct highlighted payment fields.', 'error');
    }
  };

  const finalTotal = cartTotal + (shippingMethod === 'express' ? 12 : 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center">
      <div
        className="fixed inset-0 bg-[#254653]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCheckoutOpen(false)}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-[#D9E8EC] z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#D9E8EC] flex items-center justify-between bg-[#F8FBFA]">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#477C82]">
              <Lock className="w-3 h-3" />
              <span>Secure 256-Bit SSL Checkout</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#254653]">
              {step === 'shipping' && '1. Shipping & Delivery'}
              {step === 'payment' && '2. Payment Authorization'}
              {step === 'confirmed' && 'Order Confirmed!'}
            </h3>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-gray-400 hover:text-[#477C82] rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: Shipping */}
          {step === 'shipping' && (
            <form onSubmit={handleProceedToPayment} className="space-y-5" noValidate>
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#607985]">
                  Contact & Shipping Information
                </h4>

                {/* Recipient Name */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-medium text-[#254653]">
                      Recipient Full Name <span className="text-[#FF8F86]">*</span>
                    </label>
                    {shippingTouched.fullName && !shippingErrors.fullName && (
                      <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      const v = e.target.value;
                      setFullName(v);
                      setShippingTouched((p) => ({ ...p, fullName: true }));
                      setShippingErrors((p) => ({ ...p, fullName: validateShippingField('fullName', v) || '' }));
                    }}
                    placeholder="e.g. Elena Vance"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all ${
                      shippingTouched.fullName && shippingErrors.fullName
                        ? 'bg-rose-50/20 border border-rose-400 focus:ring-2 focus:ring-rose-100'
                        : shippingTouched.fullName && !shippingErrors.fullName
                        ? 'bg-emerald-50/20 border border-emerald-500'
                        : 'border border-[#D9E8EC] focus:border-[#477C82]'
                    }`}
                  />
                  {shippingTouched.fullName && shippingErrors.fullName && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {shippingErrors.fullName}
                    </p>
                  )}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-medium text-[#254653]">
                        Email Address <span className="text-[#FF8F86]">*</span>
                      </label>
                      {shippingTouched.email && !shippingErrors.email && (
                        <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                          <Check className="w-3 h-3" /> Valid
                        </span>
                      )}
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        const v = e.target.value;
                        setEmail(v);
                        setShippingTouched((p) => ({ ...p, email: true }));
                        setShippingErrors((p) => ({ ...p, email: validateShippingField('email', v) || '' }));
                      }}
                      placeholder="elena@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all ${
                        shippingTouched.email && shippingErrors.email
                          ? 'bg-rose-50/20 border border-rose-400 focus:ring-2 focus:ring-rose-100'
                          : shippingTouched.email && !shippingErrors.email
                          ? 'bg-emerald-50/20 border border-emerald-500'
                          : 'border border-[#D9E8EC] focus:border-[#477C82]'
                      }`}
                    />
                    {shippingTouched.email && shippingErrors.email && (
                      <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {shippingErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-medium text-[#254653]">
                        Phone Number <span className="text-[#FF8F86]">*</span>
                      </label>
                      {shippingTouched.phone && !shippingErrors.phone && (
                        <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                          <Check className="w-3 h-3" /> Valid
                        </span>
                      )}
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        const v = e.target.value;
                        setPhone(v);
                        setShippingTouched((p) => ({ ...p, phone: true }));
                        setShippingErrors((p) => ({ ...p, phone: validateShippingField('phone', v) || '' }));
                      }}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all ${
                        shippingTouched.phone && shippingErrors.phone
                          ? 'bg-rose-50/20 border border-rose-400 focus:ring-2 focus:ring-rose-100'
                          : shippingTouched.phone && !shippingErrors.phone
                          ? 'bg-emerald-50/20 border border-emerald-500'
                          : 'border border-[#D9E8EC] focus:border-[#477C82]'
                      }`}
                    />
                    {shippingTouched.phone && shippingErrors.phone && (
                      <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {shippingErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-medium text-[#254653]">
                      Street Address <span className="text-[#FF8F86]">*</span>
                    </label>
                    {shippingTouched.address && !shippingErrors.address && (
                      <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      const v = e.target.value;
                      setAddress(v);
                      setShippingTouched((p) => ({ ...p, address: true }));
                      setShippingErrors((p) => ({ ...p, address: validateShippingField('address', v) || '' }));
                    }}
                    placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all ${
                      shippingTouched.address && shippingErrors.address
                        ? 'bg-rose-50/20 border border-rose-400 focus:ring-2 focus:ring-rose-100'
                        : shippingTouched.address && !shippingErrors.address
                        ? 'bg-emerald-50/20 border border-emerald-500'
                        : 'border border-[#D9E8EC] focus:border-[#477C82]'
                    }`}
                  />
                  {shippingTouched.address && shippingErrors.address && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {shippingErrors.address}
                    </p>
                  )}
                </div>

                {/* City & Postal Code */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-medium text-[#254653]">
                        City <span className="text-[#FF8F86]">*</span>
                      </label>
                      {shippingTouched.city && !shippingErrors.city && (
                        <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                          <Check className="w-3 h-3" /> Valid
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => {
                        const v = e.target.value;
                        setCity(v);
                        setShippingTouched((p) => ({ ...p, city: true }));
                        setShippingErrors((p) => ({ ...p, city: validateShippingField('city', v) || '' }));
                      }}
                      placeholder="e.g. Springfield"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all ${
                        shippingTouched.city && shippingErrors.city
                          ? 'bg-rose-50/20 border border-rose-400 focus:ring-2 focus:ring-rose-100'
                          : shippingTouched.city && !shippingErrors.city
                          ? 'bg-emerald-50/20 border border-emerald-500'
                          : 'border border-[#D9E8EC] focus:border-[#477C82]'
                      }`}
                    />
                    {shippingTouched.city && shippingErrors.city && (
                      <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {shippingErrors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-medium text-[#254653]">
                        Postal / ZIP <span className="text-[#FF8F86]">*</span>
                      </label>
                      {shippingTouched.postalCode && !shippingErrors.postalCode && (
                        <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                          <Check className="w-3 h-3" /> Valid
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => {
                        const v = e.target.value;
                        setPostalCode(v);
                        setShippingTouched((p) => ({ ...p, postalCode: true }));
                        setShippingErrors((p) => ({ ...p, postalCode: validateShippingField('postalCode', v) || '' }));
                      }}
                      placeholder="e.g. 97477"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all ${
                        shippingTouched.postalCode && shippingErrors.postalCode
                          ? 'bg-rose-50/20 border border-rose-400 focus:ring-2 focus:ring-rose-100'
                          : shippingTouched.postalCode && !shippingErrors.postalCode
                          ? 'bg-emerald-50/20 border border-emerald-500'
                          : 'border border-[#D9E8EC] focus:border-[#477C82]'
                      }`}
                    />
                    {shippingTouched.postalCode && shippingErrors.postalCode && (
                      <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {shippingErrors.postalCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery method */}
              <div className="pt-3 border-t border-[#D9E8EC] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#607985]">
                  Delivery Method
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-[#477C82] bg-[#F0F7F8] ring-1 ring-[#477C82]'
                        : 'border-[#D9E8EC] hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="ship"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="text-[#477C82]"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#254653]">Standard Delivery</p>
                        <p className="text-[11px] text-[#607985]">3-5 Business Days</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#477C82]">
                      {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </label>

                  <label
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'border-[#477C82] bg-[#F0F7F8] ring-1 ring-[#477C82]'
                        : 'border-[#D9E8EC] hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="ship"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="text-[#477C82]"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#254653]">Express Courier</p>
                        <p className="text-[11px] text-[#607985]">1-2 Business Days</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#254653]">$12.00</span>
                  </label>
                </div>
              </div>

              {/* Order total preview */}
              <div className="pt-3 border-t border-[#D9E8EC] flex justify-between items-center text-sm font-semibold">
                <span className="text-xs text-[#607985]">
                  Order Total ({cart.reduce((a, b) => a + b.quantity, 0)} items):
                </span>
                <span className="font-serif text-lg font-bold text-[#254653]">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-[#477C82] hover:bg-[#39656a] text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer active:scale-98"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment */}
          {step === 'payment' && (
            <form onSubmit={handlePlaceOrder} className="space-y-5" noValidate>
              <div className="p-4 rounded-2xl bg-[#F0F7F8] border border-[#CFE6F3] space-y-1 text-xs text-[#254653]">
                <div className="flex items-center gap-2 font-bold text-[#1C4E57]">
                  <CreditCard className="w-4 h-4 text-[#477C82]" />
                  <span>Card Authorization Form</span>
                </div>
                <p className="text-[#607985] text-[11px]">
                  All card details are validated through standard pattern recognition.
                </p>
              </div>

              <div className="space-y-3.5">
                {/* Cardholder Name */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-medium text-[#254653]">
                      Name on Card <span className="text-[#FF8F86]">*</span>
                    </label>
                    {paymentTouched.cardName && !paymentErrors.cardName && (
                      <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => {
                      const v = e.target.value;
                      setCardName(v);
                      setPaymentTouched((p) => ({ ...p, cardName: true }));
                      setPaymentErrors((p) => ({ ...p, cardName: validatePaymentField('cardName', v) || '' }));
                    }}
                    placeholder="e.g. Elena Vance"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all ${
                      paymentTouched.cardName && paymentErrors.cardName
                        ? 'bg-rose-50/20 border border-rose-400 focus:ring-2 focus:ring-rose-100'
                        : paymentTouched.cardName && !paymentErrors.cardName
                        ? 'bg-emerald-50/20 border border-emerald-500'
                        : 'border border-[#D9E8EC] focus:border-[#477C82]'
                    }`}
                  />
                  {paymentTouched.cardName && paymentErrors.cardName && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {paymentErrors.cardName}
                    </p>
                  )}
                </div>

                {/* Card Number */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-medium text-[#254653]">
                      Card Number <span className="text-[#FF8F86]">*</span>
                    </label>
                    {paymentTouched.cardNumber && !paymentErrors.cardNumber && (
                      <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" /> Valid 16-digit card
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={cardNumber}
                    maxLength={19}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, '').substring(0, 16);
                      v = v.replace(/(\d{4})(?=\d)/g, '$1 ');
                      setCardNumber(v);
                      setPaymentTouched((p) => ({ ...p, cardNumber: true }));
                      setPaymentErrors((p) => ({ ...p, cardNumber: validatePaymentField('cardNumber', v) || '' }));
                    }}
                    placeholder="4242 4242 4242 4242"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-mono tracking-wider outline-none transition-all ${
                      paymentTouched.cardNumber && paymentErrors.cardNumber
                        ? 'bg-rose-50/20 border border-rose-400 focus:ring-2 focus:ring-rose-100'
                        : paymentTouched.cardNumber && !paymentErrors.cardNumber
                        ? 'bg-emerald-50/20 border border-emerald-500'
                        : 'border border-[#D9E8EC] focus:border-[#477C82]'
                    }`}
                  />
                  {paymentTouched.cardNumber && paymentErrors.cardNumber && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {paymentErrors.cardNumber}
                    </p>
                  )}
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-medium text-[#254653]">
                        Expiration (MM/YY) <span className="text-[#FF8F86]">*</span>
                      </label>
                      {paymentTouched.cardExpiry && !paymentErrors.cardExpiry && (
                        <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                          <Check className="w-3 h-3" /> Valid
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={cardExpiry}
                      maxLength={5}
                      onChange={(e) => {
                        let v = e.target.value.replace(/[^\d/]/g, '').substring(0, 5);
                        if (v.length === 2 && !v.includes('/')) v = v + '/';
                        setCardExpiry(v);
                        setPaymentTouched((p) => ({ ...p, cardExpiry: true }));
                        setPaymentErrors((p) => ({ ...p, cardExpiry: validatePaymentField('cardExpiry', v) || '' }));
                      }}
                      placeholder="12/28"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm font-mono outline-none transition-all ${
                        paymentTouched.cardExpiry && paymentErrors.cardExpiry
                          ? 'bg-rose-50/20 border border-rose-400 focus:ring-2 focus:ring-rose-100'
                          : paymentTouched.cardExpiry && !paymentErrors.cardExpiry
                          ? 'bg-emerald-50/20 border border-emerald-500'
                          : 'border border-[#D9E8EC] focus:border-[#477C82]'
                      }`}
                    />
                    {paymentTouched.cardExpiry && paymentErrors.cardExpiry && (
                      <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {paymentErrors.cardExpiry}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-medium text-[#254653]">
                        CVV Code <span className="text-[#FF8F86]">*</span>
                      </label>
                      {paymentTouched.cardCvv && !paymentErrors.cardCvv && (
                        <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                          <Check className="w-3 h-3" /> Valid
                        </span>
                      )}
                    </div>
                    <input
                      type="password"
                      value={cardCvv}
                      maxLength={4}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, '').substring(0, 4);
                        setCardCvv(v);
                        setPaymentTouched((p) => ({ ...p, cardCvv: true }));
                        setPaymentErrors((p) => ({ ...p, cardCvv: validatePaymentField('cardCvv', v) || '' }));
                      }}
                      placeholder="888"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm font-mono outline-none transition-all ${
                        paymentTouched.cardCvv && paymentErrors.cardCvv
                          ? 'bg-rose-50/20 border border-rose-400 focus:ring-2 focus:ring-rose-100'
                          : paymentTouched.cardCvv && !paymentErrors.cardCvv
                          ? 'bg-emerald-50/20 border border-emerald-500'
                          : 'border border-[#D9E8EC] focus:border-[#477C82]'
                      }`}
                    />
                    {paymentTouched.cardCvv && paymentErrors.cardCvv && (
                      <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {paymentErrors.cardCvv}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Summary of Items */}
              <div className="border border-[#D9E8EC] rounded-2xl p-4 bg-[#F8FBFA] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#607985]">
                  Order Items ({cart.length})
                </h4>
                <div className="space-y-2 divide-y divide-[#D9E8EC] text-xs max-h-36 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-2 first:pt-0 flex justify-between items-center">
                      <div className="truncate pr-2">
                        <span className="font-semibold text-[#254653] block truncate">{item.product.name}</span>
                        <span className="text-[#607985] text-[11px]">
                          Qty: {item.quantity} • {item.selectedSize} • {item.selectedColor.name}
                        </span>
                      </div>
                      <span className="font-bold text-[#254653] shrink-0">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#D9E8EC] flex justify-between items-center text-sm font-bold text-[#254653]">
                  <span>Total Due:</span>
                  <span className="font-serif text-lg">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-[#477C82] hover:bg-[#39656a] text-white text-xs font-bold shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  Authorize & Place Order (${finalTotal.toFixed(2)})
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Order Confirmed */}
          {step === 'confirmed' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#B8DED0]/50 border-2 border-[#477C82] flex items-center justify-center text-[#477C82] mx-auto animate-in zoom-in">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#254653]">
                Thank you for your order!
              </h3>
              <p className="text-xs text-[#607985] max-w-sm mx-auto">
                Your order <span className="font-bold text-[#254653]">{confirmedOrderId}</span> has been confirmed. A receipt and tracking link have been dispatched.
              </p>
              <div className="p-4 rounded-2xl bg-[#F0F7F8] border border-[#CFE6F3] max-w-sm mx-auto text-xs text-left space-y-1.5">
                <p>
                  <strong>Recipient:</strong> {fullName} ({phone})
                </p>
                <p>
                  <strong>Destination:</strong> {address}, {city} {postalCode}
                </p>
                <p>
                  <strong>Delivery:</strong> {shippingMethod === 'standard' ? 'Standard 3-5 Days' : 'Express Courier 1-2 Days'}
                </p>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setStep('shipping');
                  }}
                  className="px-8 py-3 rounded-full bg-[#477C82] text-white text-xs font-bold hover:bg-[#39656a] shadow-xs cursor-pointer"
                >
                  Continue Shopping Familia
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
