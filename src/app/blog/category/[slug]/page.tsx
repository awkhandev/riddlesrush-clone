import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  getCategory,
  getBlogPostsByCategory,
  getAllCategorySlugs,
  getAllCategories,
} from "@/lib/content";
import { CollectionPageSchema, BreadcrumbListSchema } from "@/components/seo/JsonLd";
import { generateCategoryMetadata } from "@/lib/seo-metadata";

const colorMap: Record<string, { bg: string; border: string; pill: string; pillActive: string }> = {
  blue: {
    bg: "bg-blue-100",
    border: "border-blue-200",
    pill: "bg-blue-50 text-blue-700 hover:bg-blue-100",
    pillActive: "bg-blue-600 text-white",
  },
  purple: {
    bg: "bg-purple-100",
    border: "border-purple-200",
    pill: "bg-purple-50 text-purple-700 hover:bg-purple-100",
    pillActive: "bg-purple-600 text-white",
  },
  green: {
    bg: "bg-green-100",
    border: "border-green-200",
    pill: "bg-green-50 text-green-700 hover:bg-green-100",
    pillActive: "bg-green-600 text-white",
  },
  orange: {
    bg: "bg-orange-100",
    border: "border-orange-200",
    pill: "bg-orange-50 text-orange-700 hover:bg-orange-100",
    pillActive: "bg-orange-600 text-white",
  },
  pink: {
    bg: "bg-pink-100",
    border: "border-pink-200",
    pill: "bg-pink-50 text-pink-700 hover:bg-pink-100",
    pillActive: "bg-pink-600 text-white",
  },
  red: {
    bg: "bg-red-100",
    border: "border-red-200",
    pill: "bg-red-50 text-red-700 hover:bg-red-100",
    pillActive: "bg-red-600 text-white",
  },
  yellow: {
    bg: "bg-yellow-100",
    border: "border-yellow-200",
    pill: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
    pillActive: "bg-yellow-600 text-white",
  },
};

/* ------------------------------------------------------------------ */
/*  Static params                                                      */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  const slugs = getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) {
    return { title: "Category Not Found | Riddles Rush" };
  }
  return generateCategoryMetadata(category);
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  const allCategories = getAllCategories();

  if (!category) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen flex-col items-center">
          <div className="container max-w-7xl py-8 lg:py-20 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Category Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn&apos;t find the category you&apos;re looking for.
            </p>
            <Link
              href="/blog/category"
              className="inline-flex items-center text-[#7736FE] font-medium hover:underline"
            >
              Browse all categories
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const colors = colorMap[category.color] || colorMap.purple;
  const posts = getBlogPostsByCategory(slug);

  // Compute post counts per category for filter pills
  const postCounts: Record<string, number> = {};
  for (const cat of allCategories) {
    postCounts[cat.slug] = getBlogPostsByCategory(cat.slug).length;
  }

  return (
    <>
      <CollectionPageSchema
        title={category.name}
        description={category.description || `Browse ${category.name} riddles.`}
        url={`/blog/category/${category.slug}`}
        itemCount={posts.length}
      />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Categories", url: "/blog/category" },
          { name: category.name, url: `/blog/category/${category.slug}` },
        ]}
      />
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        <div className="flex flex-col w-full">
          {/* Breadcrumbs */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <nav className="flex items-center gap-1.5 text-sm text-gray-500">
              <Link
                href="/"
                className="hover:text-[#7736FE] transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog/category"
                className="hover:text-[#7736FE] transition-colors"
              >
                Categories
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{category.name}</span>
            </nav>
          </div>

          {/* Category Header */}
          <section className="py-8 sm:py-12 lg:py-16 bg-white border-b border-gray-100">
            <div className="w-full max-w-5xl sm:max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                <div
                  className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 ${colors.bg} ${colors.border}`}
                >
                  <span className="text-5xl">{category.emoji}</span>
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                    {category.name}
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 mb-4 max-w-2xl">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                    {posts.length} Collections
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Category Filter Pills */}
          <section className="py-4 bg-white border-b border-gray-100">
            <div className="w-full max-w-5xl sm:max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => {
                  const isActive = cat.slug === slug;
                  const catColors =
                    colorMap[cat.color] || colorMap.purple;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/blog/category/${cat.slug}`}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? catColors.pillActive
                          : `${catColors.pill} border border-transparent`
                      }`}
                    >
                      <span>{cat.emoji}</span>
                      {cat.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
            <div className="w-full max-w-5xl sm:max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
              <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white border-2 border-gray-200 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-purple-300 hover:-translate-y-1"
                  >
                    {/* Card Image Placeholder */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-purple-50 to-gray-100">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl opacity-30">
                          {category.emoji}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col p-5 sm:p-6 text-left flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.border} border`}
                        >
                          {category.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {post.readingTime}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-[#7736FE] transition-colors">
                        {post.frontmatter.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3 flex-1">
                        {post.frontmatter.description}
                      </p>
                      <div className="pt-4 mt-4 border-t border-gray-100">
                        <span className="flex items-center text-[#7736FE] font-medium text-sm group-hover:text-purple-700 transition-colors">
                          Read collection
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-1.5 group-hover:translate-x-1 transition-transform"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 sm:py-16 lg:py-20 bg-white border-y border-gray-100">
            <div className="w-full max-w-5xl sm:max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Enjoyed these {category.name.toLowerCase()}?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Explore more riddle collections or try today&apos;s featured
                riddle for your daily brain workout.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/blog/category"
                  className="inline-flex items-center justify-center bg-[#7736FE] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6a2ee6] transition-colors"
                >
                  Browse all categories
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/riddle-of-the-day"
                  className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Today&apos;s Featured Riddle
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
