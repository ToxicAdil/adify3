import React from 'react';

interface AdifyLogoProps {
  height?: number;
  className?: string;
}

const AdifyLogo: React.FC<AdifyLogoProps> = ({ height = 36, className = '' }) => {
  return (
    <img
      src="https://res.cloudinary.com/dhty5iilx/image/upload/q_auto/f_auto/v1775580543/adibuz_ko7ciy.jpg"
      alt="Adibuz"
      height={height}
      style={{ height: `${height}px`, width: 'auto', display: 'inline-block', borderRadius: '6px' }}
      className={className}
      draggable={false}
    />
  );
};

export default AdifyLogo;
