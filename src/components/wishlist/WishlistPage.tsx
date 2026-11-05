import React from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { PRODUCTS } from '../../data/products';
import {
  Heart,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Star,
  Check,
  Sparkles,
} from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const {
    wishlist,
    removeFromWishlist,
    addToCart,
    moveAllWishlistToCart,
    cartItemsCount,
    navigateTo,
    showToast,
  } = useEcommerce();

  const handleProductClick = (id: string) => {
    const prod = PRODUCTS.find((p) => p.id === id || p.slug === id);
    navigateTo(`/product/${prod ? prod.slug : id}`);
  };

  const handleMoveItemToCart = (product: typeof wishlist[0]) => {
    addToCart(product, product.colors[0], product.sizes[0] || 'M', 1);
    removeFromWishlist(product.id);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F8FBFA] min-h-[70vh]" aria-label="My Wishlist">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#D9E8EC] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF8F86]">
                Saved Favorites
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFF5F5] border border-[#FF8F86]/40 text-[#FF8F86] font-bold text-xs">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#254653]">
              My Wishlist
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {wishlist.length > 0 && (
              <button
                onClick={moveAllWishlistToCart}
                className="px-4 py-2 rounded-full bg-[#477C82] hover:bg-[#39656a] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Cart</span>
              </button>
            )}
            <button
              onClick={() => navigateTo('/cart')}
              className="px-4 py-2 rounded-full border border-[#D9E8EC] bg-white hover:bg-[#F0F7F8] text-[#254653] text-xs font-semibold flex items-center gap-2 transition-all shadow-2xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#477C82]" />
              <span>View Cart ({cartItemsCount})</span>
            </button>
            <button
              onClick={() => navigateTo('/shop')}
              className="px-4 py-2 rounded-full border border-[#D9E8EC] bg-white hover:bg-[#F0F7F8] text-[#254653] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <span>Explore Shop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {wishlist.length === 0 ? (
          /* Empty Wishlist State */
          <div className="bg-white rounded-3xl border border-[#D9E8EC] p-8 sm:p-16 text-center shadow-xs max-w-2xl mx-auto my-8 space-y-4">
            <div className="w-20 h-20 rounded-full bg-[#FFF5F5] border border-[#FF8F86]/40 flex items-center justify-center text-[#FF8F86] mx-auto">
              <Heart className="w-10 h-10 fill-[#FF8F86]/20 text-[#FF8F86]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#254653]">
              Your Wishlist is Empty
            </h2>
            <p className="text-sm text-[#607985] max-w-md mx-auto leading-relaxed">
              Found something you love for your family? Tap the heart icon on any outfit card to save it here for later.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => navigateTo('/shop')}
                className="px-6 py-3 rounded-full bg-[#477C82] hover:bg-[#39656a] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Discover Coordinated Styles
              </button>
              {cartItemsCount > 0 && (
                <button
                  onClick={() => navigateTo('/cart')}
                  className="px-6 py-3 rounded-full bg-[#F0F7F8] border border-[#CFE6F3] text-[#254653] text-xs font-bold hover:bg-[#E8F3F4] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#477C82]" />
                  Check Active Cart ({cartItemsCount})
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-[#D9E8EC] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image and Badges - 3:4 portrait ratio prevents heads/dresses cropping */}
                <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden cursor-pointer" onClick={() => handleProductClick(product.id)}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#FF8F86] text-white text-[10px] sm:text-[11px] font-bold shadow-xs">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(product.id);
                    }}
                    className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-red-50 text-gray-400 hover:text-red-500 backdrop-blur-xs flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                    title="Remove from wishlist"
                    aria-label={`Remove ${product.name} from wishlist`}
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-[#607985]">
                      <span className="font-bold uppercase tracking-wider text-[#477C82] text-[10px]">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-[#254653]">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="font-semibold text-xs">{product.rating}</span>
                        <span className="text-[10px] text-gray-400">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => handleProductClick(product.id)}
                      className="font-serif font-bold text-base text-[#254653] hover:text-[#477C82] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* Color Swatches */}
                    <div className="flex items-center gap-1.5 pt-1">
                      {product.colors.slice(0, 4).map((c, idx) => (
                        <span
                          key={`${c.name}-${idx}`}
                          className="w-3 h-3 rounded-full border border-gray-300"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                      {product.colors.length > 4 && (
                        <span className="text-[10px] text-gray-400 font-medium">
                          +{product.colors.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & Add to Cart button */}
                  <div className="pt-3 border-t border-[#D9E8EC] flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-lg font-bold text-[#254653]">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-xs text-gray-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-600 font-medium">In Stock</span>
                    </div>

                    <button
                      onClick={() => handleMoveItemToCart(product)}
                      className="px-3.5 py-2 rounded-full bg-[#477C82] hover:bg-[#39656a] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
