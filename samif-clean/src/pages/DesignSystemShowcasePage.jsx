import React, { useState } from 'react';
import Brandmark from '../components/Brandmark';
import { BRAND } from '../data/boutiqueData';

export default function DesignSystemShowcasePage({ setActivePage }) {
  const [copiedToken, setCopiedToken] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  const colorTokens = [
    { name: 'Primary Burgundy', hex: '#5b0617', tailwind: 'bg-primary text-on-primary', usage: 'CTAs, Key Titles, Hero Accents' },
    { name: 'Primary Container', hex: '#7a1f2b', tailwind: 'bg-primary-container text-on-primary', usage: 'Button base, Elevated states' },
    { name: 'Secondary Dusty Wine', hex: '#7b535c', tailwind: 'bg-secondary text-on-secondary', usage: 'Supporting tags, Accents' },
    { name: 'Secondary Container', hex: '#fecad4', tailwind: 'bg-secondary-container text-on-secondary-container', usage: 'Subtle ambient glows' },
    { name: 'Tertiary Champagne Gold', hex: '#735c00', tailwind: 'bg-tertiary text-on-tertiary', usage: 'Prestige hairline rules, Star ratings' },
    { name: 'Tertiary Fixed (Metallic)', hex: '#ffe088', tailwind: 'bg-tertiary-fixed text-on-tertiary-fixed', usage: 'Glow rings, Active badges' },
    { name: 'Surface Canvas', hex: '#fcf9f8', tailwind: 'bg-surface text-on-surface', usage: 'Parchment background' },
    { name: 'Surface Container Low', hex: '#f6f3f2', tailwind: 'bg-surface-container-low text-on-surface', usage: 'Editorial section backgrounds' },
    { name: 'Surface Container Lowest', hex: '#ffffff', tailwind: 'bg-surface-container-lowest text-on-surface', usage: 'Elevated Cards & Sheets' },
    { name: 'On-Surface Charcoal', hex: '#1b1b1b', tailwind: 'bg-on-surface text-surface', usage: 'High-contrast typography' },
  ];

  return (
    <div className="w-full bg-surface pb-24">
      {/* Top Copied Toast Notice */}
      {copiedToken && (
        <div className="fixed top-24 right-6 z-50 bg-inverse-surface text-inverse-on-surface text-xs font-label-sm uppercase tracking-wider px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 animate-fadeIn">
          <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">check_circle</span>
          <span>Copied {copiedToken} to clipboard</span>
        </div>
      )}

      {/* Top Navigation Breadcrumb */}
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
            <span className="text-primary font-semibold">Samif Design System</span>
          </nav>
        </div>
      </section>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 sm:pt-12">
        <div className="max-w-3xl">
          <span className="font-label-md text-label-md uppercase tracking-[0.2em] text-primary font-semibold">
            Atelier Specifications
          </span>
          <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl text-on-surface mt-2 leading-tight">
            Design Tokens &amp; Component System
          </h1>
          <p className="font-body-md text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
            The Haute Couture Editorial design system balances warm neoclassical luxury with modern digital precision. Inspired by luxury fashion lookbooks, architectural drapery, and high-jewelry monographs.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 space-y-16">
        {/* SECTION 1: Brandmark Variations */}
        <div className="space-y-6">
          <div className="pb-3 border-b border-outline-variant/30">
            <h2 className="font-headline-sm text-2xl text-on-surface">1. Brand Identity Variations</h2>
            <p className="font-body-sm text-xs text-on-surface-variant mt-1">
              Crafted with Playfair Display and Montserrat typography with gold thread accents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 flex flex-col items-center justify-center text-center shadow-sm">
              <Brandmark />
              <span className="text-[10px] font-label-sm uppercase tracking-wider text-on-surface-variant mt-6">
                Standard Header Brandmark
              </span>
            </div>

            <div className="p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 flex flex-col items-center justify-center text-center shadow-sm">
              <Brandmark variant="compact" />
              <span className="text-[10px] font-label-sm uppercase tracking-wider text-on-surface-variant mt-6">
                Compact / Footer Brandmark
              </span>
            </div>

            <div className="p-8 rounded-2xl bg-primary text-on-primary flex flex-col items-center justify-center text-center shadow-lg">
              <div className="w-14 h-14 rounded-full bg-surface-container-lowest text-primary font-display-lg text-2xl flex items-center justify-center font-bold shadow-md">
                S
              </div>
              <span className="font-headline-sm uppercase tracking-[0.25em] text-lg mt-3 text-white">
                SAMIF
              </span>
              <span className="text-[9px] font-label-sm uppercase tracking-widest text-tertiary-fixed mt-1">
                Monogram Insignia
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 2: Color Palette Tokens */}
        <div className="space-y-6">
          <div className="pb-3 border-b border-outline-variant/30 flex justify-between items-end">
            <div>
              <h2 className="font-headline-sm text-2xl text-on-surface">2. Harmonic Color Spectrum</h2>
              <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                Click any token swatch to copy hex code to clipboard.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {colorTokens.map((t) => (
              <div
                key={t.name}
                onClick={() => copyToClipboard(t.hex)}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 overflow-hidden shadow-xs cursor-pointer hover:-translate-y-1 transition-all group"
              >
                <div
                  className={`h-24 w-full flex items-center justify-center font-bold text-xs ${t.tailwind}`}
                  style={{ backgroundColor: t.hex }}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 px-2 py-1 rounded text-white text-[10px] uppercase font-label-sm">
                    Copy Hex
                  </span>
                </div>
                <div className="p-3 space-y-1">
                  <span className="font-headline-sm text-xs font-semibold text-on-surface block">
                    {t.name}
                  </span>
                  <div className="flex justify-between items-center text-[11px] text-on-surface-variant">
                    <span className="font-mono font-semibold text-primary">{t.hex}</span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant/80 block line-clamp-1">
                    {t.usage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: Typography System */}
        <div className="space-y-6">
          <div className="pb-3 border-b border-outline-variant/30">
            <h2 className="font-headline-sm text-2xl text-on-surface">3. Typography Hierarchy</h2>
            <p className="font-body-sm text-xs text-on-surface-variant mt-1">
              Playfair Display (Editorial High-Fashion Serif) &amp; Montserrat (Architectural Modern Sans).
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm space-y-8">
            <div className="space-y-1">
              <span className="text-[10px] font-label-sm uppercase tracking-wider text-tertiary font-semibold">
                font-display-lg • 56px / 64px • Playfair Display
              </span>
              <p className="font-display-lg text-4xl sm:text-5xl text-on-surface">
                Haute Couture Drapery
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-label-sm uppercase tracking-wider text-tertiary font-semibold">
                font-headline-xl • 40px / 48px • Playfair Display
              </span>
              <p className="font-headline-xl text-2xl sm:text-3xl text-on-surface">
                Gul-e-Noor Velvet Royal Ensemble
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-label-sm uppercase tracking-wider text-tertiary font-semibold">
                font-headline-sm • 20px / 28px • Playfair Display Semi-Bold
              </span>
              <p className="font-headline-sm text-xl text-primary">
                Precision Hand Zardozi Needlework
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-label-sm uppercase tracking-wider text-tertiary font-semibold">
                font-body-lg • 17px / 28px • Montserrat Regular
              </span>
              <p className="font-body-lg text-base text-on-surface-variant max-w-2xl leading-relaxed">
                Every panel is cut along true warp threads, eliminating bias twist and securing regal stance across Pakistani festive and bridal soirees.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-label-sm uppercase tracking-wider text-tertiary font-semibold">
                font-label-lg • 13px / 18px • Montserrat Semi-Bold Uppercase Tracking 0.12em
              </span>
              <p className="font-label-lg text-xs uppercase tracking-widest text-primary font-bold">
                COMMISSION BESPOKE ATELIER FITTING
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: Reusable Interactive Components */}
        <div className="space-y-6">
          <div className="pb-3 border-b border-outline-variant/30">
            <h2 className="font-headline-sm text-2xl text-on-surface">4. Button &amp; Badge Archetypes</h2>
            <p className="font-body-sm text-xs text-on-surface-variant mt-1">
              Couture interaction states designed for tactile feedback.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm space-y-8">
            {/* Buttons */}
            <div>
              <span className="text-xs font-label-sm uppercase tracking-wider text-on-surface font-semibold block mb-3">
                Buttons
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <button className="px-6 py-3 bg-primary text-on-primary font-label-sm uppercase tracking-widest rounded-lg shadow-sm hover:bg-primary-container transition-colors">
                  Primary Burgundy
                </button>
                <button className="px-6 py-3 bg-primary-container text-on-primary font-label-sm uppercase tracking-widest rounded-lg border border-tertiary-fixed shadow-sm hover:bg-primary transition-colors">
                  Atelier Appointment
                </button>
                <button className="px-6 py-3 bg-transparent border border-outline text-on-surface font-label-sm uppercase tracking-widest rounded-lg hover:bg-surface-container transition-colors">
                  Outline Secondary
                </button>
                <button className="px-6 py-3 bg-surface-container-low text-on-surface font-label-sm uppercase tracking-widest rounded-lg hover:bg-surface-container transition-colors">
                  Surface Ghost
                </button>
              </div>
            </div>

            {/* Badges */}
            <div>
              <span className="text-xs font-label-sm uppercase tracking-wider text-on-surface font-semibold block mb-3">
                Badges &amp; Chips
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded bg-primary text-on-primary font-label-sm text-[10px] uppercase tracking-wider shadow-xs">
                  Hand Zardozi
                </span>
                <span className="px-3 py-1 rounded bg-tertiary text-on-tertiary font-label-sm text-[10px] uppercase tracking-wider shadow-xs">
                  100% Pure Velvet 9000
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-label-sm text-[10px] uppercase tracking-wider font-semibold">
                  Ready to Dispatch
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-[10px] uppercase tracking-wider border border-outline-variant/40">
                  XS • S • M • L • Bespoke
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
