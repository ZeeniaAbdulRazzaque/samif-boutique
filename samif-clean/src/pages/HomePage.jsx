import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, BRAND, TESTIMONIALS, ACTIVE_COMMISSIONS } from '../data/boutiqueData';

export default function HomePage({
  setActivePage,
  setSelectedProduct,
  onAddToCart,
}) {
  const [trackingInput, setTrackingInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    const query = trackingInput.trim().toUpperCase() || 'SMF-98214';
    const order = ACTIVE_COMMISSIONS[query] || ACTIVE_COMMISSIONS['SMF-98214'];
    setSearchedOrder(order);
    setShowTrackingModal(true);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-surface border-b border-outline-variant/30">
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Editorial Left Content */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-start px-6 sm:px-10 lg:pl-16 lg:pr-10 pt-4 sm:pt-5 lg:pt-7 pb-8 lg:pb-10 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-surface-container w-fit border border-outline-variant/40">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
                Samif • Couture &amp; Bespoke Tailoring
              </span>
            </div>

            <h1 className="font-display-lg text-display-lg text-on-surface leading-tight tracking-tight">
              Premium Ready-Made Fashion &amp;{' '}
              <span className="italic text-primary">Custom Tailoring</span>
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
              Finely crafted festive wear, everyday luxury pret, and custom stitching tailored to your exact measurements by master artisans.
            </p>

            {/* CTAs with reduced spaces between buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={() => {
                  setActivePage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary font-label-md text-xs uppercase tracking-wider px-6 py-3.5 rounded hover:bg-primary transition-colors border border-tertiary-fixed/30 font-semibold"
              >
                <span>Shop Collection</span>
                <span className="material-symbols-outlined text-[17px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>

              <button
                onClick={() => {
                  setActivePage('custom-tailoring');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 bg-surface-container-low text-on-surface font-label-md text-xs uppercase tracking-wider px-5 py-3.5 rounded hover:bg-surface-container transition-colors border border-outline-variant/50 font-semibold"
              >
                <span className="material-symbols-outlined text-primary text-[18px]">
                  straighten
                </span>
                <span>Custom Tailoring</span>
              </button>
            </div>

            {/* Trust Micro-stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-outline-variant/30">
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-primary font-bold">850+</span>
                <span className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider mt-1">
                  Orders Delivered
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-primary font-bold">4.9★</span>
                <span className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider mt-1">
                  Customer Rating
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-primary font-bold">3 Cities</span>
                <span className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider mt-1">
                  Lahore • Karachi • Isb
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Proportional Pakistani Couture Frame */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[3/4] rounded-2xl border border-outline-variant/40 overflow-hidden bg-surface-container-low shadow-sm">
              <img
                src="/images/hero.png"
                alt="Samif Luxury Pakistani Couture"
                className="w-full h-full object-cover object-top"
              />

              {/* Floating Mini-Card: Handcrafted Quality */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2.5 p-2.5 rounded-lg bg-surface-container-lowest/95 border border-outline-variant/40 shadow-xs z-10 backdrop-blur-xs">
                <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
                <div className="text-left">
                  <div className="font-label-sm text-[8.5px] uppercase text-on-surface-variant font-semibold">Handcrafted Detail</div>
                  <div className="font-headline-sm text-xs text-on-surface leading-none font-bold">Pure Velvet &amp; Silk</div>
                </div>
              </div>

              {/* Floating Atelier Badge: Fall/Winter Preview */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-lg bg-surface/95 border border-outline-variant/40 shadow-xs flex items-center justify-between z-10 backdrop-blur-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                  </div>
                  <div>
                    <p className="font-label-md text-[11px] uppercase tracking-wider text-on-surface font-semibold">Winter Festive Edit</p>
                    <p className="font-body-sm text-[10px] text-on-surface-variant">In-Store &amp; Home Visit Fittings</p>
                  </div>
                </div>
                <span className="font-label-sm text-[8.5px] uppercase bg-primary text-on-primary px-2 py-0.5 rounded tracking-widest font-semibold">
                  New
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REAL-TIME SMART ORDER TRACKING BAR */}
      <section className="w-full bg-surface-container-low py-7 border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-primary text-on-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">order_approve</span>
              </div>
              <div>
                <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary font-semibold">
                  Order Status
                </span>
                <h3 className="font-headline-sm text-lg sm:text-xl text-on-surface">
                  Track Your Custom Stitching Order
                </h3>
              </div>
            </div>

            <form
              onSubmit={handleTrackSubmit}
              className="flex flex-col sm:flex-row items-center gap-2.5 w-full lg:w-auto"
            >
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="Enter Order Number (e.g. SMF-98214)"
                  className="w-full bg-surface-container-lowest px-4 py-2.5 rounded border border-outline-variant/40 text-body-sm font-body-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:border-tertiary uppercase"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-widest rounded hover:bg-primary-container transition-colors whitespace-nowrap font-semibold"
              >
                Track Order
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. FEATURED READY-MADE FESTIVE COLLECTIONS */}
      <section className="w-full py-14 lg:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="font-label-md text-label-md uppercase tracking-[0.2em] text-tertiary font-semibold">
                Winter &amp; Festive Edit '26
              </span>
              <h2 className="font-headline-xl text-headline-xl text-on-surface mt-2">
                Featured Ready-to-Wear
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-2">
                Micro velvets, raw silk peshwas, and festive suits crafted with authentic Pakistani hand embroidery.
              </p>
            </div>

            <button
              onClick={() => {
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-primary font-label-md uppercase tracking-wider hover:gap-3 transition-all font-semibold"
            >
              <span>View All Outfits</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Grid of Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PRODUCTS.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={handleProductClick}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. BESPOKE CUSTOM TAILORING WORKFLOW SHOWCASE */}
      <section className="w-full py-14 lg:py-20 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-md text-label-md uppercase tracking-[0.2em] text-primary font-semibold">
              How Custom Stitching Works
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mt-2">
              Custom Tailoring in 4 Simple Steps
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              From choosing your silhouette to the final hand-finished hem, tailored to your exact measurements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                step: '01',
                title: 'Choose Cut & Fabric',
                desc: 'Pick your silhouette — Angrakha, Peshwas, Gharara, or Kurta — and select your fabric.',
                icon: 'styler',
              },
              {
                step: '02',
                title: 'Send Measurements',
                desc: 'Visit our store, book a home visit, or submit your size online.',
                icon: 'straighten',
              },
              {
                step: '03',
                title: 'Hand Embroidery & Stitching',
                desc: 'Master artisans do the hand zardozi and stitch with inner silk lining.',
                icon: 'handyman',
              },
              {
                step: '04',
                title: 'Final Quality Check & Delivery',
                desc: 'Carefully steam-pressed, packaged, and delivered right to your doorstep.',
                icon: 'verified',
              },
            ].map((item, idx) => (
              <div
                key={item.step}
                className="bg-surface-container-lowest p-5 rounded border border-outline-variant/30 flex flex-col justify-between hover:border-tertiary transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display-lg text-xl font-semibold text-primary/40">
                      {item.step}
                    </span>
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      {item.icon}
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-sm text-on-surface font-semibold mb-1.5">
                    {item.title}
                  </h4>
                  <p className="font-body-sm text-[11px] text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => {
                setActivePage('custom-tailoring');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2.5 bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider px-7 py-3 rounded hover:bg-primary-container transition-colors font-semibold"
            >
              <span>Start Custom Order</span>
              <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER TESTIMONIALS */}
      <section className="w-full py-14 lg:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-md text-label-md uppercase tracking-[0.2em] text-tertiary font-semibold">
              Customer Reviews
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mt-2">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded bg-surface-container-low flex flex-col justify-between border border-outline-variant/30"
              >
                <div>
                  <div className="flex items-center gap-1 text-tertiary mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[16px] fill-1 text-tertiary"
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="font-body-md text-xs sm:text-sm text-on-surface-variant italic leading-relaxed">
                    “{t.quote}”
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-surface-container flex flex-col">
                  <span className="font-headline-sm text-sm font-semibold text-on-surface">
                    {t.author}
                  </span>
                  <span className="font-label-sm text-[9px] uppercase text-primary mt-0.5">
                    {t.location} • {t.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACKING RESULT MODAL */}
      {showTrackingModal && searchedOrder && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded p-6 sm:p-7 relative border border-outline-variant/40 shadow-lg animate-fadeIn">
            <button
              onClick={() => setShowTrackingModal(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
                  Order Status
                </span>
                <h3 className="font-headline-sm text-xl text-on-surface">
                  Order #{searchedOrder.orderId}
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="p-4 bg-surface-container-low rounded-lg space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Garment:</span>
                  <span className="font-semibold text-on-surface">{searchedOrder.garment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Master Artisan:</span>
                  <span className="font-semibold text-on-surface">{searchedOrder.masterArtisan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Store Location:</span>
                  <span className="font-semibold text-on-surface">{searchedOrder.salon}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Estimated Delivery:</span>
                  <span className="font-semibold text-primary">{searchedOrder.promisedDelivery}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {searchedOrder.milestones.slice(0, 4).map((m) => (
                  <div key={m.step} className="flex items-center gap-3 text-xs">
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        m.completed
                          ? 'text-primary'
                          : m.active
                          ? 'text-tertiary animate-spin'
                          : 'text-outline-variant'
                      }`}
                    >
                      {m.completed ? 'check_circle' : m.active ? 'progress_activity' : 'radio_button_unchecked'}
                    </span>
                    <span
                      className={`${
                        m.active
                          ? 'font-semibold text-primary'
                          : m.completed
                          ? 'text-on-surface font-medium'
                          : 'text-on-surface-variant'
                      }`}
                    >
                      {m.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setShowTrackingModal(false);
                  setActivePage('track-order');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-label-md uppercase tracking-wider hover:bg-primary-container transition-colors text-center text-xs font-semibold shadow-sm"
              >
                View Full Timeline
              </button>
              <button
                onClick={() => setShowTrackingModal(false)}
                className="px-5 py-3 border border-outline rounded-lg text-xs font-label-md uppercase tracking-wider hover:bg-surface-container transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
