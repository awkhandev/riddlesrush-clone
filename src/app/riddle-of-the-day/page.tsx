"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  TeddyBearIcon,
  BrainIcon,
  PartyIcon,
  PuzzleIcon,
  FamilyIcon,
  TreeIcon,
  PizzaIcon,
  SoccerIcon,
} from "@/components/icons";

const categories = [
  {
    title: "Kids Riddles",
    emoji: <TeddyBearIcon />,
    description: "Fun and easy riddles perfect for children ages 5-12.",
    href: "/blog/category/kids-riddles",
  },
  {
    title: "Adult Riddles",
    emoji: <BrainIcon />,
    description:
      "Challenging brain teasers and logic puzzles designed to test your critical thinking.",
    href: "/blog/category/adult-riddles",
  },
  {
    title: "Holiday Riddles",
    emoji: <PartyIcon />,
    description:
      "Seasonal riddles for Christmas, Halloween, Easter, Thanksgiving, and more.",
    href: "/blog/category/holiday-riddles",
  },
  {
    title: "What Am I Riddles",
    emoji: <PuzzleIcon />,
    description:
      "Classic 'What Am I?' riddles that challenge you to guess the object.",
    href: "/blog/category/what-am-i-riddles",
  },
  {
    title: "Family Riddles",
    emoji: <FamilyIcon />,
    description:
      "Perfect riddles for family game nights, road trips, and quality time together.",
    href: "/blog/category/family-riddles",
  },
  {
    title: "Nature Riddles",
    emoji: <TreeIcon />,
    description:
      "Outdoor-themed riddles about animals, weather, plants, and the natural world.",
    href: "/blog/category/nature-riddles",
  },
  {
    title: "Food Riddles",
    emoji: <PizzaIcon />,
    description:
      "Delicious riddles about food, cooking, and everything culinary.",
    href: "/blog/category/food-riddles",
  },
  {
    title: "Sports Riddles",
    emoji: <SoccerIcon />,
    description:
      "Athletic riddles covering baseball, basketball, soccer, and other popular sports.",
    href: "/blog/category/sports-riddles",
  },
];

const riddles = [
  {
    question:
      "How could a cowboy ride into town on Friday, stay two days, and ride out on Friday?",
    answer: "His horse's name is Friday.",
  },
  {
    question:
      "What has keys but no locks, space but no room, and you can enter but can't go inside?",
    answer: "A keyboard.",
  },
  {
    question:
      "I have cities, but no houses live there. I have mountains, but no trees grow. I have water, but no fish swim. What am I?",
    answer: "A map.",
  },
  {
    question:
      "The more you take, the more you leave behind. What am I?",
    answer: "Footsteps.",
  },
  {
    question:
      "What can travel around the world while staying in a corner?",
    answer: "A stamp.",
  },
];

export default function RiddleOfTheDayPage() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [riddleIndex, setRiddleIndex] = useState(0);

  const currentRiddle = riddles[riddleIndex];

  const handleNextRiddle = () => {
    setRiddleIndex((prev) => (prev + 1) % riddles.length);
    setShowAnswer(false);
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#f1f7f9] to-white pt-16 pb-24">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-100/60 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading font-bold text-4xl sm:text-6xl mb-4 text-[#7736FE]">
              Riddle of the Day
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              A fresh riddle every day to challenge your mind!
            </p>
          </div>
        </section>

        {/* Featured Riddle Card */}
        <section className="px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="mx-auto max-w-5xl">
            <div className="bg-card border border-gray-200 rounded-2xl shadow-xl p-8 sm:p-12">
              <p className="text-sm font-bold uppercase tracking-widest text-[#d99144] mb-4">
                Riddle:
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-800 leading-relaxed mb-8">
                {currentRiddle.question}
              </p>

              {showAnswer && (
                <div className="mb-8 rounded-xl bg-green-50 border border-green-200 p-6">
                  <p className="text-sm font-bold uppercase tracking-widest text-green-600 mb-2">
                    Answer:
                  </p>
                  <p className="text-xl sm:text-2xl font-semibold text-green-700">
                    {currentRiddle.answer}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="inline-flex items-center justify-center rounded-lg bg-[#7736FE] px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-[#6a2ee6] transition-colors"
                >
                  {showAnswer ? "Hide Answer" : "Show Answer"}
                </button>
                <button
                  onClick={handleNextRiddle}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                >
                  Next Riddle →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Category Exploration Grid */}
        <section className="py-24 bg-gray-50 border-y border-gray-100 mt-24">
          <div className="mx-auto max-w-5xl sm:max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#7736FE]">
                Explore Riddle Categories
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Find riddles organized by topic and difficulty level.
              </p>
            </div>

            <div className="grid gap-5 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category.title}
                  href={category.href}
                  className="block p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.01] hover:border-purple-200 bg-white group min-h-[120px]"
                >
                  <div className="text-center">
                    <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                      {category.emoji}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800 group-hover:text-[#7736FE] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-base sm:text-lg line-clamp-3">
                      {category.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link
                href="/blog/category"
                className="inline-flex items-center justify-center rounded-lg bg-[#7736FE] px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-[#6a2ee6] transition-colors"
              >
                Browse All Categories
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
              >
                View All Collections
              </Link>
            </div>
          </div>
        </section>

        {/* Explore Our Collection Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Explore Our Collection
            </h2>
            <p className="text-xl sm:text-2xl font-semibold text-[#7736FE] mb-4">
              Browse Hundreds of Riddles
            </p>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              From easy kids&apos; riddles to challenging brain teasers,
              there&apos;s something for everyone.
            </p>
            <Link
              href="/riddles/riddles-with-answers"
              className="inline-flex items-center justify-center rounded-lg bg-[#7736FE] px-8 py-4 text-lg font-bold text-white shadow-sm hover:bg-[#6a2ee6] transition-colors"
            >
              Start Exploring →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
