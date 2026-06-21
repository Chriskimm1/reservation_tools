// filepath: /Users/chriskim/projects/reservation_tools/src/components/Tabs.tsx
type TabItem = { id: string; label: string }

export default function Tabs({
  tabs,
  active,
  onChange,
  isDark,
}: {
  tabs: TabItem[]
  active: string
  onChange: (id: string) => void
  isDark: boolean
}) {
  const COLORS = {
    surface: isDark ? '#252526' : '#f5f5f5',
    border: isDark ? '#3e3e42' : '#e0e0e0',
    text: isDark ? '#cccccc' : '#333333',
    accent: isDark ? '#007acc' : '#0078d4',
  }

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
            color: active === t.id ? '#ffffff' : COLORS.text,
            marginRight: index < tabs.length - 1 ? 12 : 0,
            transition: 'all 0.2s ease',
            fontSize: 15,
            fontWeight: active === t.id ? 600 : 400,
          }}
          onMouseOver={(e) => {
            if (active !== t.id) {
              e.currentTarget.style.borderColor = COLORS.accent
            }
          }}
          onMouseOut={(e) => {
            if (active !== t.id) {
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
