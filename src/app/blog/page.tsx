import Link from "next/link";
import { BookOpen, Calendar, Tag, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPaginatedBlogPosts } from "@/lib/content";

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
  const { posts } = getPaginatedBlogPosts(1, 12);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="container mx-auto max-w-7xl py-8 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center bg-blue-100 rounded-full w-16 h-16 mr-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Riddle Collections
            </h1>
            <p className="mt-4 text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Browse fun riddle collections by theme, age, difficulty, and occasion, including riddles for kids, couples, classrooms, holidays, and more.
            </p>
            <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                470 Collections
              </span>
              <span className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Updated Regularly
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
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
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative flex flex-col bg-white border-2 border-gray-200 shadow-sm hover:shadow-xl rounded-2xl p-6 justify-between h-full transition-all duration-300 hover:border-blue-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-center mb-6 min-h-[120px]">
                    <span className="text-7xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {post.frontmatter.emoji}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {post.frontmatter.description}
                  </p>
                </div>
                <div className="border-t border-gray-100 pt-4 mt-4">
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
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Page 1 of 40</span>
            </div>
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
