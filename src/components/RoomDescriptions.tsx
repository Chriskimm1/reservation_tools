import { useState, useMemo } from 'react'
import { ROOM_DESCRIPTIONS } from '../data/roomDescriptions'
import './RoomDescriptions.css'

export default function RoomDescriptions() {
  const [search, setSearch] = useState(
    () => localStorage.getItem('room_descriptions_search') || ''
  )

  const handleSearchChange = (value: string) => {
    setSearch(value)
    localStorage.setItem('room_descriptions_search', value)
  }

  const filteredRooms = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return ROOM_DESCRIPTIONS

    // Split into individual words so "encore salon" matches
    // even when the words aren't next to each other.
    const terms = query.split(/\s+/).filter(Boolean)

    return ROOM_DESCRIPTIONS.filter((room) => {
      // Combine every searchable field into one text blob.
      const haystack = [
        room.code,
        room.name,
        room.size,
        room.category,
        ...room.features,
      ]
        .join(' ')
        .toLowerCase()

      // Every search term must appear somewhere in the blob.
      return terms.every((term) => haystack.includes(term))
    })
  }, [search])

  return (
    <div className="room-desc-wrapper">
      {/* Search Bar */}
      <div className="room-desc-search-box">
        <input
          type="text"
          placeholder="Search by room code (RKD) or name (Wynn Resort King)..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="room-desc-search-input"
        />
        {search && (
          <button
            className="room-desc-clear-btn"
            onClick={() => handleSearchChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Result Count */}
      <p className="room-desc-count">
        {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''}
        {search && ` matching "${search}"`}
      </p>

      {/* Room Cards */}
      {filteredRooms.length > 0 ? (
        <div className="room-desc-grid">
          {filteredRooms.map((room) => (
            <div key={room.code} className="room-desc-card">
              <div className="room-desc-card-header">
                <span className="room-desc-code">{room.code}</span>
              </div>
              <h4 className="room-desc-name">{room.name}</h4>
              <div className="room-desc-meta">
                <span className="room-desc-size">{room.size}</span>
                <span className="room-desc-category">{room.category}</span>
              </div>
              <ul className="room-desc-features">
                {room.features.map((feature, i) => (
                  <li key={i} className="room-desc-feature">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="room-desc-empty">
          No rooms found matching "{search}"
        </div>
      )}
    </div>
  )
}
