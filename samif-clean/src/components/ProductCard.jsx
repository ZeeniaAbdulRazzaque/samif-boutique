import React, { useState } from 'react';
import { BRAND } from '../data/boutiqueData';

export default function ProductCard({
  product,
  onSelectProduct,
  onAddToCart,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const mainImage = product.images[0];
  const hoverImage = product.images.length > 1 ? product.images[1] : mainImage;

  return (
    <article
      className="group relative flex flex-col bg-surface-container-lowest rounded border border-outline-variant/40 hover:border-tertiary transition-colors duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Canvas (3:4 aspect ratio) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container-low cursor-pointer rounded-t">
        <img
          src={isHovered ? hoverImage : mainImage}
          alt={product.title}
          onClick={() => onSelectProduct(product)}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-sm bg-primary text-on-primary font-label-sm text-[9px] uppercase tracking-wider font-semibold border border-tertiary-fixed/30">
              {product.badge}
            </span>
          )}
          {product.tag && (
            <span className="px-2 py-0.5 rounded-sm bg-surface-container-lowest text-on-surface font-label-sm text-[9px] uppercase tracking-wider border border-outline-variant/40 font-medium">
              {product.tag}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          aria-label="Save to Wishlist"
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-sm bg-surface-container-lowest/90 border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors z-10"
        >
          <span
            className={`material-symbols-outlined text-[16px] transition-colors ${
              isWishlisted ? 'text-primary fill-1' : ''
            }`}
          >
            favorite
          </span>
        </button>

        {/* Quick Action Overlay Bar */}
        <div className="absolute inset-x-0 bottom-0 p-2 bg-surface-container-lowest/95 border-t border-outline-variant/40 flex items-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="flex-1 py-2 px-2.5 bg-primary text-on-primary font-label-sm text-[9px] uppercase tracking-widest font-semibold rounded-sm hover:bg-primary-container transition-colors flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
            Quick Bag
          </button>
          <button
            onClick={() => onSelectProduct(product)}
            className="py-2 px-3 bg-surface-container-low text-on-surface font-label-sm text-[9px] uppercase tracking-widest rounded-sm hover:bg-surface-container transition-colors"
          >
            Details
          </button>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-tertiary">
            <span className="font-label-sm text-[9px] uppercase tracking-[0.16em] font-semibold">
              {product.collection}
            </span>
            <span className="text-[11px] font-medium flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[12px] fill-1 text-tertiary">star</span>
              {product.rating}
            </span>
          </div>

          <h3
            onClick={() => onSelectProduct(product)}
            className="font-headline-sm text-base text-on-surface hover:text-primary transition-colors cursor-pointer mt-1 line-clamp-1 font-semibold"
          >
            {product.title}
          </h3>

          <p className="font-body-sm text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">
            {product.fabric} • {product.color}
          </p>
        </div>

        <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-label-lg text-sm font-semibold text-primary">
              {BRAND.currencySymbol} {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="font-label-sm text-[10px] text-on-surface-variant/70 line-through">
                {BRAND.currencySymbol} {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <span className="font-label-sm text-[9px] uppercase tracking-wider text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-sm">
            {product.sizes[0] || 'XS'} - {product.sizes[product.sizes.length - 2] || 'XL'}
          </span>
        </div>
      </div>
    </article>
  );
}
