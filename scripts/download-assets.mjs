import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

const BASE_URL = 'https://www.riddlesrush.com';
const PUBLIC_DIR = join(process.cwd(), 'public');

const IMAGES = [
  { url: '/icons/riddlesrush-icon.png', path: 'images/riddlesrush-icon.png' },
  { url: '/icons/apple-icon.svg', path: 'images/apple-icon.svg' },
  { url: '/icons/pinterest-logo.png', path: 'images/pinterest-logo.png' },
  { url: '/pinterest/riddles/summer-riddles-pin-1.png', path: 'images/collections/summer-riddles.png' },
  { url: '/pinterest/riddles/couples-riddles-pin-1.png', path: 'images/collections/couples-riddles.png' },
  { url: '/pinterest/riddles/campfire-riddles-pin-1.png', path: 'images/collections/campfire-riddles.png' },
  { url: '/pinterest/riddles/car-rides-riddles-pin-1.png', path: 'images/collections/car-rides-riddles.png' },
  { url: '/pinterest/riddles/hard-brain-teasers-adults-pin-1.png', path: 'images/collections/hard-brain-teasers.png' },
  { url: '/pinterest/riddles/4th-of-july-riddles-pin-1.png', path: 'images/collections/4th-of-july-riddles.png' },
  { url: '/screenshots/1.png', path: 'images/screenshots/screenshot-1.png' },
  { url: '/screenshots/2.png', path: 'images/screenshots/screenshot-2.png' },
  { url: '/screenshots/3.png', path: 'images/screenshots/screenshot-3.png' },
  { url: '/screenshots/4.png', path: 'images/screenshots/screenshot-4.png' },
];

async function downloadFile(url, outputPath) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to download ${url}: ${response.status}`);
      return false;
    }
    const buffer = await response.arrayBuffer();
    await writeFile(outputPath, Buffer.from(buffer));
    console.log(`Downloaded: ${url} -> ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Error downloading ${url}:`, error.message);
    return false;
  }
}

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function main() {
  // Ensure directories exist
  await ensureDir(join(PUBLIC_DIR, 'images'));
  await ensureDir(join(PUBLIC_DIR, 'images/collections'));
  await ensureDir(join(PUBLIC_DIR, 'images/screenshots'));
  await ensureDir(join(PUBLIC_DIR, 'seo'));

  console.log('Downloading assets...\n');

  let successCount = 0;
  let failCount = 0;

  // Download in batches of 4
  for (let i = 0; i < IMAGES.length; i += 4) {
    const batch = IMAGES.slice(i, i + 4);
    const results = await Promise.all(
      batch.map(async (img) => {
        const url = `${BASE_URL}${img.url}`;
        const outputPath = join(PUBLIC_DIR, img.path);
        return downloadFile(url, outputPath);
      })
    );
    successCount += results.filter(Boolean).length;
    failCount += results.filter(r => !r).length;
  }

  console.log(`\nDone! ${successCount} downloaded, ${failCount} failed.`);
}

main();
