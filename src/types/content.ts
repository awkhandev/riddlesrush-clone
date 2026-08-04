// ============================================================
// Content Types for the Markdown-based content system
// ============================================================

/** Frontmatter for a blog post (the --- section at the top of each .md file) */
export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: string;
  categorySlug: string;
  emoji: string;
  publishedAt: string;       // ISO date string e.g. "2025-07-04"
  updatedAt?: string;        // ISO date string
  author?: string;
  tags?: string[];
  metaTitle?: string;        // SEO title override
  metaDescription?: string;  // SEO description override
}

/** A blog post after reading from disk */
export interface BlogPost {
  frontmatter: BlogPostFrontmatter;
  content: string;           // The raw markdown body
  slug: string;              // URL-friendly slug (derived from filename)
  readingTime: string;       // e.g. "3 min read"
}

/** A blog post as shown in a card (lighter — no full content) */
export interface BlogPostSummary {
  frontmatter: BlogPostFrontmatter;
  slug: string;
  readingTime: string;
}

/** Frontmatter for a riddle type/hub page */
export interface RiddleTypeFrontmatter {
  title: string;
  slug: string;
  description: string;
  emoji: string;
  category: string;          // e.g. "tricky", "short", "logic"
}

/** A riddle type hub page */
export interface RiddleType {
  frontmatter: RiddleTypeFrontmatter;
  riddles: RiddleItem[];
}

/** A single riddle */
export interface RiddleItem {
  question: string;
  answer: string;
  slug: string;
}

/** A category definition */
export interface Category {
  name: string;
  slug: string;
  emoji: string;
  description: string;
  color: string;             // tailwind color name
}
