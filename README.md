# Skyplume Blog Template

> A refined, content-first Next.js blog template for personal publishing, engineering notes, project journals, and long-form MDX writing.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fruoduan-hub%2Fnext-blog-skyplume-template&project-name=skyplume-blog&repository-name=skyplume-blog)
[![GitHub stars](https://img.shields.io/github/stars/ruoduan-hub/next-blog-skyplume-template?style=social)](https://github.com/ruoduan-hub/next-blog-skyplume-template/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-black.svg)](./LICENSE)

[简体中文](./README.zh-CN.md)

Skyplume is an open-source blog template extracted from [Ruoduan](https://www.0x1ai.com/)'s personal blog at [0x1ai.com](https://www.0x1ai.com/). It keeps the parts that matter for a serious personal site: fast pages, clean typography, strong SEO defaults, MDX authoring, RSS, sitemap, local search, tags, dark mode, animated details, and an architecture that is easy to customize.

## Links

- Production reference: [0x1ai.com](https://www.0x1ai.com/)
- GitHub repository: [ruoduan-hub/next-blog-skyplume-template](https://github.com/ruoduan-hub/next-blog-skyplume-template)
- One-click deploy: [Deploy Skyplume to Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fruoduan-hub%2Fnext-blog-skyplume-template&project-name=skyplume-blog&repository-name=skyplume-blog)
- Use as a GitHub template: [Generate a new repository](https://github.com/ruoduan-hub/next-blog-skyplume-template/generate)

## Highlights

- Built with Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, and Contentlayer
- MDX-first writing flow with front matter, reading time, table of contents, code highlighting, math, citations, alerts, images, iframes, and custom components
- SEO-ready metadata, Open Graph cards, Twitter cards, JSON-LD for posts, canonical URL support, sitemap, robots, and RSS feed
- Build-time local search index powered by `pliny`
- Tags, pagination, author profiles, projects page, about page, and optional Giscus comments
- Dark mode with system preference support
- Subtle motion: route transitions, hero reveal, scroll reveal, feed item reveal, hover states, and a top progress bar
- Security-conscious Next.js headers, long-term static asset caching, and static export support
- Tuned for Lighthouse triple 100 scores on the baseline template: Performance, Best Practices, and SEO

## Design Philosophy

Skyplume is designed for reading before decoration. The interface uses restrained spacing, sharp typography, quiet borders, and focused article layouts so the writing stays in front. Motion is intentionally short and lightweight: it gives navigation and lists a sense of polish without turning the blog into an animation demo.

The template is also meant to be owned. Most customization starts in plain data files, MDX files, and small React components instead of a large CMS or hidden configuration layer.

## Theme Color

Skyplume uses a Mineral Teal palette: a low-chroma, lab-grade teal paired with teal-tinted neutrals. Body text, lists, borders, and content surfaces stay in quiet gray scales so long-form reading remains stable. The primary color is reserved for links, focus states, the progress bar, tags, and important interactive states.

The color system follows three principles:

- Reading first: gray scales carry the article, lists, and metadata without visual noise.
- Laboratory character: Mineral Teal appears like an instrument indicator, giving the site a memorable technical identity.
- Dark-mode stability: deep teal-gray backgrounds and lighter primary accents keep hover states, links, and code details clear without becoming harsh.

## Feature Overview

| Area              | What is included                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Publishing        | MDX posts from `data/blog`, drafts, summaries, images, categories, tags, authors, reading time, table of contents                          |
| Content rendering | GitHub-flavored Markdown, math via KaTeX, citations, code titles, syntax highlighting, heading anchors, custom images and iframes          |
| Navigation        | Home feed, blog index, pagination, tag pages, projects page, about page, previous/next post links                                          |
| SEO               | App Router metadata, per-page metadata helper, Open Graph, Twitter cards, JSON-LD `BlogPosting`, canonical URL field, sitemap, robots, RSS |
| Discovery         | Build-time `search.json`, RSS feed, tag counts, structured archive pages                                                                   |
| UX                | Responsive layout, dark mode, local search, comments, scroll-to-top/comment shortcut, progress bar                                         |
| Performance       | Static generation, Contentlayer build output, optimized font loading, cache headers for static assets, optional static export              |
| Security          | CSP, referrer policy, frame protection, content-type protection, HSTS, permissions policy                                                  |

## SEO and Lighthouse

Skyplume ships with practical SEO foundations instead of afterthought meta tags:

- Site-wide metadata in `app/layout.tsx`
- Page metadata through `app/seo.tsx`
- Article metadata in `app/blog/[...slug]/page.tsx`
- JSON-LD `BlogPosting` data generated from MDX front matter
- `sitemap.xml` from static routes and published posts
- `robots.txt` with sitemap discovery
- `feed.xml` generated after build
- Open Graph and Twitter image defaults through `data/siteMetadata.js`
- Clean article summaries for cards, feeds, and search snippets

The baseline template has been tuned to reach Lighthouse 100/100/100 for Performance, Best Practices, and SEO. Your final scores still depend on deployed content, third-party scripts, images, analytics, comments, and hosting configuration, so rerun Lighthouse after customization.

![Lighthouse scores showing 100 for Performance, Best Practices, and SEO](intro/lighthouse.png)

## Animation Details

The motion system is intentionally small:

- `PageTransition` gives route changes a short fade-and-lift transition
- `ProgressBar` provides lightweight navigation feedback
- `LabHero` uses staggered reveal for the first screen
- `PostFeed` reveals posts as they enter the viewport
- `ScrollReveal` is available for page sections
- `css/animations.css` keeps keyframes centralized and easy to adjust

## Tech Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Contentlayer 2
- MDX
- Pliny utilities
- Giscus comments
- Yarn

## Quick Start

```bash
yarn install
yarn dev
```

Open <http://localhost:3000>.

## Deploy to Vercel

The fastest path is the one-click deploy button at the top of this README. It clones this repository into your Git provider, creates a Vercel project, and keeps the app deployable with the default configuration.

Comments are optional. The template boots without newsletter, analytics, or comment credentials. To enable Giscus comments, copy `.env.example` to `.env.local` and fill in the required values.

## Configure Your Site

Edit these files first:

- `data/siteMetadata.js`: site title, URL, author, email, GitHub, comments, search, and SEO defaults
- `data/profile.ts`: about page profile, links, skills, and template guide content
- `data/authors/default.mdx`: default author metadata and biography
- `data/headerNavLinks.ts`: top navigation
- `data/projectsData.ts`: projects page content
- `public/static/images/skyplume-card.svg`: social sharing image
- `public/static/favicons/favicon.svg`: favicon

For comments, copy `.env.example` to `.env.local` and fill the Giscus values. To disable comments, set `comments.provider` to an empty string in `data/siteMetadata.js`.

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

This template includes one example post: `data/blog/term-proxy.mdx`.

## Available Scripts

```bash
yarn dev       # Start local development
yarn build     # Build Next.js and generate RSS output
yarn serve     # Serve the production build
yarn analyze   # Run the bundle analyzer
yarn lint      # Lint app, components, layouts, and scripts
```

## Static Export

Skyplume can be exported as static files:

```bash
EXPORT=true UNOPTIMIZED=true yarn build
```

Use `BASE_PATH` if deploying under a subpath.

## Project Structure

```text
app/                 App Router pages, metadata, sitemap, robots
components/          Shared UI, MDX components, search, theme, motion
data/                Site metadata, authors, profile, projects, posts
layouts/             Blog post and list layouts
public/static/       Images, favicons, and post assets
scripts/             RSS and post-build scripts
css/                 Tailwind, syntax highlighting, animations
```

## Suggested GitHub Topics

If you fork or publish a derivative template, these topics help people discover it:

```text
nextjs nextjs-template blog-template mdx contentlayer tailwindcss typescript vercel static-site personal-website
```

## Recommend Skyplume to Vercel

Skyplume is ready to be shared with the Vercel community as a polished blog template:

- Category fit: Blog, Next.js, Tailwind CSS, MDX, static content
- Repository: <https://github.com/ruoduan-hub/next-blog-skyplume-template>
- Production reference: <https://www.0x1ai.com/>
- One-click deploy: <https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fruoduan-hub%2Fnext-blog-skyplume-template&project-name=skyplume-blog&repository-name=skyplume-blog>

Suggested short pitch:

> Skyplume is a refined Next.js 15 blog template extracted from a production personal site. It ships with MDX publishing, Contentlayer, Tailwind CSS 4, local search, RSS, sitemap, JSON-LD, Open Graph defaults, dark mode, Giscus comments, static export support, security headers, and a baseline Lighthouse 100/100/100 setup for Performance, Best Practices, and SEO.

## Credits

This template is derived from the blog system used by [Ruoduan](https://www.0x1ai.com/) on [0x1ai.com](https://www.0x1ai.com/) and is packaged as a reusable open-source starting point for clean personal publishing.

## License

MIT
