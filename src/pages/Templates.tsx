import { useState, useEffect } from 'react'
import HotelNotesTemplate from './HotelNotesTemplate'
import CCAuthTrace from './CCAuthTrace'

type TemplateType = 'newres' | 'ccauth'

interface TemplatesProps {
  initialTemplate?: TemplateType
}

function Templates({ initialTemplate = 'newres' }: TemplatesProps) {
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>(initialTemplate)

  // Update active template when prop changes
  useEffect(() => {
    if (initialTemplate) {
      setActiveTemplate(initialTemplate)
    }
  }, [initialTemplate])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Template Selector Tabs */}
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 20,
        borderBottom: '2px solid var(--color-border)',
      }}>
        <button
          onClick={() => setActiveTemplate('newres')}
          style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: activeTemplate === 'newres' ? '3px solid var(--color-accent)' : '3px solid transparent',
            color: activeTemplate === 'newres' ? 'var(--color-text-bright)' : 'var(--color-text)',
            fontWeight: activeTemplate === 'newres' ? 600 : 400,
            fontSize: 15,
            cursor: 'pointer',
            transition: 'all 0.15s',
            marginBottom: -2,
          }}
          onMouseEnter={e => {
            if (activeTemplate !== 'newres') {
              e.currentTarget.style.color = 'var(--color-text-bright)'
            }
          }}
          onMouseLeave={e => {
            if (activeTemplate !== 'newres') {
              e.currentTarget.style.color = 'var(--color-text)'
            }
          }}
        >
          📝 Hotel Notes
        </button>
        <button
          onClick={() => setActiveTemplate('ccauth')}
          style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: activeTemplate === 'ccauth' ? '3px solid var(--color-accent)' : '3px solid transparent',
            color: activeTemplate === 'ccauth' ? 'var(--color-text-bright)' : 'var(--color-text)',
            fontWeight: activeTemplate === 'ccauth' ? 600 : 400,
            fontSize: 15,
            cursor: 'pointer',
            transition: 'all 0.15s',
            marginBottom: -2,
          }}
          onMouseEnter={e => {
            if (activeTemplate !== 'ccauth') {
              e.currentTarget.style.color = 'var(--color-text-bright)'
            }
          }}
          onMouseLeave={e => {
            if (activeTemplate !== 'ccauth') {
              e.currentTarget.style.color = 'var(--color-text)'
            }
          }}
        >
          💳 CC Authorization
        </button>
      </div>

      {/* Template Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {activeTemplate === 'newres' && <HotelNotesTemplate />}
        {activeTemplate === 'ccauth' && <CCAuthTrace />}
      </div>
    </div>
  )
}

export default Templates

