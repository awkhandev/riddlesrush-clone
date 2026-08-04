// ============================================================
// Markdown Content System — Reading & Querying Utilities
// ============================================================
// This module reads .md files from the content/ directory,
// parses their frontmatter, and returns typed data that
// page components can use.
// ============================================================

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  BlogPost,
  BlogPostSummary,
  RiddleType,
  RiddleItem,
  Category,
} from "@/types/content";

// ── Paths ──────────────────────────────────────────────────────
const CONTENT_DIR = path.join(process.cwd(), "content");
const BLOG_DIR = path.join(CONTENT_DIR, "blog");
const RIDDLES_DIR = path.join(CONTENT_DIR, "riddles");
const CATEGORIES_DIR = path.join(CONTENT_DIR, "categories");

// ── Helpers ────────────────────────────────────────────────────

/** Read a markdown file and parse its frontmatter */
function readMarkdown<T>(filePath: string): { frontmatter: T; content: string } {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as T, content };
}

/** Calculate a rough reading time from content length */
function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

/** Get all .md filenames in a directory (without extension) */
function getSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

// ── Blog Posts ─────────────────────────────────────────────────

/** Get all blog post slugs (for generateStaticParams) */
export function getAllBlogSlugs(): string[] {
  return getSlugs(BLOG_DIR);
}

/** Get a single blog post by slug */
export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const { frontmatter, content } = readMarkdown<BlogPost["frontmatter"]>(filePath);
  return {
    frontmatter,
    content,
    slug,
    readingTime: estimateReadingTime(content),
  };
}

/** Get all blog posts (sorted by date, newest first) */
export function getAllBlogPosts(): BlogPostSummary[] {
  const slugs = getSlugs(BLOG_DIR);
  const posts = slugs
    .map((slug) => {
      const post = getBlogPost(slug);
      if (!post) return null;
      return {
        frontmatter: post.frontmatter,
        slug: post.slug,
        readingTime: post.readingTime,
      };
    })
    .filter(Boolean) as BlogPostSummary[];

  // Sort by published date (newest first)
  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  );

  return posts;
}

/** Get blog posts for a specific category */
export function getBlogPostsByCategory(categorySlug: string): BlogPostSummary[] {
  return getAllBlogPosts().filter(
    (post) => post.frontmatter.categorySlug === categorySlug
  );
}

/** Get paginated blog posts */
export function getPaginatedBlogPosts(
  page: number = 1,
  perPage: number = 12
): { posts: BlogPostSummary[]; totalPages: number; currentPage: number } {
  const allPosts = getAllBlogPosts();
  const totalPages = Math.ceil(allPosts.length / perPage);
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  const posts = allPosts.slice(start, start + perPage);

  return { posts, totalPages, currentPage };
}

// ── Riddle Types / Hub Pages ───────────────────────────────────

/** Get all riddle type slugs (for generateStaticParams) */
export function getAllRiddleTypeSlugs(): string[] {
  return getSlugs(RIDDLES_DIR);
}

/** Get a riddle type hub page with its riddles */
export function getRiddleType(slug: string): RiddleType | null {
  const filePath = path.join(RIDDLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const { frontmatter, content } = readMarkdown<RiddleType["frontmatter"]>(filePath);

  // Parse riddles from the markdown content
  // Expected format: each riddle is a numbered heading followed by Q/A
  const riddles = parseRiddlesFromMarkdown(content, slug);

  return {
    frontmatter,
    riddles,
  };
}

/** Parse riddle Q&A pairs from markdown content */
function parseRiddlesFromMarkdown(content: string, typeSlug: string): RiddleItem[] {
  const riddles: RiddleItem[] = [];

  // Split by numbered headings (## 1. or ### 1. etc.)
  const sections = content.split(/(?=^##\s+\d+[.)]\s)/m);

  for (const section of sections) {
    if (!section.trim()) continue;

    // Extract question and answer
    const questionMatch = section.match(/(?:^##\s+\d+[.)]\s+)(.+?)(?:\n)/m);
    const answerMatch = section.match(/\*\*Answer:\*\*\s*(.+)/i);

    if (questionMatch) {
      const question = questionMatch[1].trim();
      const answer = answerMatch ? answerMatch[1].trim() : "";

      // Create a slug from the question
      const riddleSlug = question
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 60);

      riddles.push({
        question,
        answer,
        slug: `${typeSlug}/${riddleSlug}`,
      });
    }
  }

  return riddles;
}

/** Get a single riddle by its combined slug (e.g. "tricky-riddles/my-riddle") */
export function getRiddleBySlug(combinedSlug: string): {
  riddle: RiddleItem;
  typeSlug: string;
  type: RiddleType;
} | null {
  const parts = combinedSlug.split("/");
  if (parts.length !== 2) return null;

  const [typeSlug, riddleSlug] = parts;
  const type = getRiddleType(typeSlug);
  if (!type) return null;

  const riddle = type.riddles.find((r) => r.slug === combinedSlug);
  if (!riddle) return null;

  return { riddle, typeSlug, type };
}

// ── Categories ─────────────────────────────────────────────────

/** Get all categories */
export function getAllCategories(): Category[] {
  const slugs = getSlugs(CATEGORIES_DIR);
  return slugs
    .map((slug) => {
      const filePath = path.join(CATEGORIES_DIR, `${slug}.md`);
      const { frontmatter } = readMarkdown<Category>(filePath);
      return frontmatter;
    })
    .filter(Boolean);
}

/** Get a single category by slug */
export function getCategory(slug: string): Category | null {
  const filePath = path.join(CATEGORIES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const { frontmatter } = readMarkdown<Category>(filePath);
  return frontmatter;
}

/** Get all category slugs (for generateStaticParams) */
export function getAllCategorySlugs(): string[] {
  return getSlugs(CATEGORIES_DIR);
}
