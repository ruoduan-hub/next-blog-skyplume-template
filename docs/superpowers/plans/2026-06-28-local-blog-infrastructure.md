# Local Blog Infrastructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Replace the external blog utility layer with local project code and remove the package dependency.

**Architecture:** Build small local modules for content helpers, MDX plugins, MDX rendering, analytics, newsletter, and search. Keep UI behavior aligned with the existing blog and verify with focused tests plus a full Next.js production build.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Contentlayer2, Tailwind CSS 4, Node test runner.

## Global Constraints

- Work on branch `chore-pkg`.
- Keep all Codex, design, and superpower documents under `docs/`.
- Do not introduce another template/search framework dependency.
- Preserve current routes, generated `search.json`, tag data, RSS output semantics, and MDX rendering.
- Keep replacements typed and split by clear responsibility.

---

### Task 1: Local Pure Utilities

**Files:**

- Create: `lib/content/core.ts`
- Create: `lib/content/format-date.ts`
- Create: `lib/content/html-escape.ts`
- Create: `tests/content-utils.test.mjs`
- Modify: `package.json`

**Interfaces:**

- Produces: `sortPosts<T>(posts: T[], dateKey?: keyof T): T[]`
- Produces: `coreContent<T extends Record<string, unknown>>(content: T): Omit<T, 'body' | '_raw' | '_id'>`
- Produces: `allCoreContent<T extends Record<string, unknown>>(contents: T[]): Array<Omit<T, 'body' | '_raw' | '_id'>>`
- Produces: `formatDate(date: string | Date, locale?: string): string`
- Produces: `escapeHtml(value: string): string`

- [x] Write failing tests for sort, core extraction, date formatting, escaping, and production draft filtering.
- [x] Run `yarn test:local` and confirm tests fail because modules do not exist.
- [x] Implement the utility modules.
- [x] Run `yarn test:local` and confirm tests pass.

### Task 2: Local MDX Infrastructure

**Files:**

- Create: `lib/mdx/plugins.ts`
- Create: `lib/mdx/mdx-layout-renderer.tsx`
- Create: `tests/mdx-plugins.test.mjs`
- Modify: `contentlayer.config.ts`
- Modify: `app/blog/[...slug]/page.tsx`

**Interfaces:**

- Produces: `remarkExtractFrontmatter()`
- Produces: `remarkCodeTitles()`
- Produces: `remarkImgToJsx()`
- Produces: `remarkTocHeadings()`
- Produces: `extractTocHeadings(markdown: string): Promise<Array<{ value: string; url: string; depth: number }>>`
- Produces: `MDXLayoutRenderer({ code, components, ...rest })`

- [x] Write failing tests for TOC extraction and code-title AST insertion.
- [x] Run `yarn test:local` and confirm MDX tests fail because modules do not exist.
- [x] Implement local MDX plugins and renderer.
- [x] Update imports in Contentlayer config and blog detail page.
- [x] Run `yarn test:local`.

### Task 3: Local UI Components

**Files:**

- Create: `components/mdx/TOCInline.tsx`
- Create: `components/mdx/Pre.tsx`
- Create: `components/mdx/Bleed.tsx`
- Create: `components/newsletter/NewsletterForm.tsx`
- Create: `components/newsletter/BlogNewsletterForm.tsx`
- Modify: `components/MDXComponents.tsx`
- Modify: `layouts/PostBanner.tsx`
- Modify: `app/Main.tsx`

**Interfaces:**

- Produces: `TOCInline`
- Produces: `Pre`
- Produces: `Bleed`
- Produces: `NewsletterForm`
- Produces: `BlogNewsletterForm`

- [x] Implement components with current class semantics and accessible labels.
- [x] Use `lucide-react` icons in `Pre` instead of hand-written SVG.
- [x] Replace external UI utility imports.
- [x] Run `yarn build` to catch server/client component boundaries.

### Task 4: Local Search, Analytics, and Newsletter API

**Files:**

- Create: `components/search/SearchProvider.tsx`
- Create: `components/analytics/Analytics.tsx`
- Create: `lib/newsletter/api.ts`
- Modify: `components/SearchButton.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/api/newsletter/route.ts`

**Interfaces:**

- Produces: `SearchProvider`
- Produces: `useSearch()`
- Produces: `Analytics`
- Produces: `NewsletterAPI(options: { provider?: string })`

- [x] Implement search context and modal that loads `search.json`.
- [x] Preserve `SearchButton` public behavior and aria label.
- [x] Implement analytics no-op renderer for current empty config.
- [x] Implement newsletter route handler with the same response shape for unsupported provider, missing email, and success-compatible providers.
- [x] Run `yarn build`.

### Task 5: Replace Imports and Remove Dependency

**Files:**

- Modify: `app/page.tsx`
- Modify: `app/blog/page.tsx`
- Modify: `app/blog/page/[page]/page.tsx`
- Modify: `app/tags/[tag]/page.tsx`
- Modify: `app/tags/[tag]/page/[page]/page.tsx`
- Modify: `layouts/ListLayoutWithTags.tsx`
- Modify: `layouts/PostLayout.tsx`
- Modify: `layouts/PostSimple.tsx`
- Modify: `components/home/PostFeed.tsx`
- Modify: `scripts/rss.mjs`
- Modify: `data/siteMetadata.js`
- Modify: `tsconfig.json`
- Modify: `css/tailwind.css`
- Modify: `package.json`
- Modify: `yarn.lock`
- Modify: `README.md`
- Modify: `README.zh-CN.md`
- Modify: `CHANGELOG.md`

**Interfaces:**

- Consumes: modules from Tasks 1-4.
- Produces: zero remaining source imports from the removed package.

- [x] Replace every remaining external utility import with local imports.
- [x] Remove the package dependency and TypeScript path alias.
- [x] Remove Tailwind source scan for the removed package.
- [x] Update docs wording to local search index.
- [x] Run a repository scan and confirm only this implementation history remains in Git metadata.
- [x] Run `yarn install` to update `yarn.lock`.
- [x] Run `yarn test:local`.
- [x] Run `yarn build`.
