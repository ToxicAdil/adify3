import React from 'react';

interface AdifyLogoProps {
  height?: number;
  className?: string;
}

const AdifyLogo: React.FC<AdifyLogoProps> = ({ height = 36, className = '' }) => {
  return (
    <div
      className={`flex items-center gap-2.5 ${className}`}
      role="img"
      aria-label="Adibuz"
      style={{ height }}
    >
      {/* Logo image from Cloudinary */}
      <img
        src="https://res.cloudinary.com/dtzo88csm/image/upload/v1775769595/Gemini_Generated_Image_r56sgbr56sgbr56s_bhuvgk.png"
        alt="Adibuz logo"
        style={{ height, width: 'auto', objectFit: 'contain' }}
        loading="eager"
        decoding="async"
      />
      {/* Brand name */}
      <span
        style={{
          fontSize: height * 0.6,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: '#0f172a',
          fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          lineHeight: 1,
        }}
      >
        Adibuz
      </span>
    </div>
  );
};

export default AdifyLogo;
