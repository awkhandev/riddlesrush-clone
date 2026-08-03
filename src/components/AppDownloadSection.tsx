import Image from "next/image";
import Link from "next/link";

const screenshots = [
  "/images/screenshots/screenshot-1.png",
  "/images/screenshots/screenshot-2.png",
  "/images/screenshots/screenshot-3.png",
  "/images/screenshots/screenshot-4.png",
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
            <Link
              href="https://apps.apple.com/be/app/riddles-train-your-brain/id6447545144"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-black text-white rounded-lg px-6 py-3 text-base font-medium hover:bg-gray-900 transition-colors"
            >
              <svg viewBox="0 0 384 512" width="20" height="20" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              iOS App
            </Link>
            <span className="inline-flex items-center justify-center gap-2 bg-gray-400 text-white rounded-lg px-6 py-3 text-base font-medium cursor-not-allowed">
              Android - Coming Soon!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
