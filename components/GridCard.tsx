import Link from 'next/link';

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
}

export default function GridCard({
  slug,
  title,
  description,
  date,
  tags = [],
  tagsMap,
  hrefPrefix,
}: GridCardProps) {
  return (
    <Link
      href={`${hrefPrefix}/${slug}`}
      className="flex flex-col rounded-2xl border-2 border-white/30 overflow-hidden hover:border-brandcolour1 transition-[border-color] cursor-pointer no-underline hover:no-underline text-inherit hover:text-inherit h-full"
    >
      {/* Thumbnail */}
      <div className="w-full aspect-video bg-gradient-to-br from-brandcolour1/20 to-brandcolour2/20 flex items-center justify-center flex-shrink-0">
        <span className="text-foreground/50 text-sm">Thumbnail</span>
      </div>
      {/* Description Section */}
      <div className="p-4 flex flex-col gap-2 bg-[#2C2C2C] flex-1 min-h-0">
        <h2 className="text-xl font-semibold text-brandcolour2 line-clamp-2 leading-tight">{title}</h2>
        <p className="text-sm text-foreground/70 line-clamp-3 leading-snug">{description}</p>
        <span className="text-xs text-brandcolour1 font-mono mt-auto flex-shrink-0">{date}</span>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2 overflow-hidden max-h-8">
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
      </div>
    </Link>
  );
}

