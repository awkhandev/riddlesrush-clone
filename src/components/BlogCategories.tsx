import Link from "next/link";
import { TeddyBearIcon, BrainIcon, PartyIcon, PuzzleIcon, FamilyIcon, TreeIcon, PizzaIcon, SoccerIcon } from "./icons";

const categories = [
  {
    title: "Kids Riddles",
    emoji: <TeddyBearIcon />,
    description: "Fun and easy riddles perfect for children ages 5-12.",
    href: "/blog/category/kids-riddles",
  },
  {
    title: "Adult Riddles",
    emoji: <BrainIcon />,
    description: "Challenging brain teasers and logic puzzles designed to test your critical thinking.",
    href: "/blog/category/adult-riddles",
  },
  {
    title: "Holiday Riddles",
    emoji: <PartyIcon />,
    description: "Seasonal riddles for Christmas, Halloween, Easter, Thanksgiving, and more.",
    href: "/blog/category/holiday-riddles",
  },
  {
    title: "What Am I Riddles",
    emoji: <PuzzleIcon />,
    description: "Classic 'What Am I?' riddles that challenge you to guess the object.",
    href: "/blog/category/what-am-i-riddles",
  },
  {
    title: "Family Riddles",
    emoji: <FamilyIcon />,
    description: "Perfect riddles for family game nights, road trips, and quality time together.",
    href: "/blog/category/family-riddles",
  },
  {
    title: "Nature Riddles",
    emoji: <TreeIcon />,
    description: "Outdoor-themed riddles about animals, weather, plants, and the natural world.",
    href: "/blog/category/nature-riddles",
  },
  {
    title: "Food Riddles",
    emoji: <PizzaIcon />,
    description: "Delicious riddles about food, cooking, and everything culinary.",
    href: "/blog/category/food-riddles",
  },
  {
    title: "Sports Riddles",
    emoji: <SoccerIcon />,
    description: "Athletic riddles covering baseball, basketball, soccer, and other popular sports.",
    href: "/blog/category/sports-riddles",
  },
];

export function BlogCategories() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-y border-gray-100">
      <div className="w-full max-w-5xl sm:max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center">
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-gray-500 mb-3">
            Articles
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 text-[#7736FE]">
            Riddle articles and collections
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto">
            Topic pages and blog posts, great for reading and sharing.
          </p>
        </div>

        <div className="grid gap-5 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="block p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.01] hover:border-purple-200 bg-gray-50/80 group min-h-[120px]"
            >
              <div className="text-center">
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                  {category.emoji}
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800 group-hover:text-[#7736FE] transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-base sm:text-lg line-clamp-3">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
