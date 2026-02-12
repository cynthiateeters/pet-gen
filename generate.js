/**
 * Pet Image Generator
 * Generates 48 pet images using Runware API (FLUX.1 Schnell)
 *
 * Usage: node generate.js
 *
 * Requires: RUNWARE_API_KEY environment variable
 */

import { pets, temperamentToExpression } from "./pets.js";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const API_URL = "https://api.runware.ai/v1";
const API_KEY = process.env.RUNWARE_API_KEY;

if (!API_KEY) {
  console.error("Error: RUNWARE_API_KEY environment variable not set");
  process.exit(1);
}

// Build image prompt from pet data
function buildPrompt(pet) {
  const expression = temperamentToExpression[pet.temperament] || "friendly";
  return `simple cartoon illustration of a ${pet.prompt}, white background, ${expression} expression, flat colors`;
}

// Generate a single image
async function generateImage(pet) {
  const prompt = buildPrompt(pet);
  const taskUUID = crypto.randomUUID();

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify([
      {
        taskType: "imageInference",
        taskUUID,
        model: "runware:100@1", // FLUX.1 Schnell
        positivePrompt: prompt,
        width: 512,
        height: 512,
        steps: 4,
        outputType: "URL",
        outputFormat: "WEBP",
        outputQuality: 80,
        numberResults: 1,
      },
    ]),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(`API error: ${JSON.stringify(result.errors)}`);
  }

  return result.data[0];
}

// Download image from URL and save to file
async function downloadImage(url, filename) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed: ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  await writeFile(filename, Buffer.from(buffer));
}

// Main generation loop
async function main() {
  console.log(`Starting generation of ${pets.length} pet images...\n`);

  // Ensure images directory exists
  if (!existsSync("./images")) {
    await mkdir("./images");
  }

  let totalCost = 0;
  let generated = 0;
  let failed = 0;

  for (const pet of pets) {
    const filename = `./images/${pet.id}.webp`;

    // Skip if already exists
    if (existsSync(filename)) {
      console.log(`[SKIP] ${pet.id} - already exists`);
      generated++;
      continue;
    }

    try {
      console.log(`[GEN] ${pet.id} - ${pet.description}...`);

      const result = await generateImage(pet);
      totalCost += result.cost || 0;

      // Download the image
      await downloadImage(result.imageURL, filename);

      console.log(`  ✓ Saved ${filename} (cost: $${result.cost?.toFixed(4) || "?"})`);
      generated++;

      // Small delay to be nice to the API
      await new Promise((r) => setTimeout(r, 200));
    } catch (error) {
      console.error(`  ✗ Failed: ${error.message}`);
      failed++;
    }
  }

  console.log("\n--- Summary ---");
  console.log(`Generated: ${generated}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total cost: $${totalCost.toFixed(4)}`);
}

main().catch(console.error);
