import { ImageResponse } from "next/og";
import { OGCard } from "@/components/og/OGCard";
import { getThemeBySlug } from "@/lib/visual";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = "Riddles Rush — browse all riddle collections";

export default async function Image() {
  const theme = getThemeBySlug("answers");

  return new ImageResponse(
    <OGCard
      theme={theme}
      emoji="🧩"
      title="Riddles & Brain Teasers"
      subtitle="Browse hundreds of riddle collections for kids, adults, families, and more."
      badge="Riddles Rush"
    />,
    { ...size }
  );
}