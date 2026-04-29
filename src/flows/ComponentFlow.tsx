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
    id: 'clone',
    title: 'Clone repo',
    tag: 'Setup',
    color: 'c-gray',
    body: (
      <>
        <p>
          Pull the component-source repo locally. Once cloned, the{' '}
          <code>/handoff</code> and <code>/preview</code> agents become
          available in your Cursor workspace.
        </p>
        <p>One-time setup per project.</p>
      </>
    )
  },
  {
    id: 'handoff-agent',
    title: 'Run /handoff',
    tag: 'Action',
    color: 'c-purple',
    body: (
      <>
        <p>
          The <code>/handoff</code> agent generates the component for you. It
          creates two files in the same folder:
        </p>
        <ul>
          <li><code>component.dart</code> — the Flutter widget</li>
          <li><code>component.md</code> — the docs (props, usage, a11y)</li>
        </ul>
        <p>
          These two files together are exactly what gets pushed to the repo
          later. Nothing else is generated.
        </p>
      </>
    )
  },
  {
    id: 'preview',
    title: 'Run /preview',
    tag: 'Review',
    color: 'c-teal',
    body: (
      <>
        <p>
          The <code>/preview</code> agent renders the component live in Flutter
          so you can see it running, interact with it, and check edge cases.
        </p>
        <p>
          <strong>Today:</strong> Flutter-only preview. Web preview is on the
          roadmap.
        </p>
        <p>
          Use this to check visuals, interaction, and dark-mode behaviour
          before deciding to ship.
        </p>
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
          <strong>Yes</strong> — edit the <code>.dart</code> or{' '}
          <code>.md</code> files, then re-run <code>/preview</code> to see your
          changes.
        </p>
        <p>
          <strong>No</strong> — push the branch and hand off to dev.
        </p>
      </>
    )
  },
  {
    id: 'edit',
    title: 'Edit code',
    tag: 'Iterate',
    color: 'c-amber',
    body: (
      <>
        <p>
          Tweak <code>.dart</code> for behaviour or visuals,{' '}
          <code>.md</code> for documentation. After changes, re-run{' '}
          <code>/preview</code> to see the result.
        </p>
        <p>
          You don't need to re-run <code>/handoff</code> — that's only for
          the initial creation.
        </p>
        <p><em>Loop back to /preview when you're done editing.</em></p>
      </>
    )
  },
  {
    id: 'push',
    title: 'Push to branch',
    tag: 'Handoff',
    color: 'c-teal',
    body: (
      <>
        <p>
          Commit both files (<code>.dart</code> + <code>.md</code>) and push
          the branch to the repo.
        </p>
        <p>
          The PR is your handoff to dev. Add a Loom or short note if anything
          in the component is non-obvious.
        </p>
      </>
    )
  },
  {
    id: 'live',
    title: 'Dev makes it live',
    tag: 'Ship',
    color: 'c-gray',
    body: (
      <>
        <p>
          A dev reviews the PR, runs the build, and publishes the component to
          the package.
        </p>
        <p>
          After this, anyone on any team can pull the component into their
          project and use it.
        </p>
      </>
    )
  }
]

export default function ComponentFlow() {
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
        <p className="flow-title">Component flow</p>
        <p className="flow-desc">
          Build a component with the <code>/handoff</code> agent, preview it in
          Flutter, iterate, then push for dev to ship.
        </p>
      </div>

      <div className="flow-grid">
        <div className="canvas">
          <svg viewBox="0 0 700 560" role="img" aria-label="Component creation workflow">
            <defs>
              <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>

            {/* Clone repo */}
            <g className={`node c-gray ${sel('clone')}`} {...nodeAttrs('clone')}>
              <rect x="200" y="20" width="280" height="60" rx="8" strokeWidth="1" />
              <text className="th" x="340" y="42" textAnchor="middle" dominantBaseline="central">Clone repo</text>
              <text className="ts" x="340" y="62" textAnchor="middle" dominantBaseline="central">Has the agent commands</text>
            </g>
            <line className="flow-line" x1="340" y1="80" x2="340" y2="104" strokeWidth="1" markerEnd="url(#arr2)" fill="none" />

            {/* Run /handoff */}
            <g className={`node c-purple ${sel('handoff-agent')}`} {...nodeAttrs('handoff-agent')}>
              <rect x="200" y="104" width="280" height="60" rx="8" strokeWidth="1" />
              <text className="th" x="340" y="126" textAnchor="middle" dominantBaseline="central">Run /handoff</text>
              <text className="ts" x="340" y="146" textAnchor="middle" dominantBaseline="central">Creates .dart + .md</text>
            </g>
            <line className="flow-line" x1="340" y1="164" x2="340" y2="188" strokeWidth="1" markerEnd="url(#arr2)" fill="none" />

            {/* Run /preview */}
            <g className={`node c-teal ${sel('preview')}`} {...nodeAttrs('preview')}>
              <rect x="200" y="188" width="280" height="60" rx="8" strokeWidth="1" />
              <text className="th" x="340" y="210" textAnchor="middle" dominantBaseline="central">Run /preview</text>
              <text className="ts" x="340" y="230" textAnchor="middle" dominantBaseline="central">See it in Flutter</text>
            </g>
            <line className="flow-line" x1="340" y1="248" x2="340" y2="272" strokeWidth="1" markerEnd="url(#arr2)" fill="none" />

            {/* Decision diamond */}
            <g className={`node ${sel('decide')}`} {...nodeAttrs('decide')}>
              <polygon className="diamond" points="340,272 430,316 340,360 250,316" strokeWidth="1" />
              <text className="diamond-text" x="340" y="316" textAnchor="middle" dominantBaseline="central">Needs changes?</text>
            </g>

            {/* Yes path → Edit code */}
            <line className="flow-line" x1="250" y1="316" x2="180" y2="316" strokeWidth="1" markerEnd="url(#arr2)" fill="none" />
            <text className="label-yes-no" x="215" y="306" textAnchor="middle">yes</text>

            <g className={`node c-amber ${sel('edit')}`} {...nodeAttrs('edit')}>
              <rect x="40" y="290" width="140" height="52" rx="8" strokeWidth="1" />
              <text className="th" x="110" y="316" textAnchor="middle" dominantBaseline="central">Edit code</text>
            </g>

            {/* Dashed loop back to Run /preview */}
            <path
              className="flow-line"
              d="M 110 290 C 110 218, 170 218, 200 218"
              fill="none"
              strokeWidth="0.8"
              strokeDasharray="5 4"
              markerEnd="url(#arr2)"
            />

            {/* No path → Push */}
            <line className="flow-line" x1="340" y1="360" x2="340" y2="400" strokeWidth="1" markerEnd="url(#arr2)" fill="none" />
            <text className="label-yes-no" x="368" y="380" textAnchor="middle" dominantBaseline="central">no</text>

            {/* Push to branch */}
            <g className={`node c-teal ${sel('push')}`} {...nodeAttrs('push')}>
              <rect x="210" y="400" width="260" height="60" rx="8" strokeWidth="1" />
              <text className="th" x="340" y="422" textAnchor="middle" dominantBaseline="central">Push to branch</text>
              <text className="ts" x="340" y="442" textAnchor="middle" dominantBaseline="central">Commit + share PR</text>
            </g>
            <line className="flow-line" x1="340" y1="460" x2="340" y2="484" strokeWidth="1" markerEnd="url(#arr2)" fill="none" />

            {/* Dev makes it live */}
            <g className={`node c-gray ${sel('live')}`} {...nodeAttrs('live')}>
              <rect x="210" y="484" width="260" height="52" rx="8" strokeWidth="1" />
              <text className="th" x="340" y="510" textAnchor="middle" dominantBaseline="central">Dev makes it live</text>
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
