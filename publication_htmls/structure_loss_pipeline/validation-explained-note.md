<!-- NOTE FOR THE PUBLICATION AGENT — this file is source material, not a published page. -->

# Note for the publication agent: how the damage model is validated

**What this is.** A copy of `docs/validation-explained.md` from the
`structure-loss-pipeline` repository, dropped here so the site can lift it. It is
**not** a page and nothing links to it. It is written for the site's audience — a
scientist arriving cold, no internal vocabulary, no bundle names, no run tags — so
it can be adapted into a page (or a section of *the method in full*) with editing
rather than rewriting.

**Suggested placement.** Either a new page, *How we know it works*, sitting between
*the method in full* and *how certain*; or a validation section inside *the method
in full*, with §9 (the alternatives, and the experiment) as its own deep-dive
anchor.

**Before publishing, check three things.**

1. **§9.4's numbers are dated 2026-09-14** and come from the `design_a_vs_b/v1`
   output directory. If that has been re-run, re-read it.
2. **The tables name fires in plain English** (Eaton 2025, South Fork NM 2024) and
   never a run tag or a bundle name. Keep it that way — the newcomer test fails a
   build on internal identifiers.
3. **The "Where every number comes from" table at the end lists repository-relative
   paths.** On the site those belong in a provenance footer, not in the body, and
   they must stay relative — no absolute paths.

**One framing note the owner asked for.** §9.6 is the part a reader will quote: the
two training designs answer two different questions, the product uses one and the
paper reports the other, and both are legitimate. Do not compress that into
"our design won".

---

# 🧪 How the damage model is validated

*Written 2026-09-14. Every number below is transcribed from a file the pipeline
wrote; the last section says which file. This document measures and explains. It
changes no default, threshold, model or configuration value.*

The model answers one question about one building: **did this structure burn?** It
reads a before-and-after pair of Sentinel-2 satellite composites at the building's
location and returns a number between 0 and 1. A cut-off turns that number into a
call. Everything in this document is about how we find out whether the call is
right, on a building the model has never seen, on a **fire** it has never seen.

**The one-sentence answer.** Every published score comes from a model that was
never shown the fire it is scoring. We do that by fitting the model seventy-four
times — once with each fire removed — so each fire is scored by a model trained
on the other seventy-three; then we choose the cut-off from those held-out scores
rather than from the fires themselves; then we check the whole thing again on
fires and on damage surveys that are outside the training set entirely.

---

## 1. What the model is trained on

### 1.1 The pool: 74 fires, 618,826 buildings

| | fires | buildings | of which destroyed |
|---|--:|--:|--:|
| **Historical record** (hand-digitised, 2016–2022) | **66** | **582,554** | 51,628 |
| **Field inspections** (2024–2025) | **8** | **36,272** | 17,779 |
| **Total** | **74** | **618,826** | **69,407** |

The 66 historical fires span **eleven states** — 41 in California, 9 in Oregon,
4 in Colorado, 3 in Washington, 2 each in Oklahoma and Tennessee, and one each in
Florida, Kansas, New Mexico, Texas and Utah — and seven fire years: 4 fires in
2016, 14 in 2017, 7 in 2018, 1 in 2019, 26 in 2020, 8 in 2021 and 6 in 2022.

The 8 inspected incidents are the Airport, Borel, Bridge, Mountain and Park fires
of 2024 and the Eaton, Palisades and TCU Complex fires of 2025 — seven in
California plus one complex — 2024 and 2025 only.

⚠️ **Both halves are dominated by a few fires.** The three largest historical
fires hold 29 % of that half's buildings; Eaton and Palisades alone hold **84 %**
of the inspected half. That single fact is why every headline in this project is
reported twice — once pooled over buildings and once averaged over fires — and
why the two numbers differ by four to fourteen points.

### 1.2 What "destroyed" means, and it means two different things

| | the historical record | the field inspections |
|---|---|---|
| what a row is | a **major building** someone drew a point on, reading a before/after image pair | a **structure an inspector stood next to** — including mobile homes, accessory dwellings and outbuildings |
| the damage value | destroyed / surviving, two classes | six classes: No Damage · Affected (>0–10 %) · Minor (10–25 %) · **Major (25–50 %)** · Destroyed (>50 %) · Inaccessible |
| how we make it binary | used as published | **Destroyed (>50 %) → destroyed**; No Damage / Affected / Minor → **surviving**; **Major (25–50 %) and Inaccessible are dropped**, counted, and never become a training row |

Dropping the 25–50 % band is a choice, not a fact: "half burned" is neither
destroyed nor intact, and "inaccessible" was never actually inspected. Over the
fifteen fires the product publishes, that choice drops **352 inspection records**.

⚠️ **The two sources count different buildings.** On the same ground, over
seventeen fires, the inspectors' destroyed count divided by the digitisers'
destroyed count runs **0.82 to 1.84, median 1.24**, and is above 1 on 14 of 17
fires. That is a counting-unit difference of up to 1.8× that has nothing to do
with this model, and it is why no score in this project ever pools the two truths
into one number.

### 1.3 Why the field inspections are in the training pool at all

They were not, at first. The first model trained on the historical record only,
and the inspections were held back so that scoring them was a genuine
out-of-sample test. Two things then changed the design.

**First, adding them made the model better in a way that mattered.** Pooling the
inspections with the historical record and holding out one *incident* at a time
moved pooled F1 from 0.845 to **0.903** and mean-per-fire F1 from 0.844 to
**0.865**, with recall rising from 0.767 to **0.882** for 1.7 points of precision
and **no incident getting worse**. Same learner, same 62 features, same seed — the
only change was which fires were in the pool.

**Second, and this is the reason the design is defensible rather than merely
better,** each fire's *own* best cut-off moved from a wildly base-rate-tracking
0.31–0.96 spread into 0.64–0.93. Before, a single shipped threshold was
indefensible because every fire wanted a different one. After, one threshold is a
reasonable thing to ship.

**What it cost.** Once the inspections are training rows, "score them with the
frozen model" stops being an out-of-sample check, and the pipeline refuses to
perform it — the honest number for those eight incidents is the leave-one-out
table in §2, and the truly forward test becomes a **time** hold-out (§5.3).

⚠️ **The inspected incidents are not independent new ground.** Of the 74,276
structures in the 25 *unused* 2017–2022 inspection incidents, **95.3 % lie within
100 m of a historical point of the same fire year** and 70.7 % within 10 m. So
adding inspections is mostly a **second opinion on buildings already in the pool**,
not new geography — which is exactly why the eight in the pool are restricted to
2023 and later, where the historical record stops.

---

## 2. Leave-one-fire-out, exactly

### 2.1 The rule

For a pool of *N* fires, the rule is:

> For each fire *f* in the pool, fit a model on **all the other N − 1 fires** and
> use it to score every building in *f*. Keep that score. Move to the next fire.

When it has run *N* times, every building in the pool carries a score produced by
a model that **never saw its fire** — not that building, not its neighbour, not
any building in the same fire. The collection of those scores is called the
**out-of-fold** table.

The unit is the *fire*, not the building, and not a random sample of buildings.
That is the whole point. Buildings inside one fire share a satellite scene, a
season, a fuel type, a wind event, a smoke layer and a single digitiser or
inspection crew. A model that has seen half a fire has effectively seen the other
half. Holding out a fire is the smallest hold-out that cuts every one of those
shared threads at once.

This project has measured the difference: the same model scored with blocks held
out **inside** each fire reaches AUC 0.990; scored with whole fires held out it
reaches 0.985. The gap is small here and large elsewhere — a published study on
more than 100,000 of the same inspections measured 88.0 % under random
cross-validation falling to **68.0 %** under spatial blocking, and the only
comparable 10 m per-building benchmark measured F1 0.800 on a random split against
**0.655** event-blocked. Leave-one-fire-out is the honest one, so it is the primary
score and the block view is reported only for comparison.

### 2.2 How it is actually run, on this pool

The pool is 74 fires, and the folds are run in two passes because the two halves
answer different questions:

* **The eight inspected incidents** each get a fold. Each is scored by a model
  fitted on the **other 73** fires — the 66 historical fires plus the seven other
  incidents. Eight fits.
* **The 66 historical fires** each get a fold too. Each is scored by a model
  fitted on the **other 73** — every other historical fire plus all eight
  incidents. Sixty-six fits.

Every fire in the pool therefore has a score from a 73-fire model, and
**582,554 + 36,272 = 618,826** buildings each carry an out-of-fold score. The two
tables are reported separately because the two truths are not the same truth
(§1.2), never pooled into one figure.

### 2.3 What is pooled, and what is averaged over fires

Every result is given twice.

* **Pooled** — throw all the out-of-fold rows into one confusion matrix. This
  answers *"across all these buildings, how often are we right?"* It is dominated
  by the biggest fires: two fires carry 84 % of the inspected half.
* **Mean-per-fire** — compute the score separately for each fire, then average the
  fires, one vote each. This answers *"what should I expect on the **next** fire?"*,
  which is the question a user actually has. A fire joins this average only if it
  has at least 100 scored buildings and at least 10 destroyed ones; below that its
  score is a statement about a handful of buildings. Fires below the bar are still
  pooled and still counted.

On the eight inspected incidents at the shipped cut-off, pooled F1 is **0.9158**
and mean-per-fire F1 is **0.8729** — a four-point gap that is entirely the
weighting. On the 66 historical fires the same two numbers are **0.8513** and
**0.7797** — a seven-point gap, because there are more small fires. Neither is
wrong. Quoting one without the other is.

---

## 3. Where the cut-off comes from, and why that is also held out

### 3.1 The rule that chooses the rule

The model returns a probability; a threshold turns it into a call. Choosing that
threshold is **itself a fitted decision**, so it gets the same treatment as the
model.

The shipped rule is: **take the cut that maximises the average of the per-fire F1
scores across the out-of-fold folds** — try every value from 0.01 to 0.99, compute
each held-out fire's F1 at that value, average the fires, keep the best. On the
eight inspected incidents that rule picks **0.85**, and 0.85 is what the product
applies.

It maximises the *mean of the fires*, not the *pooled* score, and that is
deliberate. Two fires hold 84 % of the buildings, so a pooled-F1 cut is whatever
those two fires want and every small fire pays for it. A new fire is one case, not
eighteen thousand cases.

⚠️ **Every score used to pick the cut came from a model that had not seen the fire
it scored.** The cut is therefore not fitted on anything the model memorised. And
when an *adaptive* rule is being chosen — a rule that reads a new fire's own score
distribution and derives a cut from it — a second level is required: for each
ordered pair of fires (*f*, *g*), a model trained on neither scores *g*, and those
are the only scores a rule for *f* may be fitted on. Without that inner level, *f*
leaks into *g*'s scores and a rule fitted on them is quietly optimistic. That
nested design costs *n + n(n−1)/2* fits and is what the project used to test
eighteen candidate cut rules. **None of them beat the single fixed cut on
mean-per-fire F1**, which is why one number ships.

### 3.2 Is the cut-off doing damage?

It can be checked, and it is. Beside each score at the shipped cut, the pipeline
reports the score that population would have reached at the **best cut fitted on
its own labels** — a number that cannot be shipped, by construction, because it
needs the answers. The gap between them separates "the ranking is wrong" from
"the threshold landed badly".

On the historical fires' own points the shipped cut of 0.85 gives up **0.0006** of
pooled F1 against the best cut that entire truth set could have chosen for itself
(0.84 → 0.8921 against 0.8915); against the field inspections the shipped cut is
likewise within a thousandth of the best a single perfect threshold could do.
Neither number is being held back by a badly chosen cut-off.

Outside California it is a different story: mean-per-fire F1 **0.7345** at the
shipped cut against **0.8002** at each fire's own cut — **6.6 recoverable
points**, against 2.1 inside California. The ranking
travels; the threshold does not. §6 is where that shows up hardest.

---

## 4. How the shipped product is scored — no call in the published data is in-sample

The model in §2 is an evaluation device. The thing that ships is a per-fire
product: our own building inventory, each point carrying a probability and a call.
Some of those fires are in the training pool and some are not, so the product
carries a column saying **which model made each row's call**:

| the fire is… | which model scores it | column value |
|---|---|---|
| **not** in the training pool | the production model, fitted on all 74 fires | `production` |
| **in** the training pool | that fire's own leave-one-out fold — the model fitted on the other 73 | `lofo` |

The fold models are refitted and saved for exactly this purpose: same recipe, same
seed, same cut rule, the only difference being which rows the model never saw.
Twenty-six such folds exist, one for every pool fire the product publishes.

The consequence is the sentence that matters: **no damage call in the published
data was made by a model that had seen that fire.** Of the fifteen forward fires
the product covers, eight are pool fires scored by their own fold and seven are
outside the pool and scored by the production model. On the retrospective fires the
same check was run explicitly: **every scored row of all of them carries `lofo`**,
and the only rows that do not are 476 of 159,754 (0.30 %) that carry no
probability at all.

---

## 5. The second layer: deciding what gets into the model in the first place

Leave-one-fire-out tells you how good a model is. It does not stop you from
choosing a model by looking at the answer twenty times. Three devices do that.

### 5.1 Confirmatory sets named before they are looked at

Every candidate feature family was first measured on the eight inspected
incidents. That is eight fires, **one region and two seasons**. So a second,
larger set was named in advance — **48 of the 66 historical fires**, those from
2018 onward whose satellite-embedding pair can exist at all, spanning eleven
states and five years — and the candidate was only then scored on it, once,
against criteria written down beforehand.

It earned its keep immediately. Across five rounds and roughly 1,900 model fits,
twelve candidate families were measured. Three looked like real gains of one to
three points on the eight incidents. On the 48-fire confirmatory set, the picture
changed for every one of them, and the geography of the change was consistent:
California and the Pacific Northwest gain, Texas and New Mexico lose. **The
apparent headroom was an artefact of judging a method on eight fires from one
state in two seasons**, and the confirmatory set is what caught it.

### 5.2 Intervals with the fire as the unit, and a promotion bar

Every published interval resamples **fires**, not buildings, because buildings
inside a fire are not independent draws. Two thousand replicates, percentile
interval, and — when two models are compared on the same rows — the *same* fire
multiplicities are applied to both sides, so the fire-to-fire spread cancels out of
a quantity that never sees it.

These intervals are wide, and the width is honest: with eight fires, a replicate
that misses the two largest is a different experiment. Pooled F1 on the inspected
incidents is **0.9158 [0.8591, 0.9190]**; mean-per-fire is **0.8729 [0.8212,
0.9098]**.

Nothing is promoted on a single seed or a single number. The standing bar is a
minimum gain on the pooled score **and** a cap on how much any individual fire may
lose, evaluated as the mean over **four random seeds**. It has bitten: one radar
variant cleared the bar on seed 42 alone and failed on the four-seed mean by
0.0012 of pooled F1 while losing one fire by 0.0087 against a 0.005 tolerance.
Nothing was shipped.

### 5.3 A forward hold-out frozen in advance

Because the inspected incidents are training rows, the genuinely forward test has
to be **time**: score a season the model has never met, at a cut-off fixed before
the season existed. The bundles, the cut, the composite windows and the code
commit were hashed and frozen on 2026-09-10 — seven files, 295,298,842 bytes — and
the pre-registered score is the score at the frozen cut. It has not been collected
yet, for a reason that is upstream of us: the public inspection archive holds
**zero** records from the season in question. When it publishes, the answer is
whatever it is.

---

## 6. The checks that sit outside the pool entirely

Three independent per-structure assessments, none of them from either training
source, on fires the pool either does not contain at all or does not contain as
truth.

| truth | fire | in the pool? | pairs | base rate | precision | recall | **F1** | AUC |
|---|---|---|--:|--:|--:|--:|--:|--:|
| Federal urban search & rescue | **South Fork, New Mexico, 2024** | **no** | 1,637 | 0.453 | 0.982 | **0.747** | **0.848** | 0.985 |
| County field damage assessment | **Marshall, Colorado, 2021** | the fire yes, this survey no | 1,023 | 0.871 | 0.981 | 0.961 | **0.971** | 0.980 |
| Federal remote-sensing assessment | **Marshall, Colorado, 2021** | the fire yes, this survey no | 2,741 | 0.412 | 0.907 | 0.949 | **0.927** | 0.984 |

Three things this table is for.

**South Fork is the clearest demonstration in the project that what fails outside
California is the cut-off, not the model.** AUC 0.985 — the ranking is excellent —
but at the shipped cut the model finds only 747 of every 1,000 destroyed
structures while being almost never wrong when it does fire. A cut scoped to the
zone next to the fire perimeter moves the same pairs to F1 0.883 / recall 0.805;
this fire's own cut of 0.07 would reach 0.945.

**Marshall is scored by a held-out fold, not by the production model**, because
the fire is in the historical half of the pool. The fire is in the pool; these two
*surveys* are not, and neither was used to fit anything.

**The two Marshall rows are the same fire, the same product and the same pixels,
and they differ by 4.4 points of F1**, because the two surveys enumerate different
buildings — 1,473 records at an 87 % destroyed rate against 2,941 at 41 %. **The
choice of truth set is worth about as much as a year of model work.**

Two more populations sit outside the pool in a weaker sense. Seven of the fifteen
forward fires are not pool fires and are scored by the production model; between
them they hold only 60 destroyed matched structures, so they are a sanity check
and not evidence. And the eighteen retrospective fires are scored end to end —
our inventory, our held-out call — against the historical points: F1 **0.8685**
on 143,754 pairs, with the detection step, which the confusion matrix conditions
away, finding 83.8 % of the historical points.

---

## 7. What this design guarantees, and what it does not

**It guarantees**

* No published score was produced by a model that had seen the fire it scored.
* No cut-off was fitted on a score from a model that had seen the fire it scored.
* No feature family entered the model on the strength of a set that had already
  been looked at.

**It does not guarantee any of the following, and each is measured rather than
assumed.**

**Spatial independence between fires.** Leave-one-fire-out removes the fire, not
the region. Two fires 30 km apart in the same fuel type in the same year are not
independent draws; the fold that scores one has trained on the other. That is why
the confirmatory set spans eleven states, why the intervals resample fires, and
why the out-of-fold table is sliced by state. Sliced that way, it says the ranking
travels and the threshold does not: California AUC 0.991, everywhere else 0.959;
mean-per-fire F1 0.807 in California against 0.735 outside, closing to 0.829 and
0.800 at each fire's own cut.

**Temporal drift.** The historical half ends in 2022; the inspected half is 2024–25.
Sensors, building stock and inspection practice all move. The design has no defence
against drift except the frozen forward hold-out in §5.3, which has not paid out
yet. Inspection practice in particular is visibly non-stationary: the surviving
share of inspections runs 6–20 % for 2017–2018 against 46–87 % from 2019 on,
because before 2019 the agency recorded mainly damaged structures.

**Truth that is true.** The two label sets are both human and they disagree. On
**43,929 buildings that both of them call**, they disagree on **2.15 %**, flat from
a 5 m to a 20 m matching cap. Scored against each other that is **F1 0.9838 — the
ceiling any model can reach against both at once**. The disagreement is asymmetric
(663 buildings the inspectors call destroyed and the digitisers call surviving,
against 280 the other way) and concentrated in the class the model is worst on
(minor outbuildings, 4.3 % disagreement against single residences' 1.6 %). On the
buildings where the two disagree, **the model is at chance — AUC 0.46 to 0.51.**
It fails exactly where people cannot agree. But removing those rows lifts F1 only
0.9185 → 0.9252, so label noise is an explanation for a fraction of a point and
not an excuse for the rest.

**A national claim.** 41 of the 66 historical fires and all eight inspected
incidents are in California. Texas, Kansas, Florida, New Mexico and Utah are one
fire each, and no out-of-state fire is later than 2022. One fire is not a state.

**A count.** Every matrix in this document conditions on having matched a building
to a truth record. The product does not. Against the inspections, 4,496 destroyed
records are never matched and appear in no matrix; against the historical record,
3,057. Multiply the detection term in, never read one and quote the other.

---

## 8. One building, one fire, end to end

Take the **Eaton Fire, January 2025**, the largest fire in the pool by inspected
structures.

1. **It is a pool fire.** 18,318 of its inspected structures survive the feature
   and label filters — 9,419 destroyed, 8,899 surviving — and they are training
   rows for every fold except their own.
2. **Its fold.** A model is fitted on the other 73 fires — all 66 historical fires
   plus the seven other inspected incidents, 600,508 buildings — and nothing from
   Eaton is in it.
3. **Its scores.** That model scores all 18,318 Eaton rows. A structure on
   Altadena Drive gets a number; the model that produced it has never seen a
   building in this fire.
4. **The cut.** Eaton's scores, together with the seven other incidents' held-out
   scores, are what the cut rule reads. It picks the value that maximises the
   average of the eight per-fire F1s: **0.85**.
5. **What it scores.** At 0.85, Eaton's fold reaches precision 0.944, recall 0.898,
   F1 **0.920**, AUC 0.975. Its own best cut would have been 0.67 for F1 0.924 —
   four thousandths on the table, which is the price of shipping one number for
   every fire.
6. **The product.** The published Eaton product does **not** use the model fitted
   on all 74 fires. It uses this fold, and every row says so. 64,319 inventory
   points are scored, 7,637 called destroyed.
7. **The check.** Those points are matched one-to-one at 10 m to the field
   inspections: 14,955 pairs, precision 0.949, recall 0.905, F1 **0.926**, AUC
   0.978 — and detection recall 0.816, which is the part the confusion matrix
   cannot see.

---

## 9. The alternatives a reviewer will propose

### 9.1 A random split of buildings — no, and this is not a close call

Shuffle all 618,826 buildings, hold out 20 %, score them. It is the default in
most of the literature and it is wrong here for one reason: **the held-out
buildings' neighbours are in the training set.** Buildings in a fire share a
scene, a season, a fuel type and a wind event; a model that memorises the fire
scores its own held-out buildings beautifully and tells you nothing about the next
fire. The size of the illusion has been measured on this exact kind of data:
88.0 % ± 0.4 % under random cross-validation against **68.0 % ± 17 %** under spatial
blocking on one published study, and F1 0.800 against **0.655** event-blocked on
another. Our own within-fire block view is 0.990 AUC against leave-one-fire-out's
0.985 — a smaller gap, but in the same direction, and the gap is why
leave-one-fire-out is the primary score.

### 9.2 A time-based hold-out — we have one, frozen, and it has not paid out

This is the strongest possible design and the project has it registered: bundles,
cut, windows and commit hashed in advance, scored on a season the model has never
met. It is waiting on public data that does not exist yet (§5.3). Until it does,
leave-one-fire-out is the strongest claim available, and the documents say so
rather than implying the two are the same thing.

### 9.3 Train on the historical record only, test on everything else

This is the collaborator's proposal, and it was run as a controlled experiment
rather than argued about. The results are in §9.4.

### 9.4 The experiment: the collaborator's design against ours

*Pre-registered before a model was fitted; the bar below was written first.*

Two designs, everything else held identical — same 62 features, same learner, same
seeds 42/43/44/45, same cut rule, same rows:

| | **Design A — the collaborator's** | **Design B — ours, the shipped one** |
|---|---|---|
| training pool | the **66 historical fires** (582,554 buildings) | **74 fires** (618,826 buildings) |
| held-out folds | all 66 historical fires, each trained on 65 | the 8 inspected incidents, each trained on 73 |
| what ships | a model fitted on all 66 | a model fitted on all 74 |
| cut-off | chosen from its own 66 folds | chosen from its own 8 folds |

**The bar, stated in advance:** *Design B is justified if it is **not worse than A
on the external sets** and **better on the inspected incidents at the fire
level**.* Operationally: (a) on each of South Fork and the two Marshall surveys,
the four-seed mean difference in F1 must be no worse than −0.005; and (b) on the
eight incidents, the four-seed mean difference in mean-per-fire F1 must be positive
with a paired fire-level 95 % interval excluding zero.

**308 model fits, four seeds.** Before any comparison, the harness reproduced the
shipped pipeline exactly — Design A at seed 42 returns the historical-only
recipe's cut of 0.84 and its mean-per-fire F1 of 0.78244 to every digit; Design B's
folds return the shipped bundle's own per-incident precision, recall, F1 and AUC to
**0.0**; and Design B's Marshall fold and production model reproduce the published
Marshall and South Fork probabilities to **0.0**. The two designs are therefore
being compared, not two implementations.

**On the eight inspected incidents — 36,272 buildings, identical rows, each design
at its own cut.** Mean over four seeds, with the seed-to-seed standard deviation.

| | **Design A** | **Design B** | **B − A** |
|---|--:|--:|--:|
| pooled precision | **0.9353** ± 0.0026 | 0.9263 ± 0.0029 | −0.0090 |
| pooled recall | 0.8181 ± 0.0082 | **0.9052** ± 0.0033 | **+0.0871** |
| pooled F1 | 0.8727 ± 0.0036 | **0.9156** ± 0.0004 | **+0.0429** |
| pooled AUC | 0.9598 ± 0.0006 | **0.9741** ± 0.0001 | +0.0143 |
| pooled average precision | 0.9593 ± 0.0005 | **0.9731** ± 0.0001 | +0.0138 |
| mean-per-fire F1 | 0.8583 ± 0.0011 | **0.8750** ± 0.0014 | **+0.0166** |
| mean-per-fire AUC | 0.9705 ± 0.0003 | **0.9739** ± 0.0002 | +0.0034 |

At a **common** cut of 0.85 the same table reads A 0.8730 / 0.8581 and B 0.9156 /
0.8746 — within a thousandth of the own-cut numbers on both sides. **The difference
between the designs is not the threshold.** AUC moves too, so it is the ranking.

**What Design B is buying is recall.** Precision is a point *worse*; recall is
**8.7 points better**. That is what you would expect from the label sources: the
inspectors enumerate small and minor structures the digitisers leave out, and they
call more of them destroyed (§1.2), so a model that has seen inspection labels is
less conservative about them.

**Every incident prefers B, but two of them carry the result.** Mean F1 over four
seeds, each design at its own cut:

| incident | A | B | B − A |
|---|--:|--:|--:|
| Airport 2024 | 0.8710 | 0.8788 | +0.0078 |
| Borel 2024 | 0.9038 | 0.9068 | +0.0029 |
| Bridge 2024 | 0.7365 | 0.7450 | +0.0085 |
| Mountain 2024 | 0.7978 | 0.8033 | +0.0056 |
| Park 2024 | 0.9095 | 0.9145 | +0.0050 |
| **Eaton 2025** | 0.8732 | **0.9192** | **+0.0460** |
| **Palisades 2025** | 0.8713 | **0.9186** | **+0.0473** |
| TCU Complex 2025 | 0.9035 | 0.9134 | +0.0099 |

⚠️ **Six of the eight gain between 0.003 and 0.010; the two large January-2025
fires gain 0.046 and 0.047.** Eaton and Palisades burned a week apart in the same January
wind event in the same suburbs, and each one's fold has the other in its training
half. Some of Design B's advantage on those two is a model that has seen a fire
very like the one it is scoring — the spatial and temporal autocorrelation §7 says
leave-one-fire-out does not remove. It is a real advantage for the product and it
is not a national accuracy claim.

**On the three external assessments — where both designs are out of sample — the
two are a wash, with B never worse.** Mean F1 over four seeds, each design at its
own cut:

| set | pairs | **A** | **B** | **B − A** |
|---|--:|--:|--:|--:|
| South Fork, New Mexico 2024 (federal US&R) | 1,637 | 0.8422 ± 0.0114 | 0.8443 ± 0.0105 | **+0.0021** ± 0.0191 |
| Marshall, Colorado 2021 (county field survey) | 1,023 | 0.9686 ± 0.0009 | 0.9702 ± 0.0007 | **+0.0017** ± 0.0012 |
| Marshall, Colorado 2021 (federal remote sensing) | 2,741 | 0.9212 ± 0.0020 | 0.9291 ± 0.0017 | **+0.0079** ± 0.0022 |

⚠️ **South Fork is a tie, not a win.** Its four-seed spread (± 0.019) is nine times
the difference between the designs, and two of the four seeds put A ahead. The
honest statement is that the extra training data costs nothing there, not that it
helps.

**The paired fire-level interval on the eight incidents** — the same resampled
fires applied to both designs, each at its own cut, per-fire differences averaged
over the four seeds first and then bootstrapped over fires, 2,000 replicates:

> **B − A mean-per-fire F1 = +0.0166, 95 % interval [+0.0060, +0.0307]** — the
> interval excludes zero.
>
> Taken one seed at a time the four intervals are [+0.0017, +0.0265], [+0.0028,
> +0.0324], [+0.0048, +0.0296] and [+0.0095, +0.0313], and **all four exclude
> zero**.

### ⚖️ The verdict against the bar, which was written first

| half of the bar | requirement | measured | |
|---|---|---|---|
| **(a) not worse externally** | four-seed mean ΔF1 ≥ −0.005 on each of the three | +0.0021 · +0.0017 · +0.0079 | **clears** |
| **(b) better on the incidents at the fire level** | four-seed mean Δ mean-per-fire F1 > 0 with a paired fire-level 95 % interval excluding zero | **+0.0166**, [+0.0060, +0.0307] | **clears** |

> **Design B — the shipped design, training on both sources — is justified on the
> pre-registered bar. It is better than Design A on every one of the eight
> inspected incidents and on all three external assessments, and the fire-level
> interval on the difference excludes zero.**

⚠️ **Three things this result is not.** It is not a licence to read Design B's
0.9156 as a national number — §7 still applies, and the per-incident table above
shows where the gain concentrates. It does not say Design A is a bad model: at
pooled F1 0.873 and AUC 0.960 on eight fires it has never met, in a label alphabet
it has never met, **Design A is a successful transfer result in its own right, and
that is the number the transfer claim should quote.** And it says nothing about
2026 — only the frozen time hold-out (§5.3) can.


### 9.5 The reverse question: does adding the inspections hurt the historical fires?

Asked and answered on the **same 582,554 buildings** under both recipes. The
historical-only recipe (65-fire training halves, its own cut of 0.84) reaches
pooled F1 **0.8509**, AUC **0.9867**, mean-per-fire F1 **0.7824**. The shipped
recipe (73-fire halves, cut 0.85) reaches **0.8513**, **0.9860**, **0.7797**. Every
one of the three pairs lands inside the other's interval. **Adding the eight
inspected incidents neither helps nor hurts the historical half.**

That is consistent with a separate, larger experiment. Adding **74,276** more
inspected structures from 25 unused incidents moved mean-per-fire F1 by
**+0.0022 ± 0.0028** against a bar of +0.010, with a fire-level interval including
zero — and a control that added the *same rows carrying their existing labels*
moved it by **−0.0011**, which is how we know the gain is label content and not row
count. Broken down: those structures **help on the buildings they re-label, hurt on
the buildings where the two label sets contradict each other, and do nothing at all
on the 88 % they do not touch.**

### 9.6 What each design is for

**They are not competing answers to one question. They are answers to two
questions, and both questions are worth asking.**

**Design A answers a validation question:** *does a model trained on the historical
record transfer to fires it has never met, in a form it has never met?* Its test
set is genuinely untouched — not one inspected building, in any fire, in any year,
was ever shown to it — which is the cleanest transfer claim this data can support,
and it is what a reviewer asking "does this generalise?" should be shown.

**Design B answers a product question:** *what is the best call we can make on the
next fire?* It is allowed to use everything we have, because the thing being
delivered is a call on a real building, and withholding half the evidence from the
shipped model in order to keep a tidier experiment would make the product worse
without making the paper more true. Its honesty comes from a different place: every
fire in it is scored by a model that excluded that fire, and every published row
says which model made its call.

**The right resolution is to do both, and that is what this project does.** The
shipped product uses Design B. The transfer claim in the paper is Design A's, run
as §9.4, and labelled as a transfer test rather than as the product's accuracy.
The owner's instinct — use all of the fire data to build the model we ship — and the
collaborator's instinct — hold an untouched set back to prove transfer — are both
right, about different artefacts.

---

## Where every number comes from

| section | source |
|---|---|
| §1.1 pool composition | `models/damage_sentinel2_v5/summary.json`; `outputs/design_a_vs_b/v1/metrics.json` |
| §1.2 label recode and the counting-unit ratio | `config/params.yaml` `dins.damage_recode`; `docs/combined-series-spec.md` §B; `outputs/combined_retrospective/counts_on_the_same_ground.csv` |
| §1.3 why the incidents are in the pool | `docs/experiment-ledger.md` `dmg-v2-bundle`; `docs/methodology.md` Stage 10, Stage 10d; `outputs/damage/` pool-overlap tables |
| §2 folds and fold counts | `slp/damage/train.py`; `scripts/06_train_damage_model.py`; `scripts/25_carlson_lofo_oof.py`; `models/damage_sentinel2_v5/{summary.json,oof_predictions.gpkg}` |
| §2.3 pooled vs mean-per-fire | `outputs/uncertainty/dins_v5/pooled_ci.csv`; `outputs/carlson_lofo/v5/summary.json` |
| §3 the cut rule and the nested design | `slp/damage/operating.py`; `slp/damage/train.py`; `scripts/10_damage_operating_point.py`; `outputs/operating_conus/`, `outputs/operating_product/` |
| §4 how the product is scored | `scripts/18_lofo_folds.py`; `models/damage_sentinel2_v5/lofo_folds/index.json`; `outputs/forward_damage/per_fire.csv`; `docs/damage-scorecard.md` §2, §3.B |
| §5 confirmatory sets, intervals, the bar | `docs/damage-improvement-plan.md` §8.6, §10–§13; `slp/eval/uncertainty.py`; `docs/preregistration-2026.md` |
| §6 external assessments | `outputs/ics209_check/outside_ca/*/metrics.json`; `outputs/scorecard/external.csv`; `docs/outside-ca-truth.md` |
| §7 what it does not guarantee | `outputs/generalization/v5/`; `docs/damage-scorecard.md` §10; `docs/damage-improvement-plan.md` §12.1c |
| §8 the worked example | `models/damage_sentinel2_v5/summary.json`; `models/damage_sentinel2_v5/lofo_folds/`; `outputs/forward_damage/per_fire.csv` |
| §9.4 the experiment | `scripts/27_design_a_vs_b.py`; `outputs/design_a_vs_b/v1/{metrics.json,report.md,per_incident.csv,external.csv,paired_intervals_own_cut.csv}` |
| §9.5 the reverse question | `models/damage_sentinel2_v4/summary.json` against `outputs/carlson_lofo/v5/summary.json`; `docs/damage-improvement-plan.md` §12.1, §12.1b, §12.1c |
