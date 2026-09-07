import Link from "next/link";
import { BookOpen, Calendar, Tag, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPaginatedBlogPosts, getAllCategories } from "@/lib/content";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ page: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page: pageStr } = await params;
  const page = Math.max(1, parseInt(pageStr, 10) || 1);
  return {
    title: `Riddle Collections - Page ${page} | Riddles Rush`,
    description: `Browse riddle collections page ${page}. Find riddles by theme, age, difficulty, and occasion.`,
    alternates: {
      canonical: `https://www.riddlesrush.com/blog/page/${page}`,
    },
  };
}

export function generateStaticParams() {
  return Array.from({ length: 39 }, (_, i) => ({ page: String(i + 2) }));
}

export default async function BlogPaginatedPage({ params }: PageProps) {
  const { page: pageStr } = await params;
  const page = Math.max(1, parseInt(pageStr, 10) || 1);
  const { posts, totalPages, currentPage } = getPaginatedBlogPosts(page, 12);
  const categories = getAllCategories();

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      items.push(
        <Link
          key={1}
          href="/blog"
          className="px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900"
        >
          1
        </Link>
      );
      if (start > 2) {
        items.push(
          <span key="dots-1" className="px-3 py-2 text-sm font-medium text-gray-500">
            ...
          </span>
        );
      }
    }

    for (let p = start; p <= end; p++) {
      const isCurrent = p === currentPage;
      const href = p === 1 ? "/blog" : `/blog/page/${p}`;
      items.push(
        isCurrent ? (
          <Link
            key={p}
            href={href}
            aria-current="page"
            className="px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-blue-600 text-white"
          >
            {p}
          </Link>
        ) : (
          <Link
            key={p}
            href={href}
            className="px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900"
          >
            {p}
          </Link>
        )
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        items.push(
          <span key="dots-2" className="px-3 py-2 text-sm font-medium text-gray-500">
            ...
          </span>
        );
      }
      items.push(
        <Link
          key={totalPages}
          href={`/blog/page/${totalPages}`}
          className="px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900"
        >
          {totalPages}
        </Link>
      );
    }

    return items;
  };

  const prevHref = currentPage === 2 ? "/blog" : `/blog/page/${currentPage - 1}`;
  const nextHref = `/blog/page/${currentPage + 1}`;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container max-w-7xl py-8 lg:py-20 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="mr-4 hidden size-16 shrink-0 items-center justify-center rounded-full bg-blue-100 lg:flex">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">Riddle Collections</h1>
            </div>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Browse fun riddle collections by theme, age, difficulty, and occasion, including riddles for kids, couples,
              classrooms, holidays, and more.
            </p>
            <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>470 Collections</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                <span>Updated Regularly</span>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-12">
            <div className="flex items-center justify-center mb-6">
              <Tag className="w-5 h-5 text-gray-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Browse by Category</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/blog/category"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                View All Categories
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/blog/category/${category.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  <span className="mr-2">{category.emoji}</span>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Blog Post Grid */}
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative flex flex-col bg-white border-2 border-gray-200 shadow-sm hover:shadow-xl rounded-2xl p-6 justify-between h-full transition-all duration-300 hover:border-blue-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-center mb-6 min-h-[120px]">
                  <span className="text-7xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {post.frontmatter.emoji}
                  </span>
                </div>
                <div className="flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                      {post.frontmatter.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                      {post.frontmatter.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                      <span className="mr-2">Browse collection</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
                <Link className="absolute inset-0" href={`/blog/${post.slug}`}>
                  <span className="sr-only">Open riddle collection</span>
                </Link>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <nav className="flex items-center justify-center mt-16" aria-label="Pagination">
            <div className="flex items-center space-x-2">
              <Link
                href={prevHref}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Link>
              {renderPaginationItems()}
              {currentPage < totalPages ? (
                <Link
                  href={nextHref}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              ) : (
                <span className="flex items-center px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </span>
              )}
            </div>
          </nav>

          {/* Bottom CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Solve Some Riddles?
              </h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Put your brain to the test with our interactive riddle collection. Perfect for family game nights, classroom activities, or solo brain training.
              </p>
              <Link
                className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                href="/"
              >
                Start Playing Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
