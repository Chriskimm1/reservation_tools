import { useState, type CSSProperties } from 'react'

export default function CopyButton({ textToCopy, style }: { textToCopy: string; style?: CSSProperties }) {
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

  const isFullWidth = style?.width === '100%'
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...(isFullWidth ? { width: '100%' } : {}) }}>
      <button className="btn-copy" style={isFullWidth ? { flex: 1 } : undefined} onClick={doCopy}>
        {status === 'copied' ? '✓ Copied!' : status === 'empty' ? 'Nothing to copy' : 'Copy'}
      </button>
      {!isFullWidth && (
        <span className={`copy-status copy-status--${status}`}>
          {status === 'copied' ? '✓ Copied!' : status === 'empty' ? 'Nothing to copy' : ''}
        </span>
      )}
    </div>
  )
}
