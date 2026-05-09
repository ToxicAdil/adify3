import React from 'react';

interface AdibuzLogoProps {
  height?: number;
  className?: string;
}

const AdibuzLogo: React.FC<AdibuzLogoProps> = ({ height = 36, className = '' }) => {
  return (
    <picture>
      <source srcSet="/adibuz-logo.webp" type="image/webp" />
      <img
        src="/adibuz-logo.png"
        alt="Adibuz - Digital Marketing Agency"
        height={height}
        width={Math.round(height * 3.5)}
        className={className}
        style={{
          height: `${height}px`,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </picture>
  );
};

export default AdibuzLogo;
