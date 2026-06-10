/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { EXPERTISE_ITEMS } from '../data';

export default function Expertise() {
  return (
    <section id="expertise" className="py-20 lg:py-28 bg-white border-b border-brand-brown/5 relative">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 relative">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-black uppercase text-brand-pink tracking-widest block">
            OUR BRAND EXCELLENCE
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black text-brand-brown tracking-tight leading-tight">
            Why We Are Unrivaled
          </h2>
          <p className="text-sm text-brand-brown/70 leading-relaxed font-sans">
            It takes meticulous commitment to maintain thickshakes that defy the straw test. Here is the operational excellence we bake into every cup.
          </p>
          <div className="h-1 w-16 bg-brand-pink mx-auto rounded-full" />
        </div>

        {/* EXPERTISE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="expertise-cards-grid">
          {EXPERTISE_ITEMS.map((item, index) => {
            // Find appropriate Lucide icon dynamically
            const LucideIcon = (Icons as any)[item.iconName] || Icons.HelpCircle;

            // Custom colored background accents for specific icons
            let iconBgColor = 'bg-brand-cream text-brand-brown border-brand-brown/10';
            let iconHoverAccent = 'group-hover:bg-brand-brown group-hover:text-[#FFF8E7]';

            if (item.iconName === 'Heart') {
              iconBgColor = 'bg-pink-50 text-brand-pink border-pink-100';
              iconHoverAccent = 'group-hover:bg-brand-pink group-hover:text-white';
            } else if (item.iconName === 'Flame') {
              iconBgColor = 'bg-amber-50 text-brand-gold-dark border-amber-100';
              iconHoverAccent = 'group-hover:bg-brand-gold group-hover:text-brand-brown';
            } else if (item.iconName === 'Zap') {
              iconBgColor = 'bg-blue-50 text-blue-600 border-blue-100';
              iconHoverAccent = 'group-hover:bg-blue-600 group-hover:text-white';
            } else if (item.iconName === 'ShieldCheck') {
              iconBgColor = 'bg-emerald-50 text-emerald-600 border-emerald-100';
              iconHoverAccent = 'group-hover:bg-emerald-600 group-hover:text-white';
            }

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-card rounded-[22px] p-6.5 group hover:scale-[1.01] transition-all duration-300 flex flex-col items-start gap-4 shadow-brand-soft hover:shadow-brand-touch"
                id={`expertise-card-${item.id}`}
              >
                {/* Dynamic Icon Block */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${iconBgColor} ${iconHoverAccent} shadow-xs`}>
                  <LucideIcon className="w-5 h-5 flex-shrink-0" />
                </div>

                {/* Narrative */}
                <div className="space-y-2">
                  <h3 className="font-serif font-black text-lg text-brand-brown group-hover:text-brand-pink transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5D4037]/80 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
