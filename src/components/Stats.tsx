/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Wine, Calendar, Star } from 'lucide-react';
import { STATS } from '../data';

export default function Stats() {
  const [counts, setCounts] = useState({
    customers: 0,
    flavors: 0,
    years: 0,
    rating: 0,
  });

  // Smooth client-side counting animation upon component mount
  useEffect(() => {
    let startTimestamp = 0;
    const duration = 2000; // 2 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      setCounts({
        customers: Math.floor(progress * 10000),
        flavors: Math.floor(progress * 50),
        years: Math.floor(progress * 5),
        rating: Math.fround(progress * 4.9),
      });

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, []);

  // Match icons to stats
  const getIcon = (id: string) => {
    switch (id) {
      case 'stat-customers':
        return <Users className="w-6 h-6 text-brand-pink" />;
      case 'stat-flavors':
        return <Wine className="w-6 h-6 text-[#FFC857]" />;
      case 'stat-experience':
        return <Calendar className="w-6 h-6 text-[#FFF8E7]" />;
      default:
        return <Star className="w-6 h-6 text-brand-gold fill-current" />;
    }
  };

  return (
    <section className="py-16 bg-brand-brown text-[#FFF8E7] overflow-hidden relative shadow-inner">
      {/* Visual glowing nodes */}
      <div className="absolute left-0 top-0 w-44 h-44 bg-brand-pink/5 blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-44 h-44 bg-brand-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12" id="stats-counter-grid">
          {STATS.map((stat) => {
            // Animate dynamic display values based on state counter
            let displayValue = '';
            if (stat.id === 'stat-customers') {
              displayValue = `${counts.customers.toLocaleString()}`;
            } else if (stat.id === 'stat-flavors') {
              displayValue = `${counts.flavors}`;
            } else if (stat.id === 'stat-experience') {
              displayValue = `${counts.years}`;
            } else {
              displayValue = counts.rating.toFixed(1);
            }

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center space-y-2 border-r border-[#FFF8E7]/10 last:border-r-0 max-lg:even:border-r-0"
                id={`stat-box-${stat.id}`}
              >
                {/* Milestone Icon */}
                <div className="w-12 h-12 rounded-full bg-[#FFF8E7]/10 flex items-center justify-center mb-1 border border-white/5">
                  {getIcon(stat.id)}
                </div>

                <div className="space-y-1">
                  {/* Huge Display counter */}
                  <h3 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                    {displayValue}
                    <span className="text-[#FFC857]">{stat.suffix}</span>
                  </h3>
                  <p className="text-[11.5px] font-bold text-[#FFF8E7]/70 uppercase tracking-wider max-w-[160px] mx-auto leading-normal">
                    {stat.label}
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
