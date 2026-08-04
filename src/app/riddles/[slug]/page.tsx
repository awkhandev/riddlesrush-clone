import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RiddleReveal } from "@/components/RiddleReveal";

// ─── Route Data ───────────────────────────────────────────────────────────────

const riddleTypes = [
  {
    slug: "tricky-riddles",
    emoji: "🧠",
    title: "Tricky Riddles",
    description:
      "Mind-bending riddles that will make you question everything you thought you knew.",
  },
  {
    slug: "short-riddles",
    emoji: "⚡",
    title: "Short Riddles",
    description:
      "Quick and clever riddles you can solve in seconds — perfect for a brain break.",
  },
  {
    slug: "logic-riddles",
    emoji: "🔗",
    title: "Logic Riddles",
    description:
      "Riddles that test your reasoning and logical thinking skills.",
  },
  {
    slug: "hard-riddles",
    emoji: "🔥",
    title: "Hard Riddles",
    description:
      "Only the sharpest minds can crack these challenging brain teasers.",
  },
  {
    slug: "riddles-with-answers",
    emoji: "💡",
    title: "Riddles with Answers",
    description:
      "Classic riddles complete with satisfying answers — learn and share.",
  },
  {
    slug: "kids",
    emoji: "🦿",
    title: "Kids Riddles",
    description:
      "Fun and easy riddles that children will love to solve and share with friends.",
  },
  {
    slug: "nature",
    emoji: "🍂",
    title: "Nature Riddles",
    description:
      "Explore the wonders of the natural world through these earthy brain teasers.",
  },
  {
    slug: "food",
    emoji: "🍕",
    title: "Food Riddles",
    description:
      "Deliciously tricky riddles about everything edible — can you guess them all?",
  },
  {
    slug: "family",
    emoji: "👨‍👩‍👧‍👦",
    title: "Family Riddles",
    description:
      "Heartwarming riddles about family life, relationships, and togetherness.",
  },
  {
    slug: "holidays",
    emoji: "🎉",
    title: "Holiday Riddles",
    description:
      "Festive riddles to celebrate every holiday and special occasion.",
  },
  {
    slug: "what-am-i",
    emoji: "❓",
    title: "What Am I Riddles",
    description:
      "Classic guessing games — figure out what’s being described before the answer is revealed.",
  },
  {
    slug: "sports",
    emoji: "⚽",
    title: "Sports Riddles",
    description:
      "Riddles for sports fans — test your knowledge of games, athletes, and more.",
  },
] as const;

type RiddleTypeSlug = (typeof riddleTypes)[number]["slug"];

// ─── Riddle Data ──────────────────────────────────────────────────────────────

interface Riddle {
  question: string;
  answer: string;
  slug: string;
}

const allRiddles: Record<RiddleTypeSlug, Riddle[]> = {
  "tricky-riddles": [
    {
      question:
        "Brothers and sisters, I have none. But that man’s father is my father’s son. Who is the man in the photograph?",
      answer: "My son",
      slug: "brothers-and-sisters-i-have-none",
    },
    {
      question:
        "A man left home running. He turned left three times and found two masked men waiting for him. Who were they?",
      answer:
        "The batter and the catcher in a baseball game",
      slug: "man-left-home-running",
    },
    {
      question:
        "A boy is walking with a doctor. The doctor is not the boy’s father. Then who is the doctor?",
      answer: "The boy’s mother",
      slug: "boy-walking-with-doctor",
    },
    {
      question:
        "A man was condemned to death. He could choose between three rooms: one with a raging fire, one with armed assassins, and one with starving lions. Which should he choose?",
      answer:
        "The room with the starving lions — they’re already dead",
      slug: "man-condemned-to-death",
    },
    {
      question:
        "A woman shot her husband, then held him underwater for 5 minutes, and then hung him. But 5 minutes later, they went out to enjoy a nice dinner together. How?",
      answer:
        "She took a photo of him (shot with a camera, developed in water, hung to dry)",
      slug: "woman-shot-her-husband",
    },
    {
      question: "What has keys but no locks?",
      answer: "A keyboard",
      slug: "keys-but-no-locks",
    },
    {
      question:
        "What can travel around the world while staying in a corner?",
      answer: "A stamp",
      slug: "travel-around-the-world",
    },
    {
      question: "What gets wetter the more it dries?",
      answer: "A towel",
      slug: "gets-wetter-the-more-it-dries",
    },
  ],

  "short-riddles": [
    {
      question: "What has hands but can’t clap?",
      answer: "A clock",
      slug: "hands-but-cant-clap",
    },
    {
      question: "What has a neck but no head?",
      answer: "A bottle",
      slug: "neck-but-no-head",
    },
    {
      question: "What gets smaller the more you put in it?",
      answer: "A hole",
      slug: "gets-smaller-the-more-you-put-in-it",
    },
    {
      question: "What can you break without touching it?",
      answer: "A promise",
      slug: "break-without-touching",
    },
    {
      question: "What has one eye but cannot see?",
      answer: "A needle",
      slug: "one-eye-but-cannot-see",
    },
    {
      question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
      answer: "The letter ‘M’",
      slug: "once-in-a-minute",
    },
    {
      question: "What word is always spelled incorrectly?",
      answer: "Incorrectly",
      slug: "always-spelled-incorrectly",
    },
    {
      question: "What can’t talk but will reply when spoken to?",
      answer: "An echo",
      slug: "cant-talk-but-will-reply",
    },
  ],

  "logic-riddles": [
    {
      question:
        "A man is found dead in a room with 53 bicycles. How did he die?",
      answer:
        "He was cheating at cards — ‘bicycles’ is a deck of cards (Bicycle brand)",
      slug: "man-found-dead-53-bicycles",
    },
    {
      question:
        "You see a boat filled with people. It has not sunk, but when you look again you don’t see a single person on the boat. Why?",
      answer: "All the people on the boat are married (not single)",
      slug: "boat-filled-with-people",
    },
    {
      question:
        "The day before yesterday, Chris was 7 years old. Next year, he’ll turn 10. How?",
      answer:
        "Today is January 1st — Chris’s birthday is December 31st",
      slug: "chris-turning-ten",
    },
    {
      question:
        "A clerk at a butcher shop is 5’10”. What does he weigh?",
      answer: "Meat",
      slug: "clerk-at-butcher-shop",
    },
    {
      question:
        "How many times can you subtract 5 from 25?",
      answer: "Only once — after that it’s 20, not 25",
      slug: "subtract-five-from-twenty-five",
    },
    {
      question:
        "Before Mt. Everest was discovered, what was the tallest mountain on Earth?",
      answer: "Mt. Everest — it was always the tallest, even before discovery",
      slug: "tallest-mountain-before-discovery",
    },
    {
      question:
        "A farmer has 17 sheep. All but 9 die. How many sheep does he have left?",
      answer: "9 sheep",
      slug: "farmer-seventeen-sheep",
    },
    {
      question:
        "What do you call a dog that does magic?",
      answer: "A Labracadabrador",
      slug: "dog-that-does-magic",
    },
  ],

  "hard-riddles": [
    {
      question:
        "A man has to get a fox, a chicken, and a sack of corn across a river. He can only take one at a time. The fox and chicken can’t be left alone, and the chicken and corn can’t be left alone. How does he do it?",
      answer:
        "Take the chicken first, return for the fox, bring the chicken back, take the corn, return for the chicken",
      slug: "fox-chicken-corn-river",
    },
    {
      question:
        "There are three light switches in a room, each controlling one of three light bulbs in the next room. You can only enter the next room once. How do you figure out which switch controls which bulb?",
      answer:
        "Turn on switch 1 and 2 for 10 minutes. Turn off switch 2. Enter — the hot bulb is switch 1, the warm one is switch 2, the cold one is switch 3",
      slug: "three-light-switches",
    },
    {
      question:
        "I am taken from a mine, and shut up in a wooden case, from which I am never released, and yet I am used by almost every person. What am I?",
      answer: "Pencil lead (graphite)",
      slug: "taken-from-a-mine",
    },
    {
      question:
        "You have two ropes. Each takes exactly 1 hour to burn completely, but they burn at non-uniform rates. How do you measure exactly 45 minutes?",
      answer:
        "Light rope 1 at both ends and rope 2 at one end. When rope 1 is done (30 min), light the other end of rope 2. It finishes in 15 more minutes.",
      slug: "two-ropes-forty-five-minutes",
    },
    {
      question:
        "A window cleaner is cleaning a window on the 25th floor. He slips and falls, but doesn’t get hurt. How?",
      answer: "He was cleaning the inside of the window",
      slug: "window-cleaner-falls",
    },
    {
      question:
        "What English word has three consecutive double letters?",
      answer: "Bookkeeper",
      slug: "three-consecutive-double-letters",
    },
    {
      question:
        "A man is looking at a portrait. Someone asks, “Whose picture are you looking at?” He replies: “Brothers and sisters I have none, but that man’s father is my father’s son.” Who is in the portrait?",
      answer: "His son",
      slug: "portrait-father-son",
    },
    {
      question:
        "What number, when multiplied by itself, gives a result that is 123456789 less than when it is multiplied by itself plus one?",
      answer: "11111",
      slug: "number-multiplied-itself",
    },
  ],

  "riddles-with-answers": [
    {
      question:
        "What has a head and a tail but no body?",
      answer: "A coin",
      slug: "head-and-tail-no-body",
    },
    {
      question: "What can you catch but not throw?",
      answer: "A cold",
      slug: "catch-but-not-throw",
    },
    {
      question: "What has many teeth but cannot bite?",
      answer: "A comb",
      slug: "many-teeth-cannot-bite",
    },
    {
      question: "What gets bigger the more you take away?",
      answer: "A hole",
      slug: "bigger-the-more-you-take-away",
    },
    {
      question: "What goes up but never comes down?",
      answer: "Your age",
      slug: "goes-up-never-comes-down",
    },
    {
      question: "What has a face and two hands but no arms or legs?",
      answer: "A clock",
      slug: "face-and-two-hands",
    },
    {
      question: "What invention lets you look right through a wall?",
      answer: "A window",
      slug: "invention-look-through-wall",
    },
    {
      question: "What can fill a room but takes up no space?",
      answer: "Light",
      slug: "fills-room-no-space",
    },
  ],

  kids: [
    {
      question: "What has to be broken before you can use it?",
      answer: "An egg",
      slug: "has-to-be-broken",
    },
    {
      question:
        "I fly all day but I never fly. What am I?",
      answer: "A flag",
      slug: "fly-all-day-but-never-fly",
    },
    {
      question:
        "What can you hold in your right hand but never in your left?",
      answer: "Your left elbow",
      slug: "hold-right-hand-not-left",
    },
    {
      question:
        "I have lakes but no water, mountains but no stone. What am I?",
      answer: "A map",
      slug: "lakes-no-water-mountains-no-stone",
    },
    {
      question:
        "What word in the English language does the following: the first two letters signify a male, the first three letters signify a female, the first four letters signify a great, while the entire word signifies a great woman?",
      answer: "Heroine",
      slug: "english-language-great-woman",
    },
    {
      question: "What can you drop without breaking?",
      answer: "A hint",
      slug: "drop-without-breaking",
    },
    {
      question:
        "What comes down but never goes up?",
      answer: "Rain",
      slug: "comes-down-never-goes-up",
    },
    {
      question: "What has legs but doesn’t walk?",
      answer: "A table",
      slug: "has-legs-but-doesnt-walk",
    },
  ],

  nature: [
    {
      question:
        "I can fill a room but I take up no space at all. What am I?",
      answer: "Light",
      slug: "fill-room-no-space",
    },
    {
      question:
        "What falls but never breaks, and what breaks but never falls?",
      answer: "Night falls, day breaks",
      slug: "falls-but-never-breaks",
    },
    {
      question:
        "I’m light as a feather, yet the strongest person can’t hold me for more than 5 minutes. What am I?",
      answer: "Breath",
      slug: "light-as-a-feather",
    },
    {
      question: "What is always in front of you but can’t be seen?",
      answer: "The future",
      slug: "always-in-front-but-cant-be-seen",
    },
    {
      question:
        "I come from mines and get employed in wood. What am I?",
      answer: "Pencil lead (graphite)",
      slug: "comes-from-mines",
    },
    {
      question:
        "What builds castles, erodes mountains, and tames the fiercest beast?",
      answer: "Water",
      slug: "builds-castles-erodes-mountains",
    },
    {
      question:
        "What do the leaves of a tree do when the wind blows?",
      answer: "They rustle / whisper",
      slug: "leaves-when-wind-blows",
    },
    {
      question:
        "I’m the part of the bird that’s not in the sky. I can swim in the ocean and yet remain dry. What am I?",
      answer: "A reflection",
      slug: "part-of-bird-not-in-sky",
    },
  ],

  food: [
    {
      question: "What has a lot of eyes but cannot see?",
      answer: "A potato",
      slug: "lots-of-eyes-cannot-see",
    },
    {
      question: "What kind of cup doesn’t hold water?",
      answer: "A cupcake",
      slug: "cup-that-doesnt-hold-water",
    },
    {
      question: "What goes up and down but doesn’t move?",
      answer: "A staircase (or temperature)",
      slug: "goes-up-and-down-doesnt-move",
    },
    {
      question: "What is orange and sounds like a parrot?",
      answer: "A carrot",
      slug: "orange-sounds-like-parrot",
    },
    {
      question: "What do you call a fake noodle?",
      answer: "An im-pasta",
      slug: "fake-noodle",
    },
    {
      question: "What did the grape say when it got stepped on?",
      answer: "Nothing, it just let out a little wine",
      slug: "grape-stepped-on",
    },
    {
      question: "What do you call a sad strawberry?",
      answer: "A blueberry",
      slug: "sad-strawberry",
    },
    {
      question: "What has a head, a tail, is brown, and has no legs?",
      answer: "A penny",
      slug: "head-tail-brown-no-legs",
    },
  ],

  family: [
    {
      question:
        "What is always in front of you but can’t be seen?",
      answer: "The future",
      slug: "always-in-front-cant-be-seen",
    },
    {
      question: "What do you call your dad’s father?",
      answer: "Grandpa",
      slug: "dads-father",
    },
    {
      question:
        "If you’re running a race and you pass the person in second place, what place are you in?",
      answer: "Second place",
      slug: "pass-person-in-second",
    },
    {
      question: "What is always coming but never arrives?",
      answer: "Tomorrow",
      slug: "always-coming-never-arrives",
    },
    {
      question:
        "How many birthdays does the average person have?",
      answer: "Just one — you’re born once",
      slug: "how-many-birthdays",
    },
    {
      question:
        "What is the difference between here and there?",
      answer: "The letter ‘T’",
      slug: "difference-here-and-there",
    },
    {
      question:
        "What question can you never answer ‘yes’ to?",
      answer: "Are you asleep yet?",
      slug: "never-answer-yes",
    },
    {
      question: "What is so fragile that saying its name breaks it?",
      answer: "Silence",
      slug: "fragile-naming-breaks-it",
    },
  ],

  holidays: [
    {
      question:
        "What do you call a Christmas tree that tells jokes?",
      answer: "A comedy fir",
      slug: "christmas-tree-jokes",
    },
    {
      question: "What falls in winter but never gets hurt?",
      answer: "Snow",
      slug: "falls-in-winter-never-gets-hurt",
    },
    {
      question:
        "What is a witch’s favorite class at school?",
      answer: "Spelling",
      slug: "witch-favorite-class",
    },
    {
      question:
        "What do elves learn in school?",
      answer: "The elf-abet",
      slug: "elves-learn-school",
    },
    {
      question:
        "What do ghosts use to wash their hair?",
      answer: "Sham-boo",
      slug: "ghosts-wash-hair",
    },
    {
      question:
        "What do you get when you cross a snowman with a vampire?",
      answer: "Frostbite",
      slug: "snowman-vampire",
    },
    {
      question:
        "Why was the snowman looking through the carrots?",
      answer: "He was picking his nose",
      slug: "snowman-looking-carrots",
    },
    {
      question:
        "What do snowmen eat for breakfast?",
      answer: "Frosted Flakes",
      slug: "snowmen-breakfast",
    },
  ],

  "what-am-i": [
    {
      question: "What has keys but no locks?",
      answer: "A keyboard",
      slug: "keys-but-no-locks",
    },
    {
      question:
        "I’m tall when I’m young, and short when I’m old. What am I?",
      answer: "A candle",
      slug: "tall-when-young-short-when-old",
    },
    {
      question: "What has a face and two hands but no arms or legs?",
      answer: "A clock",
      slug: "face-two-hands-no-arms",
    },
    {
      question:
        "What gets wetter the more it dries?",
      answer: "A towel",
      slug: "gets-wetter-the-more-it-dries",
    },
    {
      question:
        "I have cities but no houses, forests but no trees, and water but no fish. What am I?",
      answer: "A map",
      slug: "cities-no-houses",
    },
    {
      question:
        "I have branches but no fruit, trunk, or leaves. What am I?",
      answer: "A bank",
      slug: "branches-no-fruit",
    },
    {
      question:
        "What can’t talk but will reply when spoken to?",
      answer: "An echo",
      slug: "cant-talk-but-replies",
    },
    {
      question:
        "I can be cracked, I can be made. I can be told, I can be played. What am I?",
      answer: "A joke",
      slug: "can-be-cracked-made",
    },
  ],

  sports: [
    {
      question:
        "What sport has a ball, a bat, bases, and a diamond?",
      answer: "Baseball",
      slug: "ball-bat-bases-diamond",
    },
    {
      question:
        "I’m a sport with rackets, a net, and you can play singles or doubles. What am I?",
      answer: "Tennis",
      slug: "rackets-net-singles-doubles",
    },
    {
      question:
        "What has 11 players, a ball, and 90 minutes of play?",
      answer: "Soccer (football)",
      slug: "eleven-players-ninety-minutes",
    },
    {
      question:
        "I’m a winter sport with ice, stones, and sweeping. What am I?",
      answer: "Curling",
      slug: "winter-ice-stones-sweeping",
    },
    {
      question:
        "What sport uses a club, has 18 holes, and is played on grass?",
      answer: "Golf",
      slug: "club-eighteen-holes-grass",
    },
    {
      question:
        "I’m a sport where you throw a ball at pins. What am I?",
      answer: "Bowling",
      slug: "throw-ball-at-pins",
    },
    {
      question:
        "What sport has free throws, backboards, and dunks?",
      answer: "Basketball",
      slug: "free-throws-backboards-dunks",
    },
    {
      question:
        "I’m a water sport with lanes, a starting block, and goggles. What am I?",
      answer: "Swimming",
      slug: "water-lanes-starting-block",
    },
  ],
};

// ─── Derived helpers ──────────────────────────────────────────────────────────

function formatTypeName(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getRiddleTypeBySlug(slug: string) {
  return riddleTypes.find((t) => t.slug === slug) ?? null;
}

function getAllTypeSlugs(): string[] {
  return riddleTypes.map((t) => t.slug);
}

function getAllRiddleSlugs(): string[] {
  return Object.values(allRiddles)
    .flat()
    .map((r) => r.slug);
}

function findRiddle(slug: string): (Riddle & { category: string; categorySlug: string }) | null {
  for (const [typeSlug, riddles] of Object.entries(allRiddles)) {
    const found = riddles.find((r) => r.slug === slug);
    if (found) {
      return {
        ...found,
        category: formatTypeName(typeSlug),
        categorySlug: typeSlug,
      };
    }
  }
  return null;
}

function getRelatedRiddles(currentSlug: string, count = 3): Riddle[] {
  const all = Object.values(allRiddles).flat().filter((r) => r.slug !== currentSlug);
  // Deterministic shuffle based on slug hash
  const hash = currentSlug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const shuffled = [...all].sort((_, b) => {
    const bHash = b.slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return (hash % bHash) - (bHash % (hash + 1));
  });
  return shuffled.slice(0, count);
}

// ─── Static Params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  const typeParams = getAllTypeSlugs().map((type) => ({ slug: type }));
  const riddleParams = getAllRiddleSlugs().map((slug) => ({ slug }));
  return [...typeParams, ...riddleParams];
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const typeData = getRiddleTypeBySlug(slug);
  if (typeData) {
    return {
      title: `${typeData.title} | Riddles Rush`,
      description: typeData.description,
    };
  }

  const riddle = findRiddle(slug);
  if (riddle) {
    return {
      title: `${riddle.question.slice(0, 60)}... | Riddles Rush`,
      description: riddle.question,
    };
  }

  return { title: "Riddles | Riddles Rush" };
}

// ─── Hub Card ─────────────────────────────────────────────────────────────────

function RiddleCard({
  riddle,
  index,
  href,
}: {
  riddle: Riddle;
  index: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border-2 border-gray-200 bg-white p-6 transition-all duration-300 hover:border-purple-200 hover:shadow-lg group"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-[#7736FE]">
          {index + 1}
        </span>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Riddle
        </span>
      </div>
      <p className="mb-4 text-lg font-medium text-gray-800 group-hover:text-[#7736FE] transition-colors duration-300">
        {riddle.question}
      </p>
      <span className="inline-flex items-center text-sm font-semibold text-[#7736FE]">
        Read more{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}

// ─── Related Card (smaller) ───────────────────────────────────────────────────

function RelatedCard({
  riddle,
  href,
}: {
  riddle: Riddle;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border-2 border-gray-200 bg-white p-5 transition-all duration-300 hover:border-purple-200 hover:shadow-md group"
    >
      <p className="mb-3 text-base font-medium text-gray-800 line-clamp-3 group-hover:text-[#7736FE] transition-colors">
        {riddle.question}
      </p>
      <span className="inline-flex items-center text-sm font-semibold text-[#7736FE]">
        Read more{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}

// ─── Breadcrumbs ──────────────────────────────────────────────────────────────

function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-300"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-[#7736FE]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-800">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ─── Hub Page ─────────────────────────────────────────────────────────────────

function HubPage({
  typeSlug,
  typeData,
  riddles,
}: {
  typeSlug: string;
  typeData: (typeof riddleTypes)[number];
  riddles: Riddle[];
}) {
  const otherTypes = riddleTypes.filter((t) => t.slug !== typeSlug);

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#f1f7f9] to-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: typeData.title },
              ]}
            />
            <span className="mb-4 block text-7xl">{typeData.emoji}</span>
            <h1 className="mb-4 font-heading text-4xl font-bold text-[#7736FE] sm:text-5xl lg:text-6xl">
              {typeData.title}
            </h1>
            <p className="max-w-2xl text-lg text-gray-600">
              {typeData.description}
            </p>
          </div>
        </section>

        {/* Riddle listings */}
        <section className="container mx-auto max-w-5xl py-12">
          <h2 className="mb-8 font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
            Riddles in this collection
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {riddles.map((riddle, i) => (
              <RiddleCard
                key={riddle.slug}
                riddle={riddle}
                index={i}
                href={`/riddles/${riddle.slug}`}
              />
            ))}
          </div>
        </section>

        {/* Explore other types */}
        <section className="border-t border-gray-100 bg-gray-50 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
              Explore other types of riddles
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {otherTypes.map((t) => (
                <Link
                  key={t.slug}
                  href={`/riddles/${t.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-purple-200 hover:shadow-md"
                >
                  <span className="text-3xl">{t.emoji}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{t.title}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {t.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#7736FE] py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 font-heading text-3xl font-bold text-white sm:text-4xl">
              Ready for more brain teasers?
            </h2>
            <p className="mb-8 text-lg text-purple-100">
              Challenge yourself with our full collection of riddles and keep
              your mind sharp.
            </p>
            <Link
              href="/"
              className="inline-flex items-center rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-[#7736FE] shadow-md transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// ─── Individual Riddle Page ───────────────────────────────────────────────────

function IndividualRiddlePage({
  riddle,
}: {
  riddle: Riddle & { category: string; categorySlug: string };
}) {
  const related = getRelatedRiddles(riddle.slug, 3);
  const moreLike = getRelatedRiddles(riddle.slug + "-more", 3).filter(
    (r) => !related.some((rr) => rr.slug === r.slug),
  );

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#f1f7f9] to-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                {
                  label: riddle.category,
                  href: `/riddles/${riddle.categorySlug}`,
                },
                { label: "Riddle" },
              ]}
            />
            <h1 className="mb-6 font-heading text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl leading-tight">
              {riddle.question}
            </h1>
          </div>
        </section>

        {/* Riddle card */}
        <section className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-sm sm:p-10">
            <p className="mb-6 text-xl font-medium leading-relaxed text-gray-800 sm:text-2xl">
              {riddle.question}
            </p>
            <p className="mb-2 text-sm text-gray-500 italic">
              Take a moment to solve it, then reveal the answer below.
            </p>
            <RiddleReveal
              answer={riddle.answer}
              hint="Click the button when you&rsquo;re ready!"
            />
          </div>
        </section>

        {/* More Like This */}
        {moreLike.length > 0 && (
          <section className="border-t border-gray-100 bg-gray-50 py-12 sm:py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-8 font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
                More Like This
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {moreLike.map((r) => (
                  <RelatedCard
                    key={r.slug}
                    riddle={r}
                    href={`/riddles/${r.slug}`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Riddles */}
        {related.length > 0 && (
          <section className="border-t border-gray-100 py-12 sm:py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-8 font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
                Related Riddles
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <RelatedCard
                    key={r.slug}
                    riddle={r}
                    href={`/riddles/${r.slug}`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-[#7736FE] py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 font-heading text-3xl font-bold text-white sm:text-4xl">
              Enjoyed this riddle?
            </h2>
            <p className="mb-8 text-lg text-purple-100">
              Explore more riddles in the{" "}
              <span className="font-semibold">{riddle.category}</span>{" "}
              collection or try a completely different category.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={`/riddles/${riddle.categorySlug}`}
                className="inline-flex items-center rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-[#7736FE] shadow-md transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
              >
                More {riddle.category}
              </Link>
              <Link
                href="/"
                className="inline-flex items-center rounded-xl border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/10"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default async function RiddlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check if this is a riddle type hub page
  const typeData = getRiddleTypeBySlug(slug);
  if (typeData) {
    const riddles = allRiddles[typeData.slug as RiddleTypeSlug] ?? [];
    return (
      <HubPage typeSlug={typeData.slug} typeData={typeData} riddles={riddles} />
    );
  }

  // Otherwise, try to find an individual riddle
  const riddle = findRiddle(slug);
  if (riddle) {
    return <IndividualRiddlePage riddle={riddle} />;
  }

  // 404 fallback
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <h1 className="mb-4 font-heading text-4xl font-bold text-gray-900">
          Riddle Not Found
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Sorry, we couldn&rsquo;t find the riddle you&rsquo;re looking for.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-xl bg-[#7736FE] px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#6a2ee6] hover:shadow-lg"
        >
          Back to Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
