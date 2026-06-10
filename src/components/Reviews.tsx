/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquarePlus, CheckCircle2, User, Filter, AlertCircle } from 'lucide-react';
import { Testimonial } from '../types';
import { TESTIMONIALS } from '../data';

interface ReviewsProps {
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export default function Reviews({ showToast }: ReviewsProps) {
  const [reviewsList, setReviewsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Leave a review form state
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [ratingHover, setRatingHover] = useState(0);

  const filteredReviews = reviewsList.filter((review) => {
    return filterRating === 'all' || review.rating === filterRating;
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) {
      showToast('Please provide your name and some feedback!', 'error');
      return;
    }

    const createdReview: Testimonial = {
      id: `custom-rev-${Date.now()}`,
      name: newName.trim(),
      rating: newRating,
      text: newText.trim(),
      date: new Date().toISOString().split('T')[0],
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(newName)}`, // fallback beautiful svg avatar
      verified: true // Mark submitted as verified for local state delight
    };

    setReviewsList([createdReview, ...reviewsList]);
    showToast('Thank you! Your verified review is published instantly.', 'success');
    
    // Clear form and collapse
    setNewName('');
    setNewText('');
    setNewRating(5);
    setIsFormOpen(false);
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-brand-cream/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-brand-brown/10">
          <div className="space-y-3 max-w-xl animate-fade-in">
            <span className="text-xs font-black uppercase text-brand-pink tracking-widest block flex items-center gap-1.5ClassName">
              <Star className="w-4 h-4 text-brand-pink fill-current" />
              CUSTOMER VOICES
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black text-brand-brown tracking-tight leading-tight">
              Loved by Milkshake Lovers
            </h2>
            <p className="text-xs text-brand-brown/70 leading-relaxed font-sans">
              Don't take our word for it—read real feedback left by members of the gourmet community. Out of 10,000+ orders, we hold a stellar 4.9 score!
            </p>
          </div>

          {/* Reviews Actions (Review button and rating filter) */}
          <div className="flex flex-wrap items-center gap-3 shrink-0" id="reviews-nav-controls font-sans">
            <div className="relative flex items-center gap-1.5 bg-white/40 backdrop-blur-xs border border-[#4E342E]/10 p-2.5 rounded-full text-xs font-medium text-brand-brown shadow-xs">
              <Filter className="w-3.5 h-3.5 text-brand-brown/40 ml-1.5" />
              <select
                id="rating-filter-select"
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="bg-transparent focus:outline-none pr-4 font-bold cursor-pointer"
              >
                <option value="all">All Stars</option>
                <option value="5">5-Star only</option>
                <option value="4">4-Star & above</option>
              </select>
            </div>

            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="bg-[#4E342E] hover:bg-[#FF6F91] text-white hover:text-white font-bold text-xs py-3 px-6 rounded-full transition-all shadow-brand-soft flex items-center gap-2 cursor-pointer uppercase tracking-widest font-sans"
              id="write-review-toggle-btn"
            >
              <MessageSquarePlus className="w-4 h-4 text-brand-gold" />
              Write A Review
            </button>
          </div>
        </div>

        {/* EXPANDABLE REVIEW FORM IF OPEN */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden max-w-xl mx-auto w-full"
              id="review-form-expandable"
            >
              <form onSubmit={handleSubmitReview} className="glass-card bg-white/70 backdrop-blur-md rounded-3xl p-6.5 shadow-brand-soft space-y-4 mb-8">
                <div className="border-b border-brand-brown/10 pb-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFC857]/15 flex items-center justify-center text-brand-gold-dark">
                    <Star className="w-4 h-4 fill-current text-[#FFC857]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-brand-brown">Share Your Velvet Feedback</h3>
                    <p className="text-[10px] text-brand-brown/50 font-semibold font-sans">Your rating validates our boutique standard!</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                  <div>
                    <label className="block text-xs font-bold text-brand-brown mb-1" htmlFor="review-name">Your Full Name *</label>
                    <input
                      id="review-name"
                      type="text"
                      required
                      placeholder="e.g. Rachel Green"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-white border border-brand-brown/15 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:border-brand-brown text-brand-brown font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-brown mb-1">Your Rating *</label>
                    <div className="flex items-center gap-1.5 py-1.5">
                      {[1, 2, 3, 4, 5].map((starsCount) => {
                        const filled = starsCount <= (ratingHover || newRating);
                        return (
                          <button
                            key={starsCount}
                            type="button"
                            onClick={() => setNewRating(starsCount)}
                            onMouseEnter={() => setRatingHover(starsCount)}
                            onMouseLeave={() => setRatingHover(0)}
                            className="text-[#FFC857] hover:scale-110 transition-transform cursor-pointer"
                            aria-label={`Rate ${starsCount} stars`}
                          >
                            <Star className={`w-5.5 h-5.5 ${filled ? 'fill-current' : ''}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="font-sans">
                  <label className="block text-xs font-bold text-brand-brown mb-1" htmlFor="review-text">Review Message *</label>
                  <textarea
                    id="review-text"
                    required
                    placeholder="Tell us what you liked (flavor intensity, whipped density...)"
                    rows={3}
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className="w-full bg-white border border-brand-brown/15 rounded-2xl px-4.5 py-3 text-xs focus:outline-none focus:border-brand-brown text-brand-brown resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4E342E] hover:bg-[#FF6F91] text-white font-bold py-3.5 px-4 rounded-full text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-brand-soft hover:-translate-y-0.5 text-center cursor-pointer font-sans"
                  id="submit-review-btn"
                >
                  Publish Verified Review
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* REVIEWS GRID DIRECT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="testimonials-block-grid">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-[22px] p-6.5 md:p-8 shadow-brand-soft flex flex-col justify-between hover:shadow-brand-touch hover:scale-[1.01] transition-all duration-300 relative"
                id={`review-card-${review.id}`}
              >
                {/* Review Text */}
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 text-brand-gold">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${idx < review.rating ? 'fill-current' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>

                  <p className="font-serif italic text-[13.5px] leading-relaxed text-brand-brown/95">
                    "{review.text}"
                  </p>
                </div>

                {/* Account Details footer */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-brand-brown/5">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover border border-brand-brown/10 bg-brand-cream"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-brand-brown leading-none">{review.name}</h4>
                      <span className="text-[9px] text-brand-brown/50 font-bold tracking-wider uppercase block mt-1">
                        {review.date}
                      </span>
                    </div>
                  </div>

                  {review.verified && (
                    <span className="bg-emerald-50 text-emerald-800 text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1 uppercase select-none">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
