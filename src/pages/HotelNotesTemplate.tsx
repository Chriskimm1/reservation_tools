import { useMemo, useState } from 'react'
import CopyButton from '../components/CopyButton'

// Constants
const ROOM_TYPES = ['RKD', 'RDD', 'PARL', 'SALN', 'EK', 'EQ', 'EPARL', 'ESALN'] as const
const CANCELLATION_OPTIONS = ['48 hr', '72 hr', '2w', '30d'] as const
const INCIDENTAL_OPTIONS = ['150', '500'] as const
const TIME_MINUTES = [0, 15, 30, 45] as const

// Dark theme colors
const getDarkColors = () => ({
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
  accentHover: '#106ebe'
})

// Helper functions
const formatTime = (hour: number, minute: number, period: 'AM' | 'PM'): string => {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`
}

const groupConsecutivePrices = (prices: string[]): string[] => {
  const groupedPrices: string[] = []
  let i = 0
  
  while (i < prices.length) {
    const currentPrice = prices[i]
    let count = 1
    
    while (i + count < prices.length && prices[i + count] === currentPrice) {
      count++
    }
    
    groupedPrices.push(count > 1 ? `$${currentPrice} x ${count}` : `$${currentPrice}`)
    i += count
  }
  
  return groupedPrices
}

export default function HotelNotesTemplate({ isDark }: { isDark: boolean }) {
  const COLORS = isDark ? getDarkColors() : getLightColors()
  
  // Shared label styles
  const LABEL_STYLE = { 
    width: 140, 
    textAlign: 'right' as const, 
    fontWeight: 'bold', 
    paddingTop: 6, 
    lineHeight: 1.2, 
    whiteSpace: 'nowrap' as const,
    color: COLORS.text,
    fontSize: 15
  }

  const CHECKBOX_LABEL_STYLE = { 
    ...LABEL_STYLE, 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'flex-end'
  }

  const INPUT_CONTAINER_STYLE = { 
    width: 260, 
    padding: 8, 
    boxSizing: 'border-box' as const,
    backgroundColor: COLORS.surface,
    color: COLORS.textBright,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 4,
    fontSize: 15
  }

  // IE-compatible spacing helper
  const ROW_STYLE = { display: 'flex', alignItems: 'flex-start', marginBottom: 18 }
  const LABEL_MARGIN_STYLE = { marginRight: 16 }
  const CHECKBOX_CHILD_MARGIN_STYLE = { marginRight: 8 }
  
  const [arrivalMonth, setArrivalMonth] = useState('')
  const [arrivalDay, setArrivalDay] = useState('')
  
  const [hasEta, setHasEta] = useState(false)
  const [etaHour, setEtaHour] = useState(3)
  const [etaMinute, setEtaMinute] = useState(0)
  const [etaPeriod, setEtaPeriod] = useState<'AM' | 'PM'>('PM')
  
  const [hasEtd, setHasEtd] = useState(false)
  const [etdHour, setEtdHour] = useState(11)
  const [etdMinute, setEtdMinute] = useState(0)
  const [etdPeriod, setEtdPeriod] = useState<'AM' | 'PM'>('AM')
  
  const [roomType, setRoomType] = useState('')
  const [numberOfNights, setNumberOfNights] = useState('1')
  const [nightPrices, setNightPrices] = useState<string[]>([''])
  
  const [cxlPolicy, setCxlPolicy] = useState('72 hr')
  const [incidental, setIncidental] = useState('150')
  const [customNotes, setCustomNotes] = useState('')

  const handleNumberOfNightsChange = (value: string) => {
    setNumberOfNights(value)
    const nights = parseInt(value) || 1
    const newPrices = [...nightPrices]
    
    if (nights > newPrices.length) {
      while (newPrices.length < nights) {
        newPrices.push('')
      }
    } else {
      newPrices.length = nights
    }
    
    setNightPrices(newPrices)
  }

  const handlePriceChange = (index: number, value: string) => {
    const newPrices = [...nightPrices]
    newPrices[index] = value
    setNightPrices(newPrices)
  }

  const assembledText = useMemo(() => {
    const dateStr = arrivalMonth && arrivalDay ? `${arrivalMonth}/${arrivalDay}` : '[DATE]'
    const etaStr = hasEta ? formatTime(etaHour, etaMinute, etaPeriod) : 'n/a'
    const etdStr = hasEtd ? formatTime(etdHour, etdMinute, etdPeriod) : 'n/a'
    const roomStr = roomType || '[ROOM TYPE]'
    const nightsStr = numberOfNights || '[NIGHTS]'
    const incidentalStr = incidental || '[AMOUNT]'
    
    const filledPrices = nightPrices.filter(p => p.trim() !== '')
    const priceStr = filledPrices.length > 0 
      ? `[${groupConsecutivePrices(filledPrices).join(', ')}]`
      : '[PRICE]'
    
    const mainText = `ARR ${dateStr}, ${roomStr}, ${nightsStr} nts, ${priceStr}, cxl ${cxlPolicy} or forfeit last nt, incidental $${incidentalStr} p/n, $55 RF p/n, valid ID and CC @ c/i, ETA:${etaStr}, ETD:${etdStr}.`
    
    return customNotes.trim() ? `${mainText}\n\n${customNotes.trim()}` : mainText
  }, [arrivalMonth, arrivalDay, hasEta, etaHour, etaMinute, etaPeriod, hasEtd, etdHour, etdMinute, etdPeriod, roomType, numberOfNights, nightPrices, cxlPolicy, incidental, customNotes])

  return (
    <div style={{ display: 'flex', backgroundColor: COLORS.background, minHeight: '70vh' }}>
      <aside style={{ width: 480, marginRight: 40, paddingRight: 40, borderRight: `1px solid ${COLORS.border}` }}>
        <h3 style={{ color: COLORS.textBright, marginTop: 0, marginBottom: 32, fontSize: 28 }}>Options</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Arrival Date */}
          <div style={ROW_STYLE}>
            <div style={{ ...LABEL_STYLE, ...LABEL_MARGIN_STYLE }}>Arrival Date:</div>
            <div style={{ display: 'flex', alignItems: 'center', width: 240 }}>
              <input
                type="text"
                placeholder="MM"
                value={arrivalMonth}
                onChange={(e) => setArrivalMonth(e.target.value)}
                style={{ 
                  width: 50, 
                  padding: 6, 
                  marginRight: 8,
                  backgroundColor: COLORS.surface,
                  color: COLORS.textBright,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 4
                }}
              />
              <span style={{ marginRight: 8, color: COLORS.text }}>/</span>
              <input
                type="text"
                placeholder="DD"
                value={arrivalDay}
                onChange={(e) => setArrivalDay(e.target.value)}
                style={{ 
                  width: 50, 
                  padding: 6,
                  backgroundColor: COLORS.surface,
                  color: COLORS.textBright,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 4
                }}
              />
            </div>
          </div>

          {/* ETA */}
          <div style={ROW_STYLE}>
            <div style={{ ...CHECKBOX_LABEL_STYLE, ...LABEL_MARGIN_STYLE }}>
              <input type="checkbox" checked={hasEta} onChange={(e) => setHasEta(e.target.checked)} style={CHECKBOX_CHILD_MARGIN_STYLE} />
              <span>ETA:</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', width: 240 }}>
              {hasEta && (
                <>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={etaHour}
                    onChange={(e) => setEtaHour(Math.max(1, Math.min(12, Number(e.target.value))))}
                    style={{ 
                      width: 50, 
                      padding: 4, 
                      marginRight: 8,
                      backgroundColor: COLORS.surface,
                      color: COLORS.textBright,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 4
                    }}
                  />
                  <span style={{ marginRight: 8, color: COLORS.text }}>:</span>
                  <select 
                    value={etaMinute} 
                    onChange={(e) => setEtaMinute(Number(e.target.value))} 
                    style={{ 
                      padding: 4, 
                      marginRight: 8,
                      backgroundColor: COLORS.surface,
                      color: COLORS.textBright,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 4
                    }}
                  >
                    {TIME_MINUTES.map(min => (
                      <option key={min} value={min}>{min.toString().padStart(2, '0')}</option>
                    ))}
                  </select>
                  <select 
                    value={etaPeriod} 
                    onChange={(e) => setEtaPeriod(e.target.value as 'AM' | 'PM')} 
                    style={{ 
                      padding: 4,
                      backgroundColor: COLORS.surface,
                      color: COLORS.textBright,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 4
                    }}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </>
              )}
            </div>
          </div>

          {/* ETD */}
          <div style={ROW_STYLE}>
            <div style={{ ...CHECKBOX_LABEL_STYLE, ...LABEL_MARGIN_STYLE }}>
              <input type="checkbox" checked={hasEtd} onChange={(e) => setHasEtd(e.target.checked)} style={CHECKBOX_CHILD_MARGIN_STYLE} />
              <span>ETD:</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', width: 240 }}>
              {hasEtd && (
                <>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={etdHour}
                    onChange={(e) => setEtdHour(Math.max(1, Math.min(12, Number(e.target.value))))}
                    style={{ 
                      width: 50, 
                      padding: 4, 
                      marginRight: 8,
                      backgroundColor: COLORS.surface,
                      color: COLORS.textBright,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 4
                    }}
                  />
                  <span style={{ marginRight: 8, color: COLORS.text }}>:</span>
                  <select 
                    value={etdMinute} 
                    onChange={(e) => setEtdMinute(Number(e.target.value))} 
                    style={{ 
                      padding: 4, 
                      marginRight: 8,
                      backgroundColor: COLORS.surface,
                      color: COLORS.textBright,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 4
                    }}
                  >
                    {TIME_MINUTES.map(min => (
                      <option key={min} value={min}>{min.toString().padStart(2, '0')}</option>
                    ))}
                  </select>
                  <select 
                    value={etdPeriod} 
                    onChange={(e) => setEtdPeriod(e.target.value as 'AM' | 'PM')} 
                    style={{ 
                      padding: 4,
                      backgroundColor: COLORS.surface,
                      color: COLORS.textBright,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 4
                    }}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </>
              )}
            </div>
          </div>

          {/* Room Type */}
          <div style={ROW_STYLE}>
            <div style={{ ...LABEL_STYLE, ...LABEL_MARGIN_STYLE }}>Room Type:</div>
            <select value={roomType} onChange={(e) => setRoomType(e.target.value)} style={INPUT_CONTAINER_STYLE}>
              <option value="">Select room type</option>
              {ROOM_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Number of Nights */}
          <div style={ROW_STYLE}>
            <div style={{ ...LABEL_STYLE, ...LABEL_MARGIN_STYLE }}>Nights:</div>
            <input
              type="number"
              min="1"
              value={numberOfNights}
              onChange={(e) => handleNumberOfNightsChange(e.target.value)}
              placeholder="e.g. 3"
              style={INPUT_CONTAINER_STYLE}
            />
          </div>

          {/* Pricing */}
          <div style={ROW_STYLE}>
            <div style={{ ...LABEL_STYLE, ...LABEL_MARGIN_STYLE }}>Price per Night:</div>
            <div style={{ display: 'flex', flexDirection: 'column', width: 240 }}>
              {nightPrices.map((price, index) => (
                <input
                  key={index}
                  type="text"
                  value={price}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                  placeholder={`Night ${index + 1}`}
                  style={{ 
                    padding: 6, 
                    width: '100%', 
                    boxSizing: 'border-box', 
                    marginBottom: index < nightPrices.length - 1 ? 6 : 0,
                    backgroundColor: COLORS.surface,
                    color: COLORS.textBright,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 4
                  }}
                />
              ))}
            </div>
          </div>

          {/* Cancellation Policy */}
          <div style={ROW_STYLE}>
            <div style={{ ...LABEL_STYLE, ...LABEL_MARGIN_STYLE }}>Cancellation:</div>
            <select value={cxlPolicy} onChange={(e) => setCxlPolicy(e.target.value)} style={INPUT_CONTAINER_STYLE}>
              {CANCELLATION_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Incidental */}
          <div style={ROW_STYLE}>
            <div style={{ ...LABEL_STYLE, ...LABEL_MARGIN_STYLE }}>Incidental:</div>
            <select value={incidental} onChange={(e) => setIncidental(e.target.value)} style={INPUT_CONTAINER_STYLE}>
              {INCIDENTAL_OPTIONS.map(opt => (
                <option key={opt} value={opt}>${opt}</option>
              ))}
            </select>
          </div>

          {/* Custom Notes */}
          <div style={{ marginTop: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', color: COLORS.text }}>Custom Notes:</label>
            <textarea
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="Add any custom notes here..."
              rows={4}
              style={{ 
                width: '100%', 
                padding: 8, 
                borderRadius: 6, 
                resize: 'vertical', 
                border: `1px solid ${COLORS.border}`,
                backgroundColor: COLORS.surface,
                color: COLORS.textBright
              }}
            />
          </div>
        </div>
      </aside>

      <section style={{ flexGrow: 1 }}>
        <h3 style={{ color: COLORS.textBright, marginTop: 0, marginBottom: 20, fontSize: 28 }}>Generated Text</h3>
        <textarea
          readOnly
          value={assembledText}
          rows={10}
          style={{ 
            width: '100%', 
            padding: 16, 
            borderRadius: 6, 
            resize: 'vertical', 
            border: `1px solid ${COLORS.border}`,
            fontFamily: 'monospace',
            fontSize: 15,
            lineHeight: 1.6,
            backgroundColor: COLORS.surface,
            color: COLORS.textBright,
            boxSizing: 'border-box' as const
          }}
        />
        <div style={{ marginTop: 20 }}>
          <CopyButton textToCopy={assembledText} isDark={isDark} />
        </div>
      </section>
    </div>
  )
}
