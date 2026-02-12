/**
 * @fileoverview Pet Image Generator using Runware AI API.
 *
 * This script generates cartoon-style pet images for HAP's Animal Placement
 * demo site using the Runware API with the FLUX.1 Schnell model.
 *
 * ## How it works
 *
 * 1. Reads pet data from `pets.js` (48 pets with visual prompts)
 * 2. Builds image prompts by combining pet descriptions with expressions
 * 3. Calls the Runware API to generate images
 * 4. Downloads and saves images as WEBP files
 *
 * ## Teaching concepts demonstrated
 *
 * - **ESM imports**: Modern JavaScript module syntax
 * - **async/await**: Handling asynchronous operations
 * - **fetch API**: Making HTTP requests
 * - **Error handling**: try/catch with async code
 * - **Environment variables**: Keeping secrets out of code
 * - **File system operations**: Reading/writing files in Node.js
 *
 * @module generate
 * @author Cynthia Teeters
 * @license MIT
 *
 * @example
 * // Terminal:
 * // export RUNWARE_API_KEY="your-key-here"
 * // node generate.js
 *
 * (Set your API key, then run the script)
 */

// =============================================================================
// IMPORTS
// =============================================================================

/**
 * Import pet data and temperament mapping from our data module.
 *
 * ESM (ECMAScript Modules) uses `import` instead of CommonJS `require()`.
 * The `.js` extension is required for Node.js ESM imports.
 */
import { pets, temperamentToExpression } from "./pets.js";

/**
 * Import Node.js built-in file system modules.
 *
 * Note the `node:` prefix - this is the recommended way to import Node.js
 * built-in modules in ESM. It makes it clear these are Node.js modules,
 * not npm packages.
 *
 * We use two different fs modules:
 * - `fs/promises`: Async versions that work with async/await
 * - `fs`: Sync versions for simple checks (existsSync)
 */
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

// =============================================================================
// CONFIGURATION
// =============================================================================

/**
 * Runware API endpoint for image generation.
 * All API calls go to this single URL with different payloads.
 *
 * @constant {string}
 */
const API_URL = "https://api.runware.ai/v1";

/**
 * API key loaded from environment variable.
 *
 * SECURITY NOTE: Never hardcode API keys in source code!
 * Instead, use environment variables:
 *
 * ```bash
 * # Set temporarily (current session only)
 * export RUNWARE_API_KEY="your-key-here"
 *
 * # Or add to ~/.zshrc or ~/.bashrc for persistence
 * echo 'export RUNWARE_API_KEY="your-key"' >> ~/.zshrc
 * ```
 *
 * @constant {string|undefined}
 */
const API_KEY = process.env.RUNWARE_API_KEY;

// Validate API key exists before proceeding
if (!API_KEY) {
  console.error("Error: RUNWARE_API_KEY environment variable not set");
  console.error("");
  console.error("To fix this:");
  console.error('  export RUNWARE_API_KEY="your-key-here"');
  console.error("  node generate.js");
  console.error("");
  console.error("Get a free API key at: https://runware.ai");
  process.exit(1);
}

// =============================================================================
// PROMPT BUILDING
// =============================================================================

/**
 * Builds a complete image generation prompt from pet data.
 *
 * The prompt formula was developed through iteration:
 * 1. Started simple: "a cat" (too generic)
 * 2. Added style: "cartoon cat" (inconsistent)
 * 3. Added constraints: "simple cartoon illustration, white background"
 * 4. Added flat colors to prevent shading variations
 * 5. Added expression based on temperament for personality
 *
 * Final formula:
 * ```
 * simple cartoon illustration of a [visual description],
 * white background, [expression] expression, flat colors
 * ```
 *
 * @param {import('./pets.js').Pet} pet - Pet object with prompt and temperament
 * @returns {string} Complete prompt for the AI image generator
 *
 * @example
 * const pet = {
 *   prompt: "fluffy orange tabby cat with green eyes",
 *   temperament: "affectionate"
 * };
 * buildPrompt(pet);
 * // => "simple cartoon illustration of a fluffy orange tabby cat
 * //     with green eyes, white background, friendly expression, flat colors"
 */
function buildPrompt(pet) {
  // Look up the expression word for this temperament
  // Default to "friendly" if temperament isn't in our mapping
  const expression = temperamentToExpression[pet.temperament] || "friendly";

  // Combine all parts into the final prompt
  // Template literals (backticks) allow embedded expressions with ${}
  return `simple cartoon illustration of a ${pet.prompt}, white background, ${expression} expression, flat colors`;
}

// =============================================================================
// API INTERACTION
// =============================================================================

/**
 * Generates a single image using the Runware API.
 *
 * This function demonstrates several important concepts:
 *
 * 1. **async/await**: The function is marked `async` so we can use `await`
 *    to pause execution until Promises resolve.
 *
 * 2. **fetch API**: Modern way to make HTTP requests. Returns a Promise.
 *
 * 3. **UUID generation**: `crypto.randomUUID()` creates unique task IDs.
 *    This is a browser API that Node.js also provides globally.
 *
 * 4. **Error handling**: We check both HTTP status and API-level errors.
 *
 * @async
 * @param {import('./pets.js').Pet} pet - Pet object to generate image for
 * @returns {Promise<Object>} API response containing imageURL and cost
 * @throws {Error} If the API request fails or returns an error
 *
 * @example
 * const result = await generateImage(pet);
 * console.log(result.imageURL);  // URL to download the image
 * console.log(result.cost);      // Cost in USD (e.g., 0.0013)
 */
async function generateImage(pet) {
  // Build the prompt from pet data
  const prompt = buildPrompt(pet);

  // Generate a unique ID for this request
  // UUIDs (Universally Unique Identifiers) ensure no collisions
  const taskUUID = crypto.randomUUID();

  // Make the API request using fetch()
  // fetch() returns a Promise that resolves to a Response object
  const response = await fetch(API_URL, {
    // HTTP method - POST for sending data
    method: "POST",

    // Headers tell the server what we're sending and who we are
    headers: {
      // We're sending JSON data
      "Content-Type": "application/json",
      // API key for authentication (Bearer token format)
      Authorization: `Bearer ${API_KEY}`,
    },

    // Request body - must be a string, so we JSON.stringify our object
    // Note: Runware API expects an ARRAY of tasks (even for single requests)
    body: JSON.stringify([
      {
        // Type of task - we want to generate an image
        taskType: "imageInference",

        // Unique identifier for this specific request
        taskUUID,

        // Model to use - FLUX.1 Schnell is fast and cheap
        // "runware:100@1" is Runware's ID for this model
        model: "runware:100@1",

        // The prompt describing what to generate
        positivePrompt: prompt,

        // Image dimensions in pixels
        // 512x512 is a good balance of quality and speed
        width: 512,
        height: 512,

        // Number of inference steps
        // Schnell is a "distilled" model that needs fewer steps
        // Most models need 20-50 steps; Schnell works well with 4
        steps: 4,

        // How to return the result
        // "URL" = temporary URL to download from
        // Alternative: "base64" for inline data
        outputType: "URL",

        // Image format - WEBP is modern, small, and widely supported
        outputFormat: "WEBP",

        // WEBP quality (1-100)
        // 80 is a good balance of quality and file size
        outputQuality: 80,

        // How many images to generate per request
        numberResults: 1,
      },
    ]),
  });

  // Check if the HTTP request itself failed
  // response.ok is true for status codes 200-299
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  // Parse the JSON response body
  // This is also async because it reads from a stream
  const result = await response.json();

  // Check for API-level errors (request succeeded but operation failed)
  if (result.errors) {
    throw new Error(`API error: ${JSON.stringify(result.errors)}`);
  }

  // Return the first (and only) result from the data array
  // Contains: imageURL, imageUUID, cost, seed, etc.
  return result.data[0];
}

/**
 * Downloads an image from a URL and saves it to a file.
 *
 * This demonstrates:
 * - Using fetch() to download binary data
 * - Converting Response to ArrayBuffer
 * - Writing binary data with Node.js fs
 *
 * @async
 * @param {string} url - URL to download the image from
 * @param {string} filename - Local path to save the image
 * @throws {Error} If download or file write fails
 *
 * @example
 * await downloadImage("https://example.com/image.webp", "./images/pet.webp");
 */
async function downloadImage(url, filename) {
  // Fetch the image data
  const response = await fetch(url);

  // Check for HTTP errors
  if (!response.ok) {
    throw new Error(`Download failed: ${response.status}`);
  }

  // Get the raw binary data as an ArrayBuffer
  // ArrayBuffer is a fixed-length raw binary data buffer
  const buffer = await response.arrayBuffer();

  // Write to file
  // Buffer.from() converts ArrayBuffer to Node.js Buffer
  // writeFile is the async version from fs/promises
  await writeFile(filename, Buffer.from(buffer));
}

// =============================================================================
// MAIN EXECUTION
// =============================================================================

/**
 * Main execution function that orchestrates the image generation process.
 *
 * This is an async IIFE (Immediately Invoked Function Expression) pattern:
 * We define an async function and call it immediately. This allows us to
 * use await at the top level of our script.
 *
 * The function:
 * 1. Creates the output directory if needed
 * 2. Loops through all pets
 * 3. Skips pets that already have images (idempotent)
 * 4. Generates and downloads images for remaining pets
 * 5. Tracks and reports costs
 *
 * @async
 * @returns {Promise<void>}
 */
async function main() {
  // Log startup message with pet count
  console.log(`Starting generation of ${pets.length} pet images...\n`);

  // ==========================================================================
  // Directory Setup
  // ==========================================================================

  // Ensure the images directory exists
  // existsSync is synchronous - fine for one-time startup checks
  if (!existsSync("./images")) {
    // mkdir creates the directory
    // This is async so we await it
    await mkdir("./images");
  }

  // ==========================================================================
  // Progress Tracking
  // ==========================================================================

  // Track total API costs across all generations
  let totalCost = 0;

  // Track success/failure counts for summary
  let generated = 0;
  let failed = 0;

  // ==========================================================================
  // Generation Loop
  // ==========================================================================

  // Process each pet sequentially
  // We use for...of to iterate (not forEach) so we can use await
  for (const pet of pets) {
    // Build the output filename using the pet's unique ID
    const filename = `./images/${pet.id}.webp`;

    // --------------------------------------------------------------------------
    // Skip existing images (idempotent operation)
    // --------------------------------------------------------------------------

    // Check if this image already exists
    // This makes the script safe to re-run - it won't regenerate existing images
    if (existsSync(filename)) {
      console.log(`[SKIP] ${pet.id} - already exists`);
      generated++; // Count as success since we have the image
      continue; // Skip to next pet
    }

    // --------------------------------------------------------------------------
    // Generate new image
    // --------------------------------------------------------------------------

    try {
      // Log what we're generating
      console.log(`[GEN] ${pet.id} - ${pet.name}...`);

      // Call the API to generate the image
      // This returns an object with imageURL, cost, etc.
      const result = await generateImage(pet);

      // Track the cost (with fallback to 0 if not provided)
      totalCost += result.cost || 0;

      // Download the generated image from the temporary URL
      await downloadImage(result.imageURL, filename);

      // Log success with cost
      // toFixed(4) formats the number to 4 decimal places
      console.log(
        `  ✓ Saved ${filename} (cost: $${result.cost?.toFixed(4) || "?"})`
      );

      // Increment success counter
      generated++;

      // ------------------------------------------------------------------------
      // Rate limiting (be nice to the API)
      // ------------------------------------------------------------------------

      // Small delay between requests to avoid overwhelming the API
      // 200ms is polite without being too slow
      // This uses a Promise that resolves after a timeout
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (error) {
      // ------------------------------------------------------------------------
      // Error handling
      // ------------------------------------------------------------------------

      // Log the error but continue with other pets
      // This way one failure doesn't stop the whole batch
      console.error(`  ✗ Failed: ${error.message}`);

      // Increment failure counter
      failed++;
    }
  }

  // ==========================================================================
  // Summary Report
  // ==========================================================================

  console.log("\n--- Summary ---");
  console.log(`Generated: ${generated}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total cost: $${totalCost.toFixed(4)}`);
}

// =============================================================================
// SCRIPT ENTRY POINT
// =============================================================================

/**
 * Run the main function and handle any uncaught errors.
 *
 * The .catch() at the end ensures that if main() throws an error
 * that isn't caught internally, it will be logged to the console.
 *
 * This is a common pattern for async entry points:
 * ```javascript
 * main().catch(console.error);
 * ```
 */
main().catch(console.error);
