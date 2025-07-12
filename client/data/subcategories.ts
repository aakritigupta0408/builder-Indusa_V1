export interface Subcategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
  icon?: string;
}

export interface CategoryWithSubs {
  id: string;
  name: string;
  description: string;
  icon: string;
  subcategories: Subcategory[];
}

export const clothingSubcategories: Subcategory[] = [
  { id: "tops", name: "Tops", description: "T-shirts, blouses, shirts" },
  { id: "bottoms", name: "Bottoms", description: "Jeans, pants, skirts" },
  { id: "dresses", name: "Dresses", description: "Casual & formal dresses" },
  {
    id: "outerwear",
    name: "Outerwear",
    description: "Jackets, coats, blazers",
  },
  {
    id: "activewear",
    name: "Activewear",
    description: "Gym & sports clothing",
  },
  {
    id: "underwear",
    name: "Intimates",
    description: "Undergarments & sleepwear",
  },
  { id: "shoes", name: "Shoes", description: "Sneakers, heels, boots" },
  {
    id: "accessories",
    name: "Accessories",
    description: "Bags, jewelry, scarves",
  },
  { id: "swimwear", name: "Swimwear", description: "Bikinis, swimsuits" },
  { id: "formal", name: "Formal Wear", description: "Evening gowns, suits" },
];

export const homeDecorSubcategories: Subcategory[] = [
  { id: "furniture", name: "Furniture", description: "Sofas, chairs, tables" },
  {
    id: "lighting",
    name: "Lighting",
    description: "Lamps, chandeliers, LED strips",
  },
  { id: "textiles", name: "Textiles", description: "Curtains, rugs, pillows" },
  {
    id: "wall-art",
    name: "Wall Art",
    description: "Paintings, posters, mirrors",
  },
  {
    id: "storage",
    name: "Storage",
    description: "Shelves, cabinets, organizers",
  },
  {
    id: "plants",
    name: "Plants & Planters",
    description: "Indoor plants, pots",
  },
  {
    id: "kitchen",
    name: "Kitchen Decor",
    description: "Utensils, appliances, decor",
  },
  {
    id: "bathroom",
    name: "Bathroom",
    description: "Towels, accessories, decor",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    description: "Bedding, nightstands, decor",
  },
  {
    id: "living-room",
    name: "Living Room",
    description: "Coffee tables, decor, throws",
  },
  {
    id: "dining",
    name: "Dining Room",
    description: "Dinnerware, centerpieces",
  },
  {
    id: "outdoor",
    name: "Outdoor",
    description: "Patio furniture, garden decor",
  },
];

export const categories: CategoryWithSubs[] = [
  {
    id: "clothing",
    name: "Clothing & Fashion",
    description: "Trendy apparel for every occasion",
    icon: "ShirtIcon",
    subcategories: clothingSubcategories,
  },
  {
    id: "decor",
    name: "Home & Decor",
    description: "Beautiful pieces for your space",
    icon: "Home",
    subcategories: homeDecorSubcategories,
  },
];

// Helper functions
export const getSubcategoriesByCategory = (
  categoryId: string,
): Subcategory[] => {
  const category = categories.find((cat) => cat.id === categoryId);
  return category?.subcategories || [];
};

export const getSubcategoryById = (
  subcategoryId: string,
): Subcategory | undefined => {
  for (const category of categories) {
    const subcategory = category.subcategories.find(
      (sub) => sub.id === subcategoryId,
    );
    if (subcategory) return subcategory;
  }
  return undefined;
};
