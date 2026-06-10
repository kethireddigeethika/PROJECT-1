/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, ArrowRight, Instagram, Facebook, GitMerge, Shield, BookOpen, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface FooterProps {
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export default function Footer({ showToast }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState('');

  const handleSubscribeNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim() || !newsEmail.includes('@')) {
      showToast('Please provide a valid email address!', 'error');
      return;
    }

    showToast('Joined the Churn Club! Check your inbox for your 15% discount coupon.', 'success');
    setNewsEmail('');
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-brand-deep text-brand-cream border-t border-[#FFF8E7]/10" id="main-app-footer">
      {/* Top Banner: Newsletter subscription */}
      <div className="border-b border-[#FFF8E7]/10 py-12 bg-black/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest block flex items-center gap-1.5 leading-none">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin" />
              EXCLUSIVE CHURN CLUB
            </span>
            <h3 className="font-serif text-2xl font-black text-white">Join Our Member Circle</h3>
            <p className="text-xs text-brand-cream/60 max-w-sm font-medium">
              Gain access to private secret tasting invites, botanical menu updates, and a flat 15% off coupon instantly!
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribeNews} className="flex gap-2 w-full" id="news-sub-form">
              <div className="relative flex-grow">
                <Mail className="w-4 h-4 text-white/40 absolute left-4.5 top-1/2 -translate-y-1/2" />
                <input
                  id="subscriber-email"
                  type="email"
                  required
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  placeholder="Insert email (e.g. Rachel@gourmet.com)"
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-5 py-3 text-xs focus:outline-none focus:border-brand-gold text-white focus:bg-white/10 font-sans"
                />
              </div>
              <button
                type="submit"
                className="bg-brand-pink hover:bg-brand-pink-dark text-white font-bold text-xs px-6 rounded-full flex items-center gap-1.5 transition-all shadow-pink-glow cursor-pointer uppercase tracking-widest font-sans"
                id="news-submit-btn"
              >
                Join Now
                <ArrowRight className="w-3.5 h-3.5 text-[#FFC857]" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main navigation columns */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Left Column: Brand summary */}
        <div className="md:col-span-4 space-y-4 font-sans">
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full bg-[#FF6F91] flex items-center justify-center text-white shadow-brand-soft">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-[#FFF8E7]"
              >
                <path d="M17 22H7M15 2L12 9" />
                <path d="M17 22L19 9H5L7 22" />
                <path d="M12 9A3 3 0 0 1 15 6" />
              </svg>
            </div>
            <div className="flex flex-col select-none">
              <span className="font-serif font-black text-lg tracking-wider text-white leading-none">
                THICKSHAKES
              </span>
              <span className="text-[8px] font-bold text-brand-gold tracking-widest leading-none mt-0.5">
                BOUTIQUE LUXURY
              </span>
            </div>
          </a>

          <p className="text-xs text-brand-cream/60 leading-relaxed font-sans max-w-sm">
            Crafting pure dense artisanal thickshakes using highly specialized freezing equipment and organic culinary ingredients. No filler ice, only luxury velvet.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5 pt-2" id="footer-social-panel">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/5 hover:bg-brand-pink border border-white/5 hover:border-transparent rounded-full text-brand-cream/80 hover:text-white transition-all shadow-sm"
              aria-label="Instagram handle link"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/5 hover:bg-brand-pink border border-white/5 hover:border-transparent rounded-full text-brand-cream/80 hover:text-white transition-all shadow-sm"
              aria-label="Facebook handle link"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="md:col-span-2.5 space-y-4">
          <h4 className="font-serif text-sm font-bold text-brand-gold tracking-wider">Quick Sitemap</h4>
          <ul className="space-y-2.5 text-xs text-brand-cream/65 font-medium" id="quicklinks-list">
            {[
              { label: 'Home Page', target: '#home' },
              { label: 'About Story', target: '#about' },
              { label: 'Gourmet Menu', target: '#menu' },
              { label: 'Expertise Values', target: '#expertise' },
              { label: 'Visual Gallery', target: '#gallery' },
              { label: 'Reviews Feed', target: '#reviews' },
              { label: 'Campaign Offers', target: '#offers' },
              { label: 'Boutique Connect', target: '#contact' }
            ].map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.target}
                  onClick={(e) => handleLinkClick(e, link.target)}
                  className="hover:text-brand-pink transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Product Categories */}
        <div className="md:col-span-2.5 space-y-4">
          <h4 className="font-serif text-sm font-bold text-brand-gold tracking-wider">Milkshake Churns</h4>
          <ul className="space-y-2.5 text-xs text-brand-cream/65 font-medium">
            <li>
              <a href="#menu" onClick={(e) => handleLinkClick(e, '#menu')} className="hover:text-brand-pink transition-colors">
                Chocolate Fudges
              </a>
            </li>
            <li>
              <a href="#menu" onClick={(e) => handleLinkClick(e, '#menu')} className="hover:text-brand-pink transition-colors">
                Gourmet Oreos
              </a>
            </li>
            <li>
              <a href="#menu" onClick={(e) => handleLinkClick(e, '#menu')} className="hover:text-brand-pink transition-colors">
                Sun-Ripened Strawberries
              </a>
            </li>
            <li>
              <a href="#menu" onClick={(e) => handleLinkClick(e, '#menu')} className="hover:text-brand-pink transition-colors">
                Alphonso Mango Blends
              </a>
            </li>
            <li>
              <a href="#menu" onClick={(e) => handleLinkClick(e, '#menu')} className="hover:text-brand-pink transition-colors">
                Cold Brew Espresso
              </a>
            </li>
            <li>
              <a href="#menu" onClick={(e) => handleLinkClick(e, '#menu')} className="hover:text-brand-pink transition-colors">
                Tahitian Vanilla caviars
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Legals policy */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-serif text-sm font-bold text-brand-gold tracking-wider">Store Disclaimers</h4>
          <ul className="space-y-2.5 text-xs text-brand-cream/65 font-medium" id="legals-list">
            <li className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-brand-cream/40" />
              <button
                onClick={() => showToast('Privacy Policy: All customer transaction logs are deleted immediately post order transmission. Zero tracking cookies enabled.', 'info')}
                className="hover:text-brand-pink text-left transition-colors cursor-pointer"
              >
                Privacy Policy Statement
              </button>
            </li>
            <li className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-brand-cream/40" />
              <button
                onClick={() => showToast('Terms: Ordering is simulated for experience preview. Products prepared in a kitchen handling nuts/dairy.', 'info')}
                className="hover:text-brand-pink text-left transition-colors cursor-pointer"
              >
                Terms & Conditions
              </button>
            </li>
            <li className="flex items-start gap-2">
              <GitMerge className="w-3.5 h-3.5 text-brand-cream/40 shrink-0 mt-0.5" />
              <div className="text-[10px] leading-normal text-brand-cream/50">
                Allergen Alert: Products contain dairy/gluten. Custom oat modifications available inside specific item orders.
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Copy footer */}
      <div className="border-t border-[#FFF8E7]/5 py-6 bg-black/20 text-center text-[11px] text-brand-cream/40 font-mono">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>&copy; 2026 THICKSHAKES Boutique Luxury Inc. All rights reserved.</span>
          <span className="text-brand-gold">Crafted with velvet precision in San Francisco, CA</span>
        </div>
      </div>
    </footer>
  );
}
