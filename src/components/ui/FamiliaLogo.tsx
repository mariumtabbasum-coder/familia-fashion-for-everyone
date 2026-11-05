import React from 'react';

interface FamiliaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  variant?: 'full' | 'monogram' | 'horizontal';
}

export const FamiliaLogo: React.FC<FamiliaLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  variant = 'full',
}) => {
  const monogramSizes = {
    sm: { w: 26, h: 26, text: 'text-lg' },
    md: { w: 34, h: 34, text: 'text-xl' },
    lg: { w: 52, h: 52, text: 'text-3xl' },
  };

  const { w, h } = monogramSizes[size];

  // Vector Monogram with interlocking serif F and S + coral star sparkle
  const Monogram = (
    <div className="relative inline-flex items-center justify-center flex-shrink-0" style={{ width: w, height: h }}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#477C82]"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 22 14 L 22 50" strokeWidth="3" />
          <path d="M 17 14 L 38 14" strokeWidth="2.5" />
          <path d="M 22 28 L 34 28" strokeWidth="2.5" />
          <path d="M 17 50 L 27 50" strokeWidth="2.5" />
          <path
            d="M 43 20 C 37 15, 27 18, 27 25 C 27 34, 44 33, 44 42 C 44 49, 34 52, 26 47"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
        <path
          d="M 48 8 Q 48 14 54 14 Q 48 14 48 20 Q 48 14 42 14 Q 48 14 48 8 Z"
          fill="#FF8F86"
        />
      </svg>
    </div>
  );

  if (variant === 'monogram') {
    return <div className={`inline-flex items-center ${className}`}>{Monogram}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-1.5 sm:gap-2.5 select-none ${className}`}>
      {Monogram}
      {/* Subtle vertical divider line matching reference design (shown on larger screens) */}
      <div
        className="h-6 sm:h-7 w-[1.5px] bg-[#D9E8EC] mx-0.5 shrink-0 hidden md:block"
        aria-hidden="true"
      />
      <div className="flex flex-col text-left">
        <span
          className="font-serif tracking-[0.15em] sm:tracking-[0.18em] font-bold text-[#477C82] leading-none uppercase text-base sm:text-lg md:text-xl"
        >
          FAMILIA
        </span>
        {showTagline && (
          <span
            className="tracking-[0.22em] text-[#607985] font-semibold uppercase font-sans mt-0.5 text-[9px] sm:text-[10px] hidden md:block"
          >
            Fashion for Everyone
          </span>
        )}
      </div>
    </div>
  );
};
