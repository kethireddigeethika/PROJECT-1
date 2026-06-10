/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, Heart, ShieldCheck, Flame } from 'lucide-react';

export default function AboutUs() {
  const commitments = [
    {
      title: 'Fresh Ingredients',
      desc: 'No powdered ice creams or long-life chemical creams. We use certified daily farm milk and hand-picked fresh fruits.',
      icon: <Sparkles className="w-5 h-5 text-brand-gold" />,
    },
    {
      title: 'Premium Quality',
      desc: 'Our base gelatos are slowly churned under high pressure, maintaining a velvety density twice as high as normal shakes.',
      icon: <Heart className="w-5 h-5 text-brand-pink" />,
    },
    {
      title: 'Unique Flavor Labs',
      desc: 'Our culinary flavor curators release experimental weekly creations that push physical desserts into fine-art states.',
      icon: <Flame className="w-5 h-5 text-brand-gold" />,
    },
    {
      title: 'Sanitized Preparation',
      desc: 'Triple rinse and high-heat steam extraction sanitize our whipping blades after every single blend to protect food purity.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-y border-brand-brown/5 relative">
      <div className="absolute right-0 top-1/4 w-36 h-36 bg-brand-pink/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-40 h-40 bg-brand-gold/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: BRAND STORY COZY IMAGE */}
          <div className="lg:col-span-5 relative" id="about-visuals">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl overflow-hidden aspect-[4/5] shadow-brand-touch border border-brand-brown/10 relative"
            >
              {/* Image from store ambiance or premium ingredients prep */}
              <img
                src="https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&q=80&w=650"
                alt="Chocolatier whipping ingredients"
                className="w-full h-full object-cover float-animation hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/75 via-transparent to-transparent" />
              
              {/* Embedded floating testimonial stats */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xs rounded-2xl p-4.5 border border-brand-brown/10 shadow-lg">
                <p className="font-serif italic text-sm text-brand-brown font-semibold">
                  "We don't sell fast-food drinks. We blend decadent, ice-free velvet desserts meant to be slowly, luxuriously experienced."
                </p>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-brand-brown/5">
                  <span className="w-2 h-2 rounded-full bg-brand-pink" />
                  <span className="text-[10px] font-black uppercase text-brand-brown tracking-wider">
                    Chef Lucas Vance, Co-founder
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: CORE VALUES AND STORY */}
          <div className="lg:col-span-7 space-y-8" id="about-narrative">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase text-brand-pink tracking-widest block">
                OUR AMBROSIAL LEGACY
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black text-brand-brown tracking-tight leading-tight">
                Crafting Velvet Sips Since 2021
              </h2>
              <div className="h-1 w-20 bg-brand-pink rounded-full" />
              <p className="text-sm md:text-base text-brand-brown/80 leading-relaxed font-sans pt-2">
                THICKSHAKES was founded with a singular, rebellious mission: to banish watery, syrup-bloated fast-food milkshakes. We set out to establish a high-end gourmet boutique that treats thickshakes as fine culinary treats, prepared only utilizing fresh farm heavy cream, imported gourmet chocolates, and raw organic fruits.
              </p>
            </div>

            {/* Mission & Vision mini-split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="about-mission-vision">
              <div className="p-5.5 glass-card bg-white/30 backdrop-blur-xs">
                <span className="text-[10px] font-bold text-brand-pink tracking-widest block mb-1.5 font-sans">OUR SACRED MISSION</span>
                <p className="text-xs text-brand-brown/85 leading-relaxed">
                  To elevate thickshakes into artisanal, luxury experiences, pairing precision blending technology with uncompromising food sourcing.
                </p>
              </div>
              <div className="p-5.5 glass-card bg-white/30 backdrop-blur-xs">
                <span className="text-[10px] font-bold text-brand-pink tracking-widest block mb-1.5 font-sans">OUR CORE VISION</span>
                <p className="text-xs text-brand-brown/85 leading-relaxed">
                  To establish the ultimate premium benchmark for milkshakes globally, demonstrating how cold desserts can look, taste, and make you feel.
                </p>
              </div>
            </div>

            {/* Commitments Icon Grid */}
            <div className="space-y-4.5 pt-4">
              <h3 className="text-xs font-bold uppercase text-brand-brown/70 tracking-widest font-sans">
                Why customers keep coming back
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="about-commitments-grid">
                {commitments.map((com, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-3 items-start"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/50 border border-brand-brown/10 flex items-center justify-center flex-shrink-0 shadow-xs">
                      {com.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[13px] font-bold text-brand-brown">{com.title}</h4>
                      <p className="text-xs text-brand-brown/70 leading-relaxed font-sans">{com.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
