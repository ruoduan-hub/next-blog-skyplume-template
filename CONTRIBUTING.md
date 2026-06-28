# Contributing to Skyplume

Thanks for helping improve Skyplume. This project aims to stay small, readable, and useful as a polished personal blog template.

## Development

```bash
yarn install
yarn dev
```

Open <http://localhost:3000>.

Before opening a pull request, run:

```bash
yarn lint
yarn build
```

## What Makes a Good Contribution

- Keep changes focused and easy to review.
- Follow the existing Next.js App Router, TypeScript, Tailwind CSS, and MDX patterns.
- Prefer accessible semantic HTML and keyboard-friendly interactions.
- Avoid adding heavy dependencies unless they solve a clear template-level problem.
- Do not hardcode secrets, analytics keys, comment credentials, or personal production data.
- Update README or examples when behavior, setup, or customization changes.

## Pull Requests

Use Conventional Commit-style titles where possible:

```text
feat: add reading progress option
fix: correct RSS output path
docs: improve deployment guide
```

For visual changes, include screenshots or a short screen recording. For behavior changes, describe the before and after states and list the commands you ran.

## Issues

Bug reports should include:

- Environment: OS, Node version, Yarn version
- Browser, if the issue is UI-related
- Reproduction steps
- Expected behavior
- Actual behavior

Feature requests should explain the user problem first, not only the proposed implementation.
