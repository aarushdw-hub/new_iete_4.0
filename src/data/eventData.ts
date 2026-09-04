import { TeamMember, TimelineItem, ProblemTrack, AwardItem, FAQItem } from '../types';

export const EVENT_DETAILS = {
  title: 'THINK AI 4.0',
  tagline: 'Where Intelligence Meets Innovation',
  organizer: 'IETE Student Forum (ISF) - TCET',
  institution: 'Thakur College of Engineering & Technology, Mumbai',
  eventDate: '9 October',
  venue: 'TCET Campus, Kandivali East, Mumbai - 400101',
  targetDateISO: '2026-10-09T09:00:00+05:30', // Oct 9 9:00 AM IST
  entryFee: '₹119',
  teamSize: '2 to 4 Members',
  prizePool: '₹7,000',
  registrationDeadline: '7 October',
  googleFormUrl: 'https://forms.gle/thinkai40-tcet-registration',
  contactEmail: 'iete.tcet@thakureducation.org',
  contactPhonePrimary: '+91 98765 43210',
};

export const CORE_TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Chairperson',
    role: 'CHAIRPERSON',
    phone: '+91 98201 12345',
    email: 'chairperson.iete@tcetmumbai.in',
    avatarPlaceholder: '/images/CHAIRPERSON.JPG',
    fileName: 'CHAIRPERSON.JPG',
    department: 'IETE Student Forum Lead',
  },
  {
    id: '2',
    name: 'Vice Chairperson',
    role: 'VICE CHAIR PERSON',
    phone: '+91 98202 23456',
    email: 'vicechair.iete@tcetmumbai.in',
    avatarPlaceholder: '/images/VICE CHAIR PERSON.JPG',
    fileName: 'VICE CHAIR PERSON.JPG',
    department: 'Executive Operations',
  },
  {
    id: '3',
    name: 'Event Manager',
    role: 'EVENT MANGER',
    phone: '+91 98203 34567',
    email: 'eventmanager.iete@tcetmumbai.in',
    avatarPlaceholder: '/images/EVENT MANGER.JPG',
    fileName: 'EVENT MANGER.JPG',
    department: 'Event Execution & Scheduling',
  },
  {
    id: '4',
    name: 'Sponsorship Head',
    role: 'SPONSORSHIP HEAD',
    phone: '+91 98204 45678',
    email: 'sponsorship.iete@tcetmumbai.in',
    avatarPlaceholder: '/images/SPONSORSHIP HEAD.JPG',
    fileName: 'SPONSORSHIP HEAD.JPG',
    department: 'Corporate & Sponsorship Relations',
  },
  {
    id: '5',
    name: 'Treasurer',
    role: 'TREASURER',
    phone: '+91 98205 56789',
    email: 'treasurer.iete@tcetmumbai.in',
    avatarPlaceholder: '/images/TREASURER.JPG',
    fileName: 'TREASURER.JPG',
    department: 'Finance & Accounts Management',
  },
];

export const TIMELINE_STEPS: TimelineItem[] = [
  {
    id: 1,
    title: 'Online Registration',
    phase: 'Phase 1',
    date: 'Until 7 October',
    description: 'Form your team of 2–4 members and register online with the entry fee of ₹119.',
    iconName: 'UserCheck',
    status: 'active',
  },
  {
    id: 2,
    title: 'Project Development & Mentoring',
    phase: 'Phase 2',
    date: '25 Sept – 7 Oct',
    description: 'Build your AI models, train architectures, and craft working prototypes.',
    iconName: 'Cpu',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Slide Deck & Demo Submission',
    phase: 'Phase 3',
    date: '8 October (11:59 PM)',
    description: 'Submit your solution pitch deck and prototype demonstration links.',
    iconName: 'UploadCloud',
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Offline Presentation Day',
    phase: 'Phase 4',
    date: '9 October (9:00 AM)',
    description: 'Present live at TCET Mumbai campus in front of industry judges & AI experts.',
    iconName: 'Presentation',
    status: 'upcoming',
  },
  {
    id: 5,
    title: 'Grand Judging & Pitch',
    phase: 'Phase 5',
    date: '9 October (2:00 PM)',
    description: 'Top finalist teams pitch live with interactive prototype Q&A evaluation.',
    iconName: 'Award',
    status: 'upcoming',
  },
  {
    id: 6,
    title: 'Winner Announcement',
    phase: 'Phase 6',
    date: '9 October (5:00 PM)',
    description: 'Felicitations, cash distribution (₹7,000 pool), and certificate awarding.',
    iconName: 'Trophy',
    status: 'upcoming',
  },
];

export const PROBLEM_TRACKS: ProblemTrack[] = [
  {
    id: 'track-1',
    title: 'Generative AI & LLM Agents',
    category: 'Generative AI',
    description: 'Design autonomous AI agents using Gemini or custom LLMs to automate complex workflows or personal assistance.',
    difficulty: 'Intermediate',
    tags: ['Gemini API', 'LangChain', 'Multi-Agent', 'RAG'],
  },
  {
    id: 'track-2',
    title: 'Computer Vision & Edge Robotics',
    category: 'Robotics & CV',
    description: 'Build real-time object detection, autonomous navigation, or gesture control systems for smart robotics.',
    difficulty: 'Advanced',
    tags: ['OpenCV', 'YOLOv8', 'Edge Computing', 'PyTorch'],
  },
  {
    id: 'track-3',
    title: 'AI in Healthcare & Medical Diagnostics',
    category: 'Healthcare',
    description: 'Train deep learning models to analyze medical imaging, predict patient outcomes, or optimize clinical triage.',
    difficulty: 'Advanced',
    tags: ['Medical AI', 'CNNs', 'Predictive Analysis', 'HIPAA Safety'],
  },
  {
    id: 'track-4',
    title: 'Smart Cities & Environmental AI',
    category: 'Sustainability',
    description: 'Construct intelligent traffic management, carbon tracking, or energy grid optimization using spatial AI.',
    difficulty: 'Intermediate',
    tags: ['IoT Sensors', 'Spatial Analytics', 'Time Series', 'Eco-Tech'],
  },
  {
    id: 'track-5',
    title: 'Cybersecurity & Anomaly Detection',
    category: 'Cyber Intelligence',
    description: 'Detect zero-day cyber threats, phishing patterns, or fraud in financial transactions using neural networks.',
    difficulty: 'Intermediate',
    tags: ['Network Security', 'Graph Neural Networks', 'Real-Time Threat'],
  },
  {
    id: 'track-6',
    title: 'Open AI Innovation Track',
    category: 'Open Track',
    description: 'Have a breakthrough AI idea outside predefined tracks? Showcase your wild, innovative AI prototype here!',
    difficulty: 'Beginner',
    tags: ['Wildcard', 'Full-Stack AI', 'Novel Concept'],
  },
];

export const AWARDS_LIST: AwardItem[] = [
  {
    rank: '1st',
    title: 'Grand Winner (1st Prize)',
    amount: '₹4,000',
    color: '#00E5FF',
    perks: ['Winner Trophy & Gold Medals', 'Official Winner Certificate', 'AICTE Activity Hours', 'Incubation & Mentorship Access'],
    icon: 'Trophy',
  },
  {
    rank: '2nd',
    title: '1st Runner-Up (2nd Prize)',
    amount: '₹2,000',
    color: '#38BDF8',
    perks: ['Runner-Up Trophy & Silver Medals', 'Excellence Certificate', 'AICTE Activity Hours', 'Industry Exposure Pass'],
    icon: 'Medal',
  },
  {
    rank: '3rd',
    title: '2nd Runner-Up (3rd Prize)',
    amount: '₹1,000',
    color: '#0284C7',
    perks: ['Bronze Trophy & Medals', 'Excellence Certificate', 'AICTE Activity Hours', 'Tech Goodies & Swag Kit'],
    icon: 'Award',
  },
];

export const FAQ_LIST: FAQItem[] = [
  {
    question: 'Who is eligible to participate in THINK AI 4.0?',
    answer: 'Any undergraduate student enrolled in Engineering, Technology, Polytechnic, or Computer Science degree programs across India can participate!',
    category: 'General',
  },
  {
    question: 'What is the required team size?',
    answer: 'Teams must consist of 2 to 4 members. Cross-department and cross-year teams are highly encouraged!',
    category: 'Registration',
  },
  {
    question: 'What is the registration fee and how do I pay?',
    answer: 'The entry fee is ₹119 per team. Payment can be made via UPI QR code on the registration modal or Google Form.',
    category: 'Registration',
  },
  {
    question: 'Do all participants receive AICTE Activity Hours and Certificates?',
    answer: 'Yes! All registered participants who present their project on Event Day receive official Participation Certificates and eligible AICTE Activity Hours.',
    category: 'General',
  },
  {
    question: 'Is the final presentation offline or online?',
    answer: 'The final presentation on 9th October is held offline at Thakur College of Engineering & Technology (TCET), Mumbai.',
    category: 'Event Day',
  },
  {
    question: 'Can we use pre-trained AI models or APIs like Gemini?',
    answer: 'Yes! You are encouraged to use state-of-the-art AI frameworks, APIs (Gemini, PyTorch, TensorFlow, HuggingFace), or hardware kits as long as your application layer and logic are original.',
    category: 'Technical',
  },
];

export const GUIDELINES_CHECKLIST = [
  {
    id: 1,
    title: 'Team Composition',
    detail: 'Teams must strictly comprise 2 to 4 members. One member must be designated as Team Lead.',
  },
  {
    id: 2,
    title: 'Originality & Ethics',
    detail: 'Plagiarism or copying existing commercial code without attribution leads to immediate disqualification.',
  },
  {
    id: 3,
    title: 'Presentation Deck (PPT)',
    detail: 'The pitch deck should contain Problem Statement, Proposed AI Solution, Architecture Diagram, Tech Stack, and Future Scope (Max 10 slides).',
  },
  {
    id: 4,
    title: 'Live Demonstration',
    detail: 'Teams must demonstrate a working prototype, CLI, or interactive web/app demo during the judges round.',
  },
  {
    id: 5,
    title: 'Code Repository',
    detail: 'Final source code must be hosted on GitHub/GitLab with a detailed README file.',
  },
  {
    id: 6,
    title: 'Reporting Time',
    detail: 'Teams must report to TCET campus by 8:30 AM on 9th October with college IDs.',
  },
];
