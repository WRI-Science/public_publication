# De-Space Carlson — RAP 10 m fractional-cover validation maps

Interactive Leaflet maps for visually checking **Rangeland Analysis Platform (RAP)
10 m** vegetation fractional cover extracted around fire structure points. Built in
the same style as the structure-size geometry QA maps. Each map has Esri base maps,
toggleable per-band RAP cover overlays (AFG, BGR, LTR, PFG, SHR, TRE), and structure
points colored by band cover with per-band hover tooltips.

> ⚠️ RAP is not meaningful over built/impervious surfaces — expect low,
> unreliable cover in developed cores; mask those before use. Only fires with a RAP
> year (fire year − 1) ≥ 2018 are included (RAP 10 m starts 2018).

## Maps

### [`OR_2020_ALMEDA_DRIVE_rap_cover.html`](OR_2020_ALMEDA_DRIVE_rap_cover.html)

Almeda Drive (OR 2020, RAP 2019) — Rogue Valley towns; 12.0 MB.  
Live: [`https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_rap_cover/OR_2020_ALMEDA_DRIVE_rap_cover.html`](https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_rap_cover/OR_2020_ALMEDA_DRIVE_rap_cover.html)
### [`CO_2020_EAST_TROUBLESOME_rap_cover.html`](CO_2020_EAST_TROUBLESOME_rap_cover.html)

East Troublesome (CO 2020, RAP 2019) — montane forest; 16.8 MB.  
Live: [`https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_rap_cover/CO_2020_EAST_TROUBLESOME_rap_cover.html`](https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_rap_cover/CO_2020_EAST_TROUBLESOME_rap_cover.html)
### [`CA_2025_LA_FIRES_rap_cover.html`](CA_2025_LA_FIRES_rap_cover.html)

LA 2025 Fires (CA 2025, RAP 2024) — urban / WUI; 20.7 MB.  
Live: [`https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_rap_cover/CA_2025_LA_FIRES_rap_cover.html`](https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_rap_cover/CA_2025_LA_FIRES_rap_cover.html)
### [`CO_2021_MARSHALL_rap_cover.html`](CO_2021_MARSHALL_rap_cover.html)

Marshall (CO 2021, RAP 2020) — grassland → suburb; 9.4 MB.  
Live: [`https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_rap_cover/CO_2021_MARSHALL_rap_cover.html`](https://wri-science.github.io/public_publication/publication_htmls/de_space_carlson_rap_cover/CO_2021_MARSHALL_rap_cover.html)

## Where the values come from

Per-structure band means (`AFG10`..`TRE10`, `AFG40`..`TRE40`) are read from the RAP
cover tables produced by `01h_extract_rap_cover.py` — mean % cover per band within
10 m / 40 m buffers, sampled from RAP 10 m `pft` COGs (Allred et al. 2025,
*Scientific Data* 12:1889; CC BY 4.0), streamed from NTSG. The toggleable raster
overlays are the clipped per-fire RAP cover mosaics.

## Related repository

Authoring pipeline:
`exploration/de_space_paper/carlson_fire_validation_scripts/01h_extract_rap_cover.py`
and `01h_validate_rap_cover_maps.py`.

_Generated 2026-06-10 10:26:44 PDT._
