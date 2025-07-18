import { Product } from "@/context/AppContext";

export const allProducts: Product[] = [
  // Clothing Items
  {
    id: 1,
    name: "Oversized Blazer",
    price: 129,
    originalPrice: 189,
    brand: "ZARA",
    color: "Black",
    availableColors: ["Black", "Navy", "Beige", "Grey"],
    category: "clothing",
    image: "/placeholder.svg",
    images: {
      Black: "/placeholder.svg",
      Navy: "/placeholder.svg",
      Beige: "/placeholder.svg",
      Grey: "/placeholder.svg",
    },
    rating: 4.5,
    reviews: 128,
    size: ["XS", "S", "M", "L", "XL"],
    material: "wool",
    isNew: true,
    onSale: true,
  },
  {
    id: 2,
    name: "Silk Midi Dress",
    price: 245,
    brand: "H&M",
    color: "Navy",
    availableColors: ["Navy", "Black", "Emerald", "Burgundy"],
    category: "clothing",
    image: "/placeholder.svg",
    images: {
      Navy: "/placeholder.svg",
      Black: "/placeholder.svg",
      Emerald: "/placeholder.svg",
      Burgundy: "/placeholder.svg",
    },
    rating: 4.7,
    reviews: 203,
    size: ["XS", "S", "M", "L"],
    material: "silk",
    isNew: true,
    onSale: false,
  },
  {
    id: 3,
    name: "Cropped Sweater",
    price: 89,
    brand: "UNIQLO",
    color: "Cream",
    category: "clothing",
    image: "/placeholder.svg",
    rating: 4.3,
    reviews: 156,
    size: ["XS", "S", "M", "L", "XL"],
    material: "cotton",
    isNew: false,
    onSale: false,
  },
  {
    id: 4,
    name: "Wide Leg Trousers",
    price: 159,
    brand: "COS",
    color: "Charcoal",
    category: "clothing",
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 89,
    size: ["XS", "S", "M", "L", "XL"],
    material: "wool",
    isNew: false,
    onSale: false,
  },
  {
    id: 5,
    name: "Denim Jacket",
    price: 79,
    originalPrice: 99,
    brand: "Levi's",
    color: "Blue",
    category: "clothing",
    image: "/placeholder.svg",
    rating: 4.4,
    reviews: 312,
    size: ["XS", "S", "M", "L", "XL", "XXL"],
    material: "denim",
    isNew: false,
    onSale: true,
  },
  {
    id: 6,
    name: "White Button Shirt",
    price: 69,
    brand: "EVERLANE",
    color: "White",
    category: "clothing",
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 445,
    size: ["XS", "S", "M", "L", "XL"],
    material: "cotton",
    isNew: false,
    onSale: false,
  },
  {
    id: 7,
    name: "Leather Boots",
    price: 199,
    brand: "Dr. Martens",
    color: "Black",
    category: "clothing",
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 278,
    size: ["6", "7", "8", "9", "10", "11"],
    material: "leather",
    isNew: true,
    onSale: false,
  },
  {
    id: 8,
    name: "Cashmere Scarf",
    price: 129,
    originalPrice: 159,
    brand: "JOHNSTONS",
    color: "Grey",
    category: "clothing",
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 89,
    material: "cashmere",
    isNew: false,
    onSale: true,
  },

  // Home Decor Items
  {
    id: 9,
    name: "Minimalist Sofa",
    price: 899,
    originalPrice: 1299,
    brand: "IKEA",
    color: "Beige",
    category: "decor",
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 89,
    material: "fabric",
    isNew: false,
    onSale: true,
  },
  {
    id: 10,
    name: "Modern Floor Lamp",
    price: 159,
    brand: "West Elm",
    color: "Gold",
    category: "decor",
    image: "/placeholder.svg",
    rating: 4.3,
    reviews: 67,
    material: "metal",
    isNew: false,
    onSale: false,
  },
  {
    id: 11,
    name: "Coffee Table",
    price: 329,
    brand: "CB2",
    color: "Walnut",
    category: "decor",
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 123,
    material: "wood",
    isNew: false,
    onSale: false,
  },
  {
    id: 12,
    name: "Persian Area Rug",
    price: 199,
    brand: "Rugs USA",
    color: "Persian Blue",
    category: "decor",
    image: "/placeholder.svg",
    rating: 4.4,
    reviews: 234,
    material: "wool",
    isNew: false,
    onSale: false,
  },
  {
    id: 13,
    name: "Velvet Armchair",
    price: 549,
    originalPrice: 699,
    brand: "Article",
    color: "Emerald",
    category: "decor",
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 156,
    material: "velvet",
    isNew: true,
    onSale: true,
  },
  {
    id: 14,
    name: "Ceramic Vase Set",
    price: 89,
    brand: "CB2",
    color: "White",
    category: "decor",
    image: "/placeholder.svg",
    rating: 4.2,
    reviews: 78,
    material: "ceramic",
    isNew: false,
    onSale: false,
  },
  {
    id: 15,
    name: "Wall Mirror",
    price: 149,
    brand: "Urban Outfitters",
    color: "Gold",
    category: "decor",
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 234,
    material: "metal",
    isNew: true,
    onSale: false,
  },
  {
    id: 16,
    name: "Throw Pillows Set",
    price: 49,
    originalPrice: 69,
    brand: "H&M Home",
    color: "Navy",
    category: "decor",
    image: "/placeholder.svg",
    rating: 4.1,
    reviews: 345,
    material: "cotton",
    isNew: false,
    onSale: true,
  },
];

// Search function
export const searchProducts = (
  query: string,
  products: Product[] = allProducts,
): Product[] => {
  if (!query.trim()) return [];

  const searchTerm = query.toLowerCase().trim();

  return products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.color.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      (product.material && product.material.toLowerCase().includes(searchTerm))
    );
  });
};

// Get featured products
export const getFeaturedProducts = (): Product[] => {
  return allProducts
    .filter((product) => product.isNew || product.onSale)
    .slice(0, 8);
};

// Get products by category
export const getProductsByCategory = (
  category: "clothing" | "decor",
): Product[] => {
  return allProducts.filter((product) => product.category === category);
};
