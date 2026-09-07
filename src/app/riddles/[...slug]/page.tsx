import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RiddleReveal } from "@/components/RiddleReveal";
import {
  getRiddleType,
  getAllRiddleTypeSlugs,
} from "@/lib/content";
import type { RiddleItem, RiddleType } from "@/types/content";
import { BreadcrumbListSchema } from "@/components/seo/JsonLd";
import { generateRiddleMetadata } from "@/lib/seo-metadata";
import { Home, ChevronRight, ArrowRight, BookOpen } from "lucide-react";

// ─── Derived Helpers ────────────────────────────────────────────────────────

function getAllRiddleSlugs(): string[] {
  return getAllRiddleTypeSlugs().flatMap((typeSlug) => {
    const type = getRiddleType(typeSlug);
    if (!type) return [];
    return type.riddles.map((r) => r.slug);
  });
}

function findRiddleFromContent(slug: string): (RiddleItem & { category: string; categorySlug: string; explanation?: string }) | null {
  for (const typeSlug of getAllRiddleTypeSlugs()) {
    const type = getRiddleType(typeSlug);
    if (!type) continue;
    const found = type.riddles.find((r) => r.slug === slug);
    if (found) {
      return {
        ...found,
        category: type.frontmatter.title,
        categorySlug: typeSlug,
      };
    }
  }
  return null;
}

function getRelatedRiddles(
  currentSlug: string,
  types: RiddleType[],
  count = 3
): RiddleItem[] {
  const all = types
    .flatMap((t) => t.riddles)
    .filter((r) => r.slug !== currentSlug);
  // Deterministic shuffle based on slug hash
  const hash = currentSlug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const shuffled = [...all].sort((_, b) => {
    const bHash = b.slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return (hash % bHash) - (bHash % (hash + 1));
  });
  return shuffled.slice(0, count);
}

// ─── Static Params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  // Only include hub pages that have actual riddle content
  const hubSlugs = getAllRiddleTypeSlugs().filter((slug) => {
    const type = getRiddleType(slug);
    return type && type.riddles.length > 0;
  });
  const typeParams = hubSlugs.map((type) => ({ slug: [type] }));
  const riddleParams = getAllRiddleSlugs().map((slug) => ({ slug: slug.split("/") }));
  return [...typeParams, ...riddleParams];
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugParts } = await params;
  const slug = slugParts.join("/");

  // Check if this is a riddle type hub page
  const typeData = getRiddleType(slug);
  if (typeData) {
    return generateRiddleMetadata(typeData, true);
  }

  // Otherwise, try to find an individual riddle
  const riddle = findRiddleFromContent(slug);
  if (riddle) {
    const truncated = riddle.question.length > 35 ? `${riddle.question.slice(0, 35)}…` : riddle.question;
    return {
      title: `${truncated} - Answer & explanation | Riddles Rush`,
      description: `${riddle.question} Answer: ${riddle.answer}. Short explanation and related riddles.`,
      alternates: {
        canonical: `https://www.riddlesrush.com/riddles/${riddle.slug}`,
      },
    };
  }

  return { title: "Riddles | Riddles Rush" };
}

// ─── Hub Page ─────────────────────────────────────────────────────────────────

const OTHER_HUBS = [
  { title: "Tricky Riddles", slug: "tricky-riddles", emoji: "🧠" },
  { title: "Short Riddles", slug: "short-riddles", emoji: "⚡" },
  { title: "Logic Riddles", slug: "logic-riddles", emoji: "🔗" },
  { title: "Hard Riddles", slug: "hard-riddles", emoji: "🔥" },
  { title: "Kids Riddles", slug: "kids", emoji: "🧸" },
];

function HubPage({
  typeData,
}: {
  typeData: RiddleType;
}) {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: typeData.frontmatter.title, url: `/riddles/${typeData.frontmatter.slug}` },
        ]}
      />
      <Header />
      <div className="relative py-8 lg:py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <nav className="mb-8 text-sm text-gray-600 flex flex-wrap items-center gap-1" aria-label="Breadcrumb">
            <Link className="inline-flex items-center hover:text-[#7736FE] transition-colors" href="/">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium line-clamp-1">
              {typeData.frontmatter.title}
            </span>
          </nav>

          <article>
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                <span className="mr-2" aria-hidden="true">{typeData.frontmatter.emoji || "✅"}</span>
                {typeData.frontmatter.title}
                {typeData.frontmatter.title.toLowerCase().includes("answers") ? " (with Answers)" : ""}
              </h1>
            </header>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4 mb-10">
              <p className="text-base leading-7">
                {typeData.frontmatter.description ||
                  "This is the full index of riddles we publish as standalone pages, every one with an answer and explanation. It is the broadest hub: use it when you want to browse everything we have released for static generation, sorted in a stable order for predictable crawling."}
              </p>
              <p className="text-base leading-7">
                Narrower hubs like tricky-riddles, logic-riddles, or kids group riddles by intent so you can explore a theme without scanning the entire set. Category hubs (such as food or sports) still work the same way they always have. This page simply mirrors the complete list for people who search for &ldquo;riddles with answers&rdquo; in the generic sense.
              </p>
            </div>

            <section aria-labelledby="hub-list-heading">
              <h2 id="hub-list-heading" className="text-xl font-semibold text-gray-900 mb-4">
                Riddles in this collection
              </h2>
              <ul className="grid gap-3 sm:grid-cols-1">
                {typeData.riddles.map((riddle) => (
                  <li key={riddle.slug}>
                    <Link
                      className="block p-4 rounded-xl border border-gray-200 hover:border-[#7736FE] hover:shadow-sm transition-all text-base text-gray-900 leading-snug font-medium"
                      href={`/riddles/${riddle.slug}`}
                    >
                      {riddle.question}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-12 pt-8 border-t border-gray-200" aria-labelledby="other-hubs-heading">
              <h2 id="other-hubs-heading" className="text-lg font-semibold text-gray-900 mb-3">
                Explore other types of riddles
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Looking for a different style? Try another popular riddle list.
              </p>
              <ul className="flex flex-wrap gap-2">
                {OTHER_HUBS.filter((h) => h.slug !== typeData.frontmatter.slug).map((hub) => (
                  <li key={hub.slug}>
                    <Link
                      className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 hover:border-[#7736FE] hover:text-[#7736FE] transition-colors"
                      href={`/riddles/${hub.slug}`}
                    >
                      <span className="mr-1.5" aria-hidden="true">{hub.emoji}</span>
                      {hub.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <p className="mt-10 text-xs text-gray-400 text-center">
            <a href={`https://www.riddlesrush.com/riddles/${typeData.frontmatter.slug}`} className="underline hover:text-gray-600">
              Permalink
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

// ─── Individual Riddle Page ───────────────────────────────────────────────────

function IndividualRiddlePage({
  riddle,
}: {
  riddle: RiddleItem & { category: string; categorySlug: string; explanation?: string };
}) {
  const allTypes = getAllRiddleTypeSlugs()
    .map((s) => getRiddleType(s))
    .filter((t): t is RiddleType => t !== null && t.riddles.length > 0);

  const related = getRelatedRiddles(riddle.slug, allTypes, 3);
  const moreLike = getRelatedRiddles(riddle.slug + "-more", allTypes, 3).filter(
    (r) => !related.some((rr) => rr.slug === r.slug),
  );

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: riddle.category, url: `/riddles/${riddle.categorySlug}` },
          { name: riddle.question, url: `/riddles/${riddle.slug}` },
        ]}
      />
      <Header />
      <div className="relative py-8 lg:py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <nav className="mb-8 text-sm text-gray-600 flex flex-wrap items-center gap-1" aria-label="Breadcrumb">
            <Link className="inline-flex items-center hover:text-[#7736FE] transition-colors" href="/">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link className="hover:text-[#7736FE] transition-colors" href={`/riddles/${riddle.categorySlug}`}>
              {riddle.category}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium line-clamp-1" title={riddle.question}>
              {riddle.question}
            </span>
          </nav>

          <article>
            <header className="mb-8 text-center">
              <p className="text-xs font-medium text-[#7736FE] mb-2 uppercase tracking-wide">
                Riddle
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
                {riddle.question}
              </h1>
              <p className="mt-2 text-base text-gray-600 max-w-md mx-auto leading-relaxed">
                Try it first, then reveal and read the payoff.
              </p>
              <p className="mt-4 text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
                Explore more on the{" "}
                <Link className="text-[#7736FE] font-medium hover:underline" href={`/riddles/${riddle.categorySlug}`}>
                  {riddle.category} hub
                </Link>{" "}
                (with answers).
              </p>
            </header>

            <section aria-labelledby="answer-block" className="mb-8">
              <h2 id="answer-block" className="text-lg font-semibold text-gray-900 mb-2">
                Answer
              </h2>
              <RiddleReveal answer={riddle.answer} />
            </section>

            {riddle.explanation && (
              <section aria-labelledby="explanation-heading" className="mb-10">
                <h2 id="explanation-heading" className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                  Why it works
                </h2>
                <p className="text-lg leading-8 text-gray-800">
                  {riddle.explanation}
                </p>
              </section>
            )}

            {moreLike.length > 0 && (
              <section className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  More like this
                </h2>
                <ul className="mb-4 space-y-2 text-sm text-gray-800 list-disc pl-5">
                  {moreLike.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/riddles/${r.slug}`} className="text-[#7736FE] hover:underline">
                        {r.question}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 mb-4 text-sm">
                  {riddle.category} riddles and brain teasers.
                </p>
                <Link
                  href={`/blog/category/${riddle.categorySlug}`}
                  className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground sm:hover:scale-105 sm:hover:transform h-10 px-4 py-2 bg-[#7736FE] hover:bg-purple-700 inline-flex"
                >
                  {riddle.category} on the blog
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </section>
            )}

            {related.length > 0 && (
              <section aria-labelledby="related-heading" className="mb-10">
                <h2 id="related-heading" className="text-xl font-semibold text-gray-900 mb-4">
                  Related riddles
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/riddles/${r.slug}`}
                        className="block p-4 rounded-xl border border-gray-200 hover:border-[#7736FE] hover:shadow-sm transition-all h-full min-h-[5.5rem]"
                      >
                        <span className="text-gray-900 text-base font-medium leading-snug line-clamp-4">
                          {r.question}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-10 p-5 bg-gray-50 rounded-xl border border-gray-200 text-center">
              <p className="text-gray-600 text-sm mb-3">More on the blog or the daily riddle.</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground sm:hover:scale-105 sm:hover:transform h-10 px-4 py-2 bg-[#7736FE] hover:bg-purple-700"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Blog
                </Link>
                <Link
                  href="/riddle-of-the-day"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  Riddle of the day
                </Link>
              </div>
            </section>

            <p className="mt-6 text-xs text-gray-400 text-center">
              <a href={`https://www.riddlesrush.com/riddles/${riddle.slug}`} className="underline hover:text-gray-600">
                Permalink
              </a>
            </p>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default async function RiddlePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugParts } = await params;
  const slug = slugParts.join("/");

  // Check if this is a riddle type hub page
  const typeData = getRiddleType(slug);
  if (typeData) {
    return <HubPage typeData={typeData} />;
  }

  // Otherwise, try to find an individual riddle
  const riddle = findRiddleFromContent(slug);
  if (riddle) {
    return <IndividualRiddlePage riddle={riddle} />;
  }

  // 404 fallback — triggers Next.js not-found page with proper HTTP 404
  notFound();
}

