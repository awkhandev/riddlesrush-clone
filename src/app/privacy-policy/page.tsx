import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArtHero } from "@/components/art";
import { getThemeBySlug } from "@/lib/visual";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Riddles Rush",
  description:
    "Privacy Policy for RiddlesRush — learn how we handle your data and protect your privacy.",
  alternates: {
    canonical: "https://riddles-rush.vercel.app/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <ArtHero
          theme={getThemeBySlug("family")}
          emoji="🛡️"
          title="Privacy Policy"
          description="How RiddlesRush handles your data and protects your privacy."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
          seed="privacy"
        />

        <div className="container max-w-4xl py-12 mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-10 mt-6">
            Last updated: August 2, 2026
          </p>

          {/* Content */}
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                RiddlesRush is designed to be a simple, privacy-friendly
                website. We do not require you to create an account or provide
                personal information to browse our riddle collections.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We may automatically collect non-personal information such as
                your browser type, device type, operating system, and pages
                visited. This data is used only in aggregate to understand how
                visitors use our site and to improve the experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                2. How We Use Information
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                The limited information we collect is used solely to operate
                and improve RiddlesRush. We use it to monitor site traffic
                patterns, diagnose technical issues, and understand which
                content is most useful to our visitors.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We do not sell, rent, or trade your information to third
                parties. We do not use your data for targeted advertising or
                marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                3. Cookies and Tracking
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                RiddlesRush uses minimal cookies necessary for the site to
                function properly. We may use analytics tools such as Google
                Analytics to understand how visitors interact with our site.
                These tools use cookies to collect anonymous usage data.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                You can control cookies through your browser settings. Disabling
                cookies may affect certain site features, but you will still be
                able to browse all riddle content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                4. Third-Party Services
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                We may use third-party services such as analytics providers and
                content delivery networks to operate the site. These services
                may collect information in accordance with their own privacy
                policies.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We are not responsible for the privacy practices of external
                sites linked from RiddlesRush. We encourage you to review the
                privacy policies of any third-party services you interact with.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                5. Data Security
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                We take reasonable measures to protect the limited data we
                collect. Our site is served over HTTPS to ensure data is
                encrypted in transit.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                However, no method of electronic transmission or storage is
                completely secure. While we strive to protect your information,
                we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                6. Children&apos;s Privacy
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                RiddlesRush is designed to be family-friendly and is safe for
                children to use. We do not knowingly collect personal
                information from children under 13.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                If you are a parent or guardian and believe your child has
                provided us with personal information, please contact us and
                we will promptly delete any such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                7. Changes to This Policy
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or legal requirements. When we make
                changes, we will update the &quot;Last updated&quot; date at
                the top of this page.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We encourage you to review this policy periodically. Your
                continued use of RiddlesRush after changes are posted
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                8. Contact Us
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                If you have any questions about this Privacy Policy or how we
                handle your data, please reach out to us.
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
