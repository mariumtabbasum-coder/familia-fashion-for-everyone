import React, { useState } from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { Product } from '../../types';
import { X, Star, Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    isInWishlist,
    toggleWishlist,
    setSelectedProductId,
    setActiveView,
  } = useEcommerce();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);
  const currentColor = product.colors[selectedColorIndex] || product.colors[0];
  const activeSize = selectedSize || product.sizes[0] || 'M';

  const handleAddToCart = () => {
    addToCart(product, currentColor, activeSize, 1);
    setQuickViewProduct(null);
  };

  const handleGoToDetails = () => {
    setSelectedProductId(product.id);
    setActiveView('product');
    setQuickViewProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center">
      <div
        className="fixed inset-0 bg-[#254653]/60 backdrop-blur-xs"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-[#D9E8EC] z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-[#477C82] hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Left: Image */}
          <div className="aspect-[3/4] bg-gray-100 relative">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            {product.discountPercentage && (
              <span className="absolute top-4 left-4 bg-[#FF8F86] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-xs">
                -{product.discountPercentage}%
              </span>
            )}
          </div>

          {/* Right: Info */}
          <div className="p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#477C82]">
                  {product.category} • {product.subcategory}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#254653] mt-0.5">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-500 font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400 text-[10px]">({product.reviewsCount})</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-serif font-bold text-[#254653]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Color swatches */}
              <div>
                <span className="text-xs font-medium text-[#607985] block mb-1.5">
                  Color: <strong>{currentColor.name}</strong>
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((c, idx) => (
                    <button
                      key={`${c.name}-${idx}`}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-6 h-6 rounded-full border ${
                        selectedColorIndex === idx
                          ? 'ring-2 ring-[#477C82] ring-offset-2'
                          : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <span className="text-xs font-medium text-[#607985] block mb-1.5">
                  Size: <strong>{activeSize}</strong>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-2.5 py-1 text-xs rounded-lg border font-semibold ${
                        activeSize === s
                          ? 'bg-[#477C82] text-white border-[#477C82]'
                          : 'bg-white text-[#254653] border-[#D9E8EC]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 mt-4 border-t border-[#D9E8EC] space-y-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-2.5 rounded-full bg-[#477C82] hover:bg-[#39656a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-full border ${
                    isFavorited
                      ? 'border-[#FF8F86] bg-[#FF8F86]/10 text-[#FF8F86]'
                      : 'border-[#D9E8EC] text-gray-500'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#FF8F86]' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleGoToDetails}
                className="w-full text-center text-xs font-semibold text-[#477C82] hover:underline pt-1 flex items-center justify-center gap-1"
              >
                <span>View Full Product Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
