import { useState, useEffect, useRef } from 'react'
import RoomDescriptions from '../components/RoomDescriptions'
import './General.css'

const SECTIONS = [
  { id: 'room-reservation-highlights', title: 'Room Reservation Highlights' },
  { id: 'room-descriptions', title: 'Room Descriptions' }
]

export default function General() {
  const [search, setSearch] = useState(() => localStorage.getItem('general_search') || '')
  const [selectedSection, setSelectedSection] = useState<string>(() => localStorage.getItem('general_selectedSection') || SECTIONS[0]?.id || '')

  const contentScrollRef = useRef<HTMLDivElement>(null)
  const selectedSectionRef = useRef<HTMLButtonElement>(null)

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('general_search', search)
  }, [search])

  useEffect(() => {
    localStorage.setItem('general_selectedSection', selectedSection)
  }, [selectedSection])

  // Scroll content to top when section changes
  useEffect(() => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [selectedSection])

  // Scroll selected section into view in the sidebar
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

  return (
    <div className="general-container">
      {/* Sidebar */}
      <div className="general-sidebar">
        {/* Search Box */}
        <div className="general-search-box">
          <input
            type="text"
            placeholder="Search sections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="general-search-input"
          />
        </div>

        {/* Section List */}
        <div className="general-section-list">
          {filteredSections.map(section => (
            <button
              key={section.id}
              ref={selectedSection === section.id ? selectedSectionRef : null}
              onClick={() => setSelectedSection(section.id)}
              className={`general-section-button ${selectedSection === section.id ? 'active' : ''}`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div ref={contentScrollRef} className="general-content">
        <h2 className="general-content-title">
          {currentSection?.title}
        </h2>

        {/* Content */}
        <div className="general-content-body">
          {/* Room Descriptions Section */}
          {selectedSection === 'room-descriptions' && <RoomDescriptions />}

          {/* Room Reservation Highlights Section */}
          {selectedSection === 'room-reservation-highlights' && (
            <>
          {/* Greeting */}
          <h3 className="general-section-heading">GREETING:</h3>
          <div className="general-section-content">
            <p className="general-text"><strong>Good Morning</strong> (7am-11:59am)</p>
            <p className="general-text"><strong>Afternoon</strong> (12pm-4:59pm)</p>
            <p className="general-text"><strong>Evening</strong> (5pm-closing)</p>
            <p className="general-text-spaced">Thank you for calling Wynn and Encore Las Vegas.</p>
            <p className="general-text-tight">For quality assurance, this call is being recorded. My name is Jordyn, how may I assist you?</p>
            <p className="general-text-spaced"><strong>CALLBACK GREETING:</strong> This is Jordyn with Wynn and Encore Las Vegas on a recorded line</p>
            <p className="general-text-spaced"><strong>END GREETING:</strong> Thank you for calling Wynn and Encore Las Vegas, we look forward to your visit.</p>
          </div>

          {/* Order of Call */}
          <h3 className="general-section-heading">ORDER OF CALL</h3>
          <ol className="general-list">
            <li className="general-list-item">Greeting</li>
            <li className="general-list-item">GSTS name (WR#?), number of people</li>
            <li className="general-list-item">Reason for travel (acknowledge reasoning)</li>
            <li className="general-list-item">Dates</li>
            <li className="general-list-item">Room type/preferences</li>
            <li className="general-list-item">Booking</li>
            <li className="general-list-item">Reconfirm</li>
            <li className="general-list-item">Follow up reason for stay</li>
            <li className="general-list-item">Offer conf number/email</li>
            <li className="general-list-item">Offer 2 additional services</li>
          </ol>

          {/* Quality Assurance */}
          <h3 className="general-section-heading">QUALITY ASSURANCE:</h3>
          <div className="general-section-content">
            <p className="general-subheading">REMEMBER THESE THINGS:</p>
            <ul className="general-list-tight">
              <li className="general-list-item">Greeting: 12PM Afternoon/5PM Evening</li>
              <li className="general-list-item">Last Name: USE IT</li>
              <li className="general-list-item">What's bringing you to Las Vegas?</li>
              <li className="general-list-item">Acknowledge reason for visit</li>
              <li className="general-list-item">Mention 2 rooms and describe them (rooms only)</li>
              <li className="general-list-item">Policies</li>
              <li className="general-list-item">Confirmation</li>
              <li className="general-list-item">Circle Back reason for visit</li>
              <li className="general-list-item">Offer Additional Service</li>
              <li className="general-list-item">Thank you for calling Wynn and Encore Las Vegas. We look forward to your visit for ______________.</li>
            </ul>
          </div>

          {/* Policies */}
          <h3 className="general-section-heading">POLICIES:</h3>
          <div className="general-section-content">
            <p className="general-subheading">ROOMS: (FULLY PAID CP, DUE)</p>
            <p className="general-paragraph">When you check into the room you will need your photo ID with the same booking cc upon arrival.</p>
            <p className="general-paragraph">There is a $150 ($500 for hi-end suites) incidental hold per night, for charges to the room. If no charges are made this hold will be returned at the end of your stay. If you need to cancel the reservation, please contact us 48hrs prior to the arrival date for refund of deposit. If you contact us less than 48hrs you will forfeit the first night room and tax. Standard check-in time is at 3pm and check out at 12 noon.</p>
            <p className="general-subheading-extra-spaced">ROOM RES COMMENTS COPY/PASTE:</p>
            <p className="general-code-block">QTD (rm type) $(rate)+TX advised $55/day RF advised INC $150/day (48 or 72)HR CXL policy or forfeit 1ST NT DEP advised booking CC and valid ID must be present @ CHK in //your sign off</p>
          </div>

          {/* Quoting Order */}
          <h3 className="general-section-heading">QUOTING ORDER:</h3>
          <ol className="general-list">
            <li className="general-list-item">Room description</li>
            <li className="general-list-item">Date/Rate</li>
            <li className="general-list-item">$55+tax RF</li>
            <li className="general-list-item">Grand total</li>
          </ol>

          {/* Reconfirm Order */}
          <h3 className="general-section-heading">RECONFIRM ORDER:</h3>
          <ol className="general-list">
            <li className="general-list-item">Arrival date (i.e "Monday January 1st")</li>
            <li className="general-list-item"># of nights</li>
            <li className="general-list-item">Departure date (i.e "Tuesday January 2nd")</li>
            <li className="general-list-item">Room Type</li>
            <li className="general-list-item">ETA</li>
            <li className="general-list-item">Promo (IF APPLICABLE)</li>
            <li className="general-list-item">Room Features/Specials</li>
            <li className="general-list-item">Guest name</li>
            <li className="general-list-item">Reason for stay</li>
          </ol>

          {/* Rates */}
          <h3 className="general-section-heading">RACK/PREVAILING RATES (72HR CXL POLICY):</h3>
          <ul className="general-list">
            <li className="general-list-item">WYNN 72HR CXL</li>
            <li className="general-list-item">ENCORE 72HR CXL</li>
            <li className="general-list-item">WEBRATES</li>
          </ul>

          {/* Travel Agent Info */}
          <h3 className="general-section-heading">TRAVEL AGENT INFO:</h3>
          <div className="general-section-content">
            <p className="general-text-italic">(travel agents can use wynn or encore rate codes to book for guest and add IATA# in opera)</p>
            <ul className="general-list-compact">
              <li className="general-list-item">WYNN 72HR CXL</li>
              <li className="general-list-item">ENCORE 72HR CXL</li>
              <li className="general-list-item">WEBRATES</li>
            </ul>
            <p className="general-subheading-spaced">TVAGT (if travel agent is booking for themselves)</p>
            <p className="general-subheading">(NO travel agent can book under these rate codes)</p>
            <ul className="general-list-tight">
              <li className="general-list-item">WREWARDS 48HR CXL (ANY FORM)</li>
              <li className="general-list-item">IMRCWEB</li>
              <li className="general-list-item">WRPREPAY (30+ days prior, full payment, no cng/cxl)</li>
            </ul>
          </div>

          {/* Do Not Book */}
          <h3 className="general-section-heading">DO NOT BOOK OR TOUCH ANYTHING WITH:</h3>
          <div className="general-section-content">
            <p className="general-text-italic">(transfer to resort marketing)</p>
            <ul className="general-list-tight">
              <li className="general-list-item">Rate code ending in "S" or "T"</li>
              <li className="general-list-item">COMP, RMO, FC (free credit), PC (promo chips)</li>
            </ul>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
