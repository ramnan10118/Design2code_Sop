import { useState } from 'react'
import PageGenerationFlow from './flows/PageGenerationFlow'
import ComponentFlow from './flows/ComponentFlow'

const TABS = [
  { id: 'page', label: 'Page generation' },
  { id: 'component', label: 'Component flow' }
] as const

export default function App() {
  const [active, setActive] = useState<(typeof TABS)[number]['id']>('page')

  return (
    <div className="app">
      <div className="eyebrow">Standard Operating Procedure</div>
      <h1>Design to code</h1>
      <p className="subtitle">
        How a designer ships from prompt to dev handoff at ACKO.
      </p>

      <div className="tab-bar" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            className={`tab ${active === tab.id ? 'active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`panel ${active === 'page' ? 'active' : ''}`} role="tabpanel">
        <PageGenerationFlow />
      </div>
      <div className={`panel ${active === 'component' ? 'active' : ''}`} role="tabpanel">
        <ComponentFlow />
      </div>

      <div className="footer">Internal — ACKO Design Systems</div>
    </div>
  )
}
