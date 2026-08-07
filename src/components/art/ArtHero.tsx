import type { ReactNode } from "react";
import Link from "next/link";
import type { Theme } from "@/lib/visual";
import { pickEmojis } from "@/lib/visual";
import { ArtPattern } from "./ArtPattern";

interface Crumb {
  label: string;
  href?: string;
}

interface ArtHeroProps {
  theme: Theme;
  emoji: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  badge?: string;
  seed?: string;
}

/**
 * Full-width gradient hero with a layered SVG pattern, floating
 * theme emojis, a large focal emoji, title, and description.
 * Used on hub pages, category pages, and blog post headers.
 */
export function ArtHero({
  theme,
  emoji,
  title,
  description,
  breadcrumbs,
  badge,
  seed = "hero",
}: ArtHeroProps) {
  const floaters = pickEmojis(theme, seed, 4);
  const positions = [
    "left-[6%] top-[18%]",
    "right-[8%] top-[24%]",
    "left-[10%] bottom-[16%]",
    "right-[12%] bottom-[12%]",
  ];

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${theme.gradient} text-white`}
    >
      <ArtPattern pattern={theme.pattern} className="text-white/60" />

      {/* Floating decorative emojis */}
      <div aria-hidden="true" className="pointer-events-none">
        {floaters.map((e, i) => (
          <span
            key={i}
            className={`absolute hidden text-5xl opacity-30 drop-shadow-lg animate-float sm:block ${
              positions[i]
            } animate-float-delay-${i + 1}`}
          >
            {e}
          </span>
        ))}
      </div>

      {/* Soft top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-white/80">
            {breadcrumbs.map((crumb, i) => (
              <span key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-white/50">/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="rounded transition-colors hover:text-white hover:underline"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-white">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="text-center">
          <span
            aria-hidden="true"
            className="mb-4 block text-7xl drop-shadow-xl sm:text-8xl lg:text-9xl"
          >
            {emoji}
          </span>
          <h1 className="font-heading text-4xl font-bold leading-tight drop-shadow-md sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">
              {description}
            </p>
          )}
          {badge && (
            <span className="mt-6 inline-flex items-center rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
              {badge}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}