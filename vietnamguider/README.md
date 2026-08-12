# Vietnam Guider

Next.js (App Router) + TypeScript + Tailwind. Project lives at the repo root —
no wrapper folder — so files are easy to edit one at a time on mobile.

## Add a new article (ONE file)
Create a single file: `content/<slug>.mdx`. It appears on /blog automatically.

    ---
    title: "Your title"
    description: "One sentence for Google."
    category: "Getting Around"
    date: "2026-08-20"
    readMinutes: 5
    ---

    # Heading

    <RouteComparisonCard from="Hanoi" to="..." options={[ ... ]} />

The URL becomes /blog/<slug>. No folders, no registry to edit.

## Change the menu
Edit `lib/nav.ts` only.

## Deploy
GitHub repo root -> Vercel. Root Directory must be EMPTY (project is at root).
