import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Lightbulb, Users, Code, Presentation, Award, FileCheck, Star } from 'lucide-react';
import { sfx } from '../utils/audioSFX';

export const AboutSection: React.FC = () => {
  const featureCards = [
    {
      icon: Cpu,
      title: 'Artificial Intelligence',
      desc: 'Harness LLMs, Generative AI, Computer Vision, and Neural Networks for real-world impact.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation Engine',
      desc: 'Transform bold theoretical AI concepts into functional, deployed prototypes.',
    },
    {
      icon: Users,
      title: 'Networking Hub',
      desc: 'Connect with fellow student innovators, industry experts, and senior researchers.',
    },
    {
      icon: Code,
      title: 'Project Development',
      desc: 'Hands-on experience in full-stack AI system architecture, datasets, and pipeline training.',
    },
    {
      icon: Presentation,
      title: 'Expert Presentation',
      desc: 'Pitch live before distinguished judges, domain experts, and academic faculty.',
    },
    {
      icon: Award,
      title: 'AICTE Activity Hours',
      desc: 'Earn verified activity points towards your degree curriculum requirements.',
    },
    {
      icon: FileCheck,
      title: 'Official Certificates',
      desc: 'Receive prestigious participation and excellence certificates from IETE TCET.',
    },
    {
      icon: Star,
      title: 'National Recognition',
      desc: 'Elevate your technical portfolio and gain visibility across top tech ecosystems.',
    },
  ];

  return (
    <section id="about" className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider uppercase">
            // ABOUT THE INITIATIVE
          </span>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-slate-100 tracking-tight">
            ABOUT <span className="text-cyan-400 cyan-glow-text">THINK AI 4.0</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full" />
        </div>

        {/* Main Glass Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-3xl p-8 md:p-12 border border-cyan-400/30 shadow-[0_0_40px_rgba(0,229,255,0.15)] mb-16 relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <p className="text-lg sm:text-2xl font-space font-medium text-slate-200 leading-relaxed text-center max-w-4xl mx-auto">
            <span className="text-cyan-300 font-bold">THINK AI 4.0</span> is a premier AI innovation competition organized by the <span className="text-cyan-300 font-semibold">IETE Student Forum (ISF)</span> at <span className="text-cyan-300 font-semibold">TCET Mumbai</span>. It encourages students to solve AI-driven challenges, showcase innovative solutions, collaborate with peers, and present their breakthrough ideas before expert judges.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card, index) => {
            const IconComp = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onMouseEnter={() => sfx.playHover()}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-cyan-500/20 group cursor-default"
              >
                <div className="p-3.5 rounded-xl bg-cyan-950/80 border border-cyan-400/30 text-cyan-400 w-fit mb-5 group-hover:scale-110 group-hover:border-cyan-300 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-orbitron font-bold text-lg text-slate-100 group-hover:text-cyan-300 transition-colors mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-300 font-space leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
