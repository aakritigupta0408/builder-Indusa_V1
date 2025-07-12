import React from "react";

interface IndusaLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const IndusaLogo: React.FC<IndusaLogoProps> = ({
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Gen Z Gradient Definitions */}
        <defs>
          <linearGradient
            id="genZMainGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FF0080" />
            <stop offset="25%" stopColor="#FF3300" />
            <stop offset="50%" stopColor="#FFFF00" />
            <stop offset="75%" stopColor="#00FFFF" />
            <stop offset="100%" stopColor="#8000FF" />
          </linearGradient>
          <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF00FF" />
            <stop offset="50%" stopColor="#00FFFF" />
            <stop offset="100%" stopColor="#FFFF00" />
          </linearGradient>
          <radialGradient id="holographicGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FF00FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.2" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Modern Geometric Base */}
        <rect
          x="6"
          y="6"
          width="20"
          height="20"
          rx="10"
          fill="url(#genZMainGradient)"
          transform="rotate(45 16 16)"
        />

        {/* Neon Ring */}
        <circle
          cx="16"
          cy="16"
          r="12"
          fill="none"
          stroke="url(#neonGlow)"
          strokeWidth="2"
          opacity="0.8"
          filter="url(#glow)"
        />

        {/* Bold I Symbol */}
        <rect
          x="14"
          y="8"
          width="4"
          height="16"
          rx="2"
          fill="#FFFFFF"
          filter="url(#glow)"
        />

        {/* Top and Bottom bars for I */}
        <rect x="11" y="8" width="10" height="3" rx="1.5" fill="#FFFFFF" />
        <rect x="11" y="21" width="10" height="3" rx="1.5" fill="#FFFFFF" />

        {/* Holographic Glow Effect */}
        <circle cx="16" cy="16" r="14" fill="url(#holographicGlow)" />

        {/* Trendy Sparkles */}
        <circle cx="8" cy="8" r="1.5" fill="#FFFF00" opacity="0.9" />
        <circle cx="24" cy="8" r="1" fill="#FF00FF" opacity="0.8" />
        <circle cx="8" cy="24" r="1" fill="#00FFFF" opacity="0.8" />
        <circle cx="24" cy="24" r="1.5" fill="#FF0080" opacity="0.9" />

        {/* Modern Accent Diamond */}
        <path d="M16 4 L20 8 L16 12 L12 8 Z" fill="#FFFFFF" opacity="0.9" />
      </svg>
    </div>
  );
};

export const IndusaIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4",
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="indusaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF69B4" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FF1493" />
        </linearGradient>
      </defs>

      {/* Simplified version for icons */}
      <path
        d="M12 2 C6 2, 2 8, 2 12 C2 16, 6 22, 12 22 C18 22, 22 16, 22 12 C22 8, 18 2, 12 2 Z"
        fill="url(#indusaGradient)"
        opacity="0.9"
      />

      <path
        d="M12 16 C10 14, 8 12, 8 10 C8 9, 9 8, 10 8.5 C11 9, 12 9.5, 12 9.5 C12 9.5, 13 9, 14 8.5 C15 8, 16 9, 16 10 C16 12, 14 14, 12 16 Z"
        fill="white"
      />

      <circle cx="12" cy="6" r="1" fill="#FFD700" />
    </svg>
  );
};

export default IndusaLogo;
