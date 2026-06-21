import { useMemo, useRef, useState, useEffect } from 'react'
import CopyButton from '../components/CopyButton'

// ── Constants ────────────────────────────────────────────────
const ROOM_TYPES = [
  'RKD', 'RDD', 'PANVD', 'PANDD', 'PANCD',
  'TK', 'TKC', 'TDC', 'EXEC', 'PARL', 'SALN', 'SALC', 'FV1', 'FV2', 'ACCESS',
  'EK', 'EQ', 'EPK', 'EPQ',
  'ESDK', 'ESKC', 'ESQC', 'EPARL', 'ESALN', 'APT 2', 'DUP3', 'EACCESS'
] as const
const CANCELLATION_OPTIONS = ['48 hr', '72 hr', '2w', '30d', 'Non-Cxl'] as const
const INCIDENTAL_OPTIONS   = ['150', '500'] as const
const TIME_MINUTES         = [0, 15, 30, 45] as const

// ── Helpers ──────────────────────────────────────────────────
const formatTime = (hour: number, minute: number, period: 'AM' | 'PM') =>
  `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`

const groupConsecutivePrices = (prices: string[]): string[] => {
  const out: string[] = []
  let i = 0
  while (i < prices.length) {
    let count = 1
    while (i + count < prices.length && prices[i + count] === prices[i]) count++
    out.push(count > 1 ? `$${prices[i]} x ${count}` : `$${prices[i]}`)
    i += count
  }
  return out
}

// ── Component ────────────────────────────────────────────────
export default function HotelNotesTemplate() {
  // Arrival date
  const [arrivalMonth, setArrivalMonth] = useState(() => localStorage.getItem('hotelNotes_arrivalMonth') || '')
  const [arrivalDay, setArrivalDay] = useState(() => localStorage.getItem('hotelNotes_arrivalDay') || '')

  // ETA
  const [hasEta, setHasEta] = useState(() => localStorage.getItem('hotelNotes_hasEta') === 'true')
  const [etaHour, setEtaHour] = useState(() => Number(localStorage.getItem('hotelNotes_etaHour')) || 3)
  const [etaMin, setEtaMin] = useState(() => Number(localStorage.getItem('hotelNotes_etaMin')) || 0)
  const [etaPeriod, setEtaPeriod] = useState<'AM' | 'PM'>(() => (localStorage.getItem('hotelNotes_etaPeriod') as 'AM' | 'PM') || 'PM')

  // ETD
  const [hasEtd, setHasEtd] = useState(() => localStorage.getItem('hotelNotes_hasEtd') === 'true')
  const [etdHour, setEtdHour] = useState(() => Number(localStorage.getItem('hotelNotes_etdHour')) || 11)
  const [etdMin, setEtdMin] = useState(() => Number(localStorage.getItem('hotelNotes_etdMin')) || 0)
  const [etdPeriod, setEtdPeriod] = useState<'AM' | 'PM'>(() => (localStorage.getItem('hotelNotes_etdPeriod') as 'AM' | 'PM') || 'AM')

  // Room and costs
  const [roomType, setRoomType] = useState(() => localStorage.getItem('hotelNotes_roomType') || '')
  const [nightCosts, setNightCosts] = useState<number[]>(() => {
    const saved = localStorage.getItem('hotelNotes_nightCosts')
    return saved ? JSON.parse(saved) : []
  })
  const [costInput, setCostInput] = useState('')
  const costInputRef = useRef<HTMLInputElement>(null)

  // Policies and notes
  const [cxlPolicy, setCxlPolicy] = useState(() => localStorage.getItem('hotelNotes_cxlPolicy') || '72 hr')
  const [incidental, setIncidental] = useState(() => localStorage.getItem('hotelNotes_incidental') || '150')
  const [customNotes, setCustomNotes] = useState(() => localStorage.getItem('hotelNotes_customNotes') || '')

  // Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem('hotelNotes_arrivalMonth', arrivalMonth)
  }, [arrivalMonth])

  useEffect(() => {
    localStorage.setItem('hotelNotes_arrivalDay', arrivalDay)
  }, [arrivalDay])

  useEffect(() => {
    localStorage.setItem('hotelNotes_hasEta', String(hasEta))
  }, [hasEta])

  useEffect(() => {
    localStorage.setItem('hotelNotes_etaHour', String(etaHour))
  }, [etaHour])

  useEffect(() => {
    localStorage.setItem('hotelNotes_etaMin', String(etaMin))
  }, [etaMin])

  useEffect(() => {
    localStorage.setItem('hotelNotes_etaPeriod', etaPeriod)
  }, [etaPeriod])

  useEffect(() => {
    localStorage.setItem('hotelNotes_hasEtd', String(hasEtd))
  }, [hasEtd])

  useEffect(() => {
    localStorage.setItem('hotelNotes_etdHour', String(etdHour))
  }, [etdHour])

  useEffect(() => {
    localStorage.setItem('hotelNotes_etdMin', String(etdMin))
  }, [etdMin])

  useEffect(() => {
    localStorage.setItem('hotelNotes_etdPeriod', etdPeriod)
  }, [etdPeriod])

  useEffect(() => {
    localStorage.setItem('hotelNotes_roomType', roomType)
  }, [roomType])

  useEffect(() => {
    localStorage.setItem('hotelNotes_nightCosts', JSON.stringify(nightCosts))
  }, [nightCosts])

  useEffect(() => {
    localStorage.setItem('hotelNotes_cxlPolicy', cxlPolicy)
  }, [cxlPolicy])

  useEffect(() => {
    localStorage.setItem('hotelNotes_incidental', incidental)
  }, [incidental])

  useEffect(() => {
    localStorage.setItem('hotelNotes_customNotes', customNotes)
  }, [customNotes])

  const addCost = () => {
    const val = parseFloat(costInput)
    if (!isNaN(val) && val > 0) {
      setNightCosts(prev => [...prev, val])
      setCostInput('')
      costInputRef.current?.focus()
    }
  }

  const removeCost = (index: number) => {
    setNightCosts(prev => prev.filter((_, i) => i !== index))
  }

  const resetAll = () => {
    // Clear all state
    setArrivalMonth('')
    setArrivalDay('')
    setHasEta(false)
    setEtaHour(3)
    setEtaMin(0)
    setEtaPeriod('PM')
    setHasEtd(false)
    setEtdHour(11)
    setEtdMin(0)
    setEtdPeriod('AM')
    setRoomType('')
    setNightCosts([])
    setCostInput('')
    setCxlPolicy('72 hr')
    setIncidental('150')
    setCustomNotes('')

    // Clear localStorage
    localStorage.removeItem('hotelNotes_arrivalMonth')
    localStorage.removeItem('hotelNotes_arrivalDay')
    localStorage.removeItem('hotelNotes_hasEta')
    localStorage.removeItem('hotelNotes_etaHour')
    localStorage.removeItem('hotelNotes_etaMin')
    localStorage.removeItem('hotelNotes_etaPeriod')
    localStorage.removeItem('hotelNotes_hasEtd')
    localStorage.removeItem('hotelNotes_etdHour')
    localStorage.removeItem('hotelNotes_etdMin')
    localStorage.removeItem('hotelNotes_etdPeriod')
    localStorage.removeItem('hotelNotes_roomType')
    localStorage.removeItem('hotelNotes_nightCosts')
    localStorage.removeItem('hotelNotes_cxlPolicy')
    localStorage.removeItem('hotelNotes_incidental')
    localStorage.removeItem('hotelNotes_customNotes')
  }

  const assembledText = useMemo(() => {
    const date = arrivalMonth && arrivalDay ? `${arrivalMonth}/${arrivalDay}` : '[DATE]'
    const eta = hasEta ? formatTime(etaHour, etaMin, etaPeriod) : 'n/a'
    const etd = hasEtd ? formatTime(etdHour, etdMin, etdPeriod) : 'n/a'
    const room = roomType || '[ROOM TYPE]'
    const nights = nightCosts.length > 0 ? String(nightCosts.length) : '[NIGHTS]'
    const price = nightCosts.length > 0
      ? `[${groupConsecutivePrices(nightCosts.map(c => String(c))).join(', ')}]`
      : '[PRICE]'

    const cxlText = cxlPolicy === 'Non-Cxl' 
      ? 'Non-Cxl' 
      : `cxl ${cxlPolicy} or forfeit last nt`

    const main = `ARR ${date}, ${room}, ${nights} nts, ${price}, ${cxlText}, incidental $${incidental} p/n, $55 RF p/n, valid ID and CC @ c/i, ETA:${eta}, ETD:${etd}.`
    
    return customNotes.trim() ? `${main}\n\n${customNotes.trim()}` : main
  }, [
    arrivalMonth, 
    arrivalDay, 
    hasEta, 
    etaHour, 
    etaMin, 
    etaPeriod, 
    hasEtd, 
    etdHour, 
    etdMin, 
    etdPeriod, 
    roomType, 
    nightCosts, 
    cxlPolicy, 
    incidental, 
    customNotes
  ])

  return (
    <div className="page-layout">

      {/* ── LEFT: form ── */}
      <aside className="page-sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 className="page-heading" style={{ margin: 0 }}>Options</h2>
          <button 
            onClick={resetAll}
            style={{
              background: 'none',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              padding: '6px 12px',
              fontSize: '13px',
              color: 'var(--color-text)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--color-error)'
              e.currentTarget.style.color = 'var(--color-error)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
              e.currentTarget.style.color = 'var(--color-text)'
            }}
          >
            Clear All
          </button>
        </div>

        {/* Arrival Date */}
        <div className="form-row">
          <label className="form-label">Arrival Date</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input 
              type="text" 
              placeholder="MM" 
              value={arrivalMonth}
              onChange={e => setArrivalMonth(e.target.value)}
              className="field-input field-input--sm" 
            />
            <span style={{ color: 'var(--color-text)' }}>/</span>
            <input 
              type="text" 
              placeholder="DD" 
              value={arrivalDay}
              onChange={e => setArrivalDay(e.target.value)}
              className="field-input field-input--sm" 
            />
          </div>
        </div>

        {/* ETA */}
        <div className="form-row">
          <label className="form-label form-label--checkbox">
            <input 
              type="checkbox" 
              checked={hasEta} 
              onChange={e => setHasEta(e.target.checked)} 
            />
            ETA
          </label>
          {hasEta && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input 
                type="number" 
                min="1" 
                max="12" 
                value={etaHour}
                onChange={e => setEtaHour(Math.max(1, Math.min(12, Number(e.target.value))))}
                className="field-input field-input--sm" 
              />
              <span style={{ color: 'var(--color-text)' }}>:</span>
              <select 
                value={etaMin} 
                onChange={e => setEtaMin(Number(e.target.value))} 
                className="field-select field-select--md"
              >
                {TIME_MINUTES.map(m => (
                  <option key={m} value={m}>
                    {m.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
              <select 
                value={etaPeriod} 
                onChange={e => setEtaPeriod(e.target.value as 'AM' | 'PM')} 
                className="field-select field-select--md"
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          )}
        </div>

        {/* ETD */}
        <div className="form-row">
          <label className="form-label form-label--checkbox">
            <input 
              type="checkbox" 
              checked={hasEtd} 
              onChange={e => setHasEtd(e.target.checked)} 
            />
            ETD
          </label>
          {hasEtd && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input 
                type="number" 
                min="1" 
                max="12" 
                value={etdHour}
                onChange={e => setEtdHour(Math.max(1, Math.min(12, Number(e.target.value))))}
                className="field-input field-input--sm" 
              />
              <span style={{ color: 'var(--color-text)' }}>:</span>
              <select 
                value={etdMin} 
                onChange={e => setEtdMin(Number(e.target.value))} 
                className="field-select field-select--md"
              >
                {TIME_MINUTES.map(m => (
                  <option key={m} value={m}>
                    {m.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
              <select 
                value={etdPeriod} 
                onChange={e => setEtdPeriod(e.target.value as 'AM' | 'PM')} 
                className="field-select field-select--md"
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          )}
        </div>

        {/* Room Type */}
        <div className="form-row">
          <label className="form-label">Room Type</label>
          <select 
            value={roomType} 
            onChange={e => setRoomType(e.target.value)} 
            className="field-select field-select--lg"
          >
            <option value="" disabled>Select room type</option>
            {ROOM_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Night Cost — chip input (nights + price derived from chips) */}
        <div className="form-row" style={{ alignItems: 'center' }}>
          <label className="form-label">Night Cost</label>
          <div style={{ display: 'flex', gap: 8, flex: 1 }}>
            <input
              ref={costInputRef}
              type="number"
              min="0"
              step="0.01"
              value={costInput}
              placeholder="e.g. 345"
              className="field-input field-input--lg"
              onChange={e => setCostInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addCost() }}
            />
            <button className="btn-primary" onClick={addCost}>+ Add</button>
          </div>
        </div>

        {nightCosts.length > 0 && (
          <>
            <p className="field-hint" style={{ marginBottom: 8, paddingLeft: 156 }}>
              <strong style={{ color: 'var(--color-text)' }}>
                {nightCosts.length} night{nightCosts.length !== 1 ? 's' : ''}
              </strong>
            </p>
            <div className="chips" style={{ marginBottom: 16, paddingLeft: 156 }}>
              {nightCosts.map((cost, i) => (
                <span key={i} className="chip">
                  ${cost.toFixed(2)}
                  <button className="chip__remove" onClick={() => removeCost(i)} title="Remove">×</button>
                </span>
              ))}
            </div>
          </>
        )}

        {/* Cancellation */}
        <div className="form-row">
          <label className="form-label">Cancellation</label>
          <select 
            value={cxlPolicy} 
            onChange={e => setCxlPolicy(e.target.value)} 
            className="field-select field-select--lg"
          >
            {CANCELLATION_OPTIONS.map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        {/* Incidental */}
        <div className="form-row">
          <label className="form-label">Incidental</label>
          <select 
            value={incidental} 
            onChange={e => setIncidental(e.target.value)} 
            className="field-select field-select--lg"
          >
            {INCIDENTAL_OPTIONS.map(o => (
              <option key={o} value={o}>${o}</option>
            ))}
          </select>
        </div>

        {/* Custom Notes */}
        <div style={{ marginTop: 12 }}>
          <label 
            style={{ 
              display: 'block', 
              marginBottom: 6, 
              fontWeight: 600, 
              color: 'var(--color-text)' 
            }}
          >
            Custom Notes
          </label>
          <textarea 
            value={customNotes} 
            onChange={e => setCustomNotes(e.target.value)}
            placeholder="Add any custom notes here…"
            rows={4}
            className="field-textarea" 
          />
        </div>
      </aside>

      {/* ── RIGHT: output ── */}
      <section className="page-content">
        <h2 className="page-heading">Generated Text</h2>
        <div style={{ maxWidth: 600 }}>
          <textarea 
            readOnly 
            value={assembledText} 
            rows={10}
            className="field-textarea field-textarea--mono"
            style={{ width: '100%' }} 
          />
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-start' }}>
            <CopyButton textToCopy={assembledText} />
          </div>
        </div>
      </section>

    </div>
  )
}
