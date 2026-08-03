import Link from "next/link";
import { ArrowRightIcon, BrainIcon, ZapIcon, LinkIcon, TeddyBearIcon } from "./icons";

const categories = [
  {
    title: "Tricky riddles",
    emoji: <BrainIcon />,
    description:
      "Misdirection and classic trap wording, with answers on every page.",
    href: "/riddles/tricky-riddles",
  },
  {
    title: "Short riddles",
    emoji: <ZapIcon />,
    description:
      "Quick questions you can read in one glance, ideal for warm-ups.",
    href: "/riddles/short-riddles",
  },
  {
    title: "Logic riddles",
    emoji: <LinkIcon />,
    description:
      "Multi-step reasoning, counting, and careful reading.",
    href: "/riddles/logic-riddles",
  },
  {
    title: "Kids riddles",
    emoji: <TeddyBearIcon />,
    description:
      "Family-friendly puzzles from our kids category hub.",
    href: "/riddles/kids",
  },
];

export function BrowseByType() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-y border-gray-100">
      <div className="w-full max-w-5xl sm:max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center">
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-gray-500 mb-3">
            Categories
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 sm:mb-6 text-[#7736FE]">
            Browse riddles by type
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto">
            Our main riddle index lives on dedicated hub pages, grouped by how
            riddles play out (tricky, short, logic, kids, and more).
          </p>
        </div>

        <div className="grid gap-5 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative flex flex-col bg-white border-2 border-gray-200 shadow-sm hover:shadow-xl rounded-2xl p-6 justify-between h-full transition-all duration-300 hover:border-purple-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-center mb-6 min-h-[120px]">
                <div className="text-7xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {category.emoji}
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1 space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#7736FE] transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed line-clamp-3">
                  {category.description}
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <span className="flex items-center text-[#7736FE] font-medium group-hover:text-purple-700 transition-colors">
                    <span className="mr-2">Explore</span>
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
