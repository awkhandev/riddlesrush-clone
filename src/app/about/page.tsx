import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrganizationSchema } from "@/components/seo/JsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About RiddlesRush",
  description:
    "Learn about RiddlesRush, a site for fun, clever, and family-friendly riddles, brain teasers, and trivia-style questions.",
  openGraph: {
    title: "Riddles Rush",
    description:
      "Engage your mind with Riddles Rush! Packed with challenging puzzles and brain teasers, helping to improve your problem-solving skills.",
    url: "https://www.riddlesrush.com/about",
    siteName: "Riddles Rush",
    type: "website",
  },
  alternates: {
    canonical: "https://www.riddlesrush.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <OrganizationSchema />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Patrick Stevens",
          url: "https://www.riddlesrush.com/about",
          jobTitle: "Software Developer",
          worksFor: {
            "@type": "Organization",
            name: "Riddles Rush",
          },
          knowsAbout: ["Riddles", "Brain Teasers", "Puzzles", "Web Development"],
        }}
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="grow">
          <div className="mx-auto mb-24 flex max-w-4xl flex-col space-y-4 px-5 pt-6 sm:pt-24 lg:px-0">
            <h1 className="mb-4 text-2xl font-bold">About RiddlesRush</h1>
            <div className="mt-2 space-y-6">
              <p>
                RiddlesRush is a place to discover fun, clever, family-friendly
                riddles, brain teasers, and trivia-style questions, whether you have
                a minute to spare or you are planning something bigger.
              </p>
              <section className="space-y-3">
                <h2 className="text-base font-bold">Why I Built RiddlesRush</h2>
                <p>
                  I wanted a simple, pleasant way for readers, parents, teachers,
                  students, friends, families, and content creators to find riddles
                  for games, classrooms, parties, videos, and everyday fun, without
                  digging through cluttered pages.
                </p>
              </section>
              <section className="space-y-3">
                <h2 className="text-base font-bold">What You&apos;ll Find Here</h2>
                <p>
                  The site focuses on short, readable riddle collections that are
                  reviewed and organized to stay clear, useful, and easy to browse.
                  The goal is to help you get to a great riddle quickly, then get
                  back to your game, lesson, or project.
                </p>
              </section>
              <section className="space-y-3">
                <h2 className="text-base font-bold">Who Runs the Site</h2>
                <p>
                  RiddlesRush is created and maintained by Patrick Stevens. I am a
                  software developer based in Washington state, and I enjoy
                  building useful web apps and simple online tools.
                </p>
              </section>
              <section className="space-y-3">
                <h2 className="text-base font-bold">Contact</h2>
                <p>
                  Questions, suggestions, or corrections? You can reach me by email
                  at{" "}
                  <a
                    className="underline hover:text-gray-700"
                    href="mailto:contact@patrickws.com"
                  >
                    contact@patrickws.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
