# FAUNA v1.0 — Comparative Zooarchaeology

FAUNA is a static, installable, offline-first Progressive Web App for **comparative zooarchaeological analysis of NISP**. No server, sign-in or account is required. All imported records and taxonomy changes are processed in the browser and retained on the device (IndexedDB where available; localStorage fallback).

## Quick start

1. Extract the ZIP. Keep `index.html`, `app.js`, `engine.js`, `xlsx-lite.js`, `styles.css`, `sw.js`, `manifest.webmanifest`, `icons/`, and `examples/` together.
2. Create a new **public** GitHub repository, e.g. `fauna`. Upload **the unzipped contents to the repository root**; do not upload only the ZIP.
3. GitHub repository → **Settings → Pages → Build and deployment → Deploy from a branch → main / (root)**. Save.
4. Open `https://YOUR-GITHUB-USERNAME.github.io/fauna/` on desktop or iPhone Safari. In Safari, **Share → Add to Home Screen** to install.
5. Start with the explicitly synthetic demonstration dataset (automatically shown on first launch); import your own CSV/XLSX to replace it.

Once cached, FAUNA operates offline. Browser privacy modes, clearing website data, and uninstalling an iPhone Home Screen web app can remove the local database. **Export a JSON backup regularly.** There is no cloud sync.

## Input data

### Long format (recommended)

```
site,country,region,period,context,taxon,nisp,source
Site A,Denmark,Zealand,Late Iron Age,,Ovis aries,42,Example reference
Site A,Denmark,Zealand,Late Iron Age,,Ovis/Capra,95,Example reference
Site B,Sweden,Scania,Viking Age,,Bos taurus,130,Example reference
```

**Required:** site, taxon, NISP. **Optional:** country, region, period, assemblage ID, context, source, latitude, longitude, startYear, endYear. Negative and non-integer NISP are rejected. Zero NISP rows can be included explicitly. Site/context/period are part of the analytical assemblage identity; do not accidentally conflate unrelated contexts.

### Wide format

```
site,country,region,period,Sheep,Goat,Sheep/goat,Cattle,Pig
Site A,Denmark,Zealand,Viking Age,42,2,95,130,75
```

Use the **Wide · taxon per column** tab at import, map site and other metadata, then tick the NISP columns. Blank numeric cells are skipped (not treated as confirmed zero).

Import accepts CSV (including `;` / tab separators), XLSX, or FAUNA JSON backups. The XLSX reader reads ordinary numeric/text values from the **first worksheet only**. **It does not calculate formulas, interpret formatting/merged cells, or support `.xls`**. Export as UTF-8 CSV when Excel input is unusual. XLSX ZIP decompression requires browser `DecompressionStream('deflate-raw')`; if not available use CSV instead. Import files up to 24 MB. CSV with Unicode headers and quoted commas is supported.

Import supports **Replace** (default) and **Append**. Append does not deduplicate rows; reimporting the same records can double-count NISP.

## Analytic tools

- Overview: project-level summary, composition by period, regional heatmap.
- Composition: stacked raw NISP or relative NISP, grouped by site, analytical assemblage, period, region or country.
- Species ratios: `% A/(A+B)` or `A/B`, any taxon categories, with explicit zero-denominator handling.
- Time: period-ordered line charts comparing selected taxa, regions or countries. Editable period order.
- Geography: comparative taxonomic heatmap grouped by site, region or country.
- Assemblages: site/context/period-level counts; NISP CSV export.
- Taxonomy crosswalk: audit and edit label harmonisation, preserving source labels.
- Export: current chart SVG / PNG, active chart data CSV, filtered NISP CSV, assembled wide CSV, full JSON backup.

### Aggregation methods

**Pooled NISP percentage** = `100 × sum(NISP of taxon) / sum(NISP of denominator taxa)`. Assemblages contribute in proportion to NISP.

**Equal-weighted assemblage mean** = arithmetic mean of each eligible site/context/period assemblage's percentage. Each eligible unit has equal weight, irrespective of assemblage size. Here, “assemblage” is identified by country+region+site+period+optional assemblage/context labels. It is *not* a separate excavated sheep individual.

**Denominator = all** includes every recorded taxonomic category in an eligible assemblage. **Denominator = selected** includes only selected taxa. If the numerator is omitted from the selected set, the percentage is undefined. The unselected component of a 100% bar is drawn in pale grey if all taxa constitute the denominator.

**Species-to-species ratios** use only the specified taxon categories, never reallocating the generic `Ovis/Capra` class. With A/B, a zero B count yields undefined; with `A/(A+B)`, a zero A+B total yields undefined. Equal assemblage weighting averages defined within-assemblage statistics only.

### Scientific cautions

1. NISP is **not** the number of animals. No MNI, MNE, biomass, or herd-size estimation is performed.
2. `Ovis/Capra` is not assigned to sheep or goat without independent data. This is descriptive comparison, not the probabilistic OVICAP model.
3. A taxon missing from a published NISP table does not necessarily mean confirmed zero. The app calculates conditional on **recorded** categories.
4. Relative NISP is sensitive to fragmentation, preservation, identification criteria, zooarchaeological recovery, sampling and reporting. Very different assemblage sizes, archaeological contexts or excavation methods can undermine simple comparisons.
5. Chronological categories are **ordinal labels**, not equally spaced quantitative time points. FAUNA never proportionally divides wide periods across shorter periods.
6. Region and country classification is determined by the imported file; verify harmonisation yourself.
7. SVG, PNG and CSV exports are descriptive products; no formal statistical significance, confidence intervals or error models are implied.
8. Demo site names and numbers are **synthetic** and must not be presented as empirical archaeology.

## Upgrading and backup

For later GitHub Pages updates, upload replacement source files into the same paths. Keep `sw.js` and filenames updated together. While online, close/reopen the installed PWA to activate a new service-worker cache. Do not uninstall or clear website data before exporting a JSON backup.

## Development and tests

The calculation engine is independent of the browser (`engine.js`). Run with Node.js:

```
node tests/test-engine.cjs
```

Test coverage: CSV/semicolon parsing, long/wide import, taxonomic alias handling, explicit ambiguity, integer NISP validation, NISP conservation, pooled versus equal assemblage weighting, chronological series, species ratios and CSV roundtrip. Browser-level tests covered interface views, CSV/XLSX import and mobile layout using injected pages in headless Chromium; GitHub Pages installation, offline service worker activation and iPhone Safari behaviour still require testing on real devices.

© 2026 — Prototype. No external JavaScript libraries or remote assets are required.
