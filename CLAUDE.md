# CLAUDE.md - Mad Apple Roster Showcase

## Project Overview

Next.js app that pulls roster data from Airtable and displays it as a polished, filterable team roster website for **Mad Apple Softball** (2025-2026 season).

**Live site:** https://madapple-roster.vercel.app
**Vercel project:** russellrcoachiqios-projects/madapple-roster

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 16** | App Router, Server Components, dynamic rendering |
| **shadcn/ui** | UI components (Tabs, Card, Badge, Avatar, Select, Table, Separator) |
| **Tailwind CSS v4** | Styling (dark theme) |
| **Airtable API** | Data source (REST API, server-side fetching) |
| **Vercel** | Hosting, auto-deploy on push to `main` |

---

## Airtable Connection

| Field | Value |
|-------|-------|
| **Base ID** | `appIEyrGG4Bv1cy1O` |
| **Base Name** | Madapple Athletes |
| **Teams Table** | `tbl5jnHs5R5D8J7f6` |
| **Players Table** | `tblJGEjabdzLl8XuG` |
| **API Key** | Stored in `.env.local` (NOT committed) |

### Environment Variables (required)

```
AIRTABLE_API_KEY=pat...  # Airtable personal access token with Madapple Athletes base access
AIRTABLE_BASE_ID=appIEyrGG4Bv1cy1O
```

These are set in both `.env.local` (local dev) and Vercel (production).

---

## Data Model

### Teams Table
| Field | Type |
|-------|------|
| Team Name | Text (primary) |
| Age Group | Single Select (18U, 16U, 14U, 13U, 12U, 11U, 10U) |
| Head Coach | Text |
| Season | Text |

### Players Table
| Field | Type |
|-------|------|
| Name | Text (primary) |
| Number | Number (integer) |
| Team | Linked Record → Teams |
| Grad Year | Number (integer, nullable — 11U has none) |
| Position | Text (nullable — 14U Lickey has none) |
| Recruiting Link | URL |
| Commitment | Text |

### Current Stats
- **14 teams** across 7 age groups
- **159 players** total
- Data flows: Airtable → Next.js Server Components → Rendered pages

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              ← Root layout (dark theme, SiteHeader)
│   ├── page.tsx                ← Homepage (age group tabs + team cards)
│   ├── globals.css             ← Tailwind + shadcn theme variables
│   └── teams/[slug]/page.tsx   ← Team roster page (player cards + filters)
├── components/
│   ├── ui/                     ← shadcn/ui primitives (don't edit directly)
│   ├── site-header.tsx         ← Top nav bar with Mad Apple branding
│   ├── age-group-tabs.tsx      ← Client: tab navigation by age group
│   ├── team-card.tsx           ← Card shown on homepage per team
│   ├── player-card.tsx         ← Card shown on roster page per player
│   ├── position-badge.tsx      ← Color-coded position badges
│   └── roster-filters.tsx      ← Client: position + grad year filter dropdowns
└── lib/
    ├── airtable.ts             ← All Airtable fetch functions
    └── utils.ts                ← shadcn cn() utility
```

---

## Key Patterns

### Data Fetching
- All Airtable calls happen in **Server Components** (no client-side API calls)
- Pages use `export const dynamic = "force-dynamic"` for fresh data on every request
- `getPlayers()` fetches all players with pagination (handles Airtable's 100-record page limit)
- `getPlayersByTeamId()` fetches all players then filters in JS (avoids Airtable linked-record formula issues)

### Routing
- Team slugs are generated from team names via `slugify()` in `lib/airtable.ts`
- Example: "Mad Apple 18U Metzger" → `/teams/mad-apple-18u-metzger`

### Position Badge Colors
| Position Type | Color |
|---------------|-------|
| P, LHP | Red |
| C | Blue |
| IF (1B, 2B, 3B, SS, MI) | Emerald |
| OF, CF | Amber |
| UTL | Purple |

---

## Common Tasks

### Update roster data
Edit directly in Airtable → site reflects changes on next page load (no redeploy needed).

### Add a new team
1. Add row to Teams table in Airtable (Team Name, Age Group, Head Coach, Season)
2. Add player rows to Players table linked to the new team
3. Site picks it up automatically

### Add a new field to player cards
1. Add field in Airtable Players table
2. Update `PlayerFields` interface in `src/lib/airtable.ts`
3. Update `Player` interface and the mapping in `getPlayers()`
4. Update `src/components/player-card.tsx` to display the new field

### Change styling/theme
- Dark theme colors are in `src/app/globals.css` under `.dark {}`
- Accent color (red) is used in components directly via Tailwind classes
- shadcn components are in `src/components/ui/` — override via className props, not by editing the files

### Deploy changes
Push to `main` → Vercel auto-deploys. Or manually: `npx vercel deploy --prod`

---

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
npx vercel deploy --prod
```

---

## Important Notes

- `.env.local` contains the Airtable API key — **never commit this**
- Vercel has its own copy of the env vars (set during first deploy)
- The Airtable token (`patGcP...`) is scoped only to the Madapple Athletes base
- 14U Lickey has no position data (null positions are handled gracefully)
- 11U Nicolet has no grad year data (null grad years are hidden, not shown as "Class of null")
- Brilee Day (18U Metzger) is the only player with a commitment badge
- Milana Koveloski (16U Bowman) is the only player with a recruiting link

---

*Last Updated: February 2026*
