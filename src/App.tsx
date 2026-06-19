import { useState } from 'react'
import './App.css'
import Tabs from './components/Tabs'
import HotelNotesTemplate from './pages/HotelNotesTemplate'
import FeeCalculator from './pages/FeeCalculator'
import Back2Back from './pages/Back2Back'

const COLORS = {
  background: '#1e1e1e',
  surface: '#252526',
  border: '#3e3e42',
  text: '#cccccc',
  textBright: '#ffffff',
  accent: '#007acc',
}

export default function App() {
  const [tab, setTab] = useState<'hotel' | 'fee' | 'back2back'>('hotel')

  return (
    <div 
      className="app-root" 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: COLORS.background, 
        color: COLORS.text,
        maxWidth: 1400,
        margin: '0 auto'
      }}
    >
      <header style={{ 
        padding: '24px 40px', 
        backgroundColor: COLORS.surface, 
        borderBottom: `1px solid ${COLORS.border}`,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
      }}>
        <Tabs
          tabs={[
            { id: 'hotel', label: 'Hotel Notes Template' },
            { id: 'fee', label: 'Fee Calculator' },
            { id: 'back2back', label: 'Back2Back' },
          ]}
          active={tab}
          onChange={(id) => setTab(id as 'hotel' | 'fee' | 'back2back')}
        />
      </header>

      <main style={{ padding: '40px' }}>
        {tab === 'hotel' ? <HotelNotesTemplate /> : tab === 'fee' ? <FeeCalculator /> : <Back2Back />}
      </main>
    </div>
  )
}
