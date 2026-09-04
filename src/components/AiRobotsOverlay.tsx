import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Radio, Zap, Scan, Sparkles, Volume2, X } from 'lucide-react';
import { sfx } from '../utils/audioSFX';

interface Robot {
  id: string;
  name: string;
  role: string;
  xPercent: number; // 0 - 100
  yPercent: number; // 0 - 100
  vx: number;
  vy: number;
  status: string;
  isScanning: boolean;
  color: string;
}

const INITIAL_ROBOTS: Robot[] = [
  {
    id: 'bot-jarvis',
    name: 'JARVIS-01',
    role: 'Aerial Sentinel Drone',
    xPercent: 12,
    yPercent: 28,
    vx: 0.08,
    vy: 0.05,
    status: 'Patrolling Hero Zone • Neural Sync 99.8%',
    isScanning: false,
    color: '#00E5FF',
  },
  {
    id: 'bot-scout',
    name: 'NEXUS-X',
    role: 'Cyber Scout Orb',
    xPercent: 82,
    yPercent: 45,
    vx: -0.07,
    vy: 0.06,
    status: 'Scanning Event Prize Pool • ₹10,000 RS Verified',
    isScanning: false,
    color: '#38BDF8',
  },
  {
    id: 'bot-nano',
    name: 'NANO-AI',
    role: 'Assistant Companion',
    xPercent: 78,
    yPercent: 85,
    vx: 0.05,
    vy: -0.04,
    status: 'Ready to assist with Registration & Timeline',
    isScanning: false,
    color: '#0284C7',
  },
];

interface Props {
  onOpenBotChat?: () => void;
}

export const AiRobotsOverlay: React.FC<Props> = ({ onOpenBotChat }) => {
  const [robots, setRobots] = useState<Robot[]>(INITIAL_ROBOTS);
  const [selectedBot, setSelectedBot] = useState<Robot | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRobots((prev) =>
        prev.map((bot) => {
          let nextX = bot.xPercent + bot.vx;
          let nextY = bot.yPercent + bot.vy;
          let nextVx = bot.vx;
          let nextVy = bot.vy;

          // Bounce off boundary cushions (keep between 5% and 92%)
          if (nextX < 5 || nextX > 90) nextVx = -bot.vx;
          if (nextY < 12 || nextY > 88) nextVy = -bot.vy;

          // Random chance to toggle laser scan beam
          const shouldScan = Math.random() < 0.08 ? !bot.isScanning : bot.isScanning;

          return {
            ...bot,
            xPercent: nextX,
            yPercent: nextY,
            vx: nextVx,
            vy: nextVy,
            isScanning: shouldScan,
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleBotClick = (bot: Robot) => {
    sfx.playRobotChirp();
    setSelectedBot(bot);
  };

  const triggerScan = (botId: string) => {
    sfx.playLaserScan();
    setRobots((prev) =>
      prev.map((b) => (b.id === botId ? { ...b, isScanning: true } : b))
    );
    setTimeout(() => {
      setRobots((prev) =>
        prev.map((b) => (b.id === botId ? { ...b, isScanning: false } : b))
      );
    }, 2500);
  };

  return (
    <>
      {/* Floating Autonomous Robots */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {robots.map((bot) => (
          <div
            key={bot.id}
            style={{
              left: `${bot.xPercent}%`,
              top: `${bot.yPercent}%`,
            }}
            className="absolute transition-all duration-300 ease-out pointer-events-auto cursor-pointer group"
            onClick={() => handleBotClick(bot)}
          >
            {/* Robot Graphic Container */}
            <div className="relative flex flex-col items-center">
              {/* Laser Beam effect when scanning */}
              {bot.isScanning && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 0.8, height: 120 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="absolute top-10 w-24 bg-gradient-to-b from-cyan-400/50 via-cyan-500/20 to-transparent blur-[1px] pointer-events-none rounded-b-full flex justify-center items-center overflow-hidden"
                >
                  <div className="w-full h-1 bg-cyan-300 animate-scanline" />
                </motion.div>
              )}

              {/* Bot Body Design based on ID */}
              <div className="relative flex items-center justify-center p-2 rounded-full bg-[#0A0F18]/90 border border-cyan-400/50 shadow-[0_0_20px_rgba(0,229,255,0.3)] group-hover:border-cyan-300 group-hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] group-hover:scale-110 transition-all duration-300">
                {/* Thruster Glow Ring */}
                <span className="absolute -inset-1 rounded-full bg-cyan-500/20 blur-sm animate-pulse" />

                {bot.id === 'bot-jarvis' && (
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <Radio className="w-6 h-6 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                    <span className="absolute w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                  </div>
                )}

                {bot.id === 'bot-scout' && (
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-sky-400" />
                    <span className="absolute w-7 h-7 border border-cyan-400/60 rounded-full animate-ping" />
                  </div>
                )}

                {bot.id === 'bot-nano' && (
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-cyan-300" />
                    <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-cyan-200 animate-bounce" />
                  </div>
                )}
              </div>

              {/* Mini Status Tag on Hover */}
              <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap bg-[#0A0F18]/90 border border-cyan-500/40 px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300 shadow-lg flex items-center gap-1.5 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {bot.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Robot Detail Modal */}
      <AnimatePresence>
        {selectedBot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedBot(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-md glass-panel rounded-2xl p-6 border border-cyan-400/40 shadow-[0_0_40px_rgba(0,229,255,0.3)] text-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedBot(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-4 mb-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                  <Bot className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold font-orbitron text-cyan-300">
                      {selectedBot.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-xs font-mono bg-cyan-500/20 border border-cyan-400/30 text-cyan-200">
                      ONLINE
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">{selectedBot.role}</p>
                </div>
              </div>

              <div className="space-y-4 text-sm font-space">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-cyan-300 space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>SYSTEM STATUS:</span>
                    <span className="text-cyan-300">ACTIVE PATROL</span>
                  </div>
                  <p className="text-slate-200 mt-1">{selectedBot.status}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400 block">AI Core Temp:</span>
                    <span className="text-cyan-400 font-bold">34.2°C</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400 block">Battery Level:</span>
                    <span className="text-cyan-400 font-bold">98.5% (Solar-Ion)</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => triggerScan(selectedBot.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)] active:scale-95"
                  >
                    <Scan className="w-4 h-4" />
                    Trigger Laser Scan Pulse
                  </button>

                  <button
                    onClick={() => {
                      setSelectedBot(null);
                      if (onOpenBotChat) onOpenBotChat();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                    Ask AI Assistant Companion
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
