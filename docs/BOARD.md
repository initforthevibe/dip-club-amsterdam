---
kanban-plugin: board
---

<!--
Card conventions:
- Verb-first title · one area tag (project-specific, e.g. #crm #website #portal #infra) · one type tag (#feat #fix #sec #opt #chore) · one priority tag (#p1 #p2 #p3)
- Optional trailing context: one-liner or repo-root path to a spec/plan
- Parked cards: append "— parked YYYY-MM-DD: reason" (never delete reasons)
- WIP limit: 3 cards In Progress
- Cards moved to Done get checked off (- [x])
- The user owns Up Next order; Claude proposes but never promotes Backlog → Up Next unilaterally
- Done is pruned on approval when cards are >1 month old or 10+; git history is the archive
-->

## Backlog

- [ ] Remove or repurpose unused `UtilityCard` ui primitive #website #chore #p3 — orphaned after the home hero dropped its floating Field Notes card

## Up Next

## In Progress

## Done

- [x] Add corner-notch motif to activity cards + home hero #website #feat #p2 — docs/superpowers/specs/2026-06-14-corner-notch-design.md
- [x] Rename "Excursions" activity to "Trips" across site (route → /trips, vercel.json redirect from /excursions) #website #chore #p2
- [x] Add Luma event calendar link to footer (https://luma.com/dipclub.ams via SITE.calendar) #website #feat #p3

## Parked
