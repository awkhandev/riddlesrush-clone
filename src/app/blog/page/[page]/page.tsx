import Link from "next/link";
import { Tag, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArtHero, ArtThumb } from "@/components/art";
import { getPaginatedBlogPosts } from "@/lib/content";
import { getBlogTheme } from "@/lib/visual";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ page: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page: pageStr } = await params;
  const page = Math.max(1, parseInt(pageStr, 10) || 1);
  return {
    title: `Riddle Collections - Page ${page} | Riddles Rush`,
    description: `Browse riddle collections page ${page}. Find riddles by theme, age, difficulty, and occasion.`,
    alternates: {
      canonical: `https://riddles-rush.vercel.app/blog/page/${page}`,
    },
  };
}

const categories = [
  { emoji: "🧸", label: "Kids Riddles", href: "/blog/category/kids-riddles" },
  { emoji: "🧠", label: "Adult Riddles", href: "/blog/category/adult-riddles" },
  { emoji: "🎉", label: "Holiday Riddles", href: "/blog/category/holiday-riddles" },
  { emoji: "🧩", label: "What Am I Riddles", href: "/blog/category/what-am-i-riddles" },
  { emoji: "👨‍👩‍👧‍👦", label: "Family Riddles", href: "/blog/category/family-riddles" },
  { emoji: "🌲", label: "Nature Riddles", href: "/blog/category/nature-riddles" },
  { emoji: "🍕", label: "Food Riddles", href: "/blog/category/food-riddles" },
  { emoji: "⚽", label: "Sports Riddles", href: "/blog/category/sports-riddles" },
];

export default async function BlogPaginatedPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: pageStr } = await params;
  const page = Math.max(1, parseInt(pageStr, 10) || 1);
  const { posts, totalPages, currentPage } = getPaginatedBlogPosts(page, 12);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <ArtHero
          theme={getBlogTheme("blog")}
          emoji="🧩"
          title="Riddle Collections"
          description="Browse fun riddle collections by theme, age, difficulty, and occasion, including riddles for kids, couples, classrooms, holidays, and more."
          badge={`${totalPages * 12}+ Collections`}
          seed="blog-paginated"
        />

        {/* Category Filter Pills */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
          <div className="mt-12">
            <div className="flex items-center justify-center mb-4">
              <Tag className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-sm font-medium text-gray-500">Browse by Category</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                📋 View All
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  {category.emoji} {category.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Blog Post Grid */}
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative flex flex-col bg-white border-2 border-gray-200 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden justify-between h-full transition-all duration-300 hover:border-blue-300 hover:-translate-y-1"
              >
                <div>
                  <ArtThumb
                    theme={getBlogTheme(post.frontmatter.categorySlug)}
                    emoji={post.frontmatter.emoji}
                    seed={post.slug}
                    index={i}
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                      {post.frontmatter.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                      {post.frontmatter.description}
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4 mt-4 px-6 pb-6">
                  <span className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    Browse collection
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center">
            <nav className="flex items-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={currentPage === 2 ? "/blog" : `/blog/page/${currentPage - 1}`}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Link>
              )}

              {/* Page numbers */}
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (currentPage <= 4) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = currentPage - 3 + i;
                }

                const isCurrent = pageNum === currentPage;
                const href = pageNum === 1 ? "/blog" : `/blog/page/${pageNum}`;

                return (
                  <Link
                    key={pageNum}
                    href={href}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isCurrent
                        ? "bg-[#7736FE] text-white"
                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}

              {currentPage < totalPages && (
                <Link
                  href={`/blog/page/${currentPage + 1}`}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </nav>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gray-50 border-y border-gray-100">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ready to Solve Some Riddles?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Put your brain to the test with our interactive riddle collection. Perfect for family game nights, classroom activities, or solo brain training.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-8 py-3 bg-[#7736FE] text-white font-semibold rounded-lg hover:bg-[#6a2ee6] transition-colors"
            >
              Start Playing Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export function generateStaticParams() {
  // Generate pages 2 through 40 (page 1 is handled by /blog/page.tsx)
  return Array.from({ length: 39 }, (_, i) => ({ page: String(i + 2) }));
}
