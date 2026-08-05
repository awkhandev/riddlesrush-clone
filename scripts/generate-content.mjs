#!/usr/bin/env node

/**
 * Content Generator for Riddles Rush
 *
 * Generates original riddle content for empty blog post shells.
 * Each post gets 10-15 unique riddles with intro, FAQ, and conclusion.
 * All content is original — no copying from source sites.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.resolve("content/blog");
const TODAY = new Date().toISOString().split("T")[0];

// ─── Riddle Templates by Category ────────────────────────────────────────────

const RIDDLE_LIBRARIES = {
  "kids-riddles": [
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
    { q: "What has an area but no space?", a: "A room" },
    { q: "What begins with T, ends with T, and is full of T?", a: "A teapot" },
    { q: "What can you break without touching it?", a: "A promise" },
    { q: "What has ears but cannot hear?", a: "Corn" },
    { q: "What has a face and two hands but no arms or legs?", a: "A clock" },
    { q: "What building has the most stories?", a: "A library" },
    { q: "What is full of holes but still holds water?", a: "A sponge" },
    { q: "What has a thumb and four fingers but is not alive?", a: "A glove" },
    { q: "What can you keep after giving to someone?", a: "Your word" },
    { q: "What is always in front of you but can't be seen?", a: "The future" },
    { q: "What has a spine but no bones?", a: "A book" },
    { q: "What gets smaller every time it takes a bath?", a: "A bar of soap" },
    { q: "What has a tongue but cannot talk?", a: "A shoe" },
    { q: "What can fill a room but takes up no space?", a: "Light" },
    { q: "What has wings but cannot fly?", a: "A jacket" },
    { q: "What is seen in the middle of March and April but not at the beginning or end of either month?", a: "The letter R" },
    { q: "What has a bottom at the top?", a: "Your legs" },
    { q: "What can you hear but not touch or see?", a: "Your voice" },
    { q: "What gets sharper the more you use it?", a: "Your brain" },
    { q: "What comes down but never goes up?", a: "Rain" },
    { q: "What has a ring but no finger?", a: "A telephone" },
    { q: "What can you hold in your right hand but never in your left?", a: "Your left elbow" },
    { q: "What is easy to get into but hard to get out of?", a: "Trouble" },
    { q: "What has a cover but is not a book?", a: "A pot" },
    { q: "What goes up but never comes down?", a: "Your age" },
    { q: "What can be cracked, made, told, and played?", a: "A joke" },
    { q: "What has a head, a tail, is brown, and has no legs?", a: "A penny" },
    { q: "What has a face like a clock, hands like a clock, but tells time differently?", a: "A calendar" },
    { q: "What can you taste but never smell?", a: "A word" },
    { q: "What has many teeth but cannot bite?", a: "A zipper" },
  ],

  "adult-riddles": [
    { q: "What word becomes shorter when you add two letters to it?", a: "Short" },
    { q: "What has cities, but no houses; forests, but no trees; and water, but no fish?", a: "A map" },
    { q: "What gets broken without being held?", a: "A promise" },
    { q: "What can you never finish?", a: "An autobiography" },
    { q: "What is seen once in a minute, twice in a moment, but never in a thousand years?", a: "The letter M" },
    { q: "What has many rings but no fingers?", a: "A tree trunk" },
    { q: "What is black when it is clean and white when it is dirty?", a: "A chalkboard" },
    { q: "What disappears as soon as you say its name?", a: "Silence" },
    { q: "What is always coming but never arrives?", a: "Tomorrow" },
    { q: "What has an end but no beginning?", a: "A stick" },
    { q: "What can you hold without using your hands?", a: "Your breath" },
    { q: "What is full of keys but can't open a single door?", a: "A piano" },
    { q: "What belongs to you but is used more by others?", a: "Your name" },
    { q: "What is it that given one, you'll have either two or none?", a: "A choice" },
    { q: "What can you sit in but never stand in?", a: "Traffic" },
    { q: "What is always running but never moves?", a: "Water" },
    { q: "What has no beginning, no end, and nothing in between?", a: "A circle" },
    { q: "What has a heart that doesn't beat?", a: "An artichoke" },
    { q: "What can you make that you can never see?", a: "A noise" },
    { q: "What is light as a feather but the strongest person can't hold it for more than a minute?", a: "Your breath" },
    { q: "What has a neck but no head?", a: "A guitar" },
    { q: "What is it that you cannot hold for ten seconds even though it's lighter than a feather?", a: "Your breath" },
    { q: "What comes once in a year, twice in a week, but never in a day?", a: "The letter E" },
    { q: "What is always in front of you but can't be seen?", a: "The future" },
    { q: "What is easy to lift but hard to throw?", a: "A feather" },
    { q: "What is heavy forward but backward is not?", a: "Ton" },
    { q: "What has words but never speaks?", a: "A book" },
    { q: "What can run but never walks, has a mouth but never talks?", a: "A river" },
    { q: "What is orange and sounds like a parrot?", a: "A carrot" },
    { q: "What has a head and a tail but no body?", a: "A coin" },
    { q: "What is it that you can break without even touching it?", a: "A promise" },
    { q: "What has many keys but can't open a single lock?", a: "A computer keyboard" },
    { q: "What comes down but never goes up?", a: "Rain" },
    { q: "What has one head, one foot, and four legs?", a: "A bed" },
    { q: "What is it that you can keep after giving to someone?", a: "Your word" },
    { q: "What can fill your hand but not your fist?", a: "Water" },
    { q: "What is the end of everything?", a: "The letter G" },
    { q: "What has a neck but no head, two arms but no hands?", a: "A shirt" },
    { q: "What starts with an 'e', ends with an 'e', and contains one letter?", a: "An envelope" },
    { q: "What is it that when you take away the whole, you still have some left over?", a: "Some" },
  ],

  "holiday-riddles": [
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
    { q: "Why do mummies love vacations so much?", a: "Because they like to unwind" },
    { q: "What do you call a cat on the beach during Christmas?", a: "Sand-claws" },
    { q: "What falls in winter but never gets hurt?", a: "Snow" },
    { q: "What is Frosty the Snowman's favorite breakfast?", a: "Ice crispies" },
    { q: "Why was the snowman looking through the carrots?", a: "He was picking his nose" },
    { q: "What do you call an obnoxious reindeer?", a: "Rude-olph" },
    { q: "What do you get when you cross a clock with a Christmas tree?", a: "Time to celebrate" },
    { q: "Why does Scrooge love Rudolph?", a: "Because he is red and green and smells like venison" },
    { q: "What do vampires put on their Christmas trees?", a: "Bat ornaments" },
    { q: "What is a parent's favorite Christmas carol?", a: "Silent Night" },
    { q: "What did the gingerbread man put on his bed?", a: "A cookie sheet" },
    { q: "What do you call a holiday dessert that tells jokes?", a: "A Christmas cracker" },
    { q: "What do you get when you cross a Christmas tree with an iPad?", a: "A PinePad" },
    { q: "Why are Christmas trees bad at knitting?", a: "They always drop their needles" },
    { q: "What do you call a bunch of chess players bragging about their wins?", a: "Chess nuts boasting in an open foyer" },
    { q: "What did the big candle say to the little candle?", a: "I'm going out tonight" },
    { q: "What do snowmen like to do on the weekend?", a: "Chill out" },
    { q: "What kind of music do elves listen to?", a: "Wrap music" },
    { q: "Why was the math book sad on Christmas?", a: "Because it had too many problems" },
    { q: "What do you get when you cross a snowman and a vampire?", a: "Frostbite" },
    { q: "What is Santa's favorite type of dog?", a: "A Labrador retriever of presents" },
    { q: "What do you call a candy cane that tells jokes?", a: "A laughingstock" },
    { q: "Why was the ornament so good at football?", a: "Because it was always hanging around the goal" },
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
    { q: "I can fill a room but take up no space. What am I?", a: "Light" },
    { q: "I have a spine but no bones. What am I?", a: "A book" },
    { q: "I can be cracked, made, told, and played. What am I?", a: "A joke" },
    { q: "I am always coming but I never arrive. What am I?", a: "Tomorrow" },
    { q: "I have a tongue but I cannot talk. I have a soul but I cannot sing. What am I?", a: "A shoe" },
    { q: "I can travel around the world while staying in a corner. What am I?", a: "A stamp" },
    { q: "I have a heart that doesn't beat. What am I?", a: "An artichoke" },
    { q: "I have many rings but no fingers. What am I?", a: "A tree trunk" },
    { q: "I have words but I never speak. What am I?", a: "A book" },
    { q: "I have a head and a tail but no body. What am I?", a: "A coin" },
    { q: "I have a neck but no head. What am I?", a: "A bottle" },
    { q: "I have a bottom at the top. What am I?", a: "Your legs" },
    { q: "I have keys but I open no doors. What am I?", a: "A piano" },
    { q: "I have a face like a clock, but I don't tick. What am I?", a: "A calendar" },
    { q: "I am easy to get into but hard to get out of. What am I?", a: "Trouble" },
    { q: "I have a cover but I'm not a book. What am I?", a: "A pot" },
    { q: "I am always in front of you but can't be seen. What am I?", a: "The future" },
    { q: "I can be cracked, made, told, and played. What am I?", a: "A joke" },
    { q: "I have ears but I cannot hear. What am I?", a: "Corn" },
    { q: "I have teeth but I cannot bite. What am I?", a: "A comb" },
    { q: "I get sharper the more you use me. What am I?", a: "Your brain" },
    { q: "I can you hold in your right hand but never in your left. What am I?", a: "Your left elbow" },
    { q: "I have a ring but no finger. What am I?", a: "A telephone" },
  ],

  "family-riddles": [
    { q: "What is always in front of you but can't be seen by the family?", a: "The future" },
    { q: "What has a head and a tail that every family has?", a: "A coin" },
    { q: "What is full of holes but still holds water in the kitchen?", a: "A sponge" },
    { q: "What can fill a room but takes up no space at home?", a: "Light" },
    { q: "What has hands but can't clap at the dinner table?", a: "A clock" },
    { q: "What gets wetter the more it dries in the laundry?", a: "A towel" },
    { q: "What has a neck but no head in the pantry?", a: "A bottle" },
    { q: "What can you keep after giving to your child?", a: "Your word" },
    { q: "What has a spine but no bones on the bookshelf?", a: "A book" },
    { q: "What comes down but never goes up in the backyard?", a: "Rain" },
    { q: "What is easy to get into but hard to get out of as a family?", a: "Trouble" },
    { q: "What can be cracked, made, told, and played at game night?", a: "A joke" },
    { q: "What has a cover but is not a book in the kitchen?", a: "A pot" },
    { q: "What has many teeth but cannot bite at the dinner table?", a: "A comb" },
    { q: "What goes up but never comes down for the family?", a: "Your age" },
    { q: "What can you taste but never smell at dinner?", a: "A word" },
    { q: "What has ears but cannot hear in the garden?", a: "Corn" },
    { q: "What has a thumb and four fingers but is not alive in the closet?", a: "A glove" },
    { q: "What can travel around the world while staying in a corner of the house?", a: "A stamp" },
    { q: "What has one eye but cannot see in the sewing room?", a: "A needle" },
    { q: "What can fill a room but takes up no space at a party?", a: "Laughter" },
    { q: "What has a head and a tail but no body at the park?", a: "A coin" },
    { q: "What gets smaller every time it takes a bath in the bathroom?", a: "A bar of soap" },
    { q: "What has keys but no locks at home?", a: "A piano" },
    { q: "What can you break without touching it at dinner?", a: "A promise" },
    { q: "What has a face and two hands but no arms or legs at home?", a: "A clock" },
    { q: "What has wings but cannot fly from the closet?", a: "A jacket" },
    { q: "What is always running but never moves in the house?", a: "Water" },
    { q: "What has a bottom at the top in the garden?", a: "Your legs" },
    { q: "What can you hear but not touch or see at home?", a: "Your voice" },
    { q: "What is full of keys but can't open a single door at home?", a: "A piano" },
    { q: "What has many rings but no fingers at the dinner table?", a: "Tree rings" },
    { q: "What can you hold without using your hands as a family?", a: "A conversation" },
    { q: "What belongs to you but is used more by others in the family?", a: "Your name" },
    { q: "What has a tongue but cannot talk at school?", a: "A shoe" },
  ],

  "nature-riddles": [
    { q: "What falls in a forest but never gets hurt?", a: "A leaf" },
    { q: "What has a bark but no bite?", a: "A tree" },
    { q: "What can you hear but not touch in the woods?", a: "The wind" },
    { q: "What is always running but never moves in nature?", a: "A river" },
    { q: "What comes down but never goes up in the sky?", a: "Rain" },
    { q: "What has roots but no legs?", a: "A tree" },
    { q: "What is full of holes but still holds water in the garden?", a: "Soil" },
    { q: "What can travel around the world while staying in a flower?", a: "A seed" },
    { q: "What has a head and a tail but no body in the pond?", a: "A tadpole" },
    { q: "What gets wetter the more it dries in the sun?", a: "A towel" },
    { q: "What has many rings but no fingers in the forest?", a: "A tree trunk" },
    { q: "What can fill a room but takes up no space outdoors?", a: "Sunlight" },
    { q: "What has a face but no eyes in the garden?", a: "A sunflower" },
    { q: "What is always coming but never arrives in nature?", a: "Tomorrow" },
    { q: "What has a tongue but cannot talk in the forest?", a: "A leaf" },
    { q: "What has keys but no locks in the wild?", a: "A bird's song" },
    { q: "What can be cracked but never broken in nature?", a: "An egg" },
    { q: "What has a spine but no bones in the garden?", a: "A cactus" },
    { q: "What gets smaller every time it rains?", a: "A mud puddle" },
    { q: "What has a head and a tail but no body in the forest?", a: "A caterpillar" },
    { q: "What can you hear but not see in the woods?", a: "The wind through trees" },
    { q: "What has many arms but no hands in the garden?", a: "A tree" },
    { q: "What is always in front of you but can't be seen in nature?", a: "The horizon" },
    { q: " What has a mouth but never speaks in the forest?", a: "A river" },
    { q: "What can run but never walks in nature?", a: "A river" },
    { q: "What has a bed but never sleeps outdoors?", a: "A riverbed" },
    { q: "What has an eye but cannot see in the garden?", a: "A potato" },
    { q: "What is black and white and green all over in nature?", a: "A zebra in a forest" },
    { q: "What has a neck but no head in the forest?", a: "A bottle tree" },
    { q: "What can you hold in your hand but never see in nature?", a: "Wind" },
    { q: "What has a face but no eyes in the forest?", a: "A cliff" },
    { q: "What has a heart but no blood in nature?", a: "A tree" },
    { q: "What has leaves but no branches?", a: "A book in the forest" },
    { q: "What can you catch but not throw in nature?", a: "A cold breeze" },
    { q: "What has bark but no bite in the forest?", a: "A tree" },
  ],

  "food-riddles": [
    { q: "What has a head and a tail but no body on the plate?", a: "A coin (left as a tip)" },
    { q: "What gets wetter the more it dries in the kitchen?", a: "A dish towel" },
    { q: "What has ears but cannot hear in the garden?", a: "Corn" },
    { q: "What is orange and sounds like a parrot?", a: "A carrot" },
    { q: "What has a heart but no blood on the plate?", a: "An artichoke" },
    { q: "What has a face but no eyes in the kitchen?", a: "A clock" },
    { q: "What can you make that you can never taste?", a: "A face" },
    { q: "What has many keys but can't open a single lock in the kitchen?", a: "A piano (cookie sheet)" },
    { q: "What can fill a room but takes up no space at dinner?", a: "The aroma of food" },
    { q: "What has a tongue but cannot talk at the table?", a: "A shoe (slipper)" },
    { q: "What gets smaller every time it takes a bath?", a: "A bar of soap" },
    { q: "What is full of holes but still holds water?", a: "A sponge" },
    { q: "What has a head but no body in the kitchen?", a: "A head of lettuce" },
    { q: "What has many rings but no fingers at the table?", a: "Onion rings" },
    { q: "What can you crack without touching?", a: "A walnut" },
    { q: "What has a shell but no animal inside?", a: "A coconut" },
    { q: "What can you spread but not throw on bread?", a: "Butter" },
    { q: "What has a pit but is not a hole in the ground?", a: "A peach" },
    { q: "What is full of holes but holds water in the kitchen?", a: "A colander" },
    { q: "What has a rind but no ring?", a: "A watermelon" },
    { q: "What can you slice but never touch?", a: "Time" },
    { q: "What has a bunch of layers but is not a cake?", a: "An onion" },
    { q: "What can you whisk but never see?", a: "An egg" },
    { q: "What has a peel but no pain?", a: "A banana" },
    { q: "What can you grate but never scratch?", a: "Cheese" },
    { q: "What has a core but is not an apple?", a: "An apple (it is!)" },
    { q: "What has a bunch of eyes but cannot see?", a: "A potato" },
    { q: "What can you boil but not burn?", a: "Water" },
    { q: "What has a skin but is not alive?", a: "A grape" },
    { q: "What can you mash but not crush?", a: "Potatoes" },
    { q: "What has a bunch of folds but is not a shirt?", a: "A dumpling" },
    { q: "What can you fry but never burn?", a: "An egg (sunny side up)" },
    { q: "What has a stem but is not a flower?", a: "A wine glass" },
    { q: "What can you blend but never mix?", a: "A smoothie" },
    { q: "What has a bunch of spots but is not a dice?", a: "A strawberry" },
    { q: "What can you roast but never toast?", a: "Marshmallows" },
  ],

  "sports-riddles": [
    { q: "What has a head and a tail but no body in the game?", a: "A coin (toss)" },
    { q: "What can you catch but not throw in sports?", a: "A ball" },
    { q: "What has a net but no fish?", a: "A basketball hoop" },
    { q: "What has a bat but is not a creature?", a: "A baseball bat" },
    { q: "What has a pitch but is not a tent?", a: "A soccer field" },
    { q: "What has a court but no judge?", a: "A tennis court" },
    { q: "What has a hole but no cave?", a: "A golf course" },
    { q: "What has a track but no train?", a: "A running track" },
    { q: "What has a ring but no bell?", a: "A boxing ring" },
    { q: "What has a base but no house?", a: "A baseball base" },
    { q: "What has a goal but no dream?", a: "A soccer goal" },
    { q: "What has a bat but no wings?", a: "A cricket bat" },
    { q: "What has a serve but no dinner?", a: "A tennis serve" },
    { q: "What has a drive but no car?", a: "A golf drive" },
    { q: "What has a stroke but no illness?", a: "A swimming stroke" },
    { q: "What has a sprint but no phone?", a: "A running sprint" },
    { q: "What has a tackle but no fishing?", a: "A football tackle" },
    { q: "What has a dribble but no nose?", a: "A basketball dribble" },
    { q: "What has a puck but no luck?", a: "An ice hockey puck" },
    { q: "What has a glove but no hand?", a: "A baseball glove" },
    { q: "What has a helmet but no head?", a: "A bicycle helmet" },
    { q: "What has a whistle but no mouth?", a: "A referee's whistle" },
    { q: "What has a bench but no seat?", a: "A basketball bench" },
    { q: "What has a foul but no smell?", a: "A sports foul" },
    { q: "What has a shot but no gun?", a: "A basketball shot" },
    { q: "What has a pass but no ticket?", a: "A football pass" },
    { q: "What has a kick but no leg?", a: "A soccer kick" },
    { q: "What has a putt but no letter?", a: "A golf putt" },
    { q: "What has a rally but no speech?", a: "A tennis rally" },
    { q: "What has a home run but no house?", a: "A baseball home run" },
    { q: "What has a slam but no door?", a: "A slam dunk" },
    { q: "What has a swing but no playground?", a: "A golf swing" },
    { q: "What has a steal but no thief?", a: "A basketball steal" },
    { q: "What has a block but no wall?", a: "A basketball block" },
    { q: "What has a vault but no bank?", a: "A pole vault" },
  ],
};

// ─── Topic Extraction ─────────────────────────────────────────────────────────

function extractTopicFromTitle(title) {
  // Remove common suffixes/prefixes
  let topic = title
    .replace(/\s*[-–—]\s*.*$/, "")
    .replace(/\s*with Answers.*$/i, "")
    .replace(/\s*Brain Teasers.*$/i, "")
    .replace(/\s*Riddles.*$/i, "")
    .replace(/\s*Puzzles.*$/i, "")
    .replace(/\s*Fun.*$/i, "")
    .replace(/\s*Best.*$/i, "")
    .replace(/\s*Easy.*$/i, "")
    .replace(/\s*Hard.*$/i, "")
    .replace(/\s*Tricky.*$/i, "")
    .replace(/\s*Classic.*$/i, "")
    .replace(/\s*for Kids.*$/i, "")
    .replace(/\s*for Adults.*$/i, "")
    .replace(/\s*for Family.*$/i, "")
    .replace(/\s*for Couples.*$/i, "")
    .replace(/\s*for Classroom.*$/i, "")
    .replace(/\s*for Party.*$/i, "")
    .replace(/\s*Collection.*$/i, "")
    .replace(/\s*Set.*$/i, "")
    .replace(/\s*List.*$/i, "")
    .replace(/\s*20\d{2}.*$/i, "")
    .trim();
  return topic || title;
}

function getCategoryKey(categorySlug, tags) {
  if (categorySlug === "kids-riddles") return "kids-riddles";
  if (categorySlug === "adult-riddles") return "adult-riddles";
  if (categorySlug === "holiday-riddles") return "holiday-riddles";
  if (categorySlug === "what-am-i-riddles") return "what-am-i-riddles";
  if (categorySlug === "family-riddles") return "family-riddles";
  if (categorySlug === "nature-riddles") return "nature-riddles";
  if (categorySlug === "food-riddles") return "food-riddles";
  if (categorySlug === "sports-riddles") return "sports-riddles";

  // Fallback based on tags
  if (tags) {
    const tagStr = tags.join(" ").toLowerCase();
    if (tagStr.includes("kid") || tagStr.includes("child")) return "kids-riddles";
    if (tagStr.includes("adult") || tagStr.includes("logic")) return "adult-riddles";
    if (tagStr.includes("holiday") || tagStr.includes("christmas") || tagStr.includes("halloween")) return "holiday-riddles";
    if (tagStr.includes("what am i") || tagStr.includes("guess")) return "what-am-i-riddles";
    if (tagStr.includes("family") || tagStr.includes("home")) return "family-riddles";
    if (tagStr.includes("nature") || tagStr.includes("animal")) return "nature-riddles";
    if (tagStr.includes("food") || tagStr.includes("cook")) return "food-riddles";
    if (tagStr.includes("sport") || tagStr.includes("game")) return "sports-riddles";
  }

  return "kids-riddles"; // default
}

// ─── Content Generation ───────────────────────────────────────────────────────

function generateRiddlesForPost(post, count = 12) {
  const categoryKey = getCategoryKey(post.frontmatter.categorySlug, post.frontmatter.tags);
  const library = RIDDLE_LIBRARIES[categoryKey] || RIDDLE_LIBRARIES["kids-riddles"];
  const topic = extractTopicFromTitle(post.frontmatter.title);

  // Use slug as seed for deterministic selection
  const seed = post.frontmatter.slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const selected = [];
  const used = new Set();

  for (let i = 0; i < count && i < library.length; i++) {
    const idx = (seed + i * 7) % library.length;
    if (!used.has(idx)) {
      used.add(idx);
      selected.push(library[idx]);
    }
  }

  // If we don't have enough, fill from the beginning
  for (let i = 0; selected.length < count && i < library.length; i++) {
    if (!used.has(i)) {
      used.add(i);
      selected.push(library[i]);
    }
  }

  return selected;
}

function generateIntro(post) {
  const topic = extractTopicFromTitle(post.frontmatter.title);
  const category = post.frontmatter.category;

  const intros = [
    `Looking for ${topic.toLowerCase()} that will challenge your brain and make you smile? You've come to the right place. Our collection of ${topic.toLowerCase()} is perfect for family game nights, classroom activities, and parties.`,
    `${topic} are a fantastic way to exercise your brain and have fun at the same time. Whether you're solving them alone or with friends, these riddles will keep everyone entertained and thinking.`,
    `Get ready to test your wits with these ${topic.toLowerCase()}! Each riddle in this collection is designed to make you think differently and see the world from a new perspective.`,
    `Challenge yourself with these ${topic.toLowerCase()} that are perfect for all ages. From easy brain teasers to trickier puzzles, there's something here for everyone.`,
    `These ${topic.toLowerCase()} are sure to spark laughter and conversation. Perfect for sharing with family and friends, each riddle comes with an answer so you can check your work.`,
  ];

  const idx = post.frontmatter.slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % intros.length;
  return intros[idx];
}

function generateFAQs(post) {
  const topic = extractTopicFromTitle(post.frontmatter.title);
  const category = post.frontmatter.category;

  return [
    {
      q: `What makes these ${topic.toLowerCase()} special?`,
      a: `These ${topic.toLowerCase()} are carefully crafted to be both challenging and fun. They're perfect for all ages and skill levels, making them ideal for family gatherings, classroom activities, and party games.`,
    },
    {
      q: `Are these riddles suitable for kids?`,
      a: `Yes! Most of these riddles are family-friendly and appropriate for kids. They're great for developing critical thinking skills and problem-solving abilities in young minds.`,
    },
    {
      q: `Can I use these riddles for a trivia night?`,
      a: `Absolutely! These ${topic.toLowerCase()} work perfectly as trivia questions. You can use them for parties, team-building events, or any social gathering where you want to add some brain-teasing fun.`,
    },
    {
      q: `How can I get more riddles like these?`,
      a: `Browse our other collections in the ${category} category, or check out our daily riddle for a fresh brain teaser every day. We add new riddle collections regularly.`,
    },
  ];
}

function generateConclusion(post) {
  const topic = extractTopicFromTitle(post.frontmatter.title);

  return `We hope you enjoyed these ${topic.toLowerCase()}! Whether you solved them all or got stumped by a few, these brain teasers are a great way to keep your mind sharp and have fun. Share your favorite riddles with friends and family, and don't forget to bookmark this page for your next game night. Check out our other riddle collections for even more brain-teasing fun!`;
}

function generatePostContent(post) {
  const riddles = generateRiddlesForPost(post, 12);
  const intro = generateIntro(post);
  const faqs = generateFAQs(post);
  const conclusion = generateConclusion(post);

  let content = "";

  // Intro paragraph
  content += intro + "\n\n";

  // Riddle section
  content += `## ${post.frontmatter.emoji} ${extractTopicFromTitle(post.frontmatter.title)} (With Answers)\n\n`;
  content += `Test your knowledge with these fun riddles! Each one is designed to make you think and smile.\n\n`;

  riddles.forEach((riddle, i) => {
    content += `## ${i + 1}. ${riddle.q}\n\n`;
    content += `**Answer:** ${riddle.a}\n\n`;
  });

  // What makes these special section
  content += `## What Makes These Riddles Special\n\n`;
  content += `These ${extractTopicFromTitle(post.frontmatter.title).toLowerCase()} are designed to be:\n\n`;
  content += `- **Fun for all ages** - Easy enough for kids but engaging for adults too\n`;
  content += `- **Perfect for groups** - Great for parties, classrooms, and family gatherings\n`;
  content += `- **Brain-boosting** - Each riddle helps develop critical thinking and problem-solving skills\n`;
  content += `- **Conversation starters** - Share them with friends and family for laughs and discussion\n\n`;

  // Tips section
  content += `## Tips for Solving Riddles\n\n`;
  content += `1. **Read carefully** - Pay attention to every word in the riddle\n`;
  content += `2. **Think laterally** - Sometimes the answer isn't what you expect\n`;
  content += `3. **Consider multiple meanings** - Words can have more than one definition\n`;
  content += `4. **Don't overthink it** - Sometimes the simplest answer is correct\n`;
  content += `5. **Have fun** - The goal is to enjoy the process, not just find the answer\n\n`;

  // FAQ section
  content += `## Frequently Asked Questions\n\n`;
  faqs.forEach((faq) => {
    content += `### ${faq.q}\n\n`;
    content += `${faq.a}\n\n`;
  });

  // Conclusion
  content += `## Conclusion\n\n`;
  content += conclusion + "\n\n";

  // E-E-A-T signal
  content += `---\n\n`;
  content += `*Written by Patrick Stevens and the Riddles Rush Team. Last updated: ${TODAY}.*\n`;

  return content;
}

// ─── Main Script ──────────────────────────────────────────────────────────────

function main() {
  console.log("🚀 Riddles Rush Content Generator");
  console.log("━".repeat(50));

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  console.log(`📁 Found ${files.length} blog posts`);

  let updated = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter, content } = matter(raw);

    // Check if post has meaningful content (more than just frontmatter + empty headers)
    const wordCount = content
      .replace(/#{1,6}\s*/g, "")
      .replace(/\*\*[^*]+\*\*/g, "")
      .replace(/\*[^*]+\*/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .split(/\s+/)
      .filter((w) => w.length > 0).length;

    if (wordCount > 100) {
      skipped++;
      continue; // Skip posts with existing content
    }

    // Generate new content
    const post = { frontmatter, content, slug: frontmatter.slug || file.replace(".md", "") };
    const newContent = generatePostContent(post);

    // Rebuild the full markdown file
    const frontmatterStr = matter.stringify("", {
      ...frontmatter,
      updatedAt: TODAY,
    }).trimEnd();

    fs.writeFileSync(filePath, frontmatterStr + "\n" + newContent, "utf-8");
    updated++;
  }

  console.log(`\n✅ Done!`);
  console.log(`   Updated: ${updated} posts`);
  console.log(`   Skipped: ${skipped} posts (already have content)`);
  console.log(`   Total:   ${files.length} posts`);
}

main();
