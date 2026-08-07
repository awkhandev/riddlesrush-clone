import { ImageResponse } from "next/og";
import { OGCard } from "@/components/og/OGCard";
import { getCategory } from "@/lib/content";
import { getBlogTheme } from "@/lib/visual";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = "Riddles Rush — riddle category";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) {
    return new Response("Not Found", { status: 404 });
  }

  const theme = getBlogTheme(category.slug);

  return new ImageResponse(
    <OGCard
      theme={theme}
      emoji={category.emoji}
      title={category.name}
      subtitle={category.description}
      badge="Riddle Category · Riddles Rush"
    />,
    {
      ...size,
    }
  );
}