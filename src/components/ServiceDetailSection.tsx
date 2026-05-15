import React, { memo } from 'react';
import { FadeInUp, ScaleInView } from '@/lib/animations';
import MagneticButton from './MagneticButton';

// Detect mobile once — used to swap video → poster image
const isMobileDevice =
  typeof window !== 'undefined' &&
  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768);

interface ServiceDetailSectionProps {
  id?: string;
  label: string;
  title: React.ReactNode;
  description: string;
  buttons: string[];
  videoSlot: React.ReactNode;
  /** Poster image URL for mobile (static image, zero video payload) */
  posterUrl?: string;
  /** If true the text column appears on the right, video on the left (default: video left) */
  videoRight?: boolean;
  style?: React.CSSProperties;
}

const ServiceDetailSection = memo(
  ({
    id,
    label,
    title,
    description,
    buttons,
    videoSlot,
    posterUrl,
    videoRight = false,
    style,
  }: ServiceDetailSectionProps) => {
    // On mobile: swap the video slot for a lightweight poster image
    const mediaSlot =
      isMobileDevice && posterUrl ? (
        <img
          src={posterUrl}
          alt={`${title} showcase`}
          className="w-full h-full object-cover block"
          style={{ borderRadius: 'inherit' }}
          loading="lazy"
          decoding="async"
          width="380"
          height="285"
        />
      ) : (
        videoSlot
      );

    return (
      <section
        id={id}
        className="py-8 relative"
        style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px', ...style }}
        aria-label={typeof title === 'string' ? title : label}
      >
        <div className="container-custom">
          <FadeInUp className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center relative z-10">
              {/* Video / Poster slot — left position */}
              {!videoRight && (
                <ScaleInView
                  delay={0.2}
                  className="relative w-full aspect-[4/3] lg:w-[380px] lg:min-w-[380px] mx-auto rounded-[24px] overflow-hidden group shadow-xl ring-1 ring-black/5"
                >
                  {mediaSlot}
                </ScaleInView>
              )}

              {/* Text column */}
              <div
                className={`flex-1 w-full lg:max-w-[500px] space-y-8 text-center lg:text-left${
                  videoRight ? ' order-2 lg:order-1' : ''
                }`}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-start">
                    <span className="text-[12px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-[16px] py-[6px] rounded-full">
                      {label}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-4xl md:text-[42px] font-bold leading-[1.2] tracking-tight text-slate-900">
                      <span className="text-gradient">{title}</span>
                    </h2>
                    <p className="text-slate-500 text-[15px] md:text-[18px] font-medium leading-[1.6] max-lg:max-w-lg max-lg:mx-auto">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {buttons.map((btn) => (
                    <MagneticButton key={btn}>
                      <button
                        className="px-[16px] sm:px-[20px] py-[8px] bg-slate-100/50 backdrop-blur-sm border border-slate-200/50 rounded-[6px] text-[13px] font-medium text-slate-900 hover:bg-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 min-h-[44px]"
                        aria-label={btn}
                      >
                        {btn}
                      </button>
                    </MagneticButton>
                  ))}
                </div>
              </div>

              {/* Video / Poster slot — right position */}
              {videoRight && (
                <ScaleInView
                  delay={0.2}
                  className="relative w-full aspect-[4/3] lg:w-[380px] lg:min-w-[380px] mx-auto rounded-[24px] overflow-hidden group shadow-xl ring-1 ring-black/5 order-1 lg:order-2"
                >
                  {mediaSlot}
                </ScaleInView>
              )}
            </div>
            <div
              className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"
              aria-hidden="true"
            />
          </FadeInUp>
        </div>
      </section>
    );
  }
);

ServiceDetailSection.displayName = 'ServiceDetailSection';

export { ServiceDetailSection };
