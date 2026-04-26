import React from 'react';

interface AdibuzLogoProps {
  height?: number;
  className?: string;
}

const AdibuzLogo: React.FC<AdibuzLogoProps> = ({ height = 36, className = '' }) => {
  return (
    <img
      src="/adibuz-logo.png"
      alt="Adibuz - Digital Marketing Agency"
      height={height}
      className={className}
      style={{
        height: `${height}px`,
        width: 'auto',
        objectFit: 'contain',
        display: 'block',
      }}
      draggable={false}
    />
  );
};

export default AdibuzLogo;
