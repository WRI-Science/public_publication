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
