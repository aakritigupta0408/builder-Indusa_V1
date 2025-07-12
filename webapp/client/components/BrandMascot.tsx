interface BrandMascotProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "outline" | "icon";
  className?: string;
}

export function BrandMascot({
  size = "md",
  variant = "full",
  className = "",
}: BrandMascotProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  // Placeholder mascot SVG - replace with actual soft toy design
  const MascotSVG = () => (
    <svg
      viewBox="0 0 100 100"
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === "outline" ? (
        // Outline version for icon usage
        <g>
          <circle
            cx="50"
            cy="35"
            r="20"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="42" cy="32" r="2" fill="currentColor" />
          <circle cx="58" cy="32" r="2" fill="currentColor" />
          <path
            d="M45 40 Q50 45 55 40"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <ellipse
            cx="50"
            cy="70"
            rx="15"
            ry="25"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="35" cy="25" r="8" stroke="currentColor" strokeWidth="2" />
          <circle cx="65" cy="25" r="8" stroke="currentColor" strokeWidth="2" />
        </g>
      ) : (
        // Full color version
        <g>
          {/* Body */}
          <ellipse cx="50" cy="70" rx="15" ry="25" fill="#FFB6C1" />

          {/* Head */}
          <circle cx="50" cy="35" r="20" fill="#FFB6C1" />

          {/* Ears */}
          <circle cx="35" cy="25" r="8" fill="#FF69B4" />
          <circle cx="65" cy="25" r="8" fill="#FF69B4" />

          {/* Eyes */}
          <circle cx="42" cy="32" r="3" fill="#000" />
          <circle cx="58" cy="32" r="3" fill="#000" />
          <circle cx="43" cy="30" r="1" fill="#fff" />
          <circle cx="59" cy="30" r="1" fill="#fff" />

          {/* Nose */}
          <ellipse cx="50" cy="38" rx="2" ry="1" fill="#FF1493" />

          {/* Mouth */}
          <path
            d="M45 40 Q50 45 55 40"
            stroke="#FF1493"
            strokeWidth="2"
            fill="none"
          />

          {/* Arms/Paws */}
          <circle cx="30" cy="60" r="6" fill="#FFB6C1" />
          <circle cx="70" cy="60" r="6" fill="#FFB6C1" />

          {/* Sparkles for AI magic */}
          <g fill="#FFD700">
            <polygon points="20,20 22,26 28,24 22,30 20,36 18,30 12,32 18,26" />
            <polygon points="75,15 76,19 80,18 76,22 75,26 74,22 70,23 74,19" />
            <polygon points="85,80 86,83 89,82 86,85 85,88 84,85 81,86 84,83" />
          </g>
        </g>
      )}
    </svg>
  );

  return <MascotSVG />;
}

// Icon version for use in logos and headers
export function BrandMascotIcon({ className = "" }: { className?: string }) {
  return (
    <BrandMascot
      size="md"
      variant="outline"
      className={`text-primary ${className}`}
    />
  );
}

// Full mascot for larger displays
export function BrandMascotFull({ className = "" }: { className?: string }) {
  return <BrandMascot size="xl" variant="full" className={className} />;
}
