"use client";

import { useState } from "react";
import Link from "next/link";

const riddles = [
  {
    question: "Before Mt. Everest was discovered, what was the highest mountain in the world?",
    answer: "Mt. Everest (it was still the highest, just not yet discovered)",
  },
  {
    question: "What has keys but no locks?",
    answer: "A keyboard",
  },
  {
    question: "What can travel around the world while staying in a corner?",
    answer: "A stamp",
  },
  {
    question: "What gets wetter the more it dries?",
    answer: "A towel",
  },
  {
    question: "I speak without a mouth and hear without ears. What am I?",
    answer: "An echo",
  },
];

export function HeroSection() {
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNextRiddle = () => {
    setCurrentRiddle((prev) => (prev + 1) % riddles.length);
    setShowAnswer(false);
  };

  return (
    <section className="bg-gradient-to-b from-[#f1f7f9] to-white">
      <div className="flex flex-col items-center text-center py-12 sm:py-16 lg:py-20 relative">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 to-blue-100/30 rounded-3xl blur-3xl -z-10" />

        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <h1 className="font-heading font-bold text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6 text-[#7736FE]">
            Riddles Rush
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground text-xl sm:text-2xl lg:text-3xl sm:leading-8 mx-auto">
            Fun Riddles &amp; Brain Puzzles
          </p>

          {/* Featured Riddle Card */}
          <div className="mb-12 sm:mb-16 lg:mb-24 mt-12 sm:mt-16 lg:mt-24">
            <div className="bg-card border border-gray-200 rounded-2xl shadow-xl text-gray-700 text-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative p-8">
                <h2 className="font-bold text-2xl sm:text-4xl text-[#d99144] mb-4">
                  Riddle:
                </h2>
                <p className="break-words text-lg sm:text-2xl text-gray-800 mb-4">
                  {riddles[currentRiddle].question}
                </p>

                {showAnswer && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-green-800 text-lg sm:text-xl font-medium">
                      {riddles[currentRiddle].answer}
                    </p>
                  </div>
                )}

                <div className="flex justify-center space-x-4 pt-3 w-full mb-8">
                  <button
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-[#9874e1] sm:hover:scale-105 sm:hover:transform h-10 px-4 py-2 text-lg sm:text-xl font-bold"
                  >
                    {showAnswer ? "Hide Answer" : "Show Answer"}
                  </button>
                  <button
                    onClick={handleNextRiddle}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground sm:hover:scale-105 sm:hover:transform h-10 px-4 py-2 bg-green-700 hover:bg-green-600 text-lg sm:text-xl font-bold"
                  >
                    Next Riddle
                  </button>
                </div>

                {/* App download CTA */}
                <div className="mt-12 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-3">
                      Download our mobile app!
                    </p>
                    <Link
                      href="https://apps.apple.com/be/app/riddles-train-your-brain/id6447545144"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-black text-white rounded-md px-6 py-3 text-base font-medium hover:bg-gray-900 transition-colors max-h-[50px]"
                    >
                      <span className="flex-shrink-0">
                        <svg
                          viewBox="0 0 384 512"
                          width="20"
                          height="20"
                          fill="currentColor"
                        >
                          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                        </svg>
                      </span>
                      Download on the App Store
                    </Link>
                    <p className="text-xs text-gray-500 mt-2">
                      Android app coming soon!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
