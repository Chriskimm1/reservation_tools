type TabItem = { id: string; label: string }

export default function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: TabItem[]
  active: string
  onChange: (id: string) => void
}) {
  return (
    <nav className="tabs" style={{ display: 'flex', gap: 8 }}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`tab-btn ${active === t.id ? 'active' : ''}`}
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
            background: active === t.id ? 'var(--accent, #007acc)' : 'transparent',
            color: active === t.id ? 'white' : 'inherit',
          }}
        >
          {t.label}
        </button>
      ))}
    </nav>
  )
}
