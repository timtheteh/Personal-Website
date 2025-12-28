"use client";

import { useState, useEffect } from 'react';
import Card from '@/components/Card';

interface Project {
  slug: string;
  title: string;
  date: string;
  description: string;
  thumbnail: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch projects from API route
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen px-4 tablet:px-6 desktop:px-8 py-12 tablet:py-16 desktop:py-20">
        <div className="max-w-[1200px] border-2 border-green-500 mx-auto">
          <div className="text-center py-12">
            <div className="text-foreground/50">Loading projects...</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 tablet:px-6 desktop:px-8 py-12 tablet:py-16 desktop:py-20">
      <div className="max-w-[1200px] border-2 border-green-500 mx-auto">
        {/* Header Section - Two columns on desktop/tablet, one column on mobile */}
        <div className="flex flex-col tablet:flex-row gap-8 tablet:gap-12 desktop:gap-12 mb-8 tablet:mb-12">
          {/* Column 1: Image (placeholder) - Desktop/Tablet only */}
          <div className="w-full tablet:w-[40%] hidden tablet:flex items-center justify-center">
            <div className="w-full aspect-square max-w-[400px] rounded-2xl bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center">
              <span className="text-foreground/50">Image placeholder</span>
            </div>
          </div>
          
          {/* Column 2: Card Component */}
          <div className="w-full tablet:w-[60%] flex items-center justify-center tablet:pr-8 desktop:pr-8">
            <Card className="p-8">
              <h1 className="text-5xl font-bold mb-4">Projects</h1>
              <p className="text-foreground/70">
                Explore my portfolio of projects showcasing my work in web development, design, and technology.
              </p>
            </Card>
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="flex flex-col rounded-2xl bg-white/10 border-2 border-white/30 overflow-hidden hover:border-brandcolour1 transition-colors"
            >
              {/* Thumbnail */}
              <div className="w-full aspect-video bg-gradient-to-br from-brandcolour1/20 to-brandcolour2/20 flex items-center justify-center">
                <span className="text-foreground/50 text-sm">Thumbnail</span>
              </div>
              {/* Description Section */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-brandcolour2">{project.title}</h2>
                <p className="text-sm text-foreground/70">{project.description}</p>
                <span className="text-xs text-brandcolour1 font-mono mt-2">{project.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
