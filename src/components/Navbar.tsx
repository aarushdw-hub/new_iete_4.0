import React, { useState } from 'react';
import { Menu, X, Bot, Sparkles } from 'lucide-react';
import { sfx } from '../utils/audioSFX';

interface Props {
  onOpenRegister: () => void;
  onOpenBotChat: () => void;
}

export const Navbar: React.FC<Props> = ({
  onOpenRegister,
  onOpenBotChat,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Why Join', href: '#why-participate' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'Core Team', href: '#team' },
    { name: 'Guidelines', href: '#guidelines' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    sfx.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#05070B]/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Brand Logo (Clean Typography without chip icon) */}
        <a
          href="#"
          className="flex flex-col group shrink-0 select-none mr-3 lg:mr-8 cursor-pointer"
          onClick={() => sfx.playHover()}
        >
          <div className="flex items-center gap-2.5 whitespace-nowrap">
            <span className="font-orbitron font-extrabold text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-100 to-cyan-400 cyan-glow-text group-hover:brightness-125 transition-all">
              THINK AI
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-cyan-500/10 border border-cyan-400/50 text-cyan-300 shadow-[0_0_10px_rgba(0,229,255,0.2)] shrink-0">
              4.0
            </span>
          </div>
          <p className="text-[10px] text-cyan-400/70 font-space uppercase tracking-[0.25em] font-medium whitespace-nowrap -mt-0.5">
            IETE TCET MUMBAI
          </p>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-6 shrink-0">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              onMouseEnter={() => sfx.playHover()}
              className="text-xs font-medium text-slate-300 hover:text-cyan-300 transition-colors relative py-1 group whitespace-nowrap"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-sky-300 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Action Controls: THINKBOT & Register */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* THINKBOT AI Assistant Button */}
          <button
            onClick={() => {
              sfx.playClick();
              onOpenBotChat();
            }}
            className="px-3.5 py-2.5 rounded-xl bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/15 hover:border-cyan-300 hover:text-cyan-200 flex items-center gap-2 text-xs font-mono font-semibold transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] cursor-pointer active:scale-95"
            title="Chat with THINKBOT AI"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <Bot className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span className="tracking-wide">THINKBOT</span>
          </button>

          {/* Register Button */}
          <button
            onClick={() => {
              sfx.playClick();
              onOpenRegister();
            }}
            className="relative group overflow-hidden rounded-xl p-[1px] font-semibold text-xs transition-all active:scale-95 shadow-[0_0_20px_rgba(0,229,255,0.3)] cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-300 animate-pulse" />
            <span className="relative block px-4 py-2.5 rounded-[11px] bg-[#0A0F18] text-cyan-300 group-hover:bg-cyan-500 group-hover:text-black font-orbitron tracking-wider transition-all duration-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              REGISTER NOW
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900 border border-cyan-400/40 text-cyan-300 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Hamburger Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0F18]/95 border-b border-cyan-500/30 px-6 py-6 space-y-5 font-space max-h-[85vh] overflow-y-auto">
          {/* Nav Links */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-500 tracking-wider uppercase">
              // EVENT NAVIGATION
            </span>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="block text-sm font-medium text-slate-200 hover:text-cyan-300 py-2 border-b border-slate-800/60"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBotChat();
              }}
              className="w-full py-3 rounded-xl bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 font-mono text-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-cyan-900/60 transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)]"
            >
              <Bot className="w-4 h-4 text-cyan-300" />
              TALK TO THINKBOT
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 text-black font-orbitron font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.4)] cursor-pointer"
            >
              REGISTER NOW (₹119) ⚡
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
