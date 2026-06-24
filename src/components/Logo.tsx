export default function Logo() {
  return (
    <svg 
      width="160" 
      height="40" 
      viewBox="0 0 160 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Cool "ND" monogram icon */}
      <g>
        {/* Background circle with gradient effect */}
        <circle 
          cx="16" 
          cy="20" 
          r="14" 
          fill="var(--color-accent)" 
          opacity="0.15"
        />
        <circle 
          cx="16" 
          cy="20" 
          r="14" 
          stroke="var(--color-accent)" 
          strokeWidth="2.5"
        />
        
        {/* Bold "N" letter */}
        <path
          d="M 9 27 L 9 13 L 11.5 13 L 18 23 L 18 13 L 20 13 L 20 27 L 17.5 27 L 11 17 L 11 27 Z"
          fill="var(--color-accent)"
        />
        
        {/* Bold "D" letter overlapping */}
        <path
          d="M 15 27 L 15 13 L 19 13 C 21.5 13 23 14.5 23 17 L 23 23 C 23 25.5 21.5 27 19 27 Z M 17 15 L 17 25 L 19 25 C 20.2 25 21 24.2 21 23 L 21 17 C 21 15.8 20.2 15 19 15 Z"
          fill="var(--color-accent)"
        />
        
        {/* Fun sparkles around the monogram */}
        <g opacity="0.8">
          {/* Top right sparkle */}
          <path
            d="M 28 10 L 28.5 11.5 L 30 12 L 28.5 12.5 L 28 14 L 27.5 12.5 L 26 12 L 27.5 11.5 Z"
            fill="var(--color-accent)"
          />
          {/* Bottom left sparkle */}
          <path
            d="M 6 26 L 6.3 27 L 7 27.3 L 6.3 27.6 L 6 28.3 L 5.7 27.6 L 5 27.3 L 5.7 27 Z"
            fill="var(--color-accent)"
          />
          {/* Top left tiny dot */}
          <circle cx="8" cy="12" r="1.2" fill="var(--color-accent)" />
        </g>
      </g>
      
      {/* Fun, playful text */}
      <text 
        x="40" 
        y="29" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" 
        fontSize="26" 
        fontWeight="700" 
        fill="var(--color-accent)"
        letterSpacing="-1"
      >
        Noah
      </text>
      <text 
        x="98" 
        y="29" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" 
        fontSize="26" 
        fontWeight="700" 
        fill="var(--color-text-bright)"
        letterSpacing="-1"
      >
        Docs
      </text>
      
      {/* Fun wavy underline */}
      <path
        d="M 40 33 Q 60 35 80 33 T 120 33 T 140 33"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      
      {/* Playful dots accent */}
      <circle cx="147" cy="13" r="2.5" fill="var(--color-accent)" opacity="0.6" />
      <circle cx="153" cy="16" r="2" fill="var(--color-accent)" opacity="0.5" />
      <circle cx="157" cy="20" r="1.5" fill="var(--color-accent)" opacity="0.4" />
    </svg>
  )
}
