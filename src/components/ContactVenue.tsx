import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Navigation, ExternalLink } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

export const ContactVenue: React.FC = () => {
  return (
    <section id="contact" className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-slate-100 tracking-tight">
            VENUE & <span className="text-cyan-400 cyan-glow-text">CONTACT US</span>
          </h2>
          <p className="text-slate-400 font-space text-sm sm:text-base">
            Reach out to the IETE TCET committee or navigate to the offline event campus.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onMouseEnter={() => sfx.playHover()}
              className="glass-panel p-6 rounded-2xl border border-cyan-500/30 flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-400/40 text-cyan-300">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-base text-slate-100 mb-1">
                  OFFLINE EVENT VENUE
                </h3>
                <p className="text-xs font-space text-slate-300 leading-relaxed mb-2">
                  Thakur College of Engineering & Technology (TCET)<br />
                  A-Block Auditorium & Labs, Thakur Village, Kandivali (East), Mumbai - 400101.
                </p>
                <a
                  href="https://maps.google.com/?q=TCET+Kandivali+East+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sfx.playClick()}
                  className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Open in Google Maps
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              onMouseEnter={() => sfx.playHover()}
              className="glass-panel p-6 rounded-2xl border border-cyan-500/30 flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-400/40 text-cyan-300">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-base text-slate-100 mb-1">
                  PRIMARY HELPLINE
                </h3>
                <p className="text-xs font-mono text-cyan-300 font-bold mb-1">
                  {EVENT_DETAILS.contactPhonePrimary}
                </p>
                <p className="text-xs font-space text-slate-400">
                  Available Mon–Sat: 9:00 AM – 6:00 PM IST
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onMouseEnter={() => sfx.playHover()}
              className="glass-panel p-6 rounded-2xl border border-cyan-500/30 flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-400/40 text-cyan-300">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-base text-slate-100 mb-1">
                  OFFICIAL EMAIL
                </h3>
                <p className="text-xs font-mono text-cyan-300 font-bold mb-1">
                  {EVENT_DETAILS.contactEmail}
                </p>
                <p className="text-xs font-space text-slate-400">
                  Write to us for sponsorship, queries, or technical support.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Sci-Fi Tactical Map Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-panel rounded-3xl p-4 border border-cyan-400/40 shadow-[0_0_30px_rgba(0,229,255,0.2)] overflow-hidden relative min-h-[320px] flex flex-col justify-between"
          >
            {/* Embedded Google Map iframe */}
            <div className="w-full h-80 rounded-2xl overflow-hidden relative border border-cyan-500/30">
              <iframe
                title="TCET Mumbai Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.188737604313!2d72.8718913!3d19.2088827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b73cc35399f9%3A0x6739e763b000103!2sThakur%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(120%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Holographic Radar Tag */}
              <div className="absolute top-3 left-3 bg-[#0A0F18]/90 border border-cyan-400 px-3 py-1 rounded-lg text-[10px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-md pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                TACTICAL RADAR • TCET MUMBAI
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
