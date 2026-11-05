import React, { useState } from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { PRODUCTS } from '../../data/products';
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  Truck,
  Heart,
  Tag,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    wishlist,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartTotal,
    shippingFee,
    freeShippingThreshold,
    navigateTo,
    setIsCheckoutOpen,
    showToast,
  } = useEcommerce();

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');

  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleProductClick = (id: string) => {
    const prod = PRODUCTS.find((p) => p.id === id || p.slug === id);
    navigateTo(`/product/${prod ? prod.slug : id}`);
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

    // Regex check for promo code (alphanumeric, 4 to 15 chars)
    if (!/^[A-Z0-9]{4,15}$/.test(code)) {
      setPromoError('Please enter a valid coupon code format (e.g. FAMILIA15).');
      return;
    }

    if (code === 'FAMILIA15') {
      const discount = Math.round(cartSubtotal * 0.15 * 100) / 100;
      setPromoDiscount(discount);
      setAppliedPromo('FAMILIA15 (15% OFF)');
      showToast('15% Family Welcome discount applied!', 'success');
      setPromoCode('');
    } else if (code === 'FAMILIA10') {
      const discount = Math.round(cartSubtotal * 0.10 * 100) / 100;
      setPromoDiscount(discount);
      setAppliedPromo('FAMILIA10 (10% OFF)');
      showToast('10% Family Seasonal discount applied!', 'success');
      setPromoCode('');
    } else {
      setPromoError('Coupon code not found or expired. Try FAMILIA15.');
    }
  };

  const finalTotal = Math.max(0, cartTotal - promoDiscount);

  return (
    <div role="region" className="py-8 sm:py-12 bg-[#F8FBFA] min-h-[70vh]" aria-label="Shopping Cart">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#D9E8EC] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#477C82]">
                Your Shopping Bag
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#CFE6F3] text-[#254653] font-bold text-xs">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#254653]">
              Shopping Cart
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/wishlist')}
              className="px-4 py-2 rounded-full border border-[#FF8F86]/50 bg-white hover:bg-[#FFF5F5] text-[#254653] text-xs font-semibold flex items-center gap-2 transition-all shadow-2xs"
            >
              <Heart className="w-3.5 h-3.5 text-[#FF8F86] fill-[#FF8F86]" />
              <span>Saved Wishlist ({wishlist.length})</span>
            </button>
            <button
              onClick={() => navigateTo('/shop')}
              className="px-4 py-2 rounded-full border border-[#D9E8EC] bg-white hover:bg-[#F0F7F8] text-[#254653] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl border border-[#D9E8EC] p-8 sm:p-16 text-center shadow-xs max-w-2xl mx-auto my-8 space-y-4">
            <div className="w-20 h-20 rounded-full bg-[#F0F7F8] border border-[#CFE6F3] flex items-center justify-center text-[#477C82] mx-auto">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#254653]">
              Your Cart is Currently Empty
            </h2>
            <p className="text-sm text-[#607985] max-w-md mx-auto leading-relaxed">
              Explore our coordinated fashion collections for women, men, kids, babies, and teens. Add your favorites to begin your order!
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => navigateTo('/shop')}
                className="px-6 py-3 rounded-full bg-[#477C82] hover:bg-[#39656a] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Shop All Collections
              </button>
              {wishlist.length > 0 && (
                <button
                  onClick={() => navigateTo('/wishlist')}
                  className="px-6 py-3 rounded-full bg-[#FFF5F5] border border-[#FF8F86] text-[#254653] text-xs font-bold hover:bg-[#FFEAE8] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 text-[#FF8F86] fill-[#FF8F86]" />
                  View Saved Wishlist ({wishlist.length})
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Cart Content Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Shipping Progress Indicator */}
              <div className="p-4 rounded-2xl bg-white border border-[#D9E8EC] shadow-2xs">
                <div className="flex items-center justify-between text-xs font-medium text-[#254653] mb-2">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#477C82]" />
                    {freeShippingRemaining > 0 ? (
                      <span>
                        Add <strong className="text-[#477C82]">${freeShippingRemaining.toFixed(2)}</strong> more for <strong className="text-[#254653]">Free Standard Shipping</strong>
                      </span>
                    ) : (
                      <span className="text-[#477C82] font-bold">
                        🎉 Congratulations! You&apos;ve unlocked Free Standard Delivery!
                      </span>
                    )}
                  </div>
                  <span className="text-[#607985] font-semibold">{freeShippingProgress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-[#E8F3F4] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#477C82] h-full rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9E8EC] shadow-xs divide-y divide-[#D9E8EC]/80">
                {cart.map((item) => (
                  <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 sm:items-center">
                    {/* Item Thumbnail */}
                    <div
                      onClick={() => handleProductClick(item.product.id)}
                      className="w-24 h-30 sm:w-24 sm:h-30 rounded-2xl overflow-hidden bg-gray-50 border border-[#D9E8EC] cursor-pointer shrink-0 group"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#477C82]">
                            {item.product.category.toUpperCase()}
                          </span>
                          <h3
                            onClick={() => handleProductClick(item.product.id)}
                            className="font-serif font-bold text-base sm:text-lg text-[#254653] hover:text-[#477C82] transition-colors cursor-pointer"
                          >
                            {item.product.name}
                          </h3>
                        </div>
                        <span className="font-serif text-lg font-bold text-[#254653] shrink-0">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Variant metadata */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#607985] mt-1.5">
                        <span className="flex items-center gap-1.5">
                          Color:
                          <span
                            className="w-3 h-3 rounded-full border border-gray-300 inline-block shadow-2xs"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <strong className="text-[#254653]">{item.selectedColor.name}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          Size: <strong className="text-[#254653]">{item.selectedSize}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          Unit: <strong className="text-[#254653]">${item.product.price.toFixed(2)}</strong>
                        </span>
                      </div>

                      {/* Quantity Stepper & Removal */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-[#D9E8EC] rounded-full bg-[#F8FBFA] p-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:text-[#254653] hover:bg-white transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center font-bold text-xs text-[#254653]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:text-[#254653] hover:bg-white transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="px-3 py-1.5 text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Summary Sidebar Column */}
            <div className="lg:col-span-4 space-y-4">
              {/* Promo Code Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#D9E8EC] shadow-xs">
                <h3 className="font-serif font-bold text-base text-[#254653] flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-[#477C82]" />
                  <span>Promo Code</span>
                </h3>
                {appliedPromo ? (
                  <div className="p-3 bg-[#EAF5F6] border border-[#CFE6F3] rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#1C4E57]">{appliedPromo}</span>
                      <span className="text-[11px] text-[#607985] block">Saved ${promoDiscount.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => {
                        setAppliedPromo('');
                        setPromoDiscount(0);
                        showToast('Promo code removed.', 'info');
                      }}
                      className="text-xs text-red-500 hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value.toUpperCase());
                          if (promoError) setPromoError('');
                        }}
                        placeholder="e.g. FAMILIA15"
                        maxLength={15}
                        className={`flex-1 px-3.5 py-2 text-xs rounded-xl bg-[#F8FBFA] border outline-none uppercase font-mono tracking-wider ${
                          promoError ? 'border-red-400 focus:ring-1 focus:ring-red-100' : 'border-[#D9E8EC] focus:border-[#477C82]'
                        }`}
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#254653] hover:bg-[#1C4E57] text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-[11px] text-red-500">{promoError}</p>
                    )}
                    <p className="text-[10px] text-[#607985]">
                      Try code <strong className="text-[#477C82]">FAMILIA15</strong> for 15% off or <strong className="text-[#477C82]">FAMILIA10</strong> for 10% off.
                    </p>
                  </form>
                )}
              </div>

              {/* Order Summary Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#D9E8EC] shadow-xs space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#254653] pb-3 border-b border-[#D9E8EC]">
                  Order Summary
                </h3>

                <div className="space-y-2.5 text-xs text-[#607985]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#254653]">${cartSubtotal.toFixed(2)}</span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-[#1C4E57]">
                      <span>Discount ({appliedPromo})</span>
                      <span className="font-bold">-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shippingFee === 0 ? (
                        <strong className="text-[#477C82]">FREE</strong>
                      ) : (
                        `$${shippingFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="text-[#254653]">Calculated at checkout</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D9E8EC] flex items-center justify-between">
                  <div>
                    <span className="font-serif text-lg font-bold text-[#254653]">Estimated Total</span>
                    <span className="text-[10px] text-[#607985] block">USD currency</span>
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#254653]">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3.5 rounded-full bg-[#477C82] hover:bg-[#39656a] text-white text-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Trust Badges */}
                <div className="pt-3 border-t border-[#D9E8EC]/60 grid grid-cols-2 gap-2 text-[10px] text-[#607985]">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#477C82] shrink-0" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-[#477C82] shrink-0" />
                    <span>30-Day Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
