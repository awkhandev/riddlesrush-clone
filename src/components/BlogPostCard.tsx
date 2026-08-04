import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BlogPostCardProps {
  title: string;
  description: string;
  slug: string;
  emoji: string;
  category?: string;
}

export function BlogPostCard({
  title,
  description,
  slug,
  emoji,
  category,
}: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-purple-300 transition-all duration-300"
    >
      <div className="aspect-[2/3] w-full overflow-hidden bg-gradient-to-b from-purple-50/70 to-gray-50 flex items-center justify-center">
        <span className="text-7xl select-none">{emoji}</span>
      </div>

      <div className="p-4 sm:p-5">
        {category && (
          <span className="inline-block text-xs font-medium text-[#7736FE] bg-purple-50 rounded-full px-2.5 py-1 mb-2">
            {category}
          </span>
        )}

        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#7736FE] transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="mt-1.5 text-sm text-gray-600 line-clamp-3">
          {description}
        </p>

        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
          Browse collection
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
