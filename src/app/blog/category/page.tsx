import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllCategories, getBlogPostsByCategory } from "@/lib/content";

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  blue: {
    bg: "bg-blue-100",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  purple: {
    bg: "bg-purple-100",
    border: "border-purple-200",
    text: "text-purple-700",
  },
  green: {
    bg: "bg-green-100",
    border: "border-green-200",
    text: "text-green-700",
  },
  orange: {
    bg: "bg-orange-100",
    border: "border-orange-200",
    text: "text-orange-700",
  },
  pink: {
    bg: "bg-pink-100",
    border: "border-pink-200",
    text: "text-pink-700",
  },
  red: {
    bg: "bg-red-100",
    border: "border-red-200",
    text: "text-red-700",
  },
  yellow: {
    bg: "bg-yellow-100",
    border: "border-yellow-200",
    text: "text-yellow-700",
  },
};

export const metadata = {
  title: "Riddle Categories | Riddles Rush",
  description:
    "Browse all riddle categories to find the perfect collection for any occasion. From kids riddles to brain teasers, explore our curated collections.",
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
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        <div className="flex flex-col w-full">
          {/* Header Section */}
          <section className="py-12 sm:py-16 lg:py-20 bg-white border-y border-gray-100">
            <div className="w-full max-w-5xl sm:max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={32}
                      height={32}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                      <path d="M7 7h.01" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 text-gray-900">
                  Riddle Categories
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto">
                  Browse all riddle categories to find the perfect collection
                  for any occasion.
                </p>
              </div>

              {/* Categories Grid */}
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categories.map((category) => {
                  const colors =
                    colorMap[category.color] || colorMap.purple;
                  const count = postCounts[category.slug] || 0;
                  return (
                    <Link
                      key={category.slug}
                      href={`/blog/category/${category.slug}`}
                      className="group flex flex-col bg-white border-2 border-gray-200 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-purple-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-center p-8">
                        <div
                          className={`flex h-20 w-20 items-center justify-center rounded-full border-2 ${colors.bg} ${colors.border} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <span className="text-4xl">{category.emoji}</span>
                        </div>
                      </div>
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
