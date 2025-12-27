import Card from '@/components/Card';
import TypewriterText from '@/components/TypewriterText';

export default function Home() {
  return (
    <main className="min-h-screen px-4 tablet:px-6 desktop:px-8 py-12 tablet:py-16 desktop:py-20">
      {/* Hero Section */}
      <section className="flex flex-col desktop:flex-row desktop:justify-between gap-8 desktop:gap-12 items-center">
        {/* Column 1: Card - 60% on desktop */}
        <div className="w-full desktop:w-[80%]">
          <Card className="p-8">
            <h1 className="text-4xl font-bold">Timothy</h1>
            <p className="mt-3 text-lg text-[#00B300]">
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
    </main>
  );
}

