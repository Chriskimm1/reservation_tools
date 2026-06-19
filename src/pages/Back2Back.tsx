import { useState, useMemo } from 'react'
import CopyButton from '../components/CopyButton'

// Dark theme colors
const COLORS = {
  background: '#1e1e1e',
  surface: '#252526',
  surfaceHover: '#2d2d30',
  border: '#3e3e42',
  borderFocus: '#007acc',
  text: '#cccccc',
  textBright: '#ffffff',
  textMuted: '#858585',
  accent: '#0e639c',
  accentHover: '#1177bb'
}

// Shared label styles
const LABEL_STYLE = { 
  width: 140, 
  textAlign: 'right' as const, 
  fontWeight: 'bold', 
  paddingTop: 6, 
  lineHeight: 1.2, 
  whiteSpace: 'nowrap' as const,
  color: COLORS.text
}

const INPUT_CONTAINER_STYLE = { 
  width: 240, 
  padding: 6, 
  boxSizing: 'border-box' as const,
  backgroundColor: COLORS.surface,
  color: COLORS.textBright,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 4,
  fontSize: 14
}

// IE-compatible spacing helper
const ROW_STYLE = { display: 'flex', alignItems: 'flex-start', marginBottom: 16 }
const LABEL_MARGIN_STYLE = { marginRight: 16 }

export default function Back2Back() {
  const [confirmationNum1, setConfirmationNum1] = useState('')
  const [confirmationNum2, setConfirmationNum2] = useState('')

  const generatedText = useMemo(() => {
    const res1 = confirmationNum1.trim() || '[CONFIRMATION #]'
    const res2 = confirmationNum2.trim() || '[CONFIRMATION #]'

    return `-------Back to Back-------

back to back reservations do not remove block 

res 1 : ${res1}
res 2 : ${res2}`
  }, [confirmationNum1, confirmationNum2])

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '70vh',
      backgroundColor: COLORS.background 
    }}>
      <aside style={{ 
        width: 420, 
        paddingRight: 32, 
        borderRight: `1px solid ${COLORS.border}`,
        marginRight: 32 
      }}>
        <h3 style={{ color: COLORS.textBright, marginBottom: 24 }}>Back to Back Reservations</h3>
        
        <div>
          {/* 1st Confirmation Number */}
          <div style={ROW_STYLE}>
            <div style={{ ...LABEL_STYLE, ...LABEL_MARGIN_STYLE }}>1st Confirmation</div>
            <input
              type="text"
              value={confirmationNum1}
              onChange={(e) => setConfirmationNum1(e.target.value)}
              placeholder="Enter confirmation number"
              style={INPUT_CONTAINER_STYLE}
            />
          </div>

          {/* 2nd Confirmation Number */}
          <div style={ROW_STYLE}>
            <div style={{ ...LABEL_STYLE, ...LABEL_MARGIN_STYLE }}>2nd Confirmation</div>
            <input
              type="text"
              value={confirmationNum2}
              onChange={(e) => setConfirmationNum2(e.target.value)}
              placeholder="Enter confirmation number"
              style={INPUT_CONTAINER_STYLE}
            />
          </div>
        </div>
      </aside>

      <section style={{ flexGrow: 1 }}>
        <h3 style={{ color: COLORS.textBright }}>Generated Text</h3>
        <textarea
          readOnly
          value={generatedText}
          rows={6}
          style={{ 
            width: '100%', 
            padding: 8, 
            borderRadius: 6, 
            resize: 'vertical', 
            border: `1px solid ${COLORS.border}`,
            fontFamily: 'monospace',
            fontSize: 14,
            lineHeight: 1.5,
            backgroundColor: COLORS.surface,
            color: COLORS.textBright
          }}
        />
        <div style={{ marginTop: 8 }}>
          <CopyButton textToCopy={generatedText} />
        </div>
      </section>
    </div>
  )
}
