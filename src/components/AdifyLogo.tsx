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
    >
      <foreignObject x="0" y="0" width="100" height="100">
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src="/adibuz-logo.png" 
            alt="A" 
            className="w-full h-full object-contain"
            style={{ filter: 'drop-shadow(0 0 8px rgba(58, 15, 99, 0.2))' }}
          />
        </div>
      </foreignObject>

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
