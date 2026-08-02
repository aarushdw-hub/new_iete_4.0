import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Award, CheckCircle2, FileText, Clock, Users, Star, Eye } from 'lucide-react';
import { AWARDS_LIST } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

export const AwardsSection: React.FC = () => {
  const getRankBadge = (rank: string) => {
    switch (rank) {
      case '1st': return { bg: 'from-amber-400 via-yellow-200 to-amber-500', text: 'text-amber-300', border: 'border-amber-400/60', label: '🥇 FIRST PRIZE' };
      case '2nd': return { bg: 'from-slate-300 via-slate-100 to-slate-400', text: 'text-slate-200', border: 'border-slate-300/60', label: '🥈 SECOND PRIZE' };
      case '3rd': return { bg: 'from-amber-700 via-amber-500 to-amber-800', text: 'text-amber-400', border: 'border-amber-600/60', label: '🥉 THIRD PRIZE' };
      default: return { bg: 'from-cyan-400 to-sky-400', text: 'text-cyan-300', border: 'border-cyan-400/60', label: 'PRIZE' };
    }
  };

  const additionalBenefits = [
    { icon: FileText, title: 'Participation Certificate', desc: 'Verified certificate for every team presenting at TCET.' },
    { icon: Clock, title: 'AICTE Activity Hours', desc: 'Official activity point allocation credited to degree records.' },
    { icon: Users, title: 'Networking Opportunities', desc: 'Interact with AI researchers, sponsors, and peers.' },
    { icon: Star, title: 'Institutional Recognition', desc: 'Featured on TCET official social handles & IETE news bulletin.' },
    { icon: Eye, title: 'Professional Visibility', desc: 'Showcase your AI project on national innovation portals.' },
  ];

  return (
    <section id="prizes" className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider uppercase">
            // VICTORY & REWARDS
          </span>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-slate-100 tracking-tight">
            AWARDS & <span className="text-cyan-400 cyan-glow-text">PRIZE POOL</span>
          </h2>
          <p className="text-slate-400 font-space text-sm sm:text-base">
            Total Prize Pool of ₹7,000 + Trophies, Certificates, and AICTE Activity Hours.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full" />
        </div>

        {/* 3 Main Prize Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
          {AWARDS_LIST.map((award, i) => {
            const style = getRankBadge(award.rank);
            const isFirst = award.rank === '1st';

            return (
              <motion.div
                key={award.rank}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => sfx.playHover()}
                className={`relative glass-panel rounded-3xl p-8 border ${
                  isFirst
                    ? 'border-cyan-400 shadow-[0_0_40px_rgba(0,229,255,0.35)] scale-105 z-10'
                    : 'border-cyan-500/30'
                } hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between group`}
              >
                {/* Top Badge */}
                <div className="mb-6">
                  <span className={`px-3 py-1 rounded-full bg-slate-900 border ${style.border} ${style.text} font-orbitron font-bold text-xs tracking-wider uppercase inline-block mb-4`}>
                    {style.label}
                  </span>

                  <div className="font-orbitron font-black text-5xl text-cyan-300 cyan-glow-text mb-2">
                    {award.amount}
                  </div>

                  <h3 className="font-orbitron font-bold text-lg text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {award.title}
                  </h3>
                </div>

                {/* Perks list */}
                <div className="space-y-3 font-space text-xs text-slate-300 pt-6 border-t border-slate-800">
                  {award.perks.map((perk, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Benefits Grid */}
        <div className="glass-panel rounded-3xl p-8 border border-cyan-500/20">
          <h3 className="font-orbitron font-bold text-xl text-center text-cyan-200 mb-8">
            ADDITIONAL PARTICIPANT BENEFITS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {additionalBenefits.map((b, bIdx) => {
              const IconComp = b.icon;
              return (
                <div
                  key={bIdx}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center hover:border-cyan-500/40 transition-all"
                >
                  <IconComp className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <h4 className="font-orbitron font-semibold text-xs text-slate-200 mb-1">
                    {b.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-space leading-tight">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
