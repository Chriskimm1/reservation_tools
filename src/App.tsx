import { useState } from 'react'
import './App.css'
import Tabs from './components/Tabs'
import HotelNotesTemplate from './pages/HotelNotesTemplate'
import FeeCalculator from './pages/FeeCalculator'
import Back2Back from './pages/Back2Back'

export default function App() {
  const [tab, setTab] = useState<'hotel' | 'fee' | 'back2back'>('hotel')
  const [isDark, setIsDark] = useState(true)

  return (
    <div 
      className="app-root" 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
        color: isDark ? '#cccccc' : '#333333',
      }}
    >
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        <header style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 40px', 
          backgroundColor: isDark ? '#252526' : '#f5f5f5',
          borderBottom: `1px solid ${isDark ? '#3e3e42' : '#e0e0e0'}`,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ 
            fontSize: 26, 
            fontWeight: 600, 
            margin: 0,
            color: isDark ? '#ffffff' : '#000000'
          }}>
            Reservation Tools
          </h1>
          
          <button
            onClick={() => setIsDark(!isDark)}
            style={{
              padding: '10px 20px',
              borderRadius: 6,
              border: `1px solid ${isDark ? '#3e3e42' : '#e0e0e0'}`,
              backgroundColor: isDark ? '#2d2d30' : '#ffffff',
              color: isDark ? '#cccccc' : '#333333',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? '#3e3e42' : '#f0f0f0'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? '#2d2d30' : '#ffffff'
            }}
          >
            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </header>

        <div style={{ 
          padding: '24px 40px',
          borderBottom: `1px solid ${isDark ? '#3e3e42' : '#e0e0e0'}`,
          backgroundColor: isDark ? '#252526' : '#f5f5f5'
        }}>
          <Tabs
            tabs={[
              { id: 'hotel', label: 'Hotel Notes' },
              { id: 'fee', label: 'Fee Calculator' },
              { id: 'back2back', label: 'Back2Back' },
            ]}
            active={tab}
            onChange={(id) => setTab(id as 'hotel' | 'fee' | 'back2back')}
            isDark={isDark}
          />
        </div>

        <main style={{ padding: '40px' }}>
          {tab === 'hotel' && <HotelNotesTemplate isDark={isDark} />}
          {tab === 'fee' && <FeeCalculator isDark={isDark} />}
          {tab === 'back2back' && <Back2Back isDark={isDark} />}
        </main>
      </div>
    </div>
  )
}
