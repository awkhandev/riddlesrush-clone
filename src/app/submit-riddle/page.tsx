"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArtHero } from "@/components/art";
import { getThemeBySlug } from "@/lib/visual";

const features = [
  "Play fun and tricky riddles",
  "Challenge yourself daily with fresh brain teasers",
  "Perfect for all ages: kids, teens, and adults",
];

export default function SubmitRiddlePage() {
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
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <ArtHero
          theme={getThemeBySlug("tricky")}
          emoji="✍️"
          title="Submit Your Own Riddle"
          description="Think you've got a tricky riddle that can stump the crowd?"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Submit Riddle" }]}
          seed="submit-riddle"
        />

        <div className="container max-w-4xl py-12 lg:py-20 mx-auto px-4 sm:px-6 lg:px-8">

          {/* Form Card */}
          <div className="bg-white p-8 border-2 border-gray-200 rounded-2xl shadow-xl">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-xl font-bold text-gray-700 mb-2"
                >
                  Your Name <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7736FE] focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="riddle"
                  className="block text-xl font-bold text-gray-700 mb-2"
                >
                  Riddle
                </label>
                <textarea
                  id="riddle"
                  value={riddle}
                  onChange={(e) => setRiddle(e.target.value)}
                  placeholder="Enter your riddle..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7736FE] focus:border-transparent resize-none"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="answer"
                  className="block text-xl font-bold text-gray-700 mb-2"
                >
                  Answer
                </label>
                <textarea
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter the answer..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7736FE] focus:border-transparent resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {submitted ? "Submitted! ✓" : sending ? "Sending..." : "Submit Riddle"}
              </button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              Do not include any personal information. Submissions are anonymous
              and reviewed before publishing.
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Test Your Brain?
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
              Explore our collection of riddles and challenge yourself with
              brain teasers for every skill level.
            </p>

            <div className="grid gap-6 sm:grid-cols-3 mb-10 max-w-3xl mx-auto">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-6"
                >
                  <p className="text-gray-700 font-medium">{feature}</p>
                </div>
              ))}
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-[#7736FE] px-8 py-4 text-lg font-bold text-white shadow-sm hover:bg-[#6a2ee6] transition-colors"
            >
              Start Playing Riddles →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
