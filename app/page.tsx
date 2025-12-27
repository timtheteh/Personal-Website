import Card from '@/components/Card';
import TypewriterText from '@/components/TypewriterText';
import Timeline from '@/components/Timeline';

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
];

export default function Home() {
  return (
    <main className="min-h-screen px-4 tablet:px-6 desktop:px-8 py-12 tablet:py-16 desktop:py-20">
      {/* Hero Section */}
      <section className="flex flex-col desktop:flex-row desktop:justify-between gap-8 desktop:gap-12 items-center">
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
        </div>
        
        {/* Column 2: Image (placeholder) - 40% on desktop */}
        <div className="w-full desktop:w-[40%] flex items-center justify-center">
          <div className="w-full aspect-square max-w-[400px] rounded-2xl bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center">
            <span className="text-foreground/50">Image placeholder</span>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="mt-20 tablet:mt-24 desktop:mt-32">
        <h2 className="text-3xl font-bold mb-8 tablet:mb-12">Resume</h2>
        <Timeline items={resumeItems} />
      </section>
    </main>
  );
}

