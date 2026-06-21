import { useMemo, useState } from 'react'

// ── Types ────────────────────────────────────────────────────
interface DirectoryEntry {
  department: string
  wynn?: string
  encore?: string
  general?: string
}

// ── Data ─────────────────────────────────────────────────────
const DUAL_LOCATION_ENTRIES: DirectoryEntry[] = [
  { department: 'Business Center', wynn: '2370', encore: '4340' },
  { department: 'Bell Desk', wynn: '2219', encore: '4399' },
  { department: 'Cabanas', wynn: '3875', encore: '4434' },
  { department: 'Front Desk', wynn: '2150', encore: '4000' },
  { department: 'Head Cashier', wynn: '2163', encore: '4019' },
  { department: 'Hertz', wynn: '2204' },
  { department: 'In-Room Dining', wynn: '3665', encore: '4635' },
]

const GENERAL_ENTRIES: DirectoryEntry[] = [
  { department: 'Accounting', general: '2540' },
  { department: 'Box Office', general: '2270' },
  { department: 'Casino Credit', general: '2590' },
  { department: 'Concierge', general: '7070' },
  { department: 'Convention Desk', general: '2236' },
  { department: 'Group Desk (In House Conv. Only)', general: '2160' },
  { department: 'Customer Experience', general: '7530' },
  { department: 'Hotel Sales (41+ rooms)', general: '7800' },
  { department: 'Lost & Found', general: '7099' },
  { department: 'Poker Resv.', general: '3094' },
  { department: 'Private Access', general: '2100' },
  { department: 'Resort Group Dining (13+ guests)', general: '2251' },
  { department: 'Security', general: '2820' },
  { department: 'Speciality Reservations (9-40 rooms)', general: '2223' },
  { department: 'Wedding Salon', general: '7400' },
  { department: 'Wholesale', general: '2246' },
  { department: 'Wynn Nightlife', general: '7300' },
]

const ALL_ENTRIES = [...DUAL_LOCATION_ENTRIES, ...GENERAL_ENTRIES]

// ── Component ────────────────────────────────────────────────
export default function Directory() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'department' | 'wynn' | 'encore' | 'general'>('department')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const filteredAndSorted = useMemo(() => {
    let results = ALL_ENTRIES.filter(entry => {
      if (!search.trim()) return true
      const searchLower = search.toLowerCase()
      return (
        entry.department.toLowerCase().includes(searchLower) ||
        entry.wynn?.includes(search) ||
        entry.encore?.includes(search) ||
        entry.general?.includes(search)
      )
    })

    results.sort((a, b) => {
      let aVal = ''
      let bVal = ''

      if (sortBy === 'department') {
        aVal = a.department
        bVal = b.department
      } else if (sortBy === 'wynn') {
        aVal = a.wynn || ''
        bVal = b.wynn || ''
      } else if (sortBy === 'encore') {
        aVal = a.encore || ''
        bVal = b.encore || ''
      } else if (sortBy === 'general') {
        aVal = a.general || ''
        bVal = b.general || ''
      }

      const comparison = aVal.localeCompare(bVal)
      return sortDir === 'asc' ? comparison : -comparison
    })

    return results
  }, [search, sortBy, sortDir])

  const toggleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortDir('asc')
    }
  }

  return (
    <div className="page-layout">
      {/* ── LEFT: Searchable Directory ── */}
      <aside className="page-sidebar" style={{ width: '60%', marginRight: 32 }}>
        <h2 className="page-heading">Directory</h2>

        {/* Search */}
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search departments or extensions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="field-input field-input--lg"
            style={{ width: '100%' }}
          />
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-background)', borderBottom: '2px solid var(--color-border)' }}>
                <th style={headerStyle} onClick={() => toggleSort('department')}>
                  Department {sortBy === 'department' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th style={headerStyle} onClick={() => toggleSort('wynn')}>
                  Wynn {sortBy === 'wynn' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th style={headerStyle} onClick={() => toggleSort('encore')}>
                  Encore {sortBy === 'encore' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th style={headerStyle} onClick={() => toggleSort('general')}>
                  General {sortBy === 'general' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.map((entry, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={cellStyle}>{entry.department}</td>
                  <td style={cellStyle}>
                    {entry.wynn && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={wynnIconStyle}>W</span> {entry.wynn}
                      </span>
                    )}
                  </td>
                  <td style={cellStyle}>
                    {entry.encore && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={encoreIconStyle}>E</span> {entry.encore}
                      </span>
                    )}
                  </td>
                  <td style={cellStyle}>{entry.general || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSorted.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--color-text)', marginTop: 20 }}>
            No results found for "{search}"
          </p>
        )}
      </aside>

      {/* ── RIGHT: Static Important Numbers ── */}
      <section className="page-content" style={{ width: '35%' }}>
        <h2 className="page-heading">Quick Reference</h2>

        {/* Internal Call Center */}
        <div style={staticCardStyle}>
          <h3 style={staticHeadingStyle}>Internal Call Center</h3>
          <div style={staticListStyle}>
            <StaticEntry label="Manager" value="2259" />
            <StaticEntry label="Rooms" value="7100" />
            <StaticEntry label="Dining" value="3463" />
            <StaticEntry label="Show" value="7469" />
            <StaticEntry label="F1 Line" value="7112" />
            <StaticEntry label="RM" value="7777" />
            <StaticEntry label="W SPA" value="3900" />
            <StaticEntry label="E SPA" value="4772" />
          </div>
        </div>

        {/* Language Line */}
        <div style={{ ...staticCardStyle, marginTop: 20 }}>
          <h3 style={staticHeadingStyle}>Language Line</h3>
          <p style={{
            fontSize: 18,
            fontWeight: 600,
            color: 'var(--color-accent)',
            margin: 0,
            fontFamily: 'monospace',
          }}>
            888-317-4078
          </p>
        </div>
      </section>
    </div>
  )
}

// ── Helper Component ─────────────────────────────────────────
function StaticEntry({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 0',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>{label}:</span>
      <span style={{ fontWeight: 600, color: 'var(--color-text-bright)', fontFamily: 'monospace' }}>
        {value}
      </span>
    </div>
  )
}

// ── Styles ───────────────────────────────────────────────────
const headerStyle: React.CSSProperties = {
  padding: '12px 16px',
  textAlign: 'left',
  fontWeight: 600,
  color: 'var(--color-text-bright)',
  cursor: 'pointer',
  userSelect: 'none',
  fontSize: 14,
}

const cellStyle: React.CSSProperties = {
  padding: '12px 16px',
  color: 'var(--color-text)',
  fontSize: 14,
}

const wynnIconStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: '#d4af37',
  color: '#000',
  fontSize: 11,
  fontWeight: 700,
}

const encoreIconStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: '#c0504d',
  color: '#fff',
  fontSize: 11,
  fontWeight: 700,
}

const staticCardStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  padding: 20,
  borderRadius: 8,
  border: '1px solid var(--color-border)',
}

const staticHeadingStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  color: 'var(--color-text-bright)',
  marginTop: 0,
  marginBottom: 16,
}

const staticListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}
