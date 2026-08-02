import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Check, Download, ShieldAlert } from 'lucide-react';
import { EVENT_DETAILS, GUIDELINES_CHECKLIST } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
}

export const RulebookModal: React.FC<Props> = ({ isOpen, onClose, onOpenRegister }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-3xl glass-panel rounded-3xl p-6 md:p-8 border-2 border-cyan-400/50 shadow-[0_0_50px_rgba(0,229,255,0.3)] text-slate-100 my-8 max-h-[85vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-4 mb-4">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-orbitron font-extrabold text-cyan-200">
                OFFICIAL RULEBOOK & GUIDELINES
              </h2>
              <p className="text-xs font-mono text-slate-400">
                THINK AI 4.0 • IETE Student Forum @ TCET Mumbai
              </p>
            </div>
          </div>

          {/* Document Content Body */}
          <div className="flex-1 overflow-y-auto space-y-6 font-space text-xs pr-2">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 leading-relaxed text-slate-300 space-y-2">
              <h3 className="font-orbitron font-bold text-sm text-cyan-300">1. EVENT OVERVIEW</h3>
              <p>
                THINK AI 4.0 is an inter-collegiate AI innovation hackathon & pitch contest organized by IETE Student Forum at Thakur College of Engineering and Technology (TCET), Mumbai.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 leading-relaxed text-slate-300 space-y-2">
              <h3 className="font-orbitron font-bold text-sm text-cyan-300">2. ELIGIBILITY & TEAM RULES</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Participation is open to all engineering, polytechnic, and degree college students across India.</li>
                <li>Teams must consist of 2 to 4 members.</li>
                <li>Members can belong to different years or departments.</li>
                <li>Entry fee is strictly ₹119 per team.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 leading-relaxed text-slate-300 space-y-2">
              <h3 className="font-orbitron font-bold text-sm text-cyan-300">3. CODE OF ETHICS & ORIGINALITY</h3>
              <p>
                All submitted code and architecture diagrams must be original or appropriately cited. Plagiarism, copying commercial APIs without attribution, or cheating will result in immediate disqualification.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 leading-relaxed text-slate-300 space-y-2">
              <h3 className="font-orbitron font-bold text-sm text-cyan-300">4. JUDGING CRITERIA</h3>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">• Innovation & Originality (30%)</div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">• Technical Execution (30%)</div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">• Practical Impact (20%)</div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">• Presentation & Demo (20%)</div>
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => {
                sfx.playClick();
                alert('Downloading Official THINK AI 4.0 Rulebook PDF brochure...');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-mono text-xs hover:border-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              Download PDF Brochure
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
              className="px-6 py-2.5 rounded-xl bg-cyan-400 text-black font-orbitron font-bold text-xs hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)]"
            >
              I AGREE — REGISTER TEAM (₹119)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
