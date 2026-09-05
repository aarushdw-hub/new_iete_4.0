import React, { useState } from 'react';
import { LivingBackgroundCanvas } from './components/LivingBackgroundCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { WhyParticipate } from './components/WhyParticipate';
import { EventTimeline } from './components/EventTimeline';
import { EntryFees } from './components/EntryFees';
import { AwardsSection } from './components/AwardsSection';
import { GuidelinesSection } from './components/GuidelinesSection';
import { CoreTeamSection } from './components/CoreTeamSection';
import { ContactVenue } from './components/ContactVenue';
import { FutureProofPlaceholders } from './components/FutureProofPlaceholders';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { RulebookModal } from './components/RulebookModal';
import { BotAssistantDrawer } from './components/BotAssistantDrawer';

export default function App() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [registrationTier, setRegistrationTier] = useState<'iete' | 'non-iete'>('iete');
  const [rulebookModalOpen, setRulebookModalOpen] = useState(false);
  const [botChatOpen, setBotChatOpen] = useState(false);

  const handleOpenRegister = (tier: 'iete' | 'non-iete' = 'iete') => {
    setRegistrationTier(tier);
    setRegisterModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#05070B] text-slate-100 overflow-x-hidden selection:bg-[#00E5FF] selection:text-black font-space">
      {/* Living AI Ecosystem Canvas Background */}
      <LivingBackgroundCanvas />

      {/* Futuristic Fixed Navigation Bar */}
      <Navbar
        onOpenRegister={() => handleOpenRegister('iete')}
        onOpenBotChat={() => setBotChatOpen(true)}
      />

      {/* Main Page Layout */}
      <main className="relative z-10">
        <HeroSection
          onOpenRegister={() => handleOpenRegister('iete')}
          onOpenRulebook={() => setRulebookModalOpen(true)}
        />

        <AboutSection />

        <WhyParticipate />

        <EventTimeline />

        <EntryFees onOpenRegister={(tier) => handleOpenRegister(tier || 'iete')} />

        <AwardsSection />

        <GuidelinesSection onOpenRulebook={() => setRulebookModalOpen(true)} />

        <CoreTeamSection />

        <ContactVenue />

        <FutureProofPlaceholders />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        initialTier={registrationTier}
      />

      <RulebookModal
        isOpen={rulebookModalOpen}
        onClose={() => setRulebookModalOpen(false)}
        onOpenRegister={() => handleOpenRegister('iete')}
      />

      <BotAssistantDrawer
        isOpen={botChatOpen}
        onClose={() => setBotChatOpen(false)}
        onOpenRegister={() => handleOpenRegister('iete')}
      />
    </div>
  );
}

