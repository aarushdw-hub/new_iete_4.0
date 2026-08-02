import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Search, Sparkles, Filter } from 'lucide-react';
import { PROBLEM_TRACKS } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

export const ProblemTracks: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Generative AI', 'Robotics & CV', 'Healthcare', 'Sustainability', 'Cyber Intelligence', 'Open Track'];

  const filteredTracks = PROBLEM_TRACKS.filter((track) => {
    const matchesCategory = activeCategory === 'All' || track.category === activeCategory;
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="problem-tracks" className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider uppercase">
            // CHALLENGE DOMAINS
          </span>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-slate-100 tracking-tight">
            AI PROBLEM <span className="text-cyan-400 cyan-glow-text">TRACKS</span>
          </h2>
          <p className="text-slate-400 font-space text-sm sm:text-base">
            Choose your arena and engineer high-impact intelligent systems.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full" />
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
            <input
              type="text"
              placeholder="Search problem statements, technologies, or keywords (e.g. Gemini, OpenCV, RAG)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-panel border border-cyan-500/30 text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all font-space"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5 text-cyan-400" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sfx.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track, idx) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onMouseEnter={() => sfx.playHover()}
              className="glass-panel glass-panel-hover p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    {track.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Difficulty: <span className="text-cyan-300">{track.difficulty}</span>
                  </span>
                </div>

                <h3 className="font-orbitron font-bold text-lg text-slate-100 group-hover:text-cyan-300 transition-colors mb-2.5 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400 shrink-0" />
                  {track.title}
                </h3>

                <p className="text-xs text-slate-300 font-space leading-relaxed mb-4">
                  {track.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                  {track.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
