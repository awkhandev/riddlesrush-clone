import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
  size?: number;
}

export function ChevronDownIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-chevron-down", className)}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function DownloadIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-download", className)}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

export function MenuIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-menu", className)}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export function XIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-x", className)}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function ArrowRightIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-arrow-right", className)}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function SendIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-send", className)}
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export function YoutubeIcon({ className, size = 20 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function MailIcon({ className, size = 20 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-mail", className)}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function ExternalLinkIcon({ className, size = 14 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-external-link", className)}
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

export function BrainIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      🧠
    </span>
  );
}

export function LightbulbIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      💡
    </span>
  );
}

export function PuzzleIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      🧩
    </span>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      ⭐
    </span>
  );
}

export function FireIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      🔥
    </span>
  );
}

export function BriefcaseIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      💼
    </span>
  );
}

export function CarIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      🚗
    </span>
  );
}

export function HomeIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      🏠
    </span>
  );
}

export function BookIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      📚
    </span>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      👁️
    </span>
  );
}

export function LeafIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      🍂
    </span>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      👥
    </span>
  );
}

export function TeddyBearIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      🧸
    </span>
  );
}

export function ZapIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      ⚡
    </span>
  );
}

export function LinkIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      🔗
    </span>
  );
}

export function PartyIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      🎉
    </span>
  );
}

export function FamilyIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      👨‍👩‍👧‍👦
    </span>
  );
}

export function TreeIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      🌲
    </span>
  );
}

export function PizzaIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      🍕
    </span>
  );
}

export function SoccerIcon({ className }: IconProps) {
  return (
    <span className={cn("text-7xl filter drop-shadow-lg", className)}>
      ⚽
    </span>
  );
}

export function TargetIcon({ className }: IconProps) {
  return (
    <span className={cn("inline", className)}>🎯</span>
  );
}
