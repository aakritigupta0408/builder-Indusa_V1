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
        {/* Gradient Definitions */}
        <defs>
          <linearGradient
            id="barbieGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FF69B4" />
            <stop offset="50%" stopColor="#FF1493" />
            <stop offset="100%" stopColor="#DC143C" />
          </linearGradient>
          <linearGradient
            id="apsaraGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FF8C00" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
          <radialGradient id="centralGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Apsara-inspired Lotus Base */}
        <path
          d="M16 4 C8 4, 4 12, 4 16 C4 20, 8 28, 16 28 C24 28, 28 20, 28 16 C28 12, 24 4, 16 4 Z"
          fill="url(#apsaraGradient)"
          opacity="0.8"
        />

        {/* Traditional Indian Pattern Ring */}
        <circle
          cx="16"
          cy="16"
          r="10"
          fill="none"
          stroke="url(#apsaraGradient)"
          strokeWidth="1"
          strokeDasharray="2,1"
          opacity="0.6"
        />

        {/* Barbie-inspired Modern Heart */}
        <path
          d="M16 20 C13 17, 10 14, 10 11 C10 9, 12 8, 14 9 C15 9.5, 16 10.5, 16 10.5 C16 10.5, 17 9.5, 18 9 C20 8, 22 9, 22 11 C22 14, 19 17, 16 20 Z"
          fill="url(#barbieGradient)"
        />

        {/* Apsara Crown Elements */}
        <path
          d="M13 8 L16 6 L19 8 L18 9 L16 8 L14 9 Z"
          fill="url(#apsaraGradient)"
        />

        {/* Barbie Sparkle */}
        <circle cx="12" cy="10" r="1" fill="#FFB6C1" opacity="0.8" />
        <circle cx="20" cy="10" r="1" fill="#FFB6C1" opacity="0.8" />
        <circle cx="16" cy="7" r="0.5" fill="#FFD700" />

        {/* Central Glow */}
        <circle cx="16" cy="16" r="12" fill="url(#centralGlow)" />

        {/* Modern Geometric Accent */}
        <path d="M16 12 L18 14 L16 16 L14 14 Z" fill="#FFFFFF" opacity="0.4" />
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
