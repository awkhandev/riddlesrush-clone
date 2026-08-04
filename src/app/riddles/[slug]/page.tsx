import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RiddleReveal } from "@/components/RiddleReveal";
import {
  getRiddleType,
  getAllRiddleTypeSlugs,
} from "@/lib/content";
import type { RiddleItem, RiddleType } from "@/types/content";

// ─── Derived Helpers ────────────────────────────────────────────────────────

function getAllRiddleSlugs(): string[] {
  return getAllRiddleTypeSlugs().flatMap((typeSlug) => {
    const type = getRiddleType(typeSlug);
    if (!type) return [];
    return type.riddles.map((r) => r.slug);
  });
}

function findRiddleFromContent(slug: string): (RiddleItem & { category: string; categorySlug: string }) | null {
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
  const typeParams = getAllRiddleTypeSlugs().map((type) => ({ slug: type }));
  const riddleParams = getAllRiddleSlugs().map((slug) => ({ slug }));
  return [...typeParams, ...riddleParams];
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check if this is a riddle type hub page
  const typeData = getRiddleType(slug);
  if (typeData) {
    return {
      title: `${typeData.frontmatter.title} | Riddles Rush`,
      description: typeData.frontmatter.description,
    };
  }

  // Otherwise, try to find an individual riddle
  const riddle = findRiddleFromContent(slug);
  if (riddle) {
    return {
      title: `${riddle.question.slice(0, 60)}... | Riddles Rush`,
      description: riddle.question,
    };
  }

  return { title: "Riddles | Riddles Rush" };
}

// ─── Hub Card ─────────────────────────────────────────────────────────────────

function RiddleCard({
  riddle,
  index,
  href,
}: {
  riddle: RiddleItem;
  index: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border-2 border-gray-200 bg-white p-6 transition-all duration-300 hover:border-purple-200 hover:shadow-lg group"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-[#7736FE]">
          {index + 1}
        </span>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Riddle
        </span>
      </div>
      <p className="mb-4 text-lg font-medium text-gray-800 group-hover:text-[#7736FE] transition-colors duration-300">
        {riddle.question}
      </p>
      <span className="inline-flex items-center text-sm font-semibold text-[#7736FE]">
        Read more{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}

// ─── Related Card (smaller) ───────────────────────────────────────────────────

function RelatedCard({
  riddle,
  href,
}: {
  riddle: RiddleItem;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border-2 border-gray-200 bg-white p-5 transition-all duration-300 hover:border-purple-200 hover:shadow-md group"
    >
      <p className="mb-3 text-base font-medium text-gray-800 line-clamp-3 group-hover:text-[#7736FE] transition-colors">
        {riddle.question}
      </p>
      <span className="inline-flex items-center text-sm font-semibold text-[#7736FE]">
        Read more{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}

// ─── Breadcrumbs ──────────────────────────────────────────────────────────────

function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-300"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-[#7736FE]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-800">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ─── Hub Page ─────────────────────────────────────────────────────────────────

function HubPage({
  typeData,
}: {
  typeData: RiddleType;
}) {
  const allTypes = getAllRiddleTypeSlugs()
    .map((s) => getRiddleType(s))
    .filter((t): t is RiddleType => t !== null);

  const otherTypes = allTypes.filter(
    (t) => t.frontmatter.slug !== typeData.frontmatter.slug
  );

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#f1f7f9] to-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: typeData.frontmatter.title },
              ]}
            />
            <span className="mb-4 block text-7xl">{typeData.frontmatter.emoji}</span>
            <h1 className="mb-4 font-heading text-4xl font-bold text-[#7736FE] sm:text-5xl lg:text-6xl">
              {typeData.frontmatter.title}
            </h1>
            <p className="max-w-2xl text-lg text-gray-600">
              {typeData.frontmatter.description}
            </p>
          </div>
        </section>

        {/* Riddle listings */}
        <section className="container mx-auto max-w-5xl py-12">
          <h2 className="mb-8 font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
            Riddles in this collection
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {typeData.riddles.map((riddle, i) => (
              <RiddleCard
                key={riddle.slug}
                riddle={riddle}
                index={i}
                href={`/riddles/${riddle.slug}`}
              />
            ))}
          </div>
        </section>

        {/* Explore other types */}
        {otherTypes.length > 0 && (
          <section className="border-t border-gray-100 bg-gray-50 py-12 sm:py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-8 font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
                Explore other types of riddles
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {otherTypes.map((t) => (
                  <Link
                    key={t.frontmatter.slug}
                    href={`/riddles/${t.frontmatter.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-purple-200 hover:shadow-md"
                  >
                    <span className="text-3xl">{t.frontmatter.emoji}</span>
                    <div>
                      <p className="font-semibold text-gray-800">{t.frontmatter.title}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {t.frontmatter.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-[#7736FE] py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 font-heading text-3xl font-bold text-white sm:text-4xl">
              Ready for more brain teasers?
            </h2>
            <p className="mb-8 text-lg text-purple-100">
              Challenge yourself with our full collection of riddles and keep
              your mind sharp.
            </p>
            <Link
              href="/"
              className="inline-flex items-center rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-[#7736FE] shadow-md transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// ─── Individual Riddle Page ───────────────────────────────────────────────────

function IndividualRiddlePage({
  riddle,
}: {
  riddle: RiddleItem & { category: string; categorySlug: string };
}) {
  const allTypes = getAllRiddleTypeSlugs()
    .map((s) => getRiddleType(s))
    .filter((t): t is RiddleType => t !== null);

  const related = getRelatedRiddles(riddle.slug, allTypes, 3);
  const moreLike = getRelatedRiddles(riddle.slug + "-more", allTypes, 3).filter(
    (r) => !related.some((rr) => rr.slug === r.slug),
  );

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#f1f7f9] to-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                {
                  label: riddle.category,
                  href: `/riddles/${riddle.categorySlug}`,
                },
                { label: "Riddle" },
              ]}
            />
            <h1 className="mb-6 font-heading text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl leading-tight">
              {riddle.question}
            </h1>
          </div>
        </section>

        {/* Riddle card */}
        <section className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-sm sm:p-10">
            <p className="mb-6 text-xl font-medium leading-relaxed text-gray-800 sm:text-2xl">
              {riddle.question}
            </p>
            <p className="mb-2 text-sm text-gray-500 italic">
              Take a moment to solve it, then reveal the answer below.
            </p>
            <RiddleReveal
              answer={riddle.answer}
              hint="Click the button when you&rsquo;re ready!"
            />
          </div>
        </section>

        {/* More Like This */}
        {moreLike.length > 0 && (
          <section className="border-t border-gray-100 bg-gray-50 py-12 sm:py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-8 font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
                More Like This
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {moreLike.map((r) => (
                  <RelatedCard
                    key={r.slug}
                    riddle={r}
                    href={`/riddles/${r.slug}`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Riddles */}
        {related.length > 0 && (
          <section className="border-t border-gray-100 py-12 sm:py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-8 font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
                Related Riddles
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <RelatedCard
                    key={r.slug}
                    riddle={r}
                    href={`/riddles/${r.slug}`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-[#7736FE] py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 font-heading text-3xl font-bold text-white sm:text-4xl">
              Enjoyed this riddle?
            </h2>
            <p className="mb-8 text-lg text-purple-100">
              Explore more riddles in the{" "}
              <span className="font-semibold">{riddle.category}</span>{" "}
              collection or try a completely different category.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={`/riddles/${riddle.categorySlug}`}
                className="inline-flex items-center rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-[#7736FE] shadow-md transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
              >
                More {riddle.category}
              </Link>
              <Link
                href="/"
                className="inline-flex items-center rounded-xl border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/10"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default async function RiddlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

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

  // 404 fallback
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <h1 className="mb-4 font-heading text-4xl font-bold text-gray-900">
          Riddle Not Found
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Sorry, we couldn&rsquo;t find the riddle you&rsquo;re looking for.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-xl bg-[#7736FE] px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#6a2ee6] hover:shadow-lg"
        >
          Back to Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
