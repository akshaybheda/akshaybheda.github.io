# Agents guide

Purpose
- Short, authoritative rules and checklist for automated coding agents working in this repository.

Scope
- This file is for agents (automated assistants) to understand allowed actions, repo conventions, and verification steps. It complements `.github/copilot-instructions.md` and focuses on operational rules.

Allowed actions
- Make small, focused edits to TypeScript/TSX files under `portfolio/src/`.
- Add new components/pages under `portfolio/src/components/<Name>/` with a default export.
- Update `package.json` scripts only when necessary and explain why in the commit message.
- Run local dev/build/lint commands to validate changes.

Forbidden actions
- Do not change router type (HashRouter -> BrowserRouter) without explicit approval.
- Do not alter `homepage` or GH Pages deployment settings unless requested.
- Don't introduce new runtime secrets or exfiltrate repository secrets.

Project-specific rules
- Preserve explicit file extensions in imports (e.g., `./Layout.tsx`) because `tsconfig.*.json` uses `allowImportingTsExtensions` and `moduleResolution: "bundler"`.
- Always assume TypeScript is strict: fix types rather than disabling rules.
- Assets: JPGs are included via `vite.config.ts` (`assetsInclude: ["**/*.jpg"]`). Place images in `portfolio/src/assets/`.
- UI: Use MUI v6 patterns. Prefer `Box`, `Grid`, `Stack` and `sx` with breakpoint objects for responsive design.

Validation / verification
- Run these locally before marking work done (from `portfolio/`):

```powershell
npm install
npm run dev      # manual smoke test in browser
npm run build    # runs `tsc -b && vite build` for type-check + build
npm run lint     # eslint
```

- Quick checks:
  - `npm run build` must finish without `tsc` errors.
  - Lint should not introduce new errors.
  - New UI must work at narrow widths (use browser device toolbar).

Commit & PR guidance
- Use short, descriptive commit messages. If a change affects routing, assets, or build scripts, call it out in the PR description and link to relevant files.
- Prefer many small PRs over one large change. Each PR should include the validation checklist results.

When to escalate
- If a change requires switching router type, base path, or deployment strategy, request human approval and explain trade-offs.
- If TypeScript strictness forces a large refactor, propose a minimal incremental plan instead of wide-sweeping changes.

Contact
- If unclear, update the PR description with your assumptions and request a human reviewer.

---
Keep this file short; mirror any updates into `.github/copilot-instructions.md` when repository conventions change.
