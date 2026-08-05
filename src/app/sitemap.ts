import type { MetadataRoute } from "next";
import {
  getAllBlogSlugs,
  getAllRiddleTypeSlugs,
  getAllCategorySlugs,
  getAllBlogPosts,
} from "@/lib/content";

const BASE_URL = "https://riddles-rush.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
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
      lastModified: now,
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

  // Blog posts
  const blogSlugs = getAllBlogSlugs();
  const blogPosts: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Blog pagination pages (2 through 40)
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

  // Category pages
  const categorySlugs = getAllCategorySlugs();
  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/blog/category/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Riddle pages
  const riddleSlugs = getAllRiddleTypeSlugs();
  const riddlePages: MetadataRoute.Sitemap = riddleSlugs.map((slug) => ({
    url: `${BASE_URL}/riddles/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...blogPosts,
    ...paginationPages,
    ...categoryPages,
    ...riddlePages,
  ];
}
