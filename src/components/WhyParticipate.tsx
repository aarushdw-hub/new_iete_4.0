import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Clock, FileBadge, Network, Globe, Award, Sparkles, Brain } from 'lucide-react';
import { sfx } from '../utils/audioSFX';

export const WhyParticipate: React.FC = () => {
  const benefits = [
    {
      icon: Trophy,
      title: 'Win Exciting Cash Prizes',
      desc: 'Compete for a total cash prize pool of ₹7,000 + trophies & accolades.',
    },
    {
      icon: Clock,
      title: 'AICTE Activity Hours',
      desc: 'Fulfill official AICTE curriculum activity point requirements effortlessly.',
    },
    {
      icon: FileBadge,
      title: 'Participation Certificate',
      desc: 'Every registered team receiving an official credential signed by IETE TCET.',
    },
    {
      icon: Network,
      title: 'Peer & Mentor Networking',
      desc: 'Build lifelong professional ties with top coders and AI practitioners.',
    },
    {
      icon: Globe,
      title: 'Industry Exposure',
      desc: 'Present your AI models to judges from leading engineering domains.',
    },
    {
      icon: Award,
      title: 'Institutional Recognition',
      desc: 'Gain campus fame and showcase your prototype on official IETE portals.',
    },
    {
      icon: Sparkles,
      title: 'Breakthrough Innovation',
      desc: 'Turn speculative ideas into real, tangible software/hardware products.',
    },
    {
      icon: Brain,
      title: 'Hands-on AI Learning',
      desc: 'Master prompt engineering, fine-tuning, and model deployment pipelines.',
    },
  ];

  return (
    <section id="why-participate" className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider uppercase">
            // UNLOCK YOUR POTENTIAL
          </span>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-slate-100 tracking-tight">
            WHY <span className="text-cyan-400 cyan-glow-text">PARTICIPATE?</span>
          </h2>
          <p className="text-slate-400 font-space text-sm sm:text-base">
            Discover how THINK AI 4.0 elevates your tech career, knowledge, and academic profile.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => {
            const IconComp = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                onMouseEnter={() => sfx.playHover()}
                className="relative glass-panel rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,229,255,0.25)] transition-all group overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-400/20 transition-all" />

                <div className="p-3 rounded-xl bg-slate-900 border border-cyan-400/40 text-cyan-300 w-fit mb-4 group-hover:rotate-6 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>

                <h3 className="font-orbitron font-bold text-base text-slate-100 group-hover:text-cyan-300 transition-colors mb-2">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-300 font-space leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
