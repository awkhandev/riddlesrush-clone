"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

interface RiddleCardProps {
  question: string;
  answer: string;
  slug: string;
  index?: number;
}

export function RiddleCard({ question, answer, slug, index }: RiddleCardProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <Link
      href={`/riddles/${slug}`}
      className="block border-2 border-gray-200 rounded-xl p-6 bg-white hover:shadow-lg transition-all duration-300"
    >
      {index !== undefined && (
        <span className="inline-block text-xs font-semibold text-[#7736FE] bg-purple-50 rounded-full px-2.5 py-1 mb-3">
          #{index}
        </span>
      )}

      <p className="text-gray-900 font-medium leading-relaxed">{question}</p>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setRevealed((prev) => !prev);
        }}
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#7736FE] transition-colors"
      >
        {revealed ? (
          <>
            <EyeOff className="h-4 w-4" />
            Hide Answer
          </>
        ) : (
          <>
            <Eye className="h-4 w-4" />
            Reveal Answer
          </>
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          revealed ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-green-800 text-sm font-medium">{answer}</p>
        </div>
      </div>
    </Link>
  );
}
