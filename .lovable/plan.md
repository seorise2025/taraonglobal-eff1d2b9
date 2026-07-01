## Home page: swap "Gujarat First" for an animated India map

### 1. Remove
- Delete the entire **Gujarat First** section from `src/routes/index.tsx` (the "Built in Ahmedabad, Sold Across Gujarat" band with the city grid).

### 2. Also remove the current text-list India Coverage block from `/applications`
- Keep the existing `IndiaCoverage` text component only if you want it — my recommendation is to replace it entirely with the new map component so we don't ship two "India coverage" blocks. Confirm below.

### 3. Build the new component: `IndiaMapCoverage`
File: `src/components/site/IndiaMapCoverage.tsx`

- Real SVG map of India with all 28 states + 8 UT paths (sourced from a public-domain India TopoJSON/SVG, inlined so no runtime fetch).
- Ahmedabad pin (approx 23.03°N, 72.58°E) marked with a pulsing gold dot + label.
- Animation loop (Motion for React):
  1. On scroll into view, Ahmedabad dot pulses.
  2. Curved gold arcs draw from Ahmedabad to each state capital, staggered (~40ms each) using `pathLength` 0→1.
  3. As each arc completes, a small dot lands on the destination and the state fill deepens from cream → forest green.
  4. Loops subtly every ~12s (arcs fade, replay) — respects `prefers-reduced-motion` (static end-state only).
- Alongside the map: heading "From Ahmedabad to Farms Across India", the copy block already supplied, and the 6 benefits chips.
- Uses existing tokens: `forest-deep`, `gold`, `cream`, `ink`, Fraunces/Inter. No new colors introduced — theme stays consistent across the site.

### 4. Place the new component
- Insert `<IndiaMapCoverage />` on the home page where "Gujarat First" used to live.
- Replace the current `<IndiaCoverage />` on `/applications` with `<IndiaMapCoverage />` so both pages share one polished treatment.

### 5. Theme consistency check
- No new palette. Reuse existing tokens; the "theme" here = a shared visual language for the map (forest fills, gold arcs, cream base, subtle border hairlines) applied identically on Home and Applications.

### Technical details
- Library: Motion for React (already in the project). No new deps if we hand-inline the SVG. If a compact India SVG isn't already in the repo, I'll add one small static asset at `src/assets/india-map.svg` (paths only, ~15–25 KB).
- State coordinates for arc endpoints stored inline in the component (capital lat/lng → projected to SVG viewBox via a small linear projection helper).
- Accessibility: `role="img"` + `aria-label` summarising coverage; benefits list stays as real text below.

### Quick confirmation before I build
1. OK to fully remove the current text-list `IndiaCoverage` from `/applications` and replace it with the new map version? (Recommended — otherwise the page shows the same info twice.)
2. Any preference on map style: **filled states** (each state fills in as an arc lands) or **outline-only** map with just animated arcs + destination dots? I'll default to filled states unless you say otherwise.
