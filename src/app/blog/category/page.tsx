import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllCategories } from "@/lib/content";
import { Tag, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riddle Categories - Browse by Topic | Riddles Rush",
  description:
    "Explore our collection of riddles organized by category. Find kids riddles, adult brain teasers, holiday riddles, and more!",
  alternates: {
    canonical: "https://www.riddlesrush.com/blog/category",
  },
};

const categoryStyles: Record<string, { iconBg: string; iconBorder: string; iconText: string }> = {
  "kids-riddles": {
    iconBg: "bg-blue-100",
    iconBorder: "border-blue-200",
    iconText: "text-blue-600",
  },
  "adult-riddles": {
    iconBg: "bg-purple-100",
    iconBorder: "border-purple-200",
    iconText: "text-purple-600",
  },
  "holiday-riddles": {
    iconBg: "bg-green-100",
    iconBorder: "border-green-200",
    iconText: "text-green-600",
  },
  "what-am-i-riddles": {
    iconBg: "bg-orange-100",
    iconBorder: "border-orange-200",
    iconText: "text-orange-600",
  },
  "family-riddles": {
    iconBg: "bg-pink-100",
    iconBorder: "border-pink-200",
    iconText: "text-pink-600",
  },
  "nature-riddles": {
    iconBg: "bg-green-100",
    iconBorder: "border-green-200",
    iconText: "text-green-600",
  },
  "food-riddles": {
    iconBg: "bg-red-100",
    iconBorder: "border-red-200",
    iconText: "text-red-600",
  },
  "sports-riddles": {
    iconBg: "bg-yellow-100",
    iconBorder: "border-yellow-200",
    iconText: "text-yellow-600",
  },
};

export default function BlogCategoryPage() {
  const categories = getAllCategories();

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container max-w-7xl py-8 lg:py-20 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Tag className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">Riddle Categories</h1>
            </div>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Explore our collection of riddles organized by topic and difficulty level. Whether you&apos;re looking for
              family fun, brain challenges, or seasonal entertainment, we have the perfect riddles for every occasion.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => {
              const style = categoryStyles[category.slug] || {
                iconBg: "bg-purple-100",
                iconBorder: "border-purple-200",
                iconText: "text-purple-600",
              };

              return (
                <Link
                  key={category.slug}
                  href={`/blog/category/${category.slug}`}
                  className="group relative flex flex-col bg-white border-2 border-gray-200 shadow-sm hover:shadow-xl rounded-2xl p-6 justify-between h-full transition-all duration-300 hover:border-blue-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center mb-6 min-h-[120px]">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center border-2 ${style.iconBg} ${style.iconBorder} ${style.iconText}`}
                    >
                      <span className="text-4xl">{category.emoji}</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between flex-1 space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h2>
                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {category.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                        <span className="mr-2">View Category</span>
                        <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-20 text-center">
            <Link
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              href="/blog"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Back to All Riddles
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
