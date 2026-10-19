# FAUNA v1.2.2 — Comparison Studio compatibility fix

Corrects an earlier update package that omitted `engine.js`. Comparison Studio needs the v1.1+ `analyzeCohorts` calculation function.

## iPhone GitHub update

Upload **engine.js**, **index.html**, and **sw.js** to the **root** of the existing GitHub repository, replacing the old copies. No folders are needed, and `examples/` is unchanged. Open the updated website while online and reload/close-reopen the Home Screen app if necessary.

The app stores imported datasets locally in the browser. Updating these source files does not deliberately change saved datasets. **Export a JSON backup before any update.** Do not clear website data or uninstall the app while you still need those records.

## What changed

- `engine.js` now explicitly included in the update to match the Comparison Studio API.
- `index.html` loads JavaScript with v1.2.2 cache-busting identifiers and displays v1.2.2.
- `sw.js` uses a new offline cache version to retrieve the updated source files.
- Analytical model, demo data and map functionality unchanged from v1.2.1.

## Tests

Run `node tests/test-engine.cjs` and `node tests/test-studio.cjs` from the app directory.


## v1.3 Comparative Analysis Lab
Use **Comparative Analysis** in the navigation. Country panels and period categories show individual assemblages as dots, 25th–75th percentile whiskers, and a selected summary estimate. Three weighting modes are visible side by side in the sensitivity table:

- **Pooled NISP:** 100 × sum(target NISP) / sum(denominator NISP); the largest assemblage can dominate.
- **Equal assemblage:** unweighted arithmetic mean of per-assemblage proportions; small and large valid assemblages carry equal weight.
- **Capped weights:** weighted mean of per-assemblage proportions with weights `min(denominator NISP, cap)`; limits but does not eliminate size leverage. A sensitivity technique, **not** a statistically validated bias correction.

The `minimum total NISP` filter applies to all recorded taxa, whereas capped weights use the selected denominator. Select **All caprines** (Sheep + Goat + ambiguous Sheep/goat) or a specific taxon. The `livestock` denominator includes Sheep, Goat, Sheep/goat, Cattle, and Pig only. Group comparisons are descriptive: quartiles are not confidence intervals and records are not necessarily independent. Export individual assemblage-level points and group summaries separately.

For iPhone GitHub uploads, all update files reside in repository root; no subfolders are required. Backup your IndexedDB workspace before replacing files.
