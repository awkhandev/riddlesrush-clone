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
    "The story behind Riddles Rush — a riddle-loving developer's attempt to make the internet a little more fun, one brain teaser at a time.",
  openGraph: {
    title: "About Riddles Rush",
    description:
      "The story behind Riddles Rush — a riddle-loving developer's attempt to make the internet a little more fun.",
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
          description="How a love for brain teasers turned into a website — and why we keep it simple."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
          seed="about"
        />

        <div className="container max-w-4xl py-12 lg:py-20 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Content Sections */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                How Riddles Rush Started
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                It started with a simple frustration: every time I searched
                for riddles online, I landed on pages buried under pop-ups,
                autoplay videos, and ads for things I&apos;d never buy. All I
                wanted was a clean list of good riddles. So I decided to build
                one myself — a place where you could find a great riddle
                collection without fighting through a maze of clutter.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                What Makes This Place Different
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Every riddle collection here is organized to get you to the
                good stuff fast. No account required, no newsletter pop-ups,
                no &quot;sign up to continue reading&quot; gates. Just riddles
                — sorted by theme, difficulty, age group, and occasion. Whether
                you need something for a classroom icebreaker or a family game
                night, you should be able to find it in a couple of clicks.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                The Person Behind the Keyboard
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                I&apos;m Patrick Stevens — a software developer based in
                Washington state who spends too much time thinking about
                puzzles and not enough time going outside. Riddles Rush is
                a passion project born from a genuine love of brain teasers
                and the belief that a good riddle can brighten anyone&apos;s
                day. When I&apos;m not coding or curating riddle collections,
                I&apos;m probably solving logic puzzles or arguing about
                whether a hot dog is a sandwich.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Get in Touch
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Got a riddle to share? Found a broken link? Just want to say
                hi? I read every email and appreciate hearing from fellow
                riddle enthusiasts. Drop me a line at{" "}
                <a
                  href="mailto:contact@patrickws.com"
                  className="text-[#7736FE] hover:underline font-medium"
                >
                  contact@patrickws.com
                </a>
                {" "}— I usually reply within a day or two.
              </p>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 sm:p-12 border border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to Put Your Brain to Work?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              Enough about us — let&apos;s see what you&apos;ve got. Browse our
              riddle collections and find something that stumps you.
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
