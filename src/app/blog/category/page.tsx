import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllCategories, getBlogPostsByCategory } from "@/lib/content";
import { CollectionPageSchema } from "@/components/seo/JsonLd";
import { ArtHero, ArtThumb } from "@/components/art";
import { getBlogTheme } from "@/lib/visual";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riddle Categories | Browse All Categories",
  description:
    "Browse all riddle categories to find the perfect collection for any occasion. From kids riddles to brain teasers, explore our curated collections.",
  openGraph: {
    title: "Riddle Categories | Riddles Rush",
    description:
      "Browse all riddle categories to find the perfect collection for any occasion.",
    url: "https://riddles-rush.vercel.app/blog/category",
    siteName: "Riddles Rush",
    type: "website",
  },
  alternates: {
    canonical: "https://riddles-rush.vercel.app/blog/category",
  },
};

export default function BlogCategoryPage() {
  const categories = getAllCategories();

  // Compute post counts per category
  const postCounts: Record<string, number> = {};
  for (const cat of categories) {
    postCounts[cat.slug] = getBlogPostsByCategory(cat.slug).length;
  }

  return (
    <>
      <CollectionPageSchema
        title="Riddle Categories"
        description="Browse all riddle categories to find the perfect collection for any occasion."
        url="/blog/category"
        itemCount={categories.length}
      />
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        <div className="flex flex-col w-full">
          {/* Header Section */}
          <ArtHero
            theme={getBlogTheme("blog")}
            emoji="🗂️"
            title="Riddle Categories"
            description="Browse all riddle categories to find the perfect collection for any occasion."
            badge={`${categories.length} Categories`}
            seed="category-index"
          />

          <section className="py-12 sm:py-16 lg:py-20 bg-white">
            <div className="w-full max-w-5xl sm:max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
              {/* Categories Grid */}
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categories.map((category, i) => {
                  const count = postCounts[category.slug] || 0;
                  return (
                    <Link
                      key={category.slug}
                      href={`/blog/category/${category.slug}`}
                      className="group flex flex-col bg-white border-2 border-gray-200 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-purple-300 hover:-translate-y-1"
                    >
                      <ArtThumb
                        theme={getBlogTheme(category.slug)}
                        emoji={category.emoji}
                        seed={category.slug}
                        index={i}
                      />
                      <div className="flex flex-col p-5 pt-0 text-left flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-[#7736FE] transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-4 flex-1">
                          {category.description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-sm text-gray-500">
                            {count} Collections
                          </span>
                          <span className="flex items-center text-[#7736FE] font-medium text-sm group-hover:text-purple-700 transition-colors">
                            Browse collection
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
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 border-y border-gray-100">
            <div className="w-full max-w-5xl sm:max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Can&apos;t find what you&apos;re looking for?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Explore our full collection of riddles or try today&apos;s
                featured riddle for a daily brain workout.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center bg-[#7736FE] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6a2ee6] transition-colors"
                >
                  Browse all collections
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
                  className="inline-flex items-center justify-center bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
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
