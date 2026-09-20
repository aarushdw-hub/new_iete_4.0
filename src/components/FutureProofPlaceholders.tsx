import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_LIST } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

export const FutureProofPlaceholders: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-slate-100 tracking-tight">
            FREQUENTLY ASKED <span className="text-cyan-400 cyan-glow-text">QUESTIONS</span>
          </h2>
          <p className="text-slate-400 font-space text-sm sm:text-base">
            Everything you need to know about THINK AI 4.0 registration, rules, and event day.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full" />
        </div>

        {/* FAQs Accordion Container */}
        <div className="glass-panel rounded-3xl p-6 md:p-10 border border-cyan-500/30 shadow-[0_0_30px_rgba(0,229,255,0.15)] space-y-4">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all hover:border-cyan-500/30"
              >
                <button
                  onClick={() => {
                    sfx.playClick();
                    setExpandedFaq(isOpen ? null : idx);
                  }}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-space font-semibold text-sm text-slate-100 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 font-space leading-relaxed border-t border-slate-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
