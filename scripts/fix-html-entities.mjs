#!/usr/bin/env node

/**
 * Fix HTML entities in blog posts and riddle files
 * - &#x27; → '
 * - &amp; → &
 * - &#39; → '
 * - &quot; → "
 * - &lt; → <
 * - &gt; → >
 */

import fs from "fs";
import path from "path";

const BLOG_DIR = path.resolve("content/blog");
const RIDDLES_DIR = path.resolve("content/riddles");

function fixHtmlEntities(text) {
  return text
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function fixFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const fixed = fixHtmlEntities(raw);
  if (raw !== fixed) {
    fs.writeFileSync(filePath, fixed, "utf-8");
    return true;
  }
  return false;
}

let fixedCount = 0;

// Fix blog posts
const blogFiles = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".md"));
for (const file of blogFiles) {
  if (fixFile(path.join(BLOG_DIR, file))) {
    fixedCount++;
    console.log(`  Fixed: blog/${file}`);
  }
}

// Fix riddle files
const riddleFiles = fs.readdirSync(RIDDLES_DIR).filter(f => f.endsWith(".md"));
for (const file of riddleFiles) {
  if (fixFile(path.join(RIDDLES_DIR, file))) {
    fixedCount++;
    console.log(`  Fixed: riddles/${file}`);
  }
}

console.log(`\n✅ Fixed ${fixedCount} files`);
