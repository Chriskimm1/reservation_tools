import { useState, useMemo, useRef } from 'react'

const getDarkColors = () => ({
  background: '#1e1e1e',
  surface: '#252526',
  surfaceHover: '#2d2d30',
  border: '#3e3e42',
  borderFocus: '#007acc',
  text: '#cccccc',
  textBright: '#ffffff',
  textMuted: '#858585',
  accent: '#007acc',
  accentHover: '#005a9e',
  chip: '#0e4f7a',
  chipText: '#cce5ff',
  chipX: '#7ab8e8',
})

const getLightColors = () => ({
  background: '#ffffff',
  surface: '#f5f5f5',
  surfaceHover: '#e8e8e8',
  border: '#e0e0e0',
  borderFocus: '#0078d4',
  text: '#333333',
  textBright: '#000000',
  textMuted: '#666666',
  accent: '#0078d4',
  accentHover: '#106ebe',
  chip: '#ddeeff',
  chipText: '#004e8c',
  chipX: '#005a9e',
})

const RESORT_FEE_PER_NIGHT = 55
const TAX_RATE = 0.1338

export default function FeeCalculator({ isDark }: { isDark: boolean }) {
  const COLORS = isDark ? getDarkColors() : getLightColors()
  const [nightCosts, setNightCosts] = useState<number[]>([])
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const addCost = () => {
    const val = parseFloat(inputValue)
    if (!isNaN(val) && val > 0) {
      setNightCosts(prev => [...prev, val])
      setInputValue('')
      inputRef.current?.focus()
    }
  }

  const removeCost = (index: number) => {
    setNightCosts(prev => prev.filter((_, i) => i !== index))
  }

  const calculations = useMemo(() => {
    const nights = nightCosts.length
    const stayCost = nightCosts.reduce((sum, c) => sum + c, 0)
    const resortFeeTotal = RESORT_FEE_PER_NIGHT * nights
    const subtotal = stayCost + resortFeeTotal
    const taxAmount = subtotal * TAX_RATE
    const grandTotal = subtotal + taxAmount
    return { nights, stayCost, resortFeeTotal, subtotal, taxAmount, grandTotal }
  }, [nightCosts])

  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: '10px 14px',
    boxSizing: 'border-box',
    backgroundColor: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 4,
    color: COLORS.textBright,
    fontSize: 15,
    outline: 'none',
    appearance: 'auto',
  }

  const summaryRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  }

  return (
    <div style={{ display: 'flex', minHeight: '70vh' }}>

      {/* ── LEFT: inputs ── */}
      <aside style={{
        width: 480,
        paddingRight: 40,
        borderRight: `1px solid ${COLORS.border}`,
        marginRight: 40,
        flexShrink: 0,
      }}>
        <h3 style={{ color: COLORS.textBright, marginTop: 0, marginBottom: 32, fontSize: 28 }}>Fee Calculator</h3>

        {/* Cost input row */}
        <div style={{ marginBottom: 20 }}>
          <span style={{ color: COLORS.text, fontSize: 15, fontWeight: 600, display: 'block', marginBottom: 10 }}>
            Night Cost (per night)
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              ref={inputRef}
              type="number"
              min="0"
              step="0.01"
              value={inputValue}
              placeholder="e.g. 345"
              style={inputStyle}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addCost() }}
            />
            <button
              onClick={addCost}
              style={{
                padding: '10px 20px',
                borderRadius: 4,
                border: 'none',
                backgroundColor: COLORS.accent,
                color: '#ffffff',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              + Add
            </button>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: 13, color: COLORS.textMuted }}>
            Press Enter or click Add — each entry counts as one night.
          </p>
        </div>

        {/* Chips */}
        {nightCosts.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <span style={{ color: COLORS.text, fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 10 }}>
              {nightCosts.length} night{nightCosts.length !== 1 ? 's' : ''} added
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {nightCosts.map((cost, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 10px 5px 12px',
                    borderRadius: 20,
                    backgroundColor: COLORS.chip,
                    color: COLORS.chipText,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  ${cost.toFixed(2)}
                  <button
                    onClick={() => removeCost(i)}
                    title="Remove"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: COLORS.chipX,
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: 15,
                      lineHeight: 1,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* ── RIGHT: summary ── */}
      <section style={{ flexGrow: 1 }}>
        <h3 style={{ color: COLORS.textBright, marginTop: 0, marginBottom: 32, fontSize: 28 }}>Summary</h3>

        <div style={{
          border: `1px solid ${COLORS.border}`,
          borderRadius: 8,
          padding: 32,
          backgroundColor: COLORS.surface,
        }}>
          <div style={summaryRowStyle}>
            <span style={{ color: COLORS.text, fontSize: 16 }}>
              Stay Cost ({calculations.nights} night{calculations.nights !== 1 ? 's' : ''}):
            </span>
            <span style={{ color: COLORS.textBright, fontSize: 16, fontWeight: 500 }}>
              ${calculations.stayCost.toFixed(2)}
            </span>
          </div>

          {/* Per-night breakdown */}
          {nightCosts.length > 0 && (
            <div style={{ marginBottom: 16, paddingLeft: 16, borderLeft: `2px solid ${COLORS.border}` }}>
              {nightCosts.map((cost, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: COLORS.textMuted, fontSize: 14 }}>Night {i + 1}</span>
                  <span style={{ color: COLORS.textMuted, fontSize: 14 }}>${cost.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          <div style={summaryRowStyle}>
            <span style={{ color: COLORS.text, fontSize: 16 }}>
              Resort Fee ({calculations.nights} × ${RESORT_FEE_PER_NIGHT}):
            </span>
            <span style={{ color: COLORS.textBright, fontSize: 16, fontWeight: 500 }}>
              ${calculations.resortFeeTotal.toFixed(2)}
            </span>
          </div>

          <div style={{
            ...summaryRowStyle,
            borderTop: `1px solid ${COLORS.border}`,
            paddingTop: 16,
          }}>
            <span style={{ color: COLORS.text, fontSize: 16 }}>Subtotal:</span>
            <span style={{ color: COLORS.textBright, fontSize: 16, fontWeight: 500 }}>
              ${calculations.subtotal.toFixed(2)}
            </span>
          </div>

          <div style={summaryRowStyle}>
            <span style={{ color: COLORS.text, fontSize: 16 }}>Tax (13.38%):</span>
            <span style={{ color: COLORS.textBright, fontSize: 16, fontWeight: 500 }}>
              ${calculations.taxAmount.toFixed(2)}
            </span>
          </div>

          <div style={{
            borderTop: `2px solid ${COLORS.accent}`,
            paddingTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}>
            <span style={{ color: COLORS.textBright, fontSize: 22, fontWeight: 'bold' }}>Grand Total:</span>
            <span style={{ color: COLORS.accent, fontSize: 22, fontWeight: 'bold' }}>
              ${calculations.grandTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
