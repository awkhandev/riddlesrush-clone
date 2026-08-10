import Image from "next/image";
import Link from "next/link";

const screenshots = [
  "/images/screenshots/screenshot-1.jpeg",
  "/images/screenshots/screenshot-2.jpeg",
  "/images/screenshots/screenshot-3.jpeg",
  "/images/screenshots/screenshot-4.jpeg",
];

export function AppDownloadSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="p-8 text-gray-700">
          <div className="download-app text-lg">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-[#7736FE] sm:text-center">
              Download the Riddles Mobile App
            </h2>
            <p className="hidden sm:block text-gray-600 text-xl sm:text-2xl sm:text-center">
              Take your riddles on the go! Solve fun, challenging riddles
              anywhere with our mobile app.
            </p>
            <p className="sm:hidden text-gray-600 text-lg">
              Take your riddles on the go!
            </p>
          </div>

          {/* Screenshot Carousel */}
          <div className="relative mt-8 overflow-hidden rounded-2xl z-20">
            <div className="flex gap-4 animate-scroll-screenshots">
              {[...screenshots, ...screenshots].map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[200px] sm:w-[250px] md:w-[280px]"
                >
                  <Image
                    src={src}
                    alt={`App screenshot ${(i % 4) + 1}`}
                    width={280}
                    height={560}
                    className="rounded-xl shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Download buttons */}
          <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4">
            <span className="inline-flex items-center justify-center gap-2 bg-gray-400 text-white rounded-lg px-6 py-3 text-base font-medium cursor-not-allowed">
              iOS - Coming Soon!
            </span>
            <span className="inline-flex items-center justify-center gap-2 bg-gray-400 text-white rounded-lg px-6 py-3 text-base font-medium cursor-not-allowed">
              Android - Coming Soon!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
