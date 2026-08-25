import Link from "next/link";
import { FireIcon, BriefcaseIcon, CarIcon, HomeIcon, BookIcon, EyeIcon, LeafIcon, UsersIcon, StarIcon } from "./icons";

const collections = [
  {
    title: "Campfire Riddles",
    emoji: <FireIcon />,
    description: "Perfect riddles for outdoor adventures and cozy campfire gatherings",
    href: "/blog/campfire-riddles",
  },
  {
    title: "Job & Career Riddles",
    emoji: <BriefcaseIcon />,
    description: "Brain teasers about professions, workplaces, and career paths",
    href: "/blog/job-and-career-riddles",
  },
  {
    title: "Car Ride Riddles",
    emoji: <CarIcon />,
    description: "Fun riddles to keep everyone entertained during long road trips",
    href: "/blog/riddles-for-car-rides",
  },
  {
    title: "Everyday Object Riddles",
    emoji: <HomeIcon />,
    description: "Riddles about common items you use in your daily life",
    href: "/blog/everyday-object-riddles",
  },
  {
    title: "History Riddles",
    emoji: <BookIcon />,
    description: "Educational riddles about historical events, figures, and periods",
    href: "/blog/history-riddles",
  },
  {
    title: "5 Senses Riddles",
    emoji: <EyeIcon />,
    description: "Riddles that challenge your sight, sound, touch, taste, and smell",
    href: "/blog/riddles-about-the-5-senses",
  },
  {
    title: "Fall Riddles",
    emoji: <LeafIcon />,
    description: "Seasonal riddles perfect for autumn and harvest celebrations",
    href: "/blog/fall-riddles-with-answers",
  },
  {
    title: "Friend Riddles",
    emoji: <UsersIcon />,
    description: "Fun riddles designed for sharing and solving with your friends",
    href: "/blog/riddles-to-ask-friends",
  },
  {
    title: "Celebrity Riddles",
    emoji: <StarIcon />,
    description: "Riddles about famous people, movies, and pop culture",
    href: "/blog/celebrity-riddles",
  },
];

export function TopCollections() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-y border-gray-100">
      <div className="w-full max-w-5xl sm:max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center">
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-gray-500 mb-3">
            Curated
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 text-[#7736FE]">
            Top Riddle Collections
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto">
            Discover our most popular riddle collections.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center min-h-[48px] text-[#7736FE] font-medium hover:underline"
          >
            View all collections
          </Link>
        </div>

        <div className="grid gap-5 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link
              key={collection.title}
              href={collection.href}
              className="block p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.01] hover:border-purple-200 bg-gray-50/80 group min-h-[120px]"
            >
              <div className="text-center">
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                  {collection.emoji}
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800 group-hover:text-[#7736FE] transition-colors">
                  {collection.title}
                </h3>
                <p className="text-gray-600 text-base sm:text-lg line-clamp-3">
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="/riddle-of-the-day"
            className="bg-[#7736FE] text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors text-center"
          >
            🎯 Try Today&apos;s Featured Riddle
          </Link>
          <Link
            href="/blog/category"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors text-center"
          >
            Browse all article categories
          </Link>
          <Link
            href="/blog"
            className="text-[#7736FE] hover:text-purple-700 hover:underline px-6 py-3 text-center"
          >
            View the blog
          </Link>
        </div>
      </div>
    </section>
  );
}
