import React from 'react';

interface AdifyLogoProps {
  height?: number;
  className?: string;
}

const AdifyLogo: React.FC<AdifyLogoProps> = ({ height = 36, className = '' }) => {
  const scale = height / 100;
  const width = 360 * scale;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 360 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Adibuz"
      style={{ filter: 'drop-shadow(0 0 8px rgba(58, 15, 99, 0.15))' }}
    >
      <defs>
        {/* Main "A" body gradient — Deep Purple to Bright Violet */}
        <linearGradient id="logoGradMain" x1="15" y1="10" x2="85" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>

        {/* Diagonal Swoosh/Slash — Vivid Violet to Deep Navy/Purple */}
        <linearGradient id="logoGradSwoosh" x1="5" y1="85" x2="95" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E1B4B" />
          <stop offset="40%" stopColor="#4C1D95" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      {/* Styled letter "A" mark inspired by the image */}
      <g>
        {/* Top portion of A */}
        <path
          d="M58 8 L32 78 C31.5 80 33 82 35 82 L42 82 L65 24 L84 78 C84.5 80 86 82 88 82 L95 82 L64 8 C63 5 60 5 58 8 Z"
          fill="url(#logoGradMain)"
        />
        {/* The sharp diagonal bar — mimicking the slash in the logo */}
        <path
          d="M12 92 C15 85 30 70 58 58 C86 46 105 40 102 32 C99 26 80 28 65 35 C45 45 25 65 15 82 C10 88 12 92 12 92 Z"
          fill="url(#logoGradSwoosh)"
        />
      </g>

      {/* "Adibuz" text */}
      <text
        x="120"
        y="75"
        fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
        fontSize="58"
        fontWeight="800"
        fill="#1e1b4b"
        letterSpacing="-1.8"
      >
        Adibuz
      </text>
    </svg>
  );
};

export default AdifyLogo;
