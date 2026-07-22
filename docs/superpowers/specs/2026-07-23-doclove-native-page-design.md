# DocLove — Native Case-Study Page (Design Spec)

- **Date:** 2026-07-23
- **Status:** Design approved (direction + content map). Ready for implementation planning.
- **Scope:** Convert **one** project — *DocLove — App Design* — from a flattened image scroll into a native, responsive HTML page. The other seven projects stay as image scrolls for now.

---

## 1. Context & problem

Project sub-pages currently render **flattened, tall Figma exports** (e.g. `uploads/doclove-1.jpg` … `doclove-10.jpg`, ~1200–1400 px wide JPGs) stacked full-width via a generic image loop. Problems:

- **Blurry on Retina** — a ~1200 px source shown in a ~1184 px column is upscaled ~2× on any 2× display.
- **JPG artifacts** on crisp text, logos, and edges (most of a case study).
- **iOS downsampling** — the single-file scrolls run up to 1200×9785 (~11.7 MP); iOS Safari decodes oversized images at reduced resolution.

**Goal:** rebuild DocLove as a native page where **text is real HTML** (infinitely crisp) and **imagery is re-exported crisp** (2× WebP / SVG from Figma), laid out responsively — a faithful **1:1 port** of the scroll's content and order.

## 2. Goals / non-goals

**Goals**
- Native, responsive DocLove page in the portfolio's **dark editorial theme** with **DocLove's blue/lime as a per-project accent**.
- **Every content detail** from the scroll, in the **same narrative order**.
- Crisp assets (2× WebP / SVG) exported from Figma; no layout shift on load.
- Preserve the site chrome (top bar, prev/next footer, back-to-top, project loader) and the **live Figma prototype embed**.

**Non-goals (YAGNI)**
- Not converting the other 7 projects.
- No full per-brand theme swap — unified frame + accent only.
- No shared/abstracted component library — sections are **page-local** (clean, but not generalized).
- No heavy scroll choreography beyond the site's existing restrained motion.

## 3. Approved direction

- **Theme:** reuse the portfolio tokens (`--bg #0a0a0a`, `--ink #f4f2ee`, `--mut`, `--line`, `--panel`) and fonts (**Montserrat / DM Mono / Cormorant Garamond**). DocLove's own Product Sans is **not** used — the unified frame keeps the portfolio's type; DocLove personality comes through **color accent only**.
- **Accent tokens:** `--acc: #5bb0ee` (DocLove blue brightened for dark bg), `--acc-deep: #0c2f4d`, `--lime: #d7fd8a`.
- Validated against a mockup (dark editorial + accent + sticky phase nav) — approved.

## 4. Architecture & integration

- **File:** [doclove-app-design.html](doclove-app-design.html) is rewritten as a **bespoke native page**. It no longer renders the body from the shared `projects.parts` image loop.
- **Kept from the current page:** top bar (logo + close), project header (`cat` + `title`), **prev/next footer** (prev → *Dusk — Comic Book Design*, next → *CheQ — Illustration Library*), back-to-top button, the project **loader** (`#ploader` with the safety timeout), and OG/social meta.
- **Body:** a hand-authored `<main>` of native sections (below) replaces the generic media loop.
- **Sticky phase sub-nav** added under the top bar: Discover · Design · Define · Deliver (scrollspy highlight, smooth-scroll anchors).
- **CSS:** inline `<style>` in the page (consistent with the other project pages), reusing the shared tokens plus new page-local section styles and the accent tokens.
- **JS:** a small inline script for loader hide, back-to-top, phase-nav scrollspy, and prev/next — the bespoke page does **not** depend on the shared `parts` renderer.
- **Route unchanged:** `/doclove-app-design`.
- Other project pages and the shared `projects` object are **untouched**.

## 5. Section vocabulary (page-local)

Each is plain HTML + CSS authored in the page. Responsive behavior noted.

| Section | Purpose | Mobile behavior |
|---|---|---|
| `.phasenav` | sticky Discover/Design/Define/Deliver nav | wraps; smaller type |
| `.phase` | big lowercase phase divider + index + rule | type clamps down |
| `.block` | heading + body copy | full width |
| `.stats` | key-finding percentages | `auto-fit minmax` → 2-up then 1-up |
| `.icards` | user-interview insight cards | 2-col → 1-col |
| `.swot` | 2×2 Strengths/Weakness/Opportunities/Threats (× competitor) | → 1-col |
| `.empathy` | 2×2 Says/Feels/Does/Thinks | → 1-col |
| `.journey` | 4 stage columns + emotion curve (light SVG) | horizontal scroll or stack |
| `.persona` | photo + chips + bio + goals/frustrations | photo stacks above text |
| `.ia-flow` | information-architecture flow figure (image/SVG) | scrollable / max-width |
| `.vlang` | logo rationale, palette swatches, illustrations, type specimen, icon grid | columns collapse |
| `.wireframes` | lo-fi wireframe figure | scaled image |
| `.screens` | phone-screen showcase (grid/row + captions) | horizontal snap-scroll |
| `.flow-step` | caption + screen group for OPD/Test flows | caption above, screens scroll |
| `.embed` | Figma prototype iframe (reuse existing `.media.embed`) | keeps aspect ratio |
| `.mockups` | device-render gallery | 1-col |
| `.credits` | credits line | — |
| `.team` | 3 testimonial quote cards | → 1-col |
| `.thanks` | closing "Thank You!" | centered |

## 6. Full content map (1:1 with the scroll)

> **Faithfulness rule:** exact microcopy (stat captions, interview quotes, journey cells, SWOT bullets, persona text) is pulled **verbatim from Figma** during the build. Transcriptions below are the confirmed structure; treat wording as indicative until Figma-sourced.

### Hero / Cover *(panel 1 top)*
- DocLove logo + tagline **"a personal health companion"**; app-screen imagery *(image)*.
- Meta row: **Domain · UI-UX Design | Duration · 6 weeks | Team** *(native)*.
- Intro paragraph *(native)*.

### Design Process *(panel 1)* — Double Diamond *(native diagram in accent)*
- **Research** → **Discover** (Literature review · User survey · User interview · Market analysis) · **Design** (Empathy mapping · User journey · User personas)
- **Design** → **Define** (Information architecture · Visual language · Lo-fi wireframes) · **Develop** (Hi-fi screens · Prototype)

### 1 — Discover *(panel 1)*
- **Problem summary** — 2 paragraphs *(native)*.
- **Literature review** — 3 research charts (digital-health adoption by city tier; doctor-consultation-app adoption by age group; reasons for not staying on digital platforms) + the "deep penetration of digital health solutions" analysis. *(charts as images; analysis native)*
- **Key findings** — **13% · 14.3% · 64% · 74% · 49%** with captions *(native)*.
- **User interviews** — intro + ~7 insight cards (long wait times; difficulty finding doctors on short notice; wants on-the-go booking & flexibility; quick/easy booking & timely care; avoid waiting on hold; comfortable booking online vs. in person/phone; convenience of booking anytime from phone/computer) *(native)*.
- **Competitor analysis — SWOT** — intro + **Practo**, **TATA 1mg**, **Apollo**, each with Strengths / Weakness / Opportunities / Threats *(native)*.

### 2 — Design *(panel 2)*
- **Empathy map** — Says / Feels / Does / Thinks (bulleted) *(native)*.
- **User journey map** — 4 stages: *Decision of booking* → *Searching for nearest doctor/clinic* → *Slot booking / Payment* → *Reviews the appointment*; each with an emotion point + Actions / Experience / Opportunities *(native; emotion curve as light SVG)*.
- **User personas** *(native + photo images)*:
  - **Naina Kuwar** — *Non-chronic* · 32 · Marketing manager · Female · Nasik · Bio · Goals (3) · Frustrations (3).
  - **Saroj Raj** — *Chronic* · 58 · Retired teacher · Male · Kolkata · Bio (Type 2 diabetes, 15 years…) · Goals (3) · Frustrations (3).

### 3 — Define *(panel 3)*
- **Information architecture** — **OPD booking system** flow + **Pathological test booking** flow *(flow diagrams as SVG if vector, else 2× PNG→WebP)*.
- **Visual language**:
  - **Logo** + rationale (heart + stethoscope) *(logo image/SVG + native text)*.
  - **Color palette** — `#99C9EE` · `#0F77C3` · `#002F52` · `#D7FD8A` · `#FFFFFF` *(native swatches)*.
  - **Illustrations** — Male / Female / Tests *(images)*.
  - **Typography** — Product Sans, with rationale *(native specimen text)*.
  - **Iconography** — symptom icons (Fever/cold/flu, Headache, Backpain, Stomach, Child issues, Allergies, Skin, Pregnancy) + department icons (Ophthalmology, ENT, Dental, Dermatology, Urology, Neurology, Cardiology, Gynecology) *(icon images/SVG)*.
- **Lo-fi wireframes** *(image)*.

### 4 — Deliver *(panels 4, 5, 6)*
- **High-fidelity screens** *(screen images + native captions)*:
  - **Onboarding** — splash + 3 welcome screens; caption re: logo animation → loading flow.
  - **Login / Sign-up / OTP / Language** — 5 screens; caption re: guest/Google/Apple login, OTP, language choice.
  - **"What are you looking for?"** entry — OPD booking / Lab tests; caption.
- **OPD booking flow** *(screen images + native step captions)*: Home → **Appointment process** (departments → doctors available online/offline → date & time slots → BOOK NOW) → **Payment process** (details/date/time/amount → payment modes → processing → payment successful + confirmation → cancel/reschedule) → **Reschedule process** (reschedule → choose slot → success → return to main) → **General physicians** (for frequently-faced problems).
- **Test booking flow** *(screen images + native step captions)*: select test type (Blood/Urine/Stool/X-ray/Genetic/Assay/MRI/Ultrasound/Full-body) → **Choose your city** (city + PIN → submit) → **Labs in your city** (Apollo Clinic ₹600, Oracle diagnostics ₹560, Medicity ₹825, Oncquest labs — ratings/timings) → **Home sample collection** (Yes/No dialog) → **Add your address** form → **Payment** (Test ₹700 + Home service ₹100 = ₹800 → processing → test booked).
- **Prototype** — "Our prototype is end-to-end connected" + **live Figma embed** *(interactive; reuse existing iframe embed with its ratio)*.
- **Mockups** — device-render showcase of key screens *(images)*.

### Closing *(panels 9, 10)*
- **Credits** — "Aryan Sharma : Iconography" *(native)*.
- **Team members** — 3 quote cards (photo + testimonial) *(native + photos)*.
- **Thank You!** — "For your time, have a good day!" *(native)*.

## 7. Asset pipeline (Figma → web)

- **Source:** the DocLove Figma file (URL to be provided by the user; Figma MCP must be authorized). Use `get_metadata` to map nodes, then export individual assets via `download_assets` / `get_design_context`.
- **Formats:**
  - Photos, app screens, mockups, illustrations → **WebP, 2×, quality ~85**.
  - Pure-vector marks (logo, icons, Double Diamond, IA flows where vector) → **SVG**; otherwise 2× PNG → WebP.
- **Storage:** `uploads/doclove/` with clear names (e.g. `hero-1.webp`, `screen-opd-doctors.webp`, `ia-opd.svg`, `icon-cardiology.svg`, `persona-naina.webp`).
- **Every `<img>`:** explicit intrinsic `width`/`height` (or `aspect-ratio`) to prevent layout shift; `loading="lazy"` (hero eager + `fetchpriority="high"`); `decoding="async"`.
- **Optional `srcset`** (1×/2×) for the heaviest images so non-Retina screens don't over-download.
- **Flow screens:** the OPD and Test flows have many annotated screens. **Recommendation:** export each phone screen **individually** so captions are native text beside/below crisp screens (vs. re-slicing grouped strips). Confirm during the build.

## 8. Responsive behavior

- Content column `max-width: ~1160px`, gutter `clamp(16px, 4vw, 48px)`.
- Grids use `auto-fit / minmax` so stats, cards, SWOT, personas, team collapse gracefully.
- Below ~720px: SWOT / empathy / persona / journey → single column; screen rows become horizontal snap-scroll; type clamps down.
- Body never scrolls horizontally; wide figures (IA flows, wireframes) live in their own `overflow-x: auto` container.

## 9. Motion

- Reuse the existing project entrance (`ppRise` on chrome/header/body).
- Add a **subtle** per-section reveal (fade + small rise) via `IntersectionObserver`; disabled under `prefers-reduced-motion`.
- Phase-nav **scrollspy** highlights the active phase.
- No parallax or long timelines — keep the site's restrained editorial feel.

## 10. Loader integration

- Keep `#ploader` and its CSS. The native page has fewer, optimized images, so the progress ring resolves faster; the 8-second safety reveal stays as a fail-safe.

## 11. Verification

- Render at **desktop / tablet / mobile** widths: no horizontal scroll, no layout shift (dimensions set), crisp on 2× (assets are 2×).
- Phase-nav scrollspy + smooth scroll work; prev/next links correct (Dusk / CheQ); back-to-top appears past threshold; loader hides.
- **Figma prototype embed** loads and is interactive.
- **Content completeness checklist** — walk the content map (§6) against the scroll; every block present, same order.
- Image weight sane (WebP), lazy-loading below the fold.

## 12. Open questions / risks

- **Figma file URL + node structure** — needed from the user before asset export; MCP authorization required.
- **Flow-screen export granularity** — individual screens (recommended) vs. grouped strips — confirm at build time.
- **Literature-review charts** are dense figures — kept as images (not rebuilt natively).
- If the DocLove Figma is unavailable, fallback is re-slicing the existing scrolls (lower quality) — not preferred.
