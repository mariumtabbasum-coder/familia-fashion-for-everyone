import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, ProductColor, CartItem, CategoryId } from '../types';
import { PRODUCTS, BLOG_POSTS } from '../data/products';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

export type ActiveViewType =
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'wishlist'
  | 'lookbook'
  | 'about'
  | 'blog'
  | 'contact'
  | 'account';

interface EcommerceContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, color: ProductColor, size: string, quantity?: number) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  cartItemsCount: number;
  freeShippingThreshold: number;
  shippingFee: number;

  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  moveAllWishlistToCart: () => void;

  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;

  // Global active route / modal state
  activeView: ActiveViewType;
  setActiveView: (view: ActiveViewType) => void;
  selectedCategory: CategoryId | 'all';
  setSelectedCategory: (cat: CategoryId | 'all') => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (sub: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedBlogSlug: string | null;
  setSelectedBlogSlug: (slug: string | null) => void;

  // Direct Path Routing support (/women, /product/floral-maxi-dress, /cart, etc.)
  currentPath: string;
  navigateTo: (path: string) => void;

  // Mega menu state
  megaMenuCategory: CategoryId | null;
  setMegaMenuCategory: (cat: CategoryId | null) => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Search state
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Checkout modal
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Mobile menu
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const EcommerceContext = createContext<EcommerceContextType | undefined>(undefined);

// Initial items to seed matching Screen 9 in reference
const getInitialCart = (): CartItem[] => {
  const floral = PRODUCTS.find((p) => p.id === 'floral-maxi-dress');
  const mensShirt = PRODUCTS.find((p) => p.id === 'mens-casual-shirt');
  const kidsDenim = PRODUCTS.find((p) => p.id === 'kids-denim-jacket');

  const items: CartItem[] = [];
  if (floral) {
    items.push({
      id: `${floral.id}-Blue-M`,
      product: floral,
      selectedColor: floral.colors[0],
      selectedSize: 'M',
      quantity: 1,
    });
  }
  if (mensShirt) {
    items.push({
      id: `${mensShirt.id}-Sky Blue-L`,
      product: mensShirt,
      selectedColor: mensShirt.colors[0],
      selectedSize: 'L',
      quantity: 1,
    });
  }
  if (kidsDenim) {
    items.push({
      id: `${kidsDenim.id}-Classic Blue Wash-7-8Y`,
      product: kidsDenim,
      selectedColor: kidsDenim.colors[0],
      selectedSize: '7-8Y',
      quantity: 1,
    });
  }
  return items;
};

const getInitialWishlist = (): Product[] => {
  return PRODUCTS.filter((p) =>
    ['summer-dress', 'hoodie', 'baby-romper', 'womens-coord-set'].includes(p.id)
  );
};

export const EcommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('familia_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return getInitialCart();
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('familia_wishlist_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return getInitialWishlist();
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeView, setActiveView] = useState<ActiveViewType>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('floral-maxi-dress');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [megaMenuCategory, setMegaMenuCategory] = useState<CategoryId | null>(null);
  const [currentPath, setCurrentPath] = useState('/');

  // Parse path and sync internal state
  const parsePath = useCallback((pathname: string) => {
    const cleanPath = pathname.split('?')[0].split('#')[0] || '/';
    setCurrentPath(cleanPath);

    if (cleanPath === '/' || cleanPath === '') {
      setActiveView('home');
      setSelectedCategory('all');
      document.title = 'FAMILIA - Fashion for Everyone';
    } else if (cleanPath === '/about') {
      setActiveView('about');
      document.title = 'About Us | FAMILIA - More Than Just Clothing, It’s Family';
    } else if (cleanPath === '/shop') {
      setActiveView('shop');
      setSelectedCategory('all');
      document.title = 'Shop All Collections | FAMILIA';
    } else if (cleanPath === '/women') {
      setActiveView('shop');
      setSelectedCategory('women');
      document.title = 'Women’s Collection | FAMILIA';
    } else if (cleanPath === '/men') {
      setActiveView('shop');
      setSelectedCategory('men');
      document.title = 'Men’s Collection | FAMILIA';
    } else if (cleanPath === '/kids' || cleanPath === '/baby' || cleanPath === '/kids-baby') {
      setActiveView('shop');
      setSelectedCategory('kids-baby');
      document.title = 'Kids & Baby Collection | FAMILIA';
    } else if (cleanPath === '/teens') {
      setActiveView('shop');
      setSelectedCategory('teens');
      document.title = 'Teens Collection | FAMILIA';
    } else if (cleanPath === '/sale') {
      setActiveView('shop');
      setSelectedCategory('sale');
      document.title = 'Mid-Season Sale (Up to 50%) | FAMILIA';
    } else if (cleanPath.startsWith('/product/')) {
      const slug = cleanPath.replace('/product/', '');
      const prod = PRODUCTS.find((p) => p.slug === slug || p.id === slug);
      if (prod) {
        setSelectedProductId(prod.id);
        setActiveView('product');
        document.title = `${prod.name} | FAMILIA`;
      } else {
        setSelectedProductId('floral-maxi-dress');
        setActiveView('product');
      }
    } else if (cleanPath === '/lookbook') {
      setActiveView('lookbook');
      document.title = 'Family Matching Lookbook | FAMILIA';
    } else if (cleanPath.startsWith('/blog/')) {
      const slug = cleanPath.replace('/blog/', '');
      const post = BLOG_POSTS.find((p) => p.slug === slug);
      setSelectedBlogSlug(slug);
      setActiveView('blog');
      document.title = post ? `${post.title} | FAMILIA Blog` : 'Style Guide & Blog | FAMILIA';
    } else if (cleanPath === '/blog') {
      setSelectedBlogSlug(null);
      setActiveView('blog');
      document.title = 'Style Guide & Blog | FAMILIA';
    } else if (cleanPath === '/cart') {
      setActiveView('cart');
      document.title = 'Shopping Cart | FAMILIA';
    } else if (cleanPath === '/wishlist') {
      setActiveView('wishlist');
      document.title = 'My Saved Wishlist | FAMILIA';
    } else if (cleanPath === '/account') {
      setActiveView('account');
      document.title = 'My Account & Orders | FAMILIA';
    } else if (cleanPath === '/contact') {
      setActiveView('contact');
      document.title = 'Customer Care & Contact | FAMILIA';
    } else {
      setActiveView('home');
      document.title = 'FAMILIA - Fashion for Everyone';
    }
  }, []);

  // Initialize router from window.location
  useEffect(() => {
    if (typeof window !== 'undefined') {
      parsePath(window.location.pathname);

      const handlePopState = () => {
        parsePath(window.location.pathname);
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [parsePath]);

  // Navigate to path and update history
  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== path) {
        window.history.pushState(null, '', path);
      }
      parsePath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sync state changes back to path when internal setters are called directly
  useEffect(() => {
    if (activeView === 'home' && currentPath !== '/') {
      setCurrentPath('/');
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        window.history.pushState(null, '', '/');
      }
    }
  }, [activeView, currentPath]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('familia_cart_v1', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('familia_wishlist_v1', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, color: ProductColor, size: string, quantity = 1) => {
    const itemId = `${product.id}-${color.name}-${size}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, selectedColor: color, selectedSize: size, quantity }];
    });
    showToast(`Added "${product.name}" (${size}, ${color.name}) to cart!`, 'success');
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)));
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === itemId);
      if (item) {
        showToast(`Removed "${item.product.name}" from cart`, 'info');
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist`, 'success');
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
    showToast('Item removed from wishlist', 'info');
  };

  const moveAllWishlistToCart = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach((product) => {
      const defaultColor = product.colors[0];
      const defaultSize = product.sizes[0] || 'M';
      addToCart(product, defaultColor, defaultSize, 1);
    });
    setWishlist([]);
    showToast(`Moved ${wishlist.length} items from wishlist to cart!`, 'success');
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 50.0;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 5.99;
  const cartTotal = cartSubtotal + shippingFee;
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <EcommerceContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartSubtotal,
        cartItemsCount,
        freeShippingThreshold,
        shippingFee,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        moveAllWishlistToCart,
        toasts,
        showToast,
        dismissToast,
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        selectedProductId,
        setSelectedProductId,
        selectedBlogSlug,
        setSelectedBlogSlug,
        currentPath,
        navigateTo,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        megaMenuCategory,
        setMegaMenuCategory,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};

export const useEcommerce = () => {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
};
