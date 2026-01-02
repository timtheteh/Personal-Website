export interface ResumeItem {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  description?: string;
}

export const resumeItems: ResumeItem[] = [
  {
    id: '1',
    title: 'Undergraduate (REP CS)',
    subtitle: 'Nanyang Technological University',
    date: 'Aug 2020',
    // description: 'Description of role and responsibilities.',
  },
  {
    id: '2',
    title: 'Frontend Developer Intern',
    subtitle: 'NTUitive',
    date: 'May - Jul 2021',
    description: 'Web Development',
  },
  {
    id: '3',
    title: 'Tech Consultant Intern',
    subtitle: 'Accenture',
    date: 'Sep 2022 - May 2023',
    description: 'Computer Science',
  },
  {
    id: '4',
    title: 'Exchange Student',
    subtitle: 'UBC Vancouver',
    date: 'May - Jul 2022',
    description: 'Business analyst for whole-of-government data migration',
  },
  {
    id: '5',
    title: 'Full-Stack Developer Intern',
    subtitle: 'DSTA',
    date: 'May - Dec 2023',
    description: 'AI-Assistant web application for the SAF',
  },
  {
    id: '6',
    title: 'Frontend Developer Intern',
    subtitle: 'GovTech',
    date: 'Jan - May 2024',
    description: 'Web Development for CrowdTaskSG',
  },
  {
    id: '7',
    title: 'Frontend Developer Intern',
    subtitle: 'Visa',
    date: 'May - Aug 2024',
    description: 'Web Development for VROL (Visa Resolve Online)',
  },
  {
    id: '8',
    title: 'Graduated University',
    subtitle: 'Nanyang Technological University',
    date: 'May - Aug 2024',
    description: 'Bsc. Computer Science, Msc. Tech Management',
  },
  {
    id: '9',
    title: 'Android Developer',
    subtitle: 'OKX',
    date: 'Jul 2025 - Present',
    description: 'In charge of internal UI library for OKX',
  },
];

