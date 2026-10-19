# FAUNA v1.2.1 — Comparative Zooarchaeology

Maintenance update for Map Explorer. This builds on v1.2 and retains Comparison Studio, Visualisation Lab, all imports/exports and the offline coastline.

## Georeferenced demonstration data
- The built-in synthetic six-site dataset includes approximate coordinates. All NISP counts remain synthetic.
- The downloadable `examples/illustrative_nisp.csv` now includes latitude/longitude for Example A–D. These points are illustrative places, **not** excavations or historical site locations.
- Older FAUNA v1.0/v1.1 demonstration records saved on an iPhone are recognised by exact site names **and** synthetic provenance. Missing demo coordinates are supplied when the workspace opens. Real datasets are never automatically geocoded.

## Coordinate repair
When units are missing coordinates, Map Explorer displays a repair panel. Select the site, enter signed decimal latitude and longitude, and save. The position applies to all taxon rows and archaeological phases sharing that site + country. Review it carefully if distinct sub-sites have been entered under the same site name. Coordinates persist in the local workspace and JSON backup.

Records without coordinates remain available for *all* non-map comparisons. A missing coordinate is not set to zero. The map does not independently geocode real sites.

## Installing the update
Replace `app.js`, `styles.css`, `sw.js`, `index.html`, `README.md`, and `examples/illustrative_nisp.csv` in the GitHub Pages repository (the last item stays in the `examples/` folder). Keep `engine.js`, `coastline.js`, `xlsx-lite.js`, `manifest.webmanifest`, and icons intact. Export a JSON backup before updating. The new cache version is `fauna-core-v1.2.1`. Open online and restart installed PWA to activate.

## Methodological cautions
Latitude and longitude must come from a reliable record. Coordinates saved in the demo are only for testing the map. Existing filters still apply to both the map and comparative statistics. The app does not infer MNI from NISP or distribute ambiguous sheep/goat bones across species.
