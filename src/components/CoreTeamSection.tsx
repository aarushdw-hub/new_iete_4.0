import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, Shield, Mail, UserCheck } from 'lucide-react';
import { CORE_TEAM_MEMBERS } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

export const CoreTeamSection: React.FC = () => {
  return (
    <section id="team" className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider uppercase">
            // LEADERSHIP & ORGANIZERS
          </span>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-slate-100 tracking-tight">
            MEET OUR <span className="text-cyan-400 cyan-glow-text">CORE TEAM</span>
          </h2>
          <p className="text-slate-400 font-space text-sm sm:text-base">
            IETE Student Forum committee members leading THINK AI 4.0 execution at TCET.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full" />
        </div>

        {/* 6 Profile Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_TEAM_MEMBERS.map((member, index) => {
            const cleanPhone = member.phone.replace(/[^0-9]/g, '');
            const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(member.name)},%20I%20have%20a%20query%20regarding%20THINK%20AI%204.0.`;

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onMouseEnter={() => sfx.playHover()}
                className="relative glass-panel glass-panel-hover rounded-3xl p-6 border border-cyan-500/30 hover:border-cyan-400 flex flex-col items-center text-center group overflow-hidden"
              >
                {/* Top Corner Frame Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-400/20 to-transparent pointer-events-none" />

                {/* Circular Photo Frame */}
                <div className="relative mb-5">
                  <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-500 shadow-[0_0_25px_rgba(0,229,255,0.4)] group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={member.avatarPlaceholder}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <span className="absolute bottom-1 right-1 p-1.5 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 text-xs shadow-md">
                    <Shield className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Member Details */}
                <h3 className="font-orbitron font-bold text-xl text-slate-100 group-hover:text-cyan-300 transition-colors mb-1">
                  {member.name}
                </h3>

                <p className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  {member.role}
                </p>

                <p className="text-[11px] font-space text-slate-400 mb-4">
                  {member.department}
                </p>

                <div className="w-full py-2 px-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 mb-5 flex items-center justify-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{member.phone}</span>
                </div>

                {/* Action Buttons: Call & WhatsApp */}
                <div className="w-full grid grid-cols-2 gap-2 mt-auto pt-4 border-t border-slate-800">
                  <a
                    href={`tel:${cleanPhone}`}
                    onClick={() => sfx.playClick()}
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
                  >
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    CALL
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sfx.playClick()}
                    className="py-2.5 px-3 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)] active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-300" />
                    WHATSAPP
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
