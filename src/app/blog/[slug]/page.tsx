import Link from "next/link";
import { ChevronRight, CheckCircle, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogRiddleCard } from "@/components/BlogRiddleCard";

interface Riddle {
  question: string;
  answer: string;
}

interface BlogPost {
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  categorySlug: string;
  riddles: Riddle[];
  moreRiddles: Riddle[];
}

const samplePosts: Record<string, BlogPost> = {
  "4th-of-july-riddles": {
    emoji: "🇺🇸",
    title: "4th of July Riddles with Answers",
    subtitle: "Red, White, and Riddles!",
    description:
      "Celebrate Independence Day with these fun 4th of July riddles! Great for parties, classrooms, or family trivia time.",
    category: "Holiday Riddles",
    categorySlug: "holiday-riddles",
    riddles: [
      {
        question:
          "I go up with a boom and light up the night. I come in colors, loud and bright. What am I?",
        answer: "Firework",
      },
      {
        question:
          "I wave but have no hand. I represent a very proud land. What am I?",
        answer: "Flag",
      },
      {
        question:
          "Born in 1776, I'm a day of freedom and cheer. What day am I?",
        answer: "Independence Day / Fourth of July",
      },
      {
        question:
          "People grill me up on the 4th of July. Add some mustard, and give me a try. What am I?",
        answer: "Hot Dog",
      },
      {
        question:
          "I stand tall with a torch in hand, a gift from France to this proud land. Who am I?",
        answer: "Statue of Liberty",
      },
      {
        question:
          "I'm a founding father and flew a kite in a storm. I signed the Declaration with my pen. Who am I?",
        answer: "Benjamin Franklin",
      },
      {
        question:
          "I ring for freedom, cracked but proud. I stand in Philly, strong and loud. What am I?",
        answer: "Liberty Bell",
      },
    ],
    moreRiddles: [
      {
        question:
          "I am the document signed in 1776 declaring independence from Britain. What am I?",
        answer: "Declaration of Independence",
      },
      {
        question:
          "I am the bird on the Great Seal, a symbol of American strength. What am I?",
        answer: "Bald Eagle",
      },
      {
        question:
          "I am the capital city where the president lives in a white house. What city am I?",
        answer: "Washington, D.C.",
      },
    ],
  },
  "summer-riddles": {
    emoji: "☀️",
    title: "Summer Riddles with Answers",
    subtitle: "Hot Fun in the Sun!",
    description:
      "Beat the heat with these fun summer riddles! Perfect for beach days, road trips, and summer camp activities.",
    category: "Holiday Riddles",
    categorySlug: "holiday-riddles",
    riddles: [
      {
        question:
          "I'm hot and bright, I'm in the sky. I shine all day and warm up July. What am I?",
        answer: "The Sun",
      },
      {
        question:
          "You swim in me, I'm deep and blue. I have waves and fish too. What am I?",
        answer: "The Ocean",
      },
      {
        question:
          "I'm cold and sweet, I'm a summer treat. I come in many flavors, cone or cup. What am I?",
        answer: "Ice Cream",
      },
    ],
    moreRiddles: [
      {
        question:
          "I'm a fruit that's yellow and curved. Monkeys love me, that's observed. What am I?",
        answer: "Banana",
      },
      {
        question:
          "I'm a drink that's cold and sweet. You sip me through a straw on a hot summer street. What am I?",
        answer: "Lemonade",
      },
    ],
  },
  "campfire-riddles": {
    emoji: "🔥",
    title: "Campfire Riddles with Answers",
    subtitle: "Fireside Fun for All Ages!",
    description:
      "Keep the campfire fun going with these spooky and silly riddles. Perfect for camping trips and outdoor adventures.",
    category: "Holiday Riddles",
    categorySlug: "holiday-riddles",
    riddles: [
      {
        question:
          "I crackle and pop, I give warmth and light. I dance in the dark all through the night. What am I?",
        answer: "Campfire",
      },
      {
        question:
          "You roast me over a fire, I'm gooey and sweet. I'm a classic campfire treat. What am I?",
        answer: "S'more",
      },
      {
        question:
          "I'm a bag that you sleep in outdoors. I keep you warm when the temperature lowers. What am I?",
        answer: "Sleeping Bag",
      },
    ],
    moreRiddles: [
      {
        question:
          "I'm a house made of logs in the woods. I'm a cozy place where campers could. What am I?",
        answer: "Cabin",
      },
      {
        question:
          "I'm a path through the trees and the wild. I'm perfect for hiking, just me and my child. What am I?",
        answer: "Trail",
      },
    ],
  },
};

const faqs = [
  {
    question: "What are 4th of July riddles?",
    answer:
      "4th of July riddles are fun, holiday-themed brain teasers centered around Independence Day, fireworks, American symbols, and summer celebrations. They're great for parties, classrooms, and family gatherings.",
  },
  {
    question: "Are these riddles suitable for kids?",
    answer:
      "Yes! These riddles are family-friendly and perfect for kids of all ages. They're great for classroom activities, holiday parties, and family game nights.",
  },
  {
    question: "Can I use these riddles for a trivia game?",
    answer:
      "Absolutely! These riddles work perfectly as trivia questions. You can use them for Fourth of July parties, family gatherings, or any patriotic celebration.",
  },
];

const relatedPosts = [
  {
    emoji: "🎄",
    title: "Christmas Riddles with Answers",
    slug: "christmas-riddles",
    description: "Festive riddles for the holiday season",
  },
  {
    emoji: "🎃",
    title: "Halloween Riddles with Answers",
    slug: "halloween-riddles",
    description: "Spooky riddles for trick-or-treaters",
  },
  {
    emoji: "🦃",
    title: "Thanksgiving Riddles with Answers",
    slug: "thanksgiving-riddles",
    description: "Fun riddles for the dinner table",
  },
  {
    emoji: "🌸",
    title: "Spring Riddles with Answers",
    slug: "spring-riddles",
    description: "Celebrate the season of renewal",
  },
  {
    emoji: "❄️",
    title: "Winter Riddles with Answers",
    slug: "winter-riddles",
    description: "Cozy riddles for cold weather days",
  },
  {
    emoji: "🎓",
    title: "Back to School Riddles",
    slug: "back-to-school-riddles",
    description: "Perfect for the first day of class",
  },
];

const features = [
  "Hundreds of riddles with answers",
  "Fun for all ages and skill levels",
  "Perfect for parties and classrooms",
  "New riddles added regularly",
];

export async function generateStaticParams() {
  return [
    { slug: "4th-of-july-riddles" },
    { slug: "summer-riddles" },
    { slug: "campfire-riddles" },
  ];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = samplePosts[slug];

  if (!post) {
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="container max-w-5xl mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The blog post you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-[#7736FE] text-white font-semibold rounded-lg hover:bg-[#6a2ee6] transition-colors"
            >
              Browse All Posts
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="relative py-3 sm:py-4 lg:py-6">
          <div className="container max-w-7xl mb-2 sm:mb-3 lg:mb-4">
            <nav className="text-sm text-gray-600 flex flex-wrap items-center gap-1">
              <Link
                href="/"
                className="inline-flex items-center hover:text-[#7736FE] transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link
                href="/blog"
                className="inline-flex items-center hover:text-[#7736FE] transition-colors"
              >
                Categories
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link
                href={`/blog/category/${post.categorySlug}`}
                className="inline-flex items-center hover:text-[#7736FE] transition-colors"
              >
                {post.category}
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium line-clamp-2 sm:line-clamp-1">
                {post.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <section className="relative">
          <div className="container max-w-5xl lg:max-w-6xl mx-auto">
            <div className="text-center mb-4 sm:mb-5 lg:mb-6">
              <div className="text-5xl filter drop-shadow-lg sm:text-6xl lg:text-7xl mb-2">
                {post.emoji}
              </div>
              <h1 className="mb-2 text-3xl font-bold leading-snug text-gray-900 sm:mb-3 sm:text-4xl sm:leading-tight lg:mb-3 lg:text-4xl">
                {post.title}
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl">
                {post.description}
              </p>
            </div>
          </div>
        </section>

        {/* Riddle Content Area */}
        <section className="container max-w-4xl mx-auto px-4">
          <div className="blog-post-content prose prose-lg max-w-none">
            {/* Main Riddles Section */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">
              🎆 {post.title.replace(" with Answers", "")} (With Answers)
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {post.description} Test your knowledge with these fun riddles!
            </p>

            {post.riddles.map((riddle, index) => (
              <BlogRiddleCard
                key={index}
                question={riddle.question}
                answer={riddle.answer}
                index={index + 1}
              />
            ))}

            {/* More Riddles Section */}
            {post.moreRiddles.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-12">
                  🧩 More {post.category.replace(" Riddles", "")} Riddles
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Enjoy these bonus riddles! Keep the fun going with more brain
                  teasers.
                </p>

                {post.moreRiddles.map((riddle, index) => (
                  <BlogRiddleCard
                    key={`more-${index}`}
                    question={riddle.question}
                    answer={riddle.answer}
                    index={post.riddles.length + index + 1}
                  />
                ))}
              </>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container max-w-4xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 border-y border-gray-100">
          <div className="container max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Ready to Test Your Brain?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Put your riddle-solving skills to the ultimate test with our
              interactive quiz!
            </p>
            <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 text-left sm:text-center">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 text-sm sm:text-base"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 bg-[#7736FE] text-white font-semibold rounded-lg hover:bg-[#6a2ee6] transition-colors text-lg"
            >
              Start Playing Riddles
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>

        {/* Related Posts Section */}
        <section className="container max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            More from {post.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-5xl mb-4 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {related.emoji}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#7736FE] transition-colors">
                  {related.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {related.description}
                </p>
                <div className="mt-4 flex items-center text-[#7736FE] font-medium text-sm">
                  Browse collection
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
