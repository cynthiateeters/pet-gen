# Pet Image Generator

Behind-the-scenes tool for generating pet images for HAP's Animal Placement demo site.

## The story

This project is a teaching artifact — a look behind the curtain at human-AI collaboration.

HAP's Animal Placement is a fictional pet adoption site used to teach JavaScript array methods to students. But the pets needed images. Creating 48 unique pet illustrations manually would take hours. Instead, we (Cynthia + Claude) built this generator together.

### What we did

1. **Designed the data structure together** — We needed pets with unique IDs (teaching `.find()`), species categories (teaching `.filter()`), and personality descriptions (teaching real-world data). Claude proposed a structure; I refined it with shelter-style descriptions.

2. **Chose an AI image service** — After reviewing options, we picked [Runware](https://runware.ai) for its simple REST API and FLUX.1 Schnell model (fast, cheap, good quality).

3. **Crafted the prompt formula** — Getting consistent cartoon-style images required iteration. We landed on:

   ```
   simple cartoon illustration of a [visual description], white background, [expression] expression, flat colors
   ```

   The expression varies by temperament (playful → happy, shy → gentle, etc.) for personality.

4. **Built the generator** — Claude wrote the Node.js script; I tested and tweaked. The script reads pet data, builds prompts, calls the API, downloads images.

5. **Generated all 48 images** — One command, ~2 minutes, ~$0.06 total cost.

### Why this matters for teaching

Students learning JavaScript don't need to know the images were AI-generated. But for those who ask "how was this made?" — here's the answer. The `prompt` field in each pet's data tells the AI what to draw. The `description` field tells humans about the pet's personality. Two fields, two audiences.

This is what AI collaboration looks like: iterating on ideas, trying things, adjusting when they don't work, and documenting the process.

## Usage

### Prerequisites

- Node.js 18+
- [Runware API key](https://runware.ai) (free tier available)

### Generate images

```bash
export RUNWARE_API_KEY="your-key-here"
node generate.js
```

Images save to `./images/{id}.webp`. Existing images are skipped (safe to re-run).

### Output

- 48 WEBP images at 512×512px
- Named by pet ID (e.g., `a3f8c1.webp`)
- Total cost: ~$0.06 (FLUX.1 Schnell @ ~$0.0013/image)

## Files

| File          | Purpose                                       |
| ------------- | --------------------------------------------- |
| `pets.js`     | Complete pet data with prompts + descriptions |
| `generate.js` | Image generation script                       |
| `images/`     | Generated pet images (48 total)               |

## The prompt field

Each pet has a `prompt` field designed for image generation:

```javascript
{
  id: "a3f8c1",
  name: "Whisker",
  prompt: "fluffy orange tabby cat with green eyes",  // For the AI
  description: "A classic tabby who lives for chin scratches...",  // For humans
  // ...
}
```

We kept the prompt in the data intentionally — it shows students how AI-generated content works.

## Temperament → expression mapping

To add personality without sacrificing visual consistency:

| Temperament  | Expression |
| ------------ | ---------- |
| calm         | peaceful   |
| playful      | happy      |
| affectionate | friendly   |
| shy          | gentle     |
| energetic    | excited    |
| independent  | confident  |

## On working with AI: iteration over perfection

A common misconception about AI tools is that you need to craft the "perfect prompt" to get good results. This project demonstrates the opposite: **iteration beats perfection**.

### How we actually developed the prompts

We didn't sit down and write the final prompt formula on the first try. The process looked like this:

1. **Started simple** — "a cat" (too generic, inconsistent styles)
2. **Added style** — "cartoon cat" (better, but still varied wildly)
3. **Added constraints** — "simple cartoon illustration of a cat, white background" (more consistent)
4. **Refined details** — added "flat colors" to prevent shading variations
5. **Added personality** — mapped temperament to expression words

Each iteration taught us something. The "failures" weren't wasted — they informed the next attempt.

### AI helping write prompts for AI

Here's where it gets meta: Claude (a text AI) helped write prompts for FLUX (an image AI).

This is a legitimate collaboration pattern:

- **Claude understands language** — it can suggest which adjectives produce consistent results
- **Claude sees patterns** — after a few test images, it can identify what's working
- **Claude can systematize** — it turned individual prompts into a reusable formula

Sometimes Claude even helped refine prompts for itself. When asked "how should we structure this data?", Claude proposed options, I reacted, and Claude refined based on my feedback. The AI was effectively prompting itself through the human.

### What this means for students

When you work with AI tools:

- **Don't aim for perfect** — aim for "good enough to learn from"
- **Iterate quickly** — try something, see what happens, adjust
- **Use AI to help with AI** — ask one tool to help you use another
- **Document your process** — the journey is as valuable as the destination

The `prompt` field in each pet's data isn't just functional — it's a record of this iterative process, preserved for anyone who wants to understand how AI-generated content actually gets made.

## License

MIT License

Copyright (c) 2026 Cynthia Teeters

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
