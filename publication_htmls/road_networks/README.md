# Road Networks: evacuation exits and wildfire burn hazard

Interactive map for the networks paper's analysis of evacuation routes. This is scientific research from the
National Center for Ecological Analysis and Synthesis (NCEAS), University of California, Santa Barbara, shared
for information only. **It is not for use in an emergency or during an active wildfire.**

**Access:** open (anyone with the link can view the page)

## Pages

- [`us_bivariate_map.html`](us_bivariate_map.html): **Wildfire Evacuation Risk Across U.S. Communities**. Live: <https://wri-science.github.io/public_publication/publication_htmls/road_networks/us_bivariate_map.html>

## What the map shows

Each dot is one U.S. community: a city, town, village or census-designated place with fewer than 50,000
residents. There are 30,728 of them, across all 50 states; the District of Columbia is not included. Each dot's
colour combines two measures:

- **Exits:** the number of roads that cross the community's boundary. Only through roads count (OpenStreetMap
  motorway, trunk, primary, secondary and tertiary roads); residential streets and tracks do not. A two-way road
  counts as one exit and a one-way road as half, so 2,293 communities have half-numbers such as 6.5.
  Communities are split into **6 or fewer exits** and **7 or more exits**.
- **Burn hazard:** the average and the highest annual burn probability inside the community's boundary. Each is
  rescaled from 0 to 1 across all communities, and the two are averaged into one score. Communities are then
  grouped as **Low** (the lower half), **Medium** (between the middle and the top tenth) and **High** (the top
  tenth).

## Colour key: a 2 × 3 grid

Number of communities in each group, out of 30,728:

| | Low burn hazard | Medium burn hazard | High burn hazard |
|---|---|---|---|
| **6 or fewer exits** | Blue: 9,186 | Indigo: 8,550 | Dark purple: 2,434 |
| **7 or more exits** | Light grey: 6,178 | Light pink: 3,741 | Red: 639 |

Dark purple marks the combination the map is meant to find: few ways out and a high chance of fire. Where dots
overlap, the darker groups are drawn on top.

## Using the map

- **Welcome screen:** every visit opens with a short introduction and a notice that the map is research, not
  an emergency tool. The map stays greyed out until the reader selects "I understand — explore the map". The
  warning strip under the title brings the notice back at any time.
- **Search:** find any community by name.
- **Details:** hover over a dot (or tap it on a phone) to see the community's population, number of exits and
  burn hazard group.
- **Key:** click a square to hide or show that group; each square shows how many communities it holds.
- **Base map:** light (default), streets or satellite.
- **Phones:** a compact title bar, finger-sized buttons, and details in a sheet that slides up from the bottom.

The map is drawn with MapLibre GL (WebGL) from one compact data block, so it pans and zooms smoothly; the page
is 1.6 MB, down from 30 MB for the February 2026 version. The dots, groups and colours are the same as in that
version.

## Data sources

| Data | Source |
|---|---|
| Community boundaries | U.S. Census Bureau TIGER/Line places (2023) |
| Population | U.S. Census Bureau American Community Survey 5-year estimates (2021) |
| Roads | © OpenStreetMap contributors (ODbL), via OSMnx |
| Burn probability | USDA Forest Service, Wildfire Risk to Communities ([RDS-2020-0016-2](https://doi.org/10.2737/RDS-2020-0016-2)), 270 m cells |
| State lines | [PublicaMundi MappingAPI](https://github.com/PublicaMundi/MappingAPI) U.S. state outlines |
| Base maps | Esri (World Light Gray Canvas, World Street Map, World Imagery) |

## Analysis code

The road-network processing scripts are in the WRI-Science papers repository (`roads/roads_processing_scripts`),
which is private.
