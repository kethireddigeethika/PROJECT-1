/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';
import { CONTACT_INFO, STORE_HOURS } from '../data';

interface ContactProps {
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export default function Contact({ showToast }: ContactProps) {
  // Contact Form state fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) {
      showToast('Please fill in Name, Email, and Message.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      showToast('Your inquiry has wings! Our team will contact you back under 12 hours.', 'success');
      setName('');
      setEmail('');
      setPhone('');
      setMsg('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white border-t border-brand-brown/5 relative">
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-brand-gold/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-black uppercase text-brand-pink tracking-widest block">
            VISIT A BOUTIQUE
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black text-brand-brown tracking-tight leading-tight">
            Connect With Velvet Labs
          </h2>
          <p className="text-sm text-brand-brown/70 leading-relaxed font-sans">
            Have private catering requests, wholesale queries, or flavor ideas? Reach out to us or drop by our physical boutique in San Francisco.
          </p>
          <div className="h-1 w-16 bg-brand-pink rounded-full mx-auto" />
        </div>

        {/* BOTTOM CONTENT GRID split: Left is Details + Map, Right is form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="contact-blocks-container">
          
          {/* LEFT: BUSINESS COORDINATES + MAP */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-8 h-full" id="contact-info-panel">
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-brand-brown border-b border-brand-brown/10 pb-2 flex items-center gap-2">
                Coordinates & Hours
              </h3>
              
              {/* Coordinate Items */}
              <div className="space-y-4 font-sans">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#FFF8E7] border border-[#4E342E]/15 flex items-center justify-center flex-shrink-0 text-brand-brown">
                    <MapPin className="w-4.5 h-4.5 font-sans" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#5D4037]">Boutique Flagship Address</h4>
                    <p className="text-xs text-brand-brown/80 leading-relaxed mt-0.5">{CONTACT_INFO.address}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-[#FFF8E7] border border-[#4E342E]/15 flex items-center justify-center flex-shrink-0 text-brand-brown">
                      <Phone className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#5D4037]">Direct Mobile Phone</h4>
                      <p className="text-xs text-brand-brown/80 leading-relaxed mt-0.5">{CONTACT_INFO.phone}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-[#FFF8E7] border border-[#4E342E]/15 flex items-center justify-center flex-shrink-0 text-brand-brown">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#5D4037]">Inquiries Email Box</h4>
                      <p className="text-xs text-brand-brown/80 leading-relaxed mt-0.5 truncate">{CONTACT_INFO.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours of Operations */}
              <div className="glass-card bg-white/40 backdrop-blur-xs rounded-[22px] p-5 space-y-3">
                <h4 className="text-xs font-black uppercase text-brand-brown tracking-wider flex items-center gap-1.5 leading-none">
                  <Clock className="w-4 h-4 text-brand-pink" />
                  Active Serving Hours
                </h4>
                <div className="space-y-1.5 font-sans" id="store-hours-list">
                  {STORE_HOURS.map((sh, i) => (
                    <div key={i} className="flex justify-between items-center text-xs border-b border-brand-brown/5 last:border-b-0 pb-1.5 last:pb-0 font-medium">
                      <span className="text-brand-brown/80">{sh.days}</span>
                      <span className="font-mono text-brand-brown font-semibold">{sh.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* REAL-TIME MAP IFRAME */}
            <div className="rounded-[22px] overflow-hidden border border-brand-brown/10 shadow-brand-soft h-[200px] sm:h-[240px] w-full" id="embedded-map-container">
              <iframe
                id="contact-google-map-iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0113693247924!2d-122.404554!3d37.777123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808580858085%3A0x8085808580858085!2sGourmet%20District%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1716000000000!5m2!1sen!2sus"
                className="w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="THICKSHAKES Boutique Location Map"
              ></iframe>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="lg:col-span-6" id="contact-form-panel">
            <div className="glass-card bg-white/70 backdrop-blur-md rounded-[22px] p-6 md:p-8 shadow-brand-soft flex flex-col justify-between h-full">
              <div className="space-y-6">
                <h3 className="font-serif text-xl font-bold text-brand-brown border-b border-brand-brown/10 pb-2">
                  Drop a Velvet Message
                </h3>
                
                <form onSubmit={handleSubmitContact} className="space-y-4 font-sans" id="co-mail-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-brown mb-1 font-sans" htmlFor="input-name">Your Full Name *</label>
                      <input
                        id="input-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Rachel Green"
                        className="w-full bg-white border border-[#4E342E]/15 rounded-full px-5 py-2.5 text-xs text-brand-brown focus:outline-none focus:border-brand-brown font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-brown mb-1 font-sans" htmlFor="input-email">Your Email Address *</label>
                      <input
                        id="input-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rachel@gourmet.com"
                        className="w-full bg-white border border-[#4E342E]/15 rounded-full px-5 py-2.5 text-xs text-brand-brown focus:outline-none focus:border-brand-brown font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-brown mb-1 font-sans" htmlFor="input-phone">Phone Number (Optional)</label>
                    <input
                      id="input-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 742-5373"
                      className="w-full bg-white border border-[#4E342E]/15 rounded-full px-5 py-2.5 text-xs text-brand-brown focus:outline-none focus:border-brand-brown font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-brown mb-1 font-sans" htmlFor="input-message">Message Details *</label>
                    <textarea
                      id="input-message"
                      required
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder="Write your event catering requests or flavor proposals..."
                      rows={4}
                      className="w-full bg-white border border-[#4E342E]/15 rounded-[22px] px-5 py-3 text-xs text-brand-brown focus:outline-none focus:border-brand-brown resize-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#4E342E] hover:bg-[#FF6F91] text-white font-bold py-3.5 px-6 rounded-full text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-brand-soft hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer font-sans"
                    id="submit-contact-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Transmitting Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-brand-gold" />
                        Transmit Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Direct links panel */}
              <div className="pt-6 border-t border-brand-brown/10 mt-6 flex items-center justify-between gap-4">
                <span className="text-[10px] text-brand-brown/50 font-bold uppercase tracking-wider font-sans">Fastest connection</span>
                <a
                  href={CONTACT_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-2.5 px-5 rounded-full flex items-center gap-1.5 shadow-md hover:-translate-y-0.5 transition-all cursor-pointer uppercase tracking-widest font-sans"
                >
                  <MessageCircle className="w-4 h-4 text-white fill-current" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
