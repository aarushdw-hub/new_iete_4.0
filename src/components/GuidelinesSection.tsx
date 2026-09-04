import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, FileText, CheckSquare, Download } from 'lucide-react';
import { GUIDELINES_CHECKLIST } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

interface Props {
  onOpenRulebook: () => void;
}

export const GuidelinesSection: React.FC<Props> = ({ onOpenRulebook }) => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleCheck = (id: number) => {
    sfx.playClick();
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  return (
    <section id="guidelines" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-slate-100 tracking-tight">
            COMPETITION <span className="text-cyan-400 cyan-glow-text">GUIDELINES</span>
          </h2>
          <p className="text-slate-400 font-space text-sm sm:text-base">
            Essential rules, code ethics, presentation requirements, and submission standards.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full" />
        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {GUIDELINES_CHECKLIST.map((item) => {
            const isChecked = checkedItems.includes(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                onClick={() => toggleCheck(item.id)}
                onMouseEnter={() => sfx.playHover()}
                className={`glass-panel glass-panel-hover p-6 rounded-2xl border ${
                  isChecked ? 'border-cyan-400 bg-cyan-950/30' : 'border-cyan-500/20'
                } cursor-pointer transition-all flex items-start gap-4 group`}
              >
                <div
                  className={`p-2.5 rounded-xl border transition-all ${
                    isChecked
                      ? 'bg-cyan-500 text-black border-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.5)]'
                      : 'bg-slate-900 text-cyan-400 border-cyan-500/30 group-hover:border-cyan-400'
                  }`}
                >
                  <CheckSquare className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-orbitron font-bold text-base text-slate-100 group-hover:text-cyan-300 transition-colors mb-1.5 flex items-center gap-2">
                    {item.title}
                    {isChecked && (
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded">
                        ACKNOWLEDGED
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-300 font-space leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Download / Full Rulebook CTA */}
        <div className="text-center">
          <button
            onClick={() => {
              sfx.playClick();
              onOpenRulebook();
            }}
            className="px-8 py-4 rounded-2xl bg-slate-900 border border-cyan-400/60 text-cyan-300 font-orbitron font-bold text-sm hover:bg-cyan-950 hover:border-cyan-300 transition-all shadow-[0_0_25px_rgba(0,229,255,0.2)] inline-flex items-center gap-2.5 cursor-pointer"
          >
            <FileText className="w-5 h-5 text-cyan-400" />
            OPEN COMPLETE OFFICIAL RULEBOOK DOCUMENT
          </button>
        </div>
      </div>
    </section>
  );
};
