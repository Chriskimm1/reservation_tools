import { useState, useEffect, useRef, Fragment } from 'react'
import './ConfidentialityMatrix.css'

interface Section {
  id: string
  title: string
  newResExisting?: string[]
  revisions?: string[]
}

const SECTIONS: Section[] = [
  {
    id: 'rooms',
    title: 'Rooms',
    newResExisting: [
      'New Profile: Requires a completed profile (home address, **DL #**, **phone #** and **email address**).',
      'Existing Profile: Book resv, verify existing information, update info if needed or missing.',
      'Spouse/Admin Reserving: Note the name, **phone #** and **email** of the person making the resv in comments.'
    ],
    revisions: [
      'Transient: Confirm **confirmation #** and **DL #**. *If no **DL #** avail, agent must implement a **call back** to phone # on file (same process if adding a spouse).',
      'Leisure (TA/Whls): Confirm **GDS confirmation #**'
    ]
  },
  {
    id: 'resort-marketing',
    title: 'Resort Marketing',
    newResExisting: [
      'Only the Rewards player can obtain info or make a reservation.',
      'Verify the **Wynn ID #**, **DL #** or **passport** Scanned onto their Patron acct.',
      'If **Wynn ID #** is not avail, verify Patron details: **DOB**, full address, **phone #** and **email** are acceptable.',
      'Always update any missing information.'
    ]
  },
  {
    id: 'spa-salon',
    title: 'Spa Salon',
    newResExisting: [
      'Appt for Non-Gst: Must collect **phone #**, **email address** and **credit card** for payment.',
      'Appt for Hotel Gst: (Follow gst with total resv below).',
      'Gst with Hotel Resv: Verify **stay dates**, name on resv and **DL #**.',
      'Non-Guest: Implement **call back** to phone # on file.'
    ]
  },
  {
    id: 'dining',
    title: 'Dining',
    newResExisting: [
      'Hotel Gst: Verify **stay dates**, name on resv and **DL #** (in the event there is no **DL #**, agent must implement a **call back**).',
      'Non-Hotel Gst: Implement **call back** to phone # on file.'
    ]
  },
  {
    id: 'show',
    title: 'Show',
    newResExisting: [
      'Booked by Wynn: Verify the full name on reservation, show details and **last 4 digits of the credit card** on file.',
      'TIX Booked: Verify the full name on reservation, show details and **last 4 digits of the credit card** on file. If no CC # avail, must direct caller back to TIX.'
    ]
  },
  {
    id: 'folio-billing',
    title: 'Folio & Billing',
    newResExisting: [
      'An Opera trace may be checked for callers requesting a copy of the stay folio or asking for clarification regarding billing.',
      'Agent must confirm **reservation stay dates**, confirm caller\'s first and last name match the registered gst, confirm the **DL #** or **Passport #** on file.',
      '*If no **DL #** avail, agent must implement a **call back** to phone # on file.'
    ]
  },
  {
    id: 'amenities',
    title: 'Amenities/Gift Cards/3rd Party Payment',
    newResExisting: [
      'Agent will obtain the caller\'s first and last name, **billing information** and **credit card number**, prior to confirming guest reservation.'
    ]
  },
  {
    id: 'golf-cabana',
    title: 'Golf/Cabana Res',
    newResExisting: [
      'Hotel Gst: Verify **stay dates**, full name on reservation and **DL #**.',
      'Non-Hotel Gst: Implement **call back** to phone # on file.'
    ]
  }
]

export default function ConfidentialityMatrix() {
  const [search, setSearch] = useState(() => localStorage.getItem('cm_search') || '')
  const [selectedSection, setSelectedSection] = useState<string>(() => 
    localStorage.getItem('cm_selectedSection') || SECTIONS[0]?.id || ''
  )

  const contentScrollRef = useRef<HTMLDivElement>(null)
  const selectedSectionRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    localStorage.setItem('cm_search', search)
  }, [search])

  useEffect(() => {
    localStorage.setItem('cm_selectedSection', selectedSection)
  }, [selectedSection])

  useEffect(() => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [selectedSection])

  useEffect(() => {
    if (selectedSectionRef.current) {
      selectedSectionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      })
    }
  }, [selectedSection])

  const filteredSections = SECTIONS.filter(section => {
    const searchLower = search.toLowerCase()
    return section.title.toLowerCase().includes(searchLower)
  })

  const currentSection = SECTIONS.find(s => s.id === selectedSection)

  // Function to parse text and highlight **keywords**
  const parseText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|^[^:]+:)/gm)
    return parts.map((part, index) => {
      // Highlight keywords wrapped in **
      if (part.startsWith('**') && part.endsWith('**')) {
        const keyword = part.slice(2, -2)
        return (
          <span key={index} className="cm-highlight">
            {keyword}
          </span>
        )
      }
      // Make label/category text bold (text before colon at start of line)
      if (part.match(/^[^:]+:$/)) {
        return (
          <strong key={index} className="cm-label">
            {part}
          </strong>
        )
      }
      // Auto-highlight the words "address" and "name" in remaining plain text
      return <Fragment key={index}>{highlightWords(part)}</Fragment>
    })
  }

  // Highlight specific standalone words (address, name) wherever they appear
  const highlightWords = (text: string) => {
    // Note: longer phrases (e.g. "home address") must come first so they
    // match before the standalone "address" alternative.
    const wordParts = text.split(/(\bhome address\b|\baddress\b|\bname\b)/gi)
    return wordParts.map((word, i) => {
      if (/^(home address|address|name)$/i.test(word)) {
        return (
          <span key={i} className="cm-highlight">
            {word}
          </span>
        )
      }
      return word
    })
  }

  return (
    <div className="cm-container">
      {/* Sidebar */}
      <div className="cm-sidebar">
        {/* Search Box */}
        <div className="cm-search-box">
          <input
            type="text"
            placeholder="Search sections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="cm-search-input"
          />
        </div>

        {/* Section List */}
        <div className="cm-section-list">
          {filteredSections.map((section) => (
            <button
              key={section.id}
              ref={section.id === selectedSection ? selectedSectionRef : null}
              onClick={() => setSelectedSection(section.id)}
              className={`cm-section-button ${section.id === selectedSection ? 'active' : ''}`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div ref={contentScrollRef} className="cm-content">
        <h2 className="cm-section-title">{currentSection?.title}</h2>

        <div className="cm-columns">
          {/* Left Column - New Res/Existing Booking */}
          {currentSection?.newResExisting && (
            <div className="cm-column">
              <h3 className="cm-column-heading">New Res/Existing Booking</h3>
              <ul className="cm-list">
                {currentSection.newResExisting.map((item, index) => (
                  <li key={index} className="cm-list-item">{parseText(item)}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Right Column - Revisions */}
          {currentSection?.revisions && (
            <div className="cm-column">
              <h3 className="cm-column-heading">Revisions</h3>
              <ul className="cm-list">
                {currentSection.revisions.map((item, index) => (
                  <li key={index} className="cm-list-item">{parseText(item)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
