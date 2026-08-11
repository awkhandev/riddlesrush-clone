import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArtHero } from "@/components/art";
import { getThemeBySlug } from "@/lib/visual";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Riddles Rush",
  description:
    "The ground rules for using Riddles Rush. Short version: have fun, don't be shady, and share riddles freely.",
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
          description="The fine print — but written like a human actually read it."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
          seed="terms"
        />

        <div className="container max-w-4xl py-12 mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-10 mt-6">
            Last updated: August 10, 2026
          </p>

          {/* Content */}
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                1. The Deal
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                By using Riddles Rush, you&apos;re agreeing to play by these
                ground rules. Nothing in here is designed to be
                sneaky — we just need some basic terms so everyone knows where
                they stand. If these don&apos;t work for you, no hard
                feelings, but the site probably isn&apos;t for you.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We might tweak these terms from time to time as the site
                evolves. When we do, we&apos;ll update the date at the top and
                keep the old version archived. If you stick around after
                changes go live, that counts as your OK with the updated
                version.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                2. How to Use Riddles Rush
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                This site exists for people who love riddles — whether
                you&apos;re planning a classroom activity, looking for
                icebreakers at a party, or just want to stump your friends
                over dinner. Feel free to browse, share, and enjoy the
                collections for personal and educational purposes.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                What we&apos;d rather you not do: use automated bots to
                scrape our content, try to break into parts of the site
                you&apos;re not supposed to access, or use Riddles Rush for
                anything illegal. Common sense stuff, really.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                3. Who Owns What
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                The riddle collections, site design, logos, and original text
                on Riddles Rush are ours (or our content partners&apos;).
                That said, riddles themselves have been shared and re-told for
                generations — we&apos;re not claiming to own every riddle
                under the sun. What we do own is the specific way
                we&apos;ve curated, organized, and presented them.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Go ahead and share individual riddles with friends, use them
                at your next game night, or drop one in a classroom exercise.
                Just don&apos;t bulk-download our content, republish entire
                collections, or sell our curated material as your own. That
                wouldn&apos;t be cool.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                4. When You Submit a Riddle
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                We love getting riddles from our readers! When you submit one
                through our form, you&apos;re giving us permission to publish
                it on the site. We&apos;ll review submissions before they go
                live — not to censor good riddles, but to keep things
                family-friendly and on-topic.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Please don&apos;t send us anything offensive, hateful,
                or that infringes on someone else&apos;s work. If we pass on
                your submission, it&apos;s nothing personal — we just have
                standards to maintain. We might also lightly edit submissions
                for clarity or formatting.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                5. No Guarantees
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                Riddles Rush is a free, passion-driven project. We do our best
                to keep everything accurate and running, but we can&apos;t
                promise perfection. Some riddle answers might be debatable
                (that&apos;s part of the fun), and the site might occasionally
                have a hiccup.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We don&apos;t make any guarantees about the site being
                error-free, always available, or perfectly suited for any
                particular purpose. Use it because you enjoy it, not because
                you&apos;re relying on it for anything critical.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                6. We&apos;re Not Liable for...
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                Let&apos;s be real — Riddles Rush is a free riddle website.
                We&apos;re not responsible for any damages that might
                theoretically arise from using it. No lost profits, no data
                disasters, no existential crises because you couldn&apos;t
                solve a riddle.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Since the site is completely free, our maximum liability is
                exactly what you paid: nothing. We think that&apos;s a pretty
                good deal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                7. Keeping Things Current
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                These terms might evolve as Riddles Rush grows. When they do,
                we&apos;ll post the updated version right here with a fresh
                &quot;Last updated&quot; date. We&apos;ll try to make changes
                clear and reasonable — no gotchas.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Check back every once in a while if you&apos;re the kind of
                person who likes to stay informed. And if you keep using the
                site after we update things, we&apos;ll assume you&apos;re
                on board with the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                8. Reach Out Anytime
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                Questions about these terms? Spotted something that seems
                off? Want to tell us your favorite riddle? We&apos;re all ears.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Send us an email at{" "}
                <a
                  href="mailto:contact@patrickws.com"
                  className="text-[#7736FE] hover:underline font-medium"
                >
                  contact@patrickws.com
                </a>
                {" "}— we actually read and respond to every message.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
