# fitwardrobe.me

Marketing website for **FitWardrobe**, a digital wardrobe app that plans outfits from the clothes you
already own (coming soon to Android and the web). This repository is the site at
https://fitwardrobe.me: homepage, guide pages, blog, legal pages and the early-access sign-up.

The app itself lives in a separate repository.

## Stack

- [Next.js 15](https://nextjs.org) (App Router) with `output: "export"`: the whole site is static HTML in `out/`
- React 19, TypeScript, plain CSS (Tailwind is used only for its CSS reset)
- Hosted on [Vercel](https://vercel.com); redirects and security headers in `vercel.json`
- Icons: [Lucide](https://lucide.dev) for interface icons, [Simple Icons](https://simpleicons.org) for social logos
- Analytics: Google Analytics 4 and Microsoft Clarity (both behind the consent banner in the EEA, UK and
  Switzerland) and Vercel Web Analytics (cookieless)

## Getting started

```bash
corepack enable            # uses the pnpm version pinned in package.json
pnpm install
pnpm dev                   # http://localhost:3000
pnpm build                 # static export to out/, then font preload hints
pnpm typecheck && pnpm lint
```

Node 20.9 or later (see `.nvmrc`). On a low-memory machine, build with
`NODE_OPTIONS=--max-old-space-size=1536 NEXT_BUILD_CPUS=1 pnpm build`.

All environment variables are optional and public (they end up in the HTML anyway); the defaults are
built into the code. See `.env.example`.

## Project structure

```
src/
  app/                   routes (one folder per page), global styles, sitemap, robots
    tokens.css           the colour palette: the single source of truth for colours
    maison.css           base layout, header, footer, buttons, forms
    theme13.css          homepage design ("Image 13" direction)
    pages13.css          inner pages, blog, articles, legal pages
  components/
    home/                homepage parts (phone preview, early-access form, motion)
    site/                header, footer, logo, page hero, early-access band, consent banner
    blog/                blog index, cards, reading progress
    legal/               legal page layout
  content/posts/         one JSON file per blog post (see "Editing the blog")
  data/                  homepage copy, legal texts, image map, post loader, schema.org data
  lib/                   SEO helpers, analytics, early-access form submission, site config
public/
  images/home/           homepage and page-hero photos (AVIF + WebP, several widths)
  images/blog/           blog covers
  brand/                 logo, icons, colour tiles
  llms.txt               summary for AI search tools
scripts/preload-fonts.mjs
```

## Editing the blog

Each post is `src/content/posts/<slug>.json`:

| Field | Meaning |
|---|---|
| `title` | SEO title (max ~60 characters; " \| FitWardrobe" is added) |
| `h1`, `excerpt` | Visible headline; meta description and card text (140-155 characters) |
| `topic` | One of the five topics in `src/data/images.ts` |
| `date` | First published. Never change it. |
| `updated` | Only when the post is substantially rewritten: the date that version goes live |
| `tldr`, `body`, `faq`, `related` | Quick answer, article HTML, FAQ pairs, related slugs |

The page template adds the table of contents, FAQ section, author note, structured data (BlogPosting,
BreadcrumbList, FAQPage) and the early-access band. When a post is removed, add a single-hop 301 in
`vercel.json` to its closest remaining post.

## Images

Photos are AI-generated and disclosed in the footer. Covers and heroes are mapped in
`src/data/images.ts`; files follow `<name>-<width>.avif|webp`. Keep new photos in the site palette.

## Colours

Use the tokens in `src/app/tokens.css` (`--c-forest`, `--c-gold`, `--c-cream` and so on); every
token lists its contrast ratio. Do not add new hex values in component styles.

## Deploying

Pushing to `main` deploys to Vercel. The canonical host is `https://fitwardrobe.me` with trailing
slashes; `www.fitwardrobe.me` permanently redirects to it (set in the Vercel domain settings). Blog
updates ship in weekly waves on separate branches (`blog-wave-2` to `blog-wave-5`) so each post's
date matches the day it goes live.

## Not in this repository

Brand strategy, internal product documents and source media are kept locally and are git-ignored
(the repository is public). Never commit them.

## License

Proprietary. See `LICENSE`. Third-party software: `THIRD_PARTY_LICENSES.md`.
