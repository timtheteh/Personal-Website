"use client";

import Card from '@/components/Card';
import TypewriterText from '@/components/TypewriterText';
import Timeline from '@/components/Timeline';
import Carousel from '@/components/Carousel';
import Button from '@/components/Button';
import Terminal from '@/components/Terminal';
import dynamic from 'next/dynamic';

// Dynamically import Planet3D with SSR disabled (WebGL requires browser)
const Planet3D = dynamic(() => import('@/components/Planet3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] tablet:h-[600px] desktop:h-[700px] relative flex items-center justify-center">
      <div className="text-foreground/50">Loading 3D model...</div>
    </div>
  ),
});

// Sample resume timeline data
const resumeItems = [
  {
    id: '1',
    title: 'Software Engineer',
    subtitle: 'Company Name',
    date: '2023 - Present',
    description: 'Description of role and responsibilities.',
  },
  {
    id: '2',
    title: 'Full-Stack Developer',
    subtitle: 'Previous Company',
    date: '2021 - 2023',
    description: 'Description of role and responsibilities.',
  },
  {
    id: '3',
    title: 'Junior Developer',
    subtitle: 'First Company',
    date: '2019 - 2021',
    description: 'Description of role and responsibilities.',
  },
  {
    id: '4',
    title: 'Computer Science Degree',
    subtitle: 'University Name',
    date: '2015 - 2019',
    description: 'Bachelor of Science in Computer Science.',
  },
  {
    id: '5',
    title: 'Computer Science Degree',
    subtitle: 'University Name',
    date: '2015 - 2019',
    description: 'Bachelor of Science in Computer Science.',
  },
  {
    id: '6',
    title: 'Computer Science Degree',
    subtitle: 'University Name',
    date: '2015 - 2019',
    description: 'Bachelor of Science in Computer Science.',
  },
  {
    id: '7',
    title: 'Computer Science Degree',
    subtitle: 'University Name',
    date: '2015 - 2019',
    description: 'Bachelor of Science in Computer Science.',
  },
  {
    id: '8',
    title: 'Computer Science Degree',
    subtitle: 'University Name',
    date: '2015 - 2019',
    description: 'Bachelor of Science in Computer Science.',
  },
  {
    id: '9',
    title: 'Computer Science Degree',
    subtitle: 'University Name',
    date: '2015 - 2019',
    description: 'Bachelor of Science in Computer Science.',
  },
];

// Sample carousel items with id, text, and icon
const carouselItems = [
  { id: 'react', text: 'React', icon: '⚛️' },
  { id: 'nextjs', text: 'Next.js', icon: '▲' },
  { id: 'typescript', text: 'TypeScript', icon: '📘' },
  { id: 'nodejs', text: 'Node.js', icon: '🟢' },
  { id: 'python', text: 'Python', icon: '🐍' },
  { id: 'aws', text: 'AWS', icon: '☁️' },
  { id: 'docker', text: 'Docker', icon: '🐳' },
  { id: 'git', text: 'Git', icon: '📦' },
];

// Second carousel items
const carouselItems2 = [
  { id: 'postgresql', text: 'PostgreSQL', icon: '🐘' },
  { id: 'mongodb', text: 'MongoDB', icon: '🍃' },
  { id: 'redis', text: 'Redis', icon: '🔴' },
  { id: 'graphql', text: 'GraphQL', icon: '◈' },
  { id: 'tailwind', text: 'Tailwind', icon: '🎨' },
  { id: 'figma', text: 'Figma', icon: '🎯' },
  { id: 'kubernetes', text: 'K8s', icon: '☸️' },
  { id: 'terraform', text: 'Terraform', icon: '🏗️' },
];

// third carousel items
const carouselItems3 = [
  { id: 'postgresql', text: 'PostgreSQL', icon: '🐘' },
  { id: 'mongodb', text: 'MongoDB', icon: '🍃' },
  { id: 'redis', text: 'Redis', icon: '🔴' },
  { id: 'graphql', text: 'GraphQL', icon: '◈' },
  { id: 'tailwind', text: 'Tailwind', icon: '🎨' },
  { id: 'figma', text: 'Figma', icon: '🎯' },
  { id: 'kubernetes', text: 'K8s', icon: '☸️' },
  { id: 'terraform', text: 'Terraform', icon: '🏗️' },
];

export default function Home() {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/timothyteh_resume.pdf';
    link.download = 'timothyteh_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen px-4 tablet:px-6 desktop:px-8 py-12 tablet:py-16 desktop:py-20">
      {/* Hero Section */}
      <section className="border-2 border-red-500 scroll-mt-20 tablet:scroll-mt-[88px] flex flex-col desktop:flex-row desktop:justify-between gap-8 desktop:gap-12 items-center">
        {/* Column 1: Card - 60% on desktop */}
        <div className="w-full desktop:w-[80%]">
          <Card className="p-8">
            <h1 className="text-4xl font-bold">Timothy</h1>
            <p className="mt-3 text-lg text-brandcolour2">
              <TypewriterText
                texts={[
                  'SOFTWARE ENGINEER',
                  'FULL-STACK ENGINEER',
                  'SOFTWARE ARCHITECT',
                ]}
              />
            </p>
            <p className="mt-4 text-foreground/70">This is a liquid-glass card component.</p>
          </Card>
          <div className="mt-6 flex flex-row gap-4">
            <Button variant="brandcolour2" href="#contact" showArrow={false} className="flex-1 tablet:flex-initial">
              Contact me
            </Button>
            <Button variant="brandcolour1" href="#about" className="flex-1 tablet:flex-initial">
              Learn more
            </Button>
          </div>
        </div>
        
        {/* Column 2: Image (placeholder) - 40% on desktop */}
        <div className="w-full desktop:w-[40%] flex items-center justify-center">
          <div className="w-full aspect-square max-w-[400px] rounded-2xl bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center">
            <span className="text-foreground/50">Image placeholder</span>
          </div>
        </div>
      </section>

      {/* 3D Planet Transition Section */}
      <section className="-mt-20 tablet:-mt-24 desktop:-mt-32 -mb-20 tablet:-mb-24 desktop:-mb-32">
        <Planet3D />
      </section>

      {/* About Section */}
      <section id="about" className="border-2 border-blue-500 scroll-mt-20 tablet:scroll-mt-[88px]">
        <div className="flex flex-col desktop:flex-row desktop:justify-between gap-8 desktop:gap-12 items-center">
          {/* Column 1: Image (placeholder) - Desktop first, Mobile/Tablet second */}
          <div className="w-full desktop:w-[40%] flex items-center justify-center order-2 desktop:order-1">
            <div className="w-full aspect-square max-w-[400px] rounded-2xl bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center">
              <span className="text-foreground/50">Image placeholder</span>
            </div>
          </div>
          
          {/* Column 2: Card - Desktop second, Mobile/Tablet first */}
          <div className="w-full desktop:w-[80%] order-1 desktop:order-2">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-4">About Me</h2>
              <p className="text-foreground/70">
                This is the about section content. You can add your personal information, background, and story here.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Terminal Section */}
      <section className="mt-8 tablet:mt-10 desktop:mt-12 mb-8 tablet:mb-10 desktop:mb-12">
        <Terminal />
      </section>

      {/* Resume Section */}
      <section id="resume" className="border-2 border-green-500 scroll-mt-20 tablet:scroll-mt-[88px]">
        <div className="flex flex-col tablet:flex-row tablet:items-center gap-4 tablet:gap-4 mb-8 tablet:mb-12">
          <h2 className="text-5xl font-bold">Resume</h2>
          <div className="flex flex-col tablet:flex-row gap-4 self-start">
            <Button 
              variant="brandcolour2" 
              showArrow={false}
              onClick={handleDownloadResume}
            >
              Download
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 11V1M8 11L4 7M8 11L12 7M2 13H14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            <Button 
              variant="brandcolour1" 
              href="#projects"
            >
              Projects
            </Button>
          </div>
        </div>
        <Timeline className="border-2 border-red-500" items={resumeItems} />
        
        {/* Skills Carousel */}
        <div className="mt-0 desktop:mt-4">
          <Carousel 
            items={carouselItems}
            itemSize={{ mobile: 120, tablet: 160, desktop: 160 }}
            gap={20}
            speed={80}
            direction="left"
            pauseOnHover={false}
            tilt={-5}
          />
        </div>
        
        {/* Second Carousel - opposite direction */}
        <div className="-mt-32 tablet:-mt-32 desktop:-mt-32">
          <Carousel 
            items={carouselItems2}
            itemSize={{ mobile: 120, tablet: 160, desktop: 160 }}
            gap={20}
            speed={80}
            direction="right"
            pauseOnHover={false}
            tilt={-5}
          />
        </div>

        {/* Third Carousel - opposite direction */}
        <div className="-mt-32 tablet:-mt-32 desktop:-mt-32">
          <Carousel 
            items={carouselItems3}
            itemSize={{ mobile: 120, tablet: 160, desktop: 160 }}
            gap={20}
            speed={80}
            direction="left"
            pauseOnHover={false}
            tilt={-5}
          />
        </div>
      </section>
    </main>
  );
}

