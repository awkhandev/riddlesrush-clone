import { ImageResponse } from "next/og";
import { OGCard } from "@/components/og/OGCard";
import { getBlogPost } from "@/lib/content";
import { getBlogTheme } from "@/lib/visual";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = "Riddles Rush — themed riddle collection";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return new Response("Not Found", { status: 404 });
  }

  const theme = getBlogTheme(post.frontmatter.categorySlug);

  return new ImageResponse(
    <OGCard
      theme={theme}
      emoji={post.frontmatter.emoji}
      title={post.frontmatter.title}
      subtitle={post.frontmatter.description}
      badge={`${post.frontmatter.category} · Riddles Rush`}
    />,
    {
      ...size,
    }
  );
}