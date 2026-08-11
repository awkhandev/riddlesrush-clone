#!/usr/bin/env node
/**
 * Batch-rewrite blog post boilerplate to avoid duplicate content detection.
 * Keeps riddle Q&A intact, rewrites intro/outro/FAQ sections.
 */

import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// ── Unique intro templates (one per category type) ──────────────────
const INTRO_TEMPLATES = {
  "Holiday Riddles": (emoji) =>
    `Looking for ${emoji} riddles that'll liven up your next celebration? This collection is packed with holiday-themed brain teasers — perfect for party games, classroom activities, or just passing time between festivities. Give them a try and see how many you can solve!`,
  "Kids Riddles": (emoji) =>
    `Kids love a good riddle, and this collection is loaded with them. These ${emoji} brain teasers are designed to get young minds thinking — tricky enough to be fun, but never so hard they give up. Grab the kids and start guessing!`,
  "Adult Riddles": (emoji) =>
    `Ready for a real challenge? These ${emoji} riddles are built for grown-up brains — the kind that enjoy a puzzle with some teeth. Whether you're looking to stump your friends or just want a mental workout, this collection delivers.`,
  "Family Riddles": (emoji) =>
    `Gather everyone around — it's riddle time. This ${emoji} collection has something for every age group, from the youngest guesser to the most seasoned puzzle solver. Perfect for family game nights, road trips, or lazy Sunday afternoons.`,
  "Food Riddles": (emoji) =>
    `Hungry for a challenge? These ${emoji} food riddles serve up brain teasers about everything from fruits and vegetables to kitchen gadgets and recipes. Great for dinner parties, cooking classes, or anytime you want to tickle your taste buds and your brain.`,
  "Nature Riddles": (emoji) =>
    `Step outside and put your nature knowledge to the test. This ${emoji} collection features riddles about animals, weather, plants, and the great outdoors. Perfect for hiking trips, camping adventures, or classroom exploration.`,
  "Sports Riddles": (emoji) =>
    `Think you know your sports inside and out? These ${emoji} riddles will put that knowledge to the test. From baseball diamonds to basketball courts, these brain teasers use the language of athletics to create puzzles that fans of all ages will enjoy.`,
  "What Am I Riddles": (emoji) =>
    `The classic "What Am I?" format — a series of clues describing something without naming it. This ${emoji} collection is packed with brain teasers that'll have you guessing, debating, and second-guessing yourself. How many can you solve?`,
  "default": (emoji) =>
    `Get ready to put your brain to work with these ${emoji} riddles! Each one is designed to make you think differently and see everyday things from a fresh perspective. Give them a shot and see how many you can crack.`,
};

// ── Unique "What Makes These Riddles Special" variants ───────────────
const SPECIAL_VARIANTS = [
  (cat) => `Here's what makes this particular set of ${cat} riddles worth your time:`,
  (cat) => `A few things that set these ${cat} riddles apart:`,
  (cat) => `What we like about this ${cat} collection:`,
  (cat) => `Why these ${cat} riddles hit differently:`,
];

// ── Unique tips intro variants ───────────────────────────────────────
const TIPS_INTROS = [
  "Stuck on a riddle? Here are some strategies that might help:",
  "Before you peek at the answers, try these approaches:",
  "A few techniques that seasoned riddle-solvers swear by:",
  "Having trouble? Try these tips before giving up:",
];

// ── Unique FAQ question variants per category ────────────────────────
const FAQ_VARIANTS = {
  "Holiday Riddles": [
    (cat) => `What makes holiday riddles different from regular riddles?`,
    (cat) => `Are these riddles appropriate for all ages?`,
    (cat) => `How can I use these at a holiday party?`,
    (cat) => `Do you have riddles for other holidays?`,
  ],
  "Kids Riddles": [
    (cat) => `What age group are these riddles best for?`,
    (cat) => `Are these riddles too easy for adults?`,
    (cat) => `How can I make riddle time more fun for kids?`,
    (cat) => `Do you have more riddle collections for kids?`,
  ],
  "Adult Riddles": [
    (cat) => `How difficult are these riddles really?`,
    (cat) => `Can I use these for a trivia night?`,
    (cat) => `Are there any hints available for the harder ones?`,
    (cat) => `Where can I find even more challenging riddles?`,
  ],
  "default": [
    (cat) => `What makes these ${cat} riddles special?`,
    (cat) => `Are these riddles suitable for kids?`,
    (cat) => `Can I use these for a trivia night?`,
    (cat) => `How can I get more riddles like these?`,
  ],
};

// ── Unique FAQ answer variants ───────────────────────────────────────
const FAQ_ANSWER_VARIANTS = [
  (cat) => `Each riddle in this collection is crafted to be both entertaining and thought-provoking. They're designed to work across age groups, so whether you're eight or eighty, you'll find something to enjoy.`,
  (cat) => `Most of these riddles are completely family-friendly. They're great for building critical thinking skills in younger solvers while still being engaging enough for adults.`,
  (cat) => `Absolutely — these work perfectly as trivia questions. Pull them out at your next gathering, and watch the debates begin. Just be ready for disagreements about the answers.`,
  (cat) => `We add new riddle collections all the time. Browse our other ${cat} collections, or check out our daily riddle feature for a fresh brain teaser delivered every day.`,
];

// ── Unique conclusion variants ───────────────────────────────────────
const CONCLUSION_VARIANTS = [
  (cat, emoji) => `That wraps up our ${cat} collection! Whether you nailed every single one or got tripped up by a few, we hope these riddles brought some fun to your day. Share your favorites with friends, bookmark this page for your next game night, and don't forget to explore our other riddle collections for even more brain-teasing entertainment!`,
  (cat, emoji) => `Thanks for working through these ${cat} riddles! The best part about riddles isn't just solving them — it's the conversations and laughter they spark. Pass these along to someone who needs a good brain workout, and check out our other collections for more puzzles to keep your mind sharp.`,
  (cat, emoji) => `And that's a wrap on these ${cat} brain teasers! Riddles are one of those rare activities that get better the more people join in. Try these at your next gathering, share them on social media, or just enjoy them on your own. Either way, we've got plenty more where these came from.`,
];

// ── Helper: pick from array using hash ──────────────────────────────
function pickVariant(arr, slug) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  return arr[Math.abs(hash) % arr.length];
}

// ── Helper: compute simple hash ──────────────────────────────────────
function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

// ── Main processing ─────────────────────────────────────────────────
function processFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const filename = path.basename(filePath, ".md");

  // Split frontmatter
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return { file: filename, status: "skipped", reason: "no frontmatter" };

  const frontmatter = fmMatch[1];
  let body = fmMatch[2];

  // Extract category from frontmatter
  const catMatch = frontmatter.match(/category:\s*["']?([^"'\n]+)["']?/);
  const category = catMatch ? catMatch[1].trim() : "default";

  // Extract emoji from frontmatter (handle YAML unicode escapes like \U0001F384)
  const emojiMatch = frontmatter.match(/emoji:\s*["']?([^"'\n]+)["']?/);
  let emoji = emojiMatch ? emojiMatch[1].trim() : "🧩";
  // Decode YAML unicode escapes: \U0001F384 → actual emoji
  emoji = emoji.replace(/\\U([0-9A-Fa-f]{4,8})/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));

  // ── Replace intro paragraph ───────────────────────────────────────
  // Intro is the first paragraph before any ## heading
  const introRegex = /^(?:.*?\n)*?(?=\n## )/m;
  const introTemplate = INTRO_TEMPLATES[category] || INTRO_TEMPLATES["default"];
  const newIntro = introTemplate(emoji);
  body = body.replace(introRegex, newIntro + "\n\n");

  // ── Replace "What Makes These Riddles Special" section ─────────────
  const specialRegex = /## What Makes These Riddles Special\n[\s\S]*?(?=\n## )/;
  const specialIntro = pickVariant(SPECIAL_VARIANTS, filename);
  const newSpecial = `## What Makes These Riddles Special\n\n${specialIntro(category)}\n\n- **Fun for all ages** — Simple enough for kids, engaging enough for adults\n- **Perfect for groups** — Ideal for parties, classrooms, and family gatherings\n- **Brain-boosting** — Each riddle builds critical thinking and problem-solving skills\n- **Great conversation starters** — Share them and watch the debates begin`;
  body = body.replace(specialRegex, newSpecial + "\n");

  // ── Replace Tips section intro ─────────────────────────────────────
  const tipsRegex = /## Tips for Solving Riddles\n\n(?=1\.)/;
  const tipsIntro = pickVariant(TIPS_INTROS, filename);
  body = body.replace(tipsRegex, `## Tips for Solving Riddles\n\n${tipsIntro}\n\n`);

  // ── Replace FAQ section ────────────────────────────────────────────
  const faqRegex = /## Frequently Asked Questions\n[\s\S]*?(?=\n## (?:Conclusion|Conclusion|$))/;
  const faqVariants = FAQ_VARIANTS[category] || FAQ_VARIANTS["default"];
  const answerVariants = FAQ_ANSWER_VARIANTS;

  let faqSection = "## Frequently Asked Questions\n\n";
  for (let i = 0; i < 4; i++) {
    const qFn = faqVariants[i] || faqVariants[faqVariants.length - 1];
    const aFn = answerVariants[i % answerVariants.length];
    faqSection += `### ${qFn(category)}\n\n${aFn(category)}\n\n`;
  }
  body = body.replace(faqRegex, faqSection);

  // ── Replace Conclusion ─────────────────────────────────────────────
  const conclusionRegex = /## Conclusion\n[\s\S]*?(?=\n---\n|\n\*Written by|$)/;
  const conclusionFn = pickVariant(CONCLUSION_VARIANTS, filename);
  const newConclusion = `## Conclusion\n\n${conclusionFn(category, emoji)}`;
  body = body.replace(conclusionRegex, newConclusion);

  // ── Replace footer attribution ─────────────────────────────────────
  const footerRegex = /\*Written by.*?\*$/m;
  const hasFooter = footerRegex.test(body);
  if (hasFooter) {
    body = body.replace(footerRegex, `*Written by Patrick Stevens and the Riddles Rush Team.*`);
  } else {
    body = body.trimEnd() + "\n\n---\n\n*Written by Patrick Stevens and the Riddles Rush Team.*\n";
  }

  // Write back
  const updated = `---\n${frontmatter}\n---\n${body}`;
  fs.writeFileSync(filePath, updated, "utf-8");

  return { file: filename, status: "rewritten", category };
}

// ── Run ──────────────────────────────────────────────────────────────
const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
console.log(`Processing ${files.length} blog posts...\n`);

const stats = { rewritten: 0, skipped: 0, errors: 0 };
const categories = {};

for (const file of files) {
  try {
    const result = processFile(path.join(BLOG_DIR, file));
    if (result.status === "rewritten") {
      stats.rewritten++;
      categories[result.category] = (categories[result.category] || 0) + 1;
      if (stats.rewritten % 50 === 0) {
        console.log(`  ✅ ${stats.rewritten}/${files.length} processed...`);
      }
    } else {
      stats.skipped++;
      console.log(`  ⏭️  ${file}: ${result.reason}`);
    }
  } catch (err) {
    stats.errors++;
    console.error(`  ❌ ${file}: ${err.message}`);
  }
}

console.log(`\n✅ Done!`);
console.log(`   Rewritten: ${stats.rewritten}`);
console.log(`   Skipped:   ${stats.skipped}`);
console.log(`   Errors:    ${stats.errors}`);
console.log(`\n   Categories:`);
for (const [cat, count] of Object.entries(categories).sort((a, b) => b[1] - a[1])) {
  console.log(`     ${cat}: ${count}`);
}
