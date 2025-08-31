## Purpose

Short, actionable guidance for AI coding agents working on this repository (a Vite + React + TypeScript statically deployed portfolio).

## Quick checklist for a new change
- Run the dev server: `npm install` then `npm run dev` (works from `portfolio/`)
- Verify types: `npm run build` will run `tsc -b && vite build` (the `tsc -b` step is a type-check only build)
- Lint: `npm run lint`
- Deploy: `npm run gh-pages` publishes `dist` to GitHub Pages (homepage is set in `package.json`).

## Big-picture architecture
- Single-page React app built with Vite and TypeScript. Entry is `portfolio/src/app/App.tsx` which mounts a `ThemeProvider` and `Layout`.
- Routing uses `HashRouter` with three primary routes: `/`, `/project`, `/opensource` (see `App.tsx`).
- UI layer uses Material UI (MUI v6). Theme is created in `App.tsx` and the app expects a dark mode theme by default.
- Source is organized by feature/component under `src/components/*`. Many components follow the pattern: component file + `data/` and `types/` subfolders (e.g., `Projects`, `Techstack`).

## Important repo-specific conventions
- Imports sometimes include the extension (e.g. `import Layout from "./Layout.tsx"`). `tsconfig.*.json` is configured with `allowImportingTsExtensions` and `moduleResolution: "bundler"`, so preserve explicit extensions when editing similar imports.
- `tsconfig.app.json` and `tsconfig.node.json` are project references. The repository relies on `tsc -b` for a fast type-only check before Vite builds.
- Asset handling: `vite.config.ts` includes `assetsInclude: ["**/*.jpg"]` — JPG assets in `src/assets` are picked up by Vite via this rule.
- Router: The app uses `HashRouter` intentionally (likely for GitHub Pages). Do not switch to `BrowserRouter` unless you also change deployment routing.

## Where to look for common edits
- Change routes or add pages: `portfolio/src/app/App.tsx` and create a component under `src/components/<NewFeature>/`.
- Layout and global CSS: `portfolio/src/app/Layout.tsx` and `portfolio/src/app/App.css`.
- Add icons, images, resume: `portfolio/src/assets/`.
- Add project data or types: `src/components/Projects/data/` and `src/components/Projects/types/`.

## Build & validation contract for edits
- Input: changed TSX/TS files, assets, or package.json scripts.
- Output: dev server runs, `npm run build` completes without type errors, and lint passes.
- Error modes: Type errors from `tsc -b`, missing imports due to file-extension changes, or route 404s on GH Pages if switching to BrowserRouter.

## Examples and gotchas (explicit)
- When adding a new page, update `App.tsx` routes and export a default component. Use `HashRouter` path like `"/myfeature"`.
- If you add `.jpg` assets and they don't bundle, confirm `vite.config.ts` has `assetsInclude` for that pattern.
- The `build` script runs `tsc -b` even though `noEmit: true` in `tsconfig.app.json` — this is intentional: it performs type checking only before Vite builds.
- TypeScript is strict (see `tsconfig.app.json`): expect `strict` errors; fix types rather than disabling rules.

## Tests & linting
- There are no unit tests in the repo. The repo exposes `npm run lint`. Prefer small, isolated TypeScript checks via the existing `tsc -b` before larger changes.

## Integration points & external deps
- MUI: `@mui/material`, `@mui/icons-material`, `@mui/lab` — UI changes should follow MUI v6 patterns.
- Deployment: `gh-pages` package and `homepage` in `package.json` — changes to base path or router must consider GitHub Pages serving.

## Files to reference when editing or for examples
- `portfolio/package.json` (scripts & deps)
- `portfolio/vite.config.ts` (assetsInclude)
- `portfolio/tsconfig.app.json` and `portfolio/tsconfig.node.json` (compiler behavior)
- `portfolio/src/app/App.tsx` (routing + theme)
- `portfolio/src/components/*` (component layout patterns and data/ types subfolders)

## Code structure (source layout)
- Root app entry: `portfolio/src/app/App.tsx` and `portfolio/src/app/Layout.tsx`.
- Feature folders live under `portfolio/src/components/` — each feature commonly includes one main component and optional `data/` and `types/` subfolders. Example: `Projects/` contains `Project.tsx`, `ProjectCard.tsx`, `data/ProjectsData.ts`, and `types/ProjectInfo.ts`.
- Shared assets and static files are under `portfolio/src/assets/` (images, `resume.pdf`, `favicon.svg`). Vite handles JPGs via `assetsInclude` in `vite.config.ts`.
- Keep UI logic inside the component folder. Small presentational pieces and cards can be co-located with their data and types for discoverability.

## Mobile-first / responsiveness (required)
- Always treat changes as mobile-first. Most components use MUI's responsive `sx` props and breakpoint helpers (see `OpenSource.tsx` which uses `{ xs: 1, md: 2 }` for padding and `minHeight: "93vh"`). Follow the same pattern when adding layout/styling.
- When adding or modifying components:
	- Use MUI `Box`, `Grid`, or `Stack` with `sx` and breakpoint objects instead of fixed pixel values where possible.
	- Prefer percentage, flex, or responsive MUI props for spacing and sizing. Example pattern: `paddingLeft: { xs: 1, md: 2 }` or `display: { xs: 'block', md: 'flex' }`.
	- Test on small viewports using the browser device toolbar or by resizing the window. Run the dev server locally to verify:

```powershell
cd portfolio; npm install; npm run dev
```

	- Verify text wrapping and interactive elements (buttons/links) remain reachable on narrow screens.
- If a component requires a desktop-only layout, gate it behind breakpoint checks and ensure the mobile fallback remains functional.

## When to ask for clarification
- Ask if you need to change routing (Hash vs Browser) or deployment target.
- Ask if a new global style or MUI theme change must remain backward compatible with existing components.

---
If anything here is unclear or you want extra examples (e.g., a sample new route + component scaffold), tell me which part to expand and I'll iterate.
