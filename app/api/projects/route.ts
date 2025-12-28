import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Project {
  slug: string;
  title: string;
  date: string;
  description: string;
  thumbnail: string;
}

export async function GET() {
  try {
    const projectsDirectory = path.join(process.cwd(), 'content/projects');
    const filenames = fs.readdirSync(projectsDirectory);
    
    const projects: Project[] = filenames
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => {
        const filePath = path.join(projectsDirectory, name);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          slug: name.replace(/\.mdx$/, ''),
          title: data.title,
          date: data.date,
          description: data.description,
          thumbnail: data.thumbnail,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error reading projects:', error);
    return NextResponse.json(
      { error: 'Failed to load projects' },
      { status: 500 }
    );
  }
}

