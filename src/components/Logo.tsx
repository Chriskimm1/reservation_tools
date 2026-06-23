export default function Logo() {
  return (
    <svg 
      width="220" 
      height="40" 
      viewBox="0 0 220 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Icon - Modern calendar/booking symbol */}
      <g>
        {/* Calendar base */}
        <rect 
          x="2" 
          y="8" 
          width="28" 
          height="28" 
          rx="4" 
          fill="var(--color-accent)"
          opacity="0.2"
        />
        <rect 
          x="2" 
          y="8" 
          width="28" 
          height="28" 
          rx="4" 
          stroke="var(--color-accent)" 
          strokeWidth="2"
        />
        
        {/* Calendar header */}
        <rect 
          x="2" 
          y="8" 
          width="28" 
          height="8" 
          rx="4" 
          fill="var(--color-accent)"
        />
        
        {/* Calendar rings */}
        <rect 
          x="8" 
          y="5" 
          width="2" 
          height="6" 
          rx="1" 
          fill="var(--color-accent)"
        />
        <rect 
          x="22" 
          y="5" 
          width="2" 
          height="6" 
          rx="1" 
          fill="var(--color-accent)"
        />
        
        {/* Checkmark inside */}
        <path 
          d="M10 23 L14 27 L22 19" 
          stroke="var(--color-accent)" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      
      {/* Text */}
      <text 
        x="42" 
        y="28" 
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif" 
        fontSize="22" 
        fontWeight="700" 
        fill="var(--color-text-bright)"
        letterSpacing="-0.5"
      >
        Reservation
      </text>
      <text 
        x="161" 
        y="28" 
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif" 
        fontSize="22" 
        fontWeight="400" 
        fill="var(--color-accent)"
        letterSpacing="-0.5"
      >
        Tools
      </text>
    </svg>
  )
}
