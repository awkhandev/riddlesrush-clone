import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/* ------------------------------------------------------------------ */
/*  Category data                                                      */
/* ------------------------------------------------------------------ */

interface Category {
  name: string;
  slug: string;
  emoji: string;
  description: string;
  color: string;
  count: number;
}

const categories: Category[] = [
  {
    name: "Kids Riddles",
    slug: "kids-riddles",
    emoji: "🧸",
    description: "Fun and easy riddles perfect for children ages 5-12.",
    color: "blue",
    count: 45,
  },
  {
    name: "Adult Riddles",
    slug: "adult-riddles",
    emoji: "🧠",
    description: "Challenging brain teasers and logic puzzles.",
    color: "purple",
    count: 38,
  },
  {
    name: "Holiday Riddles",
    slug: "holiday-riddles",
    emoji: "🎉",
    description:
      "Seasonal riddles for Christmas, Halloween, Easter, Thanksgiving.",
    color: "green",
    count: 52,
  },
  {
    name: "What Am I Riddles",
    slug: "what-am-i-riddles",
    emoji: "🧩",
    description:
      "Classic 'What Am I?' riddles that challenge you to guess the object.",
    color: "orange",
    count: 35,
  },
  {
    name: "Family Riddles",
    slug: "family-riddles",
    emoji: "👨‍👩‍👧‍👦",
    description:
      "Perfect riddles for family game nights and road trips.",
    color: "pink",
    count: 41,
  },
  {
    name: "Nature Riddles",
    slug: "nature-riddles",
    emoji: "🌲",
    description:
      "Outdoor-themed riddles about animals, weather, and plants.",
    color: "green",
    count: 28,
  },
  {
    name: "Food Riddles",
    slug: "food-riddles",
    emoji: "🍕",
    description:
      "Delicious riddles about food, cooking, and everything culinary.",
    color: "red",
    count: 31,
  },
  {
    name: "Sports Riddles",
    slug: "sports-riddles",
    emoji: "⚽",
    description:
      "Athletic riddles covering baseball, basketball, soccer.",
    color: "yellow",
    count: 25,
  },
];

const colorMap: Record<string, { bg: string; border: string; pill: string; pillActive: string }> = {
  blue: {
    bg: "bg-blue-100",
    border: "border-blue-200",
    pill: "bg-blue-50 text-blue-700 hover:bg-blue-100",
    pillActive: "bg-blue-600 text-white",
  },
  purple: {
    bg: "bg-purple-100",
    border: "border-purple-200",
    pill: "bg-purple-50 text-purple-700 hover:bg-purple-100",
    pillActive: "bg-purple-600 text-white",
  },
  green: {
    bg: "bg-green-100",
    border: "border-green-200",
    pill: "bg-green-50 text-green-700 hover:bg-green-100",
    pillActive: "bg-green-600 text-white",
  },
  orange: {
    bg: "bg-orange-100",
    border: "border-orange-200",
    pill: "bg-orange-50 text-orange-700 hover:bg-orange-100",
    pillActive: "bg-orange-600 text-white",
  },
  pink: {
    bg: "bg-pink-100",
    border: "border-pink-200",
    pill: "bg-pink-50 text-pink-700 hover:bg-pink-100",
    pillActive: "bg-pink-600 text-white",
  },
  red: {
    bg: "bg-red-100",
    border: "border-red-200",
    pill: "bg-red-50 text-red-700 hover:bg-red-100",
    pillActive: "bg-red-600 text-white",
  },
  yellow: {
    bg: "bg-yellow-100",
    border: "border-yellow-200",
    pill: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
    pillActive: "bg-yellow-600 text-white",
  },
};

/* ------------------------------------------------------------------ */
/*  Blog post data per category                                        */
/* ------------------------------------------------------------------ */

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  readTime: string;
}

const postsByCategory: Record<string, BlogPost[]> = {
  "kids-riddles": [
    { title: "25 Easy Riddles for Kids That Will Make Them Smile", slug: "easy-riddles-for-kids", excerpt: "Giggle-worthy riddles perfect for young minds just starting their riddle journey.", readTime: "5 min read" },
    { title: "Animal Riddles for Kids: Guess the Creature!", slug: "animal-riddles-for-kids", excerpt: "From furry friends to wild creatures, these animal riddles will have kids guessing in no time.", readTime: "4 min read" },
    { title: "Funny School Riddles Kids Will Love", slug: "funny-school-riddles", excerpt: "Back-to-school fun with riddles about classrooms, teachers, and homework.", readTime: "3 min read" },
    { title: "Math Riddles for Kids: Learn While You Laugh", slug: "math-riddles-for-kids", excerpt: "Numbers, equations, and brain teasers that make math fun for young learners.", readTime: "6 min read" },
    { title: "Bedtime Riddles for Kids: Wind Down with a Laugh", slug: "bedtime-riddles-for-kids", excerpt: "Gentle, fun riddles perfect for reading together before bedtime.", readTime: "4 min read" },
    { title: "Dinosaur Riddles for Little Paleontologists", slug: "dinosaur-riddles-for-kids", excerpt: "Roar through these prehistoric riddles that every dino-loving kid will enjoy.", readTime: "5 min read" },
  ],
  "adult-riddles": [
    { title: "50 Hard Riddles That Will Stump Even the Sharpest Minds", slug: "hard-riddles-for-adults", excerpt: "Challenge yourself with these fiendishly difficult brain teasers.", readTime: "8 min read" },
    { title: "Logic Riddles for Critical Thinkers", slug: "logic-riddles-for-adults", excerpt: "Step-by-step reasoning puzzles that test your deductive abilities.", readTime: "7 min read" },
    { title: "Dark Riddles with a Twist Ending", slug: "dark-riddles-with-twists", excerpt: "These riddles start innocent and end with a mind-bending twist.", readTime: "6 min read" },
    { title: "Science Riddles for the Curious Adult", slug: "science-riddles-for-adults", excerpt: "Physics, chemistry, and biology brain teasers for science lovers.", readTime: "5 min read" },
    { title: "Philosophy Riddles That Make You Think Twice", slug: "philosophy-riddles", excerpt: "Deep questions wrapped in clever riddles about life and existence.", readTime: "7 min read" },
    { title: "Tricky Wordplay Riddles for Adults", slug: "tricky-wordplay-riddles", excerpt: "Double meanings, puns, and linguistic traps that will fool everyone.", readTime: "5 min read" },
  ],
  "holiday-riddles": [
    { title: "Christmas Riddles for Your Holiday Gathering", slug: "christmas-riddles", excerpt: "Jolly riddles about Santa, reindeer, and holiday cheer for the whole family.", readTime: "5 min read" },
    { title: "Halloween Riddles: Spooky Fun for All Ages", slug: "halloween-riddles", excerpt: "Ghostly giggles and pumpkin puzzles perfect for Halloween parties.", readTime: "4 min read" },
    { title: "Easter Riddles to Solve on Egg Hunts", slug: "easter-riddles", excerpt: "Hop into these egg-citing riddles that pair perfectly with Easter celebrations.", readTime: "4 min read" },
    { title: "Thanksgiving Riddles to Share Over Dinner", slug: "thanksgiving-riddles", excerpt: "Gratitude-themed riddles that will spark conversation at the dinner table.", readTime: "5 min read" },
    { title: "New Year Riddles to Ring In the Holiday", slug: "new-year-riddles", excerpt: "Celebrate with riddles about resolutions, fireworks, and fresh starts.", readTime: "3 min read" },
    { title: "Valentine's Day Riddles for Your Sweetheart", slug: "valentines-day-riddles", excerpt: "Romantic and funny love riddles to share with someone special.", readTime: "4 min read" },
  ],
  "what-am-i-riddles": [
    { title: "100 What Am I Riddles with Answers", slug: "what-am-i-riddles-with-answers", excerpt: "The ultimate collection of classic 'What Am I?' riddles for hours of fun.", readTime: "10 min read" },
    { title: "Tricky What Am I Riddles You Won't Guess", slug: "tricky-what-am-i-riddles", excerpt: "These deceptive riddles will have even seasoned puzzlers stumped.", readTime: "6 min read" },
    { title: "Everyday Object Riddles: What Am I?", slug: "everyday-object-riddles", excerpt: "Guess common household items from these cleverly worded clues.", readTime: "5 min read" },
    { title: "Nature-Themed What Am I Riddles", slug: "nature-what-am-i-riddles", excerpt: "Animals, weather, and plants hiding in plain sight within these riddles.", readTime: "4 min read" },
    { title: "Food-Themed What Am I Riddles", slug: "food-what-am-i-riddles", excerpt: "Deliciously tricky riddles about fruits, vegetables, and dishes.", readTime: "5 min read" },
    { title: "Hard What Am I Riddles for Puzzle Pros", slug: "hard-what-am-i-riddles", excerpt: "Expert-level riddles that require creative thinking to crack.", readTime: "7 min read" },
  ],
  "family-riddles": [
    { title: "Family Game Night Riddles Everyone Will Enjoy", slug: "family-game-night-riddles", excerpt: "The perfect riddle collection for your next family game night.", readTime: "5 min read" },
    { title: "Road Trip Riddles to Keep Everyone Entertained", slug: "road-trip-riddles", excerpt: "Beat boredom on long drives with these fun family-friendly riddles.", readTime: "4 min read" },
    { title: "Multi-Generational Riddles for All Ages", slug: "multi-generational-riddles", excerpt: "Riddles that grandparents, parents, and kids can all solve together.", readTime: "6 min read" },
    { title: "Dinner Table Riddles to Start Conversations", slug: "dinner-table-riddles", excerpt: "Spark laughter and discussion with riddles perfect for mealtime.", readTime: "4 min read" },
    { title: "Holiday Family Riddle Challenge", slug: "holiday-family-riddle-challenge", excerpt: "Turn your next holiday gathering into a riddle competition.", readTime: "5 min read" },
    { title: "Parent-Child Riddle Pairs to Solve Together", slug: "parent-child-riddle-pairs", excerpt: "Bond with your kids through these riddle pairs designed for teamwork.", readTime: "5 min read" },
  ],
  "nature-riddles": [
    { title: "Animal Riddles: Test Your Wildlife Knowledge", slug: "animal-riddles", excerpt: "From the savanna to the ocean, guess the animals in these nature riddles.", readTime: "6 min read" },
    { title: "Weather Riddles for Storm Chasers", slug: "weather-riddles", excerpt: "Rain, snow, wind, and thunder — can you guess the weather phenomena?", readTime: "4 min read" },
    { title: "Plant and Tree Riddles for Nature Lovers", slug: "plant-and-tree-riddles", excerpt: "Flowers, forests, and foliage hiding in these botanical brain teasers.", readTime: "5 min read" },
    { title: "Ocean Riddles: Dive Into the Deep Blue", slug: "ocean-riddles", excerpt: "Marine life and sea mysteries wrapped in clever riddle form.", readTime: "5 min read" },
    { title: "Space and Astronomy Riddles", slug: "space-riddles", excerpt: "Journey through the cosmos with riddles about stars, planets, and galaxies.", readTime: "6 min read" },
    { title: "Seasonal Nature Riddles for Every Time of Year", slug: "seasonal-nature-riddles", excerpt: "Spring blooms, summer heat, fall leaves, and winter frost in riddle form.", readTime: "4 min read" },
  ],
  "food-riddles": [
    { title: "Fruit and Vegetable Riddles for Foodies", slug: "fruit-and-vegetable-riddles", excerpt: "Can you guess these healthy snacks from the clever clues?", readTime: "4 min read" },
    { title: "Dessert Riddles That Are Sweet and Tricky", slug: "dessert-riddles", excerpt: "Cakes, cookies, and ice cream — how well do you know your sweets?", readTime: "5 min read" },
    { title: "Cooking Riddles for Kitchen Enthusiasts", slug: "cooking-riddles", excerpt: "From chopping to baking, these riddles celebrate the art of cooking.", readTime: "4 min read" },
    { title: "Fast Food Riddles for Quick Thinkers", slug: "fast-food-riddles", excerpt: "Burgers, fries, and shakes — guess the popular fast food items.", readTime: "3 min read" },
    { title: "International Food Riddles: A World Tour", slug: "international-food-riddles", excerpt: "Travel the globe through riddles about cuisines from every continent.", readTime: "6 min read" },
    { title: "Drink Riddles: Sip on These Brain Teasers", slug: "drink-riddles", excerpt: "Coffee, tea, smoothies, and cocktails — can you guess the drink?", readTime: "4 min read" },
  ],
  "sports-riddles": [
    { title: "Basketball Riddles for Court Lovers", slug: "basketball-riddles", excerpt: "Dribble through these hoops-themed brain teasers and test your NBA knowledge.", readTime: "5 min read" },
    { title: "Soccer Riddles for Football Fans", slug: "soccer-riddles", excerpt: "Goals, penalties, and legendary players — how well do you know the beautiful game?", readTime: "5 min read" },
    { title: "Baseball Riddles for Diamond Lovers", slug: "baseball-riddles", excerpt: "Strike, ball, home run — swing through these baseball brain teasers.", readTime: "4 min read" },
    { title: "Olympic Riddles for Sports Enthusiasts", slug: "olympic-riddles", excerpt: "Test your knowledge of Olympic sports, records, and history.", readTime: "6 min read" },
    { title: "Water Sport Riddles to Dive Into", slug: "water-sport-riddles", excerpt: "Swimming, surfing, and diving riddles for aquatic sports fans.", readTime: "4 min read" },
    { title: "Extreme Sports Riddles for Thrill Seekers", slug: "extreme-sport-riddles", excerpt: "Skateboarding, snowboarding, and skydiving riddles for adrenaline junkies.", readTime: "5 min read" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Static params                                                      */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    return { title: "Category Not Found | Riddles Rush" };
  }
  return {
    title: `${category.name} | Riddles Rush`,
    description: category.description,
  };
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen flex-col items-center">
          <div className="container max-w-7xl py-8 lg:py-20 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Category Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn&apos;t find the category you&apos;re looking for.
            </p>
            <Link
              href="/blog/category"
              className="inline-flex items-center text-[#7736FE] font-medium hover:underline"
            >
              Browse all categories
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const colors = colorMap[category.color] || colorMap.purple;
  const posts = postsByCategory[category.slug] || [];

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        <div className="flex flex-col w-full">
          {/* Breadcrumbs */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <nav className="flex items-center gap-1.5 text-sm text-gray-500">
              <Link
                href="/"
                className="hover:text-[#7736FE] transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog/category"
                className="hover:text-[#7736FE] transition-colors"
              >
                Categories
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{category.name}</span>
            </nav>
          </div>

          {/* Category Header */}
          <section className="py-8 sm:py-12 lg:py-16 bg-white border-b border-gray-100">
            <div className="w-full max-w-5xl sm:max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                <div
                  className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 ${colors.bg} ${colors.border}`}
                >
                  <span className="text-5xl">{category.emoji}</span>
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                    {category.name}
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 mb-4 max-w-2xl">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                    {category.count} Collections
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Category Filter Pills */}
          <section className="py-4 bg-white border-b border-gray-100">
            <div className="w-full max-w-5xl sm:max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isActive = cat.slug === slug;
                  const catColors =
                    colorMap[cat.color] || colorMap.purple;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/blog/category/${cat.slug}`}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? catColors.pillActive
                          : `${catColors.pill} border border-transparent`
                      }`}
                    >
                      <span>{cat.emoji}</span>
                      {cat.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
            <div className="w-full max-w-5xl sm:max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
              <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white border-2 border-gray-200 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-purple-300 hover:-translate-y-1"
                  >
                    {/* Card Image Placeholder */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-purple-50 to-gray-100">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl opacity-30">
                          {category.emoji}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col p-5 sm:p-6 text-left flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.border} border`}
                        >
                          {category.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-[#7736FE] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="pt-4 mt-4 border-t border-gray-100">
                        <span className="flex items-center text-[#7736FE] font-medium text-sm group-hover:text-purple-700 transition-colors">
                          Read collection
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-1.5 group-hover:translate-x-1 transition-transform"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 sm:py-16 lg:py-20 bg-white border-y border-gray-100">
            <div className="w-full max-w-5xl sm:max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Enjoyed these {category.name.toLowerCase()}?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Explore more riddle collections or try today&apos;s featured
                riddle for your daily brain workout.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/blog/category"
                  className="inline-flex items-center justify-center bg-[#7736FE] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6a2ee6] transition-colors"
                >
                  Browse all categories
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/riddle-of-the-day"
                  className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Today&apos;s Featured Riddle
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
