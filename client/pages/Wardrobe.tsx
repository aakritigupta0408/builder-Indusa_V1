import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shirt,
  Plus,
  Search,
  Filter,
  Eye,
  Palette,
  Sparkles,
  Upload,
  ShoppingBag,
  Heart,
  Trash2,
  Download,
  Share2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { Product } from "@/context/AppContext";
import { InstagramShare } from "@/components/InstagramShare";
import { TryOnWatermark } from "@/components/TryOnWatermark";

// Mock data for purchased items (in a real app, this would come from an API)
const mockPurchasedItems: Product[] = [
  {
    id: 101,
    name: "Classic White Button Down",
    price: 89.99,
    brand: "ZARA",
    color: "White",
    availableColors: ["White", "Light Blue", "Black"],
    category: "clothing",
    subcategory: "tops",
    image: "/api/placeholder/300/400",
    images: {
      White: "/api/placeholder/300/400",
      "Light Blue": "/api/placeholder/300/401",
      Black: "/api/placeholder/300/402",
    },
    rating: 4.6,
    reviews: 234,
    size: ["XS", "S", "M", "L", "XL"],
    material: "Cotton Blend",
  },
  {
    id: 102,
    name: "High-Waisted Jeans",
    price: 129.99,
    brand: "H&M",
    color: "Dark Blue",
    availableColors: ["Dark Blue", "Light Blue", "Black"],
    category: "clothing",
    subcategory: "bottoms",
    image: "/api/placeholder/300/400",
    rating: 4.4,
    reviews: 189,
    size: ["24", "25", "26", "27", "28", "29", "30"],
    material: "Denim",
  },
  {
    id: 103,
    name: "Minimalist Throw Pillow",
    price: 45.99,
    brand: "West Elm",
    color: "Sage Green",
    availableColors: ["Sage Green", "Dusty Pink", "Cream"],
    category: "decor",
    subcategory: "textiles",
    image: "/api/placeholder/300/300",
    rating: 4.8,
    reviews: 156,
    material: "Organic Cotton",
  },
];

interface WardrobeItem extends Product {
  purchaseDate?: string;
  isPersonalItem?: boolean;
  tags?: string[];
}

interface StyleOutfit {
  id: string;
  name: string;
  items: WardrobeItem[];
  createdAt: string;
  occasion?: string;
}

export default function Wardrobe() {
  const { state } = useApp();
  const { user, isAuthenticated } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedItems, setSelectedItems] = useState<WardrobeItem[]>([]);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isStyleStudioOpen, setIsStyleStudioOpen] = useState(false);
  const [savedOutfits, setSavedOutfits] = useState<StyleOutfit[]>([]);
  const [newItemForm, setNewItemForm] = useState({
    name: "",
    brand: "",
    color: "",
    category: "clothing" as "clothing" | "decor",
    image: "",
  });

  // Combine purchased items with personal items
  const wardrobeItems: WardrobeItem[] = useMemo(() => {
    return [
      ...mockPurchasedItems.map((item) => ({
        ...item,
        purchaseDate: "2024-01-15", // Mock date
        isPersonalItem: false,
      })),
      // Personal items would be loaded from user data
    ];
  }, []);

  const filteredItems = useMemo(() => {
    return wardrobeItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [wardrobeItems, searchQuery, categoryFilter]);

  const handleAddToStyleStudio = (item: WardrobeItem) => {
    if (!selectedItems.find((selected) => selected.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemoveFromStyleStudio = (itemId: number) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
  };

  const handleSaveOutfit = () => {
    if (selectedItems.length > 0) {
      const newOutfit: StyleOutfit = {
        id: Date.now().toString(),
        name: `Outfit ${savedOutfits.length + 1}`,
        items: [...selectedItems],
        createdAt: new Date().toISOString(),
        occasion: "Casual",
      };
      setSavedOutfits([...savedOutfits, newOutfit]);
      setSelectedItems([]);
    }
  };

  const handleAddPersonalItem = () => {
    if (newItemForm.name && newItemForm.brand) {
      // In a real app, this would upload to a server
      console.log("Adding personal item:", newItemForm);
      setNewItemForm({
        name: "",
        brand: "",
        color: "",
        category: "clothing",
        image: "",
      });
      setIsAddItemOpen(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <Shirt className="h-16 w-16 mx-auto text-primary mb-4" />
            <CardTitle>My Wardrobe</CardTitle>
            <CardDescription>
              Sign in to access your personal wardrobe and style studio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full"
              onClick={() => (window.location.href = "/login")}
            >
              Sign In to Continue
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => (window.location.href = "/signup")}
            >
              Create Account
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              My Wardrobe
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your collection and create stunning outfits
            </p>
          </div>

          <div className="flex gap-3">
            <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Personal Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Personal Item</DialogTitle>
                  <DialogDescription>
                    Add items from your personal collection to your wardrobe
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Item name"
                    value={newItemForm.name}
                    onChange={(e) =>
                      setNewItemForm({ ...newItemForm, name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Brand"
                    value={newItemForm.brand}
                    onChange={(e) =>
                      setNewItemForm({ ...newItemForm, brand: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Color"
                    value={newItemForm.color}
                    onChange={(e) =>
                      setNewItemForm({ ...newItemForm, color: e.target.value })
                    }
                  />
                  <Select
                    value={newItemForm.category}
                    onValueChange={(value: "clothing" | "decor") =>
                      setNewItemForm({ ...newItemForm, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="decor">Home Decor</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </Button>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleAddPersonalItem} className="flex-1">
                      Add Item
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddItemOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              className="gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              onClick={() => setIsStyleStudioOpen(true)}
            >
              <Sparkles className="h-4 w-4" />
              Style Studio
            </Button>
          </div>
        </div>

        <Tabs defaultValue="purchased" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="purchased" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Past Orders
            </TabsTrigger>
            <TabsTrigger value="personal" className="gap-2">
              <Upload className="h-4 w-4" />
              My Collection
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="gap-2">
              <Heart className="h-4 w-4" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="outfits" className="gap-2">
              <Palette className="h-4 w-4" />
              Saved Outfits
            </TabsTrigger>
            <TabsTrigger value="all" className="gap-2">
              <Filter className="h-4 w-4" />
              All Items
            </TabsTrigger>
          </TabsList>

          <TabsContent value="purchased" className="space-y-6">
            {/* Past Orders */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Items from Past Orders
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Items you've purchased through Indusa
              </p>
            </div>
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search past orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="decor">Home Decor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems
                .filter((item) => !item.isPersonalItem)
                .map((item) => (
                  <Card
                    key={item.id}
                    className="group hover:shadow-lg transition-all duration-300"
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square bg-neutral-100 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-sm line-clamp-2">
                            {item.name}
                          </h3>
                          <Badge variant="default" className="text-xs">
                            Purchased
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {item.brand}
                        </p>
                        <p className="text-sm font-medium">{item.color}</p>

                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 gap-1"
                            onClick={() => handleAddToStyleStudio(item)}
                          >
                            <Plus className="h-3 w-3" />
                            Style
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Eye className="h-3 w-3" />
                            Try On
                          </Button>
                          <InstagramShare
                            imageUrl={item.image}
                            productName={item.name}
                            designerName={item.brand}
                            variant="icon"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {filteredItems.filter((item) => !item.isPersonalItem).length ===
              0 && (
              <div className="text-center py-16">
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No past orders found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Items from your previous purchases will appear here
                </p>
                <Button
                  onClick={() => (window.location.href = "/catalog")}
                  className="gap-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Start Shopping
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="personal" className="space-y-6">
            {/* Personal Collection */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                My Personal Collection
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Items you've added from your own wardrobe
              </p>
            </div>
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search personal collection..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="decor">Home Decor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems
                .filter((item) => item.isPersonalItem)
                .map((item) => (
                  <Card
                    key={item.id}
                    className="group hover:shadow-lg transition-all duration-300"
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square bg-neutral-100 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-sm line-clamp-2">
                            {item.name}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            Personal
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {item.brand}
                        </p>
                        <p className="text-sm font-medium">{item.color}</p>

                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 gap-1"
                            onClick={() => handleAddToStyleStudio(item)}
                          >
                            <Plus className="h-3 w-3" />
                            Style
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Eye className="h-3 w-3" />
                            Try On
                          </Button>
                          <InstagramShare
                            imageUrl={item.image}
                            productName={item.name}
                            designerName={item.brand}
                            variant="icon"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {filteredItems.filter((item) => item.isPersonalItem).length ===
              0 && (
              <div className="text-center py-16">
                <Upload className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No personal items yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Add items from your own wardrobe to try them on virtually
                </p>
                <Button
                  onClick={() => setIsAddItemOpen(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Personal Item
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-6">
            <div className="text-center py-16">
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Your Wishlist Items
              </h3>
              <p className="text-muted-foreground mb-6">
                Items you've saved for later will appear here
              </p>
              <Button
                onClick={() => (window.location.href = "/catalog")}
                className="gap-2"
              >
                <Heart className="h-4 w-4" />
                Browse & Save Items
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search your wardrobe..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="decor">Home Decor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="aspect-square bg-neutral-100 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-sm line-clamp-2">
                          {item.name}
                        </h3>
                        <Badge
                          variant={
                            item.isPersonalItem ? "secondary" : "default"
                          }
                          className="text-xs"
                        >
                          {item.isPersonalItem ? "Personal" : "Purchased"}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {item.brand}
                      </p>
                      <p className="text-sm font-medium">{item.color}</p>

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 gap-1"
                          onClick={() => handleAddToStyleStudio(item)}
                        >
                          <Plus className="h-3 w-3" />
                          Style
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Eye className="h-3 w-3" />
                          Try On
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <Shirt className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No items found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "Add some items to your wardrobe to get started"}
                </p>
                <Button
                  onClick={() => setIsAddItemOpen(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Your First Item
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="outfits" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedOutfits.map((outfit) => (
                <Card
                  key={outfit.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{outfit.name}</CardTitle>
                      <Badge variant="outline">{outfit.occasion}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {outfit.items.slice(0, 4).map((item, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-neutral-100 rounded-md overflow-hidden"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {outfit.items.length} items • Created{" "}
                      {new Date(outfit.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        Preview
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Share2 className="h-3 w-3" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {savedOutfits.length === 0 && (
              <div className="text-center py-16">
                <Palette className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No saved outfits</h3>
                <p className="text-muted-foreground mb-6">
                  Use the Style Studio to create and save outfit combinations
                </p>
                <Button
                  onClick={() => setIsStyleStudioOpen(true)}
                  className="gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Open Style Studio
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            <div className="text-center py-16">
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Your Favorite Items
              </h3>
              <p className="text-muted-foreground">
                Items you've marked as favorites will appear here
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Style Studio Modal */}
        <Dialog open={isStyleStudioOpen} onOpenChange={setIsStyleStudioOpen}>
          <DialogContent className="max-w-6xl h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Style Studio
              </DialogTitle>
              <DialogDescription>
                Combine multiple items to create the perfect outfit
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                {/* Selected Items */}
                <div className="space-y-4">
                  <h3 className="font-semibold">
                    Current Outfit ({selectedItems.length} items)
                  </h3>
                  <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="relative group">
                        <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveFromStyleStudio(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <p className="text-xs font-medium mt-2 truncate">
                          {item.name}
                        </p>
                      </div>
                    ))}
                  </div>

                  {selectedItems.length > 0 && (
                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={handleSaveOutfit}
                        className="flex-1 gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Save Outfit
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Try On All
                      </Button>
                    </div>
                  )}
                </div>

                {/* Available Items */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Your Wardrobe</h3>
                  <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                    {wardrobeItems.map((item) => (
                      <div
                        key={item.id}
                        className="group cursor-pointer"
                        onClick={() => handleAddToStyleStudio(item)}
                      >
                        <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <p className="text-xs font-medium truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {item.brand}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
