# Founder Section Rewrite — Design

## Goal
Replace the anonymous, generic-luxury "empire" copy in the founder section with a personal, storytelling narrative naming the real founder, grounded in his actual LinkedIn/Instagram positioning (see `project_akira_cacao_surandrea` memory). Every line should build trust by being specific and human, not corporate.

## Scope
`data.js` `founder` object content only, plus two small new template elements (byline, pull-quote) in `index.js` and matching styles in `index.css`. No layout/section restructuring, no changes to the Ritual (process) section.

## Framing
Farmer-scientist precision (headline/hook) blended with land/legacy voice (body, timeline) — approved direction. Adds a new personal thread: he's a graduate who chose farming out of passion, not necessity — used as the trust-building hook in paragraph 1.

## Name note
Using "Nandigam Surendra" per the verified LinkedIn URL slug (`nandigam-surendra-682b6251`) supplied earlier in this session. If the correct spelling is actually "Surandrea," flag it and it's a one-line find/replace in `data.js`.

## Content model changes (`data.js` → `founder` object)
- New field `byline`: name + role line, rendered under the headline.
- New field `quote`: a founder-voice pull-quote, explicitly a crafted statement (not claimed as a verbatim social post).
- `timeline[].year` repurposed from fake "Year 1/3/5" to a short thematic tag (e.g. "THE SOIL") — same field, no schema change, since the `.timeline-year` slot already renders a short uppercase label.
- `eyebrow`, `headlineHtml`, `paragraphs`, `imageAlt` rewritten in place.

## Final copy

**Eyebrow:** `Chagallu, West Godavari`

**Headline:** `Cacao Isn't a Commodity Here.<br><em>It's Earned, Bean by Bean.</em>`

**Byline:** `Nandigam Surendra — Farmer & Founder, Akira Cacao Farms`

**Paragraph 1:**
"Surendra didn't have to become a farmer. He's a graduate who could have chosen any other path — but the soil of the Godavari Delta called him back. Today he spends his mornings walking rows of cacao in Chagallu, checking pods by hand, because for him this was never a fallback. It was the work he wanted."

**Paragraph 2:**
"What he sells isn't just cacao — it's a promise that nothing was rushed. Every pod is picked at peak ripeness, broken the same day, and fermented the old way, in wooden boxes, under banana leaves. No shortcuts, no filler beans, no story dressed up to look better than it is. Just what the Godavari Delta actually grew, and a farmer who stands behind every batch himself."

**Pull-quote:**
"Cacao isn't a commodity to me. It's soil, monsoon, and patience — carried by hand until the flavour is finally earned."

**Timeline** (tag / title / text):
1. `THE SOIL` — "Below the Canopy" — "Poly-crop shade and living soil beneath the Godavari Delta — the flavour of every bean starts here, long before harvest."
2. `THE CRAFT` — "By Hand, Not by Shortcut" — "Selective picking, same-day pod breaking, and natural fermentation in wooden boxes — tended personally, batch by batch."
3. `THE TRUST` — "A Farmer You Can Trace" — "Hand-sorted, sun-cured, and delivered as fine-flavour cacao — grown by someone who puts his name on it."

**Image:** keep `images/authentic_farmer.png`, update `imageAlt` to `"Nandigam Surendra, founder of Akira Cacao Farms"`. Flagged as a stock/illustrative asset — swap when a real photo is available.

## Implementation touch points
1. `data.js` — rewrite `founder` object with the copy above, add `byline`/`quote` fields.
2. `index.js` — render `byline` under the headline and `quote` as a `<blockquote class="founder-quote">` before the timeline.
3. `index.css` — add `.founder-byline` and `.founder-quote` styles using existing tokens (`--c-gold`, `--f-heading`, `--c-text-light`), no new visual system.

## Self-review
- No placeholders/TBDs.
- No fact claimed that isn't sourced from prior research or explicitly flagged as crafted (the quote).
- Scope contained to founder section; doesn't touch Ritual/process section content.
- No git repo at `C:\surandrea` — nothing to commit; this file is saved for the record only.
