import Link from "next/link";

export function TriviaSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-purple-50 to-blue-50 border-y border-gray-100">
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[#7736FE]">
            Like Riddles? Try Trivia!
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
            If you enjoy riddles, you might also like our trivia site with quizzes
            by category and difficulty.
          </p>
          <Link
            href="https://www.triviabrain.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[#7736FE] hover:text-purple-700 font-semibold text-lg sm:text-xl hover:underline transition-colors"
          >
            TriviaBrain →
          </Link>
        </div>
      </div>
    </section>
  );
}
