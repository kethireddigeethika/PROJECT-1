/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';

export default function Gallery() {
  const [filterCategory, setFilterCategory] = useState<'all' | 'product' | 'ambiance' | 'event'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => filterCategory === 'all' || item.category === filterCategory
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prevIdx) => (prevIdx === 0 ? filteredItems.length - 1 : prevIdx! - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prevIdx) => (prevIdx === filteredItems.length - 1 ? 0 : prevIdx! + 1));
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-brand-cream/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-4 border-b border-brand-brown/10">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-black uppercase text-brand-pink tracking-widest block flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-brand-pink" />
              Gourmet Visuals
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black text-brand-brown tracking-tight leading-tight">
              Velvet Chronicles
            </h2>
            <p className="text-xs text-brand-brown/70 leading-relaxed font-sans">
              Take a walk through our artisanal prep counters, ambient dessert boutiques, and memorable private catering galas.
            </p>
          </div>

          {/* Inline filters */}
          <div className="flex flex-wrap gap-1.5 shrink-0" id="gallery-filters-panel">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4.5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer font-sans ${
                filterCategory === 'all'
                  ? 'bg-brand-brown text-white shadow-sm hover:-translate-y-0.5'
                  : 'bg-white/40 hover:bg-[#4E342E]/5 border border-[#4E342E]/10 text-brand-brown/80 backdrop-blur-xs'
              }`}
            >
              All Images
            </button>
            <button
              onClick={() => setFilterCategory('product')}
              className={`px-4.5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer font-sans ${
                filterCategory === 'product'
                  ? 'bg-brand-brown text-white shadow-sm hover:-translate-y-0.5'
                  : 'bg-white/40 hover:bg-[#4E342E]/5 border border-[#4E342E]/10 text-brand-brown/80 backdrop-blur-xs'
              }`}
            >
              Food Art
            </button>
            <button
              onClick={() => setFilterCategory('ambiance')}
              className={`px-4.5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer font-sans ${
                filterCategory === 'ambiance'
                  ? 'bg-brand-brown text-white shadow-sm hover:-translate-y-0.5'
                  : 'bg-white/40 hover:bg-[#4E342E]/5 border border-[#4E342E]/10 text-brand-brown/80 backdrop-blur-xs'
              }`}
            >
              Boutiques
            </button>
            <button
              onClick={() => setFilterCategory('event')}
              className={`px-4.5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer font-sans ${
                filterCategory === 'event'
                  ? 'bg-brand-brown text-white shadow-sm hover:-translate-y-0.5'
                  : 'bg-white/40 hover:bg-[#4E342E]/5 border border-[#4E342E]/10 text-brand-brown/80 backdrop-blur-xs'
              }`}
            >
              Catering Gala
            </button>
          </div>
        </div>

        {/* BRIGHT MASONRY-GRID LAYOUT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-image-grid">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group aspect-square rounded-[22px] overflow-hidden relative cursor-pointer border border-[#4E342E]/10 shadow-brand-soft bg-brand-cream"
              onClick={() => setLightboxIndex(idx)}
              id={`gallery-item-${item.id}`}
            >
              {/* Media image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Hover screen */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-brand-brown/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                <div className="text-brand-cream space-y-1 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[9px] bg-brand-pink text-white font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider w-fit block">
                    {item.category}
                  </span>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-black text-base">{item.title}</h3>
                    <Maximize2 className="w-4 h-4 text-brand-gold animate-pulse" />
                  </div>
                  <p className="text-[10px] text-brand-cream/70 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* LIGHTBOX MODAL ATTACHMENT */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-center items-center p-4 cursor-default"
            onClick={() => setLightboxIndex(null)}
            id="lightbox-portal"
          >
            {/* Topbar of lightbox */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white md:px-6 z-10">
              <div className="flex flex-col">
                <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider">
                  THICKSHAKES Chronicle Archive
                </span>
                <span className="text-xs text-white/50">{lightboxIndex + 1} of {filteredItems.length}</span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Slider frame */}
            <div className="relative max-w-4xl w-full flex items-center justify-center pointer-events-none px-12 h-2/3 sm:h-3/4">
              {/* Prev lever */}
              <button
                onClick={handlePrev}
                className="absolute left-0 p-3 bg-white/5 hover:bg-white/15 text-white rounded-full transition-all cursor-pointer pointer-events-auto"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Active Image representation */}
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-full max-w-full rounded-xl object-contain border border-white/15 shadow-2xl pointer-events-auto"
                referrerPolicy="no-referrer"
              />

              {/* Next lever */}
              <button
                onClick={handleNext}
                className="absolute right-0 p-3 bg-white/5 hover:bg-white/15 text-white rounded-full transition-all cursor-pointer pointer-events-auto"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Footer details */}
            <div className="text-center font-sans max-w-xl mt-6 text-white px-4">
              <span className="text-[9px] bg-brand-pink text-white font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {filteredItems[lightboxIndex].category}
              </span>
              <h3 className="font-serif font-black text-lg md:text-xl text-brand-gold mt-1">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed mt-1">
                {filteredItems[lightboxIndex].description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
