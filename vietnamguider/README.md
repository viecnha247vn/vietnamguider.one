# Vietnam Guider

Online Travel Concierge — Next.js (App Router) + TypeScript + Tailwind CSS.
This starter includes the full **Header navigation** (desktop mega menu +
mobile drawer) and a minimal home page so the site runs out of the box.

## What's inside

```
vietnamguider/
├─ app/
│  ├─ layout.tsx        ← fonts, metadata, mounts the Header on every page
│  ├─ page.tsx          ← temporary home page (replace with your hero)
│  └─ globals.css       ← Tailwind + base styles + focus/reduced-motion
├─ components/
│  ├─ Header.tsx        ← desktop mega menu + mobile drawer  (main file)
│  └─ LanguageSwitcher.tsx
├─ lib/
│  └─ nav.ts            ← ALL menu links live here — edit this to change the menu
├─ tailwind.config.ts   ← brand colours ("lacquer" palette) + fonts
├─ package.json
└─ ... config files
```

## Run it on your Mac

1. Install [Node.js](https://nodejs.org) (LTS version) if you don't have it.
2. Open Terminal in this folder and run:

   ```bash
   npm install
   npm run dev
   ```

3. Open http://localhost:3000 — you'll see the header working.

## Change the menu

You almost never touch `Header.tsx`. To add or rename a destination, guide,
or link, edit **`lib/nav.ts`** only. Both the desktop menu and the mobile
menu update automatically from that one file.

## Change the brand colours

Edit the `colors` block in **`tailwind.config.ts`**. The palette:

| Token      | Hex       | Use                         |
|------------|-----------|-----------------------------|
| `ink`      | `#143C34` | primary deep green          |
| `gold`     | `#C89B3C` | accent / call-to-action     |
| `eggshell` | `#FAF6EE` | page background             |
| `charcoal` | `#1C1B19` | body text                   |
| `sage`     | `#6B7A70` | muted borders / small text  |

## Deploy (GitHub → Vercel — your usual flow)

1. Create a new repository on GitHub and push this folder to it.
2. In Vercel: **Add New → Project → Import** the repo. Vercel detects Next.js
   automatically — just press **Deploy**.
3. In the project's **Settings → Domains**, add `vietnamguider.one`.

No build settings to configure; the defaults work.

## Next things to build (from your spec)

- `RouteComparisonCard` — Cheapest / Convenient / Comfortable + affiliate CTAs
- `HotelRecommendationCard` — Budget / Mid-range / Luxury + Agoda/Booking CTAs
- `EsimComparisonTable`
- `Vietnam Trip Builder` (multi-step form)
- MDX article pages for the SEO content (see note below)

> **Content note:** this starter uses plain code pages. For the 50–100 SEO
> articles, add `@next/mdx` and write each article as an `.mdx` file in the
> repo — no separate CMS to pay for or maintain. Ask me to wire that up when
> you're ready.
