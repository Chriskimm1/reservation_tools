import { useState } from 'react'

const COLORS = {
  background: '#1e1e1e',
  surface: '#252526',
  border: '#3e3e42',
  text: '#cccccc',
  textBright: '#ffffff',
  accent: '#007acc',
  accentHover: '#005a9e',
  success: '#4ec9b0',
  error: '#f48771',
}

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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button 
        onClick={doCopy} 
        style={{ 
          padding: '8px 16px', 
          borderRadius: 4, 
          backgroundColor: COLORS.accent,
          color: COLORS.textBright,
          border: `1px solid ${COLORS.accent}`,
          cursor: 'pointer',
          fontWeight: 500,
          transition: 'all 0.2s ease',
          marginRight: 8,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.accentHover
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.accent
        }}
      >
        Copy
      </button>
      <span 
        style={{ 
          minWidth: 120, 
          color: status === 'copied' ? COLORS.success : status === 'empty' ? COLORS.error : COLORS.text,
          fontSize: 14,
        }}
      >
        {status === 'copied' ? 'Copied ✓' : status === 'empty' ? 'Nothing to copy' : ''}
      </span>
    </div>
  )
}
