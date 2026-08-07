import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArtHero } from "@/components/art";
import { getThemeBySlug } from "@/lib/visual";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Riddles Rush",
  description:
    "Terms of Service for RiddlesRush — understand the rules and guidelines for using our website.",
  alternates: {
    canonical: "https://riddles-rush.vercel.app/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <ArtHero
          theme={getThemeBySlug("adults")}
          emoji="📜"
          title="Terms of Service"
          description="The rules and guidelines for using RiddlesRush."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
          seed="terms"
        />

        <div className="container max-w-4xl py-12 mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-10 mt-6">
            Last updated: August 2, 2026
          </p>

          {/* Content */}
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                By accessing and using RiddlesRush, you agree to be bound by
                these Terms of Service. If you do not agree to these terms,
                please do not use the website.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                These terms apply to all visitors and users of the site. We
                reserve the right to update these terms at any time, and
                continued use of the site after changes constitutes acceptance
                of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                2. Use of the Website
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                RiddlesRush is provided for personal, non-commercial use. You
                are free to browse, read, and share riddles from the site for
                personal enjoyment, educational purposes, and social gatherings
                such as parties and classroom activities.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                You may not use the site for any unlawful purpose, attempt to
                gain unauthorized access to any part of the site, or use
                automated tools to scrape or replicate content without
                permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                3. Intellectual Property
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                All content on RiddlesRush, including text, graphics, logos,
                and site design, is the property of RiddlesRush or its content
                providers and is protected by applicable intellectual property
                laws.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                You may share individual riddles and content from the site with
                proper attribution, but you may not reproduce, distribute, or
                create derivative works from the site&apos;s content in bulk
                or for commercial purposes without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                4. User Submissions
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                When you submit a riddle through our submission form, you grant
                RiddlesRush a non-exclusive, royalty-free license to publish
                and display your submission on the website. Submissions are
                reviewed before being published.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Please do not submit content that is offensive, harmful,
                infringing on others&apos; rights, or contains personal
                information. We reserve the right to edit or decline any
                submission at our discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                5. Disclaimer
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                RiddlesRush is provided on an &quot;as is&quot; and &quot;as
                available&quot; basis without warranties of any kind. We make
                no representations or warranties regarding the accuracy,
                reliability, or availability of the site or its content.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                While we strive to keep content accurate and up to date, we
                do not guarantee that all riddles and answers are error-free.
                Use the site at your own discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                6. Limitation of Liability
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                To the fullest extent permitted by law, RiddlesRush and its
                creator shall not be liable for any indirect, incidental,
                special, or consequential damages arising from your use of or
                inability to use the website.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                In no event shall our total liability exceed the amount you
                paid to use the site — which, since RiddlesRush is free, is
                zero dollars.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                7. Changes to Terms
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                We reserve the right to modify these Terms of Service at any
                time. Changes will be posted on this page with an updated
                &quot;Last updated&quot; date.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We recommend checking this page periodically to stay informed
                of any updates. Your continued use of RiddlesRush after
                changes are posted means you accept and agree to the updated
                terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                8. Contact
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                If you have questions about these Terms of Service or need to
                report an issue, please contact us.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Email us at{" "}
                <a
                  href="mailto:contact@patrickws.com"
                  className="text-[#7736FE] hover:underline font-medium"
                >
                  contact@patrickws.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
