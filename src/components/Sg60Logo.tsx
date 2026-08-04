import React from 'react';

interface Sg60LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  textColor?: string;
}

export const Sg60Logo: React.FC<Sg60LogoProps> = ({
  size = 'md',
  showText = true,
  textColor = 'text-white',
}) => {
  const badgeSizeClass =
    size === 'sm' ? 'w-8 h-8 text-xs' : size === 'lg' ? 'w-14 h-14 text-base' : 'w-10 h-10 text-sm';

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Red Circular Badge */}
      <div
        className={`${badgeSizeClass} rounded-full bg-red-600 text-white font-extrabold flex flex-col items-center justify-center shadow-sm border-2 border-white/20 shrink-0 leading-none tracking-tighter`}
      >
        <span className="text-[10px] uppercase font-bold opacity-90 -mb-0.5">SG</span>
        <span className="text-sm font-black tracking-normal">60</span>
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <span className={`font-black text-lg tracking-tight leading-none ${textColor}`}>
            SG60 Vouchers
          </span>
        </div>
      )}
    </div>
  );
};

export const SingaporeLionCrest: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor">
      <circle cx="50" cy="50" r="48" fill="#D32F2F" />
      {/* Crescent and 5 stars stylized emblem */}
      <path
        d="M 32 25 A 22 22 0 1 0 32 75 A 26 26 0 1 1 32 25 Z"
        fill="#FFFFFF"
      />
      {/* 5 Stars */}
      <g fill="#FFFFFF">
        <polygon points="48,32 50,36 54,36 51,39 52,43 48,40 44,43 45,39 42,36 46,36" />
        <polygon points="58,36 60,40 64,40 61,43 62,47 58,44 54,47 55,43 52,40 56,40" />
        <polygon points="58,54 60,58 64,58 61,61 62,65 58,62 54,65 55,61 52,58 56,58" />
        <polygon points="48,58 50,62 54,62 51,65 52,69 48,66 44,69 45,65 42,62 46,62" />
        <polygon points="62,45 64,49 68,49 65,52 66,56 62,53 58,56 59,52 56,49 60,49" />
      </g>
    </svg>
  );
};
