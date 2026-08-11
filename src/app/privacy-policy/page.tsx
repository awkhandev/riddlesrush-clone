import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArtHero } from "@/components/art";
import { getThemeBySlug } from "@/lib/visual";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Riddles Rush",
  description:
    "How Riddles Rush collects, uses, and protects your information. We keep things simple — no accounts, no tracking nonsense.",
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
          description="The short version: we keep things simple and don't collect much. Here are the details."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
          seed="privacy"
        />

        <div className="container max-w-4xl py-12 mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-10 mt-6">
            Last updated: August 10, 2026
          </p>

          {/* Content */}
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                1. What We Collect (Spoiler: Not Much)
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                Riddles Rush was built with one thing in mind: let people enjoy
                riddles without jumping through hoops. You don&apos;t need to
                sign up, create a profile, or hand over your email to browse
                our collections. We keep it that way on purpose.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Like most websites, our hosting platform automatically logs
                some basic technical details — things like your browser type,
                what pages you visited, and roughly when you visited them. This
                is standard server logging, not active tracking. It helps us
                spot problems and understand which riddle collections people
                enjoy most.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                2. What We Do With That Info
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                The handful of technical details we collect serve exactly one
                purpose: keeping Riddles Rush running smoothly and making it
                better over time. If we notice that a particular riddle
                collection gets a lot of traffic, we might add more riddles to
                it. If a page loads slowly for certain devices, we fix it.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We&apos;re not in the data-selling business — we&apos;re in
                the riddle business. Your information stays with us, and we
                never share, sell, or trade it with advertisers, data brokers,
                or anyone else. Period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                3. Cookies — The Minimal Kind
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                Riddles Rush uses only the cookies that are strictly necessary
                for the website to function — things like keeping track of
                your session while you browse. We don&apos;t use
                advertising cookies or cross-site trackers. If we ever add
                analytics (to help us understand which riddles are most
                popular), those tools collect anonymous data only.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                You&apos;re always free to adjust your browser&apos;s cookie
                settings. Turning off cookies might affect some site
                functionality, but you&apos;ll still be able to read and enjoy
                all our riddle collections.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                4. Outside Services We Rely On
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                Riddles Rush is hosted on Vercel, which handles the technical
                side of serving our pages to you. Vercel has its own privacy
                practices, which you can review on their website. We also
                occasionally link out to other sites — when you leave Riddles
                Rush and visit somewhere else, their privacy rules apply, not
                ours.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We pick our hosting and tooling partners carefully, but
                we can&apos;t control what third-party services do with data
                they collect independently. We encourage you to check their
                policies if you&apos;re curious.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                5. How We Keep Things Secure
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                Every page on Riddles Rush is served over HTTPS, which means
                the connection between your browser and our server is
                encrypted. This prevents anyone from snooping on your activity
                while you&apos;re here.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                That said, no website can guarantee 100% security — the
                internet doesn&apos;t work that way. We do our best to protect
                the limited information we have, but we want to be honest about
                what &quot;reasonable measures&quot; actually means in practice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                6. Kids and Riddles Go Hand in Hand
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                A big part of why we built Riddles Rush is for families,
                teachers, and kids to enjoy together. We never ask children
                for personal information, and we don&apos;t knowingly collect
                data from anyone under 13.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                If you&apos;re a parent or guardian and think your child
                somehow shared personal information with us (it shouldn&apos;t
                be possible, but just in case), drop us an email and
                we&apos;ll sort it out right away.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                7. When Things Change
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                This policy might get updated if our practices change or if
                new privacy laws require it. When that happens, we&apos;ll
                update the &quot;Last updated&quot; date at the top of this
                page so you know exactly when things shifted.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We recommend checking back occasionally — not because we plan
                any dramatic changes, but because it&apos;s good practice with
                any website you visit regularly. Continuing to use Riddles Rush
                after we update this page means you&apos;re cool with the new
                version.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                8. Got Questions?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                If anything in this policy is unclear, or if you have
                questions about how we handle your information, just reach
                out. We&apos;re a small team and we actually read our emails.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Drop us a line at{" "}
                <a
                  href="mailto:contact@patrickws.com"
                  className="text-[#7736FE] hover:underline font-medium"
                >
                  contact@patrickws.com
                </a>
                {" "}— we&apos;ll get back to you as soon as we can.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
