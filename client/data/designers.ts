export interface Designer {
  id: number;
  name: string;
  description: string;
  image: string;
  coverImage: string;
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

export const designers: Designer[] = [
  {
    id: 1,
    name: "ZARA",
    description:
      "Fast fashion retailer known for trendy, affordable clothing that brings runway styles to everyday wardrobes.",
    image: "/placeholder.svg",
    coverImage: "/placeholder.svg",
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
      startingPrice: 199,
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
    image: "/placeholder.svg",
    coverImage: "/placeholder.svg",
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
      startingPrice: 149,
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
    image: "/placeholder.svg",
    coverImage: "/placeholder.svg",
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
      startingPrice: 99,
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
    image: "/placeholder.svg",
    coverImage: "/placeholder.svg",
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
  },
  {
    id: 5,
    name: "IKEA",
    description:
      "Swedish furniture retailer known for affordable, functional design and flat-pack furniture for every room in the home.",
    image: "/placeholder.svg",
    coverImage: "/placeholder.svg",
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
  },
  {
    id: 6,
    name: "CB2",
    description:
      "Modern furniture and home decor for apartments, condos, and lofts with a focus on contemporary urban living.",
    image: "/placeholder.svg",
    coverImage: "/placeholder.svg",
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
  },
];

// Helper function to get designer by brand name
export const getDesignerByBrand = (brandName: string): Designer | undefined => {
  return designers.find(
    (designer) => designer.name.toLowerCase() === brandName.toLowerCase(),
  );
};

// Helper function to get all products by designer
export const getProductsByDesigner = (designerName: string) => {
  // This would be imported from products.ts to avoid circular dependency
  // For now, we'll import it in the component that uses this function
  return [];
};
