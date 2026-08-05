import type { Metadata } from "next";
import type { BlogPost, Category, RiddleType } from "@/types/content";

const SITE_NAME = "Riddles Rush";
const BASE_URL = "https://riddles-rush.vercel.app";

export function generateBlogPostMetadata(post: BlogPost): Metadata {
  const title = post.frontmatter.metaTitle || post.frontmatter.title;
  const description =
    post.frontmatter.metaDescription || post.frontmatter.description;
  const url = `${BASE_URL}/blog/${post.frontmatter.slug}`;
  const ogImage = post.frontmatter.emoji
    ? `/images/og-blog-${post.frontmatter.slug}.png`
    : "/images/og-default.png";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.frontmatter.publishedAt,
      modifiedTime: post.frontmatter.updatedAt || post.frontmatter.publishedAt,
      authors: [post.frontmatter.author || "Patrick Stevens"],
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateCategoryMetadata(
  category: Category,
): Metadata {
  const title = category.name;
  const description = category.description || `Browse ${category.name} riddles and brain teasers.`;
  const url = `${BASE_URL}/blog/category/${category.slug}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateRiddleMetadata(
  type: RiddleType,
  isHub: boolean,
): Metadata {
  const title = type.frontmatter.title;
  const description = type.frontmatter.description;
  const url = `${BASE_URL}/riddles/${type.frontmatter.slug}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateGenericPageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}
