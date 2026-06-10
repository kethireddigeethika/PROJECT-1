/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ArrowUp, Star, Phone, MessageCircle } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import FeaturedProducts from './components/FeaturedProducts';
import Expertise from './components/Expertise';
import Gallery from './components/Gallery';
import SpecialOffers from './components/SpecialOffers';
import Stats from './components/Stats';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Toast, { ToastMessage } from './components/Toast';
import { CartItem, Product } from './types';
import { CONTACT_INFO } from './data';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('thickshakes_cart_v1');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync cart state to localStorage
  useEffect(() => {
    localStorage.setItem('thickshakes_cart_v1', JSON.stringify(cartItems));
  }, [cartItems]);

  // Monitor scroll for Scroll-to-Top visibility
  useEffect(() => {
    const handleScrollVisibility = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScrollVisibility);
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  // Utility to fire beautiful toasted responses
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    // auto remove in 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleRemoveToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add customized item to the cart
  const handleAddToCart = (newItem: Omit<CartItem, 'id'>) => {
    // Generate a compound key to treat same shakes of different sizes or sugary options as separate line items
    const compoundKey = `${newItem.product.id}-${newItem.size}-${newItem.noSugar ? 'nosugar' : 'withsugar'}-${newItem.extraWhippedCream ? 'whip' : 'nowhip'}`;

    setCartItems((prevItems) => {
      const existsIdx = prevItems.findIndex((item) => item.id === compoundKey);
      if (existsIdx > -1) {
        const updated = [...prevItems];
        updated[existsIdx].quantity += newItem.quantity;
        showToast(`Incremented portion count for ${newItem.product.name}!`, 'success');
        return updated;
      } else {
        showToast(`Added ${newItem.product.name} to your velvet cart!`, 'success');
        return [...prevItems, { id: compoundKey, ...newItem }];
      }
    });
  };

  // Register Completely Custom Shake from Hero Builder
  const handleAddCustomShake = (
    customName: string,
    customPrice: number,
    opts: { size: 'regular' | 'large'; whipped: boolean; noSugar: boolean; notes: string }
  ) => {
    // Treat as temporary Product object
    const customProduct: Product = {
      id: `custom-assembled-${Date.now()}`,
      name: customName,
      description: opts.notes,
      price: customPrice,
      image: '/src/assets/images/chocolate_shake_1781080173573.png', // custom builder illustration covers visually, we default base chocolate
      category: 'chocolate',
      rating: 5.0,
      calories: opts.size === 'large' ? 740 : 540,
      allergens: ['Dairy'],
    };

    handleAddToCart({
      product: customProduct,
      quantity: 1,
      size: opts.size,
      noSugar: opts.noSugar,
      extraWhippedCream: opts.whipped,
      customRequests: opts.notes,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      showToast(`Removed ${item.product.name} from your cart.`, 'info');
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Safely trigger promo code application by focusing inside cart drawer
  const handleApplyPromoCodeFromBanner = (code: string) => {
    setIsCartOpen(true);
  };

  const handleScrollToTopAction = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream-light text-brand-deep relative overflow-x-hidden selection:bg-brand-pink selection:text-white" id="thickshakes-root-container">
      
      {/* 1. Header Toolbar */}
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          // Auto-scroll context to Menu so they instantly see matching results
          if (q.trim()) {
            const menuSection = document.querySelector('#menu');
            if (menuSection) {
              const headerOffset = 85;
              const elementPosition = menuSection.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              window.scrollTo({ top: offsetPosition, behavior: 'instant' });
            }
          }
        }}
        onOpenPromoCode={handleApplyPromoCodeFromBanner}
      />

      {/* 2. Main Chapters */}
      <main className="flex-grow" id="primary-content-viewport">
        <Hero onAddCustomShake={handleAddCustomShake} showToast={showToast} />
        <AboutUs />
        <FeaturedProducts onAddToCart={handleAddToCart} searchQuery={searchQuery} />
        <Expertise />
        <Gallery />
        <SpecialOffers showToast={showToast} onApplyPromoCodeInCart={handleApplyPromoCodeFromBanner} />
        <Stats />
        <Reviews showToast={showToast} />
        <Contact showToast={showToast} />
      </main>

      {/* 3. Footer directories */}
      <Footer showToast={showToast} />

      {/* 4. Sliding Checkout Area */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        showToast={showToast}
      />

      {/* 5. Notification Toast hub */}
      <Toast toasts={toasts} onRemove={handleRemoveToast} />

      {/* 6. Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTopAction}
          className="fixed bottom-6 left-6 z-40 bg-brand-brown hover:bg-brand-pink text-brand-cream p-3 rounded-full shadow-brand-touch hover:shadow-brand-soft hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fade-in border border-[#FFF8E7]/10"
          aria-label="Scroll back to top"
          id="scroll-to-top-button"
        >
          <ArrowUp className="w-5 h-5 animate-bounce" />
        </button>
      )}

      {/* 7. Persistent WhatsApp float-bubble on mobile */}
      <a
        href={CONTACT_INFO.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:right-auto md:left-20 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-brand-touch hover:shadow-brand-soft hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-emerald-400"
        title="Direct Chat in WhatsApp"
        id="whatsapp-float-bubble"
      >
        <MessageCircle className="w-5.5 h-5.5 fill-current text-white" />
      </a>

    </div>
  );
}
