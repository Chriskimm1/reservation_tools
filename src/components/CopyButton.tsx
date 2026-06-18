import React, { useState } from 'react'

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
      setStatus('copied')
      setTimeout(() => setStatus('idle'), 1200)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = textToCopy
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setStatus('copied')
      setTimeout(() => setStatus('idle'), 1200)
    }
  }

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button onClick={doCopy} style={{ padding: '8px 12px', borderRadius: 6 }}>
        Copy
      </button>
      <span style={{ minWidth: 80 }}>
        {status === 'copied' ? 'Copied ✓' : status === 'empty' ? 'Nothing to copy' : ''}
      </span>
    </div>
  )
}
