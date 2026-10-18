import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES, FABRICS, BRAND } from '../data/boutiqueData';

export default function ShopPage({
  setActivePage,
  setSelectedProduct,
  onAddToCart,
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFabric, setSelectedFabric] = useState('All Fabrics');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(400000);
  const [gridCols, setGridCols] = useState(3); // 3 or 4

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Fabric filter
      if (selectedFabric !== 'All Fabrics' && p.fabric !== selectedFabric) {
        return false;
      }
      // Price filter
      if (p.price > maxPrice) {
        return false;
      }
      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matches =
          p.title.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedFabric, maxPrice, searchQuery, sortBy]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Editorial Header & Curated Breadcrumb */}
      <section className="w-full bg-surface-container-low/70 border-b border-outline-variant/30 py-5 lg:py-7">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <div className="mb-3">
            <nav className="flex items-center gap-2 text-xs font-label-sm uppercase tracking-wider text-on-surface-variant">
              <button
                onClick={() => {
                  setActivePage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-primary transition-colors"
              >
                Home
              </button>
              <span className="text-outline-variant">/</span>
              <span className="text-primary font-semibold">Shop Collection</span>
            </nav>
          </div>

          {/* Main Title Block */}
          <div className="max-w-3xl">
            <span className="font-label-md text-label-md uppercase tracking-[0.22em] text-primary font-semibold">
              Ready-to-Wear &amp; Made to Order
            </span>
            <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl text-on-surface mt-2 leading-tight">
              Festive &amp; Ready-to-Wear
            </h1>
            <p className="font-body-md text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
              Festive formals, velvet edits, and everyday pret crafted with pure fabrics, authentic hand embroidery, and custom sizing options.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-6 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded text-xs font-label-md uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-2 ${
                    active
                      ? 'bg-primary text-on-primary font-semibold'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-outline-variant/40'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-sm ${
                      active ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {cat.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat.id).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter Ribbon & Sorter Bar */}
      <section className="w-full bg-surface-container-lowest border-b border-outline-variant/30 sticky top-20 z-30 shadow-xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by silhouette, embroidery, or fabric..."
                className="w-full bg-surface-container-low pl-10 pr-4 py-2.5 rounded text-xs font-body-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            {/* Filter Selectors & Layout Toggles */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Fabric Dropdown */}
              <select
                value={selectedFabric}
                onChange={(e) => setSelectedFabric(e.target.value)}
                aria-label="Filter by fabric"
                className="bg-surface-container-low text-xs font-label-md px-3.5 py-2.5 rounded border border-outline-variant/40 text-on-surface focus:outline-none cursor-pointer"
              >
                {FABRICS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort creations"
                className="bg-surface-container-low text-xs font-label-md px-3.5 py-2.5 rounded border border-outline-variant/40 text-on-surface focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* Grid Toggle (Desktop) */}
              <div className="hidden lg:flex items-center border border-outline-variant/40 rounded overflow-hidden bg-surface-container-low">
                <button
                  onClick={() => setGridCols(3)}
                  aria-label="3 columns grid"
                  className={`p-2 transition-colors ${
                    gridCols === 3 ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  aria-label="4 columns grid"
                  className={`p-2 transition-colors ${
                    gridCols === 4 ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">view_column</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="w-full py-12 lg:py-16 bg-surface min-h-[500px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Active Filter Metrics */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant/30">
            <span className="font-body-sm text-xs text-on-surface-variant">
              Presenting <span className="font-bold text-on-surface">{filteredProducts.length}</span> luxury creations
            </span>

            {(selectedCategory !== 'all' || selectedFabric !== 'All Fabrics' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedFabric('All Fabrics');
                  setSearchQuery('');
                }}
                className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">refresh</span>
                Reset Filters
              </button>
            )}
          </div>

          {/* Grid display */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center max-w-md mx-auto">
              <span className="material-symbols-outlined text-4xl text-outline mb-3">filter_alt_off</span>
              <h3 className="font-headline-sm text-xl text-on-surface">No Creations Found</h3>
              <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                We couldn't find pieces matching your criteria. Try adjusting the fabric or category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedFabric('All Fabrics');
                  setSearchQuery('');
                }}
                className="mt-6 px-6 py-2.5 bg-primary text-on-primary text-xs uppercase font-label-sm tracking-wider rounded"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
              } gap-6 sm:gap-8`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={handleProductClick}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bespoke Tailoring Assurance Banner */}
      <section className="w-full bg-surface-container-low py-14 border-t border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-surface-container-lowest p-8 sm:p-12 rounded border border-outline-variant/40 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="font-label-sm uppercase tracking-widest text-primary font-semibold">
                Complimentary Sizing Guarantee
              </span>
              <h3 className="font-headline-sm text-2xl text-on-surface mt-1">
                Custom Tailored to Your Measurements
              </h3>
              <p className="font-body-sm text-on-surface-variant text-sm mt-2 leading-relaxed">
                Prefer custom shoulder, sleeve, and kameez lengths? Simply toggle the "Custom Tailoring" option at checkout or visit our MM Alam Road (Lahore) and Clifton (Karachi) salons.
              </p>
            </div>
            <button
              onClick={() => {
                setActivePage('custom-tailoring');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="whitespace-nowrap px-8 py-3.5 bg-primary text-on-primary font-label-sm uppercase tracking-wider rounded hover:bg-primary-container transition-colors"
            >
              Open Bespoke Studio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
