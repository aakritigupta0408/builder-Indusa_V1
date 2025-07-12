// Webapp configuration that imports from shared resources
import {
  BRAND_CONFIG,
  API_CONFIG,
  APP_CONFIG,
  TRYON_CONFIG,
  SIZING_CONFIG,
  SEARCH_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "../../../shared-resources/constants";

// Re-export shared configurations for webapp
export {
  BRAND_CONFIG,
  API_CONFIG,
  APP_CONFIG,
  TRYON_CONFIG,
  SIZING_CONFIG,
  SEARCH_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};

// Webapp-specific configuration
export const WEBAPP_CONFIG = {
  // Development settings
  development: {
    apiURL: "http://localhost:3001",
    enableDebugMode: true,
    showPerformanceMetrics: true,
    hotReload: true,
  },

  // Production settings
  production: {
    apiURL: "https://api.indusa.ai",
    enableDebugMode: false,
    showPerformanceMetrics: false,
    hotReload: false,
  },

  // Feature flags
  features: {
    enablePWA: true,
    enableOfflineMode: false,
    enableNotifications: true,
    enableAnalytics: true,
    enableA11y: true,
  },

  // UI/UX settings
  ui: {
    defaultTheme: "light",
    supportedThemes: ["light", "dark"],
    enableAnimations: true,
    reduceMotion: false,
    mobileBreakpoint: 768,
    tabletBreakpoint: 1024,
    desktopBreakpoint: 1200,
  },

  // Performance settings
  performance: {
    imageOptimization: true,
    lazyLoading: true,
    virtualScrolling: false,
    bundleSplitting: true,
    preloadCriticalResources: true,
  },

  // PWA settings
  pwa: {
    name: "Indusa - AI Fashion",
    shortName: "Indusa",
    description: "AI-powered virtual try-on and fashion discovery",
    themeColor: BRAND_CONFIG.colors.primary,
    backgroundColor: BRAND_CONFIG.colors.background,
    display: "standalone",
    orientation: "portrait",
    startUrl: "/",
    scope: "/",
    categories: ["shopping", "lifestyle", "fashion"],
  },

  // SEO settings
  seo: {
    defaultTitle: "Indusa - AI-Powered Fashion & Home Decor",
    titleTemplate: "%s | Indusa",
    defaultDescription:
      "Experience the future of shopping with AI-powered virtual try-on technology. Discover fashion and home decor like never before.",
    keywords: [
      "AI fashion",
      "virtual try-on",
      "online shopping",
      "home decor",
      "artificial intelligence",
      "style recommendations",
      "smart shopping",
    ],
    author: "Indusa Team",
    viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
    robots: "index, follow",
    googleSiteVerification: process.env.VITE_GOOGLE_SITE_VERIFICATION || "",
  },

  // Analytics
  analytics: {
    googleAnalyticsId: process.env.VITE_GA_ID || "",
    facebookPixelId: process.env.VITE_FB_PIXEL_ID || "",
    enableCookieConsent: true,
    enableUserTiming: true,
    enableErrorTracking: true,
  },

  // Third-party integrations
  integrations: {
    stripe: {
      publishableKey: process.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
      apiVersion: "2023-10-16",
    },
    cloudinary: {
      cloudName: process.env.VITE_CLOUDINARY_CLOUD_NAME || "",
      uploadPreset: process.env.VITE_CLOUDINARY_UPLOAD_PRESET || "",
    },
    sendgrid: {
      apiKey: process.env.VITE_SENDGRID_API_KEY || "",
      templateIds: {
        welcome: process.env.VITE_SENDGRID_WELCOME_TEMPLATE || "",
        orderConfirmation: process.env.VITE_SENDGRID_ORDER_TEMPLATE || "",
        passwordReset: process.env.VITE_SENDGRID_PASSWORD_RESET_TEMPLATE || "",
      },
    },
  },
};

// Environment-specific configuration
export const getCurrentConfig = () => {
  const isDevelopment = import.meta.env.DEV;
  const isProduction = import.meta.env.PROD;

  return {
    ...WEBAPP_CONFIG,
    current: isDevelopment
      ? WEBAPP_CONFIG.development
      : WEBAPP_CONFIG.production,
    isDevelopment,
    isProduction,
    version: import.meta.env.VITE_APP_VERSION || "1.0.0",
    buildTime: import.meta.env.VITE_BUILD_TIME || new Date().toISOString(),
  };
};

// Utility to get environment variables with fallbacks
export const getEnvVar = (key: string, fallback: string = ""): string => {
  return import.meta.env[key] || process.env[key] || fallback;
};

// Feature flag checker
export const isFeatureEnabled = (
  feature: keyof typeof WEBAPP_CONFIG.features,
): boolean => {
  return WEBAPP_CONFIG.features[feature] === true;
};

// Responsive breakpoint checker (for JS usage)
export const getBreakpoint = (
  width: number,
): "mobile" | "tablet" | "desktop" => {
  if (width < WEBAPP_CONFIG.ui.mobileBreakpoint) return "mobile";
  if (width < WEBAPP_CONFIG.ui.desktopBreakpoint) return "tablet";
  return "desktop";
};
