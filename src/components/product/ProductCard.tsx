import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../../types';
import { useEcommerce } from '../../context/EcommerceContext';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { isInWishlist, toggleWishlist, addToCart, navigateTo } = useEcommerce();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [loadImages, setLoadImages] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];
  const isFavorited = isInWishlist(product.id);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (!('IntersectionObserver' in window)) {
      setLoadImages(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoadImages(true);
        observer.disconnect();
      }
    }, { rootMargin: '250px 0px' });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const handleCardClick = () => {
    navigateTo(`/product/${product.slug}`);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.colors[selectedColorIndex] || product.colors[0], selectedSize, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const hasSecondaryImage = product.images.length > 1;

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      className="product-card group min-w-0 bg-white rounded-2xl border border-[#D9E8EC] overflow-hidden hover:border-[#477C82]/30 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Container with Secondary Hover Image Reveal - 3:4 portrait ratio prevents heads/dresses cropping */}
      <div className="relative aspect-[3/4] bg-[#F0F7F8] overflow-hidden">
        {/* Primary Image */}
        <img
          src={loadImages ? (selectedColor?.image || product.images[0]) : undefined}
          alt={loadImages ? product.name : ''}
          aria-hidden={!loadImages}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-contain object-center transition-transform duration-700 ease-out ${
            hasSecondaryImage ? 'group-hover:scale-105' : 'group-hover:scale-105'
          }`}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />

        {/* Secondary Image Reveal on Hover */}
        {loadImages && hasSecondaryImage && !selectedColor?.image && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-contain object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:scale-105"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        )}

        {/* Badges - compact on mobile so model is not covered */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.discountPercentage && (
            <span className="bg-[#FF8F86] text-white text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs">
              -{product.discountPercentage}%
            </span>
          )}
          {product.isNew && !product.discountPercentage && (
            <span className="bg-[#B8DED0] text-[#254653] text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Button with Heart Animation */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 cursor-pointer ${
            isFavorited
              ? 'bg-white text-[#FF8F86] shadow-md scale-105'
              : 'bg-white/85 text-gray-500 hover:text-[#FF8F86] hover:bg-white hover:scale-110'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${isFavorited ? 'fill-[#FF8F86]' : ''}`} />
        </button>

        {/* Hover Quick Actions Bar with Smooth Slide-Up */}
        <div className="absolute inset-x-0 bottom-2.5 px-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-[#477C82] hover:bg-[#39656a] active:scale-98 text-white py-2 px-3 rounded-xl text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Quick Add
          </button>
          {onQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="bg-white/95 hover:bg-white active:scale-95 text-[#254653] p-2 rounded-xl text-xs shadow-md transition-all cursor-pointer"
              title="Quick View"
              aria-label="Quick preview"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Info Body */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#607985] mb-1">
            <span className="uppercase tracking-wider font-semibold text-[9px] sm:text-[10px] text-[#477C82] truncate max-w-[65%]">
              {product.subcategory}
            </span>
            <div className="flex items-center text-amber-500 font-medium shrink-0">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 stroke-amber-400 mr-1" />
              <span className="tabular-nums">{product.rating}</span>
              <span className="text-gray-400 text-[9px] sm:text-[10px] ml-0.5 tabular-nums">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title - allow 2 lines so names aren't cropped awkwardly */}
          <h3 className="font-serif font-bold text-xs sm:text-sm text-[#254653] group-hover:text-[#477C82] line-clamp-2 leading-snug transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Pricing & Colors */}
        <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-[#D9E8EC]/60 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="text-sm sm:text-base font-bold text-[#254653] tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through tabular-nums">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="block max-w-28 truncate text-[9px] text-[#607985]" title={product.colors[selectedColorIndex]?.name}>
              {product.colors[selectedColorIndex]?.name}
            </span>
          </div>

          {/* Available Color Indicators */}
          <div className="flex w-full items-center justify-between sm:w-auto sm:justify-end gap-1.5">
            <span className="text-[9px] text-[#607985] sm:hidden">Color</span>
            {product.colors.slice(0, 3).map((col, idx) => (
              <button
                key={`${col.name}-${idx}`}
                type="button"
                onClick={(e) => { e.stopPropagation(); setSelectedColorIndex(idx); }}
                aria-label={`Select ${col.name}`}
                aria-pressed={selectedColorIndex === idx}
                className={`w-4 h-4 rounded-full border border-white shadow-xs cursor-pointer ${selectedColorIndex === idx ? 'ring-2 ring-[#477C82] ring-offset-1' : ''}`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-[#607985] pl-2 font-medium tabular-nums">
                +{product.colors.length - 3}
              </span>
            )}
          </div>
        </div>
        <div className="mt-2 flex items-start justify-between gap-1" onClick={(e) => e.stopPropagation()}>
          <span className="text-[10px] text-[#607985]">Size</span>
          <div className="flex min-w-0 flex-1 flex-wrap justify-end gap-1">
            {product.sizes.slice(0, 5).map((size) => (
              <button key={size} type="button" onClick={() => setSelectedSize(size)} aria-pressed={selectedSize === size}
                className={`min-w-6 px-1 py-1 rounded-md border text-[9px] leading-tight font-semibold ${selectedSize === size ? 'bg-[#477C82] text-white border-[#477C82]' : 'bg-white text-[#254653] border-[#D9E8EC]'}`}>
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
