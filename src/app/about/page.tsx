import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrganizationSchema } from "@/components/seo/JsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArtHero } from "@/components/art";
import { getThemeBySlug } from "@/lib/visual";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Riddles Rush",
  description:
    "Learn about RiddlesRush — a simple, pleasant way to find riddles for games, classrooms, parties, and everyday fun. Created by Patrick Stevens.",
  openGraph: {
    title: "About Riddles Rush",
    description:
      "Learn about RiddlesRush — a simple, pleasant way to find riddles for games, classrooms, parties, and everyday fun.",
    url: "https://riddles-rush.vercel.app/about",
    siteName: "Riddles Rush",
    type: "website",
  },
  alternates: {
    canonical: "https://riddles-rush.vercel.app/about",
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
          url: "https://riddles-rush.vercel.app/about",
          jobTitle: "Software Developer",
          worksFor: {
            "@type": "Organization",
            name: "Riddles Rush",
          },
          knowsAbout: ["Riddles", "Brain Teasers", "Puzzles", "Web Development"],
        }}
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <ArtHero
          theme={getThemeBySlug("answers")}
          emoji="🤝"
          title="About RiddlesRush"
          description="A simple, pleasant place to find riddles for games, classrooms, parties, and everyday fun."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
          seed="about"
        />

        <div className="container max-w-4xl py-12 lg:py-20 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Content Sections */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Why I Built RiddlesRush
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                I wanted a simple, pleasant way for readers, parents, teachers,
                students, friends, and families to find riddles for games,
                classrooms, parties, and everyday fun — without navigating
                cluttered ad-heavy pages.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                What You&apos;ll Find Here
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Short, readable riddle collections organized for clarity,
                utility, and easy browsing. The goal is to help you reach a
                great riddle quickly.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Who Runs the Site
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                RiddlesRush is created and maintained by Patrick Stevens, a
                software developer in Washington state who enjoys building
                useful web apps and simple online tools.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Contact
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Questions, suggestions, or corrections? Reach out anytime.{" "}
                <a
                  href="mailto:contact@patrickws.com"
                  className="text-[#7736FE] hover:underline font-medium"
                >
                  contact@patrickws.com
                </a>
              </p>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 sm:p-12 border border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Solving?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              Dive into our collection of riddles and brain teasers and start
              challenging yourself today.
            </p>
            <Link
              href="/riddles/riddles-with-answers"
              className="inline-flex items-center justify-center rounded-lg bg-[#7736FE] px-8 py-4 text-lg font-bold text-white shadow-sm hover:bg-[#6a2ee6] transition-colors"
            >
              Browse Riddles →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
