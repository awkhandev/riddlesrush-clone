import type { PatternKey } from "@/lib/visual";

interface PatternProps {
  className?: string;
}

/**
 * Decorative SVG patterns rendered at low opacity behind hero art.
 * They are purely decorative (aria-hidden) and use currentColor so
 * each theme can tint them via text-white / opacity utilities.
 */
export function ArtPattern({ pattern, className = "" }: PatternProps & { pattern: PatternKey }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 600"
      >
        <PatternInner pattern={pattern} />
      </svg>
    </div>
  );
}

function PatternInner({ pattern }: { pattern: PatternKey }) {
  switch (pattern) {
    case "dots":
      return (
        <g fill="currentColor" opacity="0.14">
          {Array.from({ length: 40 }).map((_, i) => {
            const x = (i * 137) % 1200;
            const y = (i * 97) % 800;
            return <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 10 : 5} />;
          })}
        </g>
      );
    case "stars":
      return (
        <g fill="currentColor" opacity="0.16">
          {Array.from({ length: 24 }).map((_, i) => {
            const x = (i * 211) % 1200;
            const y = (i * 149) % 800;
            const s = 14 + (i % 5) * 6;
            return (
              <path key={i} transform={`translate(${x} ${y})`} d={`M0 ${-s} L${s * 0.3} ${-s * 0.3} L${s} 0 L${s * 0.3} ${s * 0.3} L0 ${s} L${-s * 0.3} ${s * 0.3} L${-s} 0 L${-s * 0.3} ${-s * 0.3} Z`} />
            );
          })}
        </g>
      );
    case "puzzle":
      return (
        <g stroke="currentColor" strokeWidth="2" opacity="0.12" fill="none">
          {Array.from({ length: 20 }).map((_, i) => {
            const x = (i % 6) * 200;
            const y = Math.floor(i / 6) * 200;
            return <circle key={i} cx={x + 100} cy={y + 100} r={90} />;
          })}
        </g>
      );
    case "waves":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="40" opacity="0.1">
          {[0, 160, 320].map((dy) => (
            <path key={dy} d={`M0 ${400 + dy} C 300 ${300 + dy} 500 ${500 + dy} 800 ${400 + dy} S 1300 ${300 + dy} 1400 ${400 + dy} L1400 0 L0 0 Z`} />
          ))}
        </g>
      );
    case "confetti":
      return (
        <g fill="currentColor" opacity="0.16">
          {Array.from({ length: 60 }).map((_, i) => {
            const x = (i * 173) % 1200;
            const y = (i * 71) % 800;
            const w = 6 + (i % 4) * 4;
            const h = 10 + (i % 3) * 6;
            return (
              <rect key={i} x={x} y={y} width={w} height={h} rx={2} transform={`rotate(${(i * 37) % 360} ${x + w / 2} ${y + h / 2})`} />
            );
          })}
        </g>
      );
    case "rings":
      return (
        <g stroke="currentColor" fill="none" strokeWidth="6" opacity="0.14">
          {Array.from({ length: 10 }).map((_, i) => {
            const x = (i * 120) % 1200;
            const y = (i * 83) % 800;
            return <circle key={i} cx={x} cy={y} r={30 + (i % 3) * 20} />;
          })}
        </g>
      );
    case "grid":
      return (
        <g stroke="currentColor" strokeWidth="2" opacity="0.1">
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 171} y1="0" x2={i * 171} y2="800" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 133} x2="1200" y2={i * 133} />
          ))}
        </g>
      );
    case "sparkles":
      return (
        <g fill="currentColor" opacity="0.18">
          {Array.from({ length: 30 }).map((_, i) => {
            const x = (i * 139) % 1200;
            const y = (i * 61) % 800;
            const s = 6 + (i % 4) * 5;
            return (
              <path key={i} transform={`translate(${x} ${y})`} d={`M0 ${-s} L${s * 0.35} ${-s * 0.35} L${s} 0 L${s * 0.35} ${s * 0.35} L0 ${s} L${-s * 0.35} ${s * 0.35} L${-s} 0 L${-s * 0.35} ${-s * 0.35} Z`} />
            );
          })}
        </g>
      );
    case "balloons":
      return (
        <g fill="currentColor" opacity="0.14">
          {Array.from({ length: 16 }).map((_, i) => {
            const x = (i * 173 + 60) % 1200;
            const y = (i * 89 + 40) % 800;
            const r = 26 + (i % 5) * 8;
            return (
              <circle key={i} cx={x} cy={y} r={r} />
            );
          })}
        </g>
      );
    case "hearts":
      return (
        <g fill="currentColor" opacity="0.15">
          {Array.from({ length: 18 }).map((_, i) => {
            const x = (i * 151) % 1200;
            const y = (i * 83) % 800;
            const s = 12 + (i % 4) * 5;
            return (
              <path key={i} transform={`translate(${x} ${y}) scale(${s / 16})`} d="M16 28c-8-6-14-11-14-17a6 6 0 0 1 11-3c1.5 2 3 4 3 4s1.5-2 3-4a6 6 0 0 1 11 3c0 6-6 11-14 17z" />
            );
          })}
        </g>
      );
    case "leaves":
      return (
        <g fill="currentColor" opacity="0.14">
          {Array.from({ length: 20 }).map((_, i) => {
            const x = (i * 127) % 1200;
            const y = (i * 73) % 800;
            return (
              <ellipse key={i} cx={x} cy={y} rx={26 + (i % 4) * 8} ry={14} transform={`rotate(${(i * 53) % 180} ${x} ${y})`} />
            );
          })}
        </g>
      );
    case "flame":
      return (
        <g fill="currentColor" opacity="0.12">
          {Array.from({ length: 14 }).map((_, i) => {
            const x = (i * 173 + 80) % 1200;
            const y = (i * 97 + 60) % 800;
            const s = 18 + (i % 3) * 12;
            return (
              <path key={i} transform={`translate(${x} ${y}) scale(${s / 24})`}
                d="M0 0c4 5 10 9 10 16a10 10 0 0 1-20 0c0-7 6-11 10-16zM3 18a2 2 0 0 0 4 0c0-2-2-3-2-5-2 1-2 4-2 5z" />
            );
          })}
        </g>
      );
    case "sparkle":
      return (
        <g fill="currentColor" opacity="0.16">
          {Array.from({ length: 12 }).map((_, i) => {
            const x = (i * 193) % 1200;
            const y = (i * 109) % 800;
            const s = 10 + (i % 4) * 8;
            return (
              <path key={i} transform={`translate(${x} ${y})`} d={`M0 ${-s} L${s * 0.35} ${-s * 0.35} L${s} 0 L${s * 0.35} ${s * 0.35} L0 ${s} L${-s * 0.35} ${s * 0.35} L${-s} 0 L${-s * 0.35} ${-s * 0.35} Z`} />
            );
          })}
        </g>
      );
    default:
      return null;
  }
}