# FSIM NPS places: wildfire risk to U.S. cultural resources

Interactive map for [*Wildfire risk to United States cultural resources*](https://doi.org/10.1038/s41598-026-52407-9)
(Mona M. Farnisa, Benjamin S. Halpern, Caitlin R. Fong, *Scientific Reports* 16, 21599, 2026; open access). This is scientific research from the National Center for Ecological
Analysis and Synthesis (NCEAS), University of California, Santa Barbara, shared for information only.
**It is not for use in an emergency or during an active wildfire.**

**Access:** open (anyone with the link can view the page)

## Pages

- [`us_interactive_map.html`](us_interactive_map.html): **Wildfire risk to United States cultural resources**. Live: <https://wri-science.github.io/public_publication/publication_htmls/fsim_nps_places/us_interactive_map.html>

## What the map shows

Each dot is one place listed on the National Register of Historic Places: 56,106 places in all 50 states (the
District of Columbia is not included). These are the listed places where the land at the place itself has some
chance of burning; places where that chance is zero are left out. Each dot sits at the centre of the place's
mapped outline.

A **Colour by** switch colours the dots, and the key, by one of three things. Numbers are places in each group,
out of 56,106:

| Colour by | Groups |
|---|---|
| **Burn hazard** (default) | Low 28,053 · Moderate 22,442 · High 5,611 |
| **Level of significance** | International 1 · National 4,426 · State 13,436 · Local 38,130 · not recorded 113 |
| **Property type** | Building 38,199 · District 12,149 · Structure 3,446 · Site 2,041 · Object 244 · not recorded 27 |

- **Burn hazard:** the average and the highest annual burn probability within 500 m of each place, each
  rescaled from 0 to 1 across all places (the top 1% capped at 1) and averaged. Places are grouped as Low (the
  lower half), Moderate (between the middle and the top tenth) and High (the top tenth).
- **Level of significance:** from each place's National Register nomination. Where a nomination gives several
  levels, the map shows national first, then state, then local.
- **Property type:** the National Register category: building, district, structure, site or object.

The colours match the figures in the paper.

## Using the map

- **Welcome screen:** every visit opens with a short introduction and a notice that the map is research, not
  an emergency tool. The map stays greyed out until the reader selects "I understand — explore the map". The
  warning strip under the title brings the notice back at any time.
- **Search:** find a place by its name or town.
- **Details:** hover over a dot (or tap it on a phone) to see the place's town and state, burn hazard,
  significance, property type and listing year. National Historic Landmarks are marked, and most places link
  to their nomination record in the National Archives catalog.
- **Key:** click a group to hide or show it; each row shows how many places it holds.
- **Base map:** light (default), streets or satellite.
- **Phones:** a compact title bar, finger-sized buttons, and details in a sheet that slides up from the bottom.

The map is drawn with MapLibre GL (WebGL), with each place drawn once. The page is 4.8 MB, down from 30 MB for
the May 2026 leaflet version, which drew every place three times, once for each colouring. The places,
positions and colours are the same as in that version.

## Paper

Farnisa, M. M., Halpern, B. S. & Fong, C. R. Wildfire risk to United States cultural resources. *Scientific Reports*
16, 21599 (2026). <https://doi.org/10.1038/s41598-026-52407-9>

## Data sources

| Data | Source |
|---|---|
| Listed places | National Park Service, [National Register of Historic Places](https://www.nps.gov/subjects/nationalregister/data-downloads.htm) listings (June 2025) and mapped outlines |
| Records | National Archives catalog links from the National Register listings |
| Burn probability | USDA Forest Service, Wildfire Risk to Communities ([RDS-2020-0016-2](https://doi.org/10.2737/RDS-2020-0016-2)), 270 m, for the lower 48 states, Alaska and Hawaii |
| State lines | [PublicaMundi MappingAPI](https://github.com/PublicaMundi/MappingAPI) U.S. state outlines |
| Base maps | Esri (World Light Gray Canvas, World Street Map, World Imagery) |

## Analysis code

The scripts are in the WRI-Science papers repository (private), on `main`, under
`fsim_nps_places/scripts for publication/`: steps 01–04 build the data and the paper's figures, and
`05b-interactive-us-map-webgl.py` builds this map.
