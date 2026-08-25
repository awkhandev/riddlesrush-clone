import Link from "next/link";

export function AboutSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-50 to-purple-50 border-y border-gray-100">
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[#7736FE]">
            Discover Exciting Riddles and Brain Teasers
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
            Welcome to Riddles Rush, your ultimate destination for riddles and
            brain puzzles! Whether you&apos;re a seasoned riddle solver or just
            starting out, our extensive collection of riddles is designed to
            challenge your mind and boost your problem-solving abilities.
          </p>
          <p className="text-gray-600 text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
            Our riddle collection is regularly updated with fresh and exciting
            content, ranging from classic logic puzzles to word games and tricky
            brain teasers. Each riddle comes with a detailed answer and
            explanation to help you learn and improve.
          </p>
          <p className="text-gray-600 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Ready to improve your critical thinking and have some fun? Dive into
            our collection and start solving!
          </p>
          <Link
            href="/riddles/riddles-with-answers"
            className="inline-flex items-center min-h-[48px] text-[#7736FE] hover:text-purple-700 font-semibold text-lg sm:text-xl hover:underline transition-colors"
          >
            Start Solving →
          </Link>
        </div>
      </div>
    </section>
  );
}
