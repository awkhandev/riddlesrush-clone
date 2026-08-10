import Link from "next/link";
import { Tag, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArtHero, ArtThumb } from "@/components/art";
import { getPaginatedBlogPosts } from "@/lib/content";
import { CollectionPageSchema } from "@/components/seo/JsonLd";
import { getBlogTheme } from "@/lib/visual";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riddle Collections | Browse 470+ Riddle Sets by Theme",
  description:
    "Browse hundreds of riddle collections by theme, age, difficulty, and occasion. Find riddles for kids, adults, families, holidays, and more.",
  openGraph: {
    title: "Riddle Collections | Riddles Rush",
    description:
      "Browse hundreds of riddle collections by theme, age, difficulty, and occasion.",
    url: "https://riddles-rush.vercel.app/blog",
    siteName: "Riddles Rush",
    type: "website",
  },
  alternates: {
    canonical: "https://riddles-rush.vercel.app/blog",
  },
};

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

export default function BlogPage() {
  const { posts, totalPages, currentPage } = getPaginatedBlogPosts(1, 12);

  return (
    <>
      <CollectionPageSchema
        title="Riddle Collections"
        description="Browse hundreds of riddle collections by theme, age, difficulty, and occasion."
        url="/blog"
        itemCount={470}
      />
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <ArtHero
          theme={getBlogTheme("blog")}
          emoji="🧩"
          title="Riddle Collections"
          description="Browse fun riddle collections by theme, age, difficulty, and occasion, including riddles for kids, couples, classrooms, holidays, and more."
          badge="470+ Collections"
          seed="blog-index"
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
                href="/blog/category"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
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
              {/* Previous */}
              <span className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
                Previous
              </span>

              {/* Page 1 (current) */}
              <span className="px-3 py-2 text-sm font-medium rounded-lg bg-[#7736FE] text-white">
                1
              </span>

              {/* Page 2 */}
              <Link
                href="/blog/page/2"
                className="px-3 py-2 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                2
              </Link>

              {/* Page 3 */}
              <Link
                href="/blog/page/3"
                className="px-3 py-2 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                3
              </Link>

              <span className="px-2 py-2 text-sm text-gray-500">...</span>

              {/* Last page */}
              <Link
                href={`/blog/page/${totalPages}`}
                className="px-3 py-2 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {totalPages}
              </Link>

              {/* Next */}
              <Link
                href="/blog/page/2"
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Link>
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
