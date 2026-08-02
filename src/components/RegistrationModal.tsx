import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, CheckCircle2, Sparkles, AlertCircle, Send, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EVENT_DETAILS, PROBLEM_TRACKS } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState({
    teamName: '',
    leadName: '',
    leadEmail: '',
    leadPhone: '',
    college: 'Thakur College of Engineering & Technology (TCET)',
    teamSize: '3',
    selectedTrack: PROBLEM_TRACKS[0].title,
    transactionRef: '',
    agreedToTerms: true,
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateStep1 = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.teamName.trim()) errors.teamName = 'Team Name is required';
    if (!formData.leadName.trim()) errors.leadName = 'Team Lead Name is required';
    if (!formData.leadEmail.trim() || !formData.leadEmail.includes('@')) errors.leadEmail = 'Valid Email is required';
    if (!formData.leadPhone.trim() || formData.leadPhone.length < 10) errors.leadPhone = 'Valid 10-digit Phone is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) {
        sfx.playClick();
        setStep(2);
      }
    } else if (step === 2) {
      if (!formData.transactionRef.trim()) {
        setFormErrors({ transactionRef: 'Please enter UPI Transaction / UTR Ref No.' });
        return;
      }
      sfx.playLaserScan();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00E5FF', '#38BDF8', '#0284C7', '#FFFFFF'],
      });
      setStep(3);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 md:p-8 border-2 border-cyan-400/50 shadow-[0_0_50px_rgba(0,229,255,0.3)] text-slate-100 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-4 mb-6">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-orbitron font-extrabold text-cyan-200">
                TEAM REGISTRATION — THINK AI 4.0
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Fee: {EVENT_DETAILS.entryFee} per Team • Organized by IETE TCET
              </p>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="grid grid-cols-3 gap-2 mb-8 text-center font-mono text-xs">
            {[
              { num: 1, label: 'TEAM DETAILS' },
              { num: 2, label: 'UPI PAYMENT' },
              { num: 3, label: 'CONFIRMATION' },
            ].map((s) => (
              <div
                key={s.num}
                className={`py-2 px-1 rounded-xl border transition-all ${
                  step === s.num
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                    : step > s.num
                    ? 'bg-slate-900 border-slate-700 text-slate-400'
                    : 'bg-slate-950/40 border-slate-800 text-slate-600'
                }`}
              >
                STEP {s.num}: {s.label}
              </div>
            ))}
          </div>

          {/* Step 1: Team & Lead Info */}
          {step === 1 && (
            <div className="space-y-4 font-space text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Neural Innovators"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400 text-xs"
                  />
                  {formErrors.teamName && <p className="text-cyan-400 mt-1 text-[11px]">{formErrors.teamName}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Team Lead Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.leadName}
                    onChange={(e) => setFormData({ ...formData, leadName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400 text-xs"
                  />
                  {formErrors.leadName && <p className="text-cyan-400 mt-1 text-[11px]">{formErrors.leadName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="rahul@example.com"
                    value={formData.leadEmail}
                    onChange={(e) => setFormData({ ...formData, leadEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400 text-xs"
                  />
                  {formErrors.leadEmail && <p className="text-cyan-400 mt-1 text-[11px]">{formErrors.leadEmail}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.leadPhone}
                    onChange={(e) => setFormData({ ...formData, leadPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400 text-xs"
                  />
                  {formErrors.leadPhone && <p className="text-cyan-400 mt-1 text-[11px]">{formErrors.leadPhone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    College / Institution Name
                  </label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Team Size (2–4 Members)
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400 text-xs"
                  >
                    <option value="2">2 Members</option>
                    <option value="3">3 Members</option>
                    <option value="4">4 Members</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Preferred AI Challenge Track
                </label>
                <select
                  value={formData.selectedTrack}
                  onChange={(e) => setFormData({ ...formData, selectedTrack: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400 text-xs"
                >
                  {PROBLEM_TRACKS.map((t) => (
                    <option key={t.id} value={t.title}>
                      {t.title} ({t.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-xl bg-cyan-400 text-black font-orbitron font-bold text-xs hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                >
                  PROCEED TO PAYMENT (₹119) →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: UPI Payment */}
          {step === 2 && (
            <div className="space-y-6 text-center font-space text-xs">
              <div className="p-4 rounded-2xl bg-[#0A0F18] border border-cyan-400/40">
                <p className="text-xs font-mono font-bold text-cyan-300 mb-2 uppercase">
                  SCAN & PAY ₹119 VIA UPI
                </p>

                <div className="relative w-40 h-40 mx-auto bg-white p-2 rounded-xl shadow-md my-3 overflow-hidden flex items-center justify-center">
                  <QrCode className="w-full h-full text-black" />
                  <div className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_10px_#00E5FF] animate-scanline" />
                </div>

                <p className="font-mono text-cyan-300 font-bold">UPI ID: iete.tcet@upi</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Pay via GPay, PhonePe, Paytm, or BHIM. Keep transaction reference number ready.
                </p>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold text-left mb-1">
                  UPI Transaction Ref / UTR No. *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 423189056211"
                  value={formData.transactionRef}
                  onChange={(e) => setFormData({ ...formData, transactionRef: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400 text-xs font-mono"
                />
                {formErrors.transactionRef && (
                  <p className="text-cyan-400 text-left mt-1 text-[11px]">{formErrors.transactionRef}</p>
                )}
              </div>

              <div className="flex items-center gap-2 text-left">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-400 focus:ring-0"
                />
                <label htmlFor="terms" className="text-[11px] text-slate-300">
                  I confirm our team will present offline at TCET Mumbai on 18th Sept 2025.
                </label>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono hover:bg-slate-800"
                >
                  ← Back
                </button>

                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-xl bg-cyan-400 text-black font-orbitron font-bold text-xs hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                >
                  SUBMIT REGISTRATION ⚡
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Success Confirmation */}
          {step === 3 && (
            <div className="py-8 text-center space-y-4 font-space">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,229,255,0.6)]">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <h3 className="font-orbitron font-extrabold text-2xl text-cyan-300 cyan-glow-text">
                REGISTRATION SUCCESSFUL!
              </h3>

              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Welcome <span className="text-cyan-300 font-bold">{formData.teamName}</span>! Your entry pass is verified under Ref No: <span className="font-mono text-cyan-300">{formData.transactionRef}</span>.
              </p>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-md mx-auto text-xs text-slate-300 font-mono space-y-1 text-left">
                <p>• Confirmation email sent to: {formData.leadEmail}</p>
                <p>• Team Lead Contact: {formData.leadPhone}</p>
                <p>• Track Selected: {formData.selectedTrack}</p>
                <p>• Offline Event Date: 18th September 2025 @ TCET</p>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-cyan-400 text-black font-orbitron font-bold text-xs hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)]"
              >
                CLOSE & RETURN TO HOME
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
