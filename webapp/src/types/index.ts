// Re-export all shared types for webapp
export * from "../../../shared-resources/models";

// Webapp-specific types and extensions
import {
  Product as SharedProduct,
  User as SharedUser,
  CartItem as SharedCartItem,
  WardrobeItem as SharedWardrobeItem,
} from "../../../shared-resources/models";

// Extended types for webapp-specific functionality
export interface WebappProduct extends SharedProduct {
  // Web-specific fields
  webOptimizedImageURL?: string;
  lazyLoadImageURL?: string;
  isInViewport?: boolean;
  isLoading?: boolean;
}

export interface WebappUser extends SharedUser {
  // Web-specific fields
  preferences?: UserPreferences;
  sessionToken?: string;
  lastLoginAt?: string;
  isEmailVerified?: boolean;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  currency: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
  };
  privacy: {
    shareData: boolean;
    analytics: boolean;
    personalization: boolean;
  };
  accessibility: {
    reduceMotion: boolean;
    highContrast: boolean;
    fontSize: "small" | "medium" | "large";
  };
}

export interface WebappCartItem extends SharedCartItem {
  // Web-specific fields
  addedAt: string;
  savedForLater?: boolean;
  lastModified: string;
}

export interface WebappWardrobeItem extends SharedWardrobeItem {
  // Web-specific fields
  syncStatus?: "synced" | "pending" | "error";
  lastWorn?: string;
  wearCount?: number;
}

// Navigation and routing types
export interface NavigationItem {
  path: string;
  label: string;
  icon?: string;
  description?: string;
  children?: NavigationItem[];
  requiresAuth?: boolean;
  external?: boolean;
}

export interface Breadcrumb {
  label: string;
  path?: string;
  isCurrentPage?: boolean;
}

// Form and validation types
export interface FormField<T = any> {
  value: T;
  error?: string;
  touched: boolean;
  disabled?: boolean;
  required?: boolean;
}

export interface FormState<T extends Record<string, any>> {
  fields: {
    [K in keyof T]: FormField<T[K]>;
  };
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  submitCount: number;
  errors: Partial<Record<keyof T, string>>;
}

// UI component types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  persistent?: boolean;
  showCloseButton?: boolean;
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  persistent?: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
  lastUpdated?: string;
}

// Search and filter types specific to webapp
export interface WebappSearchFilters {
  query: string;
  category?: string;
  subcategory?: string;
  brand?: string[];
  color?: string[];
  size?: string[];
  priceRange?: [number, number];
  rating?: number;
  availability?: "in-stock" | "out-of-stock" | "all";
  sortBy: string;
  sortOrder: "asc" | "desc";
  page: number;
  limit: number;
}

export interface SearchSuggestion {
  type: "product" | "brand" | "category" | "keyword";
  value: string;
  label: string;
  count?: number;
  imageURL?: string;
}

// Analytics and tracking types
export interface AnalyticsEvent {
  name: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  customProperties?: Record<string, any>;
  timestamp: string;
  sessionId: string;
  userId?: string;
}

export interface PageView {
  path: string;
  title: string;
  referrer?: string;
  searchQuery?: string;
  timestamp: string;
  loadTime?: number;
  userId?: string;
}

// Error and exception types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
  stack?: string;
  userId?: string;
  userAgent?: string;
  url?: string;
}

// State management types
export interface AppState {
  // User state
  user: {
    data: WebappUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error?: string;
  };

  // Shopping state
  cart: {
    items: WebappCartItem[];
    isLoading: boolean;
    error?: string;
    lastUpdated?: string;
  };

  // Wardrobe state
  wardrobe: {
    items: WebappWardrobeItem[];
    outfits: any[];
    isLoading: boolean;
    error?: string;
    selectedItems: string[];
  };

  // UI state
  ui: {
    sidebarOpen: boolean;
    searchOpen: boolean;
    theme: "light" | "dark";
    modals: Record<string, boolean>;
    toasts: ToastMessage[];
    loading: Record<string, boolean>;
  };

  // Search state
  search: {
    query: string;
    results: WebappProduct[];
    suggestions: SearchSuggestion[];
    filters: WebappSearchFilters;
    isLoading: boolean;
    error?: string;
  };

  // Try-on state
  tryOn: {
    selectedProduct?: WebappProduct;
    userImage?: string;
    resultImage?: string;
    isProcessing: boolean;
    mode: "clothing" | "decor";
    error?: string;
  };
}

// API types
export interface ApiRequestConfig {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: ApiRequestConfig;
}

// Webhook and real-time types
export interface WebhookEvent {
  id: string;
  type: string;
  data: any;
  timestamp: string;
  source: string;
}

export interface RealtimeEvent {
  type: string;
  data: any;
  timestamp: string;
  userId?: string;
}

// Performance monitoring types
export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  tags?: Record<string, string>;
}

export interface WebVital {
  name: "CLS" | "FID" | "FCP" | "LCP" | "TTFB";
  value: number;
  delta: number;
  id: string;
  navigationType: string;
}

// Internationalization types
export interface Translation {
  key: string;
  value: string;
  locale: string;
  namespace?: string;
}

export interface LocaleData {
  code: string;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  translations: Record<string, string>;
}

// File upload types
export interface FileUpload {
  file: File;
  preview?: string;
  progress?: number;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
  url?: string;
}

export interface ImageUpload extends FileUpload {
  dimensions?: {
    width: number;
    height: number;
  };
  optimizedUrl?: string;
  thumbnailUrl?: string;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

// Generic response wrapper
export type AsyncData<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};
