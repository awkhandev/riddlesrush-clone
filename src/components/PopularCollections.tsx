import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "./icons";

const collections = [
  {
    title: "Summer Riddles with Answers",
    image: "/images/collections/summer-riddles.png",
    href: "/blog/summer-riddles-with-answers",
  },
  {
    title: "Couples Riddles to Solve Together",
    image: "/images/collections/couples-riddles.png",
    href: "/blog/riddles-for-couples",
  },
  {
    title: "Campfire Riddles for Cozy Nights",
    image: "/images/collections/campfire-riddles.png",
    href: "/blog/campfire-riddles",
  },
  {
    title: "Riddles for Car Rides",
    image: "/images/collections/car-rides-riddles.png",
    href: "/blog/riddles-for-car-rides",
  },
  {
    title: "Hard Brain Teasers for Adults",
    image: "/images/collections/hard-brain-teasers.png",
    href: "/blog/hard-brain-teasers-for-adults",
  },
  {
    title: "4th of July Riddles with Answers",
    image: "/images/collections/4th-of-july-riddles.png",
    href: "/blog/4th-of-july-riddles",
  },
];

export function PopularCollections() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-y border-gray-100">
      <div className="w-full max-w-5xl sm:max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center">
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-gray-500 mb-3">
            Featured
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 sm:mb-6 text-[#7736FE]">
            Popular Riddle Collections
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto">
            Jump into themed riddles for road trips, date nights, campfires,
            summer days, and more.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.title}
              href={collection.href}
              className="group flex flex-col bg-white border-2 border-gray-200 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden h-full hover:border-purple-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7736FE]"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-gradient-to-b from-purple-50/70 to-gray-50">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-contain p-2 sm:p-3"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-col p-4 sm:p-5 text-left">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight group-hover:text-[#7736FE]">
                  {collection.title}
                </h3>
                <span className="inline-flex items-center text-[#7736FE] font-medium text-sm sm:text-base mt-2 group-hover:text-purple-700">
                  Explore
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
