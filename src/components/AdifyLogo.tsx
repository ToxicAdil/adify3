import React from 'react';

interface AdifyLogoProps {
  height?: number;
  className?: string;
}

const AdifyLogo: React.FC<AdifyLogoProps> = ({ height = 36, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      role="img"
      aria-label="Adibuz"
    >
      <img
        src="https://res.cloudinary.com/dtzo88csm/image/upload/v1775769595/Gemini_Generated_Image_r56sgbr56sgbr56s_bhuvgk.png"
        alt="Adibuz logo"
        height={height}
        style={{
          height: `${height}px`,
          width: 'auto',
          display: 'block',
          mixBlendMode: 'multiply',   /* removes white background visually */
          objectFit: 'contain',
        }}
        draggable={false}
      />
      <span
        style={{
          fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: `${height * 0.63}px`,
          fontWeight: 800,
          color: '#0f172a',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        Adibuz
      </span>
    </span>
  );
};

export default AdifyLogo;
