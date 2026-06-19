type TabItem = { id: string; label: string }

const COLORS = {
  background: '#1e1e1e',
  surface: '#252526',
  border: '#3e3e42',
  text: '#cccccc',
  textBright: '#ffffff',
  accent: '#007acc',
  accentHover: '#005a9e',
}

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
    <nav className="tabs" style={{ display: 'flex' }}>
      {tabs.map((t, index) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`tab-btn ${active === t.id ? 'active' : ''}`}
          style={{
            padding: '12px 24px',
            borderRadius: 6,
            border: `1px solid ${active === t.id ? COLORS.accent : COLORS.border}`,
            cursor: 'pointer',
            background: active === t.id ? COLORS.accent : COLORS.surface,
            color: active === t.id ? COLORS.textBright : COLORS.text,
            marginRight: index < tabs.length - 1 ? 12 : 0,
            transition: 'all 0.2s ease',
            fontSize: 15,
            fontWeight: active === t.id ? 600 : 400,
          }}
          onMouseOver={(e) => {
            if (active !== t.id) {
              e.currentTarget.style.backgroundColor = COLORS.background
              e.currentTarget.style.borderColor = COLORS.accent
            }
          }}
          onMouseOut={(e) => {
            if (active !== t.id) {
              e.currentTarget.style.backgroundColor = COLORS.surface
              e.currentTarget.style.borderColor = COLORS.border
            }
          }}
        >
          {t.label}
        </button>
      ))}
    </nav>
  )
}
