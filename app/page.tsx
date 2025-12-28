"use client";

import { useState } from 'react';
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/timothyteh_resume.pdf';
    link.download = 'timothyteh_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Email validation regex
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Check if form is valid
  const isFormValid = () => {
    return name.trim() !== '' && email.trim() !== '' && isValidEmail(email) && subject.trim() !== '' && message.trim() !== '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        console.error('Form submission error:', data.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="mt-6 flex flex-row gap-4 relative z-10">
            <Button variant="brandcolour2" href="#contact" showArrow={false} className="flex-1 tablet:flex-initial relative z-10">
              Contact me
            </Button>
            <Button variant="brandcolour1" href="#about" className="flex-1 tablet:flex-initial relative z-10">
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
              href="/projects"
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

      {/* Contact Section */}
      <section id="contact" className="border-2 border-yellow-500 mt-8 tablet:mt-10 desktop:mt-12 scroll-mt-20 tablet:scroll-mt-[88px]">
        <h2 className="text-5xl font-bold mb-8 tablet:mb-12">Contact</h2>
        <div className="flex flex-col tablet:flex-row gap-8 tablet:gap-12 desktop:gap-12">
          {/* Column 1 / Row 2 (Mobile) - Contact Form/Info */}
          <div className="w-full tablet:w-1/2 order-2 tablet:order-1">
            <div className="rounded-2xl bg-white/10 border-2 border-white/30 p-6">
              <p className="text-foreground/70 mb-6">
                Get in touch with me. I&apos;d love to hear from you!
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-brandcolour2 font-semibold mb-2">
                    *Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-[#2C2C2C]/50 border-2 border-white/30 text-foreground placeholder-foreground/50 focus:outline-none focus:border-brandcolour1 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-brandcolour2 font-semibold mb-2">
                    *Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-[#2C2C2C]/50 border-2 border-white/30 text-foreground placeholder-foreground/50 focus:outline-none focus:border-brandcolour1 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-brandcolour2 font-semibold mb-2">
                    *Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-[#2C2C2C]/50 border-2 border-white/30 text-foreground placeholder-foreground/50 focus:outline-none focus:border-brandcolour1 transition-colors"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-brandcolour2 font-semibold mb-2">
                    *Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-[#2C2C2C]/50 border-2 border-white/30 text-foreground placeholder-foreground/50 focus:outline-none focus:border-brandcolour1 transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <div className="flex flex-col tablet:flex-row items-center tablet:items-center justify-between gap-4">
                  {/* Social Icons */}
                  <div className="flex gap-4 order-2 tablet:order-1">
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-brandcolour1 transition-colors"
                      aria-label="GitHub"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-brandcolour1 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-brandcolour1 transition-colors"
                      aria-label="Instagram"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                  {/* Submit Button */}
                  <div className="w-full tablet:w-auto order-1 tablet:order-2">
                    <button
                      type="submit"
                      disabled={!isFormValid() || isSubmitting}
                      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 w-full tablet:w-auto ${
                        isFormValid() && !isSubmitting
                          ? 'bg-[#2C2C2C] border-2 border-brandcolour1 text-brandcolour1 hover:bg-[#2C2C2C]/90 hover:scale-105 active:scale-95 cursor-pointer'
                          : 'bg-[#2C2C2C]/50 border-2 border-white/30 text-foreground/50 cursor-not-allowed opacity-50'
                      }`}
                    >
                      {isSubmitting ? 'Sending...' : 'Submit'}
                    </button>
                  </div>
                </div>
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="text-brandcolour2 text-sm mt-2">
                    Message sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="text-red-400 text-sm mt-2">
                    Failed to send message. Please try again later.
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Column 2 / Row 1 (Mobile) - Card Component */}
          <div className="w-full tablet:w-1/2 order-1 tablet:order-2 flex items-center justify-center">
            <Card className="p-8">
              <h3 className="text-3xl font-bold mb-4">Let&apos;s Connect</h3>
              <p className="text-foreground/70">
                Feel free to reach out if you have any questions, opportunities, or just want to chat about technology!
              </p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

