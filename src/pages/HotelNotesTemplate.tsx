import { useMemo, useState } from 'react'
import CopyButton from '../components/CopyButton'

const OPTIONS = ['cxl 48', 'CI @', 'CO @', 'no eta provided', 'no etd provided']

export default function HotelNotesTemplate() {
  const [selected, setSelected] = useState<string[]>([])
  const [ciHour, setCiHour] = useState<number>(3)
  const [ciMinute, setCiMinute] = useState<number>(0)
  const [ciPeriod, setCiPeriod] = useState<'AM' | 'PM'>('PM')
  const [coHour, setCoHour] = useState<number>(11)
  const [coMinute, setCoMinute] = useState<number>(0)
  const [coPeriod, setCoPeriod] = useState<'AM' | 'PM'>('AM')

  const toggle = (value: string) => {
    setSelected((s) => (s.includes(value) ? s.filter((x) => x !== value) : [...s, value]))
  }

  const assembledText = useMemo(() => {
    if (selected.length === 0) return ''
    return selected.map((s) => {
      if (s === 'CI @') {
        const formattedHour = ciHour.toString().padStart(2, '0')
        const formattedMinute = ciMinute.toString().padStart(2, '0')
        return `CI @ ${formattedHour}:${formattedMinute} ${ciPeriod}`
      }
      if (s === 'CO @') {
        const formattedHour = coHour.toString().padStart(2, '0')
        const formattedMinute = coMinute.toString().padStart(2, '0')
        return `CO @ ${formattedHour}:${formattedMinute} ${coPeriod}`
      }
      return s
    }).join('\n')
  }, [selected, ciHour, ciMinute, ciPeriod, coHour, coMinute, coPeriod])

  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <aside style={{ width: 280 }}>
        <h3>Options</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {OPTIONS.filter((opt) => {
            // Hide "no eta provided" if "CI @" is selected
            if (opt === 'no eta provided' && selected.includes('CI @')) {
              return false
            }
            // Hide "no etd provided" if "CO @" is selected
            if (opt === 'no etd provided' && selected.includes('CO @')) {
              return false
            }
            return true
          }).map((opt) => (
            <div key={opt}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={selected.includes(opt)}
                  onChange={() => toggle(opt)}
                />
                <span style={{ textTransform: 'uppercase' }}>{opt}</span>
              </label>

              {opt === 'CI @' && selected.includes('CI @') && (
                <div style={{ marginTop: 8, marginLeft: 24, padding: 8, border: '1px solid #ccc', borderRadius: 6 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={ciHour}
                      onChange={(e) => setCiHour(Math.max(1, Math.min(12, Number(e.target.value))))}
                      style={{ width: 50, padding: 4 }}
                    />
                    <span>:</span>
                    <select
                      value={ciMinute}
                      onChange={(e) => setCiMinute(Number(e.target.value))}
                      style={{ padding: 4 }}
                    >
                      <option value={0}>00</option>
                      <option value={15}>15</option>
                      <option value={30}>30</option>
                      <option value={45}>45</option>
                    </select>
                    <select
                      value={ciPeriod}
                      onChange={(e) => setCiPeriod(e.target.value as 'AM' | 'PM')}
                      style={{ padding: 4 }}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              )}

              {opt === 'CO @' && selected.includes('CO @') && (
                <div style={{ marginTop: 8, marginLeft: 24, padding: 8, border: '1px solid #ccc', borderRadius: 6 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={coHour}
                      onChange={(e) => setCoHour(Math.max(1, Math.min(12, Number(e.target.value))))}
                      style={{ width: 50, padding: 4 }}
                    />
                    <span>:</span>
                    <select
                      value={coMinute}
                      onChange={(e) => setCoMinute(Number(e.target.value))}
                      style={{ padding: 4 }}
                    >
                      <option value={0}>00</option>
                      <option value={15}>15</option>
                      <option value={30}>30</option>
                      <option value={45}>45</option>
                    </select>
                    <select
                      value={coPeriod}
                      onChange={(e) => setCoPeriod(e.target.value as 'AM' | 'PM')}
                      style={{ padding: 4 }}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      <section style={{ flex: 1 }}>
        <h3>Selected Text</h3>
        <textarea
          readOnly
          value={assembledText}
          rows={6}
          style={{ width: '100%', padding: 8, borderRadius: 6, resize: 'vertical' }}
        />
        <div style={{ marginTop: 8 }}>
          <CopyButton textToCopy={assembledText} />
        </div>
      </section>
    </div>
  )
}
