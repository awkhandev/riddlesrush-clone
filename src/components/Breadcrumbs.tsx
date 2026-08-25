import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-600 flex flex-wrap items-center gap-1">
      <Link
        href="/"
        className="inline-flex items-center min-h-[48px] gap-1 text-gray-600 hover:text-[#7736FE] transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
          {item.href ? (
            <Link
              href={item.href}
              className="inline-flex items-center min-h-[48px] hover:text-[#7736FE] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium line-clamp-1">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
