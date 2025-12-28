import Card from '@/components/Card';
import TypewriterText from '@/components/TypewriterText';
import Timeline from '@/components/Timeline';
import Button from '@/components/Button';
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

export default function Home() {
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

      {/* Resume Section */}
      <section id="resume" className="border-2 border-green-500 scroll-mt-20 tablet:scroll-mt-[88px] mt-20 tablet:mt-24 desktop:mt-32">
        <h2 className="text-5xl font-bold mb-8 tablet:mb-12">Resume</h2>
        <Timeline items={resumeItems} />
      </section>
    </main>
  );
}

