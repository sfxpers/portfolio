# Copy is plain and concrete

Every user-facing string in the Catalog — Identity bio, Experience bullets, Capsules, Case Study bodies, Showcase captions, meta descriptions, and microcopy — is written in one register: plain, concrete, and with the author as the actor. The copy had drifted into systems-analyst abstraction twice, which is a bad failure on a site whose whole claim is that a person built these things, so the rules below are written down for a future pass to check against instead of drifting a third time. They bind user-facing copy only; the capitalized terms in `CONTEXT.md` are this repo's documentation vocabulary, not labels for the UI.

1. **Name the thing.** A Case Study says what the product is in ordinary words before it says anything about architecture. A reader who knows nothing about the domain should be able to tell what was built.
2. **The author is in the sentence.** Active voice, first person, for work that was done. Agentless passive ("a shipped marketplace system connected…") hides who made the decision on the surface whose whole job is to show it.
3. **Tense.** Past tense narrates decisions that were made. Present tense is only for a rule that still holds ("undisputed quantity clears after 48 hours"). Headings follow the same rule as bodies.
4. **Concrete nouns over abstract ones.** Avoid boundary, surface (as a noun), product system, operational workflow, inspectable, authorship, and governance unless the word is literally in the product's UI. Watch for `own`/`owning` doing work a specific verb should do.
5. **Real numbers beat descriptions of scope.** Fees, windows, thresholds, and quantities are visible in the Showcase artifacts; use them.
6. **Captions add information.** A caption says something the body does not, grounded in what is actually visible in the artifact. Vary how they open; they should not all be "The [thing] [verb]ed [list]."
7. **Sentence case in UI copy.** The UI says "View case study".
8. **One positioning claim.** Meta descriptions vary only as much as each page needs, rather than becoming three different noun lists for the same sentence.
9. **The Case Studies are a selection, not a survey.** Two or three deep pages are what the site shows; they are not the whole body of work and they do not define the kind of work on offer. Identity and positioning copy describes the sort of problem being solved, never a domain generalised from whichever studies happen to be published. Avoid "most of my work is X", "building X", or any count that reads as a complete inventory.

**Why not a template:** the technical blocks were previously scaffolded as literal `Decision:` / `Constraint:` / `Trade-off:` labels, and a test asserted that shape. It made every Case Study read identically and let a paragraph look analytical without saying anything. The labels are gone and the test now checks that a technical block has a heading and real depth, so the substance is still required without prescribing the sentence shape. Don't reintroduce the labels.

See also: `CONTEXT.md` (**Voice**), ADR-0001.
