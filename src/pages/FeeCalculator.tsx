import { useState, useMemo, useRef, useEffect } from 'react'

const RESORT_FEE_PER_NIGHT = 55
const TAX_RATE = 0.1338

export default function FeeCalculator() {
  const [nightCosts, setNightCosts] = useState<number[]>(() => {
    const saved = localStorage.getItem('feeCalc_nightCosts')
    return saved ? JSON.parse(saved) : []
  })
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Save to localStorage whenever nightCosts changes
  useEffect(() => {
    localStorage.setItem('feeCalc_nightCosts', JSON.stringify(nightCosts))
  }, [nightCosts])

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

  const resetAll = () => {
    setNightCosts([])
    setInputValue('')
    localStorage.removeItem('feeCalc_nightCosts')
  }

  const calc = useMemo(() => {
    const nights      = nightCosts.length
    const stayCost    = nightCosts.reduce((sum, c) => sum + c, 0)
    const resortFee   = RESORT_FEE_PER_NIGHT * nights
    const subtotal    = stayCost + resortFee
    const tax         = subtotal * TAX_RATE
    const grandTotal  = subtotal + tax
    return { nights, stayCost, resortFee, subtotal, tax, grandTotal }
  }, [nightCosts])

  return (
    <div className="page-layout">

      {/* ── LEFT: input form ── */}
      <aside className="page-sidebar">
        <h2 className="page-heading">Fee Calculator</h2>

        <div className="form-row" style={{ alignItems: 'flex-end', gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <label className="form-label" style={{ width: 'auto', textAlign: 'left', display: 'block', marginBottom: 8, marginRight: 0 }}>
              Night Cost (per night)
            </label>
            <input
              ref={inputRef}
              type="number"
              min="0"
              step="0.01"
              value={inputValue}
              placeholder="e.g. 345"
              className="field-input field-input--full"
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addCost() }}
            />
          </div>
          <button className="btn-primary" onClick={addCost} style={{ marginBottom: 1 }}>
            + Add
          </button>
        </div>

        <p className="field-hint">Press Enter or click Add — each entry counts as one night.</p>

        {nightCosts.length > 0 && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
              <p className="field-hint" style={{ margin: 0 }}>
                <strong style={{ color: 'var(--color-text)' }}>
                  {nightCosts.length} night{nightCosts.length !== 1 ? 's' : ''} added
                </strong>
              </p>
              <button 
                onClick={resetAll}
                className="btn-primary"
                style={{
                  backgroundColor: '#dc2626',
                  border: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#b91c1c'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#dc2626'
                }}
              >
                🗑️ Clear All
              </button>
            </div>
            <div className="chips">
              {nightCosts.map((cost, i) => (
                <span key={i} className="chip">
                  ${cost.toFixed(2)}
                  <button className="chip__remove" onClick={() => removeCost(i)} title="Remove">×</button>
                </span>
              ))}
            </div>
          </>
        )}
      </aside>

      {/* ── RIGHT: summary ── */}
      <section className="page-content">
        <h2 className="page-heading">Summary</h2>

        <div className="summary-card">

          <div className="summary-row">
            <span className="summary-row__label">
              Stay Cost ({calc.nights} night{calc.nights !== 1 ? 's' : ''}):
            </span>
            <span className="summary-row__value">${calc.stayCost.toFixed(2)}</span>
          </div>

          {nightCosts.length > 0 && (
            <div className="breakdown">
              {nightCosts.map((cost, i) => (
                <div key={i} className="breakdown__row">
                  <span>Night {i + 1}</span>
                  <span>${cost.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="summary-row">
            <span className="summary-row__label">
              Resort Fee ({calc.nights} × ${RESORT_FEE_PER_NIGHT}):
            </span>
            <span className="summary-row__value">${calc.resortFee.toFixed(2)}</span>
          </div>

          <hr className="summary-divider" />

          <div className="summary-row">
            <span className="summary-row__label">Subtotal:</span>
            <span className="summary-row__value">${calc.subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span className="summary-row__label">Tax (13.38%):</span>
            <span className="summary-row__value">${calc.tax.toFixed(2)}</span>
          </div>

          <div className="summary-total">
            <span className="summary-total__label">Grand Total:</span>
            <span className="summary-total__value">${calc.grandTotal.toFixed(2)}</span>
          </div>

        </div>

      </section>

    </div>
  )
}
