import type { Theme } from "@/lib/visual";
import { pickEmojis } from "@/lib/visual";
import { ArtPattern } from "./ArtPattern";

interface ArtThumbProps {
  theme: Theme;
  emoji: string;
  /** Per-post seed so two cards in the same category still differ */
  seed?: string;
  /** Optional index to shift the visual further */
  index?: number;
  className?: string;
}

/**
 * Card-sized decorative thumbnail (16/9) used on blog index, paginated,
 * category, and related-post grids. Composes the theme gradient, an SVG
 * pattern overlay, a centered emoji, and two small corner emojis picked
 * deterministically per seed — so no two cards look identical.
 */
export function ArtThumb({
  theme,
  emoji,
  seed = "thumb",
  index = 0,
  className = "",
}: ArtThumbProps) {
  const corner = pickEmojis(theme, `${seed}-${index}`, 2);
  const corners = [
    "left-3 top-2 text-2xl opacity-50",
    "right-3 bottom-2 text-3xl opacity-50",
  ];

  return (
    <div
      aria-hidden="true"
      className={`relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br ${theme.gradient} ${className}`}
    >
      <ArtPattern pattern={theme.pattern} className="text-white/50" />

      {/* Floating corner emojis */}
      <div className="pointer-events-none absolute inset-0">
        {corner.map((e, i) => (
          <span
            key={i}
            className={`absolute drop-shadow ${corners[i]} animate-float animate-float-delay-${i + 1}`}
          >
            {e}
          </span>
        ))}
      </div>

      {/* Focal emoji */}
      <span className="relative text-6xl drop-shadow-lg sm:text-7xl">
        {emoji}
      </span>
    </div>
  );
}