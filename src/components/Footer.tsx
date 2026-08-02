import React from 'react';
import { Cpu, Heart, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sfx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#020408] border-t border-cyan-500/20 pt-16 pb-8 px-4 text-slate-300 font-space text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
        {/* Col 1: Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-400/40 text-cyan-400">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="font-orbitron font-extrabold text-2xl text-cyan-300 cyan-glow-text">
              THINK AI 4.0
            </span>
          </div>

          <p className="text-slate-400 leading-relaxed">
            Where Intelligence Meets Innovation. The premier AI innovation hackathon and presentation forum organized by IETE TCET Mumbai.
          </p>

          <div className="text-[11px] font-mono text-cyan-400">
            TCET Mumbai • Kandivali East
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-orbitron font-bold text-sm text-slate-100 uppercase tracking-wider mb-4">
            QUICK LINKS
          </h4>
          <ul className="space-y-2.5 font-medium text-slate-400">
            {['About', 'Timeline', 'Problem Tracks', 'Entry Fees', 'Awards', 'Core Team', 'Guidelines'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-cyan-400">›</span> {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Contact */}
        <div>
          <h4 className="font-orbitron font-bold text-sm text-slate-100 uppercase tracking-wider mb-4">
            EVENT HELPLINE
          </h4>
          <div className="space-y-3 text-slate-400">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{EVENT_DETAILS.contactPhonePrimary}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{EVENT_DETAILS.contactEmail}</span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>TCET Campus, Thakur Village, Kandivali East, Mumbai</span>
            </p>
          </div>
        </div>

        {/* Col 4: Social Media */}
        <div>
          <h4 className="font-orbitron font-bold text-sm text-slate-100 uppercase tracking-wider mb-4">
            CONNECT WITH US
          </h4>
          <p className="text-slate-400 mb-4">
            Follow official IETE TCET handles for live updates & team announcements.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sfx.playClick()}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sfx.playClick()}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px] font-mono">
        <div className="flex items-center gap-1.5">
          Made with <Heart className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 animate-pulse" /> by <span className="text-cyan-300 font-bold">IETE Student Forum (ISF) - TCET</span>
        </div>

        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-950 transition-all flex items-center gap-1.5"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
