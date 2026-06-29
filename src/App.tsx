import { useEffect, useState } from 'react'
import './App.css'
import Tabs from './components/Tabs'
import Notepad from './components/Notepad'
import Logo from './components/Logo'
import Templates from './pages/Templates'
import FeeCalculator from './pages/FeeCalculator'
import Directory from './pages/Directory'
import Opera from './pages/Opera'
import Passkey from './pages/Passkey'
import General from './pages/General'
import ConfidentialityMatrix from './pages/ConfidentialityMatrix'

type TabId = 'templates' | 'fee' | 'directory' | 'opera' | 'passkey' | 'general' | 'confidentiality'

const TABS = [
  { id: 'templates',       label: 'Templates'              },
  { id: 'fee',             label: 'Fee Calculator'         },
  { id: 'directory',       label: 'Directory'              },
  { id: 'opera',           label: 'Opera'                  },
  { id: 'passkey',         label: 'PassKey'                },
  { id: 'general',         label: 'General'                },
  { id: 'confidentiality', label: 'Confidentiality Matrix' },
]

export default function App() {
  const [tab, setTab] = useState<TabId>('templates')
  const [templateSubTab, setTemplateSubTab] = useState<'newres' | 'ccauth'>('newres')
  const [isDark, setIsDark] = useState(true) // Default to dark mode
  const [notepadOpen, setNotepadOpen] = useState(false)

  // Sync data-theme on <html> — all CSS variables update automatically.
  // No inline colors or isDark props needed in child components.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Option+N (Mac) or Alt+N (PC/Linux) to toggle notepad
      // Check for both 'n' and 'N', and prevent default to avoid special characters
      if (e.altKey && (e.key === 'n' || e.key === 'N' || e.code === 'KeyN')) {
        e.preventDefault()
        e.stopPropagation()
        setNotepadOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown, true) // Use capture phase
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [])

  const handleNavigation = (target: string) => {
    if (target.includes(':')) {
      const [mainTab, subTab] = target.split(':')
      setTab(mainTab as TabId)
      if (mainTab === 'templates' && (subTab === 'newres' || subTab === 'ccauth')) {
        setTemplateSubTab(subTab)
      }
    } else {
      setTab(target as TabId)
    }
  }

  return (
    <div className="app-root">
      <div className="app-inner">

        <header className="app-header">
          <Logo />
          <div className="app-header__actions">
            <button
              className="app-header__notepad-btn"
              onClick={() => setNotepadOpen(!notepadOpen)}
              title="Toggle Notepad (Option+N or Alt+N)"
            >
              📝 Notepad
              <kbd className="keyboard-hint">Alt+N</kbd>
            </button>
            <button
              className="app-header__theme-btn"
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </header>

        <div className="app-tabs">
          <Tabs tabs={TABS} active={tab} onChange={(id) => setTab(id as TabId)} />
        </div>

        <main className="app-main">
          {tab === 'templates'       && <Templates key={templateSubTab} initialTemplate={templateSubTab} />}
          {tab === 'fee'             && <FeeCalculator />}
          {tab === 'directory'       && <Directory />}
          {tab === 'opera'           && <Opera onNavigateToTab={handleNavigation} />}
          {tab === 'passkey'         && <Passkey onNavigateToTab={handleNavigation} />}
          {tab === 'general'         && <General />}
          {tab === 'confidentiality' && <ConfidentialityMatrix />}
        </main>

        <Notepad isOpen={notepadOpen} onClose={() => setNotepadOpen(false)} />

      </div>
    </div>
  )
}
