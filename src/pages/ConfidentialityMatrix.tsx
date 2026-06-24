import './ConfidentialityMatrix.css'

interface MatrixCard {
  title: string
  items: { label: string; text: string }[]
}

const LEFT_COLUMN_CARDS: MatrixCard[] = [
  {
    title: 'Rooms (New Res)',
    items: [
      { label: 'New Profile', text: 'Requires a complete profile (name, address, DL #, phone number). Update info if requested or missing.' },
      { label: 'Special/Admin Booking', text: 'Note the name, phone # and email of the person making the reservation in comments.' },
    ],
  },
  {
    title: 'Resort Marketing',
    items: [
      { label: '', text: 'Only the Rewards player can obtain info or make a reservation. Verify identity (DL/Passport).' },
      { label: 'If phone/email update request', text: 'GDS, full address, phone # and email are acceptable / always update privacy information.' },
    ],
  },
  {
    title: 'Spa / Salon',
    items: [
      { label: 'Agent for Non-Gst', text: 'Must select phone #, email address, and credit card for payment.' },
      { label: 'Agent for Hotel Gst', text: '(follow gst with hotel rorv below).' },
      { label: 'Gst with Hotel Rorv', text: 'Verify stay dates, room key/number and DL #.' },
      { label: 'Non-Hotel Gst', text: 'Implement a call back to phone # on file.' },
    ],
  },
  {
    title: 'Dining',
    items: [
      { label: 'Hotel Gst', text: 'Verify stay dates, name on rorv and DL #. (In the event there is no DL #, agent must implement a call back).' },
      { label: 'Non-Hotel Gst', text: 'Implement a call back to phone # on file.' },
    ],
  },
  {
    title: 'Show',
    items: [
      { label: 'Bked by Wynn', text: 'Verify the full name on reservation, show details and last 4 digits of the credit card on the TM.' },
      { label: 'Mkg', text: 'Verify the full name on reservation, show details and last 4 digits of the credit card vs fin. If no CC is avail, must direct caller back to TM.' },
    ],
  },
]

const RIGHT_COLUMN_CARDS: MatrixCard[] = [
  {
    title: 'Rooms (Reservations)',
    items: [
      { label: 'Transient', text: 'Confirm confirmation # and DL #. If no DL #, must implement a call back to phone # on file (entire process if booking is off-setting).' },
      { label: 'Leisure (TA rorv)', text: 'Confirm GDS confirmation # and/or IATA # (nothing is preferred / must be done by TA).' },
      { label: 'Convention', text: 'Confirm group name, email address, last 4 # of CC. If direct bill, verify stay dates.' },
      { label: 'Wholesale', text: 'Direct caller back to the third party for assistance.' },
      { label: 'In-House Gst', text: 'Advise layout can be added through Wynn Mobile or in person at the FD.' },
    ],
  },
  {
    title: 'Folio and Billing',
    items: [
      { label: '', text: 'An Encore rorv may be ordered for callers requesting a copy of the stay folio or asking for clarification regarding billing. Agent must confirm the name, stay dates, confirmation # (first and last name match the registered gst, confirm the DL # or Passport on file). *If no DL is avail, agent must implement a call back to phone # on file.' },
    ],
  },
  {
    title: 'Amenities / Gift Cards / Third Party Payment',
    items: [
      { label: '', text: "Agent will obtain the caller's first and last name, billing information, and credit card number, prior to confirming guest reservation." },
    ],
  },
  {
    title: 'Golf / Cabanas Reservations',
    items: [
      { label: 'Hotel Gst', text: 'Verify stay dates, full name on reservation, and DL #.' },
      { label: 'Non-Hotel Gst', text: 'Implement call back to phone # on file.' },
    ],
  },
]

function MatrixCardComponent({ card }: { card: MatrixCard }) {
  return (
    <div className="matrix-card">
      <h3 className="matrix-card__title">{card.title}</h3>
      <ul className="matrix-card__list">
        {card.items.map((item, idx) => (
          <li key={idx} className="matrix-card__item">
            {item.label ? (
              <>
                <span className="matrix-card__label">{item.label}:</span> {item.text}
              </>
            ) : (
              item.text
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ConfidentialityMatrix() {
  return (
    <div className="matrix-page">
      <h2 className="page-heading">Confidentiality Matrix</h2>

      <div className="matrix-two-column">
        <div className="matrix-column">
          <h3 className="matrix-section__heading">New Reservations / New Bookings</h3>
          <div className="matrix-column__cards">
            {LEFT_COLUMN_CARDS.map((card, idx) => (
              <MatrixCardComponent key={idx} card={card} />
            ))}
          </div>
        </div>

        <div className="matrix-column">
          <h3 className="matrix-section__heading">Existing Reservations / Billing</h3>
          <div className="matrix-column__cards">
            {RIGHT_COLUMN_CARDS.map((card, idx) => (
              <MatrixCardComponent key={idx} card={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
