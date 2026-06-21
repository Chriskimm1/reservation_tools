import { useMemo, useState, useEffect } from 'react'

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
  const [search, setSearch] = useState(() => localStorage.getItem('directory_search') || '')
  const [sortBy, setSortBy] = useState<'department' | 'wynn' | 'encore' | 'general'>(() => (localStorage.getItem('directory_sortBy') as any) || 'department')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(() => (localStorage.getItem('directory_sortDir') as 'asc' | 'desc') || 'asc')

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('directory_search', search)
  }, [search])

  useEffect(() => {
    localStorage.setItem('directory_sortBy', sortBy)
  }, [sortBy])

  useEffect(() => {
    localStorage.setItem('directory_sortDir', sortDir)
  }, [sortDir])

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
    <div className="page-layout directory-page">
      {/* ── LEFT: Searchable Directory ── */}
      <aside className="page-sidebar directory-table-section">
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
        <div className="directory-table-wrapper">
          <table className="directory-table">
            <thead>
              <tr>
                <th className="directory-th" onClick={() => toggleSort('department')}>
                  Department {sortBy === 'department' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th className="directory-th" onClick={() => toggleSort('wynn')}>
                  Wynn {sortBy === 'wynn' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th className="directory-th" onClick={() => toggleSort('encore')}>
                  Encore {sortBy === 'encore' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th className="directory-th" onClick={() => toggleSort('general')}>
                  General {sortBy === 'general' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.map((entry, i) => (
                <tr key={i} className="directory-tr">
                  <td className="directory-td">{entry.department}</td>
                  <td className="directory-td">
                    {entry.wynn && (
                      <span className="directory-extension">
                        <span style={wynnIconStyle}>W</span> {entry.wynn}
                      </span>
                    )}
                  </td>
                  <td className="directory-td">
                    {entry.encore && (
                      <span className="directory-extension">
                        <span style={encoreIconStyle}>E</span> {entry.encore}
                      </span>
                    )}
                  </td>
                  <td className="directory-td">{entry.general || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSorted.length === 0 && (
          <p className="directory-no-results">
            No results found for "{search}"
          </p>
        )}
      </aside>

      {/* ── RIGHT: Static Important Numbers ── */}
      <section className="page-content directory-quick-reference">
        <h2 className="page-heading">Quick Reference</h2>

        {/* Internal Call Center */}
        <div className="static-card">
          <h3 className="static-heading">Internal Call Center</h3>
          <div className="static-list">
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
        <div className="static-card">
          <h3 className="static-heading">Language Line</h3>
          <p className="language-line-number">
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
    <div className="static-entry">
      <span className="static-entry__label">{label}</span>
      <span className="static-entry__value">{value}</span>
    </div>
  )
}

// ── Styles ───────────────────────────────────────────────────
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
