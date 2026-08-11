"use client";

import { useState } from "react";
import { ChevronDown, Lightbulb, HelpCircle, Sparkles } from "lucide-react";

interface BlogRiddleCardProps {
  question: string;
  answer: string;
  index: number;
}

const VARIANTS = ["card", "quote", "minimal", "highlight"] as const;
type Variant = (typeof VARIANTS)[number];

function getVariant(index: number): Variant {
  return VARIANTS[index % VARIANTS.length];
}

export function BlogRiddleCard({ question, answer, index }: BlogRiddleCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const variant = getVariant(index);

  if (variant === "quote") {
    return (
      <div className="border-l-4 border-purple-400 bg-purple-50/50 rounded-r-xl p-6 my-6 hover:bg-purple-50 transition-all duration-200">
        <div className="mb-4 flex items-start space-x-3">
          <HelpCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <p className="text-lg font-medium text-gray-800 leading-relaxed italic lg:text-xl">
            {index}. {question}
          </p>
        </div>
        <div className="ml-8">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="inline-flex items-center space-x-2 text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors duration-200 hover:bg-purple-100 px-3 py-2 rounded-lg lg:text-base"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                showAnswer ? "rotate-180" : ""
              }`}
            />
            <span>{showAnswer ? "Hide Answer" : "Show Answer"}</span>
          </button>
          {showAnswer && (
            <div className="mt-3 p-4 bg-purple-100 rounded-lg border border-purple-200">
              <p className="text-purple-900 font-semibold">{answer}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className="py-5 my-4 border-b border-gray-100 last:border-0">
        <p className="text-lg font-medium text-gray-800 leading-relaxed mb-3 lg:text-xl">
          <span className="text-gray-400 mr-2">{index}.</span>
          {question}
        </p>
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="inline-flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-gray-100 lg:text-base"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              showAnswer ? "rotate-180" : ""
            }`}
          />
          <span>{showAnswer ? "Hide" : "Reveal"}</span>
        </button>
        {showAnswer && (
          <div className="mt-3 px-4 py-3 bg-gray-50 rounded-lg">
            <p className="text-gray-700 font-medium">{answer}</p>
          </div>
        )}
      </div>
    );
  }

  if (variant === "highlight") {
    return (
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 my-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-amber-300">
        <div className="mb-4 flex items-start space-x-3">
          <div className="flex-shrink-0 w-7 h-7 bg-amber-200 rounded-full flex items-center justify-center mt-0.5">
            <Sparkles className="w-4 h-4 text-amber-700" />
          </div>
          <p className="text-lg font-semibold text-gray-900 leading-relaxed lg:text-xl">
            {index}. {question}
          </p>
        </div>
        <div className="border-t border-amber-200/60 pt-4">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="inline-flex items-center space-x-2 text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors duration-200 hover:bg-amber-100 px-3 py-2 rounded-lg lg:text-base"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                showAnswer ? "rotate-180" : ""
              }`}
            />
            <span>{showAnswer ? "Hide Answer" : "Show Answer"}</span>
          </button>
          {showAnswer && (
            <div className="mt-3 p-4 bg-amber-100 rounded-lg border border-amber-200">
              <p className="text-amber-900 font-semibold">{answer}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default "card" variant (blue)
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 my-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300">
      <div className="mb-4 flex items-start space-x-3">
        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
          <Lightbulb className="w-4 h-4 text-blue-600" />
        </div>
        <p className="text-lg font-semibold text-gray-900 leading-relaxed lg:text-xl">
          {index}. {question}
        </p>
      </div>
      <div className="border-t border-gray-100 pt-4">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="inline-flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:bg-blue-50 px-3 py-2 rounded-lg lg:text-base"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              showAnswer ? "rotate-180" : ""
            }`}
          />
          <span>{showAnswer ? "Hide Answer" : "Show Answer"}</span>
        </button>
        {showAnswer && (
          <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-blue-800 font-medium">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
