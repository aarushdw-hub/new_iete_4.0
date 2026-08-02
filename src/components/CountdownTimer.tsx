import React, { useState, useEffect } from 'react';
import { Clock, Zap, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EVENT_DETAILS } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

interface Props {
  onOpenRegister: () => void;
}

export const CountdownTimer: React.FC<Props> = ({ onOpenRegister }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });

  const [testLiveMode, setTestLiveMode] = useState(false);

  useEffect(() => {
    const target = new Date(EVENT_DETAILS.targetDateISO).getTime();

    const updateCountdown = () => {
      if (testLiveMode) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
        return;
      }

      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isLive: false });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [testLiveMode]);

  const triggerLiveCelebration = () => {
    sfx.playLaserScan();
    setTestLiveMode(!testLiveMode);

    if (!testLiveMode) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00E5FF', '#38BDF8', '#0284C7', '#FFFFFF'],
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="relative glass-panel rounded-3xl p-6 md:p-8 border border-cyan-400/40 shadow-[0_0_50px_rgba(0,229,255,0.25)] overflow-hidden">
        {/* Glowing Top Laser Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-500/20 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-lg text-cyan-200 tracking-wide">
                COUNTDOWN TO EVENT
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Flagship Day: {EVENT_DETAILS.eventDate} @ TCET Campus
              </p>
            </div>
          </div>

          <button
            onClick={triggerLiveCelebration}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/40 text-cyan-300 font-mono text-xs hover:bg-cyan-950 transition-all flex items-center gap-1.5"
            title="Toggle Live Event Celebration FX"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>{testLiveMode ? 'Reset Countdown' : 'Test Live State'}</span>
          </button>
        </div>

        {/* Timer Grid / Live Banner */}
        {timeLeft.isLive ? (
          <div className="py-8 text-center space-y-4">
            <div className="inline-block px-6 py-2 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-orbitron font-extrabold text-2xl tracking-widest cyan-glow-text animate-pulse">
              ⚡ EVENT IS LIVE NOW ⚡
            </div>
            <p className="text-slate-300 font-space text-sm max-w-lg mx-auto">
              THINK AI 4.0 is currently under way at TCET Campus! Final presentations and judging in progress.
            </p>
            <button
              onClick={onOpenRegister}
              className="px-8 py-3 rounded-xl bg-cyan-400 text-black font-orbitron font-bold text-sm hover:bg-cyan-300 transition-all shadow-[0_0_25px_rgba(0,229,255,0.5)]"
            >
              VIEW LIVE RESULTS / REGISTER
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="relative glass-panel rounded-2xl p-4 border border-cyan-500/30 group hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all"
              >
                <div className="font-orbitron font-black text-3xl md:text-5xl text-cyan-300 cyan-glow-text tracking-tight">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[11px] font-mono font-semibold tracking-widest text-slate-400 mt-2 uppercase">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer info banner */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Registration Deadline: {EVENT_DETAILS.registrationDeadline}</span>
          </div>
          <span className="text-cyan-400 font-semibold">Limited Offline Seats • TCET Auditorium</span>
        </div>
      </div>
    </div>
  );
};
