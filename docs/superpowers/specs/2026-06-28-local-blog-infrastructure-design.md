# Local Blog Infrastructure Design

## Goal

Replace the external blog utility layer with local project code while preserving the existing blog behavior, generated content, MDX rendering, search index, RSS output, analytics placeholder behavior, and newsletter API contract.

## Constraints

- Work on branch `chore-pkg`.
- Store Codex, design, and superpower artifacts under `docs/`.
- Do not change published routes, pagination semantics, post sorting, tag pages, or generated `search.json` shape.
- Do not introduce a replacement template dependency.
- Keep local replacements small, typed, and easy to audit.
- Use the existing visual language for any replacement UI.

## Architecture

The replacement is a local blog infrastructure layer split by responsibility:

- `lib/content/core.ts` provides Contentlayer helpers: `sortPosts`, `sortedBlogPost`, `coreContent`, `allCoreContent`, `pick`, and `omit`.
- `lib/content/format-date.ts` provides locale-aware date formatting.
- `lib/content/html-escape.ts` provides RSS/XML escaping.
- `lib/mdx/plugins.ts` provides the MDX remark plugins and TOC extraction used by `contentlayer.config.ts`.
- `lib/mdx/mdx-layout-renderer.tsx` renders compiled Contentlayer MDX code.
- `components/mdx/TOCInline.tsx`, `components/mdx/Pre.tsx`, `components/mdx/Bleed.tsx`, and newsletter form components provide local MDX UI primitives.
- `components/search/SearchProvider.tsx` and `components/SearchButton.tsx` provide a local search dialog that reads the existing `search.json`.
- `components/analytics/Analytics.tsx` provides current no-op analytics behavior and leaves typed extension points.
- `lib/newsletter/api.ts` provides the local newsletter route handler.

## Behavior Notes

`sortPosts` sorts descending by `date` by default and mutates the input array, matching current behavior. `allCoreContent` removes `body`, `_raw`, and `_id`, and filters `draft: true` only in production. The local search dialog maps search documents by `title`, `summary`, `tags`, `path`, and `date`, then routes to `/${path}`.

The MDX plugins intentionally mirror the existing behavior: code block language titles use `lang:title`, local public images are converted to MDX `Image` nodes with dimensions, YAML frontmatter is exposed on `file.data.frontmatter`, and TOC entries use GitHub-style slugs.

## Testing

Add focused Node tests for the pure infrastructure:

- content helpers preserve sort, core extraction, and production draft filtering.
- date formatting matches the existing locale output.
- HTML escaping covers RSS-sensitive characters.
- TOC extraction returns heading values, URLs, and depths.

Use `yarn test:local` for the focused tests and `yarn build` as the integration verification.

## UI Direction

No broad redesign. The search dialog should match the current restrained blog UI: compact fixed overlay, neutral surfaces, existing primary color for focus states, keyboard-friendly list navigation, and no decorative visual additions.
