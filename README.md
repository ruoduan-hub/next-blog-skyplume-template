# nextjs-blog-skyplume-template

A clean, content-first Next.js blog template for personal sites, engineering notes, project write-ups, and long-form MDX publishing.

It is based on a real production blog setup and keeps the useful parts: App Router, Contentlayer-powered MDX, Tailwind CSS, dark mode, local search, RSS, sitemap, tags, code highlighting, and optional Giscus comments.

## Features

- Next.js 15 App Router with TypeScript and React 19
- MDX posts from `data/blog` powered by Contentlayer
- Tags, pagination, reading time, table of contents, and SEO metadata
- Local search index generated at build time
- RSS feed, sitemap, robots, and Open Graph defaults
- Tailwind CSS 4 styling with dark mode
- Optional Giscus comments via environment variables
- Static export support through `EXPORT=true`

## Quick Start

```bash
yarn install
yarn dev
```

Open http://localhost:3000.

## Configure Your Site

Edit these files first:

- `data/siteMetadata.js`: site title, URL, author, email, GitHub, comments, search, and SEO defaults
- `data/profile.ts`: about page profile, links, skills, and template guide content
- `data/authors/default.mdx`: default author metadata and biography
- `data/headerNavLinks.ts`: top navigation
- `public/static/images/skyplume-card.svg`: social sharing image
- `public/static/favicons/favicon.svg`: favicon

## Write Posts

Create MDX files in `data/blog`.

```mdx
---
title: My First Post
date: '2026-01-01'
tags:
  - nextjs
  - writing
categories:
  - notes
draft: false
summary: A short description for feeds, cards, and SEO.
authors:
  - default
---

Write your post in MDX.
```

Place post images under `public/static/blog/<post-slug>` and reference them like this:

```mdx
![Screenshot](/static/blog/my-first-post/screenshot.png)
```

This template keeps one example post: `data/blog/term-proxy.mdx`.

## Comments

Comments use Giscus and are optional. Copy `.env.example` to `.env.local`, fill the Giscus values, and keep `comments.provider` set to `'giscus'` in `data/siteMetadata.js`.

To disable comments, set:

```js
comments: {
  provider: '',
}
```

## Build

```bash
yarn build
yarn serve
```

The build generates Contentlayer data, tag counts, local search, sitemap, and RSS output.

## Deploy

Deploy to Vercel for the simplest path. Set `siteMetadata.siteUrl` to your production URL before publishing.

For static export:

```bash
EXPORT=true UNOPTIMIZED=true yarn build
```

## Project Structure

```text
app/                 App Router pages and metadata
components/          UI components and page sections
data/                Site metadata, authors, profile, posts
layouts/             Blog list and post layouts
public/static/       Images, favicons, and post assets
scripts/             RSS and post-build scripts
css/                 Tailwind and syntax highlighting styles
```

## License

MIT
