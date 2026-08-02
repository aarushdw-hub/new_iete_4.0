import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, Users, ShieldCheck, Zap } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

interface Props {
  onOpenRegister: () => void;
}

export const EntryFees: React.FC<Props> = ({ onOpenRegister }) => {
  return (
    <section id="entry-fees" className="py-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider uppercase">
            // TRANSPARENT FEE STRUCTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-slate-100 tracking-tight">
            ENTRY <span className="text-cyan-400 cyan-glow-text">FEES & PASSES</span>
          </h2>
          <p className="text-slate-400 font-space text-sm sm:text-base">
            Affordable entry pass per team — unlock full access to prizes, mentorship, and certifications.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full" />
        </div>

        {/* Highlight Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-2xl mx-auto glass-panel rounded-3xl p-8 md:p-10 border-2 border-cyan-400/60 shadow-[0_0_50px_rgba(0,229,255,0.3)] text-center overflow-hidden"
        >
          {/* Best Value Badge */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-400 to-sky-400 text-black font-orbitron font-extrabold text-xs px-6 py-1.5 rounded-bl-2xl shadow-lg uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            BEST VALUE • TEAM PASS
          </div>

          <div className="space-y-4 mb-8">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-400/30">
              OFFICIAL ENTRY FEE
            </span>

            <div className="flex items-center justify-center gap-2">
              <span className="font-orbitron font-black text-6xl md:text-7xl text-cyan-300 cyan-glow-text">
                {EVENT_DETAILS.entryFee}
              </span>
              <span className="text-slate-400 font-space text-sm text-left">
                / TEAM<br />
                <span className="text-xs text-slate-500">(2–4 Members)</span>
              </span>
            </div>

            <p className="text-sm font-space text-slate-300 max-w-md mx-auto">
              Single pass covers your entire team. No hidden charges or individual registration fees.
            </p>
          </div>

          {/* Perks list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left font-space text-xs text-slate-200 mb-8 max-w-lg mx-auto">
            {[
              'Full Access to AI Problem Statements',
              'Offline Pitching Pass @ TCET Campus',
              'Official Participation Certificate (All Members)',
              'Eligible AICTE Activity Point Hours',
              'Expert Mentorship & Pitch Feedback',
              'Refreshments & Swag Vouchers',
            ].map((perk, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="p-1 rounded-full bg-cyan-500/20 text-cyan-400">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{perk}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              sfx.playClick();
              onOpenRegister();
            }}
            className="w-full max-w-md py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-500 text-black font-orbitron font-extrabold text-base tracking-wider hover:scale-105 active:scale-95 transition-all shadow-[0_0_35px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <Zap className="w-5 h-5" />
            REGISTER YOUR TEAM NOW ({EVENT_DETAILS.entryFee})
          </button>
        </motion.div>
      </div>
    </section>
  );
};
