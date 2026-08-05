#!/usr/bin/env node

/**
 * Fix individual riddle files with scraped/ugly content.
 *
 * Each file has:
 *   - Ugly title: "Something… - Answer & explanation"
 *   - Ugly description with "Solution: X. Short explanation of the trick, no fluff."
 *   - Body that duplicates the ugly description + has a random unrelated riddle
 *
 * This script:
 *   1. Extracts the real riddle question from the description (before "Solution:")
 *   2. Extracts the answer (after "Solution:")
 *   3. Cleans up frontmatter (title, description, category)
 *   4. Rewrites body with proper SEO-friendly content
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const RIDDLES_DIR = path.resolve("content/riddles");

// Files to skip (hub pages and already-clean files)
const SKIP_FILES = new Set([
  "adults.md",
  "family.md",
  "food.md",
  "hard-riddles.md",
  "holidays.md",
  "kids.md",
  "kids-riddles.md",
  "logic-riddles.md",
  "nature.md",
  "riddles-with-answers.md",
  "short-riddles.md",
  "sports.md",
  "tricky-riddles.md",
  "what-am-i.md",
  "kids-riddles-collection.md",
]);

// Emoji mapping by category keyword
const EMOJI_MAP = {
  brain: "🧠",
  logic: "🧩",
  math: "🔢",
  word: "📝",
  animal: "🐾",
  nature: "🌿",
  food: "🍕",
  sport: "⚽",
  holiday: "🎄",
  kid: "🧸",
  adult: "💡",
  trick: "🎭",
  mystery: "🔍",
  science: "🔬",
  history: "📜",
  music: "🎵",
  color: "🎨",
  time: "⏰",
  water: "🌊",
  light: "💡",
  dark: "🌙",
  tree: "🌳",
  bird: "🐦",
  fish: "🐟",
  car: "🚗",
  man: "👨",
  woman: "👩",
  boy: "👦",
  girl: "👧",
  house: "🏠",
  train: "🚂",
  bridge: "🌉",
  coin: "🪙",
  clock: "🕐",
  default: "❓",
};

function getEmoji(title, slug) {
  const lower = (title + " " + slug).toLowerCase();
  for (const [keyword, emoji] of Object.entries(EMOJI_MAP)) {
    if (lower.includes(keyword)) return emoji;
  }
  return EMOJI_MAP.default;
}

function cleanText(text) {
  if (!text) return "";
  return text
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/…/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractRiddle(description) {
  const desc = cleanText(description);

  // Find the riddle question (everything before "Solution:")
  let question = "";
  let answer = "";

  const solutionMatch = desc.match(/Solution:\s*(.+?)(?:\.\s*(?:Short explanation|Short|$))/i);
  if (solutionMatch) {
    question = desc.split(/Solution:/i)[0].trim();
    answer = solutionMatch[1].trim().replace(/\.\s*$/, "");
  } else {
    // No Solution: found, try to use the description as-is
    question = desc;
    answer = "";
  }

  // Clean up the question
  question = question
    .replace(/\s*…\s*$/, "")
    .replace(/\s*\.\.\.\s*$/, "")
    .replace(/^Count\s+/i, "")
    .replace(/,\s*Count\s+/gi, ". ")
    .trim();

  // Clean up the answer
  answer = answer
    .replace(/\.\s*$/, "")
    .replace(/\.\.$/, "")
    .trim();

  return { question, answer };
}

function capitalizeFirst(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

let fixedCount = 0;
let skippedCount = 0;
let errorCount = 0;

const files = fs.readdirSync(RIDDLES_DIR).filter((f) => f.endsWith(".md"));

for (const file of files) {
  if (SKIP_FILES.has(file)) {
    skippedCount++;
    continue;
  }

  const filePath = path.join(RIDDLES_DIR, file);
  const raw = fs.readFileSync(filePath, "utf-8");

  // Check if this file actually needs fixing
  if (
    !raw.includes("Solution:") &&
    !raw.includes("Answer &") &&
    !raw.includes("…")
  ) {
    skippedCount++;
    continue;
  }

  try {
    // Parse frontmatter with gray-matter
    const { data: fm, content: body } = matter(raw);

    const oldTitle = cleanText(fm.title || "");
    const oldSlug = fm.slug || "";
    const oldDesc = cleanText(fm.description || "");
    const oldEmoji = fm.emoji || "❓";

    // Extract the actual riddle
    const { question, answer } = extractRiddle(oldDesc);

    if (!question || question.length < 5) {
      console.log(`  SKIP (could not extract question): ${file}`);
      skippedCount++;
      continue;
    }

    if (!answer || answer.length < 1) {
      console.log(`  SKIP (could not extract answer): ${file}`);
      skippedCount++;
      continue;
    }

    // Generate clean title - just the question, properly formatted
    const cleanTitle = capitalizeFirst(question.replace(/\?$/, "").trim()) + "?";
    const cleanSlug = oldSlug; // Keep original slug for URL stability
    const cleanDescription = `${question} The answer is ${answer.toLowerCase()}. Challenge your brain with this classic riddle and test your problem-solving skills.`;
    const emoji = getEmoji(question, oldSlug);
    const cleanCategory = "Tricky Riddles";

    // Build new frontmatter
    const newFm = {
      title: cleanTitle,
      slug: cleanSlug,
      description: cleanDescription,
      emoji: emoji,
      category: cleanCategory,
    };

    // Build new body
    const newBody = `${question}

Take a moment to think about this classic riddle. The answer might be simpler than you think!

**Answer:** ${answer}

## Why This Riddle Works

This riddle plays on the way we think about everyday objects and concepts. The trick is to look beyond the obvious and consider alternative meanings. Riddles like this one help sharpen your lateral thinking skills and creative problem-solving abilities.

## Tips for Solving Riddles Like This

1. **Read every word carefully** — Riddles often use specific wording to misdirect you
2. **Think beyond the literal meaning** — The answer is usually a play on words
3. **Consider everyday objects** — Common items often have surprising double meanings
4. **Don't overthink it** — Sometimes the simplest answer is the right one
5. **Have fun** — The joy is in the puzzle, not just the answer

## Challenge Your Friends

Share this riddle with friends and family to see if they can solve it. Riddles are a great way to spark conversation, laugh together, and keep your mind sharp. Check out our collection of tricky riddles for more brain-teasing fun!

---

*Part of the Riddles Rush collection. Last updated: 2026-08-05.*`;

    const newContent = matter.stringify(newBody, newFm);

    fs.writeFileSync(filePath, newContent, "utf-8");
    fixedCount++;
    console.log(`  Fixed: ${file}`);
    console.log(`    Title: ${cleanTitle}`);
    console.log(`    Answer: ${answer}`);
  } catch (err) {
    console.error(`  ERROR: ${file} — ${err.message}`);
    errorCount++;
  }
}

console.log(`\n✅ Fixed ${fixedCount} individual riddle files`);
console.log(`⏭️  Skipped ${skippedCount} files (hub pages or already clean)`);
if (errorCount > 0) console.log(`❌ Errors: ${errorCount}`);
