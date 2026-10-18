import React, { useState } from 'react';
import Brandmark from './Brandmark';

export default function Header({
  activePage,
  setActivePage,
  cartCount,
  setIsCartOpen,
  setIsSearchOpen,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'custom-tailoring', label: 'Custom Tailoring' },
    { id: 'book-appointment', label: 'Book Appointment' },
    { id: 'track-order', label: 'Track Order' },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(28,28,28,0.04)] border-b border-surface-container-high/60 transition-all">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brandmark / Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left focus:outline-none shrink-0"
          aria-label="Go to homepage"
        >
          <Brandmark />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 font-label-md text-xs uppercase tracking-[0.14em] whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary font-medium'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons: Search, Cart, Appointment */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search catalog"
            className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Cart Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Saved Bag"
            className="w-9 h-9 relative flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Book Appointment CTA */}
          <button
            onClick={() => handleNavClick('book-appointment')}
            className="hidden xl:inline-flex items-center justify-center bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-widest px-4 sm:px-5 py-2.5 rounded-lg border border-tertiary-fixed shadow-sm hover:bg-primary transition-all duration-300 active:scale-95 whitespace-nowrap"
          >
            Book Appointment
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b border-surface-container-high px-6 py-6 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2 font-label-md text-sm uppercase tracking-wider transition-colors flex items-center justify-between ${
                    isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  )}
                </button>
              );
            })}
            <div className="pt-4 border-t border-surface-container-high">
              <button
                onClick={() => handleNavClick('book-appointment')}
                className="w-full py-3 bg-primary text-on-primary text-center font-label-sm uppercase tracking-widest rounded-lg shadow-sm"
              >
                Book Appointment
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
