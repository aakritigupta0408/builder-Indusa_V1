// Shared data models for both webapp and iOS
// These can be used to generate platform-specific models

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  brand: string;
  color: string;
  availableColors?: string[];
  category: ProductCategory;
  subcategory?: string;
  imageURL: string;
  images?: { [color: string]: string };
  rating: number;
  reviews?: number;
  sizes?: string[];
  material?: string;
  isNew: boolean;
  onSale: boolean;
}

export enum ProductCategory {
  CLOTHING = "clothing",
  DECOR = "decor",
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarURL?: string;
  createdAt: string; // ISO date string
}

export interface WardrobeItem {
  id: string;
  product: Product;
  purchaseDate?: string; // ISO date string
  isPersonalItem: boolean;
  tags?: string[];
}

export interface StyleOutfit {
  id: string;
  name: string;
  items: WardrobeItem[];
  createdAt: string; // ISO date string
  occasion?: string;
}

export interface Designer {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  coverImageURL: string;
  specialty: string[];
  founded: string;
  location: string;
  website?: string;
  social?: {
    instagram?: string;
    twitter?: string;
  };
  featuredIn?: string[];
  totalProducts: number;
  customClothes?: {
    available: boolean;
    startingPrice: number;
    deliveryTime: string;
    description: string;
    categories: string[];
  };
}

export interface SearchFilters {
  category?: ProductCategory;
  priceRange?: [number, number];
  brands: string[];
  colors: string[];
  sizes: string[];
  sortBy: SortOption;
}

export enum SortOption {
  POPULAR = "popular",
  NEWEST = "newest",
  PRICE_LOW = "price-low",
  PRICE_HIGH = "price-high",
}

export interface AppState {
  selectedTab: number;
  isSearchActive: boolean;
  searchQuery: string;
  selectedProduct?: Product;
  isProcessing: boolean;
  tryOnMode: TryOnMode;
  userPhoto?: string; // base64 or URL
  roomPhoto?: string; // base64 or URL
  previewImage?: string; // base64 or URL
}

export enum TryOnMode {
  CLOTHING = "clothing",
  DECOR = "decor",
}

// API Response types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Search and recommendation types
export interface SearchResult {
  products: Product[];
  suggestions: string[];
  filters: {
    availableBrands: string[];
    availableColors: string[];
    priceRange: [number, number];
  };
}

export interface AIRecommendation {
  product: Product;
  reason: string;
  confidence: number;
}

export interface SizeRecommendation {
  brand: string;
  size: string;
  confidence: number;
  measurements?: {
    [key: string]: number;
  };
}
