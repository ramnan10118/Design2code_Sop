# Design2Code SOP site

A static React + Vite + TypeScript site that walks ACKO designers/devs through the Design-to-Code workflow. Three tabs in `src/App.tsx`, one file each in `src/flows/`:

- `ClaudeSetupFlow.tsx` — Claude setup (Claude Code access, ACKO rule in CLAUDE.md, skill install, what happens on "ACKO" prompts)
- `PageGenerationFlow.tsx` — page generation flow
- `ComponentFlow.tsx` — component flow

Shared UI: `src/components/CodeBlock.tsx` (copy + optional download). Styles: `src/styles.css`.

## Build & deploy

- `npm ci` then `npm run build` (`tsc -b && vite build`). Run the build before every push.
- Every push to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
- Live URL: https://ramnan10118.github.io/Design2code_Sop/ (`base: '/Design2code_Sop/'` in `vite.config.ts` — keep it).

## Pushing

The active `gh` account (`ramnanarumugam-10118`) gets a 403 on this repo. Push as the repo owner `ramnan10118` without switching the active account:

```bash
git -c credential.helper= -c 'credential.helper=!f(){ echo username=ramnan10118; echo password=$(gh auth token --user ramnan10118); }; f' push origin main
```

Same for `gh` commands: prefix with `GH_TOKEN=$(gh auth token --user ramnan10118)`.

## Skill files — two places to keep in sync

- `SKILL_ZIP_URL` in `ClaudeSetupFlow.tsx` (used by the install prompt and the download link) serves the GitHub zip of `ramnan10118/Designskillfiles_Acko`. That repo is the local folder `~/.claude/skills/acko-design-system/` — commit and push there when skill files change. (`~/.cursor/skills/acko-design-system/` is an older clone; don't edit it.)
- `Skill files - Acko.zip` in this repo is a bundled copy. Rebuild it from that folder (all `*.md` + `acko-motion-system/`, no `.DS_Store`/`__MACOSX`/nested zips).

## The ACKO rule

`ACKO_RULE` in `ClaudeSetupFlow.tsx` is the rule users ask Claude Code to save into `~/.claude/CLAUDE.md`. Keep it in sync with the ACKO section of `~/.claude/CLAUDE.md`. Conventions:

- Never hardcode a personal path (`/Users/<name>/...`) — use `~/.claude/skills/...`.
- Step 3a points at `SKILL.md` and "every file it links to" rather than listing files, so it survives skill file changes. Don't reintroduce a file list.
- Don't hardcode counts (number of components, number of skill files) in user-facing copy.

## Setup-page copy decisions

- The page targets Claude Code only — no Cursor references.
- No personal name in page copy. The GitHub URLs still contain the `ramnan10118` username; the user chose to keep them working rather than move the repos.
- Step 2: users paste `RULE_SAVE_PROMPT` plus the rule into Claude Code and let it save to `~/.claude/CLAUDE.md` — not edit the file by hand.
- Step 3: users paste `SKILL_INSTALL_PROMPT` into Claude Code, which downloads the zip and installs it to `~/.claude/skills/acko-design-system` (the path Step 3a of the rule reads). Not a manual copy.
- Keep the "ACKO Dev VPN required" callout as is.
