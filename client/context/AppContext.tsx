import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Types
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  brand: string;
  color: string;
  category: "clothing" | "decor";
  image: string;
  rating: number;
  reviews?: number;
  size?: string[];
  material?: string;
  isNew?: boolean;
  onSale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface AppState {
  // Try-on state
  previewImage: string | null;
  tryMode: "clothes" | "decor";
  userPhoto: string | null;
  roomPhoto: string | null;
  selectedProduct: Product | null;
  isProcessing: boolean;

  // Shopping state
  cart: CartItem[];
  wishlist: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  searchResults: Product[];

  // User state
  isGuest: boolean;
  user: {
    id?: string;
    name?: string;
    email?: string;
  } | null;
}

// Actions
type AppAction =
  | { type: "SET_PREVIEW_IMAGE"; payload: string | null }
  | { type: "SET_TRY_MODE"; payload: "clothes" | "decor" }
  | { type: "SET_USER_PHOTO"; payload: string | null }
  | { type: "SET_ROOM_PHOTO"; payload: string | null }
  | { type: "SET_SELECTED_PRODUCT"; payload: Product | null }
  | { type: "SET_PROCESSING"; payload: boolean }
  | {
      type: "ADD_TO_CART";
      payload: {
        product: Product;
        quantity?: number;
        selectedSize?: string;
        selectedColor?: string;
      };
    }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | {
      type: "UPDATE_CART_QUANTITY";
      payload: { productId: number; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "ADD_TO_WISHLIST"; payload: Product }
  | { type: "REMOVE_FROM_WISHLIST"; payload: number }
  | { type: "SET_FILTERED_PRODUCTS"; payload: Product[] }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_SEARCH_RESULTS"; payload: Product[] }
  | { type: "SET_USER"; payload: AppState["user"] }
  | { type: "SET_GUEST_MODE"; payload: boolean };

// Initial state
const initialState: AppState = {
  previewImage: null,
  tryMode: "clothes",
  userPhoto: null,
  roomPhoto: null,
  selectedProduct: null,
  isProcessing: false,
  cart: [],
  wishlist: [],
  filteredProducts: [],
  searchQuery: "",
  searchResults: [],
  isGuest: true,
  user: null,
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_PREVIEW_IMAGE":
      return { ...state, previewImage: action.payload };
    case "SET_TRY_MODE":
      return { ...state, tryMode: action.payload };
    case "SET_USER_PHOTO":
      return { ...state, userPhoto: action.payload };
    case "SET_ROOM_PHOTO":
      return { ...state, roomPhoto: action.payload };
    case "SET_SELECTED_PRODUCT":
      return { ...state, selectedProduct: action.payload };
    case "SET_PROCESSING":
      return { ...state, isProcessing: action.payload };
    case "ADD_TO_CART":
      const {
        product,
        quantity = 1,
        selectedSize,
        selectedColor,
      } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor,
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += quantity;
        return { ...state, cart: updatedCart };
      } else {
        // Add new item to cart
        const newCartItem: CartItem = {
          product,
          quantity,
          selectedSize,
          selectedColor,
        };
        return { ...state, cart: [...state.cart, newCartItem] };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };
    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.product.id === action.payload.productId
              ? { ...item, quantity: action.payload.quantity }
              : item,
          )
          .filter((item) => item.quantity > 0), // Remove items with 0 quantity
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "ADD_TO_WISHLIST":
      if (state.wishlist.find((item) => item.id === action.payload.id)) {
        return state; // Item already in wishlist
      }
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
      };
    case "SET_FILTERED_PRODUCTS":
      return { ...state, filteredProducts: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_SEARCH_RESULTS":
      return { ...state, searchResults: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload, isGuest: !action.payload };
    case "SET_GUEST_MODE":
      return { ...state, isGuest: action.payload };
    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

// Helper functions
export const useAppActions = () => {
  const { dispatch } = useApp();

  return {
    setPreviewImage: (image: string | null) =>
      dispatch({ type: "SET_PREVIEW_IMAGE", payload: image }),
    setTryMode: (mode: "clothes" | "decor") =>
      dispatch({ type: "SET_TRY_MODE", payload: mode }),
    setUserPhoto: (photo: string | null) =>
      dispatch({ type: "SET_USER_PHOTO", payload: photo }),
    setRoomPhoto: (photo: string | null) =>
      dispatch({ type: "SET_ROOM_PHOTO", payload: photo }),
    setSelectedProduct: (product: Product | null) =>
      dispatch({ type: "SET_SELECTED_PRODUCT", payload: product }),
    setProcessing: (processing: boolean) =>
      dispatch({ type: "SET_PROCESSING", payload: processing }),
    addToCart: (product: Product) =>
      dispatch({ type: "ADD_TO_CART", payload: product }),
    removeFromCart: (productId: number) =>
      dispatch({ type: "REMOVE_FROM_CART", payload: productId }),
    addToWishlist: (product: Product) =>
      dispatch({ type: "ADD_TO_WISHLIST", payload: product }),
    removeFromWishlist: (productId: number) =>
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: productId }),
    setFilteredProducts: (products: Product[]) =>
      dispatch({ type: "SET_FILTERED_PRODUCTS", payload: products }),
    setSearchQuery: (query: string) =>
      dispatch({ type: "SET_SEARCH_QUERY", payload: query }),
    setSearchResults: (results: Product[]) =>
      dispatch({ type: "SET_SEARCH_RESULTS", payload: results }),
    setUser: (user: AppState["user"]) =>
      dispatch({ type: "SET_USER", payload: user }),
    setGuestMode: (isGuest: boolean) =>
      dispatch({ type: "SET_GUEST_MODE", payload: isGuest }),
  };
};
