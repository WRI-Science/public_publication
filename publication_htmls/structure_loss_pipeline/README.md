# Structure loss pipeline — Camp QA maps

Interactive Leaflet maps for visually checking structure-loss labels and
predictions on the 2018 Camp Fire (Paradise, CA). Built by the
`structure_loss_pipeline` QA-map stage.

Each map has a circled **i** (top left, and beside every layer). Press
it for a plain-language glossary (what a “chip” is, who Carlson is,
what B/U means, and why “outside chips” is not a model miss) plus
per-layer meaning and sources. A small official NCEAS wordmark in the
bottom left is embedded in the HTML and links to
[nceas.ucsb.edu](https://www.nceas.ucsb.edu/).

## Maps

### [`camp_qa.html`](camp_qa.html)

Camp QA — USA Structures footprints, U-Net predictions, and Carlson
points (destroyed / surviving). 12 MB.  
Live: [`https://wri-science.github.io/public_publication/publication_htmls/structure_loss_pipeline/camp_qa.html`](https://wri-science.github.io/public_publication/publication_htmls/structure_loss_pipeline/camp_qa.html)

### [`camp_qa_google_ms.html`](camp_qa_google_ms.html)

Comparison only: same Camp Carlson points against **Overture** footprints
(Microsoft ML Buildings ∪ OpenStreetMap in this extract) and USA
Structures. Google Open Buildings is **not** in this Camp file. Does not
change training labels. 12 MB.  
Live: [`https://wri-science.github.io/public_publication/publication_htmls/structure_loss_pipeline/camp_qa_google_ms.html`](https://wri-science.github.io/public_publication/publication_htmls/structure_loss_pipeline/camp_qa_google_ms.html)

`nceas-logo.svg` is the official NCEAS wordmark copied from
https://www.nceas.ucsb.edu/themes/custom/nceas/components/images/logo-nceas.svg
(also embedded in each HTML so the map is self-contained).

## Viewing online

GitHub Pages is enabled for this repository from the `main` branch (site
root). Leaflet maps will not render on the github.com blob page; use the
Live links above.

## Related repository

Authoring pipeline: `structure-loss-pipeline` (local working copy).  
Share outputs: `/home/shares/wwri-wildfire/structure_loss_pipeline/outputs/qa_maps/`
