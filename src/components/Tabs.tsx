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
    <nav className="tabs">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`tab-btn${active === t.id ? ' active' : ''}`}
        >
          {t.label}
        </button>
      ))}
    </nav>
  )
}
