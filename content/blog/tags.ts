export interface Tag {
  name: string;
  color: string;
}

export const blogTags: Record<string, Tag> = {
  'react': { name: 'React', color: '#61DAFB' },
  'nextjs': { name: 'Next.js', color: '#000000' },
  'typescript': { name: 'TypeScript', color: '#3178C6' },
  'javascript': { name: 'JavaScript', color: '#F7DF1E' },
  'nodejs': { name: 'Node.js', color: '#339933' },
  'css': { name: 'CSS', color: '#1572B6' },
  'html': { name: 'HTML', color: '#E34F26' },
  'web-development': { name: 'Web Development', color: '#80FF00' },
  'tutorial': { name: 'Tutorial', color: '#00B300' },
  'guide': { name: 'Guide', color: '#80FF00' },
  'threejs': { name: 'Three.js', color: '#000000' },
  'performance': { name: 'Performance', color: '#FF6B6B' },
  'optimization': { name: 'Optimization', color: '#4ECDC4' },
  'frontend': { name: 'Frontend', color: '#FF6B9D' },
  'backend': { name: 'Backend', color: '#C44569' },
  'fullstack': { name: 'Full Stack', color: '#F8B500' },
  'coming-soon': { name: 'Coming Soon', color: '#FF8C00' },
};

