import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "./globals.css";

const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://riddles-rush.vercel.app"),
  title: {
    default: "Riddles Rush | Free Riddles, Brain Teasers & Puzzles",
    template: "%s | Riddles Rush",
  },
  description:
    "Challenge your brain with free riddles, brain teasers, and puzzles for kids and adults. Browse hundreds of riddle collections organized by theme, difficulty, and occasion.",
  icons: {
    icon: "/images/riddlesrush-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Riddles Rush",
    title: "Riddles Rush | Free Riddles, Brain Teasers & Puzzles",
    description:
      "Challenge your brain with free riddles, brain teasers, and puzzles for kids and adults. Browse hundreds of riddle collections organized by theme, difficulty, and occasion.",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Riddles Rush - Free Riddles and Brain Teasers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Riddles Rush | Free Riddles, Brain Teasers & Puzzles",
    description:
      "Challenge your brain with free riddles, brain teasers, and puzzles for kids and adults.",
    images: ["/images/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://riddles-rush.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gabarito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
