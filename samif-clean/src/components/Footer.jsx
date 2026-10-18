import React, { useState } from 'react';
import Brandmark from './Brandmark';
import { BRAND } from '../data/boutiqueData';

export default function Footer({ setActivePage }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const navigateTo = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-surface-container-low text-on-surface pt-16 pb-12 shadow-[0_-1px_12px_rgba(28,28,28,0.02)] border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Brandmark variant="compact" />
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed max-w-sm mt-1">
              Generations of Pakistani craftsmanship and fine tailoring. Luxury festive wear, ready-to-wear pret, and custom stitching handcrafted with authentic zardozi and premium fabrics.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest">Lahore</span>
              <span className="text-outline-variant">•</span>
              <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest">Karachi</span>
              <span className="text-outline-variant">•</span>
              <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest">Islamabad</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
              Collections
            </span>
            <button
              onClick={() => navigateTo('shop')}
              className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              Velvet Royal Edit
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              Festive Formals & Pret
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              Bridal Collection
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              All Ready-to-Wear
            </button>
          </div>

          {/* Boutique Services */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
              Boutique Services
            </span>
            <button
              onClick={() => navigateTo('custom-tailoring')}
              className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              Custom Tailoring
            </button>
            <button
              onClick={() => navigateTo('book-appointment')}
              className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              Book an Appointment
            </button>
            <button
              onClick={() => navigateTo('track-order')}
              className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              Track Your Order
            </button>
            <button
              onClick={() => navigateTo('design-system')}
              className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              Design System
            </button>
          </div>

          {/* Newsletter Dispatch */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
              Stay in Touch
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Be the first to hear about new collections, seasonal festive edits, and exclusive boutique previews.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mt-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-surface-container-lowest px-4 py-2.5 rounded-lg border border-outline-variant text-body-sm font-body-sm text-on-surface focus:outline-none focus:border-tertiary"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-primary-container transition-colors shadow-sm"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
            <div className="flex flex-col gap-1 mt-1 font-body-sm text-body-sm text-on-surface-variant">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">
                Customer Care
              </span>
              <span className="font-body-sm text-body-sm">
                {BRAND.email} • {BRAND.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant border-t border-outline-variant/30">
          <p>© {new Date().getFullYear()} Samif Boutique. All rights reserved.</p>
          <div className="flex items-center gap-6 font-label-sm text-label-sm uppercase tracking-wider">
            <span className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
              Shipping &amp; Returns
            </span>
            <span className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
