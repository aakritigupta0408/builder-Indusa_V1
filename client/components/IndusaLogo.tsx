import React from "react";
import { BrandMascot } from "./BrandMascot";

interface IndusaLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "logo" | "mascot";
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
          id="professionalIconGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="hsl(215, 84%, 20%)" />
          <stop offset="100%" stopColor="hsl(215, 60%, 45%)" />
        </linearGradient>
        <filter id="iconShadow">
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="2"
            floodColor="hsl(215, 84%, 20%)"
            floodOpacity="0.3"
          />
        </filter>
      </defs>

      {/* Main circle base */}
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="url(#professionalIconGradient)"
        filter="url(#iconShadow)"
      />

      {/* Inner accent circle */}
      <circle
        cx="12"
        cy="12"
        r="7"
        fill="none"
        stroke="white"
        strokeWidth="0.5"
        opacity="0.4"
      />

      {/* Professional "i" */}
      <circle cx="12" cy="8" r="1.5" fill="white" />
      <rect x="10.7" y="11" width="2.6" height="7" rx="1.3" fill="white" />

      {/* Subtle corner accents */}
      <circle cx="6" cy="6" r="0.8" fill="white" opacity="0.3" />
      <circle cx="18" cy="6" r="0.8" fill="white" opacity="0.3" />
      <circle cx="6" cy="18" r="0.8" fill="white" opacity="0.3" />
      <circle cx="18" cy="18" r="0.8" fill="white" opacity="0.3" />
    </svg>
  );
};

export default IndusaLogo;
