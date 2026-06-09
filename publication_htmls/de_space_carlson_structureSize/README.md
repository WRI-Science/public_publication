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
