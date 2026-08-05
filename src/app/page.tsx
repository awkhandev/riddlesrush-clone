import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PopularCollections } from "@/components/PopularCollections";
import { AppDownloadSection } from "@/components/AppDownloadSection";
import { BrowseByType } from "@/components/BrowseByType";
import { AboutSection } from "@/components/AboutSection";
import { TopCollections } from "@/components/TopCollections";
import { TriviaSection } from "@/components/TriviaSection";
import { BlogCategories } from "@/components/BlogCategories";
import { SubmitRiddleSection } from "@/components/SubmitRiddleSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riddles Rush | Free Riddles, Brain Teasers & Puzzles for All Ages",
  description:
    "Challenge your brain with hundreds of free riddles, brain teasers, and puzzles for kids and adults. Browse collections by theme, difficulty, and occasion.",
  openGraph: {
    title: "Riddles Rush | Free Riddles, Brain Teasers & Puzzles",
    description:
      "Challenge your brain with hundreds of free riddles, brain teasers, and puzzles for kids and adults.",
    url: "https://riddles-rush.vercel.app",
    siteName: "Riddles Rush",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        <div className="flex flex-col w-full">
          <HeroSection />
          <PopularCollections />
          <AppDownloadSection />
          <BrowseByType />
          <AboutSection />
          <TopCollections />
          <TriviaSection />
          <BlogCategories />
          <SubmitRiddleSection />
          <FaqSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
