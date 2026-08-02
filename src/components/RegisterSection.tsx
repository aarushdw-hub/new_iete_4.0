import React from 'react';
import { motion } from 'motion/react';
import { QrCode, ExternalLink, Calendar, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

interface Props {
  onOpenRegisterModal: () => void;
}

export const RegisterSection: React.FC<Props> = ({ onOpenRegisterModal }) => {
  return (
    <section id="register" className="py-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-panel rounded-3xl p-8 md:p-12 border-2 border-cyan-400/50 shadow-[0_0_60px_rgba(0,229,255,0.25)] overflow-hidden"
        >
          {/* Top Laser Scanner Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Information */}
            <div className="lg:col-span-7 space-y-6">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-400/30 inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                SECURE YOUR TEAM SLOT
              </span>

              <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-slate-100 leading-tight">
                REGISTER FOR <br />
                <span className="text-cyan-400 cyan-glow-text">THINK AI 4.0</span>
              </h2>

              <p className="text-sm font-space text-slate-300 leading-relaxed">
                Join Mumbai's flagship student AI competition. Form your team of 2–4 members, select your challenge track, pay the ₹119 entry fee, and present your project before experts on 18th September 2025 at TCET.
              </p>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Entry Fee:</span>
                  <span className="text-cyan-300 font-bold">{EVENT_DETAILS.entryFee} per Team</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Team Size:</span>
                  <span className="text-cyan-300 font-bold">{EVENT_DETAILS.teamSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Deadline:</span>
                  <span className="text-cyan-300 font-bold">{EVENT_DETAILS.registrationDeadline}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    sfx.playClick();
                    onOpenRegisterModal();
                  }}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-400 text-black font-orbitron font-extrabold text-sm hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,229,255,0.4)] flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  ONLINE REGISTRATION FORM
                </button>

                <a
                  href={EVENT_DETAILS.googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sfx.playClick()}
                  className="px-6 py-4 rounded-2xl bg-slate-900 border border-cyan-400/50 text-cyan-300 font-orbitron font-semibold text-xs hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                  GOOGLE FORM LINK
                </a>
              </div>
            </div>

            {/* Right Column: Simulated QR Scanner Box */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative p-6 rounded-3xl bg-[#0A0F18] border border-cyan-400/40 shadow-[0_0_30px_rgba(0,229,255,0.2)] text-center group">
                <p className="text-xs font-mono font-bold text-cyan-300 mb-3 uppercase tracking-wider">
                  SCAN TO PAY (UPI QR)
                </p>

                {/* QR Box with Laser Scan Effect */}
                <div className="relative w-48 h-48 mx-auto bg-white p-3 rounded-2xl shadow-inner overflow-hidden flex items-center justify-center">
                  <QrCode className="w-full h-full text-black" />

                  {/* Animated Cyan Laser Line */}
                  <div className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_#00E5FF] animate-scanline" />
                </div>

                <div className="mt-4 space-y-1">
                  <span className="font-orbitron font-bold text-lg text-cyan-300">
                    UPI ID: iete.tcet@upi
                  </span>
                  <p className="text-[11px] font-mono text-slate-400">
                    Scan using PhonePe, Google Pay, or Paytm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
