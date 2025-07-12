// Re-export all shared utilities
export * from "../../../shared-resources/utils";

// Import specific utilities from shared resources
import {
  formatPrice,
  calculateDiscountPercentage,
  formatDate,
  formatRelativeTime,
  debounce,
  throttle,
  generateId,
  isValidEmail,
  isValidPassword,
} from "../../../shared-resources/utils";

// Webapp-specific utilities
import { WEBAPP_CONFIG } from "../config";

// Re-export commonly used shared utilities
export {
  formatPrice,
  calculateDiscountPercentage,
  formatDate,
  formatRelativeTime,
  debounce,
  throttle,
  generateId,
  isValidEmail,
  isValidPassword,
};

// DOM and Browser utilities
export const isBrowser = typeof window !== "undefined";

export const isClient = typeof window !== "undefined";

export const getUserAgent = (): string => {
  return isBrowser ? navigator.userAgent : "";
};

export const getViewportSize = (): { width: number; height: number } => {
  if (!isBrowser) return { width: 0, height: 0 };
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export const getScrollPosition = (): { x: number; y: number } => {
  if (!isBrowser) return { x: 0, y: 0 };
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  };
};

export const scrollToTop = (smooth: boolean = true): void => {
  if (!isBrowser) return;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: smooth ? "smooth" : "auto",
  });
};

export const scrollToElement = (
  elementId: string,
  offset: number = 0,
): void => {
  if (!isBrowser) return;
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.offsetTop - offset;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }
};

// Device detection utilities
export const isMobile = (): boolean => {
  if (!isBrowser) return false;
  return window.innerWidth < WEBAPP_CONFIG.ui.mobileBreakpoint;
};

export const isTablet = (): boolean => {
  if (!isBrowser) return false;
  const width = window.innerWidth;
  return (
    width >= WEBAPP_CONFIG.ui.mobileBreakpoint &&
    width < WEBAPP_CONFIG.ui.desktopBreakpoint
  );
};

export const isDesktop = (): boolean => {
  if (!isBrowser) return false;
  return window.innerWidth >= WEBAPP_CONFIG.ui.desktopBreakpoint;
};

export const isTouchDevice = (): boolean => {
  if (!isBrowser) return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

// Theme and accessibility utilities
export const getSystemTheme = (): "light" | "dark" => {
  if (!isBrowser) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const shouldReduceMotion = (): boolean => {
  if (!isBrowser) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const getHighContrastPreference = (): boolean => {
  if (!isBrowser) return false;
  return window.matchMedia("(prefers-contrast: high)").matches;
};

// Cookie utilities
export const setCookie = (
  name: string,
  value: string,
  days: number = 30,
): void => {
  if (!isBrowser) return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

export const getCookie = (name: string): string | null => {
  if (!isBrowser) return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookie = (name: string): void => {
  if (!isBrowser) return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// URL and routing utilities
export const getCurrentPath = (): string => {
  if (!isBrowser) return "/";
  return window.location.pathname;
};

export const getQueryParams = (): URLSearchParams => {
  if (!isBrowser) return new URLSearchParams();
  return new URLSearchParams(window.location.search);
};

export const setQueryParam = (key: string, value: string): void => {
  if (!isBrowser) return;
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState({}, "", url.toString());
};

export const removeQueryParam = (key: string): void => {
  if (!isBrowser) return;
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  window.history.replaceState({}, "", url.toString());
};

// Image utilities specific to webapp
export const createImageUrl = (
  url: string,
  transformations?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
  },
): string => {
  // If using Cloudinary or similar service
  if (transformations && url.includes("cloudinary")) {
    const { width, height, quality = 80, format = "auto" } = transformations;
    const params = [];
    if (width) params.push(`w_${width}`);
    if (height) params.push(`h_${height}`);
    params.push(`q_${quality}`);
    params.push(`f_${format}`);

    const transformation = params.join(",");
    return url.replace("/upload/", `/upload/${transformation}/`);
  }

  return url;
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const getImageDimensions = (
  src: string,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = src;
  });
};

// Performance utilities
export const measurePerformance = <T>(
  fn: () => T,
  label?: string,
): { result: T; duration: number } => {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;

  if (label && WEBAPP_CONFIG.development.enableDebugMode) {
    console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
  }

  return { result, duration };
};

export const measureAsyncPerformance = async <T>(
  fn: () => Promise<T>,
  label?: string,
): Promise<{ result: T; duration: number }> => {
  const start = performance.now();
  const result = await fn();
  const duration = performance.now() - start;

  if (label && WEBAPP_CONFIG.development.enableDebugMode) {
    console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
  }

  return { result, duration };
};

// Analytics utilities
export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>,
): void => {
  if (!WEBAPP_CONFIG.features.enableAnalytics) return;

  // Google Analytics 4
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, properties);
  }

  // Custom analytics
  if (typeof window !== "undefined" && window.analytics) {
    window.analytics.track(eventName, properties);
  }
};

export const trackPageView = (path: string, title?: string): void => {
  if (!WEBAPP_CONFIG.features.enableAnalytics) return;

  // Google Analytics 4
  if (typeof gtag !== "undefined") {
    gtag("config", WEBAPP_CONFIG.analytics.googleAnalyticsId, {
      page_path: path,
      page_title: title,
    });
  }

  // Custom analytics
  if (typeof window !== "undefined" && window.analytics) {
    window.analytics.page(path, { title });
  }
};

// Error handling utilities
export const logError = (error: Error, context?: Record<string, any>): void => {
  console.error("Application Error:", error);

  if (WEBAPP_CONFIG.analytics.enableErrorTracking) {
    // Send to error tracking service (e.g., Sentry)
    if (typeof window !== "undefined" && window.Sentry) {
      window.Sentry.captureException(error, { extra: context });
    }
  }
};

export const createErrorHandler =
  (context: string) =>
  (error: Error): void => {
    logError(error, { context });
  };

// Notification utilities for webapp
export const requestNotificationPermission =
  async (): Promise<NotificationPermission> => {
    if (!isBrowser || !("Notification" in window)) {
      return "denied";
    }

    if (Notification.permission === "granted") {
      return "granted";
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      return permission;
    }

    return Notification.permission;
  };

export const showNotification = (
  title: string,
  options?: NotificationOptions,
): Notification | null => {
  if (
    !isBrowser ||
    !("Notification" in window) ||
    Notification.permission !== "granted"
  ) {
    return null;
  }

  return new Notification(title, {
    icon: "/favicon.ico",
    badge: "/badge-icon.png",
    ...options,
  });
};

// Clipboard utilities
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!isBrowser) return false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand("copy");
      textArea.remove();
      return result;
    }
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
};

// Download utilities
export const downloadFile = (url: string, filename?: string): void => {
  if (!isBrowser) return;

  const link = document.createElement("a");
  link.href = url;
  if (filename) link.download = filename;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadBlob = (blob: Blob, filename: string): void => {
  if (!isBrowser) return;

  const url = URL.createObjectURL(blob);
  downloadFile(url, filename);
  setTimeout(() => URL.revokeObjectURL(url), 100);
};

// Type guards for webapp
export const isWebappProduct = (
  obj: any,
): obj is import("../types").WebappProduct => {
  return obj && typeof obj.id === "number" && typeof obj.name === "string";
};

export const isWebappUser = (
  obj: any,
): obj is import("../types").WebappUser => {
  return obj && typeof obj.id === "string" && typeof obj.email === "string";
};

// Global type declarations for third-party services
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    analytics?: {
      track: (event: string, properties?: any) => void;
      page: (path: string, properties?: any) => void;
    };
    Sentry?: {
      captureException: (error: Error, context?: any) => void;
    };
  }
}
