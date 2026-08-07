// ============================================================
// Visual Theme Registry — per-category gradients, patterns &
// emoji pools. Used across hubs, blog posts, cards, and OG
// images so every page gets a distinct, non-repetitive look.
// ============================================================

export type PatternKey =
  | "dots"
  | "stars"
  | "puzzle"
  | "waves"
  | "confetti"
  | "rings"
  | "grid"
  | "sparkles"
  | "balloons"
  | "hearts"
  | "leaves"
  | "flame"
  | "sparkle";

export interface Theme {
  id: string;
  /** Tailwind gradient stops for page-level art (from-* to-*) */
  gradient: string;
  /** Soft tint background classes for chips / circles */
  soft: string;
  /** Accent text color class */
  text: string;
  /** Solid border/accent class for small circles */
  chipBorder: string;
  /** Inline SVG pattern id */
  pattern: PatternKey;
  /** Two hex colors for raster (OG) rendering */
  og: [string, string];
  /** Decorative emoji pool (chosen deterministically per page) */
  emojis: string[];
}

// ── Themes ────────────────────────────────────────────────────

const themes: Record<string, Theme> = {
  kids: {
    id: "kids",
    gradient: "from-sky-400 via-cyan-400 to-emerald-400",
    soft: "bg-sky-100",
    text: "text-sky-700",
    chipBorder: "border-sky-200",
    pattern: "balloons",
    og: ["#38bdf8", "#34d399"],
    emojis: ["🧸", "🎈", "🦄", "🚀", "🌈", "🎨", "🐶", "🎠"],
  },
  adults: {
    id: "adults",
    gradient: "from-purple-500 via-violet-500 to-indigo-600",
    soft: "bg-purple-100",
    text: "text-purple-700",
    chipBorder: "border-purple-200",
    pattern: "puzzle",
    og: ["#8b5cf6", "#4f46e5"],
    emojis: ["🧠", "💡", "🎯", "♟️", "🔍", "🕵️", "🤔", "📐"],
  },
  holiday: {
    id: "holiday",
    gradient: "from-rose-500 via-red-500 to-amber-500",
    soft: "bg-rose-100",
    text: "text-rose-700",
    chipBorder: "border-rose-200",
    pattern: "stars",
    og: ["#f43f5e", "#f59e0b"],
    emojis: ["🎄", "🎃", "🦃", "🎆", "❄️", "🥚", "🎁", "🕯️"],
  },
  "what-am-i": {
    id: "what-am-i",
    gradient: "from-teal-400 via-cyan-500 to-blue-500",
    soft: "bg-teal-100",
    text: "text-teal-700",
    chipBorder: "border-teal-200",
    pattern: "rings",
    og: ["#2dd4bf", "#3b82f6"],
    emojis: ["❓", "💬", "🙃", "🧩", "🎲", "🕵️", "🔎", "❔"],
  },
  family: {
    id: "family",
    gradient: "from-pink-400 via-rose-500 to-orange-400",
    soft: "bg-pink-100",
    text: "text-pink-700",
    chipBorder: "border-pink-200",
    pattern: "hearts",
    og: ["#f472b6", "#fb923c"],
    emojis: ["👨‍👩‍👧‍👦", "🏡", "🎲", "🍽️", "🛋️", "🎉", "❤️", "📸"],
  },
  nature: {
    id: "nature",
    gradient: "from-green-400 via-emerald-500 to-lime-500",
    soft: "bg-green-100",
    text: "text-green-700",
    chipBorder: "border-green-200",
    pattern: "leaves",
    og: ["#4ade80", "#84cc16"],
    emojis: ["🌿", "🌳", "🌊", "🐞", "🦋", "🌻", "🦉", "⛰️"],
  },
  food: {
    id: "food",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    soft: "bg-orange-100",
    text: "text-orange-700",
    chipBorder: "border-orange-200",
    pattern: "confetti",
    og: ["#fbbf24", "#ef4444"],
    emojis: ["🍕", "🍩", "🍎", "🥑", "🍪", "🧁", "🍉", "🥨"],
  },
  sports: {
    id: "sports",
    gradient: "from-sky-400 via-blue-500 to-indigo-500",
    soft: "bg-blue-100",
    text: "text-blue-700",
    chipBorder: "border-blue-200",
    pattern: "grid",
    og: ["#38bdf8", "#6366f1"],
    emojis: ["⚽", "🏀", "🏈", "🎾", "⚾", "🏐", "🥅", "🏆"],
  },
  hard: {
    id: "hard",
    gradient: "from-red-500 via-orange-500 to-amber-600",
    soft: "bg-red-100",
    text: "text-red-700",
    chipBorder: "border-red-200",
    pattern: "flame",
    og: ["#ef4444", "#ea580c"],
    emojis: ["🔥", "💪", "🧗", "⚡", "🧊", "🌋", "🌶️", "🔨"],
  },
  logic: {
    id: "logic",
    gradient: "from-indigo-400 via-blue-500 to-cyan-500",
    soft: "bg-indigo-100",
    text: "text-indigo-700",
    chipBorder: "border-indigo-200",
    pattern: "grid",
    og: ["#6366f1", "#06b6d4"],
    emojis: ["🔗", "🧮", "📊", "⚙️", "📏", "🎯", "🤖", "🧬"],
  },
  tricky: {
    id: "tricky",
    gradient: "from-fuchsia-500 via-purple-500 to-pink-500",
    soft: "bg-fuchsia-100",
    text: "text-fuchsia-700",
    chipBorder: "border-fuchsia-200",
    pattern: "sparkles",
    og: ["#d946ef", "#ec4899"],
    emojis: ["🃏", "🎩", "🪄", "✨", "🎭", "♠️", "♥️", "🪙"],
  },
  short: {
    id: "short",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    soft: "bg-emerald-100",
    text: "text-emerald-700",
    chipBorder: "border-emerald-200",
    pattern: "waves",
    og: ["#34d399", "#06b6d4"],
    emojis: ["⚡", "⏱️", "💨", "🦅", "🍃", "🌪️", "🕓", "🐆"],
  },
  answers: {
    id: "answers",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    soft: "bg-violet-100",
    text: "text-violet-700",
    chipBorder: "border-violet-200",
    pattern: "sparkle",
    og: ["#8b5cf6", "#d946ef"],
    emojis: ["🏆", "✅", "🌟", "💡", "📚", "🧩", "🪶", "🔮"],
  },
};

// ─── Lookups ──────────────────────────────────────────────────

const blogCategoryMap: Record<string, Theme> = {
  "kids-riddles": themes.kids,
  "adult-riddles": themes.adults,
  "holiday-riddles": themes.holiday,
  "what-am-i-riddles": themes["what-am-i"],
  "family-riddles": themes.family,
  "nature-riddles": themes.nature,
  "food-riddles": themes.food,
  "sports-riddles": themes.sports,
};

const riddleHubMap: Record<string, Theme> = {
  kids: themes.kids,
  "kids-riddles": themes.kids,
  adults: themes.adults,
  "adult-riddles": themes.adults,
  holidays: themes.holiday,
  food: themes.food,
  sports: themes.sports,
  family: themes.family,
  nature: themes.nature,
  "what-am-i": themes["what-am-i"],
  "hard-riddles": themes.hard,
  "logic-riddles": themes.logic,
  "tricky-riddles": themes.tricky,
  "short-riddles": themes.short,
  "riddles-with-answers": themes.answers,
};

export function getThemeBySlug(slug: string): Theme {
  const key = (slug || "").toLowerCase();
  return (
    blogCategoryMap[key] ||
    riddleHubMap[key] ||
    themes[key] ||
    themes.answers
  );
}

export function getBlogTheme(categorySlug: string): Theme {
  return getThemeBySlug(categorySlug);
}

export function getRiddleTheme(hubSlug: string): Theme {
  return getThemeBySlug(hubSlug);
}

export function getFallbackTheme(): Theme {
  return themes.answers;
}

export const patternSuggestions: Record<
  PatternKey | string,
  { label: string; emoji: string }
> = {
  dots: { label: "polka dots", emoji: "🔵" },
  stars: { label: "stars", emoji: "⭐" },
  puzzle: { label: "puzzle", emoji: "🧩" },
  waves: { label: "waves", emoji: "🌊" },
  confetti: { label: "confetti", emoji: "🎊" },
  rings: { label: "rings", emoji: "⭕" },
  grid: { label: "grid", emoji: "🔲" },
  sparkles: { label: "sparkles", emoji: "✨" },
  balloons: { label: "balloons", emoji: "🎈" },
  hearts: { label: "hearts", emoji: "❤️" },
  leaves: { label: "leaves", emoji: "🍃" },
  flame: { label: "flame", emoji: "🔥" },
  sparkle: { label: "sparkle", emoji: "🌟" },
};

// ─── Helpers ─────────────────────────────────────────────────

/** Deterministic pseudo-random from a string seed */
export function seedFromString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Pick `count` emojis from a theme pool deterministically */
export function pickEmojis(theme: Theme, seed: string, count: number): string[] {
  const pool = theme.emojis;
  const base = seedFromString(seed);
  const start = base % pool.length;
  const picked: string[] = [];
  for (let i = 0; i < count; i++) {
    picked.push(pool[(start + i * 3 + ((base >> (i % 5)) & 1)) % pool.length]);
  }
  return picked;
}

/** Alt text for decorative art blocks (SEO-friendly, describes theme) */
export function artAlt(theme: Theme, label?: string): string {
  const p = patternSuggestions[theme.pattern];
  return label
    ? `${label} — ${p.emoji} ${p.label} themed illustration`
    : `${p.emoji} ${p.label} themed illustration`;
}