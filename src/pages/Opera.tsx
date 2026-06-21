import { useState } from 'react'

// ── Types ────────────────────────────────────────────────────
interface GuideCard {
  id: string
  title: string
  guide: string
  notification?: string
}

// ── Data ─────────────────────────────────────────────────────
const GUIDES: GuideCard[] = [
  {
    id: 'new-reservation',
    title: 'New Reservation',
    guide: `**New Reservation Screen**

Select Reservation Tab on top and click New Reservation or press F7

Fill these fields:
- Arrival Date
- Number of Nights
- Adults, Children
- Default Num Rooms to 1 (Never set this to more than 1)

Select Room Type and Rate Code [Room Type is optional at this point]

Click OK or press ALT + O

**Rate Query Details Screen**

Select Room Type [If you haven't selected room type, this is where you can look at rates for a room by selecting the room type and clicking Rate Info]

Click OK or press ALT + O

**New Reservation Screen**

Attach a Profile to Res by hitting the ellipsis … or press ALT + (.) period

**Profile Search Screen**

Search Guest by Last Name, First Name, select the matching Profile, and click OK (edit any info if needed by clicking Edit before OK). If no Profile match, click New and create an individual profile. You will only ever create individual profiles in Opera.

Collect:
- First Name
- Last Name
- Salutation
- Address
- Phone Number
- Email Address

Click Save or ALT + S and click OK

**New Reservation Screen**

Fill required fields:
- Origin = Phone (always phone)
- ETA = Estimated time if available
- Payment = [CC Type, CC No, Exp Date]
- Res Type = Due
- Room Feat = [Any room request]
- Specials = [Any items, special occasions]
- Comment = [Template provided in Hotel Note Template page on this site]

Collect Deposit: Click Options, click Deposit/CXL

**Deposit Screen**

Deposit amount highlighted in blue (if reservation is revised/upgraded, this amount is not automatically updated)

Selecting payment will take you to deposit screen

**Cashier Login Screen**

Login

Select Yes to the pop-up

Enter payment amount and click OK

Close the Deposit confirmation, click Close`,
    notification: `⚠️ **YOU MUST DISCLOSE:**
- Incidental
- Resort Fee
- Deposit
- Cancellation Policy

**Example Language:**

"I show your reservation is for a Resort Suite King located in the Encore Resort. The arrival date is 02-06-15, Friday, for 3 nights with a departure on 02-09-15 and reserved under the name of Thalia Richardson. Your accommodations are for 1 adult(s) and 0 child(ren).

I appreciate your patience while I complete this transaction. As previously mentioned, a one-night deposit is required today for guarantee. I am charging your card at this time."

**REMEMBER TO:**
- State the Cancellation Policy after the charge
- Offer further assistance to complete their stay

**Property Closing w/Caller's Name:**

"Thank you for choosing Wynn Las Vegas! Your confirmation number for this reservation is 18023256. In the event of a cancellation, you must notify us 48 hrs prior to the arrival date for a full refund.

We appreciate your call today and look forward to your visit."`,
  },
]

// ── Component ────────────────────────────────────────────────
export default function Opera() {
  const [search, setSearch] = useState('')
  const [selectedGuide, setSelectedGuide] = useState<string>('')
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<Record<string, 'guide' | 'notification'>>({})
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const filteredGuides = GUIDES.filter(guide =>
    guide.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleGuideSelect = (guideId: string) => {
    setSelectedGuide(guideId)
    setExpandedCard(guideId)
    if (!activeTab[guideId]) {
      setActiveTab(prev => ({ ...prev, [guideId]: 'guide' }))
    }
    setSearch('')
    setIsDropdownOpen(false)
  }

  const toggleCard = (id: string) => {
    if (expandedCard === id) {
      setExpandedCard(null)
      setSelectedGuide('')
    } else {
      setExpandedCard(id)
      setSelectedGuide(id)
      if (!activeTab[id]) {
        setActiveTab(prev => ({ ...prev, [id]: 'guide' }))
      }
    }
  }

  const setTab = (id: string, tab: 'guide' | 'notification') => {
    setActiveTab(prev => ({ ...prev, [id]: tab }))
  }

  // Parse guide text into structured steps
  const parseGuideSteps = (text: string) => {
    const steps: Array<{ screen: string; content: string[] }> = []
    const lines = text.split('\n')
    let currentStep: { screen: string; content: string[] } | null = null

    lines.forEach(line => {
      // Check for screen header
      const screenMatch = line.match(/\*\*(.*?Screen)\*\*/)
      if (screenMatch) {
        if (currentStep) steps.push(currentStep)
        currentStep = { screen: screenMatch[1], content: [] }
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
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <h2 className="page-heading">Opera Guides</h2>

      {/* Searchable Dropdown */}
      <div style={{ marginBottom: 24, position: 'relative' }}>
        <input
          type="text"
          placeholder="Search or select a guide..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
          className="field-input field-input--full"
          style={{ paddingRight: 40 }}
        />
        <span style={{
          position: 'absolute',
          right: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          color: 'var(--color-text)',
          fontSize: 18,
        }}>
          🔍
        </span>
        
        {/* Dropdown List */}
        {isDropdownOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 8,
            marginTop: 4,
            maxHeight: 300,
            overflowY: 'auto',
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}>
            {filteredGuides.length > 0 ? (
              filteredGuides.map(guide => (
                <button
                  key={guide.id}
                  onClick={() => handleGuideSelect(guide.id)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: 'none',
                    backgroundColor: selectedGuide === guide.id ? 'var(--color-background)' : 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'var(--color-text-bright)',
                    fontSize: 14,
                    fontWeight: selectedGuide === guide.id ? 600 : 400,
                    transition: 'background-color 0.15s',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                  onMouseEnter={e => {
                    if (selectedGuide !== guide.id) {
                      e.currentTarget.style.backgroundColor = 'var(--color-background)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (selectedGuide !== guide.id) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  {guide.title}
                </button>
              ))
            ) : (
              <div style={{
                padding: '12px 16px',
                color: 'var(--color-text)',
                fontSize: 14,
                textAlign: 'center',
              }}>
                No guides found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {GUIDES.map(guide => {
          const isExpanded = expandedCard === guide.id
          const currentTab = activeTab[guide.id] || 'guide'

          return (
            <div
              key={guide.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              {/* Card Header */}
              <button
                onClick={() => toggleCard(guide.id)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: isExpanded ? 'var(--color-background)' : 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: 'var(--color-text-bright)',
                  fontWeight: 600,
                  fontSize: 16,
                  transition: 'background-color 0.15s',
                }}
              >
                <span>{guide.title}</span>
                <span style={{ fontSize: 18 }}>{isExpanded ? '−' : '+'}</span>
              </button>

              {/* Card Content */}
              {isExpanded && (
                <div>
                  {/* Tabs */}
                  <div style={{
                    display: 'flex',
                    borderBottom: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-background)',
                  }}>
                    <button
                      onClick={() => setTab(guide.id, 'guide')}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: currentTab === 'guide' ? 'var(--color-surface)' : 'transparent',
                        border: 'none',
                        borderBottom: currentTab === 'guide' ? '2px solid var(--color-accent)' : '2px solid transparent',
                        color: currentTab === 'guide' ? 'var(--color-text-bright)' : 'var(--color-text)',
                        fontWeight: currentTab === 'guide' ? 600 : 400,
                        fontSize: 13,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      Guide
                    </button>
                    {guide.notification && (
                      <button
                        onClick={() => setTab(guide.id, 'notification')}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: currentTab === 'notification' ? 'var(--color-surface)' : 'transparent',
                          border: 'none',
                          borderBottom: currentTab === 'notification' ? '2px solid var(--color-accent)' : '2px solid transparent',
                          color: currentTab === 'notification' ? 'var(--color-text-bright)' : 'var(--color-text)',
                          fontWeight: currentTab === 'notification' ? 600 : 400,
                          fontSize: 13,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                          transition: 'all 0.15s',
                        }}
                      >
                        <span style={{ fontSize: 14 }}>⚠️</span>
                        Notification
                      </button>
                    )}
                  </div>

                  {/* Tab Content */}
                  <div style={{
                    padding: '16px',
                    color: 'var(--color-text)',
                    backgroundColor: 'var(--color-surface)',
                  }}>
                    {currentTab === 'guide' && (
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(2, 1fr)', 
                        gap: '16px 20px',
                      }}>
                        {parseGuideSteps(guide.guide).map((step, idx) => (
                          <div key={idx} style={{
                            position: 'relative',
                            paddingLeft: 40,
                          }}>
                            {/* Step number badge */}
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
                              fontSize: 12,
                            }}>
                              {idx + 1}
                            </div>
                            
                            {/* Screen name */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              marginBottom: 6,
                            }}>
                              <span style={{ fontSize: 15 }}>🖥️</span>
                              <h3 style={{
                                margin: 0,
                                fontSize: 14,
                                fontWeight: 700,
                                color: 'var(--color-text-bright)',
                              }}>
                                {step.screen}
                              </h3>
                            </div>

                            {/* Step content */}
                            <div style={{
                              backgroundColor: 'var(--color-background)',
                              padding: '10px 12px',
                              borderRadius: 6,
                              border: '1px solid var(--color-border)',
                            }}>
                              {formatStepContent(step.content)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {currentTab === 'notification' && guide.notification && (
                      <div style={{ maxWidth: 700 }}>
                        {formatNotificationText(guide.notification)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
