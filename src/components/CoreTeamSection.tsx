import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, Shield, Sparkles, Upload, Check } from 'lucide-react';
import { CORE_TEAM_MEMBERS } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

interface MemberCardProps {
  member: typeof CORE_TEAM_MEMBERS[0];
  index: number;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, index }) => {
  const [currentImg, setCurrentImg] = useState<string>(member.avatarPlaceholder);
  const [customUploaded, setCustomUploaded] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const cleanPhone = member.phone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(member.role)},%20I%20have%20a%20query%20regarding%20THINK%20AI%204.0.`;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCurrentImg(event.target.result as string);
          setCustomUploaded(true);
          sfx.playLaserScan();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageError = () => {
    // Try alternate local paths if primary fails
    if (member.fileName && currentImg === `/images/${member.fileName}`) {
      setCurrentImg(`/${member.fileName}`);
    }
  };

  return (
    <motion.div
      key={member.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => sfx.playHover()}
      className="w-full max-w-sm relative glass-panel glass-panel-hover rounded-3xl p-6 border border-cyan-500/30 hover:border-cyan-400 flex flex-col items-center text-center group overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
    >
      {/* Corner Cyber Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-400/20 to-transparent pointer-events-none rounded-tr-3xl" />
      <div className="absolute top-3 right-3 text-[9px] font-mono text-cyan-400/60 uppercase">
        ISF-0{index + 1}
      </div>

      {/* Team Member Photo Frame */}
      <div className="relative mb-5 mt-2">
        <div className="w-36 h-36 rounded-2xl p-1 bg-gradient-to-br from-cyan-400 via-sky-300 to-cyan-600 shadow-[0_0_25px_rgba(0,229,255,0.35)] group-hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] group-hover:scale-105 transition-all duration-300 overflow-hidden relative">
          <img
            src={currentImg}
            alt={member.role}
            onError={handleImageError}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top rounded-xl transition-all duration-300"
          />

          {/* Quick Photo Upload Overlay */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title={`Upload ${member.fileName || 'custom photo'}`}
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-cyan-300 transition-opacity duration-200 cursor-pointer rounded-xl"
          >
            <Upload className="w-5 h-5 mb-1 text-cyan-400" />
            <span className="text-[10px] font-mono font-bold tracking-tight">
              {customUploaded ? 'Update Photo' : 'Replace Photo'}
            </span>
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        <span className="absolute -bottom-2 right-2 p-1.5 rounded-xl bg-[#070E1A] border border-cyan-400 text-cyan-300 text-xs shadow-lg flex items-center justify-center">
          {customUploaded ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Shield className="w-4 h-4 text-cyan-400" />
          )}
        </span>
      </div>

      {/* Post / Designation (Using Exact File Name) */}
      <div className="mb-2">
        <span className="inline-block px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-400/50 text-cyan-300 font-orbitron font-bold text-sm tracking-wider uppercase shadow-[0_0_12px_rgba(0,229,255,0.2)]">
          {member.role}
        </span>
      </div>

      {/* File Name Tag */}
      {member.fileName && (
        <span className="text-[10px] font-mono text-cyan-400/60 mb-2">
          File: {member.fileName}
        </span>
      )}

      {/* Department */}
      <p className="text-xs font-space text-slate-400 mb-4">
        {member.department}
      </p>

      {/* Contact Phone Pill */}
      <div className="w-full py-2 px-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 mb-5 flex items-center justify-center gap-2">
        <Phone className="w-3.5 h-3.5 text-cyan-400" />
        <span>{member.phone}</span>
      </div>

      {/* Action Buttons: Call & WhatsApp */}
      <div className="w-full grid grid-cols-2 gap-2.5 mt-auto pt-4 border-t border-slate-800/80">
        <a
          href={`tel:${cleanPhone}`}
          onClick={() => sfx.playClick()}
          className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 text-cyan-400" />
          CALL
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sfx.playClick()}
          className="py-2.5 px-3 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] active:scale-95 cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 text-cyan-300" />
          WHATSAPP
        </a>
      </div>
    </motion.div>
  );
};

export const CoreTeamSection: React.FC = () => {
  return (
    <section id="team" className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-slate-100 tracking-tight">
            MEET OUR <span className="text-cyan-400 cyan-glow-text">CORE TEAM</span>
          </h2>
          <p className="text-slate-400 font-space text-sm sm:text-base">
            IETE Student Forum (ISF) committee heads driving the vision and execution of THINK AI 4.0 at TCET Mumbai.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full" />
        </div>

        {/* 5 Core Team Members Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {CORE_TEAM_MEMBERS.map((member, index) => (
            <MemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
