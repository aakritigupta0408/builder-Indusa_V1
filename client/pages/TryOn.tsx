import { useState, useRef } from "react";
import { useApp, useAppActions, Product } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Camera,
  Upload,
  Download,
  Share2,
  RefreshCw,
  Heart,
  ShoppingBag,
  Star,
  Sparkles,
  X,
  User,
  Home as HomeIcon,
  Shirt,
} from "lucide-react";

// Mock products for try-on
const mockClothingProducts = [
  {
    id: 1,
    name: "Oversized Blazer",
    price: 129,
    brand: "ZARA",
    color: "Black",
    image: "/placeholder.svg",
    rating: 4.5,
    category: "clothing",
  },
  {
    id: 2,
    name: "Silk Midi Dress",
    price: 245,
    brand: "H&M",
    color: "Navy",
    image: "/placeholder.svg",
    rating: 4.7,
    category: "clothing",
  },
  {
    id: 3,
    name: "Cropped Sweater",
    price: 89,
    brand: "UNIQLO",
    color: "Cream",
    image: "/placeholder.svg",
    rating: 4.3,
    category: "clothing",
  },
  {
    id: 4,
    name: "Wide Leg Trousers",
    price: 159,
    brand: "COS",
    color: "Charcoal",
    image: "/placeholder.svg",
    rating: 4.6,
    category: "clothing",
  },
];

const mockDecorProducts = [
  {
    id: 5,
    name: "Minimalist Sofa",
    price: 899,
    brand: "IKEA",
    color: "Beige",
    image: "/placeholder.svg",
    rating: 4.8,
    category: "decor",
  },
  {
    id: 6,
    name: "Floor Lamp",
    price: 159,
    brand: "West Elm",
    color: "Gold",
    image: "/placeholder.svg",
    rating: 4.3,
    category: "decor",
  },
  {
    id: 7,
    name: "Coffee Table",
    price: 329,
    brand: "CB2",
    color: "Walnut",
    image: "/placeholder.svg",
    rating: 4.5,
    category: "decor",
  },
  {
    id: 8,
    name: "Area Rug",
    price: 199,
    brand: "Rugs USA",
    color: "Persian Blue",
    image: "/placeholder.svg",
    rating: 4.4,
    category: "decor",
  },
];

export default function TryOn() {
  const { state } = useApp();
  const actions = useAppActions();
  const [sortBy, setSortBy] = useState("popular");
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    tryMode,
    userPhoto,
    roomPhoto,
    previewImage,
    selectedProduct,
    isProcessing,
  } = state;

  const currentPhoto = tryMode === "clothes" ? userPhoto : roomPhoto;
  const currentProducts =
    tryMode === "clothes" ? mockClothingProducts : mockDecorProducts;

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (tryMode === "clothes") {
          actions.setUserPhoto(imageUrl);
        } else {
          actions.setRoomPhoto(imageUrl);
        }
        // Clear preview when uploading new photo
        actions.setPreviewImage(null);
        actions.setSelectedProduct(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOnProduct = async (product: Product) => {
    if (!currentPhoto) {
      // Prompt to upload photo
      fileInputRef.current?.click();
      return;
    }

    actions.setProcessing(true);
    actions.setSelectedProduct(product);

    // Simulate API call to KLING/ReimagineHome
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate processing time

      // In a real implementation, this would call the actual AI APIs
      // For demo purposes, we'll simulate an overlay effect
      actions.setPreviewImage(currentPhoto); // This would be the processed image with product overlay
    } catch (error) {
      console.error("Try-on failed:", error);
    } finally {
      actions.setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!previewImage) return;

    const link = document.createElement("a");
    link.href = previewImage;
    link.download = `tryspace-${tryMode}-${selectedProduct?.name || "preview"}.jpg`;
    link.click();
  };

  const handleShare = async () => {
    if (!previewImage) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out this ${tryMode} try-on!`,
          text: `I tried on ${selectedProduct?.name} using TrySpace AI!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleSave = () => {
    if (state.isGuest || !state.user) {
      setShowSignupPrompt(true);
    } else {
      // Save to user's collection
      console.log("Saving to user collection...");
      if (selectedProduct) {
        actions.addToWishlist(selectedProduct);
      }
    }
  };

  const sortedProducts = [...currentProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0; // Keep original order for "popular"
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-foreground">
                Virtual Try-On
              </h1>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </div>

            {/* Mode Toggle */}
            <Tabs
              value={tryMode}
              onValueChange={(value: "clothes" | "decor") =>
                actions.setTryMode(value)
              }
            >
              <TabsList>
                <TabsTrigger
                  value="clothes"
                  className="flex items-center gap-2"
                >
                  <Shirt className="w-4 h-4" />
                  Try Clothes
                </TabsTrigger>
                <TabsTrigger value="decor" className="flex items-center gap-2">
                  <HomeIcon className="w-4 h-4" />
                  Try Decor
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)]">
        {/* Left Panel - 60% - Photo Preview */}
        <div className="w-full lg:w-3/5 p-6 bg-neutral/30">
          <div className="h-full flex flex-col">
            {!currentPhoto ? (
              // Upload Photo State
              <div className="flex-1 flex items-center justify-center">
                <Card className="w-full max-w-md p-8 text-center">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Camera className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Upload Your{" "}
                        {tryMode === "clothes" ? "Photo" : "Room Photo"}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {tryMode === "clothes"
                          ? "Take a clear photo of yourself to see how clothes look on you"
                          : "Upload a photo of your room to visualize furniture placement"}
                      </p>
                    </div>
                    <div className="border-2 border-dashed border-muted rounded-lg p-6">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm font-medium mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <Button
                      size="lg"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload {tryMode === "clothes" ? "Photo" : "Room Photo"}
                    </Button>
                  </div>
                </Card>
              </div>
            ) : (
              // Photo Uploaded State
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    {tryMode === "clothes"
                      ? "Your Try-On"
                      : "Room Visualization"}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                    {previewImage && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDownload}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleShare}
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSave}
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex-1 relative bg-white rounded-lg overflow-hidden">
                  <img
                    src={previewImage || currentPhoto}
                    alt="Try-on preview"
                    className="w-full h-full object-contain"
                  />

                  {/* Processing Overlay */}
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
                        <p className="text-sm">Processing your try-on...</p>
                      </div>
                    </div>
                  )}

                  {/* Watermark */}
                  {previewImage && selectedProduct && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/70 text-white p-3 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium">
                              {selectedProduct.name}
                            </p>
                            <p className="text-xs opacity-90">
                              Tried on with TrySpace AI •{" "}
                              {selectedProduct.brand}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">
                            ${selectedProduct.price}
                          </p>
                          <Button
                            size="sm"
                            className="mt-1 bg-white text-black hover:bg-white/90"
                          >
                            <ShoppingBag className="w-3 h-3 mr-1" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - 40% - Product Catalog */}
        <div className="w-full lg:w-2/5 border-l bg-card">
          <div className="p-6 h-full flex flex-col">
            {/* Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {tryMode === "clothes" ? "Clothing" : "Home Decor"}
                </h3>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="price-low">Price ↑</SelectItem>
                    <SelectItem value="price-high">Price ↓</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <p className="text-sm text-muted-foreground">
                Click any item to try it on instantly
              </p>
            </div>

            {/* Product Grid */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sortedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className={`group cursor-pointer transition-all hover:shadow-lg ${
                      selectedProduct?.id === product.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => handleTryOnProduct(product)}
                  >
                    <div className="aspect-square bg-neutral overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-1 mb-1">
                            {product.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {product.brand} • {product.color}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">
                            ${product.price}
                          </p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">
                              {product.rating}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        className="w-full"
                        disabled={!currentPhoto || isProcessing}
                      >
                        {!currentPhoto ? (
                          "Upload photo first"
                        ) : isProcessing &&
                          selectedProduct?.id === product.id ? (
                          <>
                            <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3 h-3 mr-2" />
                            Try {tryMode === "clothes" ? "On" : "In Room"}
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Up Prompt Modal */}
      <Dialog open={showSignupPrompt} onOpenChange={setShowSignupPrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign up to save your looks</DialogTitle>
            <DialogDescription>
              Create an account to save your try-on results and build your
              personal style collection.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Button className="w-full" size="lg">
              <User className="w-4 h-4 mr-2" />
              Sign Up Free
            </Button>
            <Button variant="outline" className="w-full">
              Continue as Guest
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
