// ============================================================
// Full Content Scraper for riddlesrush.com
// ============================================================
// Scrapes ALL blog posts (471) and riddle pages (92) from
// riddlesrush.com, rewrites content to avoid copyright issues,
// and saves each as a markdown file.
//
// Usage: node scripts/scrape-all-content.mjs
// ============================================================

import fs from "fs";
import path from "path";
import https from "https";

const CONTENT_DIR = path.join(process.cwd(), "content");
const BLOG_DIR = path.join(CONTENT_DIR, "blog");
const RIDDLES_DIR = path.join(CONTENT_DIR, "riddles");

// Ensure directories exist
[BLOG_DIR, RIDDLES_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ── Configuration ──────────────────────────────────────────────
const BATCH_SIZE = 5;          // Parallel requests per batch
const DELAY_MS = 300;          // Delay between batches (be polite)
const MAX_RETRIES = 3;         // Retry failed requests
const TIMEOUT_MS = 15000;      // Request timeout

// ── Category Mapping ───────────────────────────────────────────
const CATEGORY_MAP = {
  "kids-riddles": { category: "Kids Riddles", categorySlug: "kids-riddles", color: "blue" },
  "adult-riddles": { category: "Adult Riddles", categorySlug: "adult-riddles", color: "purple" },
  "holiday-riddles": { category: "Holiday Riddles", categorySlug: "holiday-riddles", color: "green" },
  "what-am-i-riddles": { category: "What Am I Riddles", categorySlug: "what-am-i-riddles", color: "orange" },
  "family-riddles": { category: "Family Riddles", categorySlug: "family-riddles", color: "pink" },
  "nature-riddles": { category: "Nature Riddles", categorySlug: "nature-riddles", color: "green" },
  "food-riddles": { category: "Food Riddles", categorySlug: "food-riddles", color: "red" },
  "sports-riddles": { category: "Sports Riddles", categorySlug: "sports-riddles", color: "yellow" },
};

// ── Emoji mapping based on keywords ────────────────────────────
const EMOJI_KEYWORDS = [
  [/4th.?of.?july|independence|july/i, "🇺🇸"],
  [/christmas|xmas|santa|sleigh/i, "🎄"],
  [/halloween|spooky|haunted|vampire|witch/i, "🎃"],
  [/easter|bunny/i, "🐰"],
  [/thanksgiving|turkey/i, "🦃"],
  [/valentine|love|romantic/i, "❤️"],
  [/new.?year/i, "🎆"],
  [/campfire|camping/i, "🔥"],
  [/summer|beach|sun/i, "☀️"],
  [/winter|snow|frosty/i, "❄️"],
  [/fall|autumn/i, "🍂"],
  [/spring/i, "🌸"],
  [/chicago/i, "🌬️"],
  [/dallas/i, "⭐"],
  [/houston/i, "🚀"],
  [/los.?angeles/i, "🌴"],
  [/new.?york/i, "🗽"],
  [/philadelphia|philly/i, "🔔"],
  [/phoenix/i, "🌵"],
  [/san.?antonio/i, "🌉"],
  [/san.?diego/i, "🌊"],
  [/san.?jose/i, "💡"],
  [/seattle/i, "☔"],
  [/tiktok/i, "📱"],
  [/brain.?teaser|logic|puzzle/i, "🧠"],
  [/animal/i, "🐾"],
  [/food|cook|bake|pizza/i, "🍕"],
  [/sport|baseball|basketball|football|soccer/i, "⚽"],
  [/music|song/i, "🎵"],
  [/space|planet|star/i, "🚀"],
  [/science/i, "🔬"],
  [/math/i, "🔢"],
  [/book|read|library/i, "📚"],
  [/nature|tree|forest/i, "🌲"],
  [/ocean|water|fish/i, "🌊"],
  [/dinosaur/i, "🦕"],
  [/pirate/i, "🏴‍☠️"],
  [/superhero/i, "🦸"],
  [/detective|mystery/i, "🔍"],
  [/robot|tech|coding/i, "🤖"],
  [/friend/i, "👥"],
  [/kid|child/i, "🧸"],
  [/adult/i, "🧠"],
  [/family/i, "👨‍👩‍👧‍👦"],
  [/teacher|classroom|school/i, "🏫"],
  [/car|road.?trip/i, "🚗"],
  [/travel|vacation/i, "✈️"],
  [/garden|plant/i, "🌱"],
  [/magic/i, "🪄"],
  [/ninja/i, "🥷"],
  [/frozen|ice/i, "🧊"],
  [/emoji/i, "😊"],
  [/birthday/i, "🎂"],
  [/party/i, "🎉"],
  [/funny|hilarious|silly/i, "😂"],
  [/hard|tricky|difficult/i, "🔥"],
  [/easy|simple|quick/i, "⚡"],
  [/riddle/i, "🧩"],
];

function guessEmoji(title, slug) {
  const text = `${title} ${slug}`.toLowerCase();
  for (const [pattern, emoji] of EMOJI_KEYWORDS) {
    if (pattern.test(text)) return emoji;
  }
  return "🧩";
}

// ── Category guessing ──────────────────────────────────────────
function guessCategory(title, slug) {
  const text = `${title} ${slug}`.toLowerCase();
  if (/kid|child|young|elementary|kindergarten|preschool|toddler/i.test(text))
    return CATEGORY_MAP["kids-riddles"];
  if (/adult|brain.?teaser|hard|tricky|difficult|mind.?bend/i.test(text))
    return CATEGORY_MAP["adult-riddles"];
  if (/holiday|christmas|halloween|easter|thanksgiving|valentine|new.?year|4th.?of.?july|season/i.test(text))
    return CATEGORY_MAP["holiday-riddles"];
  if (/family|game.?night|road.?trip|reunion/i.test(text))
    return CATEGORY_MAP["family-riddles"];
  if (/nature|animal|outdoor|forest|ocean|mountain|garden|eco|weather/i.test(text))
    return CATEGORY_MAP["nature-riddles"];
  if (/food|cook|bake|pizza|ice.?cream|kitchen|chef/i.test(text))
    return CATEGORY_MAP["food-riddles"];
  if (/sport|baseball|basketball|football|soccer|olympic|gym/i.test(text))
    return CATEGORY_MAP["sports-riddles"];
  return CATEGORY_MAP["what-am-i-riddles"];
}

// ── Content rewriting helpers ──────────────────────────────────
// These functions slightly modify text to avoid direct copyright

const TRANSFORMS = [
  // Shuffle common phrases
  ["Here are", "Check out"],
  ["Here's a", "Discover a"],
  ["Can you solve", "Try solving"],
  ["Let's see", "Test yourself"],
  ["How many", "Count how many"],
  ["What am I?", "Guess what I am!"],
  ["What is it?", "Any ideas what it could be?"],
  ["Think you know", "Ready to figure out"],
  ["Answer:", "Solution:"],
  ["Answers", "Solutions"],
  ["Riddles", "Brain Teasers"],
  ["with answers", "and solutions"],
  ["for kids", "for young minds"],
  ["for adults", "for grown-ups"],
  ["with answers", "including solutions"],
  ["Fun riddles", "Entertaining brain teasers"],
  ["Hard riddles", "Challenging puzzles"],
  ["Easy riddles", "Simple brain teasers"],
  ["Short riddles", "Quick puzzles"],
  ["Funny riddles", "Hilarious brain teasers"],
  ["The answer is", "It's"],
  ["the answer is", "it's"],
];

function rewriteText(text) {
  if (!text) return text;
  let result = text;
  for (const [from, to] of TRANSFORMS) {
    result = result.replace(new RegExp(from, "gi"), to);
  }
  return result;
}

// ── HTTP Fetcher ───────────────────────────────────────────────
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RiddlesRushBot/1.0)" },
      timeout: TIMEOUT_MS,
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchPage(res.headers.location).then(resolve).catch(reject);
        return;
      }
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("Timeout")); });
  });
}

// ── HTML Parser ────────────────────────────────────────────────
function extractFromHTML(html, slug) {
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  let title = titleMatch
    ? titleMatch[1].replace(/\s*\|\s*Riddles\s*Rush\s*$/i, "").replace(/<[^>]+>/g, "").trim()
    : slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  // Extract meta description
  const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
  let description = descMatch ? descMatch[1] : "";

  // Extract riddle content from main
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const mainHtml = mainMatch ? mainMatch[1] : html;

  // Find all h2 sections (riddle groups)
  const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  const h2Matches = [...mainHtml.matchAll(h2Regex)];

  let riddleSections = [];

  for (let i = 0; i < h2Matches.length; i++) {
    const heading = h2Matches[i][1].replace(/<[^>]+>/g, "").trim();
    if (!heading || heading.length < 3) continue;

    const startIdx = h2Matches[i].index + h2Matches[i][0].length;
    const endIdx = i + 1 < h2Matches.length ? h2Matches[i + 1].index : mainHtml.length;
    const sectionHtml = mainHtml.substring(startIdx, endIdx);

    // Extract Q&A pairs from this section
    const qas = extractQAPairs(sectionHtml);
    if (qas.length > 0) {
      riddleSections.push({ heading, qas });
    }
  }

  // If no sections found, try to find any Q&A in the whole main
  if (riddleSections.length === 0) {
    const qas = extractQAPairs(mainHtml);
    if (qas.length > 0) {
      riddleSections.push({ heading: title, qas });
    }
  }

  return { title, description, riddleSections };
}

function extractQAPairs(html) {
  const pairs = [];

  // Pattern 1: Question in bold/strong, Answer in separate element
  const qPatterns = [
    /<strong[^>]*>([\s\S]*?)<\/strong>/gi,
    /<p[^>]*><strong[^>]*>([\s\S]*?)<\/strong>/gi,
    /<b[^>]*>([\s\S]*?)<\/b>/gi,
  ];

  const aPatterns = [
    /[Aa]nswer:?\s*<\/(?:strong|b|em)>\s*([\s\S]*?)(?:<\/p>|<br|<\/div)/gi,
    /[Aa]nswer:?\s*([\s\S]*?)(?:<\/p>|<\/div>|<br)/gi,
    /[Ss]olution:?\s*([\s\S]*?)(?:<\/p>|<\/div>|<br)/gi,
  ];

  // Try to find numbered riddles (## 1. Title format in HTML)
  const numberedRegex = /<h[23][^>]*>\s*(?:<[^>]+>)*\s*(\d+[.)]\s*)([\s\S]*?)<\/h[23]>/gi;
  let match;
  while ((match = numberedRegex.exec(html)) !== null) {
    const question = match[2].replace(/<[^>]+>/g, "").trim();
    if (question.length > 5) {
      // Find answer after this heading
      const afterHeading = html.substring(match.index + match[0].length, match.index + match[0].length + 1000);
      const answerMatch = afterHeading.match(/(?:[Aa]nswer|[Ss]olution):\s*([\s\S]*?)(?:<\/p>|<\/div>|<br|<h|$)/i);
      const answer = answerMatch ? answerMatch[1].replace(/<[^>]+>/g, "").trim() : "";
      pairs.push({ question: rewriteText(question), answer: rewriteText(answer) });
    }
  }

  // If numbered approach didn't work, try bold text approach
  if (pairs.length === 0) {
    const boldMatches = [...html.matchAll(/<strong[^>]*>([\s\S]*?)<\/strong>/gi)];
    for (const bm of boldMatches) {
      const text = bm[1].replace(/<[^>]+>/g, "").trim();
      if (text.length > 10 && text.length < 300 && !/^[Aa]nswer/.test(text)) {
        // Look for answer nearby
        const after = html.substring(bm.index + bm[0].length, bm.index + bm[0].length + 500);
        const ansMatch = after.match(/(?:[Aa]nswer|[Ss]olution):\s*([\s\S]*?)(?:<\/p>|<\/div>|<br)/i);
        const answer = ansMatch ? ansMatch[1].replace(/<[^>]+>/g, "").trim() : "";
        pairs.push({ question: rewriteText(text), answer: rewriteText(answer) });
      }
    }
  }

  return pairs;
}

// ── Markdown Builder ───────────────────────────────────────────
function buildBlogMarkdown(slug, data) {
  const { title, description, riddleSections } = data;
  const cat = guessCategory(title, slug);
  const emoji = guessEmoji(title, slug);
  const date = new Date().toISOString().split("T")[0];

  let content = "";
  for (const section of riddleSections) {
    content += `\n## ${rewriteText(section.heading)}\n\n`;
    let idx = 1;
    for (const qa of section.qas) {
      content += `### ${idx}. ${qa.question}\n\n`;
      if (qa.answer) {
        content += `**Answer:** ${qa.answer}\n\n`;
      }
      idx++;
    }
  }

  if (!content.trim()) {
    content = `\n## ${rewriteText(title)}\n\n*This collection features a variety of brain teasers and puzzles.*\n`;
  }

  const metaTitle = rewriteText(title);
  const metaDesc = rewriteText(description || `Fun brain teasers and puzzles about ${slug.replace(/-/g, " ")}`);

  return `---
title: "${metaTitle.replace(/"/g, '\\"')}"
slug: "${slug}"
description: "${metaDesc.replace(/"/g, '\\"').slice(0, 160)}"
category: "${cat.category}"
categorySlug: "${cat.categorySlug}"
emoji: "${emoji}"
publishedAt: "${date}"
author: "Patrick Stevens"
tags: [${slug.split("-").slice(0, 5).map(s => `"${s}"`).join(", ")}]
---${content}`;
}

function buildRiddleMarkdown(slug, data) {
  const { title, description, riddleSections } = data;
  const emoji = guessEmoji(title, slug);

  let content = "";
  for (const section of riddleSections) {
    for (let i = 0; i < section.qas.length; i++) {
      const qa = section.qas[i];
      content += `\n## ${i + 1}. ${qa.question}\n\n`;
      if (qa.answer) {
        content += `**Answer:** ${qa.answer}\n`;
      }
    }
  }

  if (!content.trim()) {
    content = `\n## ${rewriteText(title)}\n\n*Challenge yourself with these brain teasers!*\n`;
  }

  return `---
title: "${rewriteText(title).replace(/"/g, '\\"')}"
slug: "${slug}"
description: "${rewriteText(description || title).replace(/"/g, '\\"').slice(0, 160)}"
emoji: "${emoji}"
category: "${slug.replace(/-/g, " ")}"
---${content}`;
}

// ── Batch Processor ────────────────────────────────────────────
async function processBatch(items, processor, batchSize = BATCH_SIZE) {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.allSettled(
      batch.map((item) => processor(item))
    );
    results.push(...batchResults);
    if (i + batchSize < items.length) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
    // Progress
    const done = Math.min(i + batchSize, items.length);
    process.stdout.write(`\r  Progress: ${done}/${items.length} (${Math.round(done / items.length * 100)}%)`);
  }
  process.stdout.write("\n");
  return results;
}

// ── Main Scraping Logic ────────────────────────────────────────
async function scrapeBlogPost(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (fs.existsSync(filePath)) return "skipped";

  let html;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      html = await fetchPage(`https://www.riddlesrush.com/blog/${slug}`);
      break;
    } catch (err) {
      if (attempt === MAX_RETRIES - 1) throw err;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  const data = extractFromHTML(html, slug);
  const markdown = buildBlogMarkdown(slug, data);
  fs.writeFileSync(filePath, markdown, "utf-8");
  return "imported";
}

async function scrapeRiddlePage(slug) {
  const filePath = path.join(RIDDLES_DIR, `${slug}.md`);
  if (fs.existsSync(filePath)) return "skipped";

  let html;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      html = await fetchPage(`https://www.riddlesrush.com/riddles/${slug}`);
      break;
    } catch (err) {
      if (attempt === MAX_RETRIES - 1) throw err;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  const data = extractFromHTML(html, slug);
  const markdown = buildRiddleMarkdown(slug, data);
  fs.writeFileSync(filePath, markdown, "utf-8");
  return "imported";
}

// ── Entry Point ────────────────────────────────────────────────
async function main() {
  console.log("🚀 Riddles Rush Content Scraper");
  console.log("=".repeat(50));

  // 1. Get sitemap URLs
  console.log("\n📡 Fetching sitemap...");
  const sitemapHtml = await fetchPage("https://www.riddlesrush.com/sitemap.xml");
  const allUrls = [...sitemapHtml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

  const blogSlugs = allUrls
    .filter((u) => u.includes("/blog/") && !u.includes("/category/") && !u.includes("/page/"))
    .map((u) => u.replace("https://www.riddlesrush.com/blog/", ""));

  const riddleSlugs = allUrls
    .filter((u) => u.includes("/riddles/") && u !== "https://www.riddlesrush.com/riddles/")
    .map((u) => u.replace("https://www.riddlesrush.com/riddles/", ""));

  console.log(`  Found ${blogSlugs.length} blog posts, ${riddleSlugs.length} riddle pages`);

  // 2. Scrape blog posts
  console.log(`\n📝 Scraping ${blogSlugs.length} blog posts...`);
  let imported = 0, skipped = 0, failed = 0;

  const blogResults = await processBatch(blogSlugs, scrapeBlogPost);
  for (const r of blogResults) {
    if (r.status === "fulfilled") {
      if (r.value === "imported") imported++;
      else skipped++;
    } else {
      failed++;
    }
  }
  console.log(`  Blog: ✅ ${imported} imported, ⏭️ ${skipped} skipped, ❌ ${failed} failed`);

  // 3. Scrape riddle pages
  console.log(`\n🧩 Scraping ${riddleSlugs.length} riddle pages...`);
  let rImported = 0, rSkipped = 0, rFailed = 0;

  const riddleResults = await processBatch(riddleSlugs, scrapeRiddlePage);
  for (const r of riddleResults) {
    if (r.status === "fulfilled") {
      if (r.value === "imported") rImported++;
      else rSkipped++;
    } else {
      rFailed++;
    }
  }
  console.log(`  Riddles: ✅ ${rImported} imported, ⏭️ ${rSkipped} skipped, ❌ ${rFailed} failed`);

  // 4. Summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 SCRAPING COMPLETE");
  console.log(`  Blog posts: ${imported + skipped} total (${imported} new, ${skipped} existing)`);
  console.log(`  Riddle pages: ${rImported + rSkipped} total (${rImported} new, ${rSkipped} existing)`);
  console.log(`  Failed: ${failed + rFailed}`);
  console.log(`  Total markdown files: ${imported + skipped + rImported + rSkipped}`);
}

main().catch((err) => {
  console.error("\n❌ Fatal error:", err.message);
  process.exit(1);
});
