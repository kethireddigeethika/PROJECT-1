/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2, Tag, Check, Award, Truck, ShieldAlert } from 'lucide-react';
import { CartItem } from '../types';
import { SPECIAL_OFFERS } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  showToast,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number; type: string } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'success'>('details');
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');

  // Customer checkout Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      let basePrice = item.product.price;
      if (item.size === 'large') basePrice += 1.50;
      if (item.extraWhippedCream) basePrice += 0.50;
      return acc + basePrice * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();

  // Handle promo code application
  const applyPromoCode = () => {
    const trimmed = promoCode.trim().toUpperCase();
    if (!trimmed) return;

    const offer = SPECIAL_OFFERS.find(o => o.code === trimmed);
    if (!offer) {
      showToast('Invalid promo code. Try SWEETWEEKEND or BOGOVELVET!', 'error');
      return;
    }

    if (trimmed === 'BOGOVELVET') {
      // Free second shake if we have at least 2 shakes in the cart
      const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      if (totalQty < 2) {
        showToast('BOGOVELVET requires at least 2 thickshakes in the cart.', 'info');
        return;
      }
      // Calculate cheapest shake price to discount
      const prices = cartItems.map(item => item.product.price);
      const minPrice = Math.min(...prices);
      setAppliedPromo({
        code: 'BOGOVELVET',
        discount: minPrice,
        type: 'Free Thickshake Applied',
      });
      showToast('BOGOVELVET code applied successfully!', 'success');
    } else if (trimmed === 'SWEETWEEKEND') {
      const discountVal = subtotal * 0.20;
      setAppliedPromo({
        code: 'SWEETWEEKEND',
        discount: discountVal,
        type: '20% Weekend Discount',
      });
      showToast('SWEETWEEKEND 20% discount applied!', 'success');
    } else {
      showToast('This special offer does not require manual checkout activation here!', 'info');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    showToast('Promo code removed.', 'info');
  };

  const salesTax = subtotal * 0.0825; // 8.25% SF food tax
  const deliveryFee = deliveryMethod === 'delivery' ? 4.99 : 0;
  const discount = appliedPromo ? appliedPromo.discount : 0;
  const grandTotal = Math.max(0, subtotal + salesTax + deliveryFee - discount);

  const triggerCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Your cart is empty!', 'error');
      return;
    }
    setIsCheckingOut(true);
    setCheckoutStep('details');
  };

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || (deliveryMethod === 'delivery' && !address)) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }
    setCheckoutStep('success');
    showToast('Order placed successfully! Preparing your shakes.', 'success');
  };

  const finalizeOrderClose = () => {
    onClearCart();
    setAppliedPromo(null);
    setPromoCode('');
    setIsCheckingOut(false);
    setCheckoutStep('details');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay background blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 cursor-pointer"
            onClick={() => {
              if (!isCheckingOut || checkoutStep !== 'success') onClose();
            }}
            id="cart-overlay"
          />

          {/* Cart Sidebar panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 max-w-lg w-full bg-brand-cream border-l border-brand-brown/10 shadow-brand-touch z-50 flex flex-col h-full"
            id="cart-drawer-panel"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-brand-brown/10 flex items-center justify-between bg-brand-brown text-brand-cream">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-gold animate-bounce" />
                <h2 className="font-serif text-xl font-semibold tracking-wide">
                  {isCheckingOut ? 'Boutique Check-out' : 'Your Velvet Cart'}
                </h2>
                <span className="bg-brand-gold text-brand-brown text-xs font-bold px-2.5 py-0.5 rounded-full" id="cart-count">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-brand-cream/80 hover:text-brand-cream hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
                aria-label="Close cart"
                id="close-cart-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {/* CHECKOUT SUCCESS STATE */}
              {isCheckingOut && checkoutStep === 'success' ? (
                <div className="text-center py-8 space-y-6 flex flex-col items-center justify-center h-full" id="checkout-success-view">
                  <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold animate-pulse border-2 border-brand-gold">
                    <Award className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-brand-brown">Indulgence Confirmed</h3>
                    <p className="text-sm text-brand-brown/70 max-w-sm mx-auto">
                      Your order has been transmitted straight to our boutique shake specialists. Prepare to redefine your sweet tooth!
                    </p>
                  </div>

                  {/* Simulated Receipt details */}
                  <div className="bg-white/90 backdrop-blur-xs rounded-[22px] p-5 border border-brand-brown/10 w-full text-left font-mono text-xs space-y-3 shadow-brand-soft">
                    <div className="text-center font-bold font-sans text-brand-brown text-sm border-b border-dashed border-gray-200 pb-2">
                      ORDER RECEIPT #TS-{Math.floor(1000 + Math.random() * 9000)}
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Date:</span>
                      <span>June 10, 2026</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Delivery Type:</span>
                      <span className="uppercase text-brand-brown font-bold">{deliveryMethod}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Customer:</span>
                      <span>{name}</span>
                    </div>
                    <div className="border-b border-dashed border-gray-200 my-2"></div>
                    <div className="space-y-1.5">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-gray-700">
                          <span>
                            {item.quantity}x {item.product.name} ({item.size})
                          </span>
                          <span>${((item.product.price + (item.size === 'large' ? 1.5 : 0) + (item.extraWhippedCream ? 0.5 : 0)) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-b border-dashed border-gray-200 my-2"></div>
                    <div className="flex justify-between font-sans font-bold">
                      <span>Promo Discount:</span>
                      <span className="text-brand-pink font-bold">-${discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-brand-brown pt-1 font-sans">
                      <span>Grand Total:</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                    <div className="border-b border-dashed border-gray-200 my-2"></div>
                    <div className="text-center text-xs text-brand-pink font-bold font-sans">
                      📟 Est. Pickup: 15-20 Minutes
                    </div>
                  </div>

                  <button
                    onClick={finalizeOrderClose}
                    className="w-full bg-[#4E342E] hover:bg-[#FF6F91] text-white font-bold py-3.5 px-6 rounded-full text-xs uppercase tracking-widest transition-all duration-300 shadow-brand-touch hover:shadow-brand-soft cursor-pointer text-center flex items-center justify-center font-sans mt-2"
                    id="success-done-btn"
                  >
                    Fantastic, I can't wait!
                  </button>
                </div>
              ) : isCheckingOut ? (
                /* CHECKOUT ENTRY STATE */
                <form onSubmit={submitOrder} className="space-y-5" id="checkout-form">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-brand-brown/10">
                    <span className="text-sm font-semibold text-brand-brown">Let's craft your delivery order</span>
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="text-xs text-brand-pink hover:text-brand-pink-dark font-semibold underline"
                    >
                      Back to Cart
                    </button>
                  </div>

                  {/* Fulfillment selector */}
                  <div className="grid grid-cols-2 gap-3" id="fulfillment-selector">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('pickup')}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-[22px] border text-sm transition-all cursor-pointer ${
                        deliveryMethod === 'pickup'
                          ? 'border-[#4E342E] bg-[#4E342E] text-[#FFF8E7] shadow-brand-soft'
                          : 'border-[#4E342E]/20 bg-white hover:border-[#4E342E]/40 text-[#4E342E]'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4 text-[#FFC857]" />
                      <span className="font-semibold font-sans">Boutique Pickup</span>
                      <span className="text-[10px] opacity-80 font-mono">Free (Ready in 15m)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('delivery')}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-[22px] border text-sm transition-all cursor-pointer ${
                        deliveryMethod === 'delivery'
                          ? 'border-[#4E342E] bg-[#4E342E] text-[#FFF8E7] shadow-brand-soft'
                          : 'border-[#4E342E]/20 bg-white hover:border-[#4E342E]/40 text-[#4E342E]'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-[#FF6F91]" />
                      <span className="font-semibold font-sans">Velvet Delivery</span>
                      <span className="text-[10px] opacity-80 font-mono">+$4.99 (Pouch)</span>
                    </button>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-3.5 font-sans">
                    <div>
                      <label className="block text-xs font-semibold text-brand-brown/80 mb-1" htmlFor="billing-name">Full Name *</label>
                      <input
                        id="billing-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rachel Green"
                        className="w-full bg-white border border-[#4E342E]/15 rounded-full px-5 py-2.5 text-xs text-brand-brown focus:outline-none focus:border-brand-brown"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-brown/80 mb-1" htmlFor="billing-phone">Mobile Phone *</label>
                      <input
                        id="billing-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +1 (555) 742-5373"
                        className="w-full bg-white border border-[#4E342E]/15 rounded-full px-5 py-2.5 text-xs text-brand-brown focus:outline-none"
                      />
                    </div>
                    {deliveryMethod === 'delivery' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="overflow-hidden"
                      >
                        <label className="block text-xs font-semibold text-brand-brown/80 mb-1" htmlFor="shipping-address">Delivery Address *</label>
                        <textarea
                          id="shipping-address"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="e.g. 52 Velvet Churn Blvd, SF, CA"
                          rows={2}
                          className="w-full bg-white border border-[#4E342E]/15 rounded-[22px] px-5 py-2.5 text-xs text-brand-brown focus:outline-none resize-none"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Summary recap */}
                  <div className="bg-brand-brown/5 rounded-[22px] p-4 space-y-2 text-xs text-brand-brown font-sans">
                    <div className="flex justify-between font-semibold">
                      <span>Order Items:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-brand-brown/75">
                      <span>Special Tax (8.25%):</span>
                      <span>${salesTax.toFixed(2)}</span>
                    </div>
                    {deliveryMethod === 'delivery' && (
                      <div className="flex justify-between text-[11px] text-brand-brown/75">
                        <span>Courier Fee:</span>
                        <span>+$4.99</span>
                      </div>
                    )}
                    {appliedPromo && (
                      <div className="flex justify-between text-[11px] text-brand-pink font-bold">
                        <span>Discount ({appliedPromo.code}):</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-brand-brown/15 pt-2 flex justify-between font-bold text-brand-brown text-sm">
                      <span>Grand Total:</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#4E342E] hover:bg-[#FF6F91] text-white font-bold py-3.5 px-6 rounded-full text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-brand-soft flex items-center justify-center gap-2 cursor-pointer font-sans"
                    id="submit-order-btn"
                  >
                    Confirm & Submit Order (${grandTotal.toFixed(2)})
                  </button>
                </form>
              ) : cartItems.length === 0 ? (
                /* EMPTY STATE */
                <div className="text-center py-16 space-y-4 flex flex-col items-center justify-center h-full" id="empty-cart-state">
                  <div className="w-16 h-16 bg-brand-brown/5 rounded-full flex items-center justify-center text-brand-brown/40">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-serif text-lg font-bold text-brand-brown">Your glass is empty!</p>
                    <p className="text-xs text-brand-brown/60 max-w-[240px] mx-auto">
                      Explore our handcrafted premium flavors and add thickshakes to start your order.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-xs font-semibold text-brand-pink hover:text-brand-pink-dark underline transition-all"
                    id="start-shopping-btn"
                  >
                    Start Exploring Menu
                  </button>
                </div>
              ) : (
                /* CART LIST STATE */
                <div className="space-y-4" id="cart-item-list">
                  {cartItems.map((item) => {
                    let price = item.product.price;
                    if (item.size === 'large') price += 1.50;
                    if (item.extraWhippedCream) price += 0.50;
                    const itemTotal = price * item.quantity;

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
                        className="bg-white/80 backdrop-blur-xs rounded-[22px] p-4 border border-brand-brown/10 flex gap-3 shadow-brand-soft"
                      >
                        {/* Thumbnail */}
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 rounded-[22px] object-cover flex-shrink-0 border border-brand-brown/5"
                          referrerPolicy="no-referrer"
                        />

                        {/* Details */}
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-1">
                              <h4 className="font-serif font-bold text-[14px] text-brand-brown leading-snug">
                                {item.product.name}
                              </h4>
                              <span className="font-mono text-xs font-bold text-brand-brown flex-shrink-0">
                                ${price.toFixed(2)}
                              </span>
                            </div>

                            {/* Applied custom preferences */}
                            <div className="flex flex-wrap gap-1 mt-1 text-[10px]">
                              <span className="bg-brand-brown/5 text-brand-brown px-2 py-0.5 rounded-full font-semibold capitalize">
                                {item.size} Size
                              </span>
                              {item.noSugar && (
                                <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
                                  No Sugar added
                                </span>
                              )}
                              {item.extraWhippedCream && (
                                <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full font-semibold">
                                  +Extra Whip
                                </span>
                              )}
                            </div>
                            
                            {item.customRequests && (
                              <p className="text-[10px] text-brand-brown/50 italic mt-1 line-clamp-1">
                                Note: "{item.customRequests}"
                              </p>
                            )}
                          </div>

                          {/* Control Footer */}
                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-brand-brown/5">
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-1.5 bg-brand-cream/50 rounded-lg p-0.5 border border-brand-brown/10">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="hover:bg-white text-brand-brown p-1 rounded-md transition-colors cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono font-bold text-xs text-brand-brown px-1.5 min-w-[14px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="hover:bg-white text-brand-brown p-1 rounded-md transition-colors cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Total and Trash */}
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-[13px] text-brand-brown">
                                ${itemTotal.toFixed(2)}
                              </span>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sticky Foot checkout logic if we're not in receipt state */}
            {cartItems.length > 0 && (!isCheckingOut || checkoutStep !== 'success') && (
              <div className="p-6 bg-white border-t border-brand-brown/10 space-y-4 shadow-brand-touch">
                {/* Promo Code Coupon Area */}
                {!isCheckingOut && (
                  <div className="flex gap-2">
                    <div className="relative flex-grow font-sans">
                      <Tag className="w-4 h-4 text-brand-brown/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="promo-input"
                        type="text"
                        placeholder="PROMO CODE"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full bg-[#FFF8E7]/50 border border-brand-brown/20 rounded-full pl-9 pr-3 py-2 text-xs font-mono tracking-wider focus:outline-none focus:border-brand-brown text-brand-brown uppercase"
                      />
                    </div>
                    {appliedPromo ? (
                      <button
                        onClick={handleRemovePromo}
                        className="bg-brand-pink/15 hover:bg-brand-pink/25 text-brand-pink px-4 py-2 rounded-full text-xs font-bold font-sans transition-all cursor-pointer"
                        id="remove-promo-btn"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={applyPromoCode}
                        className="bg-[#4E342E] hover:bg-[#FF6F91] text-white px-4 py-2 rounded-full text-xs font-bold font-sans transition-all cursor-pointer"
                        id="apply-promo-btn"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                )}

                {/* Promo Code confirmation badge */}
                {appliedPromo && (
                  <div className="bg-brand-pink-soft border border-brand-pink/20 rounded-xl p-2.5 flex items-center justify-between text-xs text-brand-pink font-semibold">
                    <div className="flex items-center gap-1.5ClassName">
                      <Award className="w-4 h-4 animate-bounce" />
                      <span>{appliedPromo.type} ({appliedPromo.code})</span>
                    </div>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                {/* Billing specs summary */}
                {!isCheckingOut && (
                  <div className="space-y-1.5 text-xs text-brand-brown/70 font-sans border-b border-brand-brown/10 pb-3">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-mono font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sales Tax (8.25%):</span>
                      <span className="font-mono">${salesTax.toFixed(2)}</span>
                    </div>
                    {appliedPromo && (
                      <div className="flex justify-between text-brand-pink font-semibold">
                        <span>Promo Code Discount:</span>
                        <span className="font-mono">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Main bottom checkout buttons */}
                {!isCheckingOut ? (
                  <div className="space-y-3 font-sans">
                    <div className="flex justify-between items-baseline font-sans">
                      <span className="font-serif text-base font-bold text-brand-brown">Estimated Total:</span>
                      <span className="font-mono text-xl font-black text-brand-brown" id="grand-total-display">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={triggerCheckout}
                      className="w-full bg-[#4E342E] hover:bg-[#FF6F91] text-white font-bold py-3.5 px-6 rounded-full text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-brand-soft flex items-center justify-center gap-2 cursor-pointer font-sans"
                      id="go-checkout-btn"
                    >
                      Proceed to Boutique Checkout
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
