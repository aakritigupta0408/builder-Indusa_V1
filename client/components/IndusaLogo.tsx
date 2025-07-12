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
        {/* Ultra Gen Z Gradient Definitions */}
        <defs>
          <linearGradient
            id="genZMainGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FF006E" />
            <stop offset="20%" stopColor="#FF4081" />
            <stop offset="40%" stopColor="#7C4DFF" />
            <stop offset="60%" stopColor="#00BCD4" />
            <stop offset="80%" stopColor="#4CAF50" />
            <stop offset="100%" stopColor="#FFC107" />
          </linearGradient>
          <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E91E63" />
            <stop offset="33%" stopColor="#9C27B0" />
            <stop offset="66%" stopColor="#3F51B5" />
            <stop offset="100%" stopColor="#00BCD4" />
          </linearGradient>
          <radialGradient id="holographicGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#FF4081" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#7C4DFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00BCD4" stopOpacity="0.2" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="heavyGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="heavyBlur" />
            <feMerge>
              <feMergeNode in="heavyBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Layered Geometric Base */}
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="url(#genZMainGradient)"
          filter="url(#heavyGlow)"
        />

        {/* Secondary shape */}
        <polygon
          points="16,4 24,12 16,20 8,12"
          fill="url(#neonGlow)"
          opacity="0.8"
          filter="url(#glow)"
        />

        {/* Triple Neon Rings */}
        <circle
          cx="16"
          cy="16"
          r="13"
          fill="none"
          stroke="#FF4081"
          strokeWidth="1.5"
          opacity="0.7"
          filter="url(#glow)"
        />
        <circle
          cx="16"
          cy="16"
          r="10"
          fill="none"
          stroke="#7C4DFF"
          strokeWidth="1"
          opacity="0.8"
          filter="url(#glow)"
        />
        <circle
          cx="16"
          cy="16"
          r="7"
          fill="none"
          stroke="#00BCD4"
          strokeWidth="0.8"
          opacity="0.9"
          filter="url(#glow)"
        />

        {/* Bold Stylized "i" */}
        <circle
          cx="16"
          cy="10"
          r="2.5"
          fill="#FFFFFF"
          filter="url(#heavyGlow)"
        />
        <rect
          x="14"
          y="14"
          width="4"
          height="10"
          rx="2"
          fill="#FFFFFF"
          filter="url(#heavyGlow)"
        />

        {/* Holographic Overlay */}
        <circle cx="16" cy="16" r="15" fill="url(#holographicGlow)" />

        {/* Gen Z Sparkle Elements */}
        <circle
          cx="6"
          cy="6"
          r="1.5"
          fill="#E91E63"
          opacity="0.9"
          filter="url(#glow)"
        />
        <circle
          cx="26"
          cy="6"
          r="1.2"
          fill="#9C27B0"
          opacity="0.8"
          filter="url(#glow)"
        />
        <circle
          cx="6"
          cy="26"
          r="1.2"
          fill="#3F51B5"
          opacity="0.8"
          filter="url(#glow)"
        />
        <circle
          cx="26"
          cy="26"
          r="1.5"
          fill="#00BCD4"
          opacity="0.9"
          filter="url(#glow)"
        />

        {/* Additional micro sparkles */}
        <circle cx="10" cy="4" r="0.8" fill="#FFC107" opacity="0.7" />
        <circle cx="22" cy="4" r="0.6" fill="#4CAF50" opacity="0.6" />
        <circle cx="4" cy="16" r="0.7" fill="#FF4081" opacity="0.8" />
        <circle cx="28" cy="16" r="0.9" fill="#7C4DFF" opacity="0.7" />

        {/* Trendy geometric accents */}
        <path
          d="M16 2 L18 4 L16 6 L14 4 Z"
          fill="#FFFFFF"
          opacity="0.9"
          filter="url(#glow)"
        />
        <path
          d="M16 26 L18 28 L16 30 L14 28 Z"
          fill="#FFFFFF"
          opacity="0.9"
          filter="url(#glow)"
        />
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
          <stop offset="0%" stopColor="#FF0080" />
          <stop offset="33%" stopColor="#FFFF00" />
          <stop offset="66%" stopColor="#00FFFF" />
          <stop offset="100%" stopColor="#FF00FF" />
        </linearGradient>
        <filter id="iconGlow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Simplified geometric version */}
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="8"
        fill="url(#genZIconGradient)"
        transform="rotate(45 12 12)"
        filter="url(#iconGlow)"
      />

      {/* Bold I */}
      <rect x="10.5" y="7" width="3" height="10" rx="1.5" fill="white" />
      <rect x="8.5" y="7" width="7" height="2" rx="1" fill="white" />
      <rect x="8.5" y="15" width="7" height="2" rx="1" fill="white" />

      {/* Neon sparkles */}
      <circle cx="6" cy="6" r="1" fill="#FFFF00" />
      <circle cx="18" cy="6" r="0.8" fill="#FF00FF" />
      <circle cx="6" cy="18" r="0.8" fill="#00FFFF" />
      <circle cx="18" cy="18" r="1" fill="#FF0080" />
    </svg>
  );
};

export default IndusaLogo;
