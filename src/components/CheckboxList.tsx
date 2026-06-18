export default function CheckboxList({
  options,
  selected,
  onToggle,
}: {
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {options.map((opt) => (
        <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={selected.includes(opt)} onChange={() => onToggle(opt)} />
          <span style={{ textTransform: 'uppercase' }}>{opt}</span>
        </label>
      ))}
    </div>
  )
}
