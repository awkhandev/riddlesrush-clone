"use client";

import { useState } from "react";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";

export function RiddleReveal({
  answer,
  hint = "Take a moment to solve it, then reveal the answer below.",
}: {
  answer: string;
  hint?: string;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 my-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300">
      <p className="text-sm text-gray-500 mb-4 italic">{hint}</p>

      <div className="border-t border-gray-100 pt-4">
        <button
          onClick={() => setRevealed(!revealed)}
          className="inline-flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:bg-blue-50 px-3 py-2 rounded-lg"
          aria-expanded={revealed}
        >
          {revealed ? (
            <>
              <EyeOff className="w-4 h-4" />
              <span>Hide Answer</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              <span>Reveal Answer</span>
            </>
          )}
        </button>

        {revealed && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
            <div className="flex items-start space-x-2 text-green-700 bg-green-50 p-4 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-green-800 uppercase tracking-wider mb-0.5">
                  Answer:
                </p>
                <p className="text-base font-medium text-green-900 leading-relaxed">
                  {answer}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

