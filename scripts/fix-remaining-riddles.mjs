#!/usr/bin/env node

/**
 * Fix remaining individual riddle files that have truncated content.
 * These files have truncated descriptions where the answer is partially visible but cut off.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const RIDDLES_DIR = path.resolve("content/riddles");

// Manual fixes for files where the answer was truncated
const MANUAL_FIXES = {
  "a-black-dog-stands-in-the-middle-of-an-intersecton-in-a-town-painted-bla.md": {
    question: "A black dog stands in the middle of an intersection in a town painted black. None of the streetlights work, and there is no moon. A car comes racing around the corner and screeches to a halt just in time. How did the driver know to stop?",
    answer: "It was daytime",
  },
  "a-hiker-comes-to-a-fork-in-the-road-and-doesn-t-know-which-way-to-go-to.md": {
    question: "A hiker comes to a fork in the road and doesn't know which way to go to reach his destination. There are two men at the fork, one always tells the truth and the other always lies. The hiker can ask only one question to one man. What question should he ask?",
    answer: "Ask either man: 'If I asked the other man which way to go, what would he say?' Then go the opposite way.",
  },
  "a-horse-travels-a-certain-distance-each-day-strangely-enough-two-of-its.md": {
    question: "A horse travels a certain distance each day. Strangely enough, two of its legs travel 30 miles each day, and the other two also travel 30 miles each day. How is this possible?",
    answer: "The horse is riding in a trailer — the horse walks 30 miles on two legs while being transported, and the other two legs also cover 30 miles in the trailer.",
  },
  "a-large-truck-is-crossing-a-bridge-1-mile-long-the-bridge-can-only-hold.md": {
    question: "A large truck is crossing a bridge 1 mile long. The bridge can only hold 14,000 lbs, which is the exact weight of the truck. The truck makes it halfway across the bridge and stops. A bird lands on the truck. Does the bridge collapse?",
    answer: "No, the bridge does not collapse. The truck had burned enough fuel by the halfway point to be lighter than 14,000 lbs, so the bird's weight doesn't cause it to exceed the limit.",
  },
  "a-man-and-a-woman-were-driving-in-their-car-when-it-broke-down-the-man-d.md": {
    question: "A man and a woman were driving in their car when it broke down. The man decided to go for help while the woman stayed with the car. While he was gone, the woman was killed. Who killed her?",
    answer: "No one — the woman died of natural causes or an accident while alone. The riddle is designed to make you assume foul play.",
  },
  "a-man-condemned-to-death-has-the-option-of-picking-one-of-the-mentioned.md": {
    question: "A man condemned to death has the option of picking one of the mentioned three rooms. The first room is a fire, the second is assassins with guns, and the third is a pack of lions that haven't eaten in three years. Which room should he pick?",
    answer: "The third room. Lions that haven't eaten in three years would be dead.",
  },
  "a-man-is-discovered-dead-sitting-at-his-desk-alone-in-the-locked-office.md": {
    question: "A man is discovered dead sitting at his desk, alone in a locked office. There are no signs of foul play. How did he die?",
    answer: "He died of natural causes — the locked office simply means no one was with him when he died.",
  },
  "a-man-is-in-a-solid-metal-room-solid-metal-floor-ceiling-and-walls-the-o.md": {
    question: "A man is in a solid metal room — solid metal floor, ceiling, and walls. The only opening is a small, closed door. There is no way to get out. How does he escape?",
    answer: "He waits for the room to fill with water (from a leak or rain), and when the water level rises high enough, he swims up and out through the opening.",
  },
  "a-man-ordered-a-length-of-rope-by-telephone-from-his-nearest-hardware-sh.md": {
    question: "A man ordered a length of rope by telephone from his nearest hardware shop. He requested that exactly 32 feet be cut from the roll. The shopkeeper accepted the order and cut the piece of rope. But the man was very upset when it arrived. Why?",
    answer: "The shopkeeper cut 32 feet from the roll, but the man wanted a 32-foot piece to be delivered — not for the shopkeeper to cut it from the roll and deliver only the piece.",
  },
  "a-man-takes-a-barrel-that-weighs-20-pounds-and-then-puts-something-in-it.md": {
    question: "A man takes a barrel that weighs 20 pounds and then puts something in it. It now weighs less than 20 pounds. What did he put in it?",
    answer: "A hole. A hole weighs nothing and makes the barrel lighter.",
  },
  "a-man-was-found-murdered-on-sunday-morning-his-wife-immediately-called-t.md": {
    question: "A man was found murdered on a Sunday morning. His wife immediately called the police. The police questioned the wife and staff. The wife said she was asleep. The cook said he was preparing breakfast. The gardener said he was picking vegetables. The maid said she was getting the mail. The butler said he was cleaning the closet. The police arrested the murderer immediately. Who was it?",
    answer: "The maid. There is no mail on Sunday.",
  },
  "a-man-was-going-to-buy-a-5000-car-but-he-didn-t-pay-a-penny-for-the-car.md": {
    question: "A man was going to buy a $5000 car, but he didn't pay a penny for the car. How is this possible?",
    answer: "He paid with something other than a penny — like a check, cash, or a trade. The riddle says he didn't pay 'a penny,' not that he didn't pay at all.",
  },
  "a-man-was-shot-to-death-while-in-his-car-there-were-no-powder-marks-on-h.md": {
    question: "A man was shot to death while in his car. There were no powder marks on his clothing. How was he killed?",
    answer: "He was shot from outside the car — the window was open, or the bullet passed through the window without leaving powder marks on his clothes.",
  },
  "a-murderer-is-condemned-to-death-he-has-to-choose-between-three-rooms-th.md": {
    question: "A murderer is condemned to death. He has to choose between three rooms: the first is full of raging fire, the second has assassins with loaded guns, and the third has lions that haven't eaten in three years. Which room is safest?",
    answer: "The third room. Lions that haven't eaten in three years would be dead.",
  },
  "a-pregnant-lady-named-her-children-dominique-regis-michelle-fawn-sophie.md": {
    question: "A pregnant lady named her children Dominique, Regis, Michelle, Fawn, Sophie, and Larousse. What will she name her next child?",
    answer: "A boy. The pattern of naming doesn't determine the next child's name — it's a trick question designed to make you look for a pattern that doesn't exist.",
  },
  "a-rubber-ball-is-tossed-off-the-top-of-a-90-foot-building-every-time-it.md": {
    question: "A rubber ball is tossed off the top of a 90-foot building. Every time it hits the ground, it bounces back up to half its previous height. How high will the ball bounce on its fifth bounce?",
    answer: "2.8125 feet. After each bounce: 45 ft, 22.5 ft, 11.25 ft, 5.625 ft, 2.8125 ft.",
  },
  "a-train-just-leaves-a-station-and-enters-a-tunnel-where-is-the-best-plac.md": {
    question: "A train just leaves a station and enters a tunnel. Where is the best place for the conductor to stand?",
    answer: "In front of the train. The conductor doesn't need to be inside the tunnel — the train is already going through it.",
  },
  "a-woman-shoots-her-husband-then-she-holds-him-under-water-for-over-5-min.md": {
    question: "A woman shoots her husband, then she holds him underwater for over 5 minutes, and finally she hangs him. But 5 minutes later, they go out and enjoy a wonderful dinner together. How can this be?",
    answer: "She took a photo of him — shot with a camera, developed it in water, and hung it to dry.",
  },
  "a-woman-shot-her-husband-then-she-held-him-underwater-for-5-minutes-then.md": {
    question: "A woman shot her husband, then she held him underwater for 5 minutes, then she hung him. But 5 minutes later, they went out and had a wonderful dinner together. How can this be?",
    answer: "She took a photo of him — shot with a camera, developed it in water, and hung it to dry.",
  },
  "a-young-boy-needs-to-cross-a-bridge-that-can-only-hold-100-pounds-of-wei.md": {
    question: "A young boy needs to cross a bridge that can only hold 100 pounds of weight. The boy weighs 99 pounds and he has a ball that weighs 1 pound. How can he get across the bridge?",
    answer: "He can carry the ball and walk across — 99 + 1 = 100 pounds, which is exactly the bridge's weight limit.",
  },
};

let fixedCount = 0;

for (const [file, fix] of Object.entries(MANUAL_FIXES)) {
  const filePath = path.join(RIDDLES_DIR, file);

  if (!fs.existsSync(filePath)) {
    console.log(`  SKIP (file not found): ${file}`);
    continue;
  }

  const { question, answer } = fix;

  const newFm = {
    title: question,
    slug: file.replace(".md", ""),
    description: `${question} The answer is ${answer.toLowerCase()}. Challenge your brain with this classic riddle and test your problem-solving skills.`,
    emoji: "🧩",
    category: "Tricky Riddles",
  };

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
  console.log(`    Answer: ${answer}`);
}

console.log(`\n✅ Fixed ${fixedCount} remaining riddle files`);
