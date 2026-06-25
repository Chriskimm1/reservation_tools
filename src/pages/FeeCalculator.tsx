import { useState, useMemo, useEffect } from 'react'

const RESORT_FEE_PER_NIGHT = 55
const TAX_RATE = 0.1338

export default function FeeCalculator() {
  const [stayCost, setStayCost] = useState<string>(() => {
    return localStorage.getItem('feeCalc_stayCost') || ''
  })
  const [nights, setNights] = useState<string>(() => {
    return localStorage.getItem('feeCalc_nights') || ''
  })

  // Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem('feeCalc_stayCost', stayCost)
  }, [stayCost])

  useEffect(() => {
    localStorage.setItem('feeCalc_nights', nights)
  }, [nights])

  const resetAll = () => {
    setStayCost('')
    setNights('')
    localStorage.removeItem('feeCalc_stayCost')
    localStorage.removeItem('feeCalc_nights')
  }

  const calc = useMemo(() => {
    const stayCostNum = parseFloat(stayCost) || 0
    const nightsNum = parseInt(nights) || 0
    const resortFee = RESORT_FEE_PER_NIGHT * nightsNum
    const subtotal = stayCostNum + resortFee
    const tax = subtotal * TAX_RATE
    const grandTotal = subtotal + tax
    return { stayCost: stayCostNum, nights: nightsNum, resortFee, subtotal, tax, grandTotal }
  }, [stayCost, nights])

  return (
    <div className="page-layout">

      {/* ── LEFT: input form ── */}
      <aside className="page-sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 className="page-heading" style={{ margin: 0 }}>Fee Calculator</h2>
          <button 
            onClick={resetAll}
            className="btn-primary"
            style={{ backgroundColor: '#dc2626', border: 'none' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b91c1c'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#dc2626'}
          >
            🗑️ Clear
          </button>
        </div>

        <div className="form-row">
          <label className="form-label">Stay Cost</label>
          <div style={{ position: 'relative' }}>
            <span style={{ 
              position: 'absolute', 
              left: 12, 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)',
              fontWeight: 500
            }}>$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={stayCost}
              placeholder="0.00"
              className="field-input field-input--lg"
              style={{ paddingLeft: 28 }}
              onChange={e => setStayCost(e.target.value)}
            />
          </div>
        </div>
        <p className="field-hint" style={{ marginLeft: 156, marginTop: -8, marginBottom: 16 }}>
          Total room cost before taxes/fees
        </p>

        <div className="form-row">
          <label className="form-label">Nights</label>
          <input
            type="number"
            min="0"
            step="1"
            value={nights}
            placeholder="0"
            className="field-input field-input--md"
            onChange={e => setNights(e.target.value)}
          />
        </div>
        <p className="field-hint" style={{ marginLeft: 156, marginTop: -8 }}>
          Number of nights
        </p>

      </aside>

      {/* ── RIGHT: summary ── */}
      <section className="page-content">
        <h2 className="page-heading">Summary</h2>

        <div className="summary-card">

          <div className="summary-row">
            <span className="summary-row__label">Stay Cost:</span>
            <span className="summary-row__value">${calc.stayCost.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span className="summary-row__label">
              Resort Fee ({calc.nights} night{calc.nights !== 1 ? 's' : ''} × $55):
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
