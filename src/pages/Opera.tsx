import { useState, useEffect } from 'react'
import { GUIDES } from '../data/guides'

// ── Component ────────────────────────────────────────────────
export default function Opera() {
  const [search, setSearch] = useState(() => localStorage.getItem('opera_search') || '')
  const [selectedGuide, setSelectedGuide] = useState<string>(() => localStorage.getItem('opera_selectedGuide') || GUIDES[0]?.id || '')
  const [activeTab, setActiveTab] = useState<'guide' | 'notification'>(() => {
    const saved = localStorage.getItem('opera_activeTab')
    return (saved as 'guide' | 'notification') || 'guide'
  })

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('opera_search', search)
  }, [search])

  useEffect(() => {
    localStorage.setItem('opera_selectedGuide', selectedGuide)
  }, [selectedGuide])

  useEffect(() => {
    localStorage.setItem('opera_activeTab', activeTab)
  }, [activeTab])

  const filteredGuides = GUIDES.filter(guide => {
    const searchLower = search.toLowerCase()
    return guide.title.toLowerCase().includes(searchLower)
  })

  const handleGuideSelect = (guideId: string) => {
    setSelectedGuide(guideId)
    setActiveTab('guide')
  }

  const currentGuide = GUIDES.find(g => g.id === selectedGuide)

  // Parse guide text into structured steps
  const parseGuideSteps = (text: string) => {
    const steps: Array<{ screen: string; content: string[] }> = []
    const lines = text.split('\n')
    let currentStep: { screen: string; content: string[] } | null = null

    lines.forEach(line => {
      // Check for any header in ** ** format
      const headerMatch = line.match(/^\*\*(.*?)\*\*$/)
      if (headerMatch) {
        if (currentStep) steps.push(currentStep)
        currentStep = { screen: headerMatch[1], content: [] }
      } else if (currentStep && line.trim()) {
        currentStep.content.push(line)
      }
    })
    if (currentStep) steps.push(currentStep)
    return steps
  }

  const formatStepContent = (lines: string[]) => {
    return lines.map((line, i) => {
      // Action items (lines starting with -)
      if (line.trim().startsWith('-')) {
        const content = line.trim().substring(1).trim()
        return (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 6,
            margin: '3px 0',
            paddingLeft: 2,
          }}>
            <span style={{ 
              color: 'var(--color-accent)', 
              fontWeight: 700, 
              fontSize: 11,
              marginTop: 1,
            }}>▸</span>
            <span style={{ fontSize: 12, lineHeight: 1.3, color: 'var(--color-text)' }}>
              {content}
            </span>
          </div>
        )
      }
      // Regular instruction lines
      if (line.trim()) {
        // Detect keyboard shortcuts like "F7", "ALT + O"
        const hasShortcut = /\b(F\d+|ALT \+ \w+|CTRL \+ \w+)\b/.test(line)
        
        return (
          <div key={i} style={{
            margin: '4px 0',
            fontSize: 12,
            lineHeight: 1.4,
            color: 'var(--color-text)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            {hasShortcut && (
              <span style={{ fontSize: 13 }}>⌨️</span>
            )}
            <span>{line.trim()}</span>
          </div>
        )
      }
      return null
    })
  }

  const formatNotificationText = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Bold warnings and section headers
      if (line.includes('**')) {
        const parts = line.split('**')
        return (
          <div key={i} style={{ 
            margin: '10px 0 5px', 
            fontWeight: 700, 
            fontSize: 13, 
            lineHeight: 1.3,
            color: 'var(--color-text-bright)',
          }}>
            {parts.map((part, j) =>
              j % 2 === 1 ? <strong key={j}>{part}</strong> : part
            )}
          </div>
        )
      }
      // Action items (lines starting with -)
      if (line.trim().startsWith('-')) {
        return (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 6,
            margin: '3px 0',
            paddingLeft: 2,
            fontSize: 12,
            lineHeight: 1.3,
          }}>
            <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: 11 }}>▸</span>
            <span>{line.trim().substring(1).trim()}</span>
          </div>
        )
      }
      // Empty lines
      if (line.trim() === '') {
        return <div key={i} style={{ height: 4 }} />
      }
      // Regular lines
      if (line.trim()) {
        return (
          <div key={i} style={{
            margin: '4px 0',
            fontSize: 12,
            lineHeight: 1.4,
          }}>
            {line.trim()}
          </div>
        )
      }
      return null
    })
  }

  return (
    <div style={{ 
      display: 'flex',
      height: 'calc(100vh - 180px)',
      gap: 60,
      overflow: 'hidden',
    }}>
      {/* ── LEFT: sidebar with search and guide list ── */}
      <aside style={{
        width: 480,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <h2 className="page-heading">Opera Guides</h2>
        
        {/* Search Bar */}
        <div style={{ marginBottom: 16, position: 'relative', flexShrink: 0 }}>
          <input
            type="text"
            placeholder="Search guides..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="field-input field-input--full"
            style={{ paddingRight: 40 }}
          />
          <span style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: 'var(--color-text-muted)',
            fontSize: 16,
          }}>
            🔍
          </span>
        </div>

        {/* Guide List - Scrollable */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 4,
          overflowY: 'auto',
          paddingRight: 8,
        }}>
          {filteredGuides.length > 0 ? (
            filteredGuides.map(guide => (
              <button
                key={guide.id}
                onClick={() => handleGuideSelect(guide.id)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: selectedGuide === guide.id ? 'var(--color-accent)' : 'var(--color-surface)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: selectedGuide === guide.id ? '#ffffff' : 'var(--color-text-bright)',
                  fontSize: 14,
                  fontWeight: selectedGuide === guide.id ? 600 : 500,
                  transition: 'all 0.15s',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={e => {
                  if (selectedGuide !== guide.id) {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                  }
                }}
                onMouseLeave={e => {
                  if (selectedGuide !== guide.id) {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                  }
                }}
              >
                <span>{guide.title}</span>
                {guide.notification && (
                  <span style={{ fontSize: 13 }}>⚠️</span>
                )}
              </button>
            ))
          ) : (
            <div style={{
              padding: '16px',
              color: 'var(--color-text)',
              fontSize: 14,
              textAlign: 'center',
            }}>
              No guides found
            </div>
          )}
        </div>
      </aside>

      {/* ── RIGHT: selected guide content ── */}
      <section style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {currentGuide ? (
          <>
            <div style={{ flexShrink: 0 }}>
              <h2 className="page-heading">{currentGuide.title}</h2>

              {/* Tabs */}
              <div style={{
                display: 'flex',
                gap: 8,
                marginBottom: 20,
                borderBottom: '2px solid var(--color-border)',
              }}>
                <button
                  onClick={() => setActiveTab('guide')}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: activeTab === 'guide' ? '2px solid var(--color-accent)' : '2px solid transparent',
                    color: activeTab === 'guide' ? 'var(--color-text-bright)' : 'var(--color-text)',
                    fontWeight: activeTab === 'guide' ? 600 : 400,
                    fontSize: 14,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    marginBottom: -2,
                  }}
                >
                  Guide
                </button>
                {currentGuide.notification && (
                  <button
                    onClick={() => setActiveTab('notification')}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: activeTab === 'notification' ? '2px solid var(--color-accent)' : '2px solid transparent',
                      color: activeTab === 'notification' ? 'var(--color-text-bright)' : 'var(--color-text)',
                      fontWeight: activeTab === 'notification' ? 600 : 400,
                      fontSize: 14,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      transition: 'all 0.15s',
                      marginBottom: -2,
                    }}
                  >
                    <span style={{ fontSize: 14 }}>⚠️</span>
                    Important
                  </button>
                )}
              </div>
            </div>

            {/* Tab Content - Scrollable */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              paddingRight: 8,
            }}>
              {activeTab === 'guide' && (
                <div 
                  className="opera-grid"
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: currentGuide.id === 'room-types' ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)', 
                    gap: '16px 20px',
                  }}
                >
                  {parseGuideSteps(currentGuide.guide).map((step, idx) => {
                    let badgeContent = idx + 1
                    let badgeIcon = null
                    
                    if (currentGuide.id === 'room-types') {
                      if (step.screen.includes('Tower Suites')) {
                        badgeIcon = '🏰'
                      } else {
                        badgeIcon = '🏢'
                      }
                    }
                    
                    return (
                      <div key={idx} style={{
                        position: 'relative',
                        paddingLeft: 40,
                      }}>
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: 1,
                          width: 26,
                          height: 26,
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-accent)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: badgeIcon ? 14 : 12,
                        }}>
                          {badgeIcon || badgeContent}
                        </div>
                        
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          marginBottom: 6,
                        }}>
                          {currentGuide.id !== 'room-types' && step.screen.includes('Screen') && (
                            <span style={{ fontSize: 15 }}>🖥️</span>
                          )}
                          <h3 style={{
                            margin: 0,
                            fontSize: 14,
                            fontWeight: 700,
                            color: 'var(--color-text-bright)',
                          }}>
                            {step.screen}
                          </h3>
                        </div>
                        
                        <div style={{
                          backgroundColor: 'var(--color-background)',
                          padding: '10px 12px',
                          borderRadius: 6,
                          border: '1px solid var(--color-border)',
                          boxShadow: 'var(--shadow-sm)',
                        }}>
                          {formatStepContent(step.content)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
              
              {activeTab === 'notification' && currentGuide.notification && (
                <div style={{ maxWidth: 700 }}>
                  {formatNotificationText(currentGuide.notification)}
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '400px',
            color: 'var(--color-text)',
            fontSize: 16,
          }}>
            Select a guide from the list
          </div>
        )}
      </section>
    </div>
  )
}
