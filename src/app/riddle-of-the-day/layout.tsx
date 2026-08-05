import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riddle of the Day | Daily Brain Teasers & Puzzles",
  description:
    "Challenge yourself with today's featured riddle! A new brain teaser every day for kids and adults. Fun, free, and perfect for daily brain training.",
  openGraph: {
    title: "Riddle of the Day | Riddles Rush",
    description:
      "Challenge yourself with today's featured riddle! A new brain teaser every day.",
    url: "https://riddles-rush.vercel.app/riddle-of-the-day",
    siteName: "Riddles Rush",
    type: "website",
  },
  alternates: {
    canonical: "https://riddles-rush.vercel.app/riddle-of-the-day",
  },
};

export default function RiddleOfTheDayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
