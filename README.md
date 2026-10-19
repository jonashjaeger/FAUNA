# FAUNA v1.2 — Comparative Zooarchaeology

An offline-first PWA for comparing site-level NISP counts. Adds **Map Explorer** and **Visualisation Lab** to the v1.1 Comparison Studio.

## New in 1.2
- Bundled offline regional coastline outlines, with geographic markers created from latitude and longitude in the imported dataset.
- Markers display selected-taxon shares or total NISP (size), and show unit counts, periods and bibliography by site.
- Multiple site selection on the map; export the selection as a new independently filtered Comparison Studio group or open a linked chart.
- Export the displayed map as standalone SVG or PNG.
- Linked Visualisation Lab: choose grouping (period, country, region, site, assemblage), taxonomic composition or ratio, display mode, weighting, and bar/line/heatmap chart.
- Restrict the chart to map-selected sites without altering the source dataset. Figure SVG/PNG and chart CSV export preserved.
- Illustrative demo dataset now includes *approximate* geographic locations, explicitly not archaeological results.
- `n`/`e` accepted as optional latitude/longitude column mappings when manually importing tables.

## How to publish
Upload all files, including `coastline.js` and subdirectories, to the root of your GitHub Pages repository. Enable Pages for `main` / `/(root)`. On iPhone, open in Safari, then Add to Home Screen. Preserve saved local data and export JSON backups before updating.

## Limits and research safeguards
- NISP is **not** MNI, and mapped sites are not necessarily independent archaeological samples. Repeated phases at the same site are combined on one map marker, but remain individual assemblage units for statistical comparisons.
- Coordinates are drawn from supplied fields, not geocoded or checked. Sites with missing/invalid coordinates still appear in the non-spatial analyses.
- Coastline outlines use bundled simplified GSHHG geographic data via Basemap. This is a regional schematic, not a cadastral or bathymetric map. No street basemap or map tiles are included. For imported datasets outside the map's European coverage, points can display without the same level of land context.
- Pooled NISP weights assemblages by fragments; equal-weighted means weight analytical units equally. Period labels are categories, not equally spaced dates.
- Missing taxa cannot automatically be distinguished from genuine zeroes. No automatic sheep/goat allocation.
- Browser storage is local. Download JSON backups; uninstalling/clearing data can erase local work.

## Technical checks
Run `node tests/test-engine.cjs` and `node tests/test-studio.cjs`. Further smoke tests for the map and chart lab are provided in tests. The iPhone offline install remains to be verified on-device.

## Geographic dataset attribution
Offline coastline polygons: GSHHG shoreline data, NOAA/Wessel & Smith, included via matplotlib Basemap package, simplified for browser display.
