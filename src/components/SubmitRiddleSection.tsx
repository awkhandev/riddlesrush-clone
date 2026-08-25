"use client";

import { useState } from "react";

export function SubmitRiddleSection() {
  const [name, setName] = useState("");
  const [riddle, setRiddle] = useState("");
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!riddle.trim() || !answer.trim()) return;

    setSending(true);
    try {
      const res = await fetch("/api/submit-riddle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), riddle: riddle.trim(), answer: answer.trim() }),
      });
      if (res.ok) {
        setSubmitted(true);
        setName("");
        setRiddle("");
        setAnswer("");
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch {
      // silently fail
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="bg-white p-8 border-2 border-gray-200 rounded-2xl shadow-xl text-gray-700 text-lg hover:shadow-2xl transition-all duration-300">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-[#7736FE]">
            Submit Your Own Riddle
          </h2>
          <p className="text-gray-600 text-xl sm:text-2xl mb-6">
            Think you&apos;ve got a tricky riddle that can stump the crowd?
          </p>

          <div className="user-riddles text-lg">
            <form onSubmit={handleSubmit} className="mt-4">
              <label className="block text-xl font-bold text-gray-700 mb-2">
                Your Name <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="border rounded-lg p-3 w-full mb-4 text-lg"
              />

              <label className="block text-xl font-bold text-gray-700 mb-2">
                Riddle
              </label>
              <input
                type="text"
                value={riddle}
                onChange={(e) => setRiddle(e.target.value)}
                placeholder="Enter your riddle..."
                className="border rounded-lg p-3 w-full mb-4 text-lg"
                required
              />

              <label className="block text-xl font-bold text-gray-700 mb-2">
                Answer
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter the answer..."
                className="border rounded-lg p-3 w-full mb-4 text-lg"
                required
              />

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#9874e1] sm:hover:scale-105 sm:hover:transform min-h-[48px] h-12 mt-4 bg-green-500 text-white px-4 py-2 text-lg font-bold"
              >
                {submitted ? "Submitted! ✓" : sending ? "Sending..." : "Submit Riddle"}
              </button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              Do not include any personal information. Submissions are anonymous
              and reviewed before publishing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
