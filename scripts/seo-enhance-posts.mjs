#!/usr/bin/env node
/**
 * SEO Enhancement Script — Tasks 1, 2, 4, 5
 * 1. Unique meta descriptions
 * 2. Unique intro text between section header and first riddle
 * 4. Internal cross-links within content
 * 5. Related Collections section (already exists in template, adds inline links)
 */

import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// ── Unique intro text variants (replaces "Test your knowledge...") ──
const INTRO_VARIANTS = [
  "Here are some brain teasers that'll keep you guessing. Try to solve each one before peeking at the answer!",
  "Think you can crack these? Give each one a shot before scrolling down to the solution.",
  "These are designed to make you pause, think, and maybe argue with whoever you're solving them with. Good luck!",
  "Ready to put your brain to work? See how many of these you can solve without help.",
  "A good riddle makes you see everyday things differently. These are some of our favorites — can you solve them all?",
  "Grab a friend and take turns guessing. The real fun is in the debate over the answers.",
  "Some of these will trick you, some will make you groan, and some will genuinely surprise you. Let's go!",
  "The best riddles are the ones that seem impossible until the answer clicks. See if any of these do that for you.",
  "Test your wits with these — but don't feel bad if you need to check the answers. That's what they're there for.",
  "These riddles range from quick head-scratchers to genuine brain-busters. How many can you get right?",
  "Perfect for breaking out at your next gathering. Warning: these may cause heated debates about the answers.",
  "Think laterally, question your assumptions, and don't trust your first instinct. That's the secret to these.",
];

// ── Unique "More riddles" intro variants ────────────────────────────
const MORE_INTRO_VARIANTS = [
  "Think you've got what it takes? Here are a few more to really test yourself.",
  "Not done yet? These bonus riddles will push your brain a little further.",
  "Here comes round two — these are just as tricky as the first set.",
  "Ready for more? These additional riddles keep the challenge going.",
  "The fun doesn't stop here. See if you can solve these bonus brain teasers too.",
  "Here are some extras for when one set of riddles just isn't enough.",
  "Bonus round! These riddles are for when you're on a roll and want to keep going.",
  "Still want more? We've got you covered with these additional brain teasers.",
];

// ── Category-specific meta description templates ────────────────────
const META_TEMPLATES = {
  "Holiday Riddles": (title, emoji, tags) => {
    const tagStr = tags?.slice(0, 3).join(", ") || "holidays";
    return `${title} — fun ${tagStr} brain teasers with answers. Perfect for parties, classroom activities, and family gatherings. See how many you can solve!`;
  },
  "Kids Riddles": (title, emoji, tags) => {
    return `${title} designed for young minds. Easy-to-understand brain teasers that are fun for the whole family. Great for classrooms and game nights!`;
  },
  "Adult Riddles": (title, emoji, tags) => {
    return `${title} that'll challenge even the sharpest thinkers. Tricky logic puzzles and wordplay with answers. Perfect for parties and team icebreakers!`;
  },
  "Family Riddles": (title, emoji, tags) => {
    return `${title} the whole family can enjoy together. From easy brain teasers to tricky puzzles — ideal for game nights, road trips, and gatherings!`;
  },
  "Food Riddles": (title, emoji, tags) => {
    return `${title} about cooking, ingredients, and everything edible. Deliciously tricky brain teasers perfect for dinner parties and food lovers!`;
  },
  "Nature Riddles": (title, emoji, tags) => {
    return `${title} about animals, weather, plants, and the outdoors. Nature-themed brain teasers that make you see the natural world differently!`;
  },
  "Sports Riddles": (title, emoji, tags) => {
    return `${title} for sports fans of all ages. Clever brain teasers about baseball, basketball, soccer, and more. Great for game day fun!`;
  },
  "What Am I Riddles": (title, emoji, tags) => {
    const tagStr = tags?.slice(0, 2).join(" and ") || "everyday objects";
    return `${title} — classic "What Am I?" brain teasers about ${tagStr}. Test your deduction skills with these clever riddles and answers!`;
  },
};

// ── Helper: simple hash for deterministic picks ─────────────────────
function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pickVariant(arr, seed) {
  return arr[hashStr(seed) % arr.length];
}

// ── Helper: extract slug categories for cross-linking ───────────────
function getAllSlugs() {
  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

// ── Process a single file ──────────────────────────────────────────
function processFile(filePath, allSlugs) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const filename = path.basename(filePath, ".md");

  // Split frontmatter
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return { file: filename, status: "skipped" };

  let frontmatter = fmMatch[1];
  let body = fmMatch[2];
  let changed = false;

  // ── 1. Unique meta description ───────────────────────────────────
  const catMatch = frontmatter.match(/category:\s*["']?([^"'\n]+)["']?/);
  const category = catMatch ? catMatch[1].trim() : "What Am I Riddles";

  const emojiMatch = frontmatter.match(/emoji:\s*["']?([^"'\n]+)["']?/);
  let emoji = emojiMatch ? emojiMatch[1].trim() : "🧩";
  emoji = emoji.replace(/\\U([0-9A-Fa-f]{4,8})/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));

  const titleMatch = frontmatter.match(/title:\s*["']?([^"'\n]+)["']?/);
  const title = titleMatch ? titleMatch[1].trim() : filename;

  const tagsMatch = frontmatter.match(/tags:\s*\n((?:\s*-\s*.+\n?)+)/);
  const tags = tagsMatch ? tagsMatch[1].match(/-\s*(.+)/g)?.map((t) => t.replace(/^-\s*/, "").trim()) : [];

  // Check if description is already unique (not templated)
  const descMatch = frontmatter.match(/description:\s*[>|-]*\s*\n?\s*(.+)/);
  const currentDesc = descMatch ? descMatch[1].trim() : "";

  const isTemplatedDesc = currentDesc.startsWith("Looking for") ||
    currentDesc.startsWith("These") && currentDesc.includes("Brain Teasers") && currentDesc.length < 80 ||
    currentDesc.length < 30;

  if (isTemplatedDesc || currentDesc.length < 50) {
    const metaTemplate = META_TEMPLATES[category] || META_TEMPLATES["What Am I Riddles"];
    const newDesc = metaTemplate(title, emoji, tags);

    // Use single quotes if description contains double quotes
    const descQuote = newDesc.includes('"') ? "'" : '"';
    const escapedDesc = descQuote === "'" ? newDesc.replace(/'/g, "''") : newDesc;

    // Replace description in frontmatter
    if (frontmatter.includes("description: >-")) {
      frontmatter = frontmatter.replace(
        /description:\s*>-[\s\S]*?(?=\n\w)/,
        `description: ${descQuote}${escapedDesc}${descQuote}`
      );
    } else {
      frontmatter = frontmatter.replace(
        /description:\s*["'].*?["']/,
        `description: ${descQuote}${escapedDesc}${descQuote}`
      );
    }
    changed = true;
  }

  // ── 2. Unique intro text (replace "Test your knowledge...") ──────
  const introLine = "Test your knowledge with these fun riddles! Each one is designed to make you think and smile.";
  if (body.includes(introLine)) {
    const newIntro = pickVariant(INTRO_VARIANTS, filename);
    body = body.replace(introLine, newIntro);
    changed = true;
  }

  // Also replace the "More riddles" intro
  const moreIntroLine = "Enjoy these bonus riddles! Keep the fun going with more brain teasers.";
  if (body.includes(moreIntroLine)) {
    const newMoreIntro = pickVariant(MORE_INTRO_VARIANTS, filename);
    body = body.replace(moreIntroLine, newMoreIntro);
    changed = true;
  }

  // ── 4. Internal cross-links (add 2-3 related post links in the conclusion) ──
  const currentSlug = filename;
  const relatedSlugs = allSlugs
    .filter((s) => s !== currentSlug)
    .sort((a, b) => hashStr(a + currentSlug) - hashStr(b + currentSlug))
    .slice(0, 3);

  // Check if cross-links already exist
  if (!body.includes("][") && relatedSlugs.length >= 2) {
    const crossLinkSection = `\n\n## Keep the Fun Going\n\nEnjoyed these riddles? Here are some related collections you might like:\n\n` +
      relatedSlugs.map((s) => {
        const linkTitle = s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        return `- [${linkTitle}](/blog/${s})`;
      }).join("\n") +
      `\n\nOr browse all our [riddle collections](/blog) to find the perfect brain teasers for any occasion.`;

    // Insert before the conclusion
    if (body.includes("## Conclusion")) {
      body = body.replace("## Conclusion", crossLinkSection + "\n\n## Conclusion");
    } else {
      body = body.trimEnd() + "\n" + crossLinkSection;
    }
    changed = true;
  }

  // ── 8. Add "lastReviewed" to frontmatter ─────────────────────────
  if (!frontmatter.includes("lastReviewed:")) {
    frontmatter = frontmatter.replace(
      /updatedAt:.*$/m,
      `updatedAt: '2026-08-11'\nlastReviewed: '2026-08-11'`
    );
    changed = true;
  }

  if (changed) {
    const updated = `---\n${frontmatter}\n---\n${body}`;
    fs.writeFileSync(filePath, updated, "utf-8");
    return { file: filename, status: "updated", category };
  }

  return { file: filename, status: "unchanged" };
}

// ── Run ─────────────────────────────────────────────────────────────
const allSlugs = getAllSlugs();
const files = allSlugs.map((s) => `${s}.md`);
console.log(`Processing ${files.length} blog posts...\n`);

const stats = { updated: 0, unchanged: 0, skipped: 0, errors: 0 };

for (const file of files) {
  try {
    const result = processFile(path.join(BLOG_DIR, file), allSlugs);
    if (result.status === "updated") {
      stats.updated++;
      if (stats.updated % 50 === 0) {
        console.log(`  ✅ ${stats.updated}/${files.length} updated...`);
      }
    } else if (result.status === "unchanged") {
      stats.unchanged++;
    } else {
      stats.skipped++;
    }
  } catch (err) {
    stats.errors++;
    console.error(`  ❌ ${file}: ${err.message}`);
  }
}

console.log(`\n✅ Done!`);
console.log(`   Updated:    ${stats.updated}`);
console.log(`   Unchanged:  ${stats.unchanged}`);
console.log(`   Skipped:    ${stats.skipped}`);
console.log(`   Errors:     ${stats.errors}`);
