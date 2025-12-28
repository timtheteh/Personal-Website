import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  thumbnail: string;
  tags: string[];
}

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/blog');
    const filenames = fs.readdirSync(postsDirectory);
    
    const posts: BlogPost[] = filenames
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => {
        const filePath = path.join(postsDirectory, name);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          slug: name.replace(/\.mdx$/, ''),
          title: data.title,
          date: data.date,
          description: data.description,
          thumbnail: data.thumbnail,
          tags: data.tags || [],
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to load blog posts' },
      { status: 500 }
    );
  }
}

