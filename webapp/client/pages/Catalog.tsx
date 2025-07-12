import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Filter, X, ShoppingBag } from "lucide-react";
import { allProducts, searchProducts } from "@/data/products";
import { getSubcategoriesByCategory } from "@/data/subcategories";
import { useApp, useAppActions } from "@/context/AppContext";

const categories = ["all", "clothing", "decor"];
const colors = ["all", "black", "navy", "beige", "gold"];
const materials = ["all", "wool", "silk", "fabric", "metal"];
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export default function Catalog() {
  const { state } = useApp();
  const actions = useAppActions();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Get search query from URL
  const searchQuery = searchParams.get("search") || "";
  const categoryFromUrl = searchParams.get("category") || "";
  const subcategoryFromUrl = searchParams.get("subcategory") || "";

  // Initialize filters from URL params
  useEffect(() => {
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
    }
    if (subcategoryFromUrl && subcategoryFromUrl !== selectedSubcategory) {
      setSelectedSubcategory(subcategoryFromUrl);
    }
  }, [categoryFromUrl, subcategoryFromUrl]);

  // Handle search results
  useEffect(() => {
    if (searchQuery && searchQuery !== state.searchQuery) {
      const results = searchProducts(searchQuery, allProducts);
      actions.setSearchQuery(searchQuery);
      actions.setSearchResults(results);
    }
  }, [searchQuery]);

  const isSearchMode = !!searchQuery;
  const baseProducts = isSearchMode ? state.searchResults : allProducts;

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = baseProducts.filter((product) => {
      return (
        (selectedCategory === "all" || product.category === selectedCategory) &&
        (selectedSubcategory === "all" ||
          product.subcategory === selectedSubcategory) &&
        (selectedColor === "all" || product.color === selectedColor) &&
        (selectedMaterial === "all" || product.material === selectedMaterial)
      );
    });

    // Sort products
    switch (sortBy) {
      case "newest":
        return filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      default:
        return filtered.sort((a, b) => b.rating - a.rating);
    }
  }, [
    selectedCategory,
    selectedSubcategory,
    selectedColor,
    selectedMaterial,
    sortBy,
  ]);

  const handleTryOn = (product: any) => {
    // This would integrate with try-on functionality
    console.log(`Try on ${product.name}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Shop All</h1>
          <p className="text-muted-foreground">
            Discover our curated collection of fashion and home decor
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 space-y-6">
            <div className="flex items-center gap-2 lg:hidden">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filters</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">
                  Category
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="decor">Home Decor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Color</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Colors</SelectItem>
                    {colors.slice(1).map((color) => (
                      <SelectItem key={color} value={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">
                  Material
                </label>
                <Select
                  value={selectedMaterial}
                  onValueChange={setSelectedMaterial}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Materials</SelectItem>
                    {materials.slice(1).map((material) => (
                      <SelectItem key={material} value={material}>
                        {material.charAt(0).toUpperCase() + material.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-muted-foreground">
                {filteredAndSortedProducts.length} products found
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="relative aspect-square overflow-hidden bg-neutral">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isNew && (
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                        New
                      </Badge>
                    )}
                    {product.onSale && (
                      <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                        Sale
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            actions.addToCart(product, 1);
                          }}
                          className="bg-white text-black hover:bg-white/90"
                        >
                          <ShoppingBag className="h-3 w-3 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTryOn(product);
                          }}
                          className="bg-white/90 hover:bg-white"
                        >
                          {product.category === "clothing"
                            ? "Try On"
                            : "See in Room"}
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            actions.addToWishlist(product);
                          }}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
