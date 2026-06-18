import React, { useState, useMemo } from 'react'

export default function FeeCalculator() {
  const [stayCost, setStayCost] = useState<number | ''>('')
  const [nights, setNights] = useState<number | ''>('')

  const RESORT_FEE_PER_NIGHT = 55
  const TAX_RATE = 0.1338 // 13.38%

  const calculations = useMemo(() => {
    const stayAmount = typeof stayCost === 'number' ? stayCost : 0
    const nightCount = typeof nights === 'number' ? nights : 0
    
    const resortFeeTotal = RESORT_FEE_PER_NIGHT * nightCount
    const subtotal = stayAmount + resortFeeTotal
    const taxAmount = subtotal * TAX_RATE
    const grandTotal = subtotal + taxAmount

    return {
      resortFeeTotal,
      subtotal,
      taxAmount,
      grandTotal
    }
  }, [stayCost, nights])

  return (
    <div style={{ maxWidth: 600 }}>
      <h3>Fee Calculator</h3>
      
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <label style={{ flex: 1 }}>
          Stay Cost (Before Tax)
          <input
            type="number"
            value={stayCost as any}
            onChange={(e) => setStayCost(e.target.value === '' ? '' : Number(e.target.value))}
            style={{ display: 'block', width: '100%', marginTop: 6, padding: 8 }}
            placeholder="0.00"
          />
        </label>

        <label style={{ flex: 1 }}>
          Number of Nights
          <input
            type="number"
            min="0"
            value={nights as any}
            onChange={(e) => setNights(e.target.value === '' ? '' : Number(e.target.value))}
            style={{ display: 'block', width: '100%', marginTop: 6, padding: 8 }}
            placeholder="0"
          />
        </label>
      </div>

      <div style={{ border: '1px solid #ccc', borderRadius: 6, padding: 16 }}>
        <h4 style={{ marginTop: 0, marginBottom: 16 }}>Summary</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Stay Cost:</span>
            <span>${typeof stayCost === 'number' ? stayCost.toFixed(2) : '0.00'}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Resort Fee ({typeof nights === 'number' ? nights : 0} nights × ${RESORT_FEE_PER_NIGHT}):</span>
            <span>${calculations.resortFeeTotal.toFixed(2)}</span>
          </div>

          <div style={{ borderTop: '1px solid #ddd', paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
            <span>Subtotal:</span>
            <span>${calculations.subtotal.toFixed(2)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Tax (13.38%):</span>
            <span>${calculations.taxAmount.toFixed(2)}</span>
          </div>

          <div style={{ borderTop: '2px solid #333', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 'bold' }}>
            <span>Grand Total:</span>
            <span>${calculations.grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
