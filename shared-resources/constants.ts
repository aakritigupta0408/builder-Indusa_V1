// Shared constants for both webapp and iOS

// Brand Configuration
export const BRAND_CONFIG = {
  name: "INDUSA",
  tagline: "Made by Humans • Delivered By AI",
  colors: {
    primary: "#CC1A7F", // Pink-Purple
    secondary: "#6B21A8", // Purple
    accent: "#00BCD4", // Cyan
    gradientStart: "#CC1A7F",
    gradientMiddle: "#9C2BAE",
    gradientEnd: "#00BCD4",
    background: "#FAF8FC",
    cardBackground: "#FFFFFF",
    textPrimary: "#1A1A1A",
    textSecondary: "#666666",
    textMuted: "#999999",
  },
  social: {
    instagram: "@indusa_ai",
    twitter: "@indusa_ai",
    website: "https://indusa.ai",
  },
};

// API Configuration
export const API_CONFIG = {
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://api.indusa.ai"
      : "http://localhost:3001",
  version: "v1",
  timeout: 10000,
  endpoints: {
    auth: "/auth",
    products: "/products",
    users: "/users",
    cart: "/cart",
    wardrobe: "/wardrobe",
    tryOn: "/try-on",
    sizing: "/sizing",
    recommendations: "/recommendations",
    orders: "/orders",
    designers: "/designers",
  },
};

// App Configuration
export const APP_CONFIG = {
  name: "Indusa",
  version: "1.0.0",
  minSupportedVersion: "1.0.0",
  features: {
    virtualTryOn: true,
    aiSizing: true,
    socialSharing: true,
    offlineMode: false,
    pushNotifications: true,
  },
  limits: {
    maxCartItems: 50,
    maxWardrobeItems: 500,
    maxOutfits: 100,
    maxImageSizeMB: 10,
    maxSearchHistory: 20,
  },
};

// Try-On Configuration
export const TRYON_CONFIG = {
  supportedImageFormats: ["jpg", "jpeg", "png", "webp"],
  maxImageSizeMB: 10,
  maxImageDimensions: {
    width: 2048,
    height: 2048,
  },
  processingTimeout: 30000, // 30 seconds
  confidenceThreshold: 0.7,
};

// Sizing Configuration
export const SIZING_CONFIG = {
  clothingSizes: {
    numeric: ["XS", "S", "M", "L", "XL", "XXL"],
    us: ["2", "4", "6", "8", "10", "12", "14", "16", "18"],
    uk: ["6", "8", "10", "12", "14", "16", "18", "20", "22"],
    eu: ["32", "34", "36", "38", "40", "42", "44", "46", "48"],
    jeans: [
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "36",
    ],
  },
  measurements: {
    clothing: [
      { key: "height", label: "Height", unit: "cm", min: 140, max: 220 },
      { key: "weight", label: "Weight", unit: "kg", min: 40, max: 150 },
      { key: "chest", label: "Chest/Bust", unit: "cm", min: 70, max: 150 },
      { key: "waist", label: "Waist", unit: "cm", min: 55, max: 130 },
      { key: "hips", label: "Hips", unit: "cm", min: 70, max: 150 },
      { key: "inseam", label: "Inseam", unit: "cm", min: 65, max: 90 },
    ],
    decor: [
      { key: "length", label: "Room Length", unit: "m", min: 2, max: 20 },
      { key: "width", label: "Room Width", unit: "m", min: 2, max: 20 },
      { key: "ceiling", label: "Ceiling Height", unit: "m", min: 2, max: 5 },
    ],
  },
};

// Search Configuration
export const SEARCH_CONFIG = {
  maxResults: 50,
  maxSuggestions: 8,
  debounceMs: 300,
  minQueryLength: 2,
  maxQueryLength: 100,
  popularSearches: [
    "Dresses",
    "Jeans",
    "Sneakers",
    "Home Decor",
    "Furniture",
    "Lighting",
    "Throw Pillows",
    "Business Casual",
  ],
  filters: {
    priceRanges: [
      { min: 0, max: 50, label: "Under $50" },
      { min: 50, max: 100, label: "$50 - $100" },
      { min: 100, max: 200, label: "$100 - $200" },
      { min: 200, max: 500, label: "$200 - $500" },
      { min: 500, max: 999999, label: "Over $500" },
    ],
  },
};

// Notification Types
export const NOTIFICATION_TYPES = {
  ORDER_CONFIRMED: "order_confirmed",
  ORDER_SHIPPED: "order_shipped",
  ORDER_DELIVERED: "order_delivered",
  PRICE_DROP: "price_drop",
  BACK_IN_STOCK: "back_in_stock",
  NEW_ARRIVAL: "new_arrival",
  RECOMMENDATION: "recommendation",
  OUTFIT_SUGGESTION: "outfit_suggestion",
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR:
    "Network connection error. Please check your internet connection.",
  SERVER_ERROR: "Server error. Please try again later.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  USER_NOT_FOUND: "User not found.",
  PRODUCT_NOT_FOUND: "Product not found.",
  CART_FULL: "Your cart is full. Please remove some items.",
  IMAGE_TOO_LARGE: "Image is too large. Please select a smaller image.",
  INVALID_IMAGE_FORMAT:
    "Invalid image format. Please select a JPG, PNG, or WEBP image.",
  TRYON_FAILED: "Virtual try-on failed. Please try with a different image.",
  SIZING_FAILED: "Size recommendation failed. Please check your measurements.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  ADDED_TO_CART: "Added to cart successfully!",
  ADDED_TO_WISHLIST: "Added to wishlist!",
  REMOVED_FROM_WISHLIST: "Removed from wishlist",
  ORDER_PLACED: "Order placed successfully!",
  PROFILE_UPDATED: "Profile updated successfully!",
  OUTFIT_SAVED: "Outfit saved to your wardrobe!",
  ITEM_SHARED: "Item shared successfully!",
} as const;

// Platform-specific configurations
export const PLATFORM_CONFIG = {
  web: {
    supportedBrowsers: ["chrome", "firefox", "safari", "edge"],
    minBrowserVersions: {
      chrome: 90,
      firefox: 88,
      safari: 14,
      edge: 90,
    },
  },
  ios: {
    minIOSVersion: "14.0",
    supportedDevices: ["iPhone", "iPad"],
    requiredPermissions: ["camera", "photoLibrary", "notifications"],
  },
  android: {
    minAndroidVersion: "23", // Android 6.0
    targetSDK: 33,
    requiredPermissions: ["camera", "storage", "notifications"],
  },
};

// Analytics Events
export const ANALYTICS_EVENTS = {
  // User actions
  USER_SIGNUP: "user_signup",
  USER_LOGIN: "user_login",
  USER_LOGOUT: "user_logout",

  // Product interactions
  PRODUCT_VIEW: "product_view",
  PRODUCT_ADD_TO_CART: "product_add_to_cart",
  PRODUCT_ADD_TO_WISHLIST: "product_add_to_wishlist",
  PRODUCT_SHARE: "product_share",

  // Try-on events
  TRYON_START: "tryon_start",
  TRYON_SUCCESS: "tryon_success",
  TRYON_FAILURE: "tryon_failure",
  TRYON_SHARE: "tryon_share",

  // Search events
  SEARCH_QUERY: "search_query",
  SEARCH_FILTER: "search_filter",
  SEARCH_RESULT_CLICK: "search_result_click",

  // Purchase events
  CHECKOUT_START: "checkout_start",
  PURCHASE_COMPLETE: "purchase_complete",

  // Wardrobe events
  WARDROBE_ADD_ITEM: "wardrobe_add_item",
  WARDROBE_CREATE_OUTFIT: "wardrobe_create_outfit",
  WARDROBE_SHARE_OUTFIT: "wardrobe_share_outfit",
} as const;
