import Card from '@/components/Card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="p-8">
        <h1 className="text-4xl font-bold">Hello</h1>
        <p className="mt-4 text-foreground/70">This is a liquid-glass card component.</p>
      </Card>
    </main>
  );
}

