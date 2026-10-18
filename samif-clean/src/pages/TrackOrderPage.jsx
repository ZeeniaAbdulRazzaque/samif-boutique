import React, { useState } from 'react';
import { ACTIVE_COMMISSIONS, BRAND } from '../data/boutiqueData';

export default function TrackOrderPage({ setActivePage }) {
  const [searchQuery, setSearchQuery] = useState('SMF-98214');
  const [activeOrder, setActiveOrder] = useState(ACTIVE_COMMISSIONS['SMF-98214']);
  const [searchError, setSearchError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanId = searchQuery.trim().toUpperCase().replace('#', '');
    const found = ACTIVE_COMMISSIONS[cleanId];
    if (found) {
      setActiveOrder(found);
      setSearchError('');
    } else {
      setSearchError(`Commission #${cleanId} not found. Try demo ID: SMF-98214 or SMF-84192`);
    }
  };

  return (
    <div className="w-full bg-surface pb-24">
      {/* Top Breadcrumb */}
      <section className="w-full bg-surface-container-low/70 border-b border-outline-variant/30 py-4">
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
            <span className="text-primary font-semibold">Track Order</span>
          </nav>
        </div>
      </section>

      {/* Page Editorial Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 sm:pt-12">
        <div className="max-w-3xl">
          <span className="font-label-md text-label-md uppercase tracking-[0.2em] text-primary font-semibold">
            Live Order Status
          </span>
          <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl text-on-surface mt-2 leading-tight">
            Track Your Custom Order
          </h1>
          <p className="font-body-md text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
            Follow every stage of your custom order from pattern drafting and hand embroidery to final stitching and delivery.
          </p>
        </div>

        {/* Lookup Console */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm max-w-2xl">
          <span className="text-xs font-label-sm uppercase tracking-wider text-on-surface font-semibold block mb-3">
            Enter Order Number
          </span>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                tag
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. SMF-98214"
                className="w-full bg-surface-container-low pl-11 pr-4 py-3 rounded-lg text-sm font-semibold uppercase text-on-surface border border-outline-variant/60 focus:outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-primary text-on-primary font-label-sm uppercase tracking-widest rounded-lg shadow-sm hover:bg-primary-container transition-colors text-xs font-semibold whitespace-nowrap"
            >
              Track Order
            </button>
          </form>

          {/* Quick Demo Pins */}
          <div className="mt-3 flex items-center gap-2 text-xs text-on-surface-variant">
            <span>Sample Orders:</span>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('SMF-98214');
                setActiveOrder(ACTIVE_COMMISSIONS['SMF-98214']);
                setSearchError('');
              }}
              className="text-primary font-semibold underline"
            >
              #SMF-98214 (In Progress)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('SMF-84192');
                setActiveOrder(ACTIVE_COMMISSIONS['SMF-84192']);
                setSearchError('');
              }}
              className="text-primary font-semibold underline"
            >
              #SMF-84192 (Ready)
            </button>
          </div>

          {searchError && (
            <p className="text-xs text-error mt-2 font-medium">{searchError}</p>
          )}
        </div>
      </section>

      {/* Main Order Timeline Section */}
      {activeOrder && (
        <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* LEFT COLUMN: Vertical Progression Timeline (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Active Commission Header Card */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary font-semibold">
                      Verified Atelier Docket
                    </span>
                    <h2 className="font-headline-sm text-2xl text-on-surface font-semibold">
                      Commission #{activeOrder.orderId}
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                    {activeOrder.statusBadge}
                  </span>
                </div>

                {/* Progress Bar Ribbon */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-on-surface-variant">Garment Completion:</span>
                    <span className="text-primary font-bold">{activeOrder.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-1000"
                      style={{ width: `${activeOrder.progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Metric Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-outline-variant/30 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-label-sm text-on-surface-variant block">
                      Client
                    </span>
                    <span className="font-semibold text-on-surface">{activeOrder.clientName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-label-sm text-on-surface-variant block">
                      Commissioned
                    </span>
                    <span className="font-semibold text-on-surface">{activeOrder.orderDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-label-sm text-on-surface-variant block">
                      Target Delivery
                    </span>
                    <span className="font-semibold text-primary">{activeOrder.promisedDelivery}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-label-sm text-on-surface-variant block">
                      Payment
                    </span>
                    <span className="font-semibold text-emerald-700">100% Settled</span>
                  </div>
                </div>
              </div>

              {/* Vertical Timeline Steps */}
              <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm">
                <h3 className="font-headline-sm text-xl text-on-surface mb-6">
                  Sartorial Assembly Progression
                </h3>

                <div className="relative pl-8 space-y-8 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant/40">
                  {activeOrder.milestones.map((m) => (
                    <div key={m.step} className="relative">
                      {/* Milestone Icon Node */}
                      <div
                        className={`absolute -left-8 top-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-xs ${
                          m.completed
                            ? 'bg-primary text-on-primary'
                            : m.active
                            ? 'bg-tertiary-fixed text-on-tertiary-fixed ring-4 ring-tertiary-fixed/30 animate-pulse'
                            : 'bg-surface-container text-on-surface-variant border border-outline-variant'
                        }`}
                      >
                        {m.completed ? (
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        ) : (
                          m.step
                        )}
                      </div>

                      {/* Content */}
                      <div className="bg-surface-container-low/60 p-4 rounded-xl border border-outline-variant/30 space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4
                            className={`font-headline-sm text-sm font-semibold ${
                              m.active ? 'text-primary' : 'text-on-surface'
                            }`}
                          >
                            Phase {m.step}: {m.title}
                          </h4>
                          <span className="text-[11px] font-label-sm text-tertiary font-semibold">
                            {m.date}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          {m.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Garment Dossier & Concierge (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Garment Details Card */}
              <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm space-y-5">
                <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary font-semibold block">
                  Order Details
                </span>

                <div className="flex gap-4 items-center">
                  <img
                    src="https://images.unsplash.com/photo-1787831537029-f715042b5675?auto=format&fit=crop&w=600&q=80"
                    alt={activeOrder.garment}
                    className="w-20 h-24 object-cover rounded-lg bg-surface-container shrink-0"
                  />
                  <div>
                    <h3 className="font-headline-sm text-base text-on-surface font-semibold">
                      {activeOrder.garment}
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-1">
                      {activeOrder.fabricName}
                    </p>
                    <span className="font-label-md text-xs font-semibold text-primary block mt-1">
                      {BRAND.currencySymbol} {activeOrder.amountPaid.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-outline-variant/30 text-xs">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Store Location:</span>
                    <span className="font-semibold text-on-surface">{activeOrder.salon}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Master Tailor:</span>
                    <span className="font-semibold text-on-surface">{activeOrder.masterArtisan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Customer Support:</span>
                    <span className="font-semibold text-on-surface">{activeOrder.conciergeName}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Support Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">support_agent</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-label-sm tracking-wider text-tertiary-fixed font-semibold block">
                      Direct Support
                    </span>
                    <h4 className="font-headline-sm text-lg text-white">
                      Need a Modification?
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-white/80 leading-relaxed">
                  Connect directly with our store manager, {activeOrder.conciergeName}, for progress updates or alteration requests.
                </p>

                <a
                  href={`https://wa.me/923008472619?text=Inquiry%20regarding%20Order%20${activeOrder.orderId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-surface-container-lowest text-primary font-label-sm uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 font-semibold shadow-sm hover:bg-tertiary-fixed hover:text-on-tertiary-fixed transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>WhatsApp Store Manager</span>
                </a>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
