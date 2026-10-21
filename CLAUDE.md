# Design2Code SOP site

A static React + Vite + TypeScript site that walks ACKO designers/devs through the Design-to-Code workflow. Three tabs in `src/App.tsx`, one file each in `src/flows/`:

- `CursorSetupFlow.tsx` — Cursor setup (install, ACKO rule, skill files, what happens on "ACKO" prompts)
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

- The site's "download skill files" link (`SKILL_ZIP_URL` in `CursorSetupFlow.tsx`) serves the GitHub zip of `ramnan10118/Designskillfiles_Acko`. That repo is the local folder `~/.cursor/skills/acko-design-system/` — commit and push there when skill files change.
- `Skill files - Acko.zip` in this repo is a bundled copy. Rebuild it from that folder (all `*.md` + `acko-motion-system/`, no `.DS_Store`/`__MACOSX`/nested zips).

## The ACKO rule

`ACKO_RULE` in `CursorSetupFlow.tsx` is the rule users paste into Cursor (or ask Claude Code to save as a global rule). Keep it in sync with the ACKO section of `~/.claude/CLAUDE.md`. Conventions:

- Never hardcode a personal path (`/Users/<name>/...`) — use `~/.cursor/skills/...`.
- Step 3a points at `SKILL.md` and "every file it links to" rather than listing files, so it survives skill file changes. Don't reintroduce a file list.
- Don't hardcode counts (number of components, number of skill files) in user-facing copy.

## Setup-page copy decisions

- Skill files are installed by dragging them into a Cursor chat with the `SKILL_SAVE_PROMPT` prompt, not by copying into a folder manually (the manual path didn't work for users). The prompt names the skill `acko-design-system` but intentionally doesn't spell out the folder path.
- For Claude Code users, step 2 says to paste the rule into a Claude Code chat and ask it to save it as a global rule — not to edit `~/.claude/CLAUDE.md` by hand.
