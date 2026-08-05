import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a Riddle | Share Your Brain Teasers",
  description:
    "Have a great riddle? Submit it to Riddles Rush and share your brain teasers with our community of puzzle lovers.",
  openGraph: {
    title: "Submit a Riddle | Riddles Rush",
    description:
      "Have a great riddle? Submit it to Riddles Rush and share your brain teasers.",
    url: "https://riddles-rush.vercel.app/submit-riddle",
    siteName: "Riddles Rush",
    type: "website",
  },
  alternates: {
    canonical: "https://riddles-rush.vercel.app/submit-riddle",
  },
};

export default function SubmitRiddleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
