import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, CheckCircle2, Sparkles, AlertCircle, ShieldCheck, Users, BadgePercent } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EVENT_DETAILS } from '../data/eventData';
import { sfx } from '../utils/audioSFX';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTier?: 'iete' | 'non-iete';
}

export const RegistrationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialTier = 'iete',
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [membershipTier, setMembershipTier] = useState<'iete' | 'non-iete'>(initialTier);

  // Sync initial tier when modal opens
  useEffect(() => {
    if (isOpen) {
      setMembershipTier(initialTier);
      setStep(1);
    }
  }, [isOpen, initialTier]);

  // Form State
  const [formData, setFormData] = useState({
    teamName: '',
    leadName: '',
    leadEmail: '',
    leadPhone: '',
    college: 'Thakur College of Engineering & Technology (TCET)',
    teamSize: '3',
    ieteMemberId: '',
    transactionRef: '',
    agreedToTerms: true,
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const currentFee = membershipTier === 'iete' ? 119 : 200;
  const currentFeeStr = `₹${currentFee}`;

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

  const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    `upi://pay?pa=iete.tcet@upi&pn=IETE TCET&am=${currentFee}&cu=INR&tn=ThinkAI4 Registration`
  )}`;

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
                Fee: ₹119 (IETE) • ₹200 (Non-IETE) • Organized by IETE TCET
              </p>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="grid grid-cols-3 gap-2 mb-6 text-center font-mono text-xs">
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

          {/* Step 1: Membership Selection & Team Info */}
          {step === 1 && (
            <div className="space-y-5 font-space text-xs">
              {/* Membership Tier Picker */}
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Select Registration Category *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* IETE Member Option */}
                  <button
                    type="button"
                    onClick={() => {
                      sfx.playClick();
                      setMembershipTier('iete');
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                      membershipTier === 'iete'
                        ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.25)]'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-orbitron font-bold text-xs text-cyan-300 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-cyan-400" />
                        IETE MEMBER TEAM
                      </span>
                      <span className="font-orbitron font-black text-sm text-cyan-300">
                        ₹119
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      For teams with registered IETE Forum members (Save ₹81)
                    </p>
                  </button>

                  {/* Non-IETE Member Option */}
                  <button
                    type="button"
                    onClick={() => {
                      sfx.playClick();
                      setMembershipTier('non-iete');
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                      membershipTier === 'non-iete'
                        ? 'bg-slate-800/80 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-orbitron font-bold text-xs text-slate-200 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-slate-300" />
                        NON-IETE TEAM
                      </span>
                      <span className="font-orbitron font-black text-sm text-slate-100">
                        ₹200
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      For teams who haven't taken IETE membership (Open to all)
                    </p>
                  </button>
                </div>
              </div>

              {/* Team Information Form */}
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

              {/* Optional IETE Membership ID if IETE tier selected */}
              {membershipTier === 'iete' && (
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                  <label className="block text-cyan-200 font-semibold mb-1">
                    IETE Membership ID / Roll No. (Optional / For Verification)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. IETE-TCET-XXXX or Student Roll Number"
                    value={formData.ieteMemberId}
                    onChange={(e) => setFormData({ ...formData, ieteMemberId: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-slate-100 focus:outline-none focus:border-cyan-400 text-xs"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    * Membership status will be cross-verified during offline check-in at TCET.
                  </p>
                </div>
              )}

              <div className="pt-3 flex items-center justify-between">
                <div className="font-mono text-xs text-slate-400">
                  Total Payable: <span className="text-cyan-300 font-bold text-sm">{currentFeeStr}</span>
                </div>

                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-black font-orbitron font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] cursor-pointer"
                >
                  PROCEED TO PAYMENT ({currentFeeStr}) →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: UPI Payment */}
          {step === 2 && (
            <div className="space-y-5 text-center font-space text-xs">
              <div className="p-4 rounded-2xl bg-[#0A0F18] border border-cyan-400/40">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="px-3 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[11px] font-bold border border-cyan-400/30">
                    {membershipTier === 'iete' ? 'IETE MEMBER PASS' : 'NON-IETE MEMBER PASS'}
                  </span>
                </div>

                <p className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                  SCAN & PAY {currentFeeStr} VIA UPI
                </p>

                {/* QR Code Container */}
                <div className="relative w-44 h-44 mx-auto bg-white p-2.5 rounded-2xl shadow-md my-3 overflow-hidden flex items-center justify-center">
                  <img
                    src={upiQrUrl}
                    alt={`UPI QR Code for ${currentFeeStr}`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback to svg icon if offline
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_10px_#00E5FF] animate-scanline" />
                </div>

                <p className="font-mono text-cyan-300 font-bold text-sm">UPI ID: iete.tcet@upi</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Pay {currentFeeStr} using PhonePe, Google Pay, Paytm, or BHIM. Enter transaction reference number below.
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
                  className="rounded bg-slate-900 border-slate-700 text-cyan-400 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="terms" className="text-[11px] text-slate-300 cursor-pointer">
                  I confirm our team will present offline at TCET Mumbai on 9th October 2026.
                </label>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono hover:bg-slate-800 cursor-pointer"
                >
                  ← Back
                </button>

                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-xl bg-cyan-400 text-black font-orbitron font-bold text-xs hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] cursor-pointer"
                >
                  SUBMIT REGISTRATION ({currentFeeStr}) ⚡
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
                Welcome <span className="text-cyan-300 font-bold">{formData.teamName}</span>! Your entry pass is recorded under Ref No: <span className="font-mono text-cyan-300">{formData.transactionRef}</span>.
              </p>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-md mx-auto text-xs text-slate-300 font-mono space-y-1.5 text-left">
                <p>• Category: <span className="text-cyan-300">{membershipTier === 'iete' ? 'IETE Member Pass (₹119)' : 'Non-IETE Member Pass (₹200)'}</span></p>
                <p>• Confirmation email sent to: {formData.leadEmail}</p>
                <p>• Team Lead Contact: {formData.leadPhone}</p>
                <p>• Team Size: {formData.teamSize} Members</p>
                <p>• Offline Event Date: 9th October @ TCET Mumbai</p>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-cyan-400 text-black font-orbitron font-bold text-xs hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] cursor-pointer"
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
