import Link from 'next/link';
import Image from 'next/image';

interface Tag {
  name: string;
  color: string;
}

interface GridCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  tagsMap: Record<string, Tag>;
  hrefPrefix: string;
  readingTime?: number;
  thumbnail?: string;
}

export default function GridCard({
  slug,
  title,
  description,
  date,
  tags = [],
  tagsMap,
  hrefPrefix,
  readingTime,
  thumbnail,
}: GridCardProps) {
  return (
    <Link
      href={`${hrefPrefix}/${slug}`}
      className="flex flex-col rounded-2xl border-2 border-white/30 overflow-hidden hover:border-brandcolour1 transition-[border-color] cursor-pointer no-underline hover:no-underline text-inherit hover:text-inherit h-full"
    >
      {/* Thumbnail */}
      <div className="w-full aspect-video bg-gradient-to-br from-brandcolour1/20 to-brandcolour2/20 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <span className="text-foreground/50 text-sm">Thumbnail</span>
        )}
      </div>
      {/* Description Section */}
      <div className="p-4 flex flex-col gap-2 bg-[#2C2C2C] flex-1 min-h-0">
        <h2 className="text-xl font-semibold text-brandcolour2 line-clamp-2 leading-tight min-h-[3rem]">{title}</h2>
        <p className="text-sm text-foreground/70 line-clamp-3 leading-snug min-h-[3.75rem]">{description}</p>
        <span className="text-xs text-brandcolour1 font-mono mt-auto flex-shrink-0">{date}</span>
        {/* Tags and Reading Time */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-2 overflow-hidden max-h-8">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 overflow-hidden max-h-8 flex-1 min-w-0">
            {tags.map((tagSlug) => {
              const tag = tagsMap[tagSlug];
              if (!tag) return null;
              return (
                <span
                  key={tagSlug}
                  className="px-2 py-1 text-xs font-mono rounded flex-shrink-0"
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
          {/* Reading Time - Right Aligned */}
          {readingTime !== undefined && (
            <div className="flex items-center gap-1 text-xs text-foreground/70 font-mono flex-shrink-0">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{readingTime} min</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

