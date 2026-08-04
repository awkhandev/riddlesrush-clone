"use client";

import { useState } from "react";

export function RiddleReveal({
  answer,
  hint,
}: {
  answer: string;
  hint?: string;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="mt-8 text-center">
      {hint && (
        <p className="mb-4 text-sm text-gray-500 italic">{hint}</p>
      )}

      <button
        onClick={() => setRevealed(!revealed)}
        className="inline-flex items-center gap-2 rounded-xl bg-[#7736FE] px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#6a2ee6] hover:shadow-lg active:scale-[0.97]"
      >
        {revealed ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
              <line x1="2" x2="22" y1="2" y2="22" />
            </svg>
            Hide Answer
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Reveal Answer
          </>
        )}
      </button>

      <div
        className={`mt-6 overflow-hidden transition-all duration-500 ease-in-out ${
          revealed ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
          <p className="text-lg font-medium text-green-800">{answer}</p>
        </div>
      </div>
    </div>
  );
}
