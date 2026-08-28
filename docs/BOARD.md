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

- [ ] Add SPF + DMARC records for dipclub.nl #infra #sec #p2 — zone has Google Workspace MX but zero TXT records; hello@dipclub.nl is spoofable and outbound mail is undefended. Add SPF (include:_spf.google.com) + DMARC, then DKIM from Workspace admin
- [ ] Remove stale ftp/mail CNAMEs from dipclub.nl zone #infra #chore #p3 — TransIP defaults still pointing at @ (now Vercel); mail.dipclub.nl resolving to a web host is misleading
- [ ] Redirect www.dipclub.nl → dipclub.nl #website #fix #p3 — both hosts serve HTTP 200 with no redirect (duplicate content). Confirmed via TransIP API that DNS is correct (apex A → Vercel, www CNAME → cname.vercel-dns.com); the fix is in Vercel domain settings, not DNS
- [ ] Add favicon + apple-touch-icon set #website #chore #p3 — site currently ships no icon.ico/apple-icon; derive from the whale mark or wordmark
- [ ] Remove or repurpose unused `UtilityCard` ui primitive #website #chore #p3 — orphaned after the home hero dropped its floating Field Notes card
- [ ] Pin contact-page info cards to bg-white #website #chore #p3 — they still use bg-paper (now off-white #fafaf8); make white to match field-note cards
- [ ] Write field note: How to start cold-water swimming in Amsterdam #content #p3 — (P) Outdoor Swimming · where to go, what to bring, staying safe
- [ ] Write field note: A year of swimming the Amstel through every season #content #p3 — (E) Outdoor Swimming · what it taught me
- [ ] Write field note: What cold-water immersion actually does to your body #content #p3 — (P) Outdoor Swimming · the science, minus the hype
- [ ] Write field note: Sauna benefits beyond the heat #content #p3 — (P) Social Sauna · what the research really says
- [ ] Write field note: Why we end every dip in the sauna #content #p3 — (E) Social Sauna · the ritual of warming up together
- [ ] Write field note: Sauna etiquette for first-timers #content #p3 — (P) Social Sauna · the unwritten rules
- [ ] Write field note: Types of breath work explained #content #p3 — (P) Breath Work · Wim Hof, box, coherent — and when to use each
- [ ] Write field note: My first breath-hold panic #content #p3 — (E) Breath Work · what it taught me about control
- [ ] Write field note: A 5-minute breathing reset before a cold plunge #content #p3 — (P) Breath Work
- [ ] Write field note: Underrated trails within an hour of Amsterdam #content #p3 — (E) Hiking
- [ ] Write field note: How to read terrain and not get lost #content #p3 — (P) Hiking · beginner navigation primer; pairs with the Dolomites post
- [ ] Write field note: 5 survival skills every outdoor swimmer should know #content #p3 — (P) Bushcraft
- [ ] Write field note: Building a fire in the rain #content #p3 — (E) Bushcraft · a wet afternoon in the Veluwe
- [ ] Write field note: Cold-weather survival basics #content #p3 — (P) Bushcraft · hypothermia, layering, shelter

## Up Next

## In Progress

## Done

- [x] Simplify mobile menu: collapse Activities sub-links into one link #website #chore #p3 — mobile shows a flat 5-item menu; Activities → /#activities (home overview) so all three stay reachable. Desktop dropdown unchanged
- [x] Add Open Graph image + social metadata #website #feat #p2 — public/og-image.png rendered from scripts/og/og-image.html; wires openGraph/twitter/metadataBase in app/layout.tsx
- [x] Add corner-notch motif to activity cards + home hero #website #feat #p2 — docs/superpowers/specs/2026-06-14-corner-notch-design.md
- [x] Rename "Excursions" activity to "Trips" across site (route → /trips, vercel.json redirect from /excursions) #website #chore #p2
- [x] Add Luma event calendar link to footer (https://luma.com/dipclub.ams via SITE.calendar) #website #feat #p3

## Parked
