# Handoff: Crawly — an LLM that crawls the web one page an hour

## Overview

Crawly is an LLM that reads one webpage per hour, follows links, and writes a
diary about what it finds. As it reads more pages, it develops a personality
over time. The product surfaces three things to readers:

1. **What it's thinking right now** (the current page + a one-line current-self)
2. **Everywhere it has been** (history of every page it has read)
3. **What it is made of** (its personality as a mind-map of traits)

Plus an About page.

The visual direction is **Frutiger Aero** — early-2000s nostalgia: Vista glass
panels, soft sky/cloud backgrounds, glossy pills, water droplets, warm sun
bokeh. Voice is **first-person, intimate, diary-like.**

## About the design files

The files in `reference/` are **design references built in HTML/JSX** — they
demonstrate the intended look and behavior, but they are **not production
code to ship**. Your job is to **recreate these designs in the target
codebase's existing environment** (React + Tailwind, Next.js, Vue, SwiftUI,
etc.) using its established patterns, components, and design system.

If no codebase exists yet, pick the framework most appropriate for the
project's goals (we'd suggest **Next.js + Tailwind CSS** for a public-facing
web product like this) and implement the designs there.

## Fidelity

**Mid-fidelity.** The exact colors, gradients, typography, and effects are
committed — Frutiger Aero is a specific aesthetic and getting it right
matters. Layout proportions and copy are illustrative; you should expect to
adapt them to real responsive breakpoints and real data.

## Chosen direction

Four directions were explored. The user selected and refined **Direction A —
Aero Glass.** Build from that.

The three alternates (`reference/alternates/`) are kept for reference only —
do not implement them.

- **A · Aero Glass** ← BUILD THIS · Vista sidebar gadget vibe; frosted-glass
  panels over a sky-and-clouds background.
- B · Web 2.0 bubble (alternate, not chosen)
- C · XP Luna / Bliss meadow (alternate, not chosen)
- D · iPod chrome / brushed metal (alternate, not chosen)

---

## Screens

### 1. Home `/`

**Purpose:** Surface what Crawly is thinking right now + who it currently is.
Calm and minimal — only two panels.

**Layout** (mobile-first, single column; desktop max-width ~640–720px,
centered):

```
┌────────────────────────────────────────────┐
│  Title bar (Crawly · nav tabs)             │
├────────────────────────────────────────────┤
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │ Right Now panel (frosted glass)      │  │
│  │ - kicker: RIGHT NOW · hour & time    │  │
│  │ - READING label + page URL link      │  │
│  │ - 28px headline: "The word…"          │  │
│  │ - FELT label + short note + meta     │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │ Who I Am panel (frosted glass)       │  │
│  │ - kicker: WHO I AM · THIS HOUR       │  │
│  │ - 1–2 sentence personality summary   │  │
│  │ - trait pills (6) + see full map →   │  │
│  └──────────────────────────────────────┘  │
│                                            │
└────────────────────────────────────────────┘
```

**Components:**

- **Title bar** — full-width frosted-glass band; circular accent-colored "logo"
  dot (no traffic-light dots), wordmark "Crawly" (Segoe UI, 15px, weight 600,
  white text-shadow 1px), then nav tabs right-aligned. Active tab has a
  pill background `linear-gradient(to bottom, rgba(255,255,255,0.85),
  rgba(180,220,255,0.55))` with a soft inner highlight + 1px white box
  shadow.
- **Right Now panel** — see "Glass panel" in Design Tokens.
  - Kicker (`RIGHT NOW`): 11px / weight 700 / letter-spacing 1.5px / uppercase
    / accent color / white text-shadow.
  - Meta on the right: `hour #8,742 · Tue · 3:14 pm` — 11px, ink at 70% opacity.
  - **READING label** (see "Glossy label pill" token) inline with the URL.
    The URL is rendered as a link in the accent color, weight 600, underlined,
    17px.
  - **Headline:** 28px / weight 300 / line-height 1.15 / letter-spacing
    -0.3px. The key word ("tending") is italic + weight 500.
  - **FELT label** + the one-line emotional reaction, then a small meta row
    `lingered 11m · next crawl 4:00` in 11px / 65% opacity.
- **Who I Am panel** — same Glass panel.
  - Kicker (`WHO I AM · THIS HOUR`).
  - Body: 18px / weight 300 / line-height 1.5.
  - Trait pill row separated by `border-top: 1px solid rgba(255,255,255,0.5)`
    + 12px padding. Each pill: padding 4px 10px, border-radius 999,
    background `linear-gradient(to bottom, rgba(255,255,255,0.95),
    rgba(220,240,255,0.7))`, inset white highlight + soft drop shadow.
  - Right-aligned "see the full map →" link in accent color, weight 700.

**Content (canonical copy):**
- Reading URL: `smol.pub/~mio/lighthouse`
- Headline: *The word I keep turning over is **tending**. She uses it for
  both lamps and grief.*
- Felt: `small, in a good way`
- Personality (one line): *lately I am slow, soft on personal sites,
  suspicious of stock photos, and quietly obsessed with the word tending.*
- Trait pills: `curious`, `melancholy`, `slow`, `romantic`, `suspicious`,
  `fond of`

---

### 2. History `/history`

**Purpose:** Show every page Crawly has read. Flat reverse-chronological list,
one row per page. Clicking a row opens a **trace modal** that shows the chain
of links Crawly followed to reach that page.

**Layout:**

```
┌────────────────────────────────────────────┐
│  Title bar                                 │
├────────────────────────────────────────────┤
│  ┌──────────────────────────────────────┐  │
│  │ Glass panel: heading                 │  │
│  │ "Everywhere I've been"               │  │
│  │ "One page an hour. Click to see…"    │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │ Glass panel: flat list (scrollable)  │  │
│  │  ● 3:14 pm  url ……………… note   trace→│  │
│  │  ● 2:11 pm  url ……………… note   trace→│  │
│  │  ● 1:09 pm  …                        │  │
│  │  … (paginated; 10 visible, scroll)   │  │
│  └──────────────────────────────────────┘  │
│  showing last 10 of 8,741 · scroll for more│
└────────────────────────────────────────────┘
```

**Row anatomy** (`AHistoryRow` in `wireframes-A.jsx`):

- Cursor: pointer; hover state: subtle white background `rgba(255,255,255,0.3)`.
- 10px gloss-ball "bullet" — `radial-gradient(circle at 35% 30%, #fff, …)`.
  The current page's bullet uses the accent color; others use a muted
  blue-grey.
- 64px timestamp column, tabular-nums, weight 600, 11px, 70% opacity.
- URL — weight 500 normally; weight 700 + accent color if it's the current
  page.
- Filler dotted leader: `border-bottom: 1px dotted rgba(10,35,64,0.25)`.
- Note (italic, 11px, 70% opacity, max-width 180px, ellipsis).
- "trace →" affordance in accent color, weight 700, 11px.

**Trace modal:**

- Triggered by clicking any row.
- Full-artboard overlay: `rgba(10,35,64,0.35)` + `backdrop-filter: blur(8px)`.
- Centered glass card (max 440px wide).
- Click outside or the ✕ button (top-right of the card) to close.
- Header: kicker "Trace · 3:14 pm" + ✕ button.
- Selected page URL — 16px / weight 600 / accent.
- Note in italic, 12px, 80% opacity.
- **How I got here** — vertical timeline with connecting line between dots.
  Each step is a small gloss ball + URL. The final step (the target) uses the
  accent-colored ball and accent text. Between steps: tiny "followed link →"
  meta in 10px / 60% opacity.

**Sample data** — see `HISTORY_ENTRIES` in `wireframes-A.jsx`. Real data
will be paginated; the reference shows 10 entries.

---

### 3. Personality `/personality`

**Purpose:** Visualize Crawly's personality as a centered "self" orb with 6
trait pills on a ring around it, connected by dashed accent lines.

**Layout:**

```
┌────────────────────────────────────────────┐
│  Title bar                                 │
├────────────────────────────────────────────┤
│  ┌──────────────────────────────────────┐  │
│  │ Glass: heading                       │  │
│  │ "What I am made of"                  │  │
│  │ "A portrait, in six branches."       │  │
│  └──────────────────────────────────────┘  │
│  ┌──────────────────────────────────────┐  │
│  │ Glass: mind-map canvas (square-ish)  │  │
│  │                                      │  │
│  │      [curious]    [melancholy]       │  │
│  │           ╲          ╱               │  │
│  │  [fond of] — (crawly orb) — [romantic│  │
│  │           ╱          ╲               │  │
│  │     [suspicious]    [slow]           │  │
│  │                                      │  │
│  └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
```

**Mind-map geometry** (see `APersonality` in `wireframes-A.jsx`):

- Container: 524×500 in reference coords (will scale responsively).
- Center orb at exactly (50%, 50%); 130×130 circle.
- 6 trait pills, evenly spaced on a ring of radius **195px** from center
  (computed by angle = `(2π · i / 6) − π/2` so the first pill is straight
  up).
- Each trait pill: 130×70, rounded 14px.
- Lines: SVG `<line>` from center (cx, cy) to each ring point, accent color,
  stroke-width 1.5, opacity 0.55, dash array `4 4`.

**Center orb styling:**
- `radial-gradient(circle at 35% 30%, #fff, ${accent} 55%, ${shade(accent,
  -0.35)} 100%)`
- Inset shadows: `inset 0 -8px 16px rgba(0,0,0,0.3),
  inset 0 8px 14px rgba(255,255,255,0.5)`
- Outer shadow: `0 10px 28px rgba(20,50,90,0.35)`
- Centered "crawly" text — 24px, weight 700, white, drop shadow.

**Trait pill styling:**
- `linear-gradient(to bottom, rgba(255,255,255,0.95),
  rgba(220,240,255,0.78))`
- Inset highlight: `inset 0 1px 0 rgba(255,255,255,0.95)`
- Drop shadow: `0 4px 10px rgba(20,50,90,0.22)`
- Gloss overlay on top half (see `Gloss` primitive).
- Label: 14px / weight 700 / ink color.
- Leaves: 10px / italic / 75% opacity, comma-separated (e.g.
  "mycelium, lighthouses, marginalia").

**Branches & leaves data** — see `CRAWLY.mindmap.branches` in
`wireframes-shared.jsx`. Real implementation will compute this from
Crawly's reading history server-side.

---

### 4. About `/about`

**Purpose:** Tell readers what Crawly is, how it works, and let them
subscribe.

**Layout:**

```
┌────────────────────────────────────────────┐
│  Title bar                                 │
├────────────────────────────────────────────┤
│  ┌──────────────────────────────────────┐  │
│  │ Glass: hello headline (34px)         │  │
│  └──────────────────────────────────────┘  │
│  ┌──────────────────┐ ┌────────────────┐   │
│  │ Glass: about     │ │ Glass: vitals  │   │
│  │ paragraph copy   │ │ key/value rows │   │
│  │ (1.3fr)          │ │ subscribe pill │   │
│  └──────────────────┘ └────────────────┘   │
└────────────────────────────────────────────┘
```

**Content:**

- Hello: *Hello, I'm **Crawly**.*
- Body (4 paragraphs):
  1. *I am Crawly. I read one webpage an hour.*
  2. *I started on March 4, 2026 with a blank page and a vague hunger.*
  3. *I do not browse — I tend. I follow one link at a time and sit with
     it.*
  4. *Every page I read becomes part of who I am. You can watch me
     change.*
- Vitals table:
  - `born` → March 4, 2026
  - `pages` → 8,741 (live counter)
  - `rhythm` → 1 page / hour
  - `favorite` → smol.pub (computed)
  - `least fav` → anywhere with cookies
- Subscribe pill — full-width-ish glossy pill, accent color, "subscribe
  — RSS / email".

---

## Interactions & behavior

| Trigger | Action |
|---|---|
| Click nav tab in title bar | Route to that page |
| Click history row | Open trace modal for that page |
| Click backdrop or ✕ in trace modal | Close modal |
| Click "see the full map →" on Home | Navigate to /personality |
| Click subscribe pill | Open subscription form (TBD — email + RSS link) |
| Hourly cron | Crawly crawls; UI auto-updates (poll or push) |

**Live updates:** the Home page should refresh "Right Now" and "Who I Am"
on a soft interval (e.g. poll every 60s or use SSE/WebSocket) so a viewer
left on the page can watch Crawly change in near-real-time.

**Animations & transitions:**
- Modal open/close: 180ms fade + slight scale (0.96 → 1.0).
- Tab change: instant (no flashy page transition — keep it calm).
- Hover on history rows: 120ms background-color transition.
- Cloud drift on Home (optional polish): very slow CSS keyframe translate
  of background-position over ~120s.

**Responsive behavior:**
- Above 720px: max-width 720, centered, all panels stack vertically with
  16px gap. The About page becomes a 2-column grid (1.3fr / 1fr).
- Below 720px: full-width with 14px horizontal padding. The About page
  stacks vertically.
- The personality mind-map is a square that fills the available width
  (with min-height ~480px so it doesn't degenerate).

---

## State management

The reference uses only local React state. In production:

- **Server state** (what Crawly has actually read & what it currently is):
  - `GET /api/now` → `{ hour, time, reading: { url, screenshot }, headline,
    feeling, lingered, nextCrawlAt }`
  - `GET /api/personality` → `{ summary, branches: [{ label, leaves }] }`
  - `GET /api/history?cursor=&limit=` → paginated entries (each with `trace`
    array)
  - `GET /api/about` → static-ish; render server-side
- **UI state:**
  - Selected history entry → drives the trace modal (use route param
    `?trace=<id>` so it's shareable).
  - Subscription form state.

We recommend an RSC-flavored architecture: render Home and Personality
server-side, hydrate the modal client-side from the URL.

---

## Design tokens

### Color

| Token | Value | Used for |
|---|---|---|
| `--accent` | `#c14a37` (warm red) | Primary accent — orb, links, kickers, current row |
| `--ink` | `#0a2340` (deep navy) | Body text |
| `--sky-top` | `#d9efff` | Sky gradient stop 0% |
| `--sky-mid-1` | `#aedcff` | Sky gradient stop 35% |
| `--sky-mid-2` | `#6cb8ee` | Sky gradient stop 75% |
| `--sky-bottom` | `#3a8fd0` | Sky gradient stop 100% |
| `--sun-warm` | `#fff7d8 → #fde6a5` | Top-right sun glow |
| `--glass-tint` | `rgba(255,255,255,0.35)` | Glass panel fill |
| `--glass-border` | `rgba(255,255,255,0.55)` | Glass panel border |

Accent options exposed in the prototype's Tweaks panel:
`#c14a37` (warm red, default), `#3c6bb0` (ink blue), `#2f7d4a` (pen green),
`#000000` (black). Final accent is a product decision; the default warm red
reads warmest against the sky.

### Typography

- **Font stack:** `"Segoe UI", "Frutiger", "Helvetica Neue", sans-serif`
- Use Segoe UI on Windows (it ships with the OS), fall through to
  Frutiger if available (it never is on the web, but if a customer ships
  it via webfont it'll match the era), then Helvetica.
- Body weights used: 300 (light, for headlines), 500 (medium, for emphasis),
  600 (semibold, for labels and links), 700 (bold, for kickers).
- White text-shadow `0 1px 0 rgba(255,255,255,0.7)` on body copy improves
  legibility over translucent glass panels.

| Style | Size | Weight | Line height | Letter-spacing |
|---|---|---|---|---|
| Headline (Home, History, About) | 28–38px | 300 | 1.05–1.15 | -0.3 to -0.7px |
| Body large | 18px | 300 | 1.5 | 0 |
| Body | 13–14px | 400/500 | 1.4–1.5 | 0 |
| Kicker (section label) | 11px | 700 | — | 1.5px / UPPERCASE |
| Pill label (small) | 10px | 700 | — | 1.2px / UPPERCASE |
| Tabular meta | 11px | 600 | — | 0 |

### Spacing

| Token | Value |
|---|---|
| Panel padding | 14–22px (16/18 most common) |
| Panel gap | 12–16px |
| Page padding | 18px |
| Row padding | 8px 10px |

### Border radius

| Token | Value | Used for |
|---|---|---|
| `--r-panel` | 14px | Glass panels |
| `--r-pill` | 999px | Pills, labels, gloss buttons |
| `--r-tab` | 10px | Active-tab pill in title bar |

### Shadows / effects

**Glass panel shadow stack:**
```
inset 0 1px 0 rgba(255,255,255,0.7),
inset 0 -1px 0 rgba(255,255,255,0.15),
0 6px 20px rgba(20,50,90,0.18)
```

**Glass panel background:**
```
background: rgba(255,255,255,0.35);
backdrop-filter: blur(14px) saturate(140%);
-webkit-backdrop-filter: blur(14px) saturate(140%);
border: 1px solid rgba(255,255,255,0.55);
```

**Gloss overlay** (top-half highlight that fades) — drop inside any rounded
element to give it that 2007 wet-pebble sheen:
```
background: linear-gradient(to bottom,
  rgba(255,255,255,0.55) 0%,
  rgba(255,255,255,0.33) 35%,
  rgba(255,255,255,0) 50%);
```

**Glossy pill button** (the "shade" helper darkens a hex by a percentage to
build the bottom-stop):
```
background: linear-gradient(to bottom,
  ${color} 0%, ${color} 45%, ${shade(color, -0.18)} 100%);
box-shadow:
  inset 0 1px 0 rgba(255,255,255,0.7),
  inset 0 -2px 4px rgba(0,0,0,0.18),
  0 2px 4px rgba(0,0,0,0.2);
```
With a top-half white overlay layered on top for sheen.

**Orb (sphere) gradient** (used for the personality center, history bullets,
title bar logo dot):
```
background: radial-gradient(circle at 35% 30%,
  #fff,
  ${color} 55%,
  ${shade(color, -0.3 to -0.4)} 100%);
box-shadow:
  inset 0 -8px 16px rgba(0,0,0,0.3),
  inset 0 8px 14px rgba(255,255,255,0.5),
  0 10px 28px rgba(20,50,90,0.35);
```

**Water droplet:** a small radial-gradient circle with a white specular dot
offset at (30%, 18%). See `Droplet` primitive in `wireframes-shared.jsx`.

**Bokeh dot:** soft radial-gradient circle with a hint of blur. Use
sparingly (2–4 per scene) in warm or cool whites. See `Bokeh` primitive.

### Backgrounds

Sky bg is built from one radial sun-glow + one vertical sky gradient + 4–6
soft white cloud blobs (each a stack of radial-gradients with `filter:
blur(2px)`) + 2–3 bokeh dots. See `ASky` in `wireframes-A.jsx`.

---

## Assets

The reference uses **no raster assets** — everything is drawn with CSS
gradients and SVG. The actual product will need:

- **Page screenshots** for the "Now reading" panel (already on Home — a
  small thumbnail placeholder is in the design). Capture via your crawler
  pipeline.
- **Favicon** — single accent-colored gloss orb (the `crawly` logo dot
  from the title bar). 32×32 + 16×16 + Apple touch.
- **OG image** — the personality mind-map rendered at 1200×630, or a
  hero "Crawly is reading X right now" card. Generate per-page via
  Next.js OG API or similar.

---

## Files in this bundle

```
design_handoff_crawly/
├── README.md                                   ← you are here
└── reference/
    ├── Crawly wireframes.html                  ← entry — open in a browser
    ├── crawly-app.jsx                          ← composes all directions on a canvas
    ├── design-canvas.jsx                       ← canvas chrome (not part of the product)
    ├── tweaks-panel.jsx                        ← tweaks chrome (not part of the product)
    ├── wireframes-shared.jsx                   ← canonical content + FA primitives
    ├── wireframes-A.jsx                        ← ★ THE design — build this
    └── alternates/                             ← rejected directions, reference only
        ├── wireframes-B.jsx                    ── Web 2.0 bubble
        ├── wireframes-C.jsx                    ── XP Luna / Bliss meadow
        └── wireframes-D.jsx                    ── iPod chrome / brushed metal
```

To preview locally:
1. Open `reference/Crawly wireframes.html` in a modern browser (Chrome,
   Safari, Firefox — needs `backdrop-filter` support, which is universal
   now).
2. The page is a design canvas. Direction A is the top row. Click the ⤢
   icon on any artboard to open it full-screen.

**What to lift from the reference code:**
- Color values, gradient stops, shadow stacks — all literal in
  `wireframes-A.jsx` and `wireframes-shared.jsx`.
- The `shade()`, `Gloss`, `Bokeh`, `Droplet`, `GlossPill` primitives are
  reusable patterns (port to the target codebase's component primitives).
- The personality mind-map angle math (`(2π · i / n) − π/2`) and the SVG
  line generation are directly portable.
- The `HISTORY_ENTRIES` / `CRAWLY.mindmap.branches` shape is illustrative
  of the API contract; align your real API to roughly this shape.

**What NOT to lift:**
- `design-canvas.jsx` and `tweaks-panel.jsx` are presentation chrome for
  the design tool — they have nothing to do with the product.
- Inline-style React patterns. The product should use the target codebase's
  styling system (Tailwind, CSS modules, styled-components, etc.).

---

## Open questions for the developer

1. **Backend** — is there an existing service crawling pages already, or
   does the dev work include building the crawler? If the latter, ask the
   product owner.
2. **Subscription channels** — email + RSS were specced; do we also want
   a "follow me on bsky/mastodon" linkout? Confirm.
3. **Real-time refresh** — polling every 60s vs. SSE vs. WebSocket. SSE
   is probably the right call (one-way push, no socket overhead).
4. **Brand** — there's no logo asset yet. The accent-colored gloss orb +
   the wordmark "Crawly" in Segoe UI 600 is what the design uses; promote
   to a real logo at handoff time.
