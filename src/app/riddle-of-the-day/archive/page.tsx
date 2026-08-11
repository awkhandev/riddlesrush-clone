import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArtHero } from "@/components/art";
import { getThemeBySlug } from "@/lib/visual";
import { JsonLd } from "@/components/seo/JsonLd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riddle of the Day Archive — Daily Brain Teasers | Riddles Rush",
  description:
    "Browse our complete archive of daily riddles and brain teasers. A new riddle every day — revisit your favorites or catch up on ones you missed!",
  alternates: {
    canonical: "https://riddles-rush.vercel.app/riddle-of-the-day/archive",
  },
};

// Deterministic riddles for the archive — same set used on the main page
const archiveRiddles = [
  {
    date: "August 12, 2026",
    category: "Classic Riddles",
    question: "How could a cowboy ride into town on Friday, stay two days, and ride out on Friday?",
    answer: "His horse's name is Friday.",
    difficulty: "Easy",
  },
  {
    date: "August 11, 2026",
    category: "Logic Puzzles",
    question: "What has keys but no locks, space but no room, and you can enter but can't go inside?",
    answer: "A keyboard.",
    difficulty: "Medium",
  },
  {
    date: "August 10, 2026",
    category: "What Am I?",
    question: "I have cities, but no houses live there. I have mountains, but no trees grow. I have water, but no fish swim. What am I?",
    answer: "A map.",
    difficulty: "Medium",
  },
  {
    date: "August 9, 2026",
    category: "Brain Teasers",
    question: "The more you take, the more you leave behind. What am I?",
    answer: "Footsteps.",
    difficulty: "Easy",
  },
  {
    date: "August 8, 2026",
    category: "Wordplay",
    question: "What can travel around the world while staying in a corner?",
    answer: "A stamp.",
    difficulty: "Easy",
  },
  {
    date: "August 7, 2026",
    category: "Classic Riddles",
    question: "What gets wetter the more it dries?",
    answer: "A towel.",
    difficulty: "Easy",
  },
  {
    date: "August 6, 2026",
    category: "Logic Puzzles",
    question: "I have branches, but no fruit, trunk, or leaves. What am I?",
    answer: "A bank.",
    difficulty: "Medium",
  },
  {
    date: "August 5, 2026",
    category: "What Am I?",
    question: "What can fill a room but takes up no space?",
    answer: "Light.",
    difficulty: "Easy",
  },
  {
    date: "August 4, 2026",
    category: "Brain Teasers",
    question: "If you drop me, I'm sure to crack, but give me a smile and I'll always smile back. What am I?",
    answer: "A mirror.",
    difficulty: "Easy",
  },
  {
    date: "August 3, 2026",
    category: "Wordplay",
    question: "What begins with an 'e' and contains only one letter?",
    answer: "An envelope.",
    difficulty: "Easy",
  },
  {
    date: "August 2, 2026",
    category: "Classic Riddles",
    question: "What has a head and a tail but no body?",
    answer: "A coin.",
    difficulty: "Easy",
  },
  {
    date: "August 1, 2026",
    category: "Logic Puzzles",
    question: "What can you catch but not throw?",
    answer: "A cold.",
    difficulty: "Easy",
  },
  {
    date: "July 31, 2026",
    category: "What Am I?",
    question: "I fly without wings. I cry without eyes. Wherever I go, darkness follows me. What am I?",
    answer: "A cloud.",
    difficulty: "Medium",
  },
  {
    date: "July 30, 2026",
    category: "Brain Teasers",
    question: "What is seen in the middle of March and April that can't be seen at the beginning or end of either month?",
    answer: "The letter 'r'.",
    difficulty: "Medium",
  },
  {
    date: "July 29, 2026",
    category: "Wordplay",
    question: "What word in the English language does the following: the first two letters signify a male, the first three letters signify a female, the first four letters signify a great, while the entire word signifies a great woman?",
    answer: "Heroine.",
    difficulty: "Hard",
  },
  {
    date: "July 28, 2026",
    category: "Classic Riddles",
    question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
    answer: "The letter 'm'.",
    difficulty: "Medium",
  },
  {
    date: "July 27, 2026",
    category: "Logic Puzzles",
    question: "What has an eye, but cannot see?",
    answer: "A needle.",
    difficulty: "Easy",
  },
  {
    date: "July 26, 2026",
    category: "What Am I?",
    question: "I have a face but no eyes, hands but no arms. What am I?",
    answer: "A clock.",
    difficulty: "Easy",
  },
  {
    date: "July 25, 2026",
    category: "Brain Teasers",
    question: "What is full of holes but still holds water?",
    answer: "A sponge.",
    difficulty: "Easy",
  },
  {
    date: "July 24, 2026",
    category: "Wordplay",
    question: "What 8-letter word can have a letter taken away and it still makes a word, take another letter away and it still makes a word, keep on doing that until you have one letter left. What is it?",
    answer: "Starting (starting, staring, string, sting, sing, sin, in, I).",
    difficulty: "Hard",
  },
];

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-700 border-green-200";
    case "Medium":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Hard":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

export default function RiddleArchivePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Riddle of the Day Archive",
          description:
            "Browse our complete archive of daily riddles and brain teasers. A new riddle every day!",
          url: "https://riddles-rush.vercel.app/riddle-of-the-day/archive",
          isPartOf: {
            "@id": "https://riddles-rush.vercel.app/#website",
          },
          about: {
            "@type": "Thing",
            name: "Daily Riddles and Brain Teasers",
          },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: archiveRiddles.length,
            itemListElement: archiveRiddles.map((riddle, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: riddle.question,
              description: riddle.answer,
            })),
          },
          inLanguage: "en-US",
        }}
      />
      <Header />
      <main className="flex-1">
        <ArtHero
          theme={getThemeBySlug("answers")}
          emoji="📅"
          title="Riddle of the Day Archive"
          description="Browse our complete collection of daily riddles. Never miss a brain teaser!"
          badge="Archive · Riddles Rush"
          seed="riddle-archive"
        />

        {/* Archive Grid */}
        <section className="container max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Daily Riddles Archive
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every riddle we&apos;ve featured as our Riddle of the Day, organized by date.
              Challenge yourself with as many as you like!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {archiveRiddles.map((riddle, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-purple-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">
                    {riddle.date}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getDifficultyColor(riddle.difficulty)}`}
                  >
                    {riddle.difficulty}
                  </span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7736FE] mb-2 block">
                  {riddle.category}
                </span>
                <p className="text-lg font-semibold text-gray-900 leading-snug mb-4">
                  {riddle.question}
                </p>
                <details className="group">
                  <summary className="cursor-pointer text-sm font-medium text-[#7736FE] hover:text-[#6a2ee6] transition-colors">
                    Reveal Answer
                  </summary>
                  <div className="mt-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <p className="text-purple-900 font-semibold">
                      {riddle.answer}
                    </p>
                  </div>
                </details>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Want a fresh riddle every day?
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Visit our main Riddle of the Day page for today&apos;s featured brain teaser,
              or explore our full collection of themed riddle sets.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/riddle-of-the-day"
                className="inline-flex items-center justify-center rounded-lg bg-[#7736FE] px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-[#6a2ee6] transition-colors"
              >
                Today&apos;s Riddle →
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
              >
                Browse All Collections
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
