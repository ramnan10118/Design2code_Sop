import { useState } from 'react'

type Props = {
  filename?: string
  language?: string
  children: string
  downloadAs?: string
}

export default function CodeBlock({ filename, language, children, downloadAs }: Props) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  const downloadHref = downloadAs
    ? URL.createObjectURL(new Blob([children], { type: 'text/markdown;charset=utf-8' }))
    : undefined

  return (
    <div className="code-block">
      <div className="code-block-header">
        <span className="code-block-filename">
          {filename ?? language ?? 'snippet'}
        </span>
        <div className="code-block-actions">
          {downloadAs && downloadHref && (
            <a
              className="code-block-action"
              href={downloadHref}
              download={downloadAs}
            >
              Download .md
            </a>
          )}
          <button
            type="button"
            className="code-block-action"
            onClick={onCopy}
            aria-live="polite"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      <pre className="code-block-pre"><code>{children}</code></pre>
    </div>
  )
}
