import React from 'react';
import { motion } from 'motion/react';
import { UserCheck, FileCode2, Cpu, UploadCloud, Presentation, Award, Trophy } from 'lucide-react';
import { TIMELINE_STEPS } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

export const EventTimeline: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck': return UserCheck;
      case 'FileCode2': return FileCode2;
      case 'Cpu': return Cpu;
      case 'UploadCloud': return UploadCloud;
      case 'Presentation': return Presentation;
      case 'Award': return Award;
      case 'Trophy': return Trophy;
      default: return Cpu;
    }
  };

  return (
    <section id="timeline" className="py-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-slate-100 tracking-tight">
            EVENT <span className="text-cyan-400 cyan-glow-text">TIMELINE & FLOW</span>
          </h2>
          <p className="text-slate-400 font-space text-sm sm:text-base">
            From registration to grand victory — step into the AI innovation journey.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full" />
        </div>

        {/* Vertical Roadmap Container */}
        <div className="relative py-4">
          {/* Central Vertical Line (Placed in middle on md+, on left on mobile) */}
          <div className="absolute top-4 bottom-4 left-6 md:left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-400 via-sky-300 to-cyan-500 shadow-[0_0_15px_rgba(0,229,255,0.8)] z-0 rounded-full" />

          <div className="space-y-10 md:space-y-12">
            {TIMELINE_STEPS.map((step, index) => {
              const IconComp = getIcon(step.iconName);
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => sfx.playHover()}
                  className="relative flex items-center w-full"
                >
                  {/* Center Node Point (Locks directly onto the vertical line) */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-[#05070B] border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.8)]">
                    <span className="w-3.5 h-3.5 rounded-full bg-cyan-300 animate-ping opacity-75" />
                    <span className="absolute w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,229,255,1)]" />
                  </div>

                  {/* Timeline Card & Connector Wrapper */}
                  <div
                    className={`relative w-full md:w-[calc(50%-2.5rem)] ml-14 ${
                      isLeft ? 'md:ml-0 md:mr-auto' : 'md:ml-auto md:mr-0'
                    }`}
                  >
                    {/* Horizontal Connector Line (Desktop Left) */}
                    {isLeft && (
                      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-10 h-[2px] bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.8)] z-10">
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(0,229,255,1)]" />
                      </div>
                    )}

                    {/* Horizontal Connector Line (Desktop Right) */}
                    {!isLeft && (
                      <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-10 h-[2px] bg-gradient-to-l from-cyan-400 via-cyan-300 to-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.8)] z-10">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(0,229,255,1)]" />
                      </div>
                    )}

                    {/* Horizontal Connector Line (Mobile) */}
                    <div className="block md:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-8 h-[2px] bg-gradient-to-l from-cyan-400 to-cyan-300 shadow-[0_0_8px_rgba(0,229,255,0.8)] z-10">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(0,229,255,1)]" />
                    </div>

                    {/* Card Content */}
                    <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_25px_rgba(0,229,255,0.15)] group transition-all duration-300">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                          {step.phase}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {step.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-400/40 text-cyan-400 group-hover:scale-110 transition-transform">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <h3 className="font-orbitron font-bold text-lg text-slate-100 group-hover:text-cyan-300 transition-colors">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-300 font-space leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
