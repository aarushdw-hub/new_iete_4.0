import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { sfx } from '../utils/audioSFX';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

export const BotAssistantDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  onOpenRegister,
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Hello! I am THINKBOT, your official AI assistant for THINK AI 4.0 at TCET Mumbai. How can I assist you today with registration (₹119/team), problem tracks, prizes (₹7,000 pool), or guidelines?`,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim()) return;

    sfx.playClick();
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInput('');

    // Process THINKBOT Response
    setTimeout(() => {
      sfx.playRobotChirp();
      const query = textToSend.toLowerCase();
      let response = `[THINKBOT]: I'm synchronized with THINK AI 4.0! Teams of 2-4 members can register for ₹119. The event happens on 18th Sept 2025 at TCET Mumbai with a ₹7,000 prize pool!`;

      if (query.includes('fee') || query.includes('price') || query.includes('cost') || query.includes('pay') || query.includes('₹') || query.includes('119')) {
        response = `[THINKBOT]: The entry fee is ₹119 per team! A single pass covers the entire team (2 to 4 members). No individual member fees are required.`;
      } else if (query.includes('date') || query.includes('when') || query.includes('time') || query.includes('schedule')) {
        response = `[THINKBOT]: Event Date: 18th September 2025 at TCET Campus. Registrations close on 16th September 2025.`;
      } else if (query.includes('prize') || query.includes('award') || query.includes('win') || query.includes('cash')) {
        response = `[THINKBOT]: Total Prize Pool is ₹7,000! 🥇 1st Place: ₹4,000 | 🥈 2nd Place: ₹2,000 | 🥉 3rd Place: ₹1,000. All participants receive verified certificates & AICTE activity points!`;
      } else if (query.includes('team') || query.includes('size') || query.includes('member') || query.includes('solo')) {
        response = `[THINKBOT]: Teams must have 2 to 4 members. Cross-department, inter-college, and cross-year teams are warmly welcome!`;
      } else if (query.includes('where') || query.includes('location') || query.includes('venue') || query.includes('address')) {
        response = `[THINKBOT]: Venue: Thakur College of Engineering & Technology (TCET), A-Block Seminar Hall & Labs, Kandivali East, Mumbai.`;
      } else if (query.includes('track') || query.includes('problem') || query.includes('domain') || query.includes('topic')) {
        response = `[THINKBOT]: Problem Tracks include: Generative AI & LLMs, Computer Vision & Edge Robotics, AI in Healthcare, Climate & Smart Cities, Cyber Defense & Financial Intelligence, plus an Open Innovation Track!`;
      } else if (query.includes('register') || query.includes('apply') || query.includes('link')) {
        response = `[THINKBOT]: You can register immediately by clicking the 'REGISTER NOW' button on the website. Fast, online UPI payment and spot verification are supported!`;
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'bot', text: response },
      ]);
    }, 450);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md glass-panel rounded-3xl border border-cyan-400/50 shadow-[0_0_50px_rgba(0,229,255,0.3)] overflow-hidden flex flex-col h-[560px]"
        >
          {/* Header */}
          <div className="p-4 bg-[#0A0F18]/95 border-b border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                <Bot className="w-5 h-5 animate-pulse" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-orbitron font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-200">
                    THINKBOT
                  </h3>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-semibold">
                    AI AGENT
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400">
                  Official Companion • THINK AI 4.0
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400/40 hover:text-cyan-300 text-slate-400 transition-all cursor-pointer"
              title="Close THINKBOT"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="p-2.5 bg-slate-950/60 border-b border-slate-800/80 flex gap-1.5 overflow-x-auto text-[11px] font-mono no-scrollbar">
            {[
              'Entry Fee?',
              'Prize Pool?',
              'Event Date & Venue?',
              'Problem Tracks?',
              'Team Size?',
            ].map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 whitespace-nowrap hover:bg-cyan-900 hover:border-cyan-300 transition-all cursor-pointer text-[10px]"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-space text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-sky-400 text-black font-semibold shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                      : 'bg-slate-900/90 border border-cyan-500/20 text-slate-200 shadow-md'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar & Register Prompt */}
          <div className="p-3 bg-[#0A0F18]/95 border-t border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask THINKBOT about THINK AI 4.0..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-space"
              />
              <button
                onClick={() => handleSend()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-black font-bold hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
              className="w-full py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] font-mono hover:bg-cyan-500/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Ready to compete? Register your team for ₹119 →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
