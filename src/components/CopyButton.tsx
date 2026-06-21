import { useState } from 'react'

export default function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'empty'>('idle')

  const doCopy = async () => {
    if (!textToCopy) {
      setStatus('empty')
      setTimeout(() => setStatus('idle'), 1200)
      return
    }
    try {
      await navigator.clipboard.writeText(textToCopy)
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea')
      ta.value = textToCopy
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setStatus('copied')
    setTimeout(() => setStatus('idle'), 1200)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button className="btn-copy" onClick={doCopy}>Copy</button>
      <span className={`copy-status copy-status--${status}`}>
        {status === 'copied' ? '✓ Copied!' : status === 'empty' ? 'Nothing to copy' : ''}
      </span>
    </div>
  )
}
