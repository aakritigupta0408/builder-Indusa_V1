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
        {/* Professional Gradient Definitions */}
        <defs>
          <linearGradient
            id="professionalGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="hsl(215, 84%, 20%)" />
            <stop offset="50%" stopColor="hsl(215, 60%, 45%)" />
            <stop offset="100%" stopColor="hsl(215, 84%, 30%)" />
          </linearGradient>
          <linearGradient
            id="accentGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="hsl(215, 60%, 92%)" />
            <stop offset="100%" stopColor="hsl(210, 15%, 96%)" />
          </linearGradient>
          <filter id="professionalShadow">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="4"
              floodColor="hsl(215, 84%, 20%)"
              floodOpacity="0.2"
            />
          </filter>
        </defs>

        {/* Main circle background */}
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="url(#professionalGradient)"
          filter="url(#professionalShadow)"
        />

        {/* Inner accent circle */}
        <circle
          cx="16"
          cy="16"
          r="10"
          fill="none"
          stroke="url(#accentGradient)"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Professional "I" symbol */}
        <circle cx="16" cy="10" r="2" fill="white" />
        <rect x="14.5" y="14" width="3" height="9" rx="1.5" fill="white" />

        {/* Subtle corner accents */}
        <circle cx="8" cy="8" r="1" fill="white" opacity="0.3" />
        <circle cx="24" cy="8" r="1" fill="white" opacity="0.3" />
        <circle cx="8" cy="24" r="1" fill="white" opacity="0.3" />
        <circle cx="24" cy="24" r="1" fill="white" opacity="0.3" />
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
        <linearGradient
          id="genZIconGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FF006E" />
          <stop offset="25%" stopColor="#7C4DFF" />
          <stop offset="50%" stopColor="#00BCD4" />
          <stop offset="75%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#FFC107" />
        </linearGradient>
        <filter id="iconGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Layered circle base */}
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="url(#genZIconGradient)"
        filter="url(#iconGlow)"
      />

      {/* Secondary geometric shape */}
      <polygon
        points="12,4 18,10 12,16 6,10"
        fill="#7C4DFF"
        opacity="0.7"
        filter="url(#iconGlow)"
      />

      {/* Bold stylized "i" */}
      <circle cx="12" cy="8" r="1.8" fill="white" filter="url(#iconGlow)" />
      <rect
        x="10.2"
        y="11"
        width="3.6"
        height="8"
        rx="1.8"
        fill="white"
        filter="url(#iconGlow)"
      />

      {/* Gen Z sparkles */}
      <circle cx="4" cy="4" r="1" fill="#E91E63" opacity="0.8" />
      <circle cx="20" cy="4" r="0.8" fill="#9C27B0" opacity="0.7" />
      <circle cx="4" cy="20" r="0.8" fill="#3F51B5" opacity="0.7" />
      <circle cx="20" cy="20" r="1" fill="#00BCD4" opacity="0.8" />

      {/* Micro details */}
      <circle cx="7" cy="2" r="0.5" fill="#FFC107" opacity="0.6" />
      <circle cx="17" cy="2" r="0.4" fill="#4CAF50" opacity="0.5" />
      <circle cx="2" cy="12" r="0.6" fill="#FF4081" opacity="0.7" />
      <circle cx="22" cy="12" r="0.7" fill="#7C4DFF" opacity="0.6" />
    </svg>
  );
};

export default IndusaLogo;
