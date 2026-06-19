import { useState, useMemo } from 'react'

const COLORS = {
  background: '#1e1e1e',
  surface: '#252526',
  border: '#3e3e42',
  text: '#cccccc',
  textBright: '#ffffff',
  accent: '#007acc',
}

const INPUT_STYLE: React.CSSProperties = {
  display: 'block',
  width: '100%',
  marginTop: 8,
  padding: 12,
  boxSizing: 'border-box',
  backgroundColor: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 4,
  color: COLORS.textBright,
  fontSize: 16,
}

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
    <div style={{ minHeight: '70vh' }}>
      <h3 style={{ color: COLORS.textBright, marginTop: 0, marginBottom: 32, fontSize: 28 }}>Fee Calculator</h3>
      
      <div style={{ marginBottom: 40, display: 'flex' }}>
        <label style={{ flexGrow: 1, minWidth: 0, marginRight: 20 }}>
          <span style={{ color: COLORS.text, fontSize: 16, fontWeight: 600, display: 'block', marginBottom: 8 }}>Stay Cost (Before Tax)</span>
          <input
            type="number"
            value={stayCost as any}
            onChange={(e) => setStayCost(e.target.value === '' ? '' : Number(e.target.value))}
            style={INPUT_STYLE}
            placeholder="0.00"
          />
        </label>

        <label style={{ flexGrow: 1, minWidth: 0 }}>
          <span style={{ color: COLORS.text, fontSize: 16, fontWeight: 600, display: 'block', marginBottom: 8 }}>Number of Nights</span>
          <input
            type="number"
            min="0"
            value={nights as any}
            onChange={(e) => setNights(e.target.value === '' ? '' : Number(e.target.value))}
            style={INPUT_STYLE}
            placeholder="0"
          />
        </label>
      </div>

      <div style={{ 
        border: `1px solid ${COLORS.border}`, 
        borderRadius: 8, 
        padding: 32, 
        backgroundColor: COLORS.surface,
        maxWidth: 700
      }}>
        <h4 style={{ marginTop: 0, marginBottom: 24, color: COLORS.textBright, fontSize: 20 }}>Summary</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ color: COLORS.text, fontSize: 16 }}>Stay Cost:</span>
            <span style={{ color: COLORS.textBright, fontSize: 16, fontWeight: 500 }}>${typeof stayCost === 'number' ? stayCost.toFixed(2) : '0.00'}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ color: COLORS.text, fontSize: 16 }}>Resort Fee ({typeof nights === 'number' ? nights : 0} nights × ${RESORT_FEE_PER_NIGHT}):</span>
            <span style={{ color: COLORS.textBright, fontSize: 16, fontWeight: 500 }}>${calculations.resortFeeTotal.toFixed(2)}</span>
          </div>

          <div style={{ 
            borderTop: `1px solid ${COLORS.border}`, 
            paddingTop: 16, 
            display: 'flex', 
            justifyContent: 'space-between',
            marginBottom: 16 
          }}>
            <span style={{ color: COLORS.text, fontSize: 16 }}>Subtotal:</span>
            <span style={{ color: COLORS.textBright, fontSize: 16, fontWeight: 500 }}>${calculations.subtotal.toFixed(2)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ color: COLORS.text, fontSize: 16 }}>Tax (13.38%):</span>
            <span style={{ color: COLORS.textBright, fontSize: 16, fontWeight: 500 }}>${calculations.taxAmount.toFixed(2)}</span>
          </div>

          <div style={{ 
            borderTop: `2px solid ${COLORS.accent}`, 
            paddingTop: 20, 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: 22, 
            fontWeight: 'bold' 
          }}>
            <span style={{ color: COLORS.textBright }}>Grand Total:</span>
            <span style={{ color: COLORS.accent }}>${calculations.grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
