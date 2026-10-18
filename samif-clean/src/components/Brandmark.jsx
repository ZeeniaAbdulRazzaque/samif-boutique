import React from 'react';

export default function Brandmark({ variant = "standard", className = "" }) {
  if (variant === "compact") {
    return (
      <div className={`flex flex-col text-left select-none ${className}`}>
        <span className="font-['Playfair_Display',serif] text-xl font-bold tracking-[0.14em] text-primary uppercase leading-none">
          SAMIF
        </span>
        <span className="font-['Playfair_Display',serif] text-[7.5px] font-semibold text-[#826a2b] tracking-[0.22em] uppercase leading-[1.3] mt-1">
          LUXURY FASHION &amp;
          <br />
          CUSTOM STITCHING
        </span>
      </div>
    );
  }

  if (variant === "monogram") {
    return (
      <div className={`flex flex-col items-center justify-center p-6 border border-tertiary-fixed/40 bg-surface-container rounded-lg ${className}`}>
        <span className="font-['Playfair_Display',serif] text-3xl font-bold text-primary uppercase tracking-[0.14em]">
          SAMIF
        </span>
        <span className="font-['Playfair_Display',serif] text-[9px] font-semibold text-[#826a2b] tracking-[0.22em] uppercase text-center leading-[1.35] mt-1.5">
          LUXURY FASHION &amp;
          <br />
          CUSTOM STITCHING
        </span>
      </div>
    );
  }

  // Standard Header Brandmark - matches reference image
  return (
    <div className={`flex flex-col text-left select-none group cursor-pointer ${className}`}>
      <span className="font-['Playfair_Display',serif] text-[26px] sm:text-[28px] font-bold tracking-[0.14em] text-primary uppercase leading-none transition-opacity group-hover:opacity-90">
        SAMIF
      </span>
      <span className="font-['Playfair_Display',serif] text-[8px] sm:text-[8.5px] font-semibold text-[#826a2b] tracking-[0.22em] uppercase leading-[1.3] mt-1">
        LUXURY FASHION &amp;
        <br />
        CUSTOM STITCHING
      </span>
    </div>
  );
}
