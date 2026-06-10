/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Star, Eye, Plus, Sparkles, AlertCircle, Info, SlidersHorizontal, Check, X } from 'lucide-react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../data';

interface FeaturedProductsProps {
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
  searchQuery: string;
}

export default function FeaturedProducts({ onAddToCart, searchQuery }: FeaturedProductsProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'chocolate' | 'fruity' | 'classic' | 'coffee'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Customizer modal configurations
  const [modalSize, setModalSize] = useState<'regular' | 'large'>('regular');
  const [modalNoSugar, setModalNoSugar] = useState(false);
  const [modalExtraWhip, setModalExtraWhip] = useState(false);
  const [modalNotes, setModalNotes] = useState('');
  const [modalQuantity, setModalQuantity] = useState(1);

  // Filter items based on category and search query
  const filteredProducts = PRODUCTS.filter((prod) => {
    const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { value: 'all', label: 'All Churns' },
    { value: 'chocolate', label: 'Chocolate Fudge' },
    { value: 'fruity', label: 'Vibrant Fruit' },
    { value: 'classic', label: 'Classics' },
    { value: 'coffee', label: 'Espresso & Caramel' },
  ];

  const handleOpenConfigModal = (prod: Product) => {
    setSelectedProduct(prod);
    setModalSize('regular');
    setModalNoSugar(false);
    setModalExtraWhip(false);
    setModalNotes('');
    setModalQuantity(1);
  };

  const handleAddConfiguredToCart = () => {
    if (!selectedProduct) return;
    onAddToCart({
      product: selectedProduct,
      quantity: modalQuantity,
      size: modalSize,
      noSugar: modalNoSugar,
      extraWhippedCream: modalExtraWhip,
      customRequests: modalNotes.trim() || undefined
    });
    setSelectedProduct(null);
  };

  // Calculate customized price in modal
  const getCustomPrice = () => {
    if (!selectedProduct) return 0;
    let price = selectedProduct.price;
    if (modalSize === 'large') price += 1.50;
    if (modalExtraWhip) price += 0.50;
    return price * modalQuantity;
  };

  return (
    <section id="menu" className="py-20 lg:py-28 bg-brand-cream/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* HEADER SPECIFICATION */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-black uppercase text-brand-pink tracking-widest block">
            HANDCRAFTED COLD TREATS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black text-brand-brown tracking-tight leading-tight">
            Our Signature Velvet Menu
          </h2>
          <p className="text-sm text-brand-brown/70 leading-relaxed font-sans">
            Every Thickshake is individually whipped upon order in our temperature-controlled boutique. Click on any treat to customize size and cream modifications.
          </p>
          <div className="h-1 w-16 bg-brand-pink mx-auto rounded-full" />
        </div>

        {/* CATEGORY SELECTOR TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2.5" id="category-tabs-container">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all cursor-pointer font-sans ${
                activeCategory === cat.value
                  ? 'bg-brand-brown text-white border-brand-brown shadow-brand-soft hover:-translate-y-0.5'
                  : 'bg-white/40 hover:bg-[#4E342E]/5 border-[#4E342E]/10 text-brand-brown/80 backdrop-blur-xs'
              }`}
              id={`cat-tab-${cat.value}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* SEARCH STATUS NOTICE IF APPLICABLE */}
        {searchQuery && (
          <div className="bg-white/60 border border-brand-brown/10 rounded-2xl p-4 flex items-center justify-between text-xs text-brand-brown max-w-md mx-auto">
            <span>Showing results for search query: <strong className="text-brand-pink">"{searchQuery}"</strong></span>
            <button
              onClick={() => {}}
              className="font-bold underline text-brand-brown hover:text-brand-pink"
            >
              {filteredProducts.length} items found
            </button>
          </div>
        )}

        {/* EMPTY PRODUCTS FILTER STATE */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white/40 border border-brand-brown/10 rounded-3xl space-y-4" id="empty-menu-state">
            <p className="font-serif text-lg font-bold text-brand-brown">No culinary shakes match your criteria!</p>
            <p className="text-xs text-brand-brown/60 max-w-sm mx-auto">
              Try adjusting your category selection or search keywords to discover another classic shake.
            </p>
          </div>
        )}

        {/* PRODUCTS DIRECT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="menu-items-grid">
          {filteredProducts.map((prod) => (
            <motion.div
              layout
              key={prod.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card rounded-[22px] group overflow-hidden shadow-brand-soft hover:shadow-brand-touch flex flex-col justify-between"
              id={`product-card-${prod.id}`}
            >
              {/* Product Card Media */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-cream border-b border-brand-brown/5">
                
                {/* Popularity or New Tags */}
                {prod.isPopular && (
                  <span className="absolute left-4 top-4 bg-brand-brown text-brand-gold text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full z-10 flex items-center gap-1 uppercase">
                    <Sparkles className="w-3 h-3 text-brand-gold animate-pulse" />
                    Popular
                  </span>
                )}
                {prod.isNew && (
                  <span className="absolute left-4 top-4 bg-brand-pink text-white text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full z-10 flex items-center gap-1 uppercase font-sans">
                    New Release
                  </span>
                )}

                {/* Main high quality image */}
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Overlay details hover look */}
                <div className="absolute inset-0 bg-brand-brown/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleOpenConfigModal(prod)}
                    className="p-3 bg-white rounded-full text-brand-brown hover:bg-brand-pink hover:text-white transition-all shadow-md transform translate-y-3 group-hover:translate-y-0 duration-300 cursor-pointer"
                    aria-label="View treat details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Specs Details content */}
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-serif font-black text-lg text-brand-brown group-hover:text-brand-pink transition-colors leading-tight">
                      {prod.name}
                    </h3>
                    <div className="flex items-center text-[#FFC857] font-bold text-xs shrink-0 bg-brand-brown px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3 fill-current mr-1" />
                      <span>{prod.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-brand-brown/70 leading-relaxed line-clamp-3">
                    {prod.description}
                  </p>
                </div>

                <div className="space-y-4 pt-1">
                  {/* Nutri badges */}
                  <div className="flex flex-wrap gap-1 text-[10px] font-sans">
                    <span className="bg-brand-cream/50 text-[#5D4037] px-2 py-0.5 rounded-md font-semibold">
                      {prod.calories} Calories
                    </span>
                    <span className="text-brand-pink bg-[#FFF0F2] px-2 py-0.5 rounded-md font-semibold">
                      Allergens: {prod.allergens.join(', ')}
                    </span>
                  </div>

                  {/* Ordering button panel */}
                  <div className="flex items-center justify-between pt-3 border-t border-brand-brown/5 font-sans">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-brand-brown/55 font-bold uppercase tracking-wider">Boutique Price</span>
                      <span className="font-mono text-lg font-black text-brand-brown">
                        ${prod.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleOpenConfigModal(prod)}
                      className="bg-brand-brown hover:bg-brand-pink text-white font-bold text-xs py-2.5 px-5 rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer uppercase tracking-widest hover:-translate-y-0.5 shadow-sm"
                      id={`buy-btn-${prod.id}`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* DETAILED CUSTOMIZER MODAL ATTACHMENT */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 cursor-pointer"
              id="modal-overlay"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="fixed bottom-0 top-0 left-0 right-0 sm:static m-auto z-50 bg-brand-cream max-w-2xl w-full rounded-2xl sm:rounded-3xl border border-brand-brown/15 shadow-brand-touch flex flex-col sm:grid sm:grid-cols-12 overflow-hidden h-[90vh] sm:h-auto max-h-[580px]"
              id="configurator-modal"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute right-4 top-4 z-50 bg-white/80 hover:bg-white p-1.5 rounded-full text-brand-brown shadow-md hover:scale-105 transition-all cursor-pointer"
                aria-label="Close modal"
                id="close-modal-btn"
              >
                <X className="w-4 h-4" />
              </button>

              {/* LEFT HALF DECORATION */}
              <div className="col-span-5 relative bg-brand-brown min-h-[160px] sm:min-h-0 h-1/4 sm:h-full">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/65 via-black/15 to-transparent sm:to-transparent flex items-end p-6">
                  <div className="space-y-1">
                    <span className="text-[9px] bg-brand-gold text-brand-brown font-black uppercase px-2 py-0.5 rounded-md tracking-wider">
                      {selectedProduct.category} Selection
                    </span>
                    <h3 className="font-serif font-black text-lg md:text-xl text-white leading-tight">
                      {selectedProduct.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* RIGHT HALF CONFIGURATION CONTROLS */}
              <div className="col-span-7 p-6 flex flex-col justify-between overflow-y-auto h-3/4 sm:h-full">
                <div className="space-y-5">
                  <div>
                    <h4 className="font-serif text-sm font-black text-brand-brown uppercase tracking-wider mb-1">
                      Indulgence Description
                    </h4>
                    <p className="text-xs text-brand-brown/70 leading-relaxed font-sans">
                      {selectedProduct.description}
                    </p>
                    <div className="flex gap-2 mt-2 text-[10px] font-semibold">
                      <span className="bg-brand-brown/5 text-brand-brown px-2 py-0.5 rounded-md">
                        🔥 {selectedProduct.calories} Kcal
                      </span>
                      <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded-md">
                        ⚠️ Contains: {selectedProduct.allergens.join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Size Configurator */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-brand-brown">Select Portion Size</label>
                    <div className="grid grid-cols-2 gap-3" id="modal-size-grid">
                      <button
                        onClick={() => setModalSize('regular')}
                        type="button"
                        className={`p-2.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                          modalSize === 'regular'
                            ? 'border-brand-brown bg-brand-brown text-white shadow-xs'
                            : 'border-brand-brown/15 bg-white text-brand-brown'
                        }`}
                      >
                        Regular Size
                        <span className="block text-[9px] opacity-85 mt-0.5">16 Oz (No Extra)</span>
                      </button>
                      <button
                        onClick={() => setModalSize('large')}
                        type="button"
                        className={`p-2.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                          modalSize === 'large'
                            ? 'border-brand-brown bg-brand-brown text-white shadow-xs'
                            : 'border-brand-brown/15 bg-white text-brand-brown'
                        }`}
                      >
                        Large Size
                        <span className="block text-[9px] text-[#FF6F91] font-black mt-0.5">+ $1.50 (24 Oz)</span>
                      </button>
                    </div>
                  </div>

                  {/* Switches layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="modal-modifier-grid">
                    {/* Extra whip helper */}
                    <button
                      type="button"
                      onClick={() => setModalExtraWhip(!modalExtraWhip)}
                      className={`p-3 rounded-full border flex items-center justify-between text-left cursor-pointer transition-all ${
                        modalExtraWhip ? 'border-brand-pink bg-brand-pink/5' : 'border-brand-brown/15 bg-white'
                      }`}
                    >
                      <div className="pl-2">
                        <span className="text-xs font-bold text-brand-brown">Extra Whip Cream</span>
                        <span className="text-[9px] text-brand-pink block font-black">+$0.50 velvet cloud</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center mr-2 ${modalExtraWhip ? 'bg-brand-pink border-transparent' : ''}`}>
                        {modalExtraWhip && <Check className="w-2.5 h-2.5 text-white stroke-[4]" />}
                      </div>
                    </button>

                    {/* Sugar reduction helper */}
                    <button
                      type="button"
                      onClick={() => setModalNoSugar(!modalNoSugar)}
                      className={`p-3 rounded-full border flex items-center justify-between text-left cursor-pointer transition-all ${
                        modalNoSugar ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-brown/15 bg-white'
                      }`}
                    >
                      <div className="pl-2">
                        <span className="text-xs font-bold text-brand-brown">Sugar Reduced</span>
                        <span className="text-[9px] text-[#A67C1E] block font-semibold">Native sweet maple</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center mr-2 ${modalNoSugar ? 'bg-brand-gold border-transparent' : ''}`}>
                        {modalNoSugar && <Check className="w-2.5 h-2.5 text-white stroke-[4]" />}
                      </div>
                    </button>
                  </div>

                  {/* Custom Requests field */}
                  <div>
                    <label className="block text-xs font-bold text-brand-brown mb-1 font-sans" htmlFor="chef-notes">Chef Notes (Allergies, Straws, Sprinkles)</label>
                    <input
                      id="chef-notes"
                      type="text"
                      value={modalNotes}
                      onChange={(e) => setModalNotes(e.target.value)}
                      placeholder="e.g. Extra chocolate cookies, no nuts please"
                      className="w-full bg-white border border-brand-brown/15 rounded-full px-4.5 py-2.5 text-xs focus:outline-none focus:border-brand-brown text-brand-brown font-sans"
                    />
                  </div>
                </div>

                {/* MODAL ORDER FOOTER SUMMARY */}
                <div className="pt-4 border-t border-brand-brown/10 mt-6 flex flex-col gap-3">
                  <div className="flex justify-between items-center bg-brand-brown/5 rounded-full p-2.5 px-4 text-brand-brown">
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-brand-brown/10 shadow-xs">
                      <button
                        onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                        className="p-1 hover:bg-brand-cream rounded-full"
                        aria-label="Decrease modal quantity"
                      >
                        <Plus className="w-3.5 h-3.5 rotate-45" />
                      </button>
                      <span className="font-mono font-bold text-sm text-brand-brown w-6 text-center">
                        {modalQuantity}
                      </span>
                      <button
                        onClick={() => setModalQuantity(modalQuantity + 1)}
                        className="p-1 hover:bg-brand-cream rounded-full"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Calculated custom price */}
                    <div className="text-right pr-2">
                      <span className="text-[10px] text-brand-brown/60 block font-bold font-sans">Portion Total</span>
                      <span className="font-mono text-base font-black">
                        ${getCustomPrice().toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleAddConfiguredToCart}
                    className="w-full bg-[#4E342E] hover:bg-[#FF6F91] text-white font-bold py-3.5 px-6 rounded-full text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-brand-soft hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 cursor-pointer font-sans"
                    id="confirm-modal-add-btn"
                  >
                    <ShoppingCart className="w-4 h-4 text-brand-gold" />
                    Secure Custom Portion (${getCustomPrice().toFixed(2)})
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
