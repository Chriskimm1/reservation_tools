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
  {
    id: 'room-types',
    title: 'Room Types',
    guide: `**Wynn Resorts**

- RKD
- RDD
- PANVD
- PANDD
- PANCD

**Wynn Tower Suites**

- TK
- TKC
- TDC
- EXEC
- PARL
- SALN
- SALC
- FV1
- FV2
- ACCESS

**Encore Resorts**

- EK
- EQ
- EPK
- EPQ

**Encore Tower Suites**

- ESDK
- ESKC
- ESQC
- EPARL
- ESALN
- APT 2
- DUP3
- EACCESS`,
  },
  {
    id: 'folio-requests',
    title: 'Folio Requests',
    guide: `**Verify Primary Guest**

Confirm caller is the primary guest on the Opera reservation

Follow Confidentiality Policy procedures to verify identity

If all information matches, proceed to create trace

**Advise Guest**

"An email with your final folio attached will be sent to you within the next 24 hours."

**Create Trace Screen**

From reservation face, select Options, Traces, New

Fill required fields:
- From Date/To Date: Leave as today's date
- Time: Leave as current time
- Dept Code: FDC (Front Desk Call Center)
- Trace Text: Email Folio

Click OK to save trace`,
    notification: `⚠️ **POLICY REMINDERS:**

**Verification Required:**
- Must confirm caller is PRIMARY guest on reservation
- Follow all Confidentiality Policy procedures
- Do NOT process if caller is not primary guest

**Email Restrictions:**
- Folio sent to email address on profile ONLY
- Cannot add new email addresses to profile
- Do not create trace if not primary guest

**Guest Communication:**
- Always inform guest of 24-hour timeframe
- Folio will be emailed automatically by Front Desk Cashiers`,
  },
  {
    id: 'eci-lco',
    title: 'Early Check-in & Late Check-Out',
    guide: `**Check Item Inventory Screen**

From Reservation, click Item Inventory

Click Item Inv

**Select Item Class**

Select Item Class list of values (LOV)

Select 21 - Housekeeping, click OK

**Select Item Code**

Select appropriate Item Code LOV, place X next to item, click OK

ECI Options:
- ECIWYNN - Early Check In at Wynn ($75)
- ECIWYNN100 - Early Check In at Wynn ($100)
- ECIENCORE - Early Check In at Encore ($75)
- ECIENCORE100 - Early Check In at Encore ($100)

LCO Options:
- LCOWYNN - Late Check Out at Wynn ($100)
- LCOWYNN200 - Late Check Out at Wynn ($200)
- LCOENCORE - Late Check Out at Encore ($100)
- LCOENCORE200 - Late Check Out at Encore ($200)

**Item Inventory Availability Screen**

For ECI:
- Locate reservation arrival date
- Green column = allotted ECIs for that date
- Left column = remaining ECIs for that date
- If no availability at base price ($75), search for $100 option
- Input "1" in right column if guest agrees
- Select OK

For LCO:
- Locate reservation departure date
- Green column = allotted LCOs for that date
- Left column = remaining LCOs for that date
- If no availability at base price ($100), search for $200 option
- Input "1" in right column if guest agrees
- Select OK

**Add Specials / ETA / ETD**

In Specials field box, add ECI or LCO

For ECI:
- In ETA field box, add 11:00 AM if no ETA filled
- Arrival time may not be before 11:00 AM

For LCO:
- In ETD field box, add 4:00 PM
- Departure time may not be after 4:00 PM

**Add Packages**

Click Packages dropdown box, pop-up window appears, click New

Click Package drop-down box, type "cc" in find field, hit Enter

Select appropriate code and click OK

**Add S/C Display**

Click S/C Display open field text box

Manually input notation:
- For ECI: +Early Arrival @ $75 p/s (or $100 p/s)
- For LCO: +Late Departure @ $100 p/s (or $200 p/s)

**Add Fixed Charges**

Click Options, select Fixed Charges

Click New, another window appears

Select Once circle (one-time charge)

Fill required fields:
- Date: For ECI = check-in date, For LCO = one day prior to check-out
- TRN. Code: Correct package (ECI or LCO)
- Amount: 75.00 or 100.00 (or 200.00)
- Quantity: Always 1

Click OK`,
    notification: `⚠️ **IMPORTANT POLICIES:**

**ECI Timing:**
- Early Check-in as early as 11:00 AM on check-in date
- Based on availability upon arrival
- Guests can check in anytime between 11 AM - 1 PM

**LCO Timing:**
- Late Check-Out as late as 4:00 PM on check-out date

**Pricing:**
- ECI: $75 base or $100 increased price (plus tax)
- LCO: $100 base or $200 increased price (plus tax)

**EXCLUSIONS - Not Eligible:**
- Tower Suite Reservations
- Casino Reservations
- Resort Marketing Reservations (except paid/blended rates)
- Select Group/Convention Reservations (Passkey, Rooming List, Housing)
- May not be available Fridays, Saturdays, or Sundays (check Item Inventory)
- ECI not available for PANCD room type
- ECI not available for Same Day reservations

**VERIFY BEFORE OFFERING:**
- Availability updated daily and may change throughout the day
- Always check Item Inventory before communicating to guest

**CRITICAL REMINDERS:**

**ETA/ETD Times:**
- ECI: ETA must be 11:00 AM or later (cannot be before 11:00 AM)
- LCO: ETD must be 4:00 PM (cannot be after 4:00 PM)

**Fixed Charges Date:**
- ECI: Use check-in date
- LCO: Use one day PRIOR to check-out date

**S/C Display Format:**
- Always include pricing in notation
- ECI: +Early Arrival @ $75 p/s or $100 p/s
- LCO: +Late Departure @ $100 p/s or $200 p/s

**Package Code:**
- Search "cc" in Package field to find correct code`,
  },
]

// ── Component ────────────────────────────────────────────────
export default function Opera() {
  const [search, setSearch] = useState('')
  const [selectedGuide, setSelectedGuide] = useState<string>('')
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<Record<string, 'guide' | 'notification'>>({})
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const filteredGuides = GUIDES.filter(guide => {
    const searchLower = search.toLowerCase()
    
    // Search only in title (partial match)
    return guide.title.toLowerCase().includes(searchLower)
  })

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
            backgroundColor: 'var(--color-bg)',
            border: '2px solid var(--color-accent)',
            borderRadius: 8,
            marginTop: 8,
            maxHeight: 300,
            overflowY: 'auto',
            zIndex: 100,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.1)',
          }}>
            {filteredGuides.length > 0 ? (
              filteredGuides.map(guide => (
                <button
                  key={guide.id}
                  onClick={() => handleGuideSelect(guide.id)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    border: 'none',
                    backgroundColor: selectedGuide === guide.id ? 'var(--color-accent)' : 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: selectedGuide === guide.id ? '#ffffff' : 'var(--color-text-bright)',
                    fontSize: 15,
                    fontWeight: selectedGuide === guide.id ? 600 : 500,
                    transition: 'all 0.15s',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                  onMouseEnter={e => {
                    if (selectedGuide !== guide.id) {
                      e.currentTarget.style.backgroundColor = 'var(--color-surface)'
                      e.currentTarget.style.color = 'var(--color-text-bright)'
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
                padding: '14px 18px',
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
                        Important
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
                      <>
                        {/* All guides use step format, but Room Types gets 4 columns */}
                        <div 
                          className="opera-grid"
                          style={{ 
                            display: 'grid', 
                            gridTemplateColumns: guide.id === 'room-types' ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)', 
                            gap: '16px 20px',
                          }}
                        >
                          {parseGuideSteps(guide.guide).map((step, idx) => {
                            // Determine icon based on tower name for Room Types
                            let badgeContent = idx + 1
                            let badgeIcon = null
                            
                            if (guide.id === 'room-types') {
                              // Tower Suites get castle icon
                              if (step.screen.includes('Tower Suites')) {
                                badgeIcon = '🏰'
                              } else {
                                // Regular Resorts get building icon
                                badgeIcon = '🏢'
                              }
                            }
                            
                            return (
                            <div key={idx} style={{
                              position: 'relative',
                              paddingLeft: 40,
                            }}>
                              {/* Step number badge or tower icon */}
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
                              
                              {/* Screen/Section name */}
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                marginBottom: 6,
                              }}>
                                {/* Only show screen icon if it's not room-types AND contains "Screen" */}
                                {guide.id !== 'room-types' && step.screen.includes('Screen') && (
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
                              </div>                              {/* Step content */}
                              <div style={{
                                backgroundColor: 'var(--color-background)',
                                padding: '10px 12px',
                                borderRadius: 6,
                                border: '1px solid var(--color-border)',
                              }}>
                                {formatStepContent(step.content)}
                              </div>
                            </div>
                            )
                          })}
                        </div>
                      </>
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
