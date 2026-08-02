import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Sparkles, Radio, Zap, Scan } from 'lucide-react';
import { EVENT_DETAILS, FAQ_LIST } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
  initialBot?: string;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  botName?: string;
}

export const BotAssistantDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  onOpenRegister,
  initialBot = 'NEXUS-AI',
}) => {
  const [activeBot, setActiveBot] = useState<string>(initialBot);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Greetings! I am NEXUS-AI, your official companion for THINK AI 4.0. How can I assist you with team registration, problem tracks, prizes (₹7,000 pool), or event guidelines today?`,
      botName: 'NEXUS-AI',
    },
  ]);

  useEffect(() => {
    if (initialBot) {
      setActiveBot(initialBot);
    }
  }, [initialBot]);

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

    // Process Bot Answer based on active persona
    setTimeout(() => {
      sfx.playRobotChirp();
      const query = textToSend.toLowerCase();
      let response = `[${activeBot} Status]: I'm synchronized with THINK AI 4.0 systems. Registration is ₹119 per team (2-4 members), held on 18th Sept at TCET Mumbai with a ₹7,000 prize pool!`;

      if (query.includes('fee') || query.includes('price') || query.includes('cost') || query.includes('pay')) {
        response = `[${activeBot} System]: Entry fee is ₹119 per team. A single pass covers all 2 to 4 team members!`;
      } else if (query.includes('date') || query.includes('when')) {
        response = `[${activeBot} System]: THINK AI 4.0 event is scheduled for 18th September 2025 at TCET Campus. Registrations close on 16th September.`;
      } else if (query.includes('prize') || query.includes('award') || query.includes('win')) {
        response = `[${activeBot} System]: Total Prize Pool: ₹7,000! 1st: ₹4,000 | 2nd: ₹2,000 | 3rd: ₹1,000 + Trophies & AICTE activity points!`;
      } else if (query.includes('team') || query.includes('size') || query.includes('member')) {
        response = `[${activeBot} System]: Teams require 2 to 4 members. Inter-departmental and cross-year teams are welcome!`;
      } else if (query.includes('where') || query.includes('location') || query.includes('venue')) {
        response = `[${activeBot} System]: Venue is Thakur College of Engineering & Technology (TCET), Kandivali East, Mumbai.`;
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'bot', text: response, botName: activeBot },
      ]);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed bottom-4 right-4 z-50 w-full max-w-sm glass-panel rounded-3xl border border-cyan-400/50 shadow-[0_0_40px_rgba(0,229,255,0.3)] overflow-hidden flex flex-col h-[540px]"
        >
          {/* Header */}
          <div className="p-4 bg-[#0A0F18]/90 border-b border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-sm text-cyan-200">
                  AI ASSISTANT HUB
                </h3>
                <p className="text-[10px] font-mono text-cyan-400">
                  Persona: {activeBot} • Neural Sync Active
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Bot Selector Chips */}
          <div className="p-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-around gap-1 text-[10px] font-mono">
            {[
              { name: 'JARVIS-01', icon: Radio },
              { name: 'NEXUS-X', icon: Zap },
              { name: 'NANO-AI', icon: Bot },
            ].map((bot) => {
              const IconComp = bot.icon;
              const isSelected = activeBot === bot.name;
              return (
                <button
                  key={bot.name}
                  onClick={() => {
                    sfx.playClick();
                    setActiveBot(bot.name);
                  }}
                  className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <IconComp className="w-3 h-3" />
                  <span>{bot.name}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Questions */}
          <div className="p-2 bg-slate-950/40 border-b border-slate-800 flex gap-1.5 overflow-x-auto text-[11px] font-mono">
            {[
              'Entry Fee?',
              'Prize Pool?',
              'Event Date?',
              'Team Size?',
            ].map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 whitespace-nowrap hover:bg-cyan-900 transition-colors cursor-pointer"
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
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-cyan-500 text-black font-semibold'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#0A0F18] border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder={`Ask ${activeBot} about THINK AI...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

