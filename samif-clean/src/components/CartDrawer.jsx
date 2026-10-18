import React, { useState } from 'react';
import { BRAND } from '../data/boutiqueData';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onToggleStitching,
  onCheckoutSuccess,
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const stitchingPrice = item.includeStitching ? (item.customTailoringCost || 12500) : 0;
    return acc + (item.price + stitchingPrice) * item.quantity;
  }, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      if (onCheckoutSuccess) onCheckoutSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Slide-out drawer */}
      <div className="relative w-full max-w-md bg-surface-container-lowest h-full shadow-2xl flex flex-col z-10 border-l border-outline-variant/30">
        {/* Drawer Header */}
        <div className="p-6 border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[22px]">shopping_bag</span>
            <h2 className="font-headline-sm text-xl text-on-surface">Your Shopping Bag</h2>
            <span className="text-xs bg-surface-container px-2 py-0.5 rounded text-on-surface-variant font-medium">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Area */}
        {checkoutComplete ? (
          <div className="p-8 flex flex-col items-center justify-center text-center my-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <span className="font-label-sm uppercase tracking-widest text-primary font-semibold">
              Order Placed
            </span>
            <h3 className="font-headline-sm text-2xl text-on-surface">Thank You for Your Order</h3>
            <p className="font-body-sm text-on-surface-variant max-w-xs">
              Your order <span className="font-semibold text-primary">#SMF-98214</span> has been received. Our team will contact you via WhatsApp to confirm measurements and delivery.
            </p>
            <button
              onClick={() => {
                setCheckoutComplete(false);
                onClose();
              }}
              className="mt-4 px-6 py-3 bg-primary text-on-primary font-label-sm uppercase tracking-widest rounded-lg shadow-sm hover:bg-primary-container transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-on-surface-variant space-y-4">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline">
              <span className="material-symbols-outlined text-[32px]">local_mall</span>
            </div>
            <h3 className="font-headline-sm text-xl text-on-surface">Your Bag is Empty</h3>
            <p className="font-body-sm text-xs max-w-xs">
              Explore our festive collections, ready-to-wear pret, or order custom stitching.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-primary text-on-primary font-label-sm uppercase tracking-widest rounded-lg shadow-sm hover:bg-primary-container transition-colors"
            >
              Explore Collections
            </button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex gap-4 p-3.5 rounded-lg bg-surface-container-low/70 border border-outline-variant/30 relative"
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-20 h-24 object-cover rounded bg-surface-container"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-headline-sm text-sm text-on-surface font-semibold line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id, item.selectedSize)}
                          className="text-on-surface-variant hover:text-error transition-colors"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">
                        Size: <span className="font-semibold text-primary">{item.selectedSize || 'Standard S'}</span>
                      </p>
                      <p className="font-label-md text-xs font-semibold text-primary mt-1">
                        {BRAND.currencySymbol} {item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Custom Tailoring Addon Toggle */}
                    <div className="mt-2 pt-2 border-t border-outline-variant/20 flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer text-xs">
                        <input
                          type="checkbox"
                          checked={item.includeStitching || false}
                          onChange={() => onToggleStitching(item.id, item.selectedSize)}
                          className="accent-primary w-3.5 h-3.5 rounded"
                        />
                        <span className="text-[11px] text-on-surface font-medium">
                          Custom Stitching (+{BRAND.currencySymbol} {(item.customTailoringCost || 12500).toLocaleString()})
                        </span>
                      </label>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Qty:</span>
                      <div className="flex items-center border border-outline-variant rounded bg-surface-container-lowest">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs hover:bg-surface-container"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs hover:bg-surface-container"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer & Checkout */}
            <div className="p-6 border-t border-surface-container bg-surface-container-lowest space-y-3">
              <div className="flex justify-between items-center text-sm font-body-sm">
                <span className="text-on-surface-variant">Subtotal:</span>
                <span className="font-semibold text-on-surface font-label-md">
                  {BRAND.currencySymbol} {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-on-surface-variant">
                <span>Nationwide Delivery (Pakistan):</span>
                <span className="text-tertiary font-semibold uppercase">Free</span>
              </div>

              <div className="pt-2 border-t border-outline-variant/30 flex justify-between items-baseline">
                <span className="font-headline-sm text-base text-on-surface">Total:</span>
                <span className="font-headline-sm text-xl text-primary font-bold">
                  {BRAND.currencySymbol} {subtotal.toLocaleString()}
                </span>
              </div>

              <button
                disabled={isCheckingOut}
                onClick={handleCheckout}
                className="w-full py-3.5 bg-primary text-on-primary font-label-sm uppercase tracking-widest rounded-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-on-surface-variant">
                <span className="material-symbols-outlined text-[14px] text-tertiary">lock</span>
                <span>Cash on Delivery / Direct Bank Transfer</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
