import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/Card';
import { projectTags } from '@/content/projects/tags';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projectsDirectory = path.join(process.cwd(), 'content/projects');
  const filenames = fs.readdirSync(projectsDirectory);
  
  return filenames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => ({
      slug: name.replace(/\.mdx$/, ''),
    }));
}

export default async function Project({ params }: PageProps) {
  const { slug } = params;
  
  try {
    const filePath = path.join(process.cwd(), 'content/projects', `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return (
      <main className="min-h-screen px-4 tablet:px-6 desktop:px-8 py-12 tablet:py-16 desktop:py-20">
        <div className="max-w-[1200px] border-2 border-green-500 mx-auto">
          {/* Back Button */}
          <div className="mb-6 tablet:mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2C2C2C] border-2 border-white/30 text-foreground hover:border-brandcolour1 transition-[border-color] no-underline hover:no-underline"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-mono">Back to Projects</span>
            </Link>
          </div>
          
          {/* Header Section */}
          <div className="mb-8 tablet:mb-12">
            <Card className="p-8">
              <h1 className="text-4xl tablet:text-5xl font-bold mb-4">{data.title}</h1>
              <div className="flex flex-col gap-4">
                <span className="text-xs text-brandcolour1 font-mono">{data.date}</span>
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {data.tags?.map((tagSlug: string) => {
                    const tag = projectTags[tagSlug];
                    if (!tag) return null;
                    return (
                      <span
                        key={tagSlug}
                        className="px-2 py-1 text-xs font-mono rounded"
                        style={{ 
                          backgroundColor: tag.color + '20',
                          color: tag.color,
                          border: `1px solid ${tag.color}40`
                        }}
                      >
                        {tag.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>

          {/* MDX Content */}
          <Card className="p-8">
            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-brandcolour1 prose-strong:text-foreground prose-code:text-brandcolour1 prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
              <MDXRemote source={content} />
            </div>
          </Card>
        </div>
      </main>
    );
  } catch (error) {
    notFound();
  }
}

