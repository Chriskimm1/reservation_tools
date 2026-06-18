import { useState } from 'react'
import './App.css'
import Tabs from './components/Tabs'
import HotelNotesTemplate from './pages/HotelNotesTemplate'
import FeeCalculator from './pages/FeeCalculator'

export default function App() {
  const [tab, setTab] = useState<'hotel' | 'fee'>('hotel')

  return (
    <div className="app-root">
      <header style={{ padding: 16 }}>
        <Tabs
          tabs={[
            { id: 'hotel', label: 'Hotel Notes Template' },
            { id: 'fee', label: 'Fee Calculator' },
          ]}
          active={tab}
          onChange={(id) => setTab(id as 'hotel' | 'fee')}
        />
      </header>

      <main style={{ padding: 16 }}>
        {tab === 'hotel' ? <HotelNotesTemplate /> : <FeeCalculator />}
      </main>
    </div>
  )
}
