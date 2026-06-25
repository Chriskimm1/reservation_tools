import { useMemo, useRef, useState, useEffect } from 'react'
import CopyButton from '../components/CopyButton'
import './Templates.css'

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
  const [roomTypeSearch, setRoomTypeSearch] = useState('')
  const [isRoomTypeDropdownOpen, setIsRoomTypeDropdownOpen] = useState(false)
  const [nightCosts, setNightCosts] = useState<number[]>(() => {
    const saved = localStorage.getItem('hotelNotes_nightCosts')
    return saved ? JSON.parse(saved) : []
  })
  const [costInput, setCostInput] = useState('')
  const costInputRef = useRef<HTMLInputElement>(null)
  const roomTypeInputRef = useRef<HTMLInputElement>(null)

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

  // Filter room types based on search
  const filteredRoomTypes = useMemo(() => {
    if (!roomTypeSearch.trim()) return ROOM_TYPES
    const search = roomTypeSearch.toLowerCase()
    return ROOM_TYPES.filter(t => t.toLowerCase().includes(search))
  }, [roomTypeSearch])

  const handleRoomTypeSelect = (type: string) => {
    setRoomType(type)
    setRoomTypeSearch('')
    setIsRoomTypeDropdownOpen(false)
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
    setRoomTypeSearch('')
    setIsRoomTypeDropdownOpen(false)
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
    <div className="page-layout templates-page">

      {/* ── LEFT: form ── */}
      <aside className="page-sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 className="page-heading" style={{ margin: 0 }}>Options</h2>
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

        {/* Arrival Date */}
        <div className="form-row">
          <label className="form-label">Arrival Date</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="number"
              list="months"
              min="1"
              max="12"
              placeholder="MM"
              value={arrivalMonth}
              onChange={e => {
                const val = e.target.value
                if (val === '' || (Number(val) >= 1 && Number(val) <= 12)) {
                  setArrivalMonth(val ? Number(val).toString().padStart(2, '0') : '')
                }
              }}
              className="field-input field-input--md"
            />
            <datalist id="months">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={month.toString().padStart(2, '0')} />
              ))}
            </datalist>
            <span style={{ color: 'var(--color-text)' }}>/</span>
            <input
              type="number"
              list="days"
              min="1"
              max="31"
              placeholder="DD"
              value={arrivalDay}
              onChange={e => {
                const val = e.target.value
                if (val === '' || (Number(val) >= 1 && Number(val) <= 31)) {
                  setArrivalDay(val ? Number(val).toString().padStart(2, '0') : '')
                }
              }}
              className="field-input field-input--md"
            />
            <datalist id="days">
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <option key={day} value={day.toString().padStart(2, '0')} />
              ))}
            </datalist>
          </div>
        </div>

        {/* ETA */}
        <div className="form-row">
          <div className="form-label" style={{ paddingTop: 0 }}>
            <button 
              type="button"
              className={`toggle-btn ${hasEta ? 'active' : ''}`}
              onClick={() => setHasEta(!hasEta)}
            >
              ETA
            </button>
          </div>
          {hasEta && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <select 
                value={etaHour.toString()}
                onChange={e => setEtaHour(Number(e.target.value))}
                className="field-select field-select--md"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                  <option key={hour} value={hour}>
                    {hour.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
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
          <div className="form-label" style={{ paddingTop: 0 }}>
            <button 
              type="button"
              className={`toggle-btn ${hasEtd ? 'active' : ''}`}
              onClick={() => setHasEtd(!hasEtd)}
            >
              ETD
            </button>
          </div>
          {hasEtd && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <select 
                value={etdHour.toString()}
                onChange={e => setEtdHour(Number(e.target.value))}
                className="field-select field-select--md"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                  <option key={hour} value={hour}>
                    {hour.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
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
          <div style={{ position: 'relative', width: 260 }}>
            <input
              ref={roomTypeInputRef}
              type="text"
              placeholder="Search or select room type"
              value={roomType || roomTypeSearch}
              onChange={e => {
                setRoomTypeSearch(e.target.value)
                setRoomType('')
                setIsRoomTypeDropdownOpen(true)
              }}
              onFocus={() => setIsRoomTypeDropdownOpen(true)}
              onBlur={() => setTimeout(() => setIsRoomTypeDropdownOpen(false), 200)}
              className="field-input field-input--lg"
              style={{ 
                paddingRight: 32,
                width: '100%'
              }}
            />
            <span style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              color: 'var(--color-text-muted)'
            }}>
              🔍
            </span>
            {isRoomTypeDropdownOpen && filteredRoomTypes.length > 0 && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: 0,
                right: 0,
                maxHeight: 240,
                overflowY: 'auto',
                backgroundColor: 'var(--color-bg)',
                border: '2px solid var(--color-accent)',
                borderRadius: 6,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                zIndex: 100
              }}>
                {filteredRoomTypes.map(type => (
                  <div
                    key={type}
                    onClick={() => handleRoomTypeSelect(type)}
                    style={{
                      padding: '10px 14px',
                      cursor: 'pointer',
                      backgroundColor: roomType === type ? 'var(--color-surface-hover)' : 'transparent',
                      color: 'var(--color-text-bright)',
                      fontWeight: roomType === type ? 600 : 400,
                      transition: 'background-color 0.15s'
                    }}
                    onMouseEnter={e => {
                      if (roomType !== type) {
                        e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (roomType !== type) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>
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
            <button className="btn-primary" onClick={addCost} style={{ padding: '10px 14px' }}>+</button>
          </div>
        </div>

        {nightCosts.length > 0 && (
          <>
            <p className="field-hint" style={{ marginBottom: 8 }}>
              <strong style={{ color: 'var(--color-text)' }}>
                {nightCosts.length} night{nightCosts.length !== 1 ? 's' : ''}
              </strong>
            </p>
            <div className="chips" style={{ marginBottom: 16 }}>
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
          <div style={{ position: 'relative' }}>
            <textarea 
              readOnly 
              value={assembledText} 
              rows={10}
              className="field-textarea field-textarea--mono"
              style={{ width: '100%', paddingBottom: 50 }} 
            />
            <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
              <CopyButton textToCopy={assembledText} style={{ width: '100%' }} />
            </div>
          </div>
          {nightCosts.length > 0 && (
            <div style={{ 
              marginTop: 12,
              display: 'flex', 
              flexDirection: 'column', 
              gap: 4, 
              padding: '10px 12px', 
              backgroundColor: 'var(--color-surface)', 
              border: '1px solid var(--color-border)', 
              borderRadius: 6,
              fontSize: 13,
              minWidth: 0
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ color: 'var(--color-text)', whiteSpace: 'nowrap' }}>Stay Cost:</span>
                <strong style={{ color: 'var(--color-text-bright)' }}>${nightCosts.reduce((a, b) => a + b, 0).toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ color: 'var(--color-text)', whiteSpace: 'nowrap' }}>Resort Fee:</span>
                <strong style={{ color: 'var(--color-text-bright)' }}>${(nightCosts.length * 55).toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ color: 'var(--color-text)', whiteSpace: 'nowrap' }}>Tax:</span>
                <strong style={{ color: 'var(--color-text-bright)' }}>${((nightCosts.reduce((a, b) => a + b, 0) + nightCosts.length * 55) * 0.1338).toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, borderTop: '1px solid var(--color-border)', paddingTop: 4, marginTop: 2 }}>
                <span style={{ color: 'var(--color-text-bright)', fontWeight: 600, whiteSpace: 'nowrap' }}>Total:</span>
                <strong style={{ color: 'var(--color-accent)' }}>${((nightCosts.reduce((a, b) => a + b, 0) + nightCosts.length * 55) * 1.1338).toFixed(2)}</strong>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
