import React, { useEffect, useRef } from 'react';
import { EcommerceProvider, useEcommerce } from './context/EcommerceContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { ToastContainer } from './components/ui/ToastContainer';
import { SearchModal } from './components/search/SearchModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { QuickViewModal } from './components/product/QuickViewModal';

// Clean Homepage Sections
import { HeroSection } from './components/home/HeroSection';
import { ShopByCategorySection } from './components/home/ShopByCategorySection';
import { EditorialPromoBanner } from './components/home/EditorialPromoBanner';
import { WhyFamiliaSection } from './components/home/WhyFamiliaSection';
import { NewsletterSection } from './components/home/NewsletterSection';

// Dedicated Page Views
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CartPage } from './components/cart/CartPage';
import { WishlistPage } from './components/wishlist/WishlistPage';
import { AccountPage } from './components/account/AccountPage';
import { AboutPageView } from './components/views/AboutPageView';
import { LookbookPageView } from './components/views/LookbookPageView';
import { BlogPageView } from './components/views/BlogPageView';
import { ContactPageView } from './components/views/ContactPageView';

import gsap from 'gsap';

const AppContent: React.FC = () => {
  const { activeView } = useEcommerce();
  const mainRef = useRef<HTMLDivElement>(null);

  // Smooth view transition
  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0.94, y: 4 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      );
    }
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FBFA] text-[#254653] font-sans antialiased selection:bg-[#B8DED0] selection:text-[#254653] overflow-x-hidden w-full max-w-full">
      {/* Unified Global Header for ALL Views (Home, Catalog, Product, and Content Pages) */}
      <Header />

      {/* Main Content Area */}
      <main ref={mainRef} className="flex-1 w-full max-w-full overflow-x-hidden">
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
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <MobileDrawer />
      <SearchModal />
      <CheckoutModal />
      <QuickViewModal />
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
