"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const categories = [
  {
    title: "Kids Riddles",
    emoji: "🧸",
    description:
      "Fun and easy riddles perfect for children ages 5-12. Great for classrooms, bedtime stories, and family time.",
    href: "/blog/category/kids-riddles",
  },
  {
    title: "Adult Riddles",
    emoji: "🧠",
    description:
      "Challenging brain teasers and logic puzzles designed to test your critical thinking. Find hard riddles with answers, mind-bending logic puzzles, and riddles for adults.",
    href: "/blog/category/adult-riddles",
  },
  {
    title: "Holiday Riddles",
    emoji: "🎉",
    description:
      "Seasonal riddles for Christmas, Halloween, Easter, Thanksgiving, and more. Perfect for holiday parties, classroom activities, and family celebrations throughout the year.",
    href: "/blog/category/holiday-riddles",
  },
  {
    title: "What Am I Riddles",
    emoji: "🧩",
    description:
      "Classic \"What Am I?\" riddles that challenge you to guess the object, animal, or concept being described.",
    href: "/blog/category/what-am-i-riddles",
  },
  {
    title: "Family Riddles",
    emoji: "👨‍👩‍👧‍👦",
    description:
      "Perfect riddles for family game nights, road trips, and quality time together.",
    href: "/blog/category/family-riddles",
  },
  {
    title: "Nature Riddles",
    emoji: "🌲",
    description:
      "Outdoor-themed riddles about animals, weather, plants, and the natural world.",
    href: "/blog/category/nature-riddles",
  },
  {
    title: "Food Riddles",
    emoji: "🍕",
    description:
      "Delicious riddles about food, cooking, and everything culinary.",
    href: "/blog/category/food-riddles",
  },
  {
    title: "Sports Riddles",
    emoji: "⚽",
    description:
      "Athletic riddles covering baseball, basketball, soccer, and other popular sports.",
    href: "/blog/category/sports-riddles",
  },
];

export default function RiddleOfTheDayPage() {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="flex min-h-screen flex-col items-center">
          <div className="flex flex-col w-full">
            {/* Top Hero + Riddle Card with Gradient */}
            <div className="bg-gradient-to-b from-[#f1f7f9] to-white">
              <section className="flex flex-col items-center text-center py-12 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 to-blue-100/30 rounded-3xl blur-3xl -z-10" />
                <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                  <h1 className="font-heading font-bold text-4xl sm:text-6xl mb-4 text-[#7736FE]">
                    Riddle of the Day
                  </h1>
                  <p className="max-w-[42rem] leading-normal text-muted-foreground text-lg sm:text-xl sm:leading-8 mx-auto">
                    Challenge yourself with today&apos;s featured riddle
                  </p>
                </div>
              </section>

              <section className="mb-24 sm:my-24">
                <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto">
                  <div className="bg-card border border-gray-200 rounded-2xl shadow-xl text-gray-700 text-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative p-8">
                      <h2 className="font-bold text-2xl sm:text-4xl text-[#d99144] mb-4 text-center">
                        Riddle:
                      </h2>
                      <p className="break-words text-lg sm:text-2xl text-gray-800 mb-8 text-center">
                        The more you take away, the larger it becomes? What is it?
                      </p>

                      {showAnswer && (
                        <div className="p-6 bg-purple-50 rounded-xl border border-purple-200 text-center mb-8">
                          <h3 className="font-bold text-xl text-[#7736FE] mb-2">Answer:</h3>
                          <p className="text-xl text-gray-800 font-medium">A hole.</p>
                        </div>
                      )}

                      <div className="flex justify-center space-x-4 pt-3 w-full mb-8">
                        <button
                          onClick={() => setShowAnswer(!showAnswer)}
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#7736FE] text-white hover:bg-[#9874e1] sm:hover:scale-105 sm:hover:transform h-10 px-4 py-2 text-lg sm:text-xl font-bold"
                        >
                          {showAnswer ? "Hide Answer" : "Show Answer"}
                        </button>
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <p className="text-gray-600 mb-4">Want to see more riddles?</p>
                        <Link href="/riddles/riddles-with-answers">
                          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:hover:scale-105 sm:hover:transform h-10 bg-[#7736FE] hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                            Explore All Riddles
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Explore Riddle Categories Section */}
            <section className="py-24 bg-gray-50 border-y border-gray-100">
              <div className="w-full max-w-5xl sm:max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-5xl font-bold mb-8 text-[#7736FE]">
                    Explore Riddle Categories
                  </h2>
                  <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
                    Discover riddles organized by topic and difficulty. Whether you&apos;re looking for family fun,
                    brain challenges, or seasonal entertainment, we have the perfect riddles for every occasion.
                  </p>

                  <div className="grid gap-5 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {categories.map((category) => (
                      <Link
                        key={category.title}
                        href={category.href}
                        className="block p-6 border rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-purple-200 bg-white group min-h-[120px]"
                      >
                        <div className="text-center">
                          <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                            {category.emoji}
                          </span>
                          <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-[#7736FE] transition-colors">
                            {category.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3">
                            {category.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="flex justify-center mt-8 space-x-4">
                    <Link
                      className="bg-[#7736FE] text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                      href="/blog/category"
                    >
                      Browse All Categories
                    </Link>
                    <Link
                      className="text-[#7736FE] hover:text-purple-700 hover:underline px-6 py-3"
                      href="/blog"
                    >
                      View All Collections
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Explore Our Collection Section */}
            <section className="py-24 bg-white">
              <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-5xl font-bold mb-8 text-[#7736FE]">
                    Explore Our Collection
                  </h2>
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-50 p-8 rounded-xl">
                      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Browse Hundreds of Riddles</h3>
                      <p className="text-gray-600 text-lg mb-6">
                        Browse through hundreds of riddles organized by category. From easy kids&apos; riddles to
                        challenging brain teasers, there&apos;s something for everyone.
                      </p>
                      <Link href="/riddles/riddles-with-answers">
                        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background h-10 border-[#7736FE] text-[#7736FE] hover:bg-[#7736FE] hover:text-white px-6 py-3 rounded-lg font-medium transition-colors">
                          Start Exploring
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
