import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  getCategory,
  getBlogPostsByCategory,
  getAllCategorySlugs,
} from "@/lib/content";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

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

export function generateStaticParams() {
  const slugs = getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) {
    return { title: "Category Not Found | Riddles Rush" };
  }
  return {
    title: `${category.name} - Riddles Blog | Riddles Rush`,
    description: category.description,
    alternates: {
      canonical: `https://www.riddlesrush.com/blog/category/${slug}`,
    },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="container max-w-7xl py-8 lg:py-20 mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-8">Sorry, we couldn&apos;t find the category you&apos;re looking for.</p>
            <Link
              href="/blog/category"
              className="inline-flex items-center min-h-[48px] text-[#7736FE] font-medium hover:underline"
            >
              Browse all categories
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const posts = getBlogPostsByCategory(slug);
  const style = categoryStyles[slug] || {
    iconBg: "bg-purple-100",
    iconBorder: "border-purple-200",
    iconText: "text-purple-600",
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container max-w-7xl py-8 lg:py-20 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 border-2 ${style.iconBg} ${style.iconBorder} ${style.iconText}`}
              >
                <span className="text-3xl">{category.emoji}</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">{category.name}</h1>
            </div>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              {category.description}
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{posts.length} Articles</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                <span>{category.name}</span>
              </div>
            </div>
            <div className="mt-8">
              <Link
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                href="/blog"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Back to All Riddles
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                      <span className="mr-2">Read Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
                <Link className="absolute inset-0" href={`/blog/${post.slug}`}>
                  <span className="sr-only">View Article</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
