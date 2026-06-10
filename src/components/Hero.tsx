/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Plus, Check, Star, RefreshCw } from 'lucide-react';
import { HERO_IMAGE } from '../data';

interface HeroProps {
  onAddCustomShake: (customShakeName: string, customPrice: number, opts: { size: 'regular' | 'large', whipped: boolean, noSugar: boolean, notes: string }) => void;
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export default function Hero({ onAddCustomShake, showToast }: HeroProps) {
  // Mini interactive custom thickshake builder state
  const [flavor, setFlavor] = useState<'chocolate' | 'strawberry' | 'vanilla' | 'caramel'>('chocolate');
  const [size, setSize] = useState<'regular' | 'large'>('regular');
  const [whipped, setWhipped] = useState(true);
  const [toppings, setToppings] = useState<string[]>(['Chocolate Chips']);
  const [noSugar, setNoSugar] = useState(false);

  const availableToppings = [
    { name: 'Chocolate Chips', type: 'brown' },
    { name: 'Oreo Bits', type: 'dark' },
    { name: 'Sprinkles', type: 'colorful' },
    { name: 'Fresh Strawberry Cup', type: 'pink' },
    { name: 'Honeycomb Dust', type: 'gold' }
  ];

  const handleToggleTopping = (topName: string) => {
    if (toppings.includes(topName)) {
      setToppings(toppings.filter(t => t !== topName));
    } else {
      if (toppings.length >= 3) {
        showToast('Maximum of 3 customized toppings!', 'info');
        return;
      }
      setToppings([...toppings, topName]);
    }
  };

  const menuRedirect = () => {
    const menuSection = document.querySelector('#menu');
    if (menuSection) {
      const headerOffset = 85;
      const elementPosition = menuSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleAssembleAndOrder = () => {
    const title = `My Custom ${flavor.charAt(0).toUpperCase() + flavor.slice(1)} Crafted Shake`;
    // Base 6.90 + toppings * 0.5 + size large increments
    const calculatedPrice = 6.99 + (toppings.length * 0.40);
    
    onAddCustomShake(title, calculatedPrice, {
      size: size,
      whipped: whipped,
      noSugar: noSugar,
      notes: `Custom built recipe. Toppings: ${toppings.join(', ') || 'None'}`
    });
  };

  // Visual representations based on builder selections
  const builderColors = {
    chocolate: { bg: 'bg-[#5C4037]', border: 'border-[#4E342E]', text: 'text-[#5C4037]', colorHex: '#5C4037' },
    strawberry: { bg: 'bg-[#FF85A1]', border: 'border-[#FF6F91]', text: 'text-[#E05374]', colorHex: '#FF85A1' },
    vanilla: { bg: 'bg-[#FFF2CC]', border: 'border-[#FFC857]', text: 'text-amber-700', colorHex: '#FFF2CC' },
    caramel: { bg: 'bg-[#D2B48C]', border: 'border-amber-800', text: 'text-[#8B5A2B]', colorHex: '#D2B48C' }
  };

  return (
    <section id="home" className="pt-28 lg:pt-36 pb-16 lg:pb-24 relative overflow-hidden bg-brand-cream/30 border-b border-brand-brown/5">
      {/* Dynamic background element overlays */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-white/20 opacity-40 blur-3xl rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: BRAND OUTLINE AND CALL TO ACTIONS */}
        <div className="lg:col-span-7 space-y-8 flex flex-col items-start" id="hero-headlines">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-brand-pink/10 text-brand-pink px-4.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest font-sans"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Guaranteed Crystalline-Free Decadence</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-brand-brown tracking-tight leading-none"
            >
              THICKSHAKES
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-2xl md:text-3xl italic text-brand-pink font-semibold"
            >
              Every Sip is a <span className="text-brand-pink">Delicious</span> Experience
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm md:text-base text-brand-brown/80 max-w-xl leading-relaxed font-sans"
            >
              Experience velvety dense indulgence crafted by dessert experts. Our secret recipe features rich hand-churned frozen gelato slow-whipped with premium ingredients, certified organic whole milk, and real botanical nectars.
            </motion.p>
          </div>

          {/* Bullet badging for food values */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 w-full"
            id="hero-badge-grid"
          >
            {[
              { label: 'Fresh Spun Fruits', desc: '100% Organic Purée' },
              { label: 'Tahitian Bean Caviar', desc: 'Raw vanilla infusion' },
              { label: 'Zero Artificial Fillers', desc: 'Dense natural whipping' }
            ].map((v, idx) => (
              <div key={idx} className="glass-card p-4 rounded-2xl flex flex-col gap-1 border border-brand-brown/10 shadow-brand-soft bg-white/30 backdrop-blur-md">
                <span className="text-xs font-bold text-brand-brown font-sans">{v.label}</span>
                <span className="text-[10px] text-brand-brown/60 font-semibold font-sans">{v.desc}</span>
              </div>
            ))}
          </motion.div>

          {/* Primary click-to-nav control panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-3 w-full sm:w-auto"
            id="hero-navigation-ctas"
          >
            <button
              onClick={menuRedirect}
              className="flex-grow sm:flex-grow-0 bg-[#4E342E] hover:bg-[#FF6F91] text-white font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-widest transition-all duration-300 shadow-brand-soft hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 font-sans"
              id="hero-order-cta"
            >
              Order Now
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </button>
            <button
              onClick={menuRedirect}
              className="flex-grow sm:flex-grow-0 border border-[#4E342E]/30 bg-white/40 hover:bg-[#4E342E]/5 hover:border-[#4E342E] text-brand-brown font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center justify-center font-sans"
              id="hero-explore-cta"
            >
              Explore Menu
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-center gap-3.5 pt-2"
            id="social-rating-box"
          >
            <div className="flex -space-x-2.5">
              {[
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=60',
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=60',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=60'
              ].map((imgUrl, i) => (
                <img
                  key={i}
                  src={imgUrl}
                  alt="Customer avatar"
                  className="w-8.5 h-8.5 rounded-full border-2 border-brand-cream object-cover"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div className="text-xs font-sans">
              <div className="flex items-center gap-0.5 text-brand-gold font-bold">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                <span className="text-brand-brown font-semibold ml-1.5 font-sans">4.9/5 Rating</span>
              </div>
              <p className="text-[11px] text-brand-brown/60">From 10,000+ local milkshake purists</p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE CRAFT BUILDER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 glass-card rounded-3xl p-6.5 shadow-brand-soft relative flex flex-col gap-6"
          id="custom-shake-builder-panel"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-brand-brown/10">
            <div>
              <h3 className="font-serif font-bold text-lg text-brand-brown flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                Craft Your Dynamic Shake
              </h3>
              <p className="text-[11px] text-brand-brown/60 font-semibold font-sans">
                Build it interactively, we will churn it to life!
              </p>
            </div>
            <button
              onClick={() => {
                setFlavor('chocolate');
                setWhipped(true);
                setToppings(['Chocolate Chips']);
                setNoSugar(false);
                setSize('regular');
              }}
              className="text-gray-400 hover:text-brand-pink transition-colors p-1"
              title="Reset builder"
              id="reset-builder-btn"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Split row: Visual shake representation in left half of container, inputs in right */}
          <div className="grid grid-cols-12 gap-4 items-center">
            
            {/* ILLUSTRATED ACTIVE VIEW */}
            <div className="col-span-4 flex flex-col items-center gap-4 py-2">
              <div className="relative w-20 h-44 flex flex-col justify-end">
                {/* Straw */}
                <div className="absolute top-0 right-7 w-2 h-16 bg-red-100 border-r-2 border-red-400 -rotate-12 transform origin-bottom z-10 rounded-full" />
                
                {/* Whipped cream illustration overlay */}
                {whipped && (
                  <motion.div
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute top-4 left-1/2 -translate-x-1/2 w-[68px] h-10 bg-white rounded-full shadow-md z-20 flex flex-col justify-center items-center"
                    style={{ borderRadius: '40% 40% 10% 10% / 100% 100% 20% 20%' }}
                  >
                    {/* Drizzle pattern based on flavor */}
                    <div className="flex justify-around w-10 gap-0.5 mt-2">
                      <div className={`w-0.5 h-5 rounded-full ${flavor === 'chocolate' ? 'bg-[#3E2723]' : flavor === 'caramel' ? 'bg-amber-600' : flavor === 'strawberry' ? 'bg-brand-pink' : 'bg-transparent'}`} />
                      <div className={`w-0.5 h-4.5 rounded-full ${flavor === 'chocolate' ? 'bg-[#3E2723]' : flavor === 'caramel' ? 'bg-amber-600' : flavor === 'strawberry' ? 'bg-brand-pink' : 'bg-transparent'}`} />
                      <div className={`w-0.5 h-6 rounded-full ${flavor === 'chocolate' ? 'bg-[#3E2723]' : flavor === 'caramel' ? 'bg-amber-600' : flavor === 'strawberry' ? 'bg-brand-pink' : 'bg-transparent'}`} />
                    </div>
                  </motion.div>
                )}

                {/* Main milkshake block in glass container */}
                <div className={`w-full overflow-hidden border-3 border-gray-100 rounded-b-3xl relative ${builderColors[flavor].bg} transition-colors duration-500`}
                     style={{
                       height: size === 'large' ? '140px' : '110px',
                       borderRadius: '4px 4px 20px 20px',
                       boxShadow: 'inset -8px 0px 10px rgba(0,0,0,0.15)'
                     }}
                >
                  {/* Internal swirled patterns represent luxury churn */}
                  <div className="absolute inset-0 bg-white/10 opacity-30 transform -skew-y-12 translate-y-2 pointer-events-none" />
                  
                  {/* Visually represent toppings floating inside or on rim */}
                  <div className="absolute inset-0 p-3 flex flex-wrap gap-1 items-end pointer-events-none">
                    {toppings.map((top, itemIdx) => (
                      <div 
                        key={itemIdx} 
                        className={`w-2.5 h-2.5 rounded-full shadow-xs ${
                          top.includes('Chips') ? 'bg-[#3E2723]' : 
                          top.includes('Oreo') ? 'bg-gray-800' : 
                          top.includes('Strawberry') ? 'bg-[#E05374]' : 
                          top.includes('Honeycomb') ? 'bg-amber-400 animate-pulse' : 'bg-[#FFC857]'
                        }`} 
                        title={top}
                      />
                    ))}
                  </div>
                </div>

                {/* Base glass pedestal */}
                <div className="w-12 h-1 bg-gray-100 rounded-full mx-auto" />
              </div>

              {/* Price output */}
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-brand-brown/50 tracking-wider">Est. Price</span>
                <p className="font-mono text-base font-black text-brand-brown leading-tight">
                  ${(6.99 + toppings.length * 0.40 + (size === 'large' ? 1.50 : 0)).toFixed(2)}
                </p>
              </div>
            </div>

            {/* CONTROLS COLUMN */}
            <div className="col-span-8 space-y-3">
              
              {/* Flavor Selector */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Base Gelato Churn</label>
                <div className="grid grid-cols-4 gap-1.5" id="flavor-selectors">
                  {Object.keys(builderColors).map((flav) => {
                    const active = flavor === flav;
                    return (
                      <button
                        key={flav}
                        type="button"
                        onClick={() => setFlavor(flav as any)}
                        className={`py-1.5 px-0.5 rounded-lg text-[10px] font-bold border capitalize transition-all cursor-pointer ${
                          active
                            ? 'bg-brand-brown text-brand-cream border-brand-brown shadow-sm'
                            : 'bg-brand-cream/30 hover:bg-brand-cream/60 border-brand-brown/10 text-brand-brown'
                        }`}
                        id={`flavor-${flav}`}
                      >
                        {flav}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sizes Selector */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Portion Cup Size</label>
                <div className="grid grid-cols-2 gap-2" id="size-selectors">
                  <button
                    type="button"
                    onClick={() => setSize('regular')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      size === 'regular'
                        ? 'border-brand-brown bg-brand-brown text-white shadow-sm'
                        : 'border-brand-brown/10 bg-white text-brand-brown'
                    }`}
                  >
                    Regular <span className="opacity-70 text-[9px] block">16 Oz</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSize('large')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      size === 'large'
                        ? 'border-brand-brown bg-brand-brown text-white shadow-sm'
                        : 'border-brand-brown/10 bg-white text-brand-brown'
                    }`}
                  >
                    Large <span className="text-brand-gold text-[9px] block font-extrabold">+ $1.50 (24 Oz)</span>
                  </button>
                </div>
              </div>

              {/* Extra whipped Switch */}
              <div className="flex items-center justify-between py-1 bg-brand-cream/25 px-2 rounded-lg border border-brand-brown/5">
                <div>
                  <span className="text-xs font-bold text-brand-brown">Heavenly Whipped Cream</span>
                  <span className="text-[9px] text-brand-brown/50 block font-semibold">Generous hand-whipped vanilla cloud</span>
                </div>
                <button
                  type="button"
                  onClick={() => setWhipped(!whipped)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${whipped ? 'bg-brand-pink' : 'bg-gray-200'}`}
                  id="toggle-whip"
                  aria-label="Toggle whipped cream"
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${whipped ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Sugar preference Switch */}
              <div className="flex items-center justify-between py-1 bg-brand-cream/25 px-2 rounded-lg border border-[#FFC857]/20">
                <div>
                  <span className="text-xs font-bold text-brand-brown">Sugar-Reduced Option</span>
                  <span className="text-[9px] text-brand-brown/50 block font-semibold">Sourced via native sweet maple</span>
                </div>
                <button
                  type="button"
                  onClick={() => setNoSugar(!noSugar)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${noSugar ? 'bg-[#FFC857]' : 'bg-gray-200'}`}
                  id="toggle-sugar"
                  aria-label="Toggle sugar preference"
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${noSugar ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>

            </div>
          </div>

          {/* Premium customized toppings (up to 3) */}
          <div className="space-y-1.5 pt-1 border-t border-brand-brown/10">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Sprinkled Extras (Pick up to 3)
            </label>
            <div className="flex flex-wrap gap-1.5" id="toppings-capsules">
              {availableToppings.map((top) => {
                const checked = toppings.includes(top.name);
                return (
                  <button
                    key={top.name}
                    type="button"
                    onClick={() => handleToggleTopping(top.name)}
                    className={`py-1.5 px-2.5 rounded-lg text-[10px] font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                      checked
                        ? 'border-brand-brown bg-brand-brown/5 text-brand-brown font-extrabold shadow-xs'
                        : 'border-brand-brown/15 bg-white hover:border-brand-brown/30 text-brand-brown/80'
                    }`}
                  >
                    {checked ? (
                      <Check className="w-3 h-3 text-brand-pink" />
                    ) : (
                      <Plus className="w-3 h-3 text-brand-brown/40" />
                    )}
                    {top.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Assemble addition call to actions */}
          <button
            onClick={handleAssembleAndOrder}
            className="w-full bg-[#4E342E] hover:bg-[#FF6F91] text-white font-bold py-3.5 px-4 rounded-full text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-brand-soft hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer font-sans"
            id="order-custom-shake-btn"
          >
            Add Custom Creation to Cart
            <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
