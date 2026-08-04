// ============================================================
// Blog Post Import Script
// ============================================================
// Scrapes blog post content from riddlesrush.com and saves
// each one as a markdown file in content/blog/
//
// Usage: node scripts/import-blog-posts.mjs
//
// This script fetches each blog post page, extracts the title,
// description, category, emoji, and riddle Q&A pairs, then
// writes them as .md files with proper frontmatter.
// ============================================================

import fs from "fs";
import path from "path";
import https from "https";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// All blog post slugs we know about (from sitemap.xml analysis)
const BLOG_SLUGS = [
  "4th-of-july-riddles",
  "campfire-riddles",
  "celebrity-riddles",
  "chicago-riddles",
  "dallas-riddles",
  "everyday-object-riddles",
  "fall-riddles-with-answers",
  "hard-brain-teasers-for-adults",
  "houston-riddles",
  "job-and-career-riddles",
  "los-angeles-riddles",
  "new-york-city-riddles",
  "philadelphia-riddles",
  "phoenix-riddles",
  "riddles-about-the-5-senses",
  "riddles-for-car-rides",
  "riddles-for-couples",
  "riddles-to-ask-friends",
  "san-antonio-riddles",
  "san-diego-riddles",
  "san-jose-riddles",
  "seattle-riddles",
  "summer-riddles",
  "tiktok-brain-teasers",
];

// Category mapping based on URL analysis
const CATEGORY_MAP = {
  "kids-riddles": { category: "Kids Riddles", categorySlug: "kids-riddles" },
  "adult-riddles": { category: "Adult Riddles", categorySlug: "adult-riddles" },
  "holiday-riddles": { category: "Holiday Riddles", categorySlug: "holiday-riddles" },
  "what-am-i-riddles": { category: "What Am I Riddles", categorySlug: "what-am-i-riddles" },
  "family-riddles": { category: "Family Riddles", categorySlug: "family-riddles" },
  "nature-riddles": { category: "Nature Riddles", categorySlug: "nature-riddles" },
  "food-riddles": { category: "Food Riddles", categorySlug: "food-riddles" },
  "sports-riddles": { category: "Sports Riddles", categorySlug: "sports-riddles" },
};

/** Fetch a URL and return the HTML */
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
      res.on("error", reject);
    }).on("error", reject);
  });
}

/** Extract text content between tags */
function extractText(html, tag) {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = html.match(regex);
  return match ? match[1].trim() : "";
}

/** Convert HTML riddle content to markdown */
function htmlToMarkdown(html) {
  return html
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, text) => `\n## ${text.replace(/<[^>]+>/g, "").trim()}\n`)
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, text) => `\n### ${text.replace(/<[^>]+>/g, "").trim()}\n`)
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "_$1_")
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n")
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Try to determine category from page content */
function guessCategory(title, slug) {
  const lower = (title + " " + slug).toLowerCase();
  if (lower.includes("kid") || lower.includes("child") || lower.includes("young"))
    return CATEGORY_MAP["kids-riddles"];
  if (lower.includes("adult") || lower.includes("hard") || lower.includes("brain"))
    return CATEGORY_MAP["adult-riddles"];
  if (
    lower.includes("holiday") ||
    lower.includes("christmas") ||
    lower.includes("halloween") ||
    lower.includes("easter") ||
    lower.includes("4th of july") ||
    lower.includes("thanksgiving") ||
    lower.includes("valentine")
  )
    return CATEGORY_MAP["holiday-riddles"];
  if (lower.includes("family") || lower.includes("road trip") || lower.includes("car"))
    return CATEGORY_MAP["family-riddles"];
  if (lower.includes("nature") || lower.includes("animal") || lower.includes("fall"))
    return CATEGORY_MAP["nature-riddles"];
  if (lower.includes("food") || lower.includes("cooking") || lower.includes("pizza"))
    return CATEGORY_MAP["food-riddles"];
  if (lower.includes("sport") || lower.includes("baseball") || lower.includes("football"))
    return CATEGORY_MAP["sports-riddles"];
  // Default
  return CATEGORY_MAP["what-am-i-riddles"];
}

/** Generate emoji for a post based on its slug/title */
function guessEmoji(title, slug) {
  const lower = (title + " " + slug).toLowerCase();
  if (lower.includes("4th of july") || lower.includes("independence")) return "🇺🇸";
  if (lower.includes("campfire") || lower.includes("camping")) return "🔥";
  if (lower.includes("summer")) return "☀️";
  if (lower.includes("fall") || lower.includes("autumn")) return "🍂";
  if (lower.includes("chicago")) return "🌬️";
  if (lower.includes("dallas")) return "⭐";
  if (lower.includes("houston")) return "🚀";
  if (lower.includes("los angeles") || lower.includes("la")) return "🌴";
  if (lower.includes("new york") || lower.includes("nyc")) return "🗽";
  if (lower.includes("philadelphia") || lower.includes("philly")) return "🔔";
  if (lower.includes("phoenix")) return "🌵";
  if (lower.includes("san antonio")) return "🌉";
  if (lower.includes("san diego")) return "🌊";
  if (lower.includes("san jose")) return "💡";
  if (lower.includes("seattle")) return "☔";
  if (lower.includes("celebrity") || lower.includes("famous")) return "⭐";
  if (lower.includes("car") || lower.includes("road trip")) return "🚗";
  if (lower.includes("couple") || lower.includes("romantic")) return "❤️";
  if (lower.includes("friend")) return "👥";
  if (lower.includes("job") || lower.includes("career")) return "💼";
  if (lower.includes("tiktok") || lower.includes("viral")) return "🧠";
  if (lower.includes("everyday") || lower.includes("object")) return "🏠";
  if (lower.includes("history")) return "📚";
  if (lower.includes("5 senses") || lower.includes("sense")) return "👁️";
  return "🧩";
}

/** Main import function */
async function main() {
  console.log(`📥 Starting blog post import for ${BLOG_SLUGS.length} posts...\n`);

  let imported = 0;
  let skipped = 0;
  let failed = 0;

  for (const slug of BLOG_SLUGS) {
    const filePath = path.join(BLOG_DIR, `${slug}.md`);

    // Skip if already exists
    if (fs.existsSync(filePath)) {
      console.log(`⏭️  Skipped (exists): ${slug}`);
      skipped++;
      continue;
    }

    try {
      console.log(`📥 Fetching: ${slug}...`);
      const html = await fetchPage(`https://www.riddlesrush.com/blog/${slug}`);

      // Extract title
      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      let title = titleMatch
        ? titleMatch[1].replace(/ \| Riddles Rush$/, "").replace(/<[^>]+>/g, "").trim()
        : slug
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");

      // Extract meta description
      const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
      const description = descMatch
        ? descMatch[1]
        : `Fun riddles collection about ${slug.replace(/-/g, " ")}`;

      // Determine category
      const cat = guessCategory(title, slug);

      // Get emoji
      const emoji = guessEmoji(title, slug);

      // Extract riddle content from the page body
      // The original site renders riddles as structured HTML
      const bodyMatch = html.match(
        /<main[^>]*>([\s\S]*?)<\/main>/i
      );
      const bodyHtml = bodyMatch ? bodyMatch[1] : "";

      // Try to find riddle sections
      let riddleContent = "";
      const h2Matches = [...bodyHtml.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];

      if (h2Matches.length > 0) {
        for (let i = 0; i < h2Matches.length; i++) {
          const heading = h2Matches[i][1].replace(/<[^>]+>/g, "").trim();
          if (!heading) continue;

          // Find content between this h2 and the next one (or end)
          const startIdx = h2Matches[i].index + h2Matches[i][0].length;
          const endIdx =
            i + 1 < h2Matches.length ? h2Matches[i + 1].index : bodyHtml.length;
          const sectionHtml = bodyHtml.substring(startIdx, endIdx);

          // Convert to markdown
          const sectionMd = htmlToMarkdown(sectionHtml).trim();
          if (sectionMd) {
            riddleContent += `\n## ${heading}\n\n${sectionMd}\n`;
          }
        }
      }

      // If we couldn't extract structured content, use a placeholder
      if (!riddleContent.trim()) {
        riddleContent = `\n## ${title}\n\nContent for this collection is being imported.\n\n*Check back soon for the full riddle collection!*\n`;
      }

      // Build the markdown file
      const publishedDate = new Date().toISOString().split("T")[0];
      const markdown = `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
description: "${description.replace(/"/g, '\\"')}"
category: "${cat.category}"
categorySlug: "${cat.categorySlug}"
emoji: "${emoji}"
publishedAt: "${publishedDate}"
author: "Patrick Stevens"
tags: [${slug.split("-").map((s) => `"${s}"`).join(", ")}]
---
${riddleContent}`;

      // Write the file
      fs.writeFileSync(filePath, markdown, "utf-8");
      console.log(`✅ Imported: ${slug}`);
      imported++;
    } catch (err) {
      console.error(`❌ Failed: ${slug} — ${err.message}`);
      failed++;
    }

    // Small delay to be polite
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\n📊 Import Complete!`);
  console.log(`   ✅ Imported: ${imported}`);
  console.log(`   ⏭️  Skipped:  ${skipped}`);
  console.log(`   ❌ Failed:   ${failed}`);
}

main().catch(console.error);
