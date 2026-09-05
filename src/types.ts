export interface TeamMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  email?: string;
  avatarPlaceholder: string;
  fileName?: string;
  department?: string;
  avatarPosition?: string;
  avatarScale?: string;
}

export interface TimelineItem {
  id: number;
  title: string;
  phase: string;
  date: string;
  description: string;
  iconName: string;
  status: 'upcoming' | 'active' | 'completed';
}

export interface ProblemTrack {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

export interface AwardItem {
  rank: '1st' | '2nd' | '3rd';
  title: string;
  amount: string;
  color: string;
  perks: string[];
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Registration' | 'Technical' | 'Event Day';
}

export interface RobotState {
  id: string;
  name: string;
  type: 'drone' | 'orb' | 'scout';
  x: number;
  y: number;
  vx: number;
  vy: number;
  statusText: string;
  isScanning: boolean;
  angle: number;
}
