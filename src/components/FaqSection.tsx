"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "./icons";

const faqs = [
  {
    question: "What types of riddles are available?",
    answer:
      "We offer a wide variety of riddles including logic puzzles, brain teasers, word games, and classic riddles. Our collection ranges from easy riddles for kids to challenging ones for adults, covering topics like nature, food, sports, holidays, and more.",
  },
  {
    question: "How often are new riddles added?",
    answer:
      "Our riddle database is regularly updated with fresh content. We add new riddles and collections frequently to keep things exciting and challenging for our visitors.",
  },
  {
    question: "Can I solve riddles with friends or family?",
    answer:
      "Absolutely! Riddles are a great way to bond with friends and family. Many of our collections are designed for group activities like road trips, campfires, and family game nights.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "Yes! We have an iOS app available on the App Store. You can download it to solve riddles on the go. Our Android app is coming soon!",
  },
  {
    question: "Are the riddles suitable for all ages?",
    answer:
      "Absolutely! We have riddles designed for all ages and skill levels. From simple and fun riddles for young children to complex brain teasers for adults, there's something for everyone.",
  },
  {
    question: "What is the Riddle of the Day?",
    answer:
      "The Riddle of the Day is a daily rotating feature where we showcase a special riddle. It's a great way to challenge yourself with a new puzzle every day!",
    link: { label: "Try it now", href: "/riddle-of-the-day" },
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 border-y border-gray-100">
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center">
          <div className="faq-section">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-[#7736FE]">
              Frequently Asked Questions
            </h2>
          </div>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item p-6 rounded-xl hover:bg-white transition-colors duration-200 text-left"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-2xl sm:text-3xl font-semibold mb-3 text-gray-800 pr-4">
                  {faq.question}
                </h3>
                <ChevronDownIcon
                  className={`h-6 w-6 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="mt-2">
                  <p className="text-gray-600 text-lg sm:text-xl">
                    {faq.answer}
                  </p>
                  {faq.link && (
                    <Link
                      href={faq.link.href}
                      className="inline-block mt-2 text-[#7736FE] hover:text-purple-700 font-medium hover:underline"
                    >
                      {faq.link.label} →
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="inline-flex items-center justify-center text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:hover:scale-105 sm:hover:transform h-10 bg-[#7736FE] hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            View All FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}
