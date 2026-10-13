# Structure Loss Pipeline — published pages

Start at **[`index.html`](index.html)** — since 2026-09-28 a short page that follows
the presentation ([`presentation.html`](presentation.html), maintained separately):
the record, how it works, how well it scores, where it holds up, what's next, and a
"Technical details" section that lists every other page.

Live:
<https://wri-science.github.io/public_publication/publication_htmls/structure_loss_pipeline/>

## What is in this directory

| | |
|---|---|
| **Short read** | `index.html` (mirrors the deck), `presentation.html` (the deck) |
| **Interactive maps** | `maps/footprints.html` (inventory layers on one fire), `maps/calls.html` (first-call predictions right and wrong, leave-one-fire-out), data in `maps/data/` |
| **Current technical** | `how-it-works.html`, `how-it-works-infographic.html`, `models.html`, `changelog.html`, `augmented-carlson.html` |
| **Archive (dated 2026-09-28)** | `pipeline-overview.html`, `how-we-validate.html`, `confusion-matrix.html`, `forward-fires.html`, `combined-series.html`, `outside-california.html`, `uncertainty.html` — describe the previous first call model; each carries a dated banner |
| **Per-fire maps** | `inventory_*.html` and `damage_*.html`, built 2026-09-15 |

Leaflet maps will not render on a github.com blob page — use the Pages link
above, or open the file locally.

## Notes for whoever refreshes this

* The keep / regenerate / remove decision for every file, with a reason each, is
  `docs/publication-inventory.md` in the `structure-loss-pipeline` repository.
  199 pages produced by superseded pipelines were removed on 2026-09-12; git
  history keeps them.
* `scripts/qa_maps.py` copies its output here and **never removes**, so anything
  it stops producing has to be pruned by hand. Its own landing page is
  `qa-maps-index.html`, not `index.html`.
* The NCEAS wordmark is copied from
  <https://www.nceas.ucsb.edu/themes/custom/nceas/components/images/logo-nceas.svg>
  and is also embedded in each map so the map stays self-contained.

## Pages
- [`structure-loss-vs-building-density-is-there-threshold-2026-10-12.html`](structure-loss-vs-building-density-is-there-threshold-2026-10-12.html): **Structure loss vs building density: is there a threshold? · 2026-10-12**. Cumulative share of destroyed buildings against density, and breakpoint tests matched to the roads paper (Fong et al. 2026). Carlson 2002–22, CAL FIRE inspections 2023–26, and our proposed 2002–26 record with and without fires that destroyed 1–9 buildings (614 fires, 346,852 exposed and 90,176 destroyed buildings), each also with its five largest fires removed. Density uses Carlson's own buildings for 2002–22 and our inventory for 2023–26, counted the way Carlson counts and calibrated to Carlson on overlapping fires. Live: <https://wri-science.github.io/public_publication/publication_htmls/structure_loss_pipeline/structure-loss-vs-building-density-is-there-threshold-2026-10-12.html>
- [`wildfire-structure-loss-year-2002-2026-2026-10-12.html`](wildfire-structure-loss-year-2002-2026-2026-10-12.html): **Wildfire structure loss by year, 2002–2026 · 2026-10-12**. Buildings destroyed per year in the conterminous US, from two federal incident-report series, the USGS Carlson hand-mapped record and our satellite model. 2026* is a partial year, through October. Live: <https://wri-science.github.io/public_publication/publication_htmls/structure_loss_pipeline/wildfire-structure-loss-year-2002-2026-2026-10-12.html>
- [`wildfire-structure-loss-paper-exploration-2026-10-12.html`](wildfire-structure-loss-paper-exploration-2026-10-12.html): **Wildfire structure loss: paper exploration · 2026-10-12**. Everything we have tested for the paper, in one place: losses by year 2002–2026, which fires lose buildings, whether building density raises loss, and mobile homes. Urban-conflagration and mobile-home analyses are being added. Live: <https://wri-science.github.io/public_publication/publication_htmls/structure_loss_pipeline/wildfire-structure-loss-paper-exploration-2026-10-12.html>
- [`trees-fences-wind-urban-conflagrations-2026-10-13.html`](trees-fences-wind-urban-conflagrations-2026-10-13.html): **Trees, fences and wind in urban conflagrations · 2026-10-13**. Our 2002–26 record (726 fires), the USGS Carlson record 2002–22 (361) and CAL FIRE inspections 2013–25 (445) · pre-fire tree canopy between neighbouring buildings (two years before each fire), a tree-linked version of the building block, hourly wind gusts, public fence data, and the big losses in sparse treed housing (Gatlinburg, Black Forest, Bastrop) Live: <https://wri-science.github.io/public_publication/publication_htmls/structure_loss_pipeline/trees-fences-wind-urban-conflagrations-2026-10-13.html>
