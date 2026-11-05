import React, { useState } from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from './ProductCard';
import { SizeGuideModal } from './SizeGuideModal';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Minus,
  Plus,
  Share2,
  Check,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    isInWishlist,
    toggleWishlist,
    navigateTo,
    setQuickViewProduct,
    showToast,
  } = useEcommerce();

  // Find product or fallback to the featured Screen 3 "Floral Maxi Dress"
  const product =
    PRODUCTS.find((p) => p.id === selectedProductId) ||
    PRODUCTS.find((p) => p.id === 'floral-maxi-dress') ||
    PRODUCTS[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'reviews'>('details');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const isFavorited = isInWishlist(product.id);

  // Sync state when product changes
  React.useEffect(() => {
    setSelectedImageIndex(0);
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[1] || product.sizes[0] || 'M');
    setQuantity(1);
  }, [product.id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast('Please select a size first', 'error');
      return;
    }
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    showToast('Product link copied to clipboard!', 'info');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="py-8 bg-[#F8FBFA]" aria-label="Product Details Page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation matching Screen 3 */}
        <nav className="flex items-center gap-1.5 text-xs text-[#607985] mb-8 overflow-x-auto no-scrollbar py-1" aria-label="Breadcrumb">
          <button
            onClick={() => navigateTo('/')}
            className="hover:text-[#477C82] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <button
            onClick={() => navigateTo(`/${product.category}`)}
            className="hover:text-[#477C82] transition-colors capitalize cursor-pointer"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <button
            onClick={() => navigateTo(`/${product.category}`)}
            className="hover:text-[#477C82] transition-colors cursor-pointer"
          >
            {product.subcategory}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#254653] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Layout matching Screen 3 */}
        <div className="bg-white rounded-3xl border border-[#D9E8EC] p-6 sm:p-10 shadow-xs mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Gallery: Vertical Thumbnails + Large Main Image (Screen 3) */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
              {/* Vertical Thumbnails List */}
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[580px] no-scrollbar shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-gray-50 ${
                      selectedImageIndex === idx
                        ? 'border-[#477C82] ring-2 ring-[#477C82]/20 shadow-xs'
                        : 'border-[#D9E8EC] hover:border-[#CFE6F3]'
                    }`}
                    aria-label={`Thumbnail ${idx + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Large Main Product Photo */}
              <div className="flex-1 rounded-2xl overflow-hidden bg-[#F0F7F8] border border-[#D9E8EC] aspect-[3/4] sm:aspect-auto sm:h-[580px] relative group">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                  {product.discountPercentage && (
                    <span className="bg-[#FF8F86] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {product.discountPercentage}% OFF
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-[#B8DED0] text-[#254653] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                      NEW ARRIVAL
                    </span>
                  )}
                </div>

                {/* Share button */}
                <button
                  onClick={handleShare}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-xs text-[#254653] hover:text-[#477C82] shadow-sm transition-colors"
                  title="Share product"
                  aria-label="Share product"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Right Information Column (Screen 3) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                {/* Title */}
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#254653] leading-tight">
                  {product.name}
                </h1>

                {/* Rating & Review Count matching Screen 3 */}
                <div className="flex items-center gap-2 mt-2.5">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 stroke-amber-400'
                            : 'stroke-amber-400 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#254653]">{product.rating}</span>
                  <span className="text-xs text-[#607985]">
                    ({product.reviewsCount} sample reviews)
                  </span>
                </div>

                {/* Price Display matching Screen 3 */}
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-3xl font-serif font-bold text-[#254653]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discountPercentage && (
                    <span className="text-xs font-bold bg-[#FF8F86]/15 text-[#FF8F86] px-2.5 py-0.5 rounded-full">
                      {product.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                {/* Color Swatches matching Screen 3 */}
                <div className="mt-6 pt-5 border-t border-[#D9E8EC]/80">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#607985]">
                      Color: <strong className="text-[#254653]">{selectedColor.name}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((color, idx) => {
                      const isSelected = selectedColor.name === color.name;
                      return (
                        <button
                          key={`${color.name}-${idx}`}
                          onClick={() => setSelectedColor(color)}
                          className={`w-7 h-7 rounded-full transition-all relative flex items-center justify-center ${
                            isSelected
                              ? 'ring-2 ring-offset-2 ring-[#477C82] scale-110 shadow-xs'
                              : 'hover:scale-105 border border-gray-200'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                          aria-label={`Select color ${color.name}`}
                        >
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Size Selector + Size Guide Modal link matching Screen 3 */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#607985]">
                      Size: <strong className="text-[#254653]">{selectedSize}</strong>
                    </span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs font-semibold text-[#477C82] hover:text-[#254653] underline flex items-center gap-1"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {product.sizes.map((sz) => {
                      const isSelected = selectedSize === sz;
                      return (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                            isSelected
                              ? 'bg-[#477C82] text-white border-[#477C82] shadow-xs'
                              : 'bg-white text-[#254653] border-[#D9E8EC] hover:border-[#477C82]'
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity + Add to Cart + Wishlist (Screen 3) */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3">
                    {/* Stepper (- 1 +) */}
                    <div className="flex items-center border border-[#D9E8EC] rounded-full bg-[#F8FBFA] p-1">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-[#254653] hover:bg-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center font-bold text-sm text-[#254653]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-[#254653] hover:bg-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Add to Cart button (Deep teal solid pill) */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 py-3.5 px-6 rounded-full bg-[#477C82] hover:bg-[#39656a] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-98"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>

                    {/* Wishlist button */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`p-3.5 rounded-full border transition-all ${
                        isFavorited
                          ? 'border-[#FF8F86] bg-[#FF8F86]/10 text-[#FF8F86]'
                          : 'border-[#D9E8EC] hover:border-[#FF8F86] text-gray-500 hover:text-[#FF8F86]'
                      }`}
                      aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                      title="Save to Wishlist"
                    >
                      <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#FF8F86]' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* 3 Trust Badges matching Screen 3 */}
                <div className="mt-8 pt-6 border-t border-[#D9E8EC] space-y-3 text-xs text-[#607985]">
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-[#477C82] shrink-0" />
                    <span>
                      <strong className="text-[#254653]">Free Shipping:</strong> On orders over $50
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-4 h-4 text-[#477C82] shrink-0" />
                    <span>
                      <strong className="text-[#254653]">Easy Returns:</strong> Within 30 days of delivery
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#477C82] shrink-0" />
                    <span>
                      <strong className="text-[#254653]">Secure Payments:</strong> 100% encrypted demo checkout
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Tabs: Product Details / Shipping & Returns / Reviews (Screen 3) */}
              <div className="pt-6 border-t border-[#D9E8EC]">
                <div className="flex border-b border-[#D9E8EC] space-x-6">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
                      activeTab === 'details'
                        ? 'border-[#477C82] text-[#477C82]'
                        : 'border-transparent text-[#607985] hover:text-[#254653]'
                    }`}
                  >
                    Product Details
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
                      activeTab === 'shipping'
                        ? 'border-[#477C82] text-[#477C82]'
                        : 'border-transparent text-[#607985] hover:text-[#254653]'
                    }`}
                  >
                    Shipping & Returns
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
                      activeTab === 'reviews'
                        ? 'border-[#477C82] text-[#477C82]'
                        : 'border-transparent text-[#607985] hover:text-[#254653]'
                    }`}
                  >
                    Reviews ({product.reviewsCount})
                  </button>
                </div>

                <div className="pt-4 text-xs text-[#607985] leading-relaxed">
                  {activeTab === 'details' && (
                    <div className="space-y-3">
                      <p>{product.description}</p>
                      <ul className="list-disc pl-4 space-y-1 text-[#254653]">
                        {product.details.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                      <div className="pt-2">
                        <span className="font-semibold text-[#254653]">Fabric & Care:</span>
                        <ul className="list-disc pl-4 mt-1 space-y-0.5">
                          {product.fabricCare.map((fc, idx) => (
                            <li key={idx}>{fc}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-2">
                      <p>• Standard delivery: 3–5 business days ($5.99, free on orders over $50).</p>
                      <p>• Express delivery: 1–2 business days ($12.00).</p>
                      <p>• 30-day hassle-free return window on unworn items with tags attached.</p>
                      <p className="text-[11px] text-gray-400 italic">
                        Note: This is a frontend portfolio demonstration; no real shipments are processed.
                      </p>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-3">
                      <div className="p-3 bg-[#F8FBFA] rounded-xl border border-[#D9E8EC] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#254653]">Sarah M.</span>
                          <span className="text-[10px] text-gray-400">Verified Buyer</span>
                        </div>
                        <div className="flex text-amber-400 text-xs">★★★★★</div>
                        <p className="italic">
                          &quot;The fabric feels so light and breathable! Wore it for our family photoshoot and it photographed beautifully.&quot;
                        </p>
                      </div>
                      <div className="p-3 bg-[#F8FBFA] rounded-xl border border-[#D9E8EC] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#254653]">David K.</span>
                          <span className="text-[10px] text-gray-400">Verified Buyer</span>
                        </div>
                        <div className="flex text-amber-400 text-xs">★★★★★</div>
                        <p className="italic">
                          &quot;True to size, soft seams and held up great in the gentle cold wash. Highly recommend Familia!&quot;
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Grid (Screen 3 bottom) */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl font-bold text-[#254653]">
                You May Also Like
              </h3>
              <button
                onClick={() => navigateTo(`/${product.category}`)}
                className="text-xs font-semibold text-[#477C82] hover:text-[#254653] flex items-center gap-1 cursor-pointer"
              >
                More in {product.category}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={(prod) => setQuickViewProduct(prod)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sizing Chart Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
};
