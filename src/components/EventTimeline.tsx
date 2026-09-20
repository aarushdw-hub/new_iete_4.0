import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ClipboardList,
  FileText,
  Calendar,
  Code2,
  Users,
  Trophy,
  Sparkles,
  Eye,
  X,
  Download,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { TIMELINE_STEPS, EVENT_DETAILS } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

export const EventTimeline: React.FC = () => {
  const [posterModalOpen, setPosterModalOpen] = useState(false);

  // Icon resolver
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'ClipboardList':
        return ClipboardList;
      case 'FileText':
        return FileText;
      case 'Calendar':
        return Calendar;
      case 'Code':
      case 'Code2':
        return Code2;
      case 'Users':
        return Users;
      case 'Trophy':
        return Trophy;
      default:
        return Sparkles;
    }
  };

  // Color theme mapper for nodes and badges matching the poster palette
  const getThemeStyles = (colorTheme?: string) => {
    switch (colorTheme) {
      case 'teal':
        return {
          nodeBorder: 'border-emerald-400',
          nodeBg: 'bg-[#041a14]',
          nodeGlow: 'shadow-[0_0_25px_rgba(52,211,153,0.7)]',
          nodeText: 'text-emerald-300',
          badgeBorder: 'border-emerald-400/60 hover:border-emerald-300',
          badgeBg: 'bg-gradient-to-r from-emerald-950/90 via-slate-900/95 to-[#051c14]',
          badgeText: 'text-emerald-300',
          badgeGlow: 'shadow-[0_0_20px_rgba(52,211,153,0.25)]',
          badgeChip: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
          calloutBg: 'bg-emerald-950/50 border-emerald-500/30 text-emerald-200',
          accentText: 'text-emerald-400',
          arrowColor: 'text-emerald-400',
        };
      case 'blue':
        return {
          nodeBorder: 'border-sky-400',
          nodeBg: 'bg-[#051424]',
          nodeGlow: 'shadow-[0_0_25px_rgba(56,189,248,0.7)]',
          nodeText: 'text-sky-300',
          badgeBorder: 'border-sky-400/60 hover:border-sky-300',
          badgeBg: 'bg-gradient-to-r from-sky-950/90 via-slate-900/95 to-[#07192e]',
          badgeText: 'text-sky-300',
          badgeGlow: 'shadow-[0_0_20px_rgba(56,189,248,0.25)]',
          badgeChip: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
          calloutBg: 'bg-sky-950/50 border-sky-500/30 text-sky-200',
          accentText: 'text-sky-400',
          arrowColor: 'text-sky-400',
        };
      case 'purple':
        return {
          nodeBorder: 'border-purple-400',
          nodeBg: 'bg-[#180929]',
          nodeGlow: 'shadow-[0_0_25px_rgba(192,132,252,0.7)]',
          nodeText: 'text-purple-300',
          badgeBorder: 'border-purple-400/60 hover:border-purple-300',
          badgeBg: 'bg-gradient-to-r from-purple-950/90 via-slate-900/95 to-[#1c0a32]',
          badgeText: 'text-purple-300',
          badgeGlow: 'shadow-[0_0_20px_rgba(192,132,252,0.25)]',
          badgeChip: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
          calloutBg: 'bg-purple-950/50 border-purple-500/30 text-purple-200',
          accentText: 'text-purple-400',
          arrowColor: 'text-purple-400',
        };
      case 'trophy':
        return {
          nodeBorder: 'border-amber-400',
          nodeBg: 'bg-[#1e1604]',
          nodeGlow: 'shadow-[0_0_35px_rgba(251,191,36,0.85)]',
          nodeText: 'text-amber-300',
          badgeBorder: 'border-cyan-400/70 hover:border-amber-300',
          badgeBg: 'bg-gradient-to-r from-[#031d2b] via-[#051525] to-[#031d2b]',
          badgeText: 'text-cyan-200',
          badgeGlow: 'shadow-[0_0_30px_rgba(0,229,255,0.35)]',
          badgeChip: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
          calloutBg: 'bg-cyan-950/60 border-cyan-500/40 text-cyan-200',
          accentText: 'text-amber-400',
          arrowColor: 'text-cyan-400',
        };
      case 'cyan':
      default:
        return {
          nodeBorder: 'border-cyan-400',
          nodeBg: 'bg-[#031826]',
          nodeGlow: 'shadow-[0_0_25px_rgba(0,229,255,0.7)]',
          nodeText: 'text-cyan-300',
          badgeBorder: 'border-cyan-400/60 hover:border-cyan-300',
          badgeBg: 'bg-gradient-to-r from-cyan-950/90 via-slate-900/95 to-[#041f30]',
          badgeText: 'text-cyan-300',
          badgeGlow: 'shadow-[0_0_20px_rgba(0,229,255,0.25)]',
          badgeChip: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
          calloutBg: 'bg-cyan-950/50 border-cyan-500/30 text-cyan-200',
          accentText: 'text-cyan-400',
          arrowColor: 'text-cyan-400',
        };
    }
  };

  return (
    <section id="timeline" className="py-24 px-4 relative z-10 overflow-hidden">
      {/* Background Cybernetic Grid & Circuit Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            OFFICIAL EVENT FLOW • THINK AI 4.0
          </div>

          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-slate-100 tracking-tight">
            EVENT <span className="text-cyan-400 cyan-glow-text">FLOW & TIMELINE</span>
          </h2>

          <p className="text-slate-300 font-space text-sm sm:text-base max-w-2xl mx-auto">
            The official chronological roadmap for THINK AI 4.0 — Follow each milestone from registration to offline event day and winner announcements.
          </p>

          {/* Action CTA: View Official Poster */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                sfx.playClick();
                setPosterModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-400/50 hover:border-cyan-300 text-cyan-300 font-orbitron font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              VIEW OFFICIAL EVENT FLOW POSTER
            </button>
          </div>

          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full mt-4" />
        </div>

        {/* ============================================================ */}
        {/* DESKTOP POSTER-ACCURATE EVENT FLOW (md and larger) */}
        {/* ============================================================ */}
        <div className="hidden md:block relative py-8 max-w-4xl mx-auto">
          {/* Central Vertical Energy Conduit */}
          <div className="absolute top-12 bottom-20 left-1/2 -translate-x-1/2 w-1.5 bg-gradient-to-b from-cyan-400 via-sky-400 via-emerald-400 via-purple-500 to-amber-400 shadow-[0_0_20px_rgba(0,229,255,0.8)] z-0 rounded-full" />

          <div className="space-y-16">
            {TIMELINE_STEPS.map((step, index) => {
              const styles = getThemeStyles(step.colorTheme);
              const isTrophy = step.stepNumber === '🏆';

              return (
                <div key={step.id} className="relative">
                  {/* Downward Connector Chevrons between steps */}
                  {index > 0 && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
                      <ChevronDown className={`w-5 h-5 ${styles.arrowColor} animate-bounce opacity-80`} />
                    </div>
                  )}

                  {/* Standard Nodes (0, 1, 2, 3, 4) */}
                  {!isTrophy && (
                    <div className="relative flex items-center justify-between min-h-[110px]">
                      {/* Left Column Item */}
                      <div className="w-[42%] flex justify-end pr-8">
                        {/* Node 1 Left: Cyber Badge for Problem Statements Released */}
                        {step.id === 1 && (
                          <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            onMouseEnter={() => sfx.playHover()}
                            className="w-full max-w-xs"
                          >
                            <div className={`glass-panel p-4 rounded-2xl border ${styles.badgeBorder} ${styles.badgeBg} ${styles.badgeGlow} transition-all hover:scale-105 duration-300 relative group`}>
                              <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-cyan-950/90 border border-cyan-400/50 text-cyan-300 shadow-[0_0_12px_rgba(0,229,255,0.3)]">
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                  <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-semibold">
                                    STEP 1 • CHALLENGE
                                  </span>
                                  <h3 className="font-orbitron font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                                    {step.badgeTitle || step.title}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Node 2 Left: Highlight Callout "Teams Submit PPT" */}
                        {step.id === 2 && (
                          <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center"
                          >
                            <div className="text-right">
                              <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase block mb-0.5">
                                MILESTONE CUTOFF
                              </span>
                              <div className="font-orbitron font-extrabold text-xl sm:text-2xl text-slate-100 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
                                Teams Submit PPT
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Node 3 Left: Cyber Badge for Online Round (Prelims) */}
                        {step.id === 3 && (
                          <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            onMouseEnter={() => sfx.playHover()}
                            className="w-full max-w-xs"
                          >
                            <div className={`glass-panel p-4 rounded-2xl border ${styles.badgeBorder} ${styles.badgeBg} ${styles.badgeGlow} transition-all hover:scale-105 duration-300 relative group`}>
                              <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-sky-950/90 border border-sky-400/50 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.3)]">
                                  <Code2 className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                  <span className="text-[10px] font-mono text-sky-400 tracking-wider uppercase font-semibold">
                                    STEP 3 • SCREENING
                                  </span>
                                  <h3 className="font-orbitron font-bold text-sm text-slate-100 group-hover:text-sky-300 transition-colors">
                                    {step.badgeTitle || step.title}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Node 4 Left: Bold Date Callout "09TH OCTOBER" */}
                        {step.id === 4 && (
                          <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center"
                          >
                            <div className="text-right">
                              <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase block mb-0.5">
                                EVENT DATE
                              </span>
                              <div className="font-orbitron font-black text-2xl sm:text-3xl text-slate-100 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]">
                                09TH OCTOBER
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Center Glowing Circular Node (Digit 0, 1, 2, 3, 4) */}
                      <div className="absolute left-1/2 -translate-x-1/2 z-20">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4 }}
                          className={`relative w-16 h-16 rounded-full ${styles.nodeBg} border-2 ${styles.nodeBorder} ${styles.nodeGlow} flex items-center justify-center`}
                        >
                          {/* Outer Pulsing Glow Ring */}
                          <div className={`absolute -inset-1 rounded-full border border-dashed ${styles.nodeBorder} opacity-60 animate-spin`} style={{ animationDuration: '15s' }} />
                          <span className={`font-orbitron font-black text-2xl ${styles.nodeText}`}>
                            {step.stepNumber}
                          </span>
                        </motion.div>
                      </div>

                      {/* Right Column Item */}
                      <div className="w-[42%] pl-8">
                        {/* Node 0 Right: Cyber Badge for Registration Begins */}
                        {step.id === 0 && (
                          <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            onMouseEnter={() => sfx.playHover()}
                            className="w-full max-w-sm"
                          >
                            <div className={`glass-panel p-4 rounded-2xl border ${styles.badgeBorder} ${styles.badgeBg} ${styles.badgeGlow} transition-all hover:scale-105 duration-300 relative group`}>
                              <div className="flex items-center gap-3 mb-2">
                                <div className="p-2.5 rounded-xl bg-cyan-950/90 border border-cyan-400/50 text-cyan-300 shadow-[0_0_12px_rgba(0,229,255,0.3)]">
                                  <ClipboardList className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                  <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-semibold flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                                    ACTIVE NOW
                                  </span>
                                  <h3 className="font-orbitron font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                                    {step.badgeTitle || step.title}
                                  </h3>
                                </div>
                              </div>
                              <p className="text-xs text-slate-300 font-space mb-3 leading-relaxed">
                                {step.description}
                              </p>
                              <a
                                href={EVENT_DETAILS.googleFormUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => sfx.playClick()}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-orbitron font-bold text-[11px] tracking-wider transition-all shadow-[0_0_12px_rgba(0,229,255,0.4)] cursor-pointer"
                              >
                                REGISTER NOW
                                <ArrowRight className="w-3 h-3" />
                              </a>
                            </div>
                          </motion.div>
                        )}

                        {/* Node 1 Right: Poster Text Box for Problem Statements Note */}
                        {step.id === 1 && (
                          <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="w-full max-w-sm"
                          >
                            <div className="p-4 rounded-2xl bg-[#041525]/90 border border-cyan-500/30 text-slate-200 text-xs font-space leading-relaxed shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                              <p className="text-slate-200 font-medium">
                                Teams will receive problem statements to begin project development. However, those who have opted for Open Innovation will not be given a problem statement
                              </p>
                              <div className="mt-2.5 pt-2 border-t border-cyan-500/20 flex items-center gap-1.5 text-[10px] font-mono text-cyan-400">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>Track assignments communicated via registered email</span>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Node 2 Right: Cyber Badge for Project Submission Deadline */}
                        {step.id === 2 && (
                          <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            onMouseEnter={() => sfx.playHover()}
                            className="w-full max-w-sm"
                          >
                            <div className={`glass-panel p-4 rounded-2xl border ${styles.badgeBorder} ${styles.badgeBg} ${styles.badgeGlow} transition-all hover:scale-105 duration-300 relative group`}>
                              <div className="flex items-center gap-3 mb-2">
                                <div className="p-2.5 rounded-xl bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.3)]">
                                  <Calendar className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                  <span className="text-[10px] font-mono text-emerald-400 tracking-wider uppercase font-semibold">
                                    STEP 2 • SUBMISSION
                                  </span>
                                  <h3 className="font-orbitron font-bold text-sm text-slate-100 group-hover:text-emerald-300 transition-colors">
                                    {step.badgeTitle || step.title}
                                  </h3>
                                </div>
                              </div>
                              <p className="text-xs text-slate-300 font-space leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {/* Node 3 Right: Description for Online Round (Prelims) */}
                        {step.id === 3 && (
                          <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="w-full max-w-sm"
                          >
                            <div className="p-4 rounded-2xl bg-[#061425]/90 border border-sky-500/30 text-slate-200 text-xs font-space leading-relaxed shadow-[0_0_15px_rgba(56,189,248,0.1)]">
                              <p className="text-slate-200 font-medium">
                                Expert panels conduct preliminary online evaluation of submitted presentations & codebase. Top shortlisted teams advance to TCET offline round.
                              </p>
                              <div className="mt-2.5 pt-2 border-t border-sky-500/20 flex items-center gap-1.5 text-[10px] font-mono text-sky-400">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Shortlist announced before Hackathon Event Day</span>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Node 4 Right: Cyber Badge for Hackathon Event Day */}
                        {step.id === 4 && (
                          <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            onMouseEnter={() => sfx.playHover()}
                            className="w-full max-w-sm"
                          >
                            <div className={`glass-panel p-4 rounded-2xl border ${styles.badgeBorder} ${styles.badgeBg} ${styles.badgeGlow} transition-all hover:scale-105 duration-300 relative group`}>
                              <div className="flex items-center gap-3 mb-2">
                                <div className="p-2.5 rounded-xl bg-purple-950/90 border border-purple-400/50 text-purple-300 shadow-[0_0_12px_rgba(192,132,252,0.3)]">
                                  <Users className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                  <span className="text-[10px] font-mono text-purple-400 tracking-wider uppercase font-semibold">
                                    STEP 4 • MAIN STAGE
                                  </span>
                                  <h3 className="font-orbitron font-bold text-sm text-slate-100 group-hover:text-purple-300 transition-colors">
                                    {step.badgeTitle || step.title}
                                  </h3>
                                </div>
                              </div>
                              <p className="text-xs text-slate-300 font-space leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Final Trophy Milestone Node (Node 5) */}
                  {isTrophy && (
                    <div className="relative pt-6 flex flex-col items-center">
                      {/* Concentric Trophy Base Node */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative z-20 mb-6"
                      >
                        <div className={`w-20 h-20 rounded-full ${styles.nodeBg} border-2 ${styles.nodeBorder} ${styles.nodeGlow} flex items-center justify-center relative`}>
                          <div className="absolute -inset-2 rounded-full border border-dashed border-amber-400/60 animate-spin" style={{ animationDuration: '20s' }} />
                          <Trophy className="w-9 h-9 text-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.9)] animate-pulse" />
                        </div>
                      </motion.div>

                      {/* Winners Announced Cyber Badge (Matching Poster Base) */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        onMouseEnter={() => sfx.playHover()}
                        className="w-full max-w-md text-center"
                      >
                        <div className={`glass-panel p-6 rounded-3xl border-2 ${styles.badgeBorder} ${styles.badgeBg} ${styles.badgeGlow} relative overflow-hidden group shadow-[0_0_40px_rgba(0,229,255,0.25)]`}>
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-cyan-400" />
                            <span className="font-orbitron font-extrabold text-lg text-slate-100 tracking-wider">
                              Winners Announced
                            </span>
                          </div>
                          <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold tracking-widest uppercase mb-3">
                            09th October
                          </div>
                          <p className="text-xs text-slate-300 font-space leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE RESPONSIVE ROADMAP (< md screens) */}
        {/* ============================================================ */}
        <div className="block md:hidden relative py-4">
          {/* Vertical Track on Left */}
          <div className="absolute top-6 bottom-6 left-6 w-1 bg-gradient-to-b from-cyan-400 via-emerald-400 via-purple-500 to-amber-400 shadow-[0_0_15px_rgba(0,229,255,0.8)] z-0 rounded-full" />

          <div className="space-y-8">
            {TIMELINE_STEPS.map((step) => {
              const styles = getThemeStyles(step.colorTheme);
              const IconComp = getStepIcon(step.iconName);
              const isTrophy = step.stepNumber === '🏆';

              return (
                <div key={step.id} className="relative flex items-start pl-14">
                  {/* Left Node Circle */}
                  <div className="absolute left-6 -translate-x-1/2 top-3 z-20">
                    <div className={`w-11 h-11 rounded-full ${styles.nodeBg} border-2 ${styles.nodeBorder} ${styles.nodeGlow} flex items-center justify-center`}>
                      {isTrophy ? (
                        <Trophy className="w-5 h-5 text-amber-300" />
                      ) : (
                        <span className={`font-orbitron font-bold text-sm ${styles.nodeText}`}>
                          {step.stepNumber}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className={`w-full glass-panel p-5 rounded-2xl border ${styles.badgeBorder} ${styles.badgeBg} ${styles.badgeGlow} relative`}>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${styles.badgeChip} font-semibold uppercase`}>
                        {step.phase}
                      </span>
                      {step.highlightTag && (
                        <span className="text-[10px] font-mono text-cyan-400 font-bold">
                          {step.highlightTag}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-cyan-300">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="font-orbitron font-bold text-base text-slate-100">
                        {step.badgeTitle || step.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-300 font-space leading-relaxed">
                      {step.description}
                    </p>

                    {step.id === 0 && (
                      <div className="mt-3 pt-3 border-t border-cyan-500/20">
                        <a
                          href={EVENT_DETAILS.googleFormUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sfx.playClick()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 text-black font-orbitron font-bold text-xs tracking-wider shadow-[0_0_12px_rgba(0,229,255,0.4)] cursor-pointer"
                        >
                          REGISTER NOW
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* FULL RESOLUTION POSTER LIGHTBOX MODAL */}
      {/* ============================================================ */}
      <AnimatePresence>
        {posterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl glass-panel rounded-3xl p-5 md:p-6 border-2 border-cyan-400/50 shadow-[0_0_50px_rgba(0,229,255,0.3)] text-slate-100 my-6 max-h-[92vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-orbitron font-bold text-base text-cyan-300">
                      OFFICIAL EVENT FLOW POSTER
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400">
                      THINK AI 4.0 • IETE Student Forum @ TCET Mumbai
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sfx.playClick();
                    setPosterModalOpen(false);
                  }}
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Poster Image Container */}
              <div className="flex-1 overflow-y-auto rounded-2xl border border-cyan-500/30 bg-black/60 p-2 flex justify-center items-center">
                <img
                  src="/images/event_flow_poster.png"
                  alt="THINK AI 4.0 Event Flow Poster"
                  className="max-w-full max-h-[68vh] object-contain rounded-xl shadow-[0_0_30px_rgba(0,229,255,0.2)]"
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-3 text-xs">
                <span className="font-mono text-slate-400 text-[11px]">
                  Official roadmap timeline: 0 → 1 → 2 → 3 → 4 → Winners Announced
                </span>
                <a
                  href="/images/event_flow_poster.png"
                  download="THINK_AI_4.0_Event_Flow.png"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-400/50 hover:bg-cyan-500/20 text-cyan-300 font-mono text-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Image
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
