import React from 'react';

interface AdifyLogoProps {
  height?: number;
  className?: string;
}

const AdifyLogo: React.FC<AdifyLogoProps> = ({ height = 36, className = '' }) => {
  // Maintain original aspect ratio: image is 2528 × 1682 ≈ 1.503:1
  const width = Math.round(height * (2528 / 1682));

  return (
    <img
      src="/adibuz-logo.png"
      alt="Adibuz"
      width={width}
      height={height}
      className={className}
      style={{ objectFit: 'contain', display: 'block' }}
      draggable={false}
    />
  );
};

export default AdifyLogo;
