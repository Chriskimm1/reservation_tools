import { useEffect, useState } from 'react'
import './App.css'
import Tabs from './components/Tabs'
import HotelNotesTemplate from './pages/HotelNotesTemplate'
import FeeCalculator from './pages/FeeCalculator'
import Directory from './pages/Directory'

type TabId = 'hotel' | 'fee' | 'directory'

const TABS = [
  { id: 'hotel',     label: 'Hotel Notes'    },
  { id: 'fee',       label: 'Fee Calculator' },
  { id: 'directory', label: 'Directory'      },
]

export default function App() {
  const [tab,    setTab]    = useState<TabId>('hotel')
  const [isDark, setIsDark] = useState(false)

  // Sync data-theme on <html> — all CSS variables update automatically.
  // No inline colors or isDark props needed in child components.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <div className="app-root">
      <div className="app-inner">

        <header className="app-header">
          <h1 className="app-header__title">Reservation Tools</h1>
          <button
            className="app-header__theme-btn"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </header>

        <div className="app-tabs">
          <Tabs tabs={TABS} active={tab} onChange={(id) => setTab(id as TabId)} />
        </div>

        <main className="app-main">
          {tab === 'hotel'     && <HotelNotesTemplate />}
          {tab === 'fee'       && <FeeCalculator />}
          {tab === 'directory' && <Directory />}
        </main>

      </div>
    </div>
  )
}
