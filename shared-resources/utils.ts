import {
  Product,
  CartItem,
  WardrobeItem,
  SearchFilters,
  SortOption,
  ProductCategory,
} from "./models";

// Price formatting utilities
export function formatPrice(price: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(price);
}

export function calculateDiscountPercentage(
  originalPrice: number,
  salePrice: number,
): number {
  if (originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

// Date formatting utilities
export function formatDate(
  dateString: string,
  locale: string = "en-US",
): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

// Product utilities
export function getProductImage(product: Product, color?: string): string {
  if (color && product.images && product.images[color]) {
    return product.images[color];
  }
  return product.imageURL;
}

export function isProductOnSale(product: Product): boolean {
  return (
    product.onSale &&
    product.originalPrice !== undefined &&
    product.originalPrice > product.price
  );
}

export function getProductDiscountAmount(product: Product): number {
  if (!isProductOnSale(product) || !product.originalPrice) return 0;
  return product.originalPrice - product.price;
}

// Cart utilities
export function calculateCartTotal(cartItems: CartItem[]): number {
  return cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
}

export function calculateCartItemCount(cartItems: CartItem[]): number {
  return cartItems.reduce((count, item) => count + item.quantity, 0);
}

export function findCartItem(
  cartItems: CartItem[],
  productId: number,
  size?: string,
  color?: string,
): CartItem | undefined {
  return cartItems.find(
    (item) =>
      item.product.id === productId &&
      item.selectedSize === size &&
      item.selectedColor === color,
  );
}

// Wardrobe utilities
export function categorizeWardrobeItems(items: WardrobeItem[]): {
  purchased: WardrobeItem[];
  personal: WardrobeItem[];
} {
  return {
    purchased: items.filter((item) => !item.isPersonalItem),
    personal: items.filter((item) => item.isPersonalItem),
  };
}

export function getWardrobeItemsByCategory(
  items: WardrobeItem[],
  category: ProductCategory,
): WardrobeItem[] {
  return items.filter((item) => item.product.category === category);
}

// Search and filter utilities
export function filterProducts(
  products: Product[],
  filters: SearchFilters,
): Product[] {
  let filtered = [...products];

  // Filter by category
  if (filters.category) {
    filtered = filtered.filter(
      (product) => product.category === filters.category,
    );
  }

  // Filter by price range
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filtered = filtered.filter(
      (product) => product.price >= min && product.price <= max,
    );
  }

  // Filter by brands
  if (filters.brands.length > 0) {
    filtered = filtered.filter((product) =>
      filters.brands.some((brand) =>
        product.brand.toLowerCase().includes(brand.toLowerCase()),
      ),
    );
  }

  // Filter by colors
  if (filters.colors.length > 0) {
    filtered = filtered.filter((product) =>
      filters.colors.some(
        (color) =>
          product.color.toLowerCase().includes(color.toLowerCase()) ||
          (product.availableColors &&
            product.availableColors.some((availableColor) =>
              availableColor.toLowerCase().includes(color.toLowerCase()),
            )),
      ),
    );
  }

  // Filter by sizes
  if (filters.sizes.length > 0) {
    filtered = filtered.filter(
      (product) =>
        product.sizes &&
        product.sizes.some((size) => filters.sizes.includes(size)),
    );
  }

  return filtered;
}

export function sortProducts(
  products: Product[],
  sortBy: SortOption,
): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case SortOption.PRICE_LOW:
      return sorted.sort((a, b) => a.price - b.price);

    case SortOption.PRICE_HIGH:
      return sorted.sort((a, b) => b.price - a.price);

    case SortOption.NEWEST:
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    case SortOption.POPULAR:
    default:
      return sorted.sort((a, b) => {
        // Sort by rating, then by review count
        if (b.rating !== a.rating) return b.rating - a.rating;
        return (b.reviews || 0) - (a.reviews || 0);
      });
  }
}

export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) return products;

  const lowerQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.brand.toLowerCase().includes(lowerQuery) ||
      product.color.toLowerCase().includes(lowerQuery) ||
      product.material?.toLowerCase().includes(lowerQuery) ||
      product.subcategory?.toLowerCase().includes(lowerQuery),
  );
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  // At least 6 characters
  return password.length >= 6;
}

export function isValidPhone(phone: string): boolean {
  // Basic phone validation - 10+ digits
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

// Image utilities
export function isValidImageFormat(filename: string): boolean {
  const validFormats = ["jpg", "jpeg", "png", "webp"];
  const extension = filename.split(".").pop()?.toLowerCase();
  return extension ? validFormats.includes(extension) : false;
}

export function getImageDimensions(
  file: File,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

// Color utilities
export function hexToRgb(
  hex: string,
): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function getContrastColor(hexColor: string): string {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return "#000000";

  // Calculate brightness
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 155 ? "#000000" : "#FFFFFF";
}

// Local storage utilities (for web)
export function saveToLocalStorage<T>(key: string, data: T): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data));
    }
  } catch (error) {
    console.warn("Failed to save to localStorage:", error);
  }
}

export function loadFromLocalStorage<T>(key: string): T | null {
  try {
    if (typeof localStorage !== "undefined") {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  } catch (error) {
    console.warn("Failed to load from localStorage:", error);
  }
  return null;
}

export function removeFromLocalStorage(key: string): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.warn("Failed to remove from localStorage:", error);
  }
}

// URL utilities
export function generateShareURL(
  type: "product" | "outfit",
  id: string | number,
): string {
  const baseURL =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://indusa.ai";
  return `${baseURL}/share/${type}/${id}`;
}

export function generateInstagramCaption(
  productName: string,
  brand: string,
): string {
  return `Just tried on this amazing ${productName} from ${brand} using Indusa's AI try-on! 🔥✨ #IndusaAI #VirtualTryOn #AIFashion #TryOn`;
}

// Performance utilities
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Random utilities
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, Math.min(count, array.length));
}
