"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Rocket } from "lucide-react";

export default function SubmitRiddlePage() {
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
        body: JSON.stringify({ riddle: riddle.trim(), answer: answer.trim() }),
      });
      if (res.ok) {
        setSubmitted(true);
        setRiddle("");
        setAnswer("");
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch {
      // silently handle
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col items-center pt-16 sm:p-16 bg-[#f1f7f9]">
        <section className="flex flex-col items-center text-center px-4">
          <h1 className="font-heading font-bold text-primary text-5xl sm:text-6xl">Submit Your Own Riddle</h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground text-lg sm:text-xl sm:leading-8 mt-2">
            Think you&apos;ve got a tricky riddle that can stump the crowd?
          </p>
        </section>

        <section className="pt-14 px-4 w-full sm:max-w-[52rem] sm:min-w-[52rem]">
          <div className="bg-white p-8 rounded-lg shadow-lg text-gray-700">
            <div className="user-riddles text-lg">
              <form className="mt-4" onSubmit={handleSubmit}>
                <label htmlFor="riddle" className="block text-xl font-bold text-gray-700 mb-2">
                  Riddle
                </label>
                <textarea
                  id="riddle"
                  value={riddle}
                  onChange={(e) => setRiddle(e.target.value)}
                  className="border rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#7736FE]"
                  placeholder="I am a box that holds keys without locks, What am I?"
                  rows={4}
                  required
                />
                <label htmlFor="answer" className="block text-xl font-bold text-gray-700 mb-2">
                  Answer
                </label>
                <textarea
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="border rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#7736FE]"
                  placeholder="A piano"
                  rows={3}
                  required
                />
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#9874e1] sm:hover:scale-105 sm:hover:transform h-10 mt-4 bg-green-500 text-white px-4 py-2 text-lg font-bold"
                  type="submit"
                  disabled={sending}
                >
                  {submitted ? "Submitted! ✓" : sending ? "Submitting..." : "Submit Riddle"}
                </button>
                <p className="text-xs text-muted-foreground mt-3">
                  Do not include any personal information. Submissions are anonymous and reviewed before publishing.
                </p>
              </form>
            </div>
          </div>
        </section>

        <section className="pt-14 px-4 pb-16 w-full sm:max-w-[52rem] sm:min-w-[52rem]">
          <div className="bg-white p-8 rounded-lg shadow-lg text-gray-700">
            <div className="flex flex-col items-center text-center">
              <h2 className="font-heading font-bold text-primary text-3xl sm:text-4xl">Ready to Test Your Brain?</h2>
              <ul className="max-w-[42rem] leading-normal text-muted-foreground text-base sm:text-lg sm:leading-8 mt-4 list-disc list-inside text-left">
                <li className="mb-2">Play fun and tricky riddles</li>
                <li className="mb-2">Challenge yourself daily with fresh brain teasers</li>
                <li className="mb-2">Perfect for all ages: kids, teens, and adults</li>
              </ul>
              <Link className="mt-8" href="/">
                <button className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-md bg-[#6658fe] text-white font-semibold text-base focus:outline-none hover:bg-[#6658fed4] rounded-md px-8 h-12">
                  <Rocket className="w-6 h-8 mr-2" />
                  Start Playing Riddles
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
