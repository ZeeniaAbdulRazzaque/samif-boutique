import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CustomTailoringPage from './pages/CustomTailoringPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import TrackOrderPage from './pages/TrackOrderPage';
import DesignSystemShowcasePage from './pages/DesignSystemShowcasePage';
import { PRODUCTS } from './data/boutiqueData';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cart State — starts empty
  const [cartItems, setCartItems] = useState([]);

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product) => {
    const size = product.selectedSize || 'M';
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          selectedSize: size,
          quantity: 1,
          includeStitching: product.includeStitching || false,
        },
      ];
    });
    showToast(`Added "${product.title}" to bag`);
  };

  const handleUpdateQuantity = (id, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (id, size) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.selectedSize === size)));
  };

  const handleToggleStitching = (id, size) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === size
          ? { ...item, includeStitching: !item.includeStitching }
          : item
      )
    );
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body-md antialiased selection:bg-primary-container selection:text-on-primary">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-label-sm uppercase tracking-wider animate-fadeIn border border-tertiary-fixed/40">
          <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Luxury Header */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        cartCount={totalCartCount}
        setIsCartOpen={setIsCartOpen}
        setIsSearchOpen={setIsSearchOpen}
      />

      {/* Main Page Content */}
      <main className="flex-1 pt-16">
        {activePage === 'home' && (
          <HomePage
            setActivePage={setActivePage}
            setSelectedProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
          />
        )}

        {activePage === 'shop' && (
          <ShopPage
            setActivePage={setActivePage}
            setSelectedProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
          />
        )}

        {activePage === 'product-detail' && (
          <ProductDetailPage
            product={selectedProduct}
            setActivePage={setActivePage}
            onAddToCart={handleAddToCart}
          />
        )}

        {activePage === 'custom-tailoring' && (
          <CustomTailoringPage
            setActivePage={setActivePage}
            onAddToCart={handleAddToCart}
          />
        )}

        {activePage === 'book-appointment' && (
          <BookAppointmentPage
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'track-order' && (
          <TrackOrderPage
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'design-system' && (
          <DesignSystemShowcasePage
            setActivePage={setActivePage}
          />
        )}
      </main>

      {/* Global Luxury Footer */}
      <Footer setActivePage={setActivePage} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onToggleStitching={handleToggleStitching}
        onCheckoutSuccess={() => {
          showToast('Order placed successfully!');
        }}
      />

      {/* Global Luxury Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => {
          setSelectedProduct(prod);
          setActivePage('product-detail');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
