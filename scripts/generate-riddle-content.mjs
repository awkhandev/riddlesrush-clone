#!/usr/bin/env node

/**
 * Riddle File Content Generator
 *
 * Fills empty riddle files with original riddle content.
 * Hub pages get 8-12 riddles, individual files get 1 riddle each.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const RIDDLES_DIR = path.resolve("content/riddles");
const CATEGORIES_DIR = path.resolve("content/categories");
const TODAY = new Date().toISOString().split("T")[0];

// ─── Riddle Libraries by Type ─────────────────────────────────────────────────

const RIDDLE_SETS = {
  default: [
    { q: "What has hands but can't clap?", a: "A clock" },
    { q: "What has a head and a tail but no body?", a: "A coin" },
    { q: "What can you catch but not throw?", a: "A cold" },
    { q: "What has keys but no locks?", a: "A piano" },
    { q: "What gets wetter the more it dries?", a: "A towel" },
    { q: "What has one eye but cannot see?", a: "A needle" },
    { q: "What can travel around the world while staying in a corner?", a: "A stamp" },
    { q: "What has a neck but no head?", a: "A bottle" },
    { q: "What has teeth but cannot bite?", a: "A comb" },
    { q: "What comes once in a minute, twice in a moment, but never in a thousand years?", a: "The letter M" },
    { q: "What is full of holes but still holds water?", a: "A sponge" },
    { q: "What has a thumb and four fingers but is not alive?", a: "A glove" },
  ],

  tricky: [
    { q: "What word becomes shorter when you add two letters to it?", a: "Short" },
    { q: "What disappears as soon as you say its name?", a: "Silence" },
    { q: "What is always coming but never arrives?", a: "Tomorrow" },
    { q: "What has no beginning, no end, and nothing in between?", a: "A circle" },
    { q: "What belongs to you but is used more by others?", a: "Your name" },
    { q: "What is it that given one, you'll have either two or none?", a: "A choice" },
    { q: "What can you sit in but never stand in?", a: "Traffic" },
    { q: "What is always running but never moves?", a: "Water" },
    { q: "What is black when it is clean and white when it is dirty?", a: "A chalkboard" },
    { q: "What has many rings but no fingers?", a: "A tree trunk" },
    { q: "What can you hold without using your hands?", a: "Your breath" },
    { q: "What is it that you cannot hold for ten seconds even though it's lighter than a feather?", a: "Your breath" },
  ],

  easy: [
    { q: "What gets wetter the more it dries?", a: "A towel" },
    { q: "What has a head and a tail but no body?", a: "A coin" },
    { q: "What can you catch but not throw?", a: "A cold" },
    { q: "What has hands but can't clap?", a: "A clock" },
    { q: "What has a neck but no head?", a: "A bottle" },
    { q: "What is full of holes but still holds water?", a: "A sponge" },
    { q: "What has teeth but cannot bite?", a: "A comb" },
    { q: "What can travel around the world while staying in a corner?", a: "A stamp" },
    { q: "What has one eye but cannot see?", a: "A needle" },
    { q: "What has keys but no locks?", a: "A piano" },
    { q: "What has a thumb and four fingers but is not alive?", a: "A glove" },
    { q: "What gets smaller every time it takes a bath?", a: "A bar of soap" },
  ],

  kids: [
    { q: "What has a head and a tail but no body?", a: "A coin" },
    { q: "What can you catch but not throw?", a: "A cold" },
    { q: "What has hands but can't clap?", a: "A clock" },
    { q: "What gets wetter the more it dries?", a: "A towel" },
    { q: "What has a neck but no head?", a: "A bottle" },
    { q: "What is full of holes but still holds water?", a: "A sponge" },
    { q: "What has teeth but cannot bite?", a: "A comb" },
    { q: "What has one eye but cannot see?", a: "A needle" },
    { q: "What has keys but no locks?", a: "A piano" },
    { q: "What can travel around the world while staying in a corner?", a: "A stamp" },
    { q: "What has a thumb and four fingers but is not alive?", a: "A glove" },
    { q: "What gets smaller every time it takes a bath?", a: "A bar of soap" },
  ],

  adults: [
    { q: "What word becomes shorter when you add two letters to it?", a: "Short" },
    { q: "What disappears as soon as you say its name?", a: "Silence" },
    { q: "What is always coming but never arrives?", a: "Tomorrow" },
    { q: "What has no beginning, no end, and nothing in between?", a: "A circle" },
    { q: "What belongs to you but is used more by others?", a: "Your name" },
    { q: "What is it that given one, you'll have either two or none?", a: "A choice" },
    { q: "What can you sit in but never stand in?", a: "Traffic" },
    { q: "What is always running but never moves?", a: "Water" },
    { q: "What has many rings but no fingers?", a: "A tree trunk" },
    { q: "What can you hold without using your hands?", a: "Your breath" },
    { q: "What has a heart that doesn't beat?", a: "An artichoke" },
    { q: "What has a head and a tail but no body?", a: "A coin" },
  ],

  hard: [
    { q: "What word becomes shorter when you add two letters to it?", a: "Short" },
    { q: "What disappears as soon as you say its name?", a: "Silence" },
    { q: "What is always coming but never arrives?", a: "Tomorrow" },
    { q: "What has no beginning, no end, and nothing in between?", a: "A circle" },
    { q: "What belongs to you but is used more by others?", a: "Your name" },
    { q: "What is it that given one, you'll have either two or none?", a: "A choice" },
    { q: "What can you sit in but never stand in?", a: "Traffic" },
    { q: "What is always running but never moves?", a: "Water" },
    { q: "What has many rings but no fingers?", a: "A tree trunk" },
    { q: "What can you hold without using your hands?", a: "Your breath" },
    { q: "What has a heart that doesn't beat?", a: "An artichoke" },
    { q: "What is light as a feather but the strongest person can't hold it for more than a minute?", a: "Your breath" },
  ],

  funny: [
    { q: "What do you call a snowman with a six-pack?", a: "An abdominal snowman" },
    { q: "What do elves learn in school?", a: "The elf-abet" },
    { q: "What do you get when you cross a vampire with a snowman?", a: "Frostbite" },
    { q: "What is a Christmas tree's favorite candy?", a: "O-ornaments" },
    { q: "Why was the Christmas tree so bad at knitting?", a: "Because it always dropped its needles" },
    { q: "What do you call a dog that works at a mall?", a: "A mall-y" },
    { q: "What do ghosts serve for dessert?", a: "Boo-berry pie" },
    { q: "Why did the turkey join the band?", a: "Because it had the drumsticks" },
    { q: "What do you call a reindeer with no eyes?", a: "No eye-deer" },
    { q: "What is Santa's favorite type of music?", a: "Wrap music" },
    { q: "What do you get if you eat Christmas decorations?", a: "Tinsel-itis" },
    { q: "What do snowmen eat for breakfast?", a: "Frosted Flakes" },
  ],

  "what-am-i": [
    { q: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", a: "A map" },
    { q: "The more you take, the more you leave behind. What am I?", a: "Footsteps" },
    { q: "I fly all day but I never go anywhere. What am I?", a: "A flag" },
    { q: "I have a head and a tail but no body. What am I?", a: "A coin" },
    { q: "I can be cracked, I can be made. I can be told, I can be played. What am I?", a: "A joke" },
    { q: "I have keys but no locks. I have space but no room. You can enter but can't go outside. What am I?", a: "A keyboard" },
    { q: "I am always running but never move. What am I?", a: "Water" },
    { q: "I have hands but I can't clap. What am I?", a: "A clock" },
    { q: "I have a face but no eyes. I have hands but no arms. What am I?", a: "A clock" },
    { q: "I get smaller every time I take a bath. What am I?", a: "A bar of soap" },
    { q: "I am full of holes but I can still hold water. What am I?", a: "A sponge" },
    { q: "I am light as a feather but even the strongest person can't hold me for long. What am I?", a: "Breath" },
  ],

  riddles: [
    { q: "What has hands but can't clap?", a: "A clock" },
    { q: "What has a head and a tail but no body?", a: "A coin" },
    { q: "What can you catch but not throw?", a: "A cold" },
    { q: "What has keys but no locks?", a: "A piano" },
    { q: "What gets wetter the more it dries?", a: "A towel" },
    { q: "What has one eye but cannot see?", a: "A needle" },
    { q: "What can travel around the world while staying in a corner?", a: "A stamp" },
    { q: "What has a neck but no head?", a: "A bottle" },
    { q: "What has teeth but cannot bite?", a: "A comb" },
    { q: "What comes once in a minute, twice in a moment, but never in a thousand years?", a: "The letter M" },
    { q: "What is full of holes but still holds water?", a: "A sponge" },
    { q: "What has a thumb and four fingers but is not alive?", a: "A glove" },
  ],

  "brain-teasers": [
    { q: "What word becomes shorter when you add two letters to it?", a: "Short" },
    { q: "What disappears as soon as you say its name?", a: "Silence" },
    { q: "What is always coming but never arrives?", a: "Tomorrow" },
    { q: "What has no beginning, no end, and nothing in between?", a: "A circle" },
    { q: "What belongs to you but is used more by others?", a: "Your name" },
    { q: "What is it that given one, you'll have either two or none?", a: "A choice" },
    { q: "What can you sit in but never stand in?", a: "Traffic" },
    { q: "What is always running but never moves?", a: "Water" },
    { q: "What has many rings but no fingers?", a: "A tree trunk" },
    { q: "What can you hold without using your hands?", a: "Your breath" },
    { q: "What has a heart that doesn't beat?", a: "An artichoke" },
    { q: "What is light as a feather but the strongest person can't hold it for more than a minute?", a: "Your breath" },
  ],

  couples: [
    { q: "What belongs to you but is used more by your partner?", a: "Your name" },
    { q: "What has a head and a tail but no body at home?", a: "A coin" },
    { q: "What can you hold without using your hands?", a: "Your partner's hand" },
    { q: "What is always coming but never arrives in love?", a: "The perfect moment" },
    { q: "What has many rings but no fingers?", a: "A tree trunk" },
    { q: "What can you keep after giving to someone?", a: "Your word" },
    { q: "What is always in front of you but can't be seen?", a: "The future together" },
    { q: "What has a heart but no blood?", a: "An artichoke" },
    { q: "What can fill a room but takes up no space?", a: "Love" },
    { q: "What is easy to get into but hard to get out of?", a: "A relationship" },
    { q: "What has a tongue but cannot talk?", a: "A shoe" },
    { q: "What gets smaller every time it takes a bath?", a: "A bar of soap" },
  ],

  christmas: [
    { q: "What do you call a snowman with a six-pack?", a: "An abdominal snowman" },
    { q: "What do elves learn in school?", a: "The elf-abet" },
    { q: "What do you get when you cross a vampire with a snowman?", a: "Frostbite" },
    { q: "What is a Christmas tree's favorite candy?", a: "O-ornaments" },
    { q: "Why was the Christmas tree so bad at knitting?", a: "Because it always dropped its needles" },
    { q: "What do you call a dog that works at a mall?", a: "A mall-y" },
    { q: "What do ghosts serve for dessert?", a: "Boo-berry pie" },
    { q: "Why did the turkey join the band?", a: "Because it had the drumsticks" },
    { q: "What do you call a reindeer with no eyes?", a: "No eye-deer" },
    { q: "What is Santa's favorite type of music?", a: "Wrap music" },
    { q: "What do you get if you eat Christmas decorations?", a: "Tinsel-itis" },
    { q: "What do snowmen eat for breakfast?", a: "Frosted Flakes" },
  ],

  halloween: [
    { q: "What do ghosts serve for dessert?", a: "Boo-berry pie" },
    { q: "Why are mummies such good fans?", a: "Because they're always wrapping things up" },
    { q: "What do you call a witch who lives at the beach?", a: "A sand-witch" },
    { q: "Why did the ghost go to the party?", a: "Because he heard it was going to be a blast" },
    { q: "What is a vampire's favorite fruit?", a: "A blood orange" },
    { q: "What do you get when you cross a ghost with a dog?", a: "A scarecrow" },
    { q: "Why did the skeleton go to the party alone?", a: "Because he had no body to go with" },
    { q: "What do you call a haunted chicken?", a: "A poultry-geist" },
    { q: "Why do ghosts love riding in elevators?", a: "Because they love raising their spirits" },
    { q: "What do skeletons order at a restaurant?", a: "Spare ribs" },
    { q: "What is a ghost's favorite room in a house?", a: "The living room" },
    { q: "Why are ghosts bad at lying?", a: "Because you can see right through them" },
  ],

  "valentines-day": [
    { q: "What do you call a very small valentine?", a: "A valen-tiny" },
    { q: "What did the paper heart say to the thumbtack?", a: "You really pierce my heart" },
    { q: "What did the stamp say to the envelope on Valentine's Day?", a: "I'm stuck on you" },
    { q: "What do you call a love letter written on a piece of paper?", a: "A note-orious declaration of love" },
    { q: "Why was the math book sad on Valentine's Day?", a: "Because it had too many problems" },
    { q: "What do you call a robot that's always in love?", a: "A Romeo-bot" },
    { q: "What did one heart say to the other heart on Valentine's Day?", a: "I'm so glad we beat as one" },
    { q: "What is a vampire's favorite holiday?", a: "Valentine's Day" },
    { q: "What did the pencil say to the paper on Valentine's Day?", a: "You're my sharpie heart" },
    { q: "What do you call a very romantic soup?", a: "A love stew" },
    { q: "Why did the girl bring a ladder to the bar?", a: "Because she heard the drinks were on the house" },
    { q: "What did the boy squirrel say to the girl squirrel on Valentine's Day?", a: "You're nuts and I'm wild about you" },
  ],

  "easter": [
    { q: "What do you call a bunny with lint on its ears?", a: "A dust bunny" },
    { q: "Why is a bunny the luckiest animal?", a: "Because it has a cotton tail" },
    { q: "What do you call a mischievous egg?", a: "A practical yolker" },
    { q: "Why did the Easter egg hide?", a: "Because it was a little chicken" },
    { q: "What do you call a rabbit who tells jokes?", a: "A funny bunny" },
    { q: "What do you get when you cross a rabbit with a spider?", a: "A webby rabbit" },
    { q: "Why was the Easter bunny so upset?", a: "Because he had a bad hare day" },
    { q: "What do you call a room full of Easter eggs?", a: "An egg-stravaganza" },
    { q: "What did the Easter egg say to the Easter bunny?", a: "You crack me up" },
    { q: "Why do Easter eggs hide?", a: "Because they're a little chicken" },
    { q: "What do you call a group of rabbits walking backward?", a: "A receding hare-line" },
    { q: "What's the difference between a crazy rabbit and a counterfeit bill?", a: "One is a mad buck and the other is a bad buck" },
  ],

  "thanksgiving": [
    { q: "Why did the turkey join the band?", a: "Because it had the drumsticks" },
    { q: "What do you get when you cross a turkey with a ghost?", a: "A poultry-geist" },
    { q: "What did the turkey say on Thanksgiving?", a: "I'm so stuffed" },
    { q: "Why do turkeys never tell jokes?", a: "Because they'd crack each other up" },
    { q: "What is a turkey's favorite holiday?", a: "Thanks-taking" },
    { q: "Why did the cranberry turn red?", a: "Because it saw the turkey dressing" },
    { q: "What do you call a running turkey?", a: "Fast food" },
    { q: "What did the sweet potato say to the turkey?", a: "I'm yam-azing and you know it" },
    { q: "Why do pilgrims wear hats?", a: "Because they pack their stuff in it" },
    { q: "What do you call a turkey the day after Thanksgiving?", a: "Lucky" },
    { q: "Why did the turkey cross the road?", a: "To prove it wasn't chicken" },
    { q: "What's the best thing to put on a Thanksgiving turkey?", a: "Your seatbelt" },
  ],

  adults: [
    { q: "What word becomes shorter when you add two letters to it?", a: "Short" },
    { q: "What disappears as soon as you say its name?", a: "Silence" },
    { q: "What is always coming but never arrives?", a: "Tomorrow" },
    { q: "What has no beginning, no end, and nothing in between?", a: "A circle" },
    { q: "What belongs to you but is used more by others?", a: "Your name" },
    { q: "What is it that given one, you'll have either two or none?", a: "A choice" },
    { q: "What can you sit in but never stand in?", a: "Traffic" },
    { q: "What is always running but never moves?", a: "Water" },
    { q: "What has many rings but no fingers?", a: "A tree trunk" },
    { q: "What can you hold without using your hands?", a: "Your breath" },
    { q: "What has a heart that doesn't beat?", a: "An artichoke" },
    { q: "What is light as a feather but the strongest person can't hold it for more than a minute?", a: "Your breath" },
  ],

  "math-riddles": [
    { q: "What has a head and a tail but no body? (Answer is a number)", a: "2 (a head = 2 dots, a tail = 1 dot on a die)" },
    { q: "I am an odd number. Take away a letter and I become even. What number am I?", a: "Seven" },
    { q: "What has the same number of letters in the alphabet as there are days in a year?", a: "The alphabet itself (26 letters... actually a trick question!)" },
    { q: "If there are 3 apples and you take away 2, how many apples do you have?", a: "You have 2 apples (the ones you took)" },
    { q: "What number multiplied by itself equals 123456789?", a: "No whole number (it's between 11111 and 11112)" },
    { q: "What is the next number: 1, 11, 21, 1211, 111221, ...?", a: "312211 (read the digits of the previous number)" },
    { q: "What number is the same as double 55?", a: "110" },
    { q: "How many sides does a circle have?", a: "Two (inside and outside)" },
    { q: "What has the same answer in math as the answer to this riddle?", a: "The riddle itself" },
    { q: "If you have 10 fish and 3 drown, how many are left?", a: "10 (fish can't drown)" },
    { q: "What is half of 2 plus 2?", a: "3 (2/2 + 2 = 3)" },
    { q: "What number looks the same upside down?", a: "69" },
  ],

  "math": [
    { q: "What number multiplied by itself equals 123456789?", a: "No whole number (it's between 11111 and 11112)" },
    { q: "What is the next number: 1, 11, 21, 1211, 111221, ...?", a: "312211 (read the digits of the previous number)" },
    { q: "If there are 3 apples and you take away 2, how many apples do you have?", a: "You have 2 apples (the ones you took)" },
    { q: "How many sides does a circle have?", a: "Two (inside and outside)" },
    { q: "What number looks the same upside down?", a: "69" },
    { q: "What is half of 2 plus 2?", a: "3 (2/2 + 2 = 3)" },
    { q: "I am an odd number. Take away a letter and I become even. What number am I?", a: "Seven" },
    { q: "If you have 10 fish and 3 drown, how many are left?", a: "10 (fish can't drown)" },
    { q: "What has the same number of letters in the alphabet as there are days in a year?", a: "The alphabet itself (26 letters... actually a trick question!)" },
    { q: "What is the next number: 2, 3, 5, 7, 11, ...?", a: "13 (prime numbers)" },
    { q: "What number is always afraid of the number 7?", a: "Number 9 (because 7 8 9 = seven ate nine)" },
    { q: "What has the same answer in math as the answer to this riddle?", a: "The riddle itself" },
  ],

  love: [
    { q: "What belongs to you but is used more by your partner?", a: "Your name" },
    { q: "What has a head and a tail but no body at home?", a: "A coin" },
    { q: "What can you hold without using your hands?", a: "Your partner's hand" },
    { q: "What is always coming but never arrives in love?", a: "The perfect moment" },
    { q: "What has many rings but no fingers?", a: "A tree trunk" },
    { q: "What can you keep after giving to someone?", a: "Your word" },
    { q: "What is always in front of you but can't be seen?", a: "The future together" },
    { q: "What has a heart but no blood?", a: "An artichoke" },
    { q: "What can fill a room but takes up no space?", a: "Love" },
    { q: "What is easy to get into but hard to get out of?", a: "A relationship" },
    { q: "What has a tongue but cannot talk?", a: "A shoe" },
    { q: "What gets smaller every time it takes a bath?", a: "A bar of soap" },
  ],

  "what-am-i-riddles": [
    { q: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", a: "A map" },
    { q: "The more you take, the more you leave behind. What am I?", a: "Footsteps" },
    { q: "I fly all day but I never go anywhere. What am I?", a: "A flag" },
    { q: "I have a head and a tail but no body. What am I?", a: "A coin" },
    { q: "I can be cracked, I can be made. I can be told, I can be played. What am I?", a: "A joke" },
    { q: "I have keys but no locks. I have space but no room. You can enter but can't go outside. What am I?", a: "A keyboard" },
    { q: "I am always running but never move. What am I?", a: "Water" },
    { q: "I have hands but I can't clap. What am I?", a: "A clock" },
    { q: "I have a face but no eyes. I have hands but no arms. What am I?", a: "A clock" },
    { q: "I get smaller every time I take a bath. What am I?", a: "A bar of soap" },
    { q: "I am full of holes but I can still hold water. What am I?", a: "A sponge" },
    { q: "I am light as a feather but even the strongest person can't hold me for long. What am I?", a: "Breath" },
  ],

  "riddles-with-answers": [
    { q: "What has hands but can't clap?", a: "A clock" },
    { q: "What has a head and a tail but no body?", a: "A coin" },
    { q: "What can you catch but not throw?", a: "A cold" },
    { q: "What has keys but no locks?", a: "A piano" },
    { q: "What gets wetter the more it dries?", a: "A towel" },
    { q: "What has one eye but cannot see?", a: "A needle" },
    { q: "What can travel around the world while staying in a corner?", a: "A stamp" },
    { q: "What has a neck but no head?", a: "A bottle" },
    { q: "What has teeth but cannot bite?", a: "A comb" },
    { q: "What comes once in a minute, twice in a moment, but never in a thousand years?", a: "The letter M" },
    { q: "What is full of holes but still holds water?", a: "A sponge" },
    { q: "What has a thumb and four fingers but is not alive?", a: "A glove" },
  ],
};

// ─── Helper Functions ─────────────────────────────────────────────────────────

function getRiddleSet(slug) {
  // Try exact match first
  if (RIDDLE_SETS[slug]) return RIDDLE_SETS[slug];

  // Try partial match
  for (const [key, set] of Object.entries(RIDDLE_SETS)) {
    if (slug.includes(key) || key.includes(slug)) return set;
  }

  // Default
  return RIDDLE_SETS.default;
}

function isHubPage(content) {
  // Hub pages have multiple ## N. sections
  const matches = content.match(/^## \d+[.)]\s/gm);
  return matches && matches.length > 3;
}

// ─── Main Script ──────────────────────────────────────────────────────────────

function main() {
  console.log("🎯 Riddle Content Generator");
  console.log("━".repeat(50));

  const files = fs.readdirSync(RIDDLES_DIR).filter((f) => f.endsWith(".md"));
  console.log(`📁 Found ${files.length} riddle files`);

  let updated = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(RIDDLES_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter, content } = matter(raw);

    // Check if this file already has riddles
    if (isHubPage(content)) {
      skipped++;
      continue;
    }

    const slug = frontmatter.slug || file.replace(".md", "");
    const riddleSet = getRiddleSet(slug);

    // Determine if this is a hub page or individual riddle file
    // Hub pages typically have slugs like "tricky-riddles", "easy-riddles"
    // Individual riddles have shorter slugs
    const isHub = slug.includes("-riddles") || slug.includes("riddles-") || slug === "riddles";

    let newContent = "";

    if (isHub) {
      // Hub page: add 8-12 riddles
      const selected = riddleSet.slice(0, 10);
      newContent += `\n${frontmatter.description || "A collection of fun riddles to challenge your brain."}\n\n`;
      selected.forEach((riddle, i) => {
        newContent += `## ${i + 1}. ${riddle.q}\n\n`;
        newContent += `**Answer:** ${riddle.a}\n\n`;
      });
    } else {
      // Individual riddle file: add 1 riddle
      const seed = slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
      const riddle = riddleSet[seed % riddleSet.length];
      newContent += `\n${frontmatter.description || "A fun riddle to challenge your brain."}\n\n`;
      newContent += `## ${riddle.q}\n\n`;
      newContent += `**Answer:** ${riddle.a}\n`;
    }

    // Rebuild the markdown file
    const frontmatterStr = matter.stringify("", frontmatter).trimEnd();
    fs.writeFileSync(filePath, frontmatterStr + "\n" + newContent, "utf-8");
    updated++;
  }

  console.log(`\n✅ Done!`);
  console.log(`   Updated: ${updated} riddle files`);
  console.log(`   Skipped: ${skipped} files (already have content)`);
  console.log(`   Total:   ${files.length} files`);

  // Also update category files
  console.log("\n📁 Updating category files...");
  const catFiles = fs.readdirSync(CATEGORIES_DIR).filter((f) => f.endsWith(".md"));
  let catUpdated = 0;

  for (const file of catFiles) {
    const filePath = path.join(CATEGORIES_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter, content } = matter(raw);

    // Skip if already has body content
    if (content.trim().length > 50) {
      skipped++;
      continue;
    }

    const catName = frontmatter.name || file.replace(".md", "");
    const catDescription = frontmatter.description || `Browse our collection of ${catName.toLowerCase()} riddles and brain teasers.`;

    let newContent = `\n${catDescription}\n\n`;
    newContent += `## About ${catName}\n\n`;
    newContent += `${catName} is one of our most popular categories, featuring a wide range of riddles suitable for all ages and skill levels. Whether you're looking for quick brain teasers or longer puzzle challenges, this collection has something for everyone.\n\n`;
    newContent += `## What You'll Find\n\n`;
    newContent += `- **Family-friendly riddles** perfect for kids and adults\n`;
    newContent += `- **Brain teasers** that challenge your thinking\n`;
    newContent += `- **Fun puzzles** for parties and gatherings\n`;
    newContent += `- **New riddles** added regularly\n\n`;
    newContent += `## How to Use These Riddles\n\n`;
    newContent += `These riddles are perfect for:\n\n`;
    newContent += `- Family game nights\n`;
    newContent += `- Classroom activities\n`;
    newContent += `- Party entertainment\n`;
    newContent += `- Solo brain training\n`;
    newContent += `- Social media sharing\n\n`;
    newContent += `Browse the collections below to find the perfect riddles for your needs!`;

    const frontmatterStr = matter.stringify("", frontmatter).trimEnd();
    fs.writeFileSync(filePath, frontmatterStr + "\n" + newContent, "utf-8");
    catUpdated++;
  }

  console.log(`   Updated: ${catUpdated} category files`);
}

main();
