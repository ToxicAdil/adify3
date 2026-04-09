import React from 'react';

interface AdifyLogoProps {
  height?: number;
  className?: string;
}

const AdifyLogo: React.FC<AdifyLogoProps> = ({ height = 36, className = '' }) => {
  const scale = height / 100;
  const width = 340 * scale;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 340 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Adify"
      style={{ filter: 'drop-shadow(0 0 6px rgba(58, 15, 99, 0.25))' }}
    >
      <defs>
        {/* Main "A" body gradient — deep brand purple to vivid accent */}
        <linearGradient id="logoGradMain" x1="10" y1="5" x2="85" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="35%" stopColor="#7C3AED" />
          <stop offset="70%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#3A0F63" />
        </linearGradient>

        {/* Swoosh gradient — vivid mid-purple to lighter accent */}
        <linearGradient id="logoGradSwoosh" x1="0" y1="75" x2="90" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3A0F63" />
          <stop offset="40%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>

        {/* Dark depth gradient for shadow accent */}
        <linearGradient id="logoGradDark" x1="40" y1="95" x2="55" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A0845" />
          <stop offset="100%" stopColor="#3A0F63" />
        </linearGradient>
      </defs>

      {/* "A" Letter - main body */}
      <path
        d="M48 8 L20 90 C19 93 21 96 24 96 L33 96 C35 96 37 94 37.5 92 L43 74 L69 74 L75 92 C75.5 94 77.5 96 79.5 96 L88 96 C91 96 93 93 92 90 L64 8 C63 5.5 61 4 58.5 4 L53.5 4 C51 4 49 5.5 48 8 Z M47 61 L56 28 L65 61 L47 61 Z"
        fill="url(#logoGradMain)"
      />

      {/* Swoosh/wing element curving under the A */}
      <path
        d="M3 92 C6 86 14 76 28 66 C42 56 60 48 74 44 C82 41 88 38 84 33 C80 28 70 30 58 36 C46 42 30 54 18 68 C10 78 4 90 3 92 Z"
        fill="url(#logoGradSwoosh)"
        opacity="0.9"
      />

      {/* Shadow accent on left side of A for depth */}
      <path
        d="M48 8 L38 38 C44 35 50 33 56 31 L53.5 4 C51 4 49 5.5 48 8 Z"
        fill="url(#logoGradDark)"
        opacity="0.45"
      />

      {/* "Adify" text */}
      <text
        x="108"
        y="76"
        fontFamily="'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
        fontSize="56"
        fontWeight="800"
        fill="#0f172a"
        letterSpacing="-1.5"
      >
        Adify
      </text>
    </svg>
  );
};

export default AdifyLogo;
