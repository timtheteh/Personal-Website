export interface Tag {
  name: string;
  color: string;
}

export const projectTags: Record<string, Tag> = {
  'react': { name: 'React', color: '#61DAFB' },
  'nextjs': { name: 'Next.js', color: '#000000' },
  'typescript': { name: 'TypeScript', color: '#3178C6' },
  'javascript': { name: 'JavaScript', color: '#F7DF1E' },
  'nodejs': { name: 'Node.js', color: '#339933' },
  'python': { name: 'Python', color: '#3776AB' },
  'aws': { name: 'AWS', color: '#232F3E' },
  'docker': { name: 'Docker', color: '#2496ED' },
  'mongodb': { name: 'MongoDB', color: '#47A248' },
  'postgresql': { name: 'PostgreSQL', color: '#336791' },
  'fullstack': { name: 'Full Stack', color: '#F8B500' },
  'frontend': { name: 'Frontend', color: '#FF6B9D' },
  'backend': { name: 'Backend', color: '#C44569' },
  'api': { name: 'API', color: '#00B300' },
  'database': { name: 'Database', color: '#4ECDC4' },
  'cloud': { name: 'Cloud', color: '#80FF00' },
  'coming-soon': { name: 'Coming Soon', color: '#FF8C00' },
};

