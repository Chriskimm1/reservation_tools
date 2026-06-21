import { useMemo, useRef, useState } from 'react'
import CopyButton from '../components/CopyButton'

// ── Constants ────────────────────────────────────────────────
const ROOM_TYPES          = ['RKD', 'RDD', 'PARL', 'SALN', 'EK', 'EQ', 'EPARL', 'ESALN'] as const
const CANCELLATION_OPTIONS = ['48 hr', '72 hr', '2w', '30d'] as const
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
  const [arrivalMonth,  setArrivalMonth]  = useState('')
  const [arrivalDay,    setArrivalDay]    = useState('')

  const [hasEta,    setHasEta]    = useState(false)
  const [etaHour,   setEtaHour]   = useState(3)
  const [etaMin,    setEtaMin]    = useState(0)
  const [etaPeriod, setEtaPeriod] = useState<'AM'|'PM'>('PM')

  const [hasEtd,    setHasEtd]    = useState(false)
  const [etdHour,   setEtdHour]   = useState(11)
  const [etdMin,    setEtdMin]    = useState(0)
  const [etdPeriod, setEtdPeriod] = useState<'AM'|'PM'>('AM')

  const [roomType,    setRoomType]    = useState('')
  const [nightCosts,  setNightCosts]  = useState<number[]>([])
  const [costInput,   setCostInput]   = useState('')
  const costInputRef = useRef<HTMLInputElement>(null)
  const [cxlPolicy,   setCxlPolicy]   = useState('72 hr')
  const [incidental,  setIncidental]  = useState('150')
  const [customNotes, setCustomNotes] = useState('')

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

  const assembledText = useMemo(() => {
    const date   = arrivalMonth && arrivalDay ? `${arrivalMonth}/${arrivalDay}` : '[DATE]'
    const eta    = hasEta ? formatTime(etaHour, etaMin, etaPeriod) : 'n/a'
    const etd    = hasEtd ? formatTime(etdHour, etdMin, etdPeriod) : 'n/a'
    const room   = roomType || '[ROOM TYPE]'
    const nights = nightCosts.length > 0 ? String(nightCosts.length) : '[NIGHTS]'
    const price  = nightCosts.length > 0
      ? `[${groupConsecutivePrices(nightCosts.map(c => String(c))).join(', ')}]`
      : '[PRICE]'

    const main = `ARR ${date}, ${room}, ${nights} nts, ${price}, cxl ${cxlPolicy} or forfeit last nt, incidental $${incidental} p/n, $55 RF p/n, valid ID and CC @ c/i, ETA:${eta}, ETD:${etd}.`
    return customNotes.trim() ? `${main}\n\n${customNotes.trim()}` : main
  }, [arrivalMonth, arrivalDay, hasEta, etaHour, etaMin, etaPeriod, hasEtd, etdHour, etdMin, etdPeriod, roomType, nightCosts, cxlPolicy, incidental, customNotes])

  return (
    <div className="page-layout">

      {/* ── LEFT: form ── */}
      <aside className="page-sidebar">
        <h2 className="page-heading">Options</h2>

        {/* Arrival Date */}
        <div className="form-row">
          <label className="form-label">Arrival Date</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="text" placeholder="MM" value={arrivalMonth}
              onChange={e => setArrivalMonth(e.target.value)}
              className="field-input field-input--sm" />
            <span style={{ color: 'var(--color-text)' }}>/</span>
            <input type="text" placeholder="DD" value={arrivalDay}
              onChange={e => setArrivalDay(e.target.value)}
              className="field-input field-input--sm" />
          </div>
        </div>

        {/* ETA */}
        <div className="form-row">
          <label className="form-label form-label--checkbox">
            <input type="checkbox" checked={hasEta} onChange={e => setHasEta(e.target.checked)} />
            ETA
          </label>
          {hasEta && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input type="number" min="1" max="12" value={etaHour}
                onChange={e => setEtaHour(Math.max(1, Math.min(12, Number(e.target.value))))}
                className="field-input field-input--sm" />
              <span style={{ color: 'var(--color-text)' }}>:</span>
              <select value={etaMin} onChange={e => setEtaMin(Number(e.target.value))} className="field-select field-select--md">
                {TIME_MINUTES.map(m => <option key={m} value={m}>{m.toString().padStart(2,'0')}</option>)}
              </select>
              <select value={etaPeriod} onChange={e => setEtaPeriod(e.target.value as 'AM'|'PM')} className="field-select field-select--md">
                <option>AM</option><option>PM</option>
              </select>
            </div>
          )}
        </div>

        {/* ETD */}
        <div className="form-row">
          <label className="form-label form-label--checkbox">
            <input type="checkbox" checked={hasEtd} onChange={e => setHasEtd(e.target.checked)} />
            ETD
          </label>
          {hasEtd && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input type="number" min="1" max="12" value={etdHour}
                onChange={e => setEtdHour(Math.max(1, Math.min(12, Number(e.target.value))))}
                className="field-input field-input--sm" />
              <span style={{ color: 'var(--color-text)' }}>:</span>
              <select value={etdMin} onChange={e => setEtdMin(Number(e.target.value))} className="field-select field-select--md">
                {TIME_MINUTES.map(m => <option key={m} value={m}>{m.toString().padStart(2,'0')}</option>)}
              </select>
              <select value={etdPeriod} onChange={e => setEtdPeriod(e.target.value as 'AM'|'PM')} className="field-select field-select--md">
                <option>AM</option><option>PM</option>
              </select>
            </div>
          )}
        </div>

        {/* Room Type */}
        <div className="form-row">
          <label className="form-label">Room Type</label>
          <select value={roomType} onChange={e => setRoomType(e.target.value)} className="field-select field-select--lg">
            <option value="">Select room type</option>
            {ROOM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
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
          <select value={cxlPolicy} onChange={e => setCxlPolicy(e.target.value)} className="field-select field-select--lg">
            {CANCELLATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {/* Incidental */}
        <div className="form-row">
          <label className="form-label">Incidental</label>
          <select value={incidental} onChange={e => setIncidental(e.target.value)} className="field-select field-select--lg">
            {INCIDENTAL_OPTIONS.map(o => <option key={o} value={o}>${o}</option>)}
          </select>
        </div>

        {/* Custom Notes */}
        <div style={{ marginTop: 12 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: 'var(--color-text)' }}>
            Custom Notes
          </label>
          <textarea value={customNotes} onChange={e => setCustomNotes(e.target.value)}
            placeholder="Add any custom notes here…"
            rows={4}
            className="field-textarea" />
        </div>
      </aside>

      {/* ── RIGHT: output ── */}
      <section className="page-content">
        <h2 className="page-heading">Generated Text</h2>
        <textarea readOnly value={assembledText} rows={10}
          className="field-textarea field-textarea--mono" />
        <div style={{ marginTop: 20 }}>
          <CopyButton textToCopy={assembledText} />
        </div>
      </section>

    </div>
  )
}
