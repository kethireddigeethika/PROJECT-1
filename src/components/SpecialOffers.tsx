/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Tag, AlarmClock, Clipboard, ClipboardCheck, Sparkles } from 'lucide-react';
import { SPECIAL_OFFERS } from '../data';

interface SpecialOffersProps {
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  onApplyPromoCodeInCart: (code: string) => void;
}

export default function SpecialOffers({ showToast, onApplyPromoCodeInCart }: SpecialOffersProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Creative Countdown timer (ticking hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = (e: React.MouseEvent, code: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Code "${code}" copied to clipboard! Paste it at checkout.`, 'success');
    
    // Automatically pre-load code context in cart
    onApplyPromoCodeInCart(code);

    setTimeout(() => {
      setCopiedCode(null);
    }, 3000);
  };

  return (
    <section id="offers" className="py-20 lg:py-28 bg-white overflow-hidden relative">
      {/* Decorative colored spots */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-brand-pink/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-brand-brown/10">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-black uppercase text-brand-pink tracking-widest block flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-brand-pink" />
              EXCLUSIVE CAMPAIGNS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black text-brand-brown tracking-tight leading-tight">
              Boutique Special Offers
            </h2>
            <p className="text-xs text-brand-brown/70 leading-relaxed font-sans">
              Enjoy custom, limited-edition savings when order through our interactive digital store. Click any promo coupon code to instantly copy and apply.
            </p>
          </div>

          {/* TIMER EMBED */}
          <div className="bg-white/40 border border-[#4E342E]/10 rounded-full p-2 pl-3.5 pr-5 flex items-center gap-3.5 shrink-0 shadow-xs backdrop-blur-xs">
            <div className="p-2 bg-brand-brown text-white rounded-full">
              <AlarmClock className="w-4 h-4 animate-pulse text-[#FFC857]" />
            </div>
            <div>
              <span className="text-[10px] text-brand-brown/60 uppercase font-black block font-sans">Anniversary discount ends in</span>
              <div className="font-mono text-xs font-bold text-brand-brown flex items-center gap-1.5 mt-0.5">
                <span>{timeLeft.hours.toString().padStart(2, '0')}h</span>
                <span className="animate-ping opacity-60">:</span>
                <span>{timeLeft.minutes.toString().padStart(2, '0')}m</span>
                <span className="animate-ping opacity-60">:</span>
                <span className="text-brand-pink">{timeLeft.seconds.toString().padStart(2, '0')}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* OFFERS BANNERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="special-promos-banners">
          {SPECIAL_OFFERS.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-[22px] p-6.5 md:p-8 text-white relative overflow-hidden bg-gradient-to-br ${offer.bgGradient} flex flex-col justify-between min-h-[220px] shadow-brand-soft`}
              id={`promo-card-${offer.id}`}
            >
              {/* Overlay graphics representation */}
              <div className="absolute right-0 top-0 w-36 h-36 bg-white/5 blur-2xl rounded-full" />
              <div className="absolute left-1/3 bottom-0 w-28 h-28 bg-[#FFC857]/5 blur-2xl rounded-full" />

              <div className="space-y-4">
                {/* Badge top */}
                <span className="bg-white/15 border border-white/20 text-white font-black text-[9px] tracking-widest px-3 py-1 rounded-full uppercase w-fit block flex items-center gap-1 font-sans">
                  <Sparkles className="w-3 h-3 text-brand-gold animate-spin" />
                  {offer.badge}
                </span>

                {/* Offer outline */}
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl md:text-3xl font-black tracking-tight">{offer.title}</h3>
                  <p className="text-xs text-brand-cream font-bold italic opacity-95">{offer.tagline}</p>
                </div>

                <p className="text-xs text-brand-cream/80 max-w-md leading-relaxed font-sans">
                  {offer.description}
                </p>
              </div>

              {/* Code Copier Drawer Footer */}
              {offer.code && (
                <div className="pt-6 border-t border-white/10 mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-white/60 font-bold uppercase tracking-wider font-sans">Coupon Checkout Code</span>
                    <span className="font-mono text-base font-black text-brand-gold uppercase tracking-widest">
                      {offer.code}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleCopyCode(e, offer.code!)}
                    className="bg-white text-brand-brown hover:bg-brand-brown hover:text-white font-bold text-xs py-2 px-5 rounded-full flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer uppercase tracking-widest font-sans"
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Copied & Applied
                      </>
                    ) : (
                      <>
                        <Clipboard className="w-3.5 h-3.5" />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
