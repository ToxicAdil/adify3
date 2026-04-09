import React from 'react';

interface AdifyLogoProps {
  height?: number;
  className?: string;
}

const AdifyLogo: React.FC<AdifyLogoProps> = ({ height = 36, className = '' }) => {
  const scale = height / 100;
  // Adjusted width to accommodate the image icon + text
  const width = 380 * scale;

  return (
    <div 
      className={`flex items-center gap-3 ${className}`} 
      style={{ height: `${height}px` }}
    >
      <img 
        src="/adibuz-icon.png" 
        alt="Adibuz Icon" 
        style={{ 
          height: '100%', 
          width: 'auto',
          objectFit: 'contain',
          display: 'block'
        }} 
      />
      <svg
        width={260 * scale}
        height={height}
        viewBox="0 0 260 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Adibuz"
      >
        <text
          x="0"
          y="75"
          fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
          fontSize="64"
          fontWeight="800"
          fill="#1e1b4b"
          letterSpacing="-2"
        >
          Adibuz
        </text>
      </svg>
    </div>
  );
};

export default AdifyLogo;
