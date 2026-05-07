import { useState, type ReactNode, type KeyboardEvent } from 'react'

type Step = {
  id: string
  title: string
  tag: string
  color: 'c-gray' | 'c-purple' | 'c-teal' | 'c-amber' | 'c-blue' | 'c-coral'
  body: ReactNode
}

const STEPS: Step[] = [
  {
    id: 'prompt',
    title: 'Prompt Cursor',
    tag: 'Action',
    color: 'c-purple',
    body: (
      <>
        <p>
          Open Cursor and describe the page in plain language. The keyword{' '}
          <code>ACKO</code> in your prompt fires the setup rule.
        </p>
        <p><strong>Example prompts:</strong></p>
        <ul>
          <li>"Build an ACKO claims status page"</li>
          <li>"Make a renewal form using ACKO components"</li>
          <li>"ACKO landing page with hero, three feature cards, CTA"</li>
        </ul>
        <p>
          Be specific about layout — Cursor follows your description's structure
          closely. Vague prompts → generic pages.
        </p>
      </>
    )
  },
  {
    id: 'generate',
    title: 'Generate page',
    tag: 'Action',
    color: 'c-purple',
    body: (
      <>
        <p>
          Cursor reads the ACKO rule, scaffolds the workspace if needed, then
          writes the page using <code>@acko/*</code> packages and design tokens.
        </p>
        <p><strong>Behind the scenes (nothing for you to do — Cursor handles it):</strong></p>
        <ul>
          <li>Checks <code>package.json</code> for <code>@acko/*</code> deps</li>
          <li>Checks <code>.npmrc</code> for the ACKO Nexus registry</li>
          <li>Clones the source repo and runs <code>npm install</code> if either is missing</li>
          <li>All components become available</li>
        </ul>
        <p>Typical generation time: 30s–2min.</p>
      </>
    )
  },
  {
    id: 'review',
    title: 'Review in browser',
    tag: 'Review',
    color: 'c-teal',
    body: (
      <>
        <p>
          Cursor starts the dev server and prints a localhost URL. Open it to see
          the page running with real ACKO components.
        </p>
        <p><strong>Quick checklist:</strong></p>
        <ul>
          <li>Layout matches what you prompted</li>
          <li>Type hierarchy is clear and readable</li>
          <li>Spacing feels balanced — not cramped, not loose</li>
          <li>Resize the window — does it hold up?</li>
          <li>Dark mode auto-adapts via tokens</li>
        </ul>
      </>
    )
  },
  {
    id: 'decide',
    title: 'Needs changes?',
    tag: 'Decision',
    color: 'c-gray',
    body: (
      <>
        <p>
          <strong>Refine in Figma if</strong> you need to move things around,
          rework a layout pattern, change a palette, or make a visual call the
          prompt didn't capture.
        </p>
        <p>
          <strong>Hand off if</strong> the page reads well and any remaining tweaks
          are copy or trivial styling — those are quicker for dev to do directly.
        </p>
      </>
    )
  },
  {
    id: 'refine',
    title: 'Refine in Figma',
    tag: 'Handoff',
    color: 'c-amber',
    body: (
      <>
        <p>
          Push the page from code into Figma via the MCP plugin. Edit there with
          full design controls — move, recolour, restructure.
        </p>
        <p>
          When you're done, prompt Cursor again. It pulls your Figma changes back
          into code via the same MCP bridge.
        </p>
        <p>
          <strong>Why this stays in sync:</strong> tokens share names across Figma
          and code. A token rename in Figma maps cleanly to the code side; nothing
          breaks silently.
        </p>
        <p><em>Loop back to step 1 when you re-prompt.</em></p>
      </>
    )
  },
  {
    id: 'design-review',
    title: 'Review with Design',
    tag: 'Review',
    color: 'c-blue',
    body: (
      <>
        <p>
          Before code goes to dev, loop in design for a final visual pass. Design
          plays a consultant role here — not rebuilding, just sanity-checking what
          Cursor produced.
        </p>
        <p><strong>What design checks:</strong></p>
        <ul>
          <li>Visual harmony — type scale, spacing rhythm, alignment across sections</li>
          <li>Icon integrity — no broken glyphs, missing assets, or wrong sizes</li>
          <li>Component usage — right component for the job, correct variants and states</li>
          <li>Edge cases — empty, loading, error, long strings, small viewports</li>
          <li>Token discipline — colors, radii, shadows pulled from tokens, not hardcoded</li>
        </ul>
        <p>
          If design flags issues, loop back to refine. If it's clean, move to handoff.
        </p>
      </>
    )
  },
  {
    id: 'handoff',
    title: 'Hand off to dev',
    tag: 'Handoff',
    color: 'c-teal',
    body: (
      <>
        <p>Create a branch, push, share the URL with your dev partner.</p>
        <p><strong>Include in the handoff:</strong></p>
        <ul>
          <li>Branch link (e.g. <code>feat/claims-status-v1</code>)</li>
          <li>Loom or short notes if anything is non-obvious</li>
        </ul>
        <p>Dev reviews, merges, ships.</p>
      </>
    )
  }
]

export default function PageGenerationFlow() {
  const [activeId, setActiveId] = useState<string>(STEPS[0].id)
  const step = STEPS.find((s) => s.id === activeId) ?? STEPS[0]

  const select = (id: string) => () => setActiveId(id)
  const onKey = (id: string) => (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActiveId(id)
    }
  }
  const sel = (id: string) => (activeId === id ? 'selected' : '')
  const nodeAttrs = (id: string) => ({
    onClick: select(id),
    onKeyDown: onKey(id),
    tabIndex: 0,
    role: 'button' as const,
    'aria-pressed': activeId === id
  })

  return (
    <>
      <div className="flow-header">
        <p className="flow-title">Page generation</p>
        <p className="flow-desc">
          Click any step in the diagram to see what's happening at that point.
        </p>
      </div>

      <div className="flow-grid">
        <div className="canvas">
          <svg viewBox="0 0 700 580" role="img" aria-label="Page generation workflow">
            <defs>
              <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>

            {/* Prompt Cursor */}
            <g className={`node c-purple ${sel('prompt')}`} {...nodeAttrs('prompt')}>
              <rect x="200" y="20" width="280" height="60" rx="8" strokeWidth="1" />
              <text className="th" x="340" y="42" textAnchor="middle" dominantBaseline="central">Prompt Cursor</text>
              <text className="ts" x="340" y="62" textAnchor="middle" dominantBaseline="central">Mention "ACKO" to load components</text>
            </g>
            <line className="flow-line" x1="340" y1="80" x2="340" y2="104" strokeWidth="1" markerEnd="url(#arr)" fill="none" />

            {/* Generate page */}
            <g className={`node c-purple ${sel('generate')}`} {...nodeAttrs('generate')}>
              <rect x="240" y="104" width="200" height="48" rx="8" strokeWidth="1" />
              <text className="th" x="340" y="128" textAnchor="middle" dominantBaseline="central">Generate page</text>
            </g>
            <line className="flow-line" x1="340" y1="152" x2="340" y2="176" strokeWidth="1" markerEnd="url(#arr)" fill="none" />

            {/* Review in browser */}
            <g className={`node c-teal ${sel('review')}`} {...nodeAttrs('review')}>
              <rect x="240" y="176" width="200" height="48" rx="8" strokeWidth="1" />
              <text className="th" x="340" y="200" textAnchor="middle" dominantBaseline="central">Review in browser</text>
            </g>
            <line className="flow-line" x1="340" y1="224" x2="340" y2="240" strokeWidth="1" markerEnd="url(#arr)" fill="none" />

            {/* Decision diamond — bigger */}
            <g className={`node ${sel('decide')}`} {...nodeAttrs('decide')}>
              <polygon className="diamond" points="340,240 430,285 340,330 250,285" strokeWidth="1" />
              <text className="diamond-text" x="340" y="285" textAnchor="middle" dominantBaseline="central">Needs changes?</text>
            </g>

            {/* Yes path → Refine in Figma */}
            <line className="flow-line" x1="250" y1="285" x2="180" y2="285" strokeWidth="1" markerEnd="url(#arr)" fill="none" />
            <text className="label-yes-no" x="215" y="275" textAnchor="middle">yes</text>

            <g className={`node c-amber ${sel('refine')}`} {...nodeAttrs('refine')}>
              <rect x="40" y="259" width="140" height="52" rx="8" strokeWidth="1" />
              <text className="th" x="110" y="285" textAnchor="middle" dominantBaseline="central">Refine in Figma</text>
            </g>

            {/* Dashed loop back to Prompt Cursor */}
            <path
              className="flow-line"
              d="M 110 259 C 110 128, 170 128, 240 128"
              fill="none"
              strokeWidth="0.8"
              strokeDasharray="5 4"
              markerEnd="url(#arr)"
            />

            {/* No path → Review with Design */}
            <line className="flow-line" x1="340" y1="330" x2="340" y2="370" strokeWidth="1" markerEnd="url(#arr)" fill="none" />
            <text className="label-yes-no" x="368" y="352" textAnchor="middle">no</text>

            {/* Review with Design */}
            <g className={`node c-blue ${sel('design-review')}`} {...nodeAttrs('design-review')}>
              <rect x="220" y="370" width="240" height="52" rx="8" strokeWidth="1" />
              <text className="th" x="340" y="396" textAnchor="middle" dominantBaseline="central">Review with Design</text>
            </g>

            {/* Design review → Hand off */}
            <line className="flow-line" x1="340" y1="422" x2="340" y2="462" strokeWidth="1" markerEnd="url(#arr)" fill="none" />

            {/* Hand off to dev */}
            <g className={`node c-teal ${sel('handoff')}`} {...nodeAttrs('handoff')}>
              <rect x="210" y="462" width="260" height="60" rx="8" strokeWidth="1" />
              <text className="th" x="340" y="484" textAnchor="middle" dominantBaseline="central">Hand off to dev</text>
              <text className="ts" x="340" y="504" textAnchor="middle" dominantBaseline="central">Branch + link</text>
            </g>
          </svg>
        </div>

        <aside className="detail-panel" aria-live="polite">
          <div className="step-detail" key={step.id}>
            <span className={`step-tag ${step.color}`}>{step.tag}</span>
            <h3 className="step-title">{step.title}</h3>
            <div className="step-body">{step.body}</div>
          </div>
        </aside>
      </div>
    </>
  )
}
