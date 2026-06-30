
export interface RoomDescription {
  code: string
  name: string
  size: string
  features: string[]
  category: string
}

export const ROOM_DESCRIPTIONS: RoomDescription[] = [
  // ── Wynn Resort ──────────────────────────────────────────────
  {
    code: 'RKD',
    name: 'Wynn Resort King',
    size: '640 Sq Ft',
    category: 'Wynn Resort',
    features: [
      'Features a warm, neutral color palette with custom artwork.',
      'Includes a comfortable work desk and a spacious marble bathroom.',
    ],
  },
  {
    code: 'RDD',
    name: 'Wynn Resort Two Queens',
    size: '640 Sq Ft',
    category: 'Wynn Resort',
    features: [
      'Features a warm, neutral color palette with custom artwork.',
      'Includes a comfortable work desk and a spacious marble bathroom.',
    ],
  },
  {
    code: 'PANVD',
    name: 'Wynn Panoramic View King',
    size: '640 Sq Ft',
    category: 'Wynn Resort',
    features: [
      'Guarantees an elevated stay on the 28th floor or higher.',
      'Includes a functional entrance foyer equipped with full-length mirrors.',
    ],
  },
  {
    code: 'PANDD',
    name: 'Wynn Panoramic View Two Queens',
    size: '640 Sq Ft',
    category: 'Wynn Resort',
    features: [
      'Guarantees an elevated stay on the 28th floor or higher.',
      'Includes a functional entrance foyer equipped with full-length mirrors.',
    ],
  },
  {
    code: 'PANCD',
    name: 'Wynn Panoramic Corner King',
    size: '640 Sq Ft',
    category: 'Wynn Resort',
    features: [
      'Features extra corner windows for sweeping views of both the Strip and Valley.',
      'Offers a comfortable sitting area with a couch and ottoman.',
    ],
  },

  // ── Wynn Tower Suites ────────────────────────────────────────
  {
    code: 'TK',
    name: 'Wynn Tower Suite King',
    size: '640 Sq Ft',
    category: 'Wynn Tower Suites',
    features: [
      'Includes exclusive private entrance check-in and daily $50 breakfast credits.',
      'Features a large marble bathroom with a deep soaking tub and separate shower.',
    ],
  },
  {
    code: 'TDC',
    name: 'Wynn Tower Suite Two Queens',
    size: '640 Sq Ft',
    category: 'Wynn Tower Suites',
    features: [
      'Includes exclusive private entrance check-in and daily $50 breakfast credits.',
      'Features a large marble bathroom with a deep soaking tub and separate shower.',
    ],
  },
  {
    code: 'EXEC',
    name: 'Wynn Tower Suite Executive',
    size: '930 Sq Ft',
    category: 'Wynn Tower Suites',
    features: [
      'Features dual marble bathrooms—one dedicated entirely to a glass-enclosed shower, and the second featuring a deep soaking tub.',
      'Includes a distinct, separate living room and a cozy dining alcove.',
    ],
  },
  {
    code: 'PARL',
    name: 'Wynn Tower Suite Parlor',
    size: '1280 Sq Ft',
    category: 'Wynn Tower Suites',
    features: [
      'Features a large separate living room complete with a private granite wet bar.',
      'Includes a secondary guest powder room completely separate from the master bath.',
    ],
  },
  {
    code: 'SALN',
    name: 'Wynn Tower Suite Salon',
    size: '1817 Sq Ft',
    category: 'Wynn Tower Suites',
    features: [
      'Features its own intimate, private massage treatment room.',
      'Includes a sophisticated formal dining room setup for personal entertaining.',
    ],
  },
  {
    code: 'FV1',
    name: 'Wynn Fairway Villa 1bd',
    size: '2411 Sq Ft',
    category: 'Wynn Tower Suites',
    features: [
      'Offers an exclusive residential feel complete with dedicated 24-hour butler service.',
      'Features a beautiful private outdoor balcony or patio space.',
    ],
  },
  {
    code: 'FV2',
    name: 'Wynn Fairway Villa 2bd',
    size: '3222 Sq Ft',
    category: 'Wynn Tower Suites',
    features: [
      'Offers an exclusive residential feel complete with dedicated 24-hour butler service.',
      'Features a beautiful private outdoor balcony or patio space.',
    ],
  },

  // ── Encore Resort ────────────────────────────────────────────
  {
    code: 'EK',
    name: 'Encore Resort King',
    size: '745 Sq Ft',
    category: 'Encore Resort',
    features: [
      'Features a signature split-living area separated by a partial privacy wall.',
      'Includes a large workspace desk paired with comfortable, deep seating.',
    ],
  },
  {
    code: 'EQ',
    name: 'Encore Resort Two Queens',
    size: '745 Sq Ft',
    category: 'Encore Resort',
    features: [
      'Features a signature split-living area separated by a partial privacy wall.',
      'Includes a large workspace desk paired with comfortable, deep seating.',
    ],
  },
  {
    code: 'EPK',
    name: 'Encore Panoramic View King',
    size: '745 Sq Ft',
    category: 'Encore Resort',
    features: [
      'Guarantees a high-floor booking spanning between floors 31 and 63.',
      'Features a signature split-living area separated by a partial privacy wall.',
    ],
  },
  {
    code: 'EPQ',
    name: 'Encore Panoramic View Two Queens',
    size: '745 Sq Ft',
    category: 'Encore Resort',
    features: [
      'Guarantees a high-floor booking spanning between floors 31 and 63.',
      'Features a signature split-living area separated by a partial privacy wall.',
    ],
  },

  // ── Encore Tower Suites ──────────────────────────────────────
  {
    code: 'ESDK',
    name: 'Encore Tower Suite King',
    size: '745 Sq Ft',
    category: 'Encore Tower Suites',
    features: [
      'Features a signature split-living area separated by a partial privacy wall.',
      'Includes access to the quiet, private Tower Suites registration lobby and pool.',
    ],
  },
  {
    code: 'ESQC',
    name: 'Encore Tower Suite Two Queens',
    size: '745 Sq Ft',
    category: 'Encore Tower Suites',
    features: [
      'Features a signature split-living area separated by a partial privacy wall.',
      'Includes access to the quiet, private Tower Suites registration lobby and pool.',
    ],
  },
  {
    code: 'EPARL',
    name: 'Encore Tower Suite Parlor',
    size: '1408 Sq Ft',
    category: 'Encore Tower Suites',
    features: [
      'Features a fully closed-off living room complete with a granite wet bar.',
      'Includes an extra guest powder room off the main marble foyer.',
    ],
  },
  {
    code: 'ESALN',
    name: 'Encore Tower Suite Salon',
    size: '2261 Sq Ft',
    category: 'Encore Tower Suites',
    features: [
      'Features a massive, expanded living room layout with a full granite wet bar.',
      'Includes an elegant, dedicated dining area perfect for an intimate in-room meal.',
    ],
  },
  {
    code: 'APT2',
    name: 'Encore Two Bedroom Apartment',
    size: '3475 Sq Ft',
    category: 'Encore Tower Suites',
    features: [
      "Features a massive living room, a six-person dining table, and a dedicated butler's pantry.",
      'Offers dual master bedrooms, each equipped with its own full marble bathroom.',
    ],
  },
  {
    code: 'DUP3',
    name: 'Encore Three Bedroom Duplex',
    size: '5829 Sq Ft',
    category: 'Encore Tower Suites',
    features: [
      'Spans a dramatic, two-story floor plan with a grand staircase and private elevator.',
      'Includes its own dedicated billiards room and a private in-suite fitness room.',
    ],
  },
]
