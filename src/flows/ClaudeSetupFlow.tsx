import CodeBlock from '../components/CodeBlock'

const SLACK_URL = 'https://acko.slack.com/' // TODO(slack-url): replace with the #design-systems channel deep-link
const ACKO_IT_PORTAL_URL = 'https://directory.zoho.in/directory/ackotechnology/home#/myapps'
const CLAUDE_CODE_URL = 'https://claude.com/claude-code'

// GitHub serves any branch or tag as a downloadable zip:
//   Latest from main:   .../archive/refs/heads/main.zip
//   Pinned version tag: .../archive/refs/tags/v1.0.0.zip
// To pin a version, push a tag on the skill repo and swap the URL below.
const SKILL_ZIP_URL = 'https://github.com/ramnan10118/Designskillfiles_Acko/archive/refs/heads/main.zip'

const SKILL_INSTALL_PROMPT = `Install the ACKO design skill files as a personal Claude Code skill, so they're available in every project.

1. Download ${SKILL_ZIP_URL} and unzip it.
2. Put the unzipped files in ~/.claude/skills/acko-design-system, replacing that folder if it already exists. SKILL.md must sit directly inside it. Keep the acko-motion-system folder and its references subfolder as they are.
3. Delete the zip and any temporary files.
4. List every file you installed, with its full path.`

const RULE_SAVE_PROMPT = `Save the ACKO rule below as a global rule in my ~/.claude/CLAUDE.md, so it applies in every project. If an ACKO section is already there, replace it with this one.`

const ACKO_RULE = `# ACKO Design System Auto-Setup

## When to Trigger

Activate this rule whenever the user:
- Mentions "ACKO components", "ACKO design system", or "@acko"
- Asks to build a UI or page (in the context of an Acko/insurance project)
- Mentions specific component names: Button, Card, Badge, Typography, etc.
- Says "set up ACKO", "install ACKO", "update ACKO"

---

## Step 1 — Detect Existing Setup

Before doing anything, check if the project already has ACKO set up:

1. Look for \`package.json\` in the project root
2. Check if it contains any \`@acko/*\` dependencies
3. Check if \`.npmrc\` exists with the Acko registry line

**If both exist → skip to Step 3 (use existing setup)**
**If missing → proceed to Step 2 (fresh setup)**

---

## Step 2 — Fresh Setup (Files Not Present)

Run the following steps automatically without asking the user:

\`\`\`bash
# 1. Clone the boilerplate (only the files, not as a nested git repo)
git clone --depth=1 https://github.com/ramnan10118/ACKO-component-source.git .acko-tmp

# 2. Copy required files into the current project
cp .acko-tmp/package.json ./package.json
cp .acko-tmp/.npmrc ./.npmrc
cp .acko-tmp/vite.config.ts ./vite.config.ts
cp .acko-tmp/tsconfig.json ./tsconfig.json
cp .acko-tmp/tsconfig.app.json ./tsconfig.app.json
cp .acko-tmp/tsconfig.node.json ./tsconfig.node.json
cp .acko-tmp/index.html ./index.html
cp -r .acko-tmp/src ./src
cp -r .acko-tmp/public ./public

# 3. Clean up temp folder
rm -rf .acko-tmp

# 4. Install packages from Nexus registry
npm install
\`\`\`

After install, inform the user:
> "ACKO design system is set up and ready. All ACKO components are available."

---

## Step 3 — Use Existing Setup

If setup already exists, proceed directly with the user's request using the available ACKO components. Do not re-clone or re-install unless the user asks.

---

## Step 3a — Read All Skill Files Before Starting Work

**Before writing any UI code**, read \`~/.claude/skills/acko-design-system/SKILL.md\` and every file it links to (primitives, semantics, components, scales, radii, shadows, typography, iconography, layout, responsiveness, cards, forms, accessibility, performance, polish). For any animation or transition work, also read \`~/.claude/skills/acko-design-system/acko-motion-system/SKILL.md\` and its references.

Do not skip files. \`SKILL.md\` is the orchestrator and lists the layer model (\`primitives\` → \`semantics\` → \`components\`, plus scales / radii / shadows / typography) — reading only \`SKILL.md\` is not enough.
All rules in those files (tokens, colour roles, motion, forms, cards, layout, accessibility, performance, polish) apply to every UI task.

---

## Step 4 — Handling Version Updates

### Check for updates
When user says "check for ACKO updates" or "are there new ACKO versions":

\`\`\`bash
# Fetch latest package.json from GitHub without cloning
curl -s https://raw.githubusercontent.com/ramnan10118/ACKO-component-source/main/package.json -o .acko-latest.json
\`\`\`

Compare versions of all \`@acko/*\` packages between the local \`package.json\` and \`.acko-latest.json\`.
Report any differences to the user. Then delete \`.acko-latest.json\`.

### Update to latest
When user says "update ACKO packages" or "upgrade ACKO to latest":

1. Pull the latest \`package.json\` from GitHub:
\`\`\`bash
curl -s https://raw.githubusercontent.com/ramnan10118/ACKO-component-source/main/package.json -o package.json
\`\`\`
2. Run \`npm install\` to fetch new package versions from Nexus registry
3. Confirm to user which packages were updated

### Update to a specific version
When user says "update ACKO to version X.X.X":

1. Update all \`@acko/*\` entries in \`package.json\` to the specified version
2. Run \`npm install\`
3. Confirm success

### Reinstall packages
When user says "reinstall ACKO" or "npm install":

\`\`\`bash
npm install
\`\`\`
This fetches the versions declared in \`package.json\` from the Nexus registry.

---

## Registry Configuration

The \`.npmrc\` file must always contain:
\`\`\`
@acko:registry=http://nexus-dev.acko.in:8080/repository/quark-skill/
\`\`\`

Without this, \`npm install\` will fail to find \`@acko/*\` packages.
If \`.npmrc\` is missing or incorrect, restore it before running \`npm install\`.

---

## Available ACKO Components

The project's \`package.json\` (copied from the boilerplate) is the source of truth. Only import \`@acko/*\` packages listed there — if a package isn't in \`package.json\`, it isn't available, so don't import it or invent a replacement package.

| Package | Exports |
|---|---|
| \`@acko/accordion\` | Accordion |
| \`@acko/alert\` | Alert |
| \`@acko/avatar\` | Avatar |
| \`@acko/badge\` | Badge, CounterBadge |
| \`@acko/breadcrumb\` | Breadcrumb |
| \`@acko/button\` | Button |
| \`@acko/calendar\` | Calendar |
| \`@acko/card\` | Card, CardMedia, CardBody, CardIllustration, CardBadge, CardTitle, CardNote, CardAction |
| \`@acko/checkbox\` | Checkbox |
| \`@acko/chip\` | Chip |
| \`@acko/css\` | Component CSS |
| \`@acko/dialog\` | Dialog |
| \`@acko/drawer\` | Drawer |
| \`@acko/dropdown\` | Dropdown |
| \`@acko/form\` | Form, FormItem, FormLabel, FormMessage, useFormContext |
| \`@acko/icons\` | Named icon components — the only icon source |
| \`@acko/input-group\` | InputGroup |
| \`@acko/label\` | Label |
| \`@acko/otp-input\` | OtpInput |
| \`@acko/progress\` | Progress |
| \`@acko/radio\` | RadioGroup |
| \`@acko/scroll-area\` | ScrollArea |
| \`@acko/separator\` | Separator |
| \`@acko/skeleton\` | Skeleton |
| \`@acko/slider\` | Slider |
| \`@acko/surface\` | Surface |
| \`@acko/switch\` | Switch |
| \`@acko/text-input\` | TextInput |
| \`@acko/textarea\` | Textarea |
| \`@acko/toggle\` | Toggle |
| \`@acko/tokens\` | Design tokens |
| \`@acko/typography\` | Typography (takes \`textStyle\`, e.g. \`textStyle="body-md-regular"\`) |

---

## Import Convention

Always import from the specific package:

\`\`\`tsx
import { Button } from "@acko/button";
import { Typography } from "@acko/typography";
import { Card, CardBody, CardTitle, CardAction } from "@acko/card";
import { Surface } from "@acko/surface";
import { TextInput } from "@acko/text-input";
import { ArrowRight } from "@acko/icons";
\`\`\`

- \`Card\` parts are \`CardMedia\`, \`CardBody\`, \`CardTitle\`, \`CardAction\` and friends. There is no \`CardHeader\` / \`CardContent\` / \`CardFooter\` (see \`cards.md\`).
- \`Typography\` takes \`textStyle\` (weight is part of the name, e.g. \`body-md-semibold\`). It has no \`variant\` or \`weight\` prop.
- Icons come only from \`@acko/icons\` — no other icon library, no inline \`<svg>\`.
- Never use a barrel import like \`import { Button } from "@acko/ui"\` — that package does not exist.
- If the skill files and the scaffold \`src/\` disagree, follow the skill files.
`

const FILE_TREE = `your-project/
├── .npmrc                  ← Nexus registry pointer
├── package.json            ← @acko/* deps
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── index.html
├── public/
├── src/                    ← scaffold from ACKO-component-source
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
└── node_modules/
    └── @acko/              ← all component packages, fetched via VPN
        ├── button/
        ├── card/
        ├── typography/
        └── ...`

export default function ClaudeSetupFlow() {
  return (
    <div className="setup-doc">
      <div className="flow-header">
        <p className="flow-title">Claude setup</p>
        <p className="flow-desc">
          A one-time setup so Claude Code can generate ACKO pages on demand. Five
          minutes if you have the VPN running. Start here before either of the
          other tabs.
        </p>
      </div>

      <div className="callout callout-warning" role="note">
        <span className="callout-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 9v4"/>
            <path d="M12 17h.01"/>
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          </svg>
        </span>
        <div className="callout-body">
          <p className="callout-title">ACKO Dev VPN required</p>
          <p>
            You must be on the ACKO Dev VPN before running any setup step.
            The Nexus registry that hosts <code>@acko/*</code> packages is
            internal — without VPN, <code>npm install</code> will hang or fail.
          </p>
        </div>
      </div>

      <section className="setup-step">
        <div className="setup-step-head">
          <span className="setup-step-num">1</span>
          <h3 className="setup-step-title">Get Claude Code + enterprise access</h3>
        </div>
        <div className="setup-step-body">
          <p>
            Claude Code is the AI coding tool we use for prompt-driven page
            generation. You can run it in the terminal, the desktop app or
            VS Code. ACKO has an enterprise plan — don't sign up with a
            personal account, or you'll lose org features and pooled usage.
          </p>
          <p>
            Raise a request through the{' '}
            <a className="ext-link" href={ACKO_IT_PORTAL_URL} target="_blank" rel="noopener noreferrer">
              ACKO IT Services portal
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 11L11 5"/><path d="M6.5 5H11v4.5"/>
              </svg>
            </a>{' '}
            to get enterprise access provisioned to your work email. Once
            approved, you'll be able to log in with SSO.
          </p>
          <p>
            Then install Claude Code by following the steps on{' '}
            <a className="ext-link" href={CLAUDE_CODE_URL} target="_blank" rel="noopener noreferrer">
              claude.com/claude-code
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 11L11 5"/><path d="M6.5 5H11v4.5"/>
              </svg>
            </a>{' '}
            (Mac and Windows), and sign in with your work account once IT
            confirms access.
          </p>
        </div>
      </section>

      <section className="setup-step">
        <div className="setup-step-head">
          <span className="setup-step-num">2</span>
          <h3 className="setup-step-title">Add the ACKO rule to CLAUDE.md</h3>
        </div>
        <div className="setup-step-body">
          <p>
            Claude Code reads <code>~/.claude/CLAUDE.md</code> at the start of
            every session — it's where your global instructions live. The ACKO
            rule below teaches Claude when to fire, what to clone and which
            packages to import.
          </p>
          <p>
            Open Claude Code, paste this prompt, then paste the rule underneath
            it and send. Let Claude save it — don't edit the file by hand.
          </p>
          <CodeBlock filename="prompt">
            {RULE_SAVE_PROMPT}
          </CodeBlock>
          <CodeBlock filename="acko-rule.md" downloadAs="acko-rule.md">
            {ACKO_RULE}
          </CodeBlock>
        </div>
      </section>

      <section className="setup-step">
        <div className="setup-step-head">
          <span className="setup-step-num">3</span>
          <h3 className="setup-step-title">Install ACKO's design skill files</h3>
        </div>
        <div className="setup-step-body">
          <p>
            These are simple markdown files that teach Claude how ACKO things
            should look — what good type looks like, how motion should feel,
            what makes a form usable. Without them, generated pages will work
            but won't feel like ACKO.
          </p>

          <p>
            Claude Code loads skills from <code>~/.claude/skills</code>. Paste
            this prompt into Claude Code and send it — Claude downloads the
            skill files and installs them for every project:
          </p>
          <CodeBlock filename="prompt">
            {SKILL_INSTALL_PROMPT}
          </CodeBlock>
          <p>
            Once Claude lists the files, start a new Claude Code session so it
            picks up the skill. Re-run the prompt whenever the skill files are
            updated. Want to read them first?{' '}
            <a className="ext-link" href={SKILL_ZIP_URL}>
              Download the skill files
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 11L11 5"/><path d="M6.5 5H11v4.5"/>
              </svg>
            </a>
            .
          </p>
        </div>
      </section>

      <section className="setup-step">
        <div className="setup-step-head">
          <span className="setup-step-num">4</span>
          <h3 className="setup-step-title">Prompt with "ACKO" — what happens next</h3>
        </div>
        <div className="setup-step-body">
          <p>
            Once the rule is in place, mentioning <code>ACKO</code> in a prompt
            triggers the setup flow automatically. You don't run any of these
            steps yourself — Claude does:
          </p>
          <ol className="setup-list">
            <li>Checks <code>package.json</code> for any <code>@acko/*</code> dependency.</li>
            <li>Checks <code>.npmrc</code> for the ACKO Nexus registry line.</li>
            <li>If either is missing, clones <code>ACKO-component-source</code> into a temp folder.</li>
            <li>Copies the scaffold files (<code>package.json</code>, <code>.npmrc</code>, <code>vite.config.ts</code>, <code>tsconfig*</code>, <code>index.html</code>, <code>src/</code>, <code>public/</code>) into your project root.</li>
            <li>Runs <code>npm install</code> against the Nexus registry — this is the step that needs VPN.</li>
            <li>Reads the skill files before writing any component code, so the output matches ACKO's visual standards.</li>
          </ol>
          <p>
            First-time runs take ~30s–2min depending on your network. Subsequent
            ACKO prompts skip cloning and go straight to generation.
          </p>
        </div>
      </section>

      <section className="setup-step">
        <div className="setup-step-head">
          <span className="setup-step-num">5</span>
          <h3 className="setup-step-title">Your project, after the first ACKO prompt</h3>
        </div>
        <div className="setup-step-body">
          <p>
            This is what your repo looks like once Claude finishes the
            scaffold + install. Nothing here is hidden state — it's all in
            your working tree, ready to commit.
          </p>
          <pre className="file-tree">{FILE_TREE}</pre>
        </div>
      </section>

      <section className="setup-step">
        <div className="setup-step-head">
          <h3 className="setup-step-title">Need help?</h3>
        </div>
        <div className="setup-step-body">
          <p>
            For VPN issues, broken installs, or anything that doesn't behave the
            way you expect, ping{' '}
            <a className="ext-link" href={SLACK_URL} target="_blank" rel="noopener noreferrer">
              #design-systems on Slack
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 11L11 5"/><path d="M6.5 5H11v4.5"/>
              </svg>
            </a>
            . Someone on the design systems team is usually around.
          </p>
        </div>
      </section>
    </div>
  )
}
