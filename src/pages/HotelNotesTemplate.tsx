import { useMemo, useState } from 'react'
import CopyButton from '../components/CopyButton'

// Constants
const ROOM_TYPES = ['RKD', 'RDD', 'PARL', 'SALN', 'EK', 'EQ', 'EPARL', 'ESALN'] as const
const CANCELLATION_OPTIONS = ['48 hr', '72 hr', '2w', '30d'] as const
const INCIDENTAL_OPTIONS = ['150', '500'] as const
const TIME_MINUTES = [0, 15, 30, 45] as const

// Shared label styles
const LABEL_STYLE = { 
  width: 120, 
  textAlign: 'right' as const, 
  fontWeight: 'bold', 
  paddingTop: 6, 
  lineHeight: 1.2, 
  whiteSpace: 'nowrap' as const 
}

const CHECKBOX_LABEL_STYLE = { 
  ...LABEL_STYLE, 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'flex-end', 
  gap: 6 
}

const INPUT_CONTAINER_STYLE = { width: 240, padding: 6, boxSizing: 'border-box' as const }

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

export default function HotelNotesTemplate() {
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
    const dateStr = arrivalMonth && arrivalDay ? `${arrivalMonth}/${arrivalDay}` : '{date}'
    const etaStr = hasEta ? formatTime(etaHour, etaMinute, etaPeriod) : 'not provided'
    const etdStr = hasEtd ? formatTime(etdHour, etdMinute, etdPeriod) : 'not provided'
    const roomStr = roomType || '{room type}'
    const nightsStr = numberOfNights || '{nights}'
    const incidentalStr = incidental || '{incidental}'
    
    const filledPrices = nightPrices.filter(p => p.trim() !== '')
    const priceStr = filledPrices.length > 0 
      ? `[${groupConsecutivePrices(filledPrices).join(', ')}]`
      : '[{price}]'
    
    const mainText = `ARR ${dateStr}, ${roomStr}, ${nightsStr} nts, ${priceStr}, cxl ${cxlPolicy} or forfeit last nt, incidental $${incidentalStr} p/n, $55 RF p/n, valid ID and CC @ c/i, ETA:${etaStr}, ETD:${etdStr}.`
    
    return customNotes.trim() ? `${mainText}\n\n${customNotes.trim()}` : mainText
  }, [arrivalMonth, arrivalDay, hasEta, etaHour, etaMinute, etaPeriod, hasEtd, etdHour, etdMinute, etdPeriod, roomType, numberOfNights, nightPrices, cxlPolicy, incidental, customNotes])

  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <aside style={{ width: 400 }}>
        <h3>Options</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Arrival Date */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={LABEL_STYLE}>Arrival Date:</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: 240 }}>
              <input
                type="text"
                placeholder="MM"
                value={arrivalMonth}
                onChange={(e) => setArrivalMonth(e.target.value)}
                style={{ width: 50, padding: 6 }}
              />
              <span>/</span>
              <input
                type="text"
                placeholder="DD"
                value={arrivalDay}
                onChange={(e) => setArrivalDay(e.target.value)}
                style={{ width: 50, padding: 6 }}
              />
            </div>
          </div>

          {/* ETA */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={CHECKBOX_LABEL_STYLE}>
              <input type="checkbox" checked={hasEta} onChange={(e) => setHasEta(e.target.checked)} />
              <span>ETA:</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: 240 }}>
              {hasEta && (
                <>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={etaHour}
                    onChange={(e) => setEtaHour(Math.max(1, Math.min(12, Number(e.target.value))))}
                    style={{ width: 50, padding: 4 }}
                  />
                  <span>:</span>
                  <select value={etaMinute} onChange={(e) => setEtaMinute(Number(e.target.value))} style={{ padding: 4 }}>
                    {TIME_MINUTES.map(min => (
                      <option key={min} value={min}>{min.toString().padStart(2, '0')}</option>
                    ))}
                  </select>
                  <select value={etaPeriod} onChange={(e) => setEtaPeriod(e.target.value as 'AM' | 'PM')} style={{ padding: 4 }}>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </>
              )}
            </div>
          </div>

          {/* ETD */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={CHECKBOX_LABEL_STYLE}>
              <input type="checkbox" checked={hasEtd} onChange={(e) => setHasEtd(e.target.checked)} />
              <span>ETD:</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: 240 }}>
              {hasEtd && (
                <>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={etdHour}
                    onChange={(e) => setEtdHour(Math.max(1, Math.min(12, Number(e.target.value))))}
                    style={{ width: 50, padding: 4 }}
                  />
                  <span>:</span>
                  <select value={etdMinute} onChange={(e) => setEtdMinute(Number(e.target.value))} style={{ padding: 4 }}>
                    {TIME_MINUTES.map(min => (
                      <option key={min} value={min}>{min.toString().padStart(2, '0')}</option>
                    ))}
                  </select>
                  <select value={etdPeriod} onChange={(e) => setEtdPeriod(e.target.value as 'AM' | 'PM')} style={{ padding: 4 }}>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </>
              )}
            </div>
          </div>

          {/* Room Type */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={LABEL_STYLE}>Room Type:</div>
            <select value={roomType} onChange={(e) => setRoomType(e.target.value)} style={INPUT_CONTAINER_STYLE}>
              <option value="">Select room type</option>
              {ROOM_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Number of Nights */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={LABEL_STYLE}>Nights:</div>
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
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={LABEL_STYLE}>Price per Night:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 240 }}>
              {nightPrices.map((price, index) => (
                <input
                  key={index}
                  type="text"
                  value={price}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                  placeholder={`Night ${index + 1}`}
                  style={{ padding: 6, width: '100%', boxSizing: 'border-box' }}
                />
              ))}
            </div>
          </div>

          {/* Cancellation Policy */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={LABEL_STYLE}>Cancellation:</div>
            <select value={cxlPolicy} onChange={(e) => setCxlPolicy(e.target.value)} style={INPUT_CONTAINER_STYLE}>
              {CANCELLATION_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Incidental */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={LABEL_STYLE}>Incidental:</div>
            <select value={incidental} onChange={(e) => setIncidental(e.target.value)} style={INPUT_CONTAINER_STYLE}>
              {INCIDENTAL_OPTIONS.map(opt => (
                <option key={opt} value={opt}>${opt}</option>
              ))}
            </select>
          </div>

          {/* Custom Notes */}
          <div style={{ marginTop: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold' }}>Custom Notes:</label>
            <textarea
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="Add any custom notes here..."
              rows={4}
              style={{ width: '100%', padding: 8, borderRadius: 6, resize: 'vertical', border: '1px solid #ccc' }}
            />
          </div>
        </div>
      </aside>

      <section style={{ flex: 1 }}>
        <h3>Generated Text</h3>
        <textarea
          readOnly
          value={assembledText}
          rows={6}
          style={{ width: '100%', padding: 8, borderRadius: 6, resize: 'vertical', border: '1px solid #ccc' }}
        />
        <div style={{ marginTop: 8 }}>
          <CopyButton textToCopy={assembledText} />
        </div>
      </section>
    </div>
  )
}
