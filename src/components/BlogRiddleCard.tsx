"use client";

import { useState } from "react";
import { Lightbulb, Eye } from "lucide-react";

interface BlogRiddleCardProps {
  question: string;
  answer: string;
  index?: number;
}

export function BlogRiddleCard({ question, answer }: BlogRiddleCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 my-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300">
      <div className="mb-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-900 leading-relaxed lg:text-xl">
              {question}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 pt-4">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="inline-flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:bg-blue-50 px-3 py-2 rounded-lg lg:text-base"
        >
          <Eye className="w-4 h-4" />
          <span>{showAnswer ? "Hide Answer" : "Reveal Answer"}</span>
        </button>
        {showAnswer && (
          <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-gray-800 font-medium">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
