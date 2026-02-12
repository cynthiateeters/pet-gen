/**
 * @fileoverview Pet data for HAP's Animal Placement demo site.
 *
 * This module exports the complete pet dataset used for teaching JavaScript
 * array methods. Each pet has fields designed for specific learning objectives:
 *
 * - `id`: Unique identifier for `.find()` demonstrations
 * - `species`: Category for `.filter()` demonstrations
 * - `name`, `description`: String data for `.map()` transformations
 *
 * @module pets
 * @author Cynthia Teeters
 * @license MIT (code) / All Rights Reserved (images)
 *
 * @example
 * // Import the data
 * import { pets, temperamentToExpression } from './pets.js';
 *
 * // Find a specific pet by ID
 * const whisker = pets.find(pet => pet.id === 'a3f8c1');
 *
 * // Filter pets by species
 * const dogs = pets.filter(pet => pet.species === 'dog');
 *
 * // Get all pet names
 * const names = pets.map(pet => pet.name);
 */

// =============================================================================
// TYPE DEFINITIONS (JSDoc)
// =============================================================================

/**
 * Valid species categories for pets.
 * Used for filtering in the UI and organizing the dataset.
 *
 * @typedef {'cat' | 'dog' | 'small mammal' | 'bird' | 'reptile' | 'aquatic'} Species
 */

/**
 * Pet temperament types that influence both behavior descriptions
 * and the expressions used in AI-generated images.
 *
 * @typedef {'calm' | 'playful' | 'affectionate' | 'shy' | 'energetic' | 'independent'} Temperament
 */

/**
 * Adoption status of a pet.
 *
 * @typedef {'available' | 'pending' | 'adopted'} Status
 */

/**
 * Special needs category for pets requiring extra care.
 * `null` indicates no special needs.
 *
 * @typedef {'amputee' | 'blind' | 'senior' | 'rescue' | null} SpecialNeeds
 */

/**
 * A pet object representing an animal available for adoption.
 *
 * @typedef {Object} Pet
 * @property {string} id - Unique 6-character hex identifier (e.g., "a3f8c1").
 *   Used for image filenames and `.find()` lookups.
 * @property {string} name - Display name of the pet.
 * @property {Species} species - Primary category for filtering.
 * @property {string} subcategory - More specific type (e.g., "kitten", "large", "hamster").
 * @property {SpecialNeeds} specialNeeds - Special care requirements, or null.
 * @property {Temperament} temperament - Personality type, maps to image expression.
 * @property {Status} status - Current adoption status.
 * @property {string} prompt - Visual description for AI image generation.
 *   This field shows students how AI-generated content is created.
 * @property {string} description - Human-readable personality description.
 *   Written in shelter-style language to feel authentic.
 */

// =============================================================================
// TEMPERAMENT TO EXPRESSION MAPPING
// =============================================================================

/**
 * Maps pet temperaments to facial expressions for AI image generation.
 *
 * When generating images, we want the pet's expression to reflect their
 * personality. This mapping ensures visual consistency:
 *
 * - calm → peaceful (relaxed, serene look)
 * - playful → happy (bright, energetic look)
 * - affectionate → friendly (warm, welcoming look)
 * - shy → gentle (soft, tentative look)
 * - energetic → excited (alert, eager look)
 * - independent → confident (self-assured look)
 *
 * @type {Record<Temperament, string>}
 *
 * @example
 * // Get the expression for a playful pet
 * const expression = temperamentToExpression['playful']; // 'happy'
 *
 * // Build an image prompt
 * const prompt = `cartoon ${pet.prompt}, ${expression} expression`;
 */
export const temperamentToExpression = {
  calm: "peaceful",
  playful: "happy",
  affectionate: "friendly",
  shy: "gentle",
  energetic: "excited",
  independent: "confident",
};

// =============================================================================
// PET DATA
// =============================================================================

/**
 * Complete dataset of 48 pets for HAP's Animal Placement.
 *
 * Dataset composition:
 * - 9 cats (including 2 adopted, 1 pending)
 * - 12 dogs (including 1 adopted)
 * - 8 small mammals (hamsters, guinea pigs, rabbits, ferret, chinchilla)
 * - 6 birds (parakeets, cockatiels, lovebird)
 * - 6 reptiles (lizards, snake, turtle)
 * - 7 aquatic (fish, amphibians)
 *
 * Special needs pets (5 total):
 * - 2 amputees (Tripod the cat, Hopper the dog)
 * - 1 blind (Echo the dog)
 * - 1 senior (Sugar the cat)
 * - 1 rescue (Phoenix the bird)
 *
 * @type {Pet[]}
 *
 * @example
 * // Count available pets
 * const availableCount = pets.filter(p => p.status === 'available').length;
 *
 * // Get all special needs pets
 * const specialNeeds = pets.filter(p => p.specialNeeds !== null);
 *
 * // Find pet by ID (guaranteed unique result)
 * const pet = pets.find(p => p.id === 'a3f8c1');
 */
export const pets = [
  // ===========================================================================
  // CATS (9 total)
  // Teaching note: Good variety of temperaments and statuses
  // ===========================================================================

  /**
   * Whisker - Classic orange tabby, demonstrates "affectionate" temperament.
   * A staple pet type that students will immediately recognize.
   */
  {
    id: "a3f8c1",
    name: "Whisker",
    species: "cat",
    subcategory: "adult",
    specialNeeds: null,
    temperament: "affectionate",
    status: "available",
    prompt: "fluffy orange tabby cat with green eyes",
    description:
      "A classic tabby who lives for chin scratches and sunny windowsills. Will greet you at the door every single day without fail.",
  },

  /**
   * Marmalade - Playful orange cat batting at a toy.
   * The "playful" temperament maps to "happy" expression in images.
   */
  {
    id: "b7e2d4",
    name: "Marmalade",
    species: "cat",
    subcategory: "adult",
    specialNeeds: null,
    temperament: "playful",
    status: "available",
    prompt: "playful marmalade cat batting at a toy",
    description:
      "This orange goofball has two speeds: zooming and napping. Favorite toy: anything that crinkles. Will make you laugh daily.",
  },

  /**
   * Shadow - Independent black cat.
   * Demonstrates "independent" temperament mapping to "confident" expression.
   */
  {
    id: "c9a1f6",
    name: "Shadow",
    species: "cat",
    subcategory: "adult",
    specialNeeds: null,
    temperament: "independent",
    status: "available",
    prompt: "sleek black cat with golden eyes sitting elegantly",
    description:
      "A mysterious soul who enjoys quiet companionship. Will sit near you, not on you. Perfect for someone who respects boundaries.",
  },

  /**
   * Snowball - White kitten with "pending" status.
   * Teaching note: Shows that status can be used to filter unavailable pets.
   */
  {
    id: "d2c5b8",
    name: "Snowball",
    species: "cat",
    subcategory: "kitten",
    specialNeeds: null,
    temperament: "playful",
    status: "pending",
    prompt: "tiny white kitten with blue eyes and pink nose",
    description:
      "Tiny but mighty! This curious kitten is learning the ropes and ready for adventure. Needs patient adopter for kitten antics.",
  },

  /**
   * Mittens - Calm tuxedo cat, perfect for beginners.
   * The "calm" temperament maps to "peaceful" expression.
   */
  {
    id: "e6f3a2",
    name: "Mittens",
    species: "cat",
    subcategory: "adult",
    specialNeeds: null,
    temperament: "calm",
    status: "available",
    prompt: "fluffy gray and white tuxedo cat",
    description:
      "A laid-back sweetheart who gets along with everyone. Perfect for first-time cat owners. Low drama, high purrs.",
  },

  /**
   * Tripod - Three-legged cat (amputee).
   * Teaching note: Special needs pets demonstrate filtering with `specialNeeds !== null`.
   */
  {
    id: "f1d8e7",
    name: "Tripod",
    species: "cat",
    subcategory: "adult",
    specialNeeds: "amputee",
    temperament: "affectionate",
    status: "available",
    prompt: "brave orange cat with three legs hopping happily",
    description:
      "Lost a leg but not his spirit. This brave boy purrs louder than any cat we know. Doesn't know he's different, just knows he's loved.",
  },

  /**
   * Sugar - Senior cat with special needs.
   * Demonstrates that specialNeeds can indicate age-related considerations.
   */
  {
    id: "a8b4c3",
    name: "Sugar",
    species: "cat",
    subcategory: "senior",
    specialNeeds: "senior",
    temperament: "calm",
    status: "available",
    prompt: "wise senior gray cat with white whiskers and gentle eyes",
    description:
      "A gentle senior who just wants a warm lap and a peaceful home. Low maintenance, high love. Already litter trained and drama-free.",
  },

  /**
   * Byte - Adopted cat (status: "adopted").
   * Teaching note: Shows historical data - pets that found homes.
   */
  {
    id: "b3e9f5",
    name: "Byte",
    species: "cat",
    subcategory: "adult",
    specialNeeds: null,
    temperament: "independent",
    status: "adopted",
    prompt: "clever gray tabby cat with stripes",
    description:
      "HAP's first cat! Loves keyboards and will 'help' you code. Now living his best life with his forever family.",
  },

  /**
   * Cache - Another adopted cat.
   * Named with a programming pun (like Byte) to fit HAP's tech theme.
   */
  {
    id: "c4a7d1",
    name: "Cache",
    species: "cat",
    subcategory: "adult",
    specialNeeds: null,
    temperament: "affectionate",
    status: "adopted",
    prompt: "beautiful calico cat with patches of orange black and white",
    description:
      "HAP's second cat! Named for her ability to hide treats everywhere. Expert napper, professional cuddler.",
  },

  // ===========================================================================
  // DOGS (12 total)
  // Teaching note: Largest category, good for demonstrating filter results
  // ===========================================================================

  /**
   * Buddy - Classic golden retriever, adopted.
   * The quintessential family dog - immediately recognizable.
   */
  {
    id: "d9f2b6",
    name: "Buddy",
    species: "dog",
    subcategory: "large",
    specialNeeds: null,
    temperament: "playful",
    status: "adopted",
    prompt: "happy golden retriever with tongue out and wagging tail",
    description:
      "The ultimate family dog. Loved kids, fetch, and belly rubs in equal measure. Found his forever home and couldn't be happier!",
  },

  /**
   * Luna - Energetic black lab.
   * "energetic" temperament maps to "excited" expression.
   */
  {
    id: "e1c8a4",
    name: "Luna",
    species: "dog",
    subcategory: "large",
    specialNeeds: null,
    temperament: "energetic",
    status: "available",
    prompt: "athletic black labrador ready to run",
    description:
      "High-energy lab who needs lots of exercise. Perfect running partner or hiking buddy. Will keep you active!",
  },

  /**
   * Max - Curious beagle (medium size).
   * subcategory: "medium" allows size-based filtering.
   */
  {
    id: "f5d3e9",
    name: "Max",
    species: "dog",
    subcategory: "medium",
    specialNeeds: null,
    temperament: "playful",
    status: "available",
    prompt: "curious beagle with floppy ears sniffing the air",
    description:
      "A curious beagle with an impressive nose. Loves sniffing out treats and going on walks. Food motivated, easy to train.",
  },

  /**
   * Bella - Calm German shepherd (large).
   * Demonstrates variety within the "large" subcategory.
   */
  {
    id: "a2b7c8",
    name: "Bella",
    species: "dog",
    subcategory: "large",
    specialNeeds: null,
    temperament: "calm",
    status: "available",
    prompt: "noble german shepherd standing alert",
    description:
      "A well-trained shepherd looking for a job to do. Smart, loyal, and protective. Best with experienced dog owner.",
  },

  /**
   * Charlie - Energetic border collie (medium).
   * High-energy working breed for variety.
   */
  {
    id: "b8c1d5",
    name: "Charlie",
    species: "dog",
    subcategory: "medium",
    specialNeeds: null,
    temperament: "energetic",
    status: "available",
    prompt: "smart border collie with bright eyes",
    description:
      "Smartest dog in the shelter! Knows 15 tricks and ready to learn more. Needs mental stimulation and an active family.",
  },

  /**
   * Daisy - Affectionate cocker spaniel.
   * "affectionate" maps to "friendly" expression.
   */
  {
    id: "c3e6f2",
    name: "Daisy",
    species: "dog",
    subcategory: "medium",
    specialNeeds: null,
    temperament: "affectionate",
    status: "available",
    prompt: "sweet cocker spaniel with long wavy ears",
    description:
      "Total cuddle bug who thinks she's a lap dog. Velcro pup alert! Will follow you from room to room.",
  },

  /**
   * Rocky - Calm bulldog, apartment-friendly.
   */
  {
    id: "d7a4b1",
    name: "Rocky",
    species: "dog",
    subcategory: "medium",
    specialNeeds: null,
    temperament: "calm",
    status: "available",
    prompt: "chunky english bulldog with a wrinkly face",
    description:
      "A chill bulldog who snores louder than he barks. Loves short walks and long naps. Perfect apartment companion.",
  },

  /**
   * Coco - Playful poodle (small).
   * subcategory: "small" for size filtering.
   */
  {
    id: "e9f8c6",
    name: "Coco",
    species: "dog",
    subcategory: "small",
    specialNeeds: null,
    temperament: "playful",
    status: "available",
    prompt: "fluffy white poodle with a cute haircut",
    description:
      "Hypoallergenic poodle with a playful personality. Great for apartments and allergy sufferers. Smart and easy to train.",
  },

  /**
   * Milo - Shy chihuahua.
   * "shy" temperament maps to "gentle" expression.
   */
  {
    id: "f2d1a7",
    name: "Milo",
    species: "dog",
    subcategory: "small",
    specialNeeds: null,
    temperament: "shy",
    status: "available",
    prompt: "tiny chihuahua with big ears and bigger eyes",
    description:
      "A tiny chi with a big heart. Takes time to warm up but bonds deeply. Needs patient adopter, no small children please.",
  },

  /**
   * Ziggy - Playful dachshund.
   * Fun breed known for personality.
   */
  {
    id: "a6c3e4",
    name: "Ziggy",
    species: "dog",
    subcategory: "small",
    specialNeeds: null,
    temperament: "playful",
    status: "available",
    prompt: "long dachshund with short legs and floppy ears",
    description:
      "Long and low, this wiener dog thinks he's huge. Surprisingly fast! Loves burrowing under blankets.",
  },

  /**
   * Echo - Blind husky (special needs).
   * Demonstrates visual disability representation.
   */
  {
    id: "b1f5d8",
    name: "Echo",
    species: "dog",
    subcategory: "large",
    specialNeeds: "blind",
    temperament: "calm",
    status: "available",
    prompt: "gentle husky with pale blue cloudy eyes",
    description:
      "Blind but brave. Navigates by sound and has the sweetest howl. Adapts quickly to new spaces once he learns the layout.",
  },

  /**
   * Hopper - Three-legged terrier (amputee).
   * Another amputee pet showing resilience.
   */
  {
    id: "c8a2f9",
    name: "Hopper",
    species: "dog",
    subcategory: "small",
    specialNeeds: "amputee",
    temperament: "energetic",
    status: "available",
    prompt: "spunky terrier mix hopping on three legs",
    description:
      "Three legs, zero limits. This terrier mix has more energy than dogs with four. Don't let the missing leg fool you!",
  },

  // ===========================================================================
  // SMALL MAMMALS (8 total)
  // Teaching note: "small mammal" as species shows multi-word filter values
  // ===========================================================================

  /**
   * Nugget - Golden hamster.
   * Great starter pet entry.
   */
  {
    id: "d4e7b3",
    name: "Nugget",
    species: "small mammal",
    subcategory: "hamster",
    specialNeeds: null,
    temperament: "playful",
    status: "available",
    prompt: "chubby golden hamster with stuffed cheeks",
    description:
      "A fluffy golden hamster who runs on his wheel all night. Peak entertainment value. Great starter pet for older kids.",
  },

  /**
   * Peanut - Shy dwarf hamster.
   */
  {
    id: "e2c9a1",
    name: "Peanut",
    species: "small mammal",
    subcategory: "hamster",
    specialNeeds: null,
    temperament: "shy",
    status: "available",
    prompt: "tiny dwarf hamster curled in a ball",
    description:
      "Tiny dwarf hamster who fits in your palm. Shy at first, then super curious. Nocturnal, so perfect for night owls.",
  },

  /**
   * Patches - Social guinea pig.
   * Part of a bonded pair (with Cinnamon).
   */
  {
    id: "f6b8d4",
    name: "Patches",
    species: "small mammal",
    subcategory: "guinea pig",
    specialNeeds: null,
    temperament: "affectionate",
    status: "available",
    prompt: "fluffy calico guinea pig with swirly fur",
    description:
      "Social guinea pig who squeaks when she hears the fridge open. Veggie lover. Does best with a guinea pig friend!",
  },

  /**
   * Cinnamon - Calm guinea pig.
   * Bonded pair partner for Patches.
   */
  {
    id: "a9d2c7",
    name: "Cinnamon",
    species: "small mammal",
    subcategory: "guinea pig",
    specialNeeds: null,
    temperament: "calm",
    status: "available",
    prompt: "round brown guinea pig munching on hay",
    description:
      "The calm one of the pair. Loves lap time and gentle pets. Would love to be adopted with Patches!",
  },

  /**
   * Thumper - Playful rabbit.
   */
  {
    id: "b5a1e6",
    name: "Thumper",
    species: "small mammal",
    subcategory: "rabbit",
    specialNeeds: null,
    temperament: "playful",
    status: "available",
    prompt: "soft gray rabbit with twitching nose",
    description:
      "A playful rabbit who binkies when he's happy. Watch out for zoomies! Litter trained and full of personality.",
  },

  /**
   * Cotton - Shy white rabbit.
   */
  {
    id: "c1f4d2",
    name: "Cotton",
    species: "small mammal",
    subcategory: "rabbit",
    specialNeeds: null,
    temperament: "shy",
    status: "available",
    prompt: "fluffy white rabbit with pink ears",
    description:
      "A shy white rabbit who needs patience. Once she trusts you, she's a total lovebug. Worth the wait!",
  },

  /**
   * Ginger - Energetic ferret.
   * Unique small mammal type.
   */
  {
    id: "d8e3b9",
    name: "Ginger",
    species: "small mammal",
    subcategory: "ferret",
    specialNeeds: null,
    temperament: "energetic",
    status: "available",
    prompt: "sleek ferret stretching playfully",
    description:
      "Mischievous ferret who steals socks. Endless entertainment guaranteed. Ferret-proof your home first!",
  },

  /**
   * Nibbles - Shy chinchilla.
   * Exotic small mammal for variety.
   */
  {
    id: "e4a6c1",
    name: "Nibbles",
    species: "small mammal",
    subcategory: "chinchilla",
    specialNeeds: null,
    temperament: "shy",
    status: "available",
    prompt: "round gray chinchilla with big ears",
    description:
      "Soft chinchilla who gives dust baths like it's a spa day. Nocturnal and needs cool temperatures.",
  },

  // ===========================================================================
  // BIRDS (6 total)
  // Teaching note: Variety of bird types for subcategory filtering
  // ===========================================================================

  /**
   * Kiwi - Green parakeet.
   * Great first bird.
   */
  {
    id: "f3c7d8",
    name: "Kiwi",
    species: "bird",
    subcategory: "parakeet",
    specialNeeds: null,
    temperament: "playful",
    status: "available",
    prompt: "bright green parakeet tilting head curiously",
    description:
      "Chatty green parakeet learning to say 'hello.' Loves mirrors and bells. Great first bird!",
  },

  /**
   * Sunny - Yellow parakeet.
   * Affectionate companion bird.
   */
  {
    id: "a1e4b5",
    name: "Sunny",
    species: "bird",
    subcategory: "parakeet",
    specialNeeds: null,
    temperament: "affectionate",
    status: "available",
    prompt: "cheerful yellow parakeet singing",
    description:
      "This yellow parakeet will sit on your shoulder all day. Total companion bird. Loves to sing along to music.",
  },

  /**
   * Mango - Gray cockatiel.
   * Different bird type for subcategory variety.
   */
  {
    id: "b6d9a3",
    name: "Mango",
    species: "bird",
    subcategory: "cockatiel",
    specialNeeds: null,
    temperament: "calm",
    status: "available",
    prompt: "gray cockatiel with orange cheek patches and crest up",
    description:
      "Whistling cockatiel who does a great doorbell impression. Very social, loves head scratches.",
  },

  /**
   * Rio - Blue parakeet.
   * Energetic personality for variety.
   */
  {
    id: "c2f1e8",
    name: "Rio",
    species: "bird",
    subcategory: "parakeet",
    specialNeeds: null,
    temperament: "energetic",
    status: "available",
    prompt: "vibrant blue parakeet with wings spread",
    description:
      "Vibrant blue parakeet with serious attitude. Small bird, big personality. Needs room to fly!",
  },

  /**
   * Peaches - Lovebird.
   * Different bird species for variety.
   */
  {
    id: "d5b2c4",
    name: "Peaches",
    species: "bird",
    subcategory: "lovebird",
    specialNeeds: null,
    temperament: "affectionate",
    status: "available",
    prompt: "peach-faced lovebird with bright colors",
    description:
      "A lovebird who lives up to the name. Needs lots of attention and gives it back tenfold. Velcro bird!",
  },

  /**
   * Phoenix - Rescue cockatiel (special needs).
   * Shows rescue pets can be any species.
   */
  {
    id: "e8a9f7",
    name: "Phoenix",
    species: "bird",
    subcategory: "cockatiel",
    specialNeeds: "rescue",
    temperament: "shy",
    status: "available",
    prompt: "gentle cockatiel with ruffled feathers looking hopeful",
    description:
      "Rescue cockatiel still growing back feathers. Gentle soul who's been through a lot. Needs patient, quiet home.",
  },

  // ===========================================================================
  // REPTILES (6 total)
  // Teaching note: Various reptile types expand subcategory options
  // ===========================================================================

  /**
   * Spike - Bearded dragon.
   * Popular beginner reptile.
   */
  {
    id: "f4c2d6",
    name: "Spike",
    species: "reptile",
    subcategory: "lizard",
    specialNeeds: null,
    temperament: "calm",
    status: "available",
    prompt: "friendly bearded dragon basking with eyes half closed",
    description:
      "Friendly bearded dragon who loves basking and the occasional blueberry. Surprisingly personable for a reptile!",
  },

  /**
   * Scales - Leopard gecko.
   * Another popular beginner lizard.
   */
  {
    id: "a7e8b1",
    name: "Scales",
    species: "reptile",
    subcategory: "lizard",
    specialNeeds: null,
    temperament: "shy",
    status: "available",
    prompt: "spotted leopard gecko with big eyes",
    description:
      "Shy leopard gecko who comes out at dusk. Beautiful spotted pattern. Low maintenance, great for beginners.",
  },

  /**
   * Pretzel - Ball python.
   * subcategory: "snake" for filtering snakes specifically.
   */
  {
    id: "b2d4c9",
    name: "Pretzel",
    species: "reptile",
    subcategory: "snake",
    specialNeeds: null,
    temperament: "calm",
    status: "available",
    prompt: "coiled ball python with pretty brown patterns",
    description:
      "Docile ball python who curls up in the cutest shapes. Great for first-time snake owners. Eats frozen/thawed.",
  },

  /**
   * Shelly - Red-eared slider turtle.
   * subcategory: "turtle" for variety.
   */
  {
    id: "c6a3e5",
    name: "Shelly",
    species: "reptile",
    subcategory: "turtle",
    specialNeeds: null,
    temperament: "calm",
    status: "available",
    prompt: "red-eared slider turtle peeking out of shell",
    description:
      "Red-eared slider who loves her basking spot. Watching her swim is so calming. Long-term commitment pet!",
  },

  /**
   * Rex - Blue-tongued skink.
   * Independent personality lizard.
   */
  {
    id: "d1f7b4",
    name: "Rex",
    species: "reptile",
    subcategory: "lizard",
    specialNeeds: null,
    temperament: "independent",
    status: "available",
    prompt: "blue-tongued skink showing off blue tongue",
    description:
      "Blue-tongued skink with a funny defensive pose. Actually a big softy once comfortable. Loves snails!",
  },

  /**
   * Mossy - Crested gecko.
   * Low-maintenance lizard option.
   */
  {
    id: "e3c5a8",
    name: "Mossy",
    species: "reptile",
    subcategory: "lizard",
    specialNeeds: null,
    temperament: "shy",
    status: "available",
    prompt: "adorable crested gecko with eyelash-like ridges",
    description:
      "Crested gecko with adorable eyelash ridges. Nocturnal and low-maintenance. Doesn't need live bugs!",
  },

  // ===========================================================================
  // AQUATIC (7 total)
  // Teaching note: Mixed fish and amphibians under one species category
  // ===========================================================================

  /**
   * Bubbles - Goldfish.
   * Classic beginner fish.
   */
  {
    id: "f9b6d3",
    name: "Bubbles",
    species: "aquatic",
    subcategory: "fish",
    specialNeeds: null,
    temperament: "calm",
    status: "available",
    prompt: "plump orange goldfish with flowing fins",
    description:
      "Classic goldfish who's been here the longest. Simple but soothing. Needs proper tank, not a bowl!",
  },

  /**
   * Nemo - Clownfish.
   * Pop culture reference, needs saltwater.
   */
  {
    id: "a4d1e2",
    name: "Nemo",
    species: "aquatic",
    subcategory: "fish",
    specialNeeds: null,
    temperament: "playful",
    status: "available",
    prompt: "bright orange clownfish with white stripes",
    description:
      "Clownfish with major personality. Darts around his anemone all day. Saltwater setup required.",
  },

  /**
   * Pearl - White betta fish.
   * Elegant, solo fish.
   */
  {
    id: "b9c8f4",
    name: "Pearl",
    species: "aquatic",
    subcategory: "fish",
    specialNeeds: null,
    temperament: "calm",
    status: "available",
    prompt: "elegant white betta fish with flowing fins",
    description:
      "Elegant white betta with flowing fins like a wedding dress. Prefers peaceful tank, solo only.",
  },

  /**
   * Coral - Red betta fish.
   * Independent personality fish.
   */
  {
    id: "c5e2a6",
    name: "Coral",
    species: "aquatic",
    subcategory: "fish",
    specialNeeds: null,
    temperament: "independent",
    status: "available",
    prompt: "fierce red betta fish with dramatic fins",
    description:
      "Feisty red betta who flares at her own reflection. Dramatic and beautiful. Solo tank only!",
  },

  /**
   * Splash - Axolotl.
   * subcategory: "amphibian" distinguishes from fish.
   */
  {
    id: "d3f9b7",
    name: "Splash",
    species: "aquatic",
    subcategory: "amphibian",
    specialNeeds: null,
    temperament: "calm",
    status: "available",
    prompt: "smiling pink axolotl with feathery gills",
    description:
      "Axolotl with a permanent smile. Alien-cute and easier to care for than you'd think. Needs cold water.",
  },

  /**
   * Dot - African dwarf frog.
   * Another amphibian for subcategory variety.
   */
  {
    id: "e7a2c8",
    name: "Dot",
    species: "aquatic",
    subcategory: "amphibian",
    specialNeeds: null,
    temperament: "shy",
    status: "available",
    prompt: "tiny african dwarf frog swimming",
    description:
      "Tiny African dwarf frog who hides in plants. Comes out at feeding time. Fully aquatic, easy keeper.",
  },

  /**
   * Finn - Blue betta fish.
   * Third betta with different color for visual variety.
   */
  {
    id: "f1b4d9",
    name: "Finn",
    species: "aquatic",
    subcategory: "fish",
    specialNeeds: null,
    temperament: "calm",
    status: "available",
    prompt: "royal blue betta fish with shimmering scales",
    description:
      "Royal blue betta who builds bubble nests. Looking for a quiet corner spot. Stunning colors!",
  },
];
