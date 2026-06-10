/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, MessageCircle, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenPromoCode: (code: string) => void;
}

export default function Header({
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onOpenPromoCode
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Featured Shakes', href: '#menu' },
    { name: 'Our Expertise', href: '#expertise' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Special Offers', href: '#offers' },
    { name: 'Connect', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
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

  const handleOrderRedirect = () => {
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-white/75 backdrop-blur-lg border-[#4E342E]/15 shadow-brand-soft py-2.5'
          : 'bg-white/40 backdrop-blur-md border-[#4E342E]/5 py-4'
      }`}
      id="main-app-header"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between font-sans">
        {/* BRAND LOGO */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 group cursor-pointer"
          id="brand-logo-id"
        >
          {/* Logo container styled with a pink circle matching theme */}
          <div className="w-9 h-9 rounded-full bg-brand-pink group-hover:bg-brand-brown flex items-center justify-center text-white group-hover:scale-105 transition-all duration-300 shadow-brand-soft">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4.5 h-4.5 text-white"
            >
              <path d="M17 22H7M15 2L12 9" />
              <path d="M17 22L19 9H5L7 22" />
              <path d="M12 9A3 3 0 0 1 15 6" />
            </svg>
          </div>
          <div className="flex flex-col select-none">
            <span className="font-serif font-bold text-lg tracking-tight text-brand-brown leading-none uppercase">
              THICKSHAKES
            </span>
            <span className="text-[8px] font-bold text-brand-pink tracking-widest leading-none mt-0.5 uppercase">
              BOUTIQUE LUXURY
            </span>
          </div>
        </a>

        {/* DESKTOP NAVIGATION BAR */}
        <nav className="hidden lg:flex items-center gap-8" id="desktop-nav-menu">
          {menuLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-bold text-brand-brown/70 hover:text-brand-pink uppercase tracking-widest transition-colors font-sans"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* INTERACTIVE HEADER ACTIONS */}
        <div className="flex items-center gap-2 md:gap-3" id="header-action-panel">
          {/* Real-time search toggle */}
          <div className="relative flex items-center">
            {showSearchInput && (
              <input
                id="search-input-header"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search flavors..."
                className="bg-white/80 border border-brand-brown/10 rounded-full pl-3.5 pr-8 py-1.5 text-xs text-brand-brown focus:outline-none w-36 md:w-48 animate-fade-in mr-2"
              />
            )}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="p-2 border border-[#4E342E]/10 rounded-full hover:bg-brand-brown hover:text-white text-brand-brown transition-all duration-200 cursor-pointer bg-white/60 backdrop-blur-xs"
              aria-label="Search thickshakes"
              id="header-search-btn"
            >
              {showSearchInput ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>
          </div>

          {/* WhatsApp Direct Link */}
          <a
            href={CONTACT_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center justify-center p-2 border border-[#4E342E]/10 bg-white/60 backdrop-blur-xs rounded-full text-brand-brown hover:text-emerald-500 hover:border-emerald-200 hover:bg-emerald-50 transition-all cursor-pointer"
            title="Chat in WhatsApp"
            id="header-whatsapp-link"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* Active shopping cart bag trigger */}
          <button
            onClick={onOpenCart}
            className="p-2 border border-[#4E342E]/10 bg-white/60 backdrop-blur-xs rounded-full hover:bg-brand-brown hover:text-white text-brand-brown transition-all duration-200 relative cursor-pointer"
            aria-label="Open cart sidebar"
            id="header-cart-toggler"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="absolute -top-1.5 -right-1.5 bg-brand-pink text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale-bounce"
                id="header-cart-badge"
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Premium "Order Now" quick link button */}
          <button
            onClick={handleOrderRedirect}
            className="hidden md:flex items-center gap-1.5 bg-brand-brown hover:bg-brand-pink text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-300 shadow-brand-soft hover:-translate-y-0.5 uppercase tracking-widest cursor-pointer font-sans"
            id="header-order-quick-btn"
          >
            Order Now
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburg menu toggler */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border border-[#4E342E]/10 bg-white/60 backdrop-blur-xs rounded-full text-brand-brown hover:bg-brand-cream lg:hidden cursor-pointer"
            aria-label="Toggle navigation menu"
            id="header-hamburger-menu"
          >
            {isMobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* MOBILE EXPANDABLE DROPDOWN PANELS */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden bg-brand-cream border-t border-brand-brown/10 shadow-lg absolute top-full left-0 right-0 p-4 py-6 flex flex-col gap-4 animate-fade-in"
          id="mobile-drawer-portal"
        >
          {menuLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-bold text-brand-brown hover:text-brand-pink tracking-wider uppercase py-2 border-b border-brand-brown/5"
            >
              {link.name}
            </a>
          ))}
          {/* Quick connections for mobile */}
          <div className="flex gap-2.5 mt-2">
            <a
              href={CONTACT_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3 rounded-xl shadow-md"
            >
              <MessageCircle className="w-4.5 h-4.5" />
              WhatsApp Orders
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleOrderRedirect();
              }}
              className="flex-grow flex items-center justify-center bg-brand-brown hover:bg-brand-deep text-brand-cream font-bold text-xs py-3 rounded-xl shadow-md uppercase tracking-wider"
            >
              Explore Flavors
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
