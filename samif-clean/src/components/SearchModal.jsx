import React, { useState } from 'react';
import { PRODUCTS, BRAND } from '../data/boutiqueData';

export default function SearchModal({
  isOpen,
  onClose,
  onSelectProduct,
}) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProducts = query.trim() === ''
    ? PRODUCTS.slice(0, 4)
    : PRODUCTS.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.collection.toLowerCase().includes(query.toLowerCase()) ||
        p.fabric.toLowerCase().includes(query.toLowerCase()) ||
        p.color.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-inverse-surface/50 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden z-10 animate-fadeIn">
        {/* Input Bar */}
        <div className="p-4 sm:p-6 border-b border-surface-container flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[24px]">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search velvet, angrakha, raw silk, peshwas, bridal..."
            className="flex-1 bg-transparent text-on-surface font-body-md text-base sm:text-lg focus:outline-none placeholder:text-on-surface-variant/60"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-on-surface-variant hover:text-on-surface p-1"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase font-label-sm tracking-wider px-2.5 py-1 rounded bg-surface-container text-on-surface-variant hover:text-on-surface"
          >
            ESC
          </button>
        </div>

        {/* Suggestion Pills */}
        <div className="px-6 py-3 bg-surface-container-low/50 flex flex-wrap items-center gap-2 border-b border-outline-variant/20">
          <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
            Trending:
          </span>
          {['Velvet Angrakha', 'Raw Silk Peshwas', 'Farshi Gharara', 'Bridal Lehnga', 'Karandi'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="text-xs px-2.5 py-1 rounded-full bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-3xl text-outline mb-2">find_in_page</span>
              <p className="font-body-md">No artisanal creations match "{query}"</p>
              <p className="text-xs mt-1">Try searching by fabric like "Velvet", "Chiffon", or "Raw Silk".</p>
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer border border-transparent hover:border-outline-variant/30 group"
              >
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-16 h-20 object-cover rounded bg-surface-container"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-[9px] uppercase tracking-widest text-tertiary">
                      {p.collection}
                    </span>
                    {p.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-primary/10 text-primary font-semibold">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-headline-sm text-base text-on-surface group-hover:text-primary transition-colors font-medium">
                    {p.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant line-clamp-1">
                    {p.fabric} • {p.color}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-label-md text-sm font-semibold text-primary">
                    {BRAND.currencySymbol} {p.price.toLocaleString()}
                  </span>
                  <span className="block text-[10px] text-on-surface-variant">Ready to Ship</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
