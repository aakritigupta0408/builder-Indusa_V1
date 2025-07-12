import { Product, Designer, ProductCategory } from "./models";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Classic White Button Down",
    price: 89.99,
    originalPrice: 129.99,
    brand: "ZARA",
    color: "White",
    availableColors: ["White", "Light Blue", "Black"],
    category: ProductCategory.CLOTHING,
    subcategory: "tops",
    imageURL:
      "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400",
    images: {
      White:
        "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400",
      "Light Blue":
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
      Black:
        "https://images.unsplash.com/photo-1603252109303-2751441309cc?w=400",
    },
    rating: 4.6,
    reviews: 234,
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Cotton Blend",
    isNew: true,
    onSale: true,
  },
  {
    id: 2,
    name: "High-Waisted Jeans",
    price: 129.99,
    originalPrice: undefined,
    brand: "H&M",
    color: "Dark Blue",
    availableColors: ["Dark Blue", "Light Blue", "Black"],
    category: ProductCategory.CLOTHING,
    subcategory: "bottoms",
    imageURL: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    rating: 4.4,
    reviews: 189,
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
    material: "Denim",
    isNew: false,
    onSale: false,
  },
  {
    id: 3,
    name: "Minimalist Throw Pillow",
    price: 45.99,
    originalPrice: undefined,
    brand: "West Elm",
    color: "Sage Green",
    availableColors: ["Sage Green", "Dusty Pink", "Cream"],
    category: ProductCategory.DECOR,
    subcategory: "textiles",
    imageURL:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    rating: 4.8,
    reviews: 156,
    sizes: undefined,
    material: "Organic Cotton",
    isNew: false,
    onSale: false,
  },
  {
    id: 4,
    name: "Vintage Denim Jacket",
    price: 179.99,
    originalPrice: 220.0,
    brand: "UNIQLO",
    color: "Medium Blue",
    availableColors: ["Medium Blue", "Black", "White"],
    category: ProductCategory.CLOTHING,
    subcategory: "outerwear",
    imageURL: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400",
    rating: 4.7,
    reviews: 342,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    material: "100% Cotton Denim",
    isNew: true,
    onSale: true,
  },
  {
    id: 5,
    name: "Modern Table Lamp",
    price: 199.99,
    originalPrice: undefined,
    brand: "IKEA",
    color: "Brass",
    availableColors: ["Brass", "Black", "White"],
    category: ProductCategory.DECOR,
    subcategory: "lighting",
    imageURL:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    rating: 4.5,
    reviews: 98,
    sizes: undefined,
    material: "Metal & Fabric",
    isNew: false,
    onSale: false,
  },
  {
    id: 6,
    name: "Floral Summer Dress",
    price: 159.99,
    originalPrice: undefined,
    brand: "ZARA",
    color: "Floral Print",
    availableColors: ["Floral Print", "Solid Pink", "Solid Yellow"],
    category: ProductCategory.CLOTHING,
    subcategory: "dresses",
    imageURL:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    rating: 4.3,
    reviews: 267,
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Viscose Blend",
    isNew: true,
    onSale: false,
  },
  {
    id: 7,
    name: "Minimalist Coffee Table",
    price: 399.99,
    originalPrice: 499.99,
    brand: "CB2",
    color: "Natural Wood",
    availableColors: ["Natural Wood", "Black Oak", "White Oak"],
    category: ProductCategory.DECOR,
    subcategory: "furniture",
    imageURL:
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400",
    rating: 4.6,
    reviews: 89,
    sizes: undefined,
    material: "Solid Oak Wood",
    isNew: false,
    onSale: true,
  },
  {
    id: 8,
    name: "Cashmere Sweater",
    price: 299.99,
    originalPrice: undefined,
    brand: "UNIQLO",
    color: "Cream",
    availableColors: ["Cream", "Navy", "Charcoal", "Burgundy"],
    category: ProductCategory.CLOTHING,
    subcategory: "sweaters",
    imageURL:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
    rating: 4.8,
    reviews: 412,
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "100% Cashmere",
    isNew: true,
    onSale: false,
  },
];

export const mockDesigners: Designer[] = [
  {
    id: 1,
    name: "ZARA",
    description:
      "Fast fashion retailer known for trendy, affordable clothing that brings runway styles to everyday wardrobes.",
    imageURL:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200",
    coverImageURL:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    specialty: ["Fashion", "Clothing", "Accessories"],
    founded: "1975",
    location: "Spain",
    website: "zara.com",
    social: {
      instagram: "@zara",
      twitter: "@zara",
    },
    featuredIn: ["Vogue", "Harper's Bazaar", "Elle"],
    totalProducts: 15,
    customClothes: {
      available: true,
      startingPrice: 199.0,
      deliveryTime: "3-4 weeks",
      description:
        "Custom tailored pieces designed by ZARA's in-house designers to your exact specifications.",
      categories: ["Dresses", "Blazers", "Trousers", "Shirts", "Skirts"],
    },
  },
  {
    id: 2,
    name: "H&M",
    description:
      "Swedish multinational clothing retailer offering sustainable fashion and conscious choices for the modern consumer.",
    imageURL:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200",
    coverImageURL:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800",
    specialty: ["Sustainable Fashion", "Clothing", "Home"],
    founded: "1947",
    location: "Sweden",
    website: "hm.com",
    social: {
      instagram: "@hm",
      twitter: "@hm",
    },
    featuredIn: ["Fashion Week", "Sustainability Awards"],
    totalProducts: 12,
    customClothes: {
      available: true,
      startingPrice: 149.0,
      deliveryTime: "2-3 weeks",
      description:
        "Sustainable custom clothing made from eco-friendly materials with H&M's conscious design philosophy.",
      categories: ["T-Shirts", "Hoodies", "Jeans", "Jackets", "Dresses"],
    },
  },
  {
    id: 3,
    name: "UNIQLO",
    description:
      "Japanese casual wear designer, manufacturer and retailer focused on high-quality basics and innovative fabrics.",
    imageURL: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200",
    coverImageURL:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800",
    specialty: ["Basics", "Innovation", "Technology"],
    founded: "1984",
    location: "Japan",
    website: "uniqlo.com",
    social: {
      instagram: "@uniqlo",
      twitter: "@uniqlo",
    },
    featuredIn: ["Tech Fashion", "Innovation Awards"],
    totalProducts: 18,
    customClothes: {
      available: true,
      startingPrice: 99.0,
      deliveryTime: "1-2 weeks",
      description:
        "Custom basics using UNIQLO's innovative fabric technology for the perfect fit and comfort.",
      categories: [
        "Basics",
        "Underwear",
        "Activewear",
        "Casual Wear",
        "Work Wear",
      ],
    },
  },
  {
    id: 4,
    name: "West Elm",
    description:
      "Modern furniture and home decor brand offering contemporary designs for the modern home and lifestyle.",
    imageURL:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200",
    coverImageURL:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
    specialty: ["Home Decor", "Furniture", "Modern Design"],
    founded: "2002",
    location: "Brooklyn, NY",
    website: "westelm.com",
    social: {
      instagram: "@westelm",
      twitter: "@westelm",
    },
    featuredIn: ["Architectural Digest", "House Beautiful"],
    totalProducts: 8,
    customClothes: undefined,
  },
  {
    id: 5,
    name: "IKEA",
    description:
      "Swedish furniture retailer known for affordable, functional design and flat-pack furniture for every room in the home.",
    imageURL:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200",
    coverImageURL:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
    specialty: ["Furniture", "Affordable Design", "Functional"],
    founded: "1943",
    location: "Sweden",
    website: "ikea.com",
    social: {
      instagram: "@ikea",
      twitter: "@ikea",
    },
    featuredIn: ["Design Awards", "Sustainability Recognition"],
    totalProducts: 22,
    customClothes: undefined,
  },
  {
    id: 6,
    name: "CB2",
    description:
      "Modern furniture and home decor for apartments, condos, and lofts with a focus on contemporary urban living.",
    imageURL:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200",
    coverImageURL:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
    specialty: ["Modern Furniture", "Urban Living", "Contemporary"],
    founded: "2000",
    location: "Chicago, IL",
    website: "cb2.com",
    social: {
      instagram: "@cb2",
      twitter: "@cb2",
    },
    featuredIn: ["Interior Design", "Modern Living"],
    totalProducts: 14,
    customClothes: undefined,
  },
];

// Helper functions
export function getProductsByCategory(category: ProductCategory): Product[] {
  return mockProducts.filter((product) => product.category === category);
}

export function getProductsByBrand(brand: string): Product[] {
  return mockProducts.filter(
    (product) => product.brand.toLowerCase() === brand.toLowerCase(),
  );
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.brand.toLowerCase().includes(lowerQuery) ||
      product.color.toLowerCase().includes(lowerQuery) ||
      product.material?.toLowerCase().includes(lowerQuery),
  );
}

export function getDesignerById(id: number): Designer | undefined {
  return mockDesigners.find((designer) => designer.id === id);
}

export function getDesignerByBrand(brandName: string): Designer | undefined {
  return mockDesigners.find(
    (designer) => designer.name.toLowerCase() === brandName.toLowerCase(),
  );
}
