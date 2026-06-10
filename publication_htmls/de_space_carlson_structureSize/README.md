# De-Space Carlson structure-size — predictor QA maps

Interactive Leaflet maps for visually checking structure-size-aware 0-100 ft
predictor extraction around fire structures (`de_space_carlson_structureSize`).

Each map shows structure points, the 0-100 ft analysis buffer, toggleable
pre-fire landcover and raw NDMI rasters, and hover tooltips with landcover pixel
counts, NDMI composites, and 200 m structure density.

## Maps

### [`CA_2018_CAMP_geometry_qa.html`](CA_2018_CAMP_geometry_qa.html)

CAMP (CA 2018) — 47.9 MB.  
Live: [`https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_structureSize/CA_2018_CAMP_geometry_qa.html`](https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_structureSize/CA_2018_CAMP_geometry_qa.html)
### [`CA_2020_CZU_AUG_LIGHTNING_geometry_qa.html`](CA_2020_CZU_AUG_LIGHTNING_geometry_qa.html)

CZU AUG LIGHTNING (CA 2020) — 19.6 MB.  
Live: [`https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_structureSize/CA_2020_CZU_AUG_LIGHTNING_geometry_qa.html`](https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_structureSize/CA_2020_CZU_AUG_LIGHTNING_geometry_qa.html)

## RAP 10 m fractional-cover validation maps

Visual checks of **Rangeland Analysis Platform (RAP) 10 m** vegetation fractional
cover extracted around structure points (`pft` product: AFG, BGR, LTR, PFG, SHR,
TRE — all % cover, 0–100). Each map has an Esri World Imagery basemap, toggleable
per-band RAP cover overlays (high-contrast ramp; cover "lights up" over imagery),
and structure points colored by tree (TRE) 40 m mean cover with per-band tooltips.
Only fires with a RAP year (fire year − 1) ≥ 2018 are included (RAP 10 m starts 2018).

> ⚠️ RAP is not meaningful over built/impervious surfaces — expect low, unreliable
> cover in developed cores; mask those before use.

### [`CO_2020_EAST_TROUBLESOME_rap_cover.html`](CO_2020_EAST_TROUBLESOME_rap_cover.html)
East Troublesome (CO 2020) — montane forest.  
Live: [`https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_structureSize/CO_2020_EAST_TROUBLESOME_rap_cover.html`](https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_structureSize/CO_2020_EAST_TROUBLESOME_rap_cover.html)
### [`CO_2021_MARSHALL_rap_cover.html`](CO_2021_MARSHALL_rap_cover.html)
Marshall (CO 2021) — grassland → suburb.  
Live: [`https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_structureSize/CO_2021_MARSHALL_rap_cover.html`](https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_structureSize/CO_2021_MARSHALL_rap_cover.html)
### [`OR_2020_ALMEDA_DRIVE_rap_cover.html`](OR_2020_ALMEDA_DRIVE_rap_cover.html)
Almeda Drive (OR 2020) — Rogue Valley towns.  
Live: [`https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_structureSize/OR_2020_ALMEDA_DRIVE_rap_cover.html`](https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_structureSize/OR_2020_ALMEDA_DRIVE_rap_cover.html)
### [`CA_2025_LA_FIRES_rap_cover.html`](CA_2025_LA_FIRES_rap_cover.html)
LA 2025 fires (CA 2025) — urban / WUI.  
Live: [`https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_structureSize/CA_2025_LA_FIRES_rap_cover.html`](https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_structureSize/CA_2025_LA_FIRES_rap_cover.html)

RAP cover values come from RAP 10 m `pft` COGs (Allred et al. 2025, *Scientific Data*
12:1889; CC BY 4.0), streamed from NTSG and summarized as the mean % cover per band in
10 m / 40 m buffers. Authoring pipeline:
`exploration/de_space_paper/carlson_fire_validation_scripts/01h_extract_rap_cover.py`
and `01h_validate_rap_cover_maps.py`.

## Where the values come from

Per-structure tooltip and coloring values (`Trees100ft`, `RangLand100ft`,
`ndmi_recent_100ft_raw`, `ndmi_prevgs_100ft_raw`, `ndmi_recent_100ft_gt001`,
`struct_count_200m`) are read from the already-computed master table
`final/carlson_structuresize_master_analysis.parquet` — they are NOT recomputed.
The toggleable background raster images (pre-fire landcover, raw NDMI) are
re-fetched fresh from the Microsoft Planetary Computer at map-build time, using
the same pre-fire year / fire-relative windows as the pipeline, purely for
display.

## Related repository

Authoring pipeline:
`exploration/de_space_paper/de_space_carlson_structureSize/08_structure_zone_qa_maps.py`

Share outputs:
`/home/shares/wwri-wildfire/papers/d-space/de_space_carlson_structureSize/qa_maps/`

_Generated 2026-06-09 10:20:23 PDT._
