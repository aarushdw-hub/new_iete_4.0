import React, { useState } from 'react';
import { Cpu, Volume2, VolumeX, Menu, X, Bot, Sparkles, Radio, Zap, Scan } from 'lucide-react';
import { sfx } from '../utils/audioSFX';

interface Props {
  onOpenRegister: () => void;
  onOpenBotChat: (botName?: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const Navbar: React.FC<Props> = ({
  onOpenRegister,
  onOpenBotChat,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeScanBot, setActiveScanBot] = useState<string | null>(null);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Why Join', href: '#why-participate' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'Core Team', href: '#team' },
    { name: 'Guidelines', href: '#guidelines' },
    { name: 'Contact', href: '#contact' },
  ];

  const AI_BOTS = [
    {
      id: 'jarvis',
      name: 'JARVIS-01',
      role: 'Aerial Sentinel',
      status: 'Scanning Hero Zone',
      icon: Radio,
      color: 'text-cyan-400',
      badge: 'ACTIVE',
    },
    {
      id: 'nexus',
      name: 'NEXUS-X',
      role: 'Cyber Scout',
      status: 'Prize Tracker ₹7K',
      icon: Zap,
      color: 'text-sky-400',
      badge: 'ONLINE',
    },
    {
      id: 'nano',
      name: 'NANO-AI',
      role: 'Assistant Companion',
      status: 'Ready to Assist',
      icon: Bot,
      color: 'text-cyan-300',
      badge: '24/7',
    },
  ];

  const handleSoundToggle = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sfx.soundEnabled = next;
    if (next) sfx.playClick();
  };

  const handleNavClick = (href: string) => {
    sfx.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBotInteract = (botName: string) => {
    sfx.playLaserScan();
    setActiveScanBot(botName);
    setTimeout(() => {
      setActiveScanBot(null);
      setMobileMenuOpen(false);
      onOpenBotChat(botName);
    }, 600);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#05070B]/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          onClick={() => sfx.playHover()}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,229,255,0.3)] group-hover:border-cyan-300 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] transition-all">
            <Cpu className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-orbitron font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-100 to-cyan-400 cyan-glow-text">
                THINK AI
              </span>
              <span className="px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                4.0
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-space uppercase tracking-widest">
              IETE TCET MUMBAI
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              onMouseEnter={() => sfx.playHover()}
              className="text-xs font-medium text-slate-300 hover:text-cyan-300 transition-colors relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-sky-300 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Action Controls & AI Bots Dock */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Mini Sentinel Bot Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-cyan-500/30">
            {AI_BOTS.map((bot) => {
              const IconComp = bot.icon;
              const isScanning = activeScanBot === bot.name;
              return (
                <button
                  key={bot.id}
                  onClick={() => handleBotInteract(bot.name)}
                  className={`px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 text-[11px] font-mono transition-all duration-300 cursor-pointer ${
                    isScanning
                      ? 'bg-cyan-500 text-black font-bold scale-105 shadow-[0_0_15px_rgba(0,229,255,0.6)]'
                      : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-cyan-400/60 hover:text-cyan-200'
                  }`}
                  title={`${bot.name} (${bot.role}) — Click to interact`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isScanning ? 'text-black animate-spin' : bot.color}`} />
                  <span className="hidden xl:inline font-semibold">{bot.name}</span>
                </button>
              );
            })}
          </div>

          {/* SFX Audio Toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all shadow-[0_0_10px_rgba(0,229,255,0.1)] cursor-pointer"
            title={soundEnabled ? 'Mute Cyber Audio SFX' : 'Enable Cyber Audio SFX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Ask AI Chat Button */}
          <button
            onClick={() => {
              sfx.playClick();
              onOpenBotChat();
            }}
            className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-900/60 flex items-center gap-1.5 text-xs font-mono transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)] cursor-pointer"
          >
            <Bot className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span>AI ASSISTANT</span>
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
            onClick={handleSoundToggle}
            className="p-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-slate-300"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900 border border-cyan-400/40 text-cyan-300 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Hamburger Menu Overlay with AI Sentinels Section */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0F18]/95 border-b border-cyan-500/30 px-6 py-6 space-y-5 font-space max-h-[85vh] overflow-y-auto">
          {/* AI Sentinels Section in Hamburger Menu */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,229,255,0.15)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase flex items-center gap-1.5">
                <Scan className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
                // AI SENTINELS & BOTS
              </span>
              <span className="text-[10px] font-mono text-slate-400">TOUCH TO LAUNCH</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {AI_BOTS.map((bot) => {
                const IconComp = bot.icon;
                const isScanning = activeScanBot === bot.name;
                return (
                  <button
                    key={bot.id}
                    onClick={() => handleBotInteract(bot.name)}
                    className={`w-full p-2.5 rounded-xl flex items-center justify-between text-xs font-mono transition-all text-left cursor-pointer ${
                      isScanning
                        ? 'bg-cyan-500 text-black font-bold'
                        : 'bg-slate-900/90 border border-slate-800 hover:border-cyan-400 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg bg-cyan-950 border border-cyan-400/30 ${bot.color}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold flex items-center gap-2">
                          <span>{bot.name}</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                            {bot.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-normal">{bot.role} • {bot.status}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-cyan-300 hover:underline">LAUNCH</span>
                  </button>
                );
              })}
            </div>
          </div>

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
              className="w-full py-3 rounded-xl bg-slate-900 border border-cyan-400/40 text-cyan-300 font-mono text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-cyan-300" />
              OPEN AI ASSISTANT CHAT
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

