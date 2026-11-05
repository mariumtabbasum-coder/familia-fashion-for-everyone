import React, { lazy, Suspense, useEffect } from 'react';
import { EcommerceProvider, useEcommerce } from './context/EcommerceContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { ToastContainer } from './components/ui/ToastContainer';

// Clean Homepage Sections
import { HeroSection } from './components/home/HeroSection';
import { ShopByCategorySection } from './components/home/ShopByCategorySection';
import { EditorialPromoBanner } from './components/home/EditorialPromoBanner';
import { WhyFamiliaSection } from './components/home/WhyFamiliaSection';
import { NewsletterSection } from './components/home/NewsletterSection';

// Dedicated Page Views
const ShopPage = lazy(() => import('./components/shop/ShopPage').then((module) => ({ default: module.ShopPage })));
const ProductDetailPage = lazy(() => import('./components/product/ProductDetailPage').then((module) => ({ default: module.ProductDetailPage })));
const CartPage = lazy(() => import('./components/cart/CartPage').then((module) => ({ default: module.CartPage })));
const WishlistPage = lazy(() => import('./components/wishlist/WishlistPage').then((module) => ({ default: module.WishlistPage })));
const AccountPage = lazy(() => import('./components/account/AccountPage').then((module) => ({ default: module.AccountPage })));
const AboutPageView = lazy(() => import('./components/views/AboutPageView').then((module) => ({ default: module.AboutPageView })));
const LookbookPageView = lazy(() => import('./components/views/LookbookPageView').then((module) => ({ default: module.LookbookPageView })));
const BlogPageView = lazy(() => import('./components/views/BlogPageView').then((module) => ({ default: module.BlogPageView })));
const ContactPageView = lazy(() => import('./components/views/ContactPageView').then((module) => ({ default: module.ContactPageView })));
const SearchModal = lazy(() => import('./components/search/SearchModal').then((module) => ({ default: module.SearchModal })));
const CheckoutModal = lazy(() => import('./components/checkout/CheckoutModal').then((module) => ({ default: module.CheckoutModal })));
const QuickViewModal = lazy(() => import('./components/product/QuickViewModal').then((module) => ({ default: module.QuickViewModal })));

const AppContent: React.FC = () => {
  const { activeView, isSearchOpen, isCheckoutOpen, quickViewProduct } = useEcommerce();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FBFA] text-[#254653] font-sans antialiased selection:bg-[#B8DED0] selection:text-[#254653] overflow-x-hidden w-full max-w-full">
      {/* Unified Global Header for ALL Views (Home, Catalog, Product, and Content Pages) */}
      <Header />

      {/* Main Content Area */}
      <main key={activeView} className="route-content flex-1 w-full max-w-full overflow-x-hidden">
        <Suspense fallback={<div aria-hidden="true" className="min-h-[70svh] w-full bg-[#F8FBFA]" />}>
        {/* Homepage: Hero flagship + curated categories + family matching lookbook + trust pillars + newsletter */}
        {activeView === 'home' && (
          <>
            <HeroSection />
            <ShopByCategorySection />
            <EditorialPromoBanner />
            <WhyFamiliaSection />
            <NewsletterSection />
          </>
        )}

        {/* Dedicated Collection & Shop Pages (/women, /men, /kids, /baby, /teens, /shoes, /accessories, /sale) */}
        {activeView === 'shop' && <ShopPage />}

        {/* Product Details Page */}
        {activeView === 'product' && <ProductDetailPage />}

        {/* Dedicated About Page */}
        {activeView === 'about' && <AboutPageView />}

        {/* Dedicated Lookbook Page */}
        {activeView === 'lookbook' && <LookbookPageView />}

        {/* Dedicated Shopping Cart Page */}
        {activeView === 'cart' && <CartPage />}

        {/* Dedicated Wishlist Page */}
        {activeView === 'wishlist' && <WishlistPage />}

        {/* Style Guide / Blog */}
        {activeView === 'blog' && <BlogPageView />}

        {/* Contact Page */}
        {activeView === 'contact' && <ContactPageView />}

        {/* Account / Sign In */}
        {activeView === 'account' && <AccountPage />}
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <MobileDrawer />
      <Suspense fallback={null}>
        {isSearchOpen && <SearchModal />}
        {isCheckoutOpen && <CheckoutModal />}
        {quickViewProduct && <QuickViewModal />}
      </Suspense>
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <EcommerceProvider>
      <AppContent />
    </EcommerceProvider>
  );
}
