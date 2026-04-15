import React from 'react';

interface AdifyLogoProps {
  height?: number;
  className?: string;
}

const AdifyLogo: React.FC<AdifyLogoProps> = ({ height = 36, className = '' }) => {
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

export default AdifyLogo;
