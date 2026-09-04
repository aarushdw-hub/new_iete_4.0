import React from 'react';
import { motion } from 'motion/react';
import { Trophy, CheckCircle2, FileText, Clock, Users, Star, Eye } from 'lucide-react';
import { sfx } from '../utils/audioSFX';

export const AwardsSection: React.FC = () => {

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
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-slate-100 tracking-tight">
            AWARDS & <span className="text-cyan-400 cyan-glow-text">PRIZE POOL</span>
          </h2>
          <p className="text-slate-400 font-space text-sm sm:text-base">
            Total Prize Pool of ₹10,000 RS + Trophies, Certificates, and AICTE Activity Hours.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full" />
        </div>

        {/* Single Grand Prize Pool Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onMouseEnter={() => sfx.playHover()}
          className="relative max-w-2xl mx-auto glass-panel rounded-3xl p-8 sm:p-12 border-2 border-cyan-400 shadow-[0_0_60px_rgba(0,229,255,0.3)] hover:shadow-[0_0_80px_rgba(0,229,255,0.45)] transition-all duration-300 text-center overflow-hidden mb-16 group"
        >
          {/* Top Neon Laser Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          
          {/* Radial Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/20 rounded-full blur-[90px] pointer-events-none" />

          {/* Trophy Icon */}
          <div className="inline-flex p-4 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 mb-5 shadow-[0_0_25px_rgba(0,229,255,0.4)] group-hover:scale-110 transition-transform">
            <Trophy className="w-10 h-10 text-cyan-300" />
          </div>

          <div className="font-orbitron font-bold text-xs sm:text-sm tracking-widest text-cyan-400 uppercase mb-2">
            GRAND EVENT REWARD
          </div>

          {/* Big Prize Amount */}
          <div className="font-orbitron font-black text-5xl sm:text-7xl text-cyan-300 cyan-glow-text mb-3 tracking-tight">
            ₹10,000
          </div>

          {/* Explicitly written Prize Pool of 10000 RS */}
          <h3 className="font-orbitron font-extrabold text-xl sm:text-2xl text-slate-100 group-hover:text-cyan-300 transition-colors mb-4">
            PRIZE POOL OF 10,000 RS
          </h3>

          <p className="text-slate-300 font-space text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-8">
            Awarded to top winning teams alongside official trophies, gold medals, achievement certificates, and incubation mentorship access.
          </p>

          {/* Perks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left font-space text-xs text-slate-300 pt-6 border-t border-cyan-500/20">
            <div className="flex items-center gap-2.5 bg-slate-900/70 p-3.5 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>₹10,000 RS Cash Prize Pool</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-900/70 p-3.5 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Winner & Runner-Up Trophies</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-900/70 p-3.5 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Official Certificates for Teams</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-900/70 p-3.5 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>AICTE Activity Hours & Mentorship</span>
            </div>
          </div>
        </motion.div>

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
