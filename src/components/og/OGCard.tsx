import type { Theme } from "@/lib/visual";
import { pickEmojis } from "@/lib/visual";

interface OGCardProps {
  theme: Theme;
  emoji: string;
  title: string;
  subtitle?: string;
  badge?: string;
}

const ROTATIONS = ["rotate(14deg)", "rotate(-10deg)", "rotate(22deg)"];

const CIRCLES = [
  { width: 420, height: 420, right: -120, top: -140 },
  { width: 300, height: 300, left: -90, bottom: -120 },
  { width: 180, height: 180, right: 180, bottom: -70 },
];

const FLOAT_POS = [
  { left: 64, top: 96, fontSize: 58 },
  { right: 64, top: 120, fontSize: 74 },
  { left: 120, bottom: 84, fontSize: 64 },
];

/**
 * Shared 1200×630 layout for programmatic OG images. Uses the theme's
 * gradient + deterministic emoji cluster + focal emoji + title, so every
 * route gets a distinct, on-brand social share card.
 */
export function OGCard({ theme, emoji, title, subtitle, badge }: OGCardProps) {
  const [c1, c2] = theme.og;
  const floaters = pickEmojis(theme, "og-card", 3);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
        color: "white",
        fontFamily: "'Gabarito', 'Helvetica Neue', Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
        padding: "56px",
      }}
    >
      {/* Soft decorative circles */}
      {CIRCLES.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            ...c,
          }}
        />
      ))}

      {/* Floating theme emojis */}
      {floaters.map((e, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            opacity: 0.55,
            transform: ROTATIONS[i],
            ...FLOAT_POS[i],
          }}
        >
          {e}
        </div>
      ))}

      {/* Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(255,255,255,0.22)",
          borderRadius: 999,
          padding: "10px 20px",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        {badge || "Riddles Rush"}
      </div>

      {/* Focal emoji */}
      <div style={{ fontSize: 112, lineHeight: 1, margin: "26px 0 10px" }}>
        {emoji}
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 54,
          fontWeight: 700,
          textAlign: "center",
          maxWidth: 920,
          lineHeight: 1.15,
        }}
      >
        {title}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            fontSize: 25,
            textAlign: "center",
            maxWidth: 780,
            marginTop: 20,
            opacity: 0.92,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}