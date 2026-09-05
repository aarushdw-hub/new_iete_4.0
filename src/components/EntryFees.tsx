import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, Zap, ShieldCheck, ExternalLink, QrCode, Award, Users } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

interface Props {
  onOpenRegister: (tier?: 'iete' | 'non-iete') => void;
}

export const EntryFees: React.FC<Props> = ({ onOpenRegister }) => {
  const commonPerks = [
    'Full Access to AI Problem Statements',
    'Offline Pitching Pass @ TCET Campus',
    'Official Participation Certificate (All Members)',
    'Eligible AICTE Activity Point Hours',
    'Expert Mentorship & Pitch Feedback',
    'Refreshments & Swag Vouchers',
  ];

  return (
    <section id="entry-fees" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-slate-100 tracking-tight">
            ENTRY <span className="text-cyan-400 cyan-glow-text">FEES & PASSES</span>
          </h2>
          <p className="text-slate-400 font-space text-sm sm:text-base">
            Select your category to secure your team slot. Special discounted rate available for registered IETE members!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full" />
        </div>

        {/* Dual Pass Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto mb-12">
          {/* Card 1: IETE Members Pass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative glass-panel rounded-3xl p-8 sm:p-10 border-2 border-cyan-400/60 shadow-[0_0_40px_rgba(0,229,255,0.25)] flex flex-col justify-between overflow-hidden group hover:border-cyan-300 transition-all"
          >
            {/* Best Value / IETE Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-400 to-sky-400 text-black font-orbitron font-extrabold text-[11px] px-5 py-1.5 rounded-bl-2xl shadow-lg uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              IETE MEMBER PASS • SAVE ₹81
            </div>

            <div>
              <div className="space-y-4 mb-6">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-400/30 inline-block">
                  IETE FORUM MEMBERS
                </span>

                <div className="flex items-baseline gap-2">
                  <span className="font-orbitron font-black text-5xl sm:text-6xl text-cyan-300 cyan-glow-text">
                    {EVENT_DETAILS.entryFeeIETE}
                  </span>
                  <span className="text-slate-400 font-space text-xs sm:text-sm text-left">
                    / TEAM<br />
                    <span className="text-xs text-slate-500 font-mono">(2–4 Members)</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-space text-slate-300 leading-relaxed">
                  Exclusive concession for registered IETE Student Forum members. One team pass covers all 2 to 4 members.
                </p>
              </div>

              {/* Perks List */}
              <div className="space-y-2.5 font-space text-xs text-slate-200 mb-8">
                {commonPerks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <div className="p-1 rounded-full bg-cyan-500/20 text-cyan-400 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{perk}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-200">
                  <div className="p-1 rounded-full bg-cyan-500/30 text-cyan-300 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold">IETE Membership Verification at check-in</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sfx.playClick();
                onOpenRegister('iete');
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-500 text-black font-orbitron font-extrabold text-sm sm:text-base tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2 cursor-pointer mt-auto"
            >
              <Zap className="w-5 h-5" />
              REGISTER AS IETE MEMBER ({EVENT_DETAILS.entryFeeIETE})
            </button>
          </motion.div>

          {/* Card 2: Non-IETE Members Pass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative glass-panel rounded-3xl p-8 sm:p-10 border-2 border-slate-700/80 shadow-[0_0_30px_rgba(0,0,0,0.4)] flex flex-col justify-between overflow-hidden group hover:border-slate-500 transition-all"
          >
            {/* Open Tier Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-slate-700 to-slate-800 text-slate-200 font-orbitron font-bold text-[11px] px-5 py-1.5 rounded-bl-2xl shadow uppercase tracking-wider flex items-center gap-1.5 border-l border-b border-slate-600">
              <Users className="w-3.5 h-3.5 text-cyan-300" />
              OPEN REGISTRATION
            </div>

            <div>
              <div className="space-y-4 mb-6">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono text-xs font-bold border border-slate-700 inline-block">
                  NON-IETE MEMBERS
                </span>

                <div className="flex items-baseline gap-2">
                  <span className="font-orbitron font-black text-5xl sm:text-6xl text-slate-100">
                    {EVENT_DETAILS.entryFeeNonIETE}
                  </span>
                  <span className="text-slate-400 font-space text-xs sm:text-sm text-left">
                    / TEAM<br />
                    <span className="text-xs text-slate-500 font-mono">(2–4 Members)</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-space text-slate-300 leading-relaxed">
                  For students and teams who haven't taken the IETE membership. Open to all engineering and degree colleges.
                </p>
              </div>

              {/* Perks List */}
              <div className="space-y-2.5 font-space text-xs text-slate-200 mb-8">
                {commonPerks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <div className="p-1 rounded-full bg-slate-800 text-slate-300 shrink-0">
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <span>{perk}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300">
                  <div className="p-1 rounded-full bg-slate-800 text-slate-400 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                  <span className="font-semibold">No prerequisite membership required</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sfx.playClick();
                onOpenRegister('non-iete');
              }}
              className="w-full py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-cyan-400/60 text-slate-100 font-orbitron font-extrabold text-sm sm:text-base tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-auto"
            >
              <Zap className="w-5 h-5 text-cyan-400" />
              REGISTER AS NON-IETE ({EVENT_DETAILS.entryFeeNonIETE})
            </button>
          </motion.div>
        </div>

        {/* Bottom Auxiliary Bar: UPI ID & Google Form Option */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto rounded-2xl p-4 sm:p-5 bg-slate-950/80 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-cyan-300">
                OFFICIAL UPI PAYMENT ID: <span className="text-white">iete.tcet@upi</span>
              </p>
              <p className="text-[11px] text-slate-400 font-space">
                Accepted via PhonePe, Google Pay, Paytm, or BHIM UPI
              </p>
            </div>
          </div>

          <a
            href={EVENT_DETAILS.googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfx.playClick()}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all font-mono text-xs flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            Prefer Google Form?
          </a>
        </motion.div>
      </div>
    </section>
  );
};
