import React, { useState } from 'react';
import {
  TAILORING_SILHOUETTES,
  NECKLINE_OPTIONS,
  SLEEVE_OPTIONS,
  TROUSER_OPTIONS,
  BRAND,
} from '../data/boutiqueData';

export default function CustomTailoringPage({
  setActivePage,
  onAddToCart,
}) {
  const [selectedSilhouette, setSelectedSilhouette] = useState(TAILORING_SILHOUETTES[0].id);
  const [selectedNeckline, setSelectedNeckline] = useState(NECKLINE_OPTIONS[0].id);
  const [selectedSleeve, setSelectedSleeve] = useState(SLEEVE_OPTIONS[0].id);
  const [selectedTrouser, setSelectedTrouser] = useState(TROUSER_OPTIONS[0].id);
  const [fabricSource, setFabricSource] = useState('atelier-silk'); // or 'patron-sent'
  const [measurementType, setMeasurementType] = useState('custom-inches'); // or 'standard'

  // Measurements form state
  const [measurements, setMeasurements] = useState({
    kameezLength: '48',
    chest: '38',
    waist: '32',
    hip: '42',
    shoulder: '15',
    sleevesLength: '22',
    armhole: '17',
    trouserLength: '38',
    bottomOpening: '13',
    specialNotes: '',
  });

  const [standardSize, setStandardSize] = useState('Medium (M)');
  const [patronHeight, setPatronHeight] = useState('5 ft 5 in');
  const [commissionSuccess, setCommissionSuccess] = useState(false);

  // Price calculations
  const silhouetteObj = TAILORING_SILHOUETTES.find((s) => s.id === selectedSilhouette) || TAILORING_SILHOUETTES[0];
  const necklineObj = NECKLINE_OPTIONS.find((n) => n.id === selectedNeckline) || NECKLINE_OPTIONS[0];
  const sleeveObj = SLEEVE_OPTIONS.find((s) => s.id === selectedSleeve) || SLEEVE_OPTIONS[0];
  const trouserObj = TROUSER_OPTIONS.find((t) => t.id === selectedTrouser) || TROUSER_OPTIONS[0];

  const fabricAddon = fabricSource === 'atelier-silk' ? 14000 : 0;
  const totalPrice = silhouetteObj.basePrice + necklineObj.extra + sleeveObj.extra + trouserObj.extra + fabricAddon;

  const handleCommissionSubmit = (e) => {
    e.preventDefault();
    onAddToCart({
      id: `custom-tailoring-${Date.now()}`,
      title: `Custom Bespoke: ${silhouetteObj.name}`,
      collection: 'Custom Tailoring Studio',
      price: totalPrice,
      fabric: fabricSource === 'atelier-silk' ? 'Samif Pure Silk & Lining' : 'Customer Provided Fabric',
      images: [silhouetteObj.image],
      selectedSize: measurementType === 'standard' ? standardSize : 'Custom Measurements',
      includeStitching: true,
      customTailoringCost: 0,
    });
    setCommissionSuccess(true);
    setTimeout(() => {
      setCommissionSuccess(false);
      setActivePage('track-order');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  return (
    <div className="w-full bg-surface pb-24">
      {/* Top Operational Breadcrumb */}
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
            <span className="text-primary font-semibold">Custom Tailoring</span>
          </nav>
        </div>
      </section>

      {/* Main Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 sm:pt-12">
        <div className="max-w-3xl">
          <span className="font-label-md text-label-md uppercase tracking-[0.2em] text-primary font-semibold">
            Bespoke Stitching Service
          </span>
          <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl text-on-surface mt-2 leading-tight">
            Custom Tailoring &amp; Stitching
          </h1>
          <p className="font-body-md text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
            Have your unstitched suits, festive formals, and bridal fabrics stitched by our master tailors. Every garment is cut to your exact measurements with premium inner lining and hand-finished hems.
          </p>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-3 p-3 rounded bg-surface-container-low border border-outline-variant/40">
              <span className="material-symbols-outlined text-primary text-[20px]">straighten</span>
              <span className="text-xs font-semibold text-on-surface">Exact Fit Guarantee</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded bg-surface-container-low border border-outline-variant/40">
              <span className="material-symbols-outlined text-primary text-[20px]">handyman</span>
              <span className="text-xs font-semibold text-on-surface">Master Tailors</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded bg-surface-container-low border border-outline-variant/40">
              <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
              <span className="text-xs font-semibold text-on-surface">Free Alterations within 14 Days</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Bespoke Studio Grid */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        <form onSubmit={handleCommissionSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* LEFT COLUMN: Custom Tailoring Configurator (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col space-y-12">
            {/* STEP 1: Choose Silhouette */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-sm bg-primary text-on-primary text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <h3 className="font-headline-sm text-xl text-on-surface">Select Silhouette / Garment Cut</h3>
                </div>
                <span className="text-xs text-on-surface-variant font-label-sm uppercase">Required</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TAILORING_SILHOUETTES.map((s) => {
                  const isSelected = selectedSilhouette === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedSilhouette(s.id)}
                      className={`p-4 rounded border transition-all cursor-pointer flex gap-4 ${
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-outline-variant/40 bg-surface-container-lowest hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-16 h-20 object-cover rounded-sm bg-surface-container shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-headline-sm text-sm font-semibold text-on-surface">
                              {s.name}
                            </h4>
                            {isSelected && (
                              <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                            )}
                          </div>
                          <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">
                            {s.subtitle}
                          </p>
                        </div>
                        <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-outline-variant/20">
                          <span className="font-label-md text-xs font-semibold text-primary">
                            Base: {BRAND.currencySymbol} {s.basePrice.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-on-surface-variant font-label-sm">
                            {s.turnaround}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Fabric & Sourcing Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-sm bg-primary text-on-primary text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <h3 className="font-headline-sm text-xl text-on-surface">Fabric Provision &amp; Inner Lining</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setFabricSource('patron-sent')}
                  className={`p-5 rounded border cursor-pointer transition-all ${
                    fabricSource === 'patron-sent'
                      ? 'border-primary bg-primary/5'
                      : 'border-outline-variant/40 bg-surface-container-lowest hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-sm font-semibold text-on-surface">
                      I will send my own Fabric
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                      Included
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    Ship your unstitched fabric (Lawn, Chiffon, Brocade, Silk) to our Lahore or Karachi studio. Free courier pickup available in Lahore &amp; Karachi.
                  </p>
                </div>

                <div
                  onClick={() => setFabricSource('atelier-silk')}
                  className={`p-5 rounded border cursor-pointer transition-all ${
                    fabricSource === 'atelier-silk'
                      ? 'border-primary bg-primary/5'
                      : 'border-outline-variant/40 bg-surface-container-lowest hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-sm font-semibold text-on-surface">
                      Atelier Premium Silk &amp; Lining
                    </span>
                    <span className="text-xs font-semibold text-primary">
                      +{BRAND.currencySymbol} 14,000
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    We provide pure 80g handspun raw silk base with pure habotai silk lining and matching organza accents.
                  </p>
                </div>
              </div>
            </div>
            {/* STEP 3: Neckline, Sleeves & Trouser Cut */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-sm bg-primary text-on-primary text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  <h3 className="font-headline-sm text-xl text-on-surface">Design Customizations</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Neckline */}
                <div className="space-y-2">
                  <label className="text-xs font-label-sm uppercase tracking-wider text-on-surface font-semibold block">
                    Neckline Finish
                  </label>
                  <select
                    value={selectedNeckline}
                    onChange={(e) => setSelectedNeckline(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/50 text-xs p-3 rounded focus:outline-none focus:border-primary"
                  >
                    {NECKLINE_OPTIONS.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.name} {n.extra > 0 ? `(+₨ ${n.extra})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sleeves */}
                <div className="space-y-2">
                  <label className="text-xs font-label-sm uppercase tracking-wider text-on-surface font-semibold block">
                    Sleeve Style
                  </label>
                  <select
                    value={selectedSleeve}
                    onChange={(e) => setSelectedSleeve(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/50 text-xs p-3 rounded focus:outline-none focus:border-primary"
                  >
                    {SLEEVE_OPTIONS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} {s.extra > 0 ? `(+₨ ${s.extra})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Trouser */}
                <div className="space-y-2">
                  <label className="text-xs font-label-sm uppercase tracking-wider text-on-surface font-semibold block">
                    Bottom / Shalwar Style
                  </label>
                  <select
                    value={selectedTrouser}
                    onChange={(e) => setSelectedTrouser(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/50 text-xs p-3 rounded focus:outline-none focus:border-primary"
                  >
                    {TROUSER_OPTIONS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} {t.extra > 0 ? `(+₨ ${t.extra})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* STEP 4: Body Measurements */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-sm bg-primary text-on-primary text-xs flex items-center justify-center font-bold">
                    4
                  </span>
                  <h3 className="font-headline-sm text-xl text-on-surface">Digital Measurements &amp; Fitting</h3>
                </div>

                <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded border border-outline-variant/30">
                  <button
                    type="button"
                    onClick={() => setMeasurementType('custom-inches')}
                    className={`px-3 py-1 text-xs font-label-sm uppercase rounded-sm transition-colors ${
                      measurementType === 'custom-inches' ? 'bg-primary text-on-primary font-semibold' : 'text-on-surface-variant'
                    }`}
                  >
                    Custom Inches
                  </button>
                  <button
                    type="button"
                    onClick={() => setMeasurementType('standard')}
                    className={`px-3 py-1 text-xs font-label-sm uppercase rounded-sm transition-colors ${
                      measurementType === 'standard' ? 'bg-primary text-on-primary font-semibold' : 'text-on-surface-variant'
                    }`}
                  >
                    Standard Size
                  </button>
                </div>
              </div>

              {measurementType === 'custom-inches' ? (
                <div className="p-6 rounded bg-surface-container-lowest border border-outline-variant/40 space-y-4">
                  <p className="text-xs text-on-surface-variant">
                    Enter your dimensions in inches. Our tailoring studio allows a +/- 0.5-inch comfort ease adjustment.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { key: 'kameezLength', label: 'Kameez Length (in)' },
                      { key: 'chest', label: 'Bust / Chest (in)' },
                      { key: 'waist', label: 'Waist (in)' },
                      { key: 'hip', label: 'Hips (in)' },
                      { key: 'shoulder', label: 'Shoulder / Teera (in)' },
                      { key: 'sleevesLength', label: 'Sleeves Length (in)' },
                      { key: 'armhole', label: 'Armhole / Mudha (in)' },
                      { key: 'trouserLength', label: 'Bottom Length (in)' },
                      { key: 'bottomOpening', label: 'Panchey / Opening (in)' },
                    ].map((field) => (
                      <div key={field.key} className="space-y-1">
                        <label className="text-[11px] font-label-sm text-on-surface font-semibold block">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          value={measurements[field.key]}
                          onChange={(e) =>
                            setMeasurements({ ...measurements, [field.key]: e.target.value })
                          }
                          className="w-full bg-surface-container-low border border-outline-variant/60 rounded px-3 py-2 text-xs font-medium text-on-surface focus:outline-none focus:border-primary"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <label className="text-[11px] font-label-sm text-on-surface font-semibold block mb-1">
                      Special Design Instructions or Modesty Notes (Optional)
                    </label>
                    <textarea
                      rows="2"
                      value={measurements.specialNotes}
                      onChange={(e) => setMeasurements({ ...measurements, specialNotes: e.target.value })}
                      placeholder="e.g. Keep neckline deep 7 inches, extra 2 inches margin inside seams, high daman slits..."
                      className="w-full bg-surface-container-low border border-outline-variant/60 rounded p-3 text-xs text-on-surface focus:outline-none focus:border-primary"
                    ></textarea>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded bg-surface-container-lowest border border-outline-variant/40 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-label-sm text-on-surface font-semibold block">
                        Select Standard Sizing
                      </label>
                      <select
                        value={standardSize}
                        onChange={(e) => setStandardSize(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant/60 rounded p-2.5 text-xs text-on-surface"
                      >
                        <option value="Extra Small (XS)">Extra Small (XS - Chest 34)</option>
                        <option value="Small (S)">Small (S - Chest 36)</option>
                        <option value="Medium (M)">Medium (M - Chest 38-40)</option>
                        <option value="Large (L)">Large (L - Chest 42)</option>
                        <option value="Extra Large (XL)">Extra Large (XL - Chest 45)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-label-sm text-on-surface font-semibold block">
                        Your Height (For Proportional Drapery)
                      </label>
                      <input
                        type="text"
                        value={patronHeight}
                        onChange={(e) => setPatronHeight(e.target.value)}
                        placeholder="e.g. 5 ft 5 in"
                        className="w-full bg-surface-container-low border border-outline-variant/60 rounded p-2.5 text-xs text-on-surface"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Live Bespoke Order Summary (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-surface-container-lowest rounded border border-outline-variant/40 p-6 sm:p-8 space-y-6">
              <div>
                <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary font-semibold">
                  Atelier Commission Docket
                </span>
                <h3 className="font-headline-sm text-xl text-on-surface mt-1">
                  Tailoring Summary
                </h3>
              </div>

              {/* Garment Preview Thumbnail */}
              <div className="flex gap-4 p-3 rounded bg-surface-container-low border border-outline-variant/30">
                <img
                  src={silhouetteObj.image}
                  alt={silhouetteObj.name}
                  className="w-16 h-20 object-cover rounded-sm bg-surface-container shrink-0"
                />
                <div>
                  <h4 className="font-headline-sm text-sm font-semibold text-on-surface">
                    {silhouetteObj.name}
                  </h4>
                  <span className="text-[11px] text-tertiary block font-semibold mt-0.5">
                    {silhouetteObj.turnaround}
                  </span>
                  <span className="text-[11px] text-on-surface-variant block mt-1">
                    {fabricSource === 'atelier-silk' ? 'Pure Silk & Lining Included' : 'Customer Provided Fabric'}
                  </span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs border-t border-outline-variant/30 pt-4">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Base Stitching:</span>
                  <span className="font-semibold text-on-surface font-label-md">
                    {BRAND.currencySymbol} {silhouetteObj.basePrice.toLocaleString()}
                  </span>
                </div>

                {necklineObj.extra > 0 && (
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">{necklineObj.name}:</span>
                    <span className="font-semibold text-on-surface font-label-md">
                      +{BRAND.currencySymbol} {necklineObj.extra.toLocaleString()}
                    </span>
                  </div>
                )}

                {sleeveObj.extra > 0 && (
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">{sleeveObj.name}:</span>
                    <span className="font-semibold text-on-surface font-label-md">
                      +{BRAND.currencySymbol} {sleeveObj.extra.toLocaleString()}
                    </span>
                  </div>
                )}

                {trouserObj.extra > 0 && (
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">{trouserObj.name}:</span>
                    <span className="font-semibold text-on-surface font-label-md">
                      +{BRAND.currencySymbol} {trouserObj.extra.toLocaleString()}
                    </span>
                  </div>
                )}

                {fabricAddon > 0 && (
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Pure Silk Fabric:</span>
                    <span className="font-semibold text-on-surface font-label-md">
                      +{BRAND.currencySymbol} {fabricAddon.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-emerald-700 font-medium pt-1">
                  <span>Nationwide Courier Pickup &amp; Delivery:</span>
                  <span>Free</span>
                </div>

                <div className="border-t border-outline-variant/30 pt-3 flex items-baseline justify-between">
                  <span className="font-headline-sm text-base text-on-surface font-semibold">
                    Total:
                  </span>
                  <span className="font-headline-sm text-2xl font-bold text-primary">
                    {BRAND.currencySymbol} {totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-primary text-on-primary font-label-lg text-xs uppercase tracking-widest rounded hover:bg-primary-container transition-all flex items-center justify-center gap-2 group active:scale-98 font-semibold"
              >
                <span>Add to Bag &amp; Order</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>

              {commissionSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-xs text-center font-medium animate-fadeIn">
                  Order added to bag! Redirecting to Order Tracker...
                </div>
              )}

              {/* Guarantees */}
              <div className="pt-2 border-t border-outline-variant/30 space-y-2 text-[11px] text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[15px]">verified</span>
                  <span>Free alterations within 14 days of delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[15px]">home</span>
                  <span>Doorstep pickup in Lahore, Karachi &amp; Islamabad</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
