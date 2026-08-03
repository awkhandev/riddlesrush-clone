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

export default function Home() {
  return (
    <>
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
