import { useState, useMemo, useEffect } from 'react'
import CopyButton from '../components/CopyButton'

const COVERAGE_OPTIONS = [
  'ROOM/TAX only for 1st night',
  'ROOM/TAX only for entire stay',
  'ROOM/TAX/RF for 1st night',
  'ROOM/TAX/RF for entire stay',
  'Resort Fee only for 1st night',
  'Resort Fee only for entire stay',
] as const

export default function CCAuthTrace() {
  const [operaConf, setOperaConf] = useState(() => localStorage.getItem('ccAuth_operaConf') || '')
  const [guestName, setGuestName] = useState(() => localStorage.getItem('ccAuth_guestName') || '')
  const [ccHolderName, setCcHolderName] = useState(() => localStorage.getItem('ccAuth_ccHolderName') || '')
  const [email, setEmail] = useState(() => localStorage.getItem('ccAuth_email') || '')
  const [phone, setPhone] = useState(() => localStorage.getItem('ccAuth_phone') || '')
  const [coverage, setCoverage] = useState(() => localStorage.getItem('ccAuth_coverage') || COVERAGE_OPTIONS[0])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('ccAuth_operaConf', operaConf)
  }, [operaConf])

  useEffect(() => {
    localStorage.setItem('ccAuth_guestName', guestName)
  }, [guestName])

  useEffect(() => {
    localStorage.setItem('ccAuth_ccHolderName', ccHolderName)
  }, [ccHolderName])

  useEffect(() => {
    localStorage.setItem('ccAuth_email', email)
  }, [email])

  useEffect(() => {
    localStorage.setItem('ccAuth_phone', phone)
  }, [phone])

  useEffect(() => {
    localStorage.setItem('ccAuth_coverage', coverage)
  }, [coverage])

  const resetAll = () => {
    setOperaConf('')
    setGuestName('')
    setCcHolderName('')
    setEmail('')
    setPhone('')
    setCoverage(COVERAGE_OPTIONS[0])
    
    localStorage.removeItem('ccAuth_operaConf')
    localStorage.removeItem('ccAuth_guestName')
    localStorage.removeItem('ccAuth_ccHolderName')
    localStorage.removeItem('ccAuth_email')
    localStorage.removeItem('ccAuth_phone')
    localStorage.removeItem('ccAuth_coverage')
  }

  // Convert full coverage text to short format for trace
  const getShortCoverage = (fullText: string): string => {
    const coverageMap: Record<string, string> = {
      'ROOM/TAX only for 1st night': 'ROOM/TAX',
      'ROOM/TAX only for entire stay': 'ROOM/TAX',
      'ROOM/TAX/RF for 1st night': 'ROOM/TAX/RF',
      'ROOM/TAX/RF for entire stay': 'ROOM/TAX/RF',
      'Resort Fee only for 1st night': 'Resort Fee',
      'Resort Fee only for entire stay': 'Resort Fee',
    }
    return coverageMap[fullText] || fullText
  }

  const traceText = useMemo(() => {
    const conf = operaConf || '[Opera Conf #]'
    const guest = guestName || '[Guest Name]'
    const holder = ccHolderName || '[CC Holder Name]'
    const emailAddr = email || '[Email Address]'
    const phoneNum = phone || '[Phone Number]'
    const shortCoverage = getShortCoverage(coverage)
    
    return `${conf} - ${guest}
CCH ${holder}
${emailAddr}
${phoneNum}
${shortCoverage}`
  }, [operaConf, guestName, ccHolderName, email, phone, coverage])

  return (
    <div className="page-layout">
      {/* ── LEFT: form ── */}
      <aside className="page-sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 className="page-heading" style={{ margin: 0 }}>CC Auth Trace</h2>
          <button 
            onClick={resetAll}
            className="btn-tertiary btn-tertiary--danger"
          >
            🗑️ Clear All
          </button>
        </div>

        {/* Opera Confirmation Number */}
        <div className="form-row">
          <label className="form-label">Opera Conf #</label>
          <input 
            type="text" 
            placeholder="e.g. 12345678"
            value={operaConf}
            onChange={e => setOperaConf(e.target.value)}
            className="field-input field-input--lg" 
          />
        </div>

        {/* Guest Name */}
        <div className="form-row">
          <label className="form-label">Guest Name</label>
          <input 
            type="text" 
            placeholder="e.g. John Smith"
            value={guestName}
            onChange={e => setGuestName(e.target.value)}
            className="field-input field-input--lg" 
          />
        </div>

        {/* CC Holder Name */}
        <div className="form-row">
          <label className="form-label">CC Holder</label>
          <input 
            type="text" 
            placeholder="e.g. Jane Smith"
            value={ccHolderName}
            onChange={e => setCcHolderName(e.target.value)}
            className="field-input field-input--lg" 
          />
        </div>

        {/* Email */}
        <div className="form-row">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            placeholder="e.g. guest@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="field-input field-input--lg" 
          />
        </div>

        {/* Phone */}
        <div className="form-row">
          <label className="form-label">Phone</label>
          <input 
            type="tel" 
            placeholder="e.g. 702-555-1234"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="field-input field-input--lg" 
          />
        </div>

        {/* Coverage Type */}
        <div className="form-row">
          <label className="form-label">Coverage</label>
          <select 
            value={coverage} 
            onChange={e => setCoverage(e.target.value)} 
            className="field-select field-select--lg"
            style={{ width: '100%' }}
          >
            {COVERAGE_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Trace Instructions */}
        <div style={{ 
          marginTop: 24, 
          padding: 16, 
          backgroundColor: 'var(--color-surface)', 
          border: '1px solid var(--color-border)',
          borderRadius: 6,
        }}>
          <h3 style={{ 
            margin: '0 0 12px', 
            fontSize: 14, 
            fontWeight: 600, 
            color: 'var(--color-text-bright)' 
          }}>
            📋 Trace Setup Instructions
          </h3>
          <ul style={{ 
            margin: 0, 
            paddingLeft: 20, 
            fontSize: 13, 
            color: 'var(--color-text)',
            lineHeight: 1.6,
          }}>
            <li>From Date: <strong>Tomorrow's date</strong></li>
            <li>To Date: <strong>Tomorrow's date</strong></li>
            <li>Time: <strong>05:00 AM</strong></li>
            <li>Dept Code: <strong>FOCC</strong></li>
            <li>Trace Text: Copy text from right →</li>
          </ul>
        </div>
      </aside>

      {/* ── RIGHT: output ── */}
      <section className="page-content">
        <h2 className="page-heading">Generated Trace Text</h2>
        <div style={{ maxWidth: 600 }}>
          <textarea 
            readOnly 
            value={traceText} 
            rows={6}
            className="field-textarea field-textarea--mono"
            style={{ width: '100%' }} 
          />
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-start' }}>
            <CopyButton textToCopy={traceText} />
          </div>
        </div>
      </section>
    </div>
  )
}
