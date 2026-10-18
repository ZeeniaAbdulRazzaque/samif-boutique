import React, { useState } from 'react';
import { PRODUCTS, BRAND } from '../data/boutiqueData';

export default function ProductDetailPage({
  product = PRODUCTS[0],
  setActivePage,
  onAddToCart,
}) {
  const currentProduct = product || PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [includeCustomStitching, setIncludeCustomStitching] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('heritage');
  const [addedNotice, setAddedNotice] = useState(false);

  const images = currentProduct.images || [
    "https://images.unsplash.com/photo-1787831537029-f715042b5675?auto=format&fit=crop&w=1200&q=85"
  ];

  const totalPrice = currentProduct.price + (includeCustomStitching ? (currentProduct.customTailoringCost || 12500) : 0);

  const handleAdd = () => {
    onAddToCart({
      ...currentProduct,
      selectedSize,
      includeStitching: includeCustomStitching,
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  return (
    <div className="w-full bg-surface pb-20">
      {/* Top Breadcrumb & Atelier Synchronized Status Bar */}
      <section className="w-full bg-surface-container-low/60 border-b border-outline-variant/30 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-between gap-4">
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
            <button
              onClick={() => {
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-primary transition-colors"
            >
              Shop
            </button>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold truncate max-w-xs">{currentProduct.title}</span>
          </nav>
        </div>
      </section>

      {/* Main Two-Column Editorial Display */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* LEFT COLUMN: Gallery & Craftsmanship Heritage (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Main Stage Image Frame */}
            <div className="relative aspect-[3/4] w-full rounded overflow-hidden bg-surface-container-low border border-outline-variant/40 group">
              <img
                src={images[selectedImage] || images[0]}
                alt={currentProduct.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Provenance Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="px-3 py-1.5 rounded-sm bg-primary text-on-primary font-label-sm text-[10px] uppercase tracking-widest border border-tertiary-fixed/30 font-semibold">
                  {currentProduct.badge || 'Pure Micro Velvet'}
                </span>
                <span className="px-3 py-1 rounded-sm bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-[10px] uppercase tracking-wider border border-outline-variant/30">
                  Code: {currentProduct.code}
                </span>
              </div>

              {/* Zoom & Inspect Notice */}
              <div className="absolute bottom-4 right-4 bg-inverse-surface/85 text-on-primary text-[10px] font-label-sm uppercase tracking-wider px-3 py-1.5 rounded-sm backdrop-blur-md flex items-center gap-1.5 pointer-events-none">
                <span className="material-symbols-outlined text-[14px]">zoom_in</span>
                <span>High-Definition Needlework Detail</span>
              </div>
            </div>

            {/* Thumbnail Mosaic (only when multiple poses/images exist) */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-[3/4] rounded overflow-hidden border-2 transition-all relative ${
                      selectedImage === idx
                        ? 'border-primary ring-2 ring-primary/20 scale-[1.02]'
                        : 'border-outline-variant/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Detail view ${idx + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust & Fitting Service Pill */}
            <div className="p-4 rounded bg-surface-container-low/70 border border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">straighten</span>
                </div>
                <div>
                  <span className="font-label-sm text-[10px] uppercase tracking-wider text-primary font-semibold">
                    Perfect Fit Guarantee
                  </span>
                  <p className="text-xs text-on-surface font-medium">
                    Order standard size or submit custom measurements.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActivePage('custom-tailoring')}
                className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
              >
                <span>Size Guide</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </button>
            </div>

            {/* Craftsmanship Spec Grid */}
            <div className="mt-8 pt-8 border-t border-outline-variant/30">
              <h3 className="font-headline-sm text-xl text-on-surface mb-4">
                Sartorial Heritage &amp; Technical Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentProduct.specs && Object.entries(currentProduct.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-3.5 rounded bg-surface-container-low border border-outline-variant/20 flex flex-col"
                  >
                    <span className="font-label-sm text-[10px] uppercase tracking-wider text-tertiary font-semibold">
                      {key}
                    </span>
                    <span className="text-xs font-medium text-on-surface mt-1 leading-snug">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Product Purchase Engine (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 flex flex-col space-y-6 bg-surface-container-lowest p-6 sm:p-8 rounded border border-outline-variant/40">
              {/* Collection Overline & Title */}
              <div>
                <span className="font-label-sm text-xs uppercase tracking-[0.2em] text-tertiary font-semibold">
                  {currentProduct.collection}
                </span>
                <h1 className="font-headline-xl text-2xl sm:text-3xl text-on-surface font-medium mt-1">
                  {currentProduct.title}
                </h1>

                {/* Rating & In-Stock Status */}
                <div className="flex items-center justify-between mt-3 pb-4 border-b border-outline-variant/30">
                  <div className="flex items-center gap-1 text-tertiary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[16px] fill-1 text-tertiary">
                        star
                      </span>
                    ))}
                    <span className="text-xs text-on-surface font-semibold ml-1">
                      {currentProduct.rating} ({currentProduct.reviewsCount} Patron Reviews)
                    </span>
                  </div>
                  <span className="text-[11px] font-label-sm uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                    {currentProduct.inStock ? 'Made to Order' : 'Waitlist'}
                  </span>
                </div>
              </div>

              {/* Price Structure */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant block">
                    Garment Investment
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="font-headline-xl text-3xl font-bold text-primary">
                      {BRAND.currencySymbol} {totalPrice.toLocaleString()}
                    </span>
                    {currentProduct.originalPrice && (
                      <span className="font-body-md text-sm text-on-surface-variant line-through">
                        {BRAND.currencySymbol} {currentProduct.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-on-surface-variant bg-surface-container px-2.5 py-1 rounded">
                  Insured Pakistan Delivery Included
                </span>
              </div>

              {/* Description summary */}
              <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {currentProduct.description}
              </p>

              {/* Size Selector */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface font-semibold">
                    Select Sizing: <span className="text-primary">{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => setActivePage('custom-tailoring')}
                    className="text-[11px] text-tertiary hover:underline font-semibold"
                  >
                    Need Custom Sizing?
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {currentProduct.sizes.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 text-xs font-label-md uppercase tracking-wider rounded border transition-all ${
                          isSelected
                            ? 'bg-primary text-on-primary border-primary font-bold'
                            : 'bg-surface-container-low text-on-surface border-outline-variant/40 hover:border-primary'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Tailoring Addon Checkbox */}
              <div className="p-4 rounded bg-surface-container-low/80 border border-outline-variant/40 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeCustomStitching}
                    onChange={(e) => setIncludeCustomStitching(e.target.checked)}
                    className="accent-primary w-4 h-4 rounded mt-0.5 shrink-0"
                  />
                  <div>
                    <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-bold block">
                      Include Custom Stitching (+{BRAND.currencySymbol} {(currentProduct.customTailoringCost || 12500).toLocaleString()})
                    </span>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                      Includes custom measurements, neckline choice, sleeve finishing, and silk lining.
                    </p>
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleAdd}
                  className="w-full py-4 bg-primary text-on-primary font-label-lg text-xs uppercase tracking-widest rounded hover:bg-primary-container transition-all flex items-center justify-center gap-2 group active:scale-98 font-semibold"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  <span>Add to Bag</span>
                </button>

                {addedNotice && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-xs flex items-center justify-between animate-fadeIn font-medium">
                    <span>Item added to your shopping bag!</span>
                    <button
                      onClick={() => setActivePage('shop')}
                      className="underline font-semibold hover:text-emerald-950"
                    >
                      View Catalog
                    </button>
                  </div>
                )}

                <button
                  onClick={() => {
                    setActivePage('book-appointment');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3.5 bg-transparent border border-outline-variant/60 text-on-surface font-label-sm text-xs uppercase tracking-wider rounded hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-tertiary">calendar_month</span>
                  <span>Book In-Person Salon Fitting (Lahore / KHI / ISB)</span>
                </button>
              </div>

              {/* Direct Concierge WhatsApp */}
              <div className="pt-2 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-emerald-600 text-[18px]">chat</span>
                <span>Questions? WhatsApp Concierge: </span>
                <a
                  href={`https://wa.me/923008472619?text=Inquiry%20regarding%20${encodeURIComponent(currentProduct.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary font-semibold hover:underline"
                >
                  {BRAND.whatsapp}
                </a>
              </div>

              {/* Accordion Sections */}
              <div className="border-t border-outline-variant/30 pt-4 space-y-3">
                {/* Accordion 1: Embroidery */}
                <div className="border border-outline-variant/30 rounded overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'heritage' ? '' : 'heritage')}
                    className="w-full px-4 py-3 bg-surface-container-low flex justify-between items-center text-xs font-label-sm uppercase tracking-wider text-on-surface font-semibold text-left"
                  >
                    <span>Hand Zardozi &amp; Textile Provenance</span>
                    <span className="material-symbols-outlined text-[18px]">
                      {openAccordion === 'heritage' ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {openAccordion === 'heritage' && (
                    <div className="p-4 bg-surface-container-lowest text-xs text-on-surface-variant leading-relaxed space-y-2">
                      <p>
                        Every motif is traced onto the fabric using heritage wooden stencil blocks and hand-embroidered by artisan families with over 3 decades of experience in the Mughal needle arts.
                      </p>
                      <p>
                        We use strictly 100% genuine metallic tilla, imported Japanese micro-sequins, and unadulterated silk floss threads.
                      </p>
                    </div>
                  )}
                </div>

                {/* Accordion 2: Delivery & Timelines */}
                <div className="border border-outline-variant/30 rounded overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'delivery' ? '' : 'delivery')}
                    className="w-full px-4 py-3 bg-surface-container-low flex justify-between items-center text-xs font-label-sm uppercase tracking-wider text-on-surface font-semibold text-left"
                  >
                    <span>Timeline &amp; Insured Dispatch</span>
                    <span className="material-symbols-outlined text-[18px]">
                      {openAccordion === 'delivery' ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {openAccordion === 'delivery' && (
                    <div className="p-4 bg-surface-container-lowest text-xs text-on-surface-variant leading-relaxed space-y-2">
                      <p>
                        Standard Made-to-Order delivery: <strong>{currentProduct.estimatedDays}</strong>.
                      </p>
                      <p>
                        Dispatched in high-security, tamper-evident keepsake garment boxes with courier transit insurance across Pakistan (Lahore, Karachi, Islamabad, Rawalpindi, Peshawar, Multan, Faisalabad). International DHL Express delivery available for overseas patrons.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
