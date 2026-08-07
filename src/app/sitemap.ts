import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  getAllBlogSlugs,
  getAllRiddleTypeSlugs,
  getAllCategorySlugs,
} from "@/lib/content";

const BASE_URL = "https://riddles-rush.vercel.app";
const CONTENT_DIR = path.join(process.cwd(), "content");

/** Get the last modified date of a markdown file */
function getFileDate(filePath: string): Date {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    if (data.updatedAt) return new Date(data.updatedAt);
    if (data.publishedAt) return new Date(data.publishedAt);
    const stat = fs.statSync(filePath);
    return stat.mtime;
  } catch {
    return new Date();
  }
}

/** Get all individual riddle slugs from hub files */
function getAllIndividualRiddleSlugs(): string[] {
  const typeSlugs = getAllRiddleTypeSlugs();
  const allRiddleSlugs: string[] = [];

  for (const typeSlug of typeSlugs) {
    const filePath = path.join(CONTENT_DIR, "riddles", `${typeSlug}.md`);
    if (!fs.existsSync(filePath)) continue;
    const raw = fs.readFileSync(filePath, "utf-8");
    const content = raw.split(/^---\s*$/m)[2] || "";

    const sections = content.split(/(?=^##\s+\d+[.)]\s)/m);
    for (const section of sections) {
      if (!section.trim()) continue;
      const questionMatch = section.match(/(?:^##\s+\d+[.)]\s+)(.+?)(?:\n)/m);
      if (!questionMatch) continue;
      const riddleSlug = questionMatch[1].trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 60);
      allRiddleSlugs.push(`${typeSlug}/${riddleSlug}`);
    }
  }

  return allRiddleSlugs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Static pages ──────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog/category`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/riddle-of-the-day`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: getFileDate(path.join(CONTENT_DIR, "../src/app/about/page.tsx")),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/submit-riddle`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // ── Blog posts ────────────────────────────────────────────────
  const blogSlugs = getAllBlogSlugs();
  const blogPosts: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: getFileDate(path.join(CONTENT_DIR, "blog", `${slug}.md`)),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ── Blog pagination (pages 2-N) ──────────────────────────────
  const totalPages = Math.ceil(blogSlugs.length / 12);
  const paginationPages: MetadataRoute.Sitemap = [];
  for (let i = 2; i <= totalPages; i++) {
    paginationPages.push({
      url: `${BASE_URL}/blog/page/${i}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  // ── Category pages ───────────────────────────────────────────
  const categorySlugs = getAllCategorySlugs();
  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/blog/category/${slug}`,
    lastModified: getFileDate(path.join(CONTENT_DIR, "categories", `${slug}.md`)),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // ── Riddle hub pages ─────────────────────────────────────────
  const riddleTypeSlugs = getAllRiddleTypeSlugs();
  const riddleHubPages: MetadataRoute.Sitemap = riddleTypeSlugs.map((slug) => ({
    url: `${BASE_URL}/riddles/${slug}`,
    lastModified: getFileDate(path.join(CONTENT_DIR, "riddles", `${slug}.md`)),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // ── Individual riddle pages ──────────────────────────────────
  const individualRiddleSlugs = getAllIndividualRiddleSlugs();
  const individualRiddlePages: MetadataRoute.Sitemap = individualRiddleSlugs.map(
    (slug) => ({
      url: `${BASE_URL}/riddles/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  return [
    ...staticPages,
    ...blogPosts,
    ...paginationPages,
    ...categoryPages,
    ...riddleHubPages,
    ...individualRiddlePages,
  ];
}
