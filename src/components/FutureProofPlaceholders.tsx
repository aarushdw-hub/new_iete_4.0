import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Image, Award, Users, HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { FAQ_LIST } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

export const FutureProofPlaceholders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faqs' | 'sponsors' | 'judges' | 'gallery'>('faqs');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const tabs = [
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'sponsors', label: 'Sponsors & Partners', icon: Sparkles },
    { id: 'judges', label: 'Eminent Judges & Speakers', icon: Award },
    { id: 'gallery', label: 'Photo Gallery', icon: Image },
  ];

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-slate-100 tracking-tight">
            ADDITIONAL <span className="text-cyan-400 cyan-glow-text">RESOURCES</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full" />
        </div>

        {/* Tab Selection Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sfx.playClick();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`px-5 py-3 rounded-2xl font-orbitron font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(0,229,255,0.3)]'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <IconComp className="w-4 h-4 text-cyan-400" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Container */}
        <div className="glass-panel rounded-3xl p-6 md:p-10 border border-cyan-500/30 shadow-[0_0_30px_rgba(0,229,255,0.15)]">
          {/* FAQs Tab */}
          {activeTab === 'faqs' && (
            <div className="space-y-4">
              <h3 className="font-orbitron font-bold text-xl text-cyan-200 mb-6">
                FREQUENTLY ASKED QUESTIONS
              </h3>

              {FAQ_LIST.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => {
                        sfx.playClick();
                        setExpandedFaq(isOpen ? null : idx);
                      }}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-space font-semibold text-sm text-slate-100 hover:text-cyan-300 transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-4 pt-1 text-xs text-slate-300 font-space leading-relaxed border-t border-slate-800/60">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Sponsors & Partners Tab */}
          {activeTab === 'sponsors' && (
            <div className="text-center space-y-8">
              <div>
                <h3 className="font-orbitron font-bold text-xl text-cyan-200 mb-2">
                  SPONSORS & ECOSYSTEM PARTNERS
                </h3>
                <p className="text-xs text-slate-400 font-space">
                  Supported by world-class academic forums and technology pioneers.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: 'IETE India', badge: 'PRINCIPAL ORGANIZER' },
                  { name: 'TCET Mumbai', badge: 'HOST INSTITUTION' },
                  { name: 'NVIDIA Inception (Community)', badge: 'ECOSYSTEM PARTNER' },
                  { name: 'OpenAI Community', badge: 'AI ADVOCATE' },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/20 hover:border-cyan-400 transition-all flex flex-col justify-center items-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 font-orbitron font-black text-xl mb-3">
                      {s.name.slice(0, 2)}
                    </div>
                    <h4 className="font-orbitron font-bold text-sm text-slate-200 mb-1">{s.name}</h4>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded">
                      {s.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Judges & Speakers Tab */}
          {activeTab === 'judges' && (
            <div className="text-center space-y-6">
              <h3 className="font-orbitron font-bold text-xl text-cyan-200 mb-2">
                EMINENT JUDGES & AI EXPERTS
              </h3>
              <p className="text-xs text-slate-400 font-space mb-6">
                Panelist profiles will be unveiled upon Problem Statement release.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3"
                  >
                    <div className="w-20 h-20 rounded-full bg-slate-800 border border-cyan-500/30 mx-auto flex items-center justify-center text-slate-500 font-mono text-xs">
                      [ JUDGE {num} ]
                    </div>
                    <h4 className="font-orbitron font-bold text-sm text-slate-300">
                      Senior AI Researcher / Industry Lead
                    </h4>
                    <p className="text-xs font-mono text-cyan-400">
                      Domain Expert Panelist
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="text-center space-y-6">
              <h3 className="font-orbitron font-bold text-xl text-cyan-200 mb-2">
                EVENT HIGHLIGHTS & MEMORIES
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
                ].map((img, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-cyan-500/30 group">
                    <img
                      src={img}
                      alt={`THINK AI Highlight ${i + 1}`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
