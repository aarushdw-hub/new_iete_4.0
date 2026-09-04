import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, FileText, PhoneCall, Award, Users, Calendar, ShieldCheck, Trophy } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData';
import { CountdownTimer } from './CountdownTimer';
import { sfx } from '../utils/audioSFX';

interface Props {
  onOpenRegister: () => void;
  onOpenRulebook: () => void;
}

export const HeroSection: React.FC<Props> = ({ onOpenRegister, onOpenRulebook }) => {
  // Animation state sequence
  const [typedThinkText, setTypedThinkText] = useState('');
  const [showAiGlitch, setShowAiGlitch] = useState(false);
  const [showFourPointZero, setShowFourPointZero] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const fullText = 'THINK';
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedThinkText(fullText.slice(0, currentIndex));
        sfx.playHover();
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowAiGlitch(true), 200);
        setTimeout(() => setShowFourPointZero(true), 500);
        setTimeout(() => setShowTagline(true), 800);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const handleContactScroll = () => {
    sfx.playClick();
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 px-4 flex flex-col justify-center items-center overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Badges */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-2.5 mb-8 text-center"
      >
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-semibold shadow-[0_0_15px_rgba(0,229,255,0.2)]">
          TCET Mumbai
        </span>
        <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-sky-400/40 text-sky-200 text-xs font-mono font-semibold">
          IETE Student Forum
        </span>
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 text-xs font-mono font-bold flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-cyan-300" />
          ₹10,000 RS Prize Pool
        </span>
        <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 text-xs font-mono">
          AI Innovation Competition
        </span>
      </motion.div>

      {/* Animated Main Title */}
      <div className="text-center font-orbitron font-black tracking-tight mb-6">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl flex flex-wrap items-center justify-center gap-3 md:gap-6 leading-none">
          {/* Step 1: THINK (Letter-by-Letter) */}
          <span className="text-slate-100 cyan-glow-text relative">
            {typedThinkText}
            {typedThinkText.length < 5 && (
              <span className="inline-block w-3 md:w-5 h-12 md:h-20 bg-cyan-400 animate-ping ml-1" />
            )}
          </span>

          {/* Step 2: AI (Holographic Glitch) */}
          {showAiGlitch && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-cyan-400 relative drop-shadow-[0_0_30px_rgba(0,229,255,0.8)]"
            >
              AI
            </motion.span>
          )}

          {/* Step 3: 4.0 (Forms from digital particles) */}
          {showFourPointZero && (
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="px-3 py-1 rounded-2xl bg-cyan-500/10 border border-cyan-400/60 text-cyan-400 text-4xl sm:text-6xl md:text-7xl font-mono shadow-[0_0_35px_rgba(0,229,255,0.4)]"
            >
              4.0
            </motion.span>
          )}
        </h1>
      </div>

      {/* Tagline & Description */}
      {showTagline && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-10"
        >
          <p className="font-space text-lg sm:text-2xl font-bold text-cyan-300 tracking-wide uppercase">
            {EVENT_DETAILS.tagline}
          </p>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-space max-w-2xl mx-auto">
            A premier AI innovation competition where students collaborate, solve real-world challenges, build intelligent solutions, present projects before experts, compete for exciting prizes, and shape the future of Artificial Intelligence.
          </p>
        </motion.div>
      )}

      {/* Action CTA Buttons */}
      {showTagline && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          {/* Register Button */}
          <button
            onClick={() => {
              sfx.playClick();
              onOpenRegister();
            }}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-500 text-black font-orbitron font-extrabold text-base tracking-wider hover:scale-105 active:scale-95 transition-all shadow-[0_0_35px_rgba(0,229,255,0.5)] flex items-center gap-2.5 cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            REGISTER NOW (₹119)
          </button>

          {/* Rulebook Button */}
          <button
            onClick={() => {
              sfx.playClick();
              onOpenRulebook();
            }}
            className="px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-400/50 text-cyan-300 font-orbitron font-semibold text-sm hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            RULEBOOK
          </button>

          {/* Contact Us Button */}
          <button
            onClick={handleContactScroll}
            className="px-6 py-4 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700 text-slate-300 font-orbitron font-medium text-sm hover:text-cyan-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-slate-400" />
            CONTACT US
          </button>
        </motion.div>
      )}

      {/* Countdown Timer Component */}
      {showTagline && <CountdownTimer onOpenRegister={onOpenRegister} />}

      {/* Quick Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-6"
      >
        {[
          { icon: Calendar, label: 'EVENT DATE', val: EVENT_DETAILS.eventDate },
          { icon: ShieldCheck, label: 'MODE', val: 'Offline @ TCET' },
          { icon: Users, label: 'TEAM SIZE', val: EVENT_DETAILS.teamSize },
          { icon: Award, label: 'AICTE HOURS', val: 'Eligible Hours' },
          { icon: FileText, label: 'CERTIFICATE', val: 'For All Teams' },
          { icon: Trophy, label: 'PRIZE POOL', val: EVENT_DETAILS.prizePool },
        ].map((stat, i) => (
          <div
            key={i}
            className="glass-panel p-3.5 rounded-2xl border border-cyan-500/20 text-center hover:border-cyan-400 transition-all"
          >
            <stat.icon className="w-5 h-5 text-cyan-400 mx-auto mb-1.5" />
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{stat.label}</div>
            <div className="font-orbitron font-bold text-xs text-cyan-200 mt-0.5">{stat.val}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
