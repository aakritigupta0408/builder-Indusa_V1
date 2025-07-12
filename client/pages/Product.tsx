import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  Star,
  ShoppingBag,
  Share2,
  Ruler,
  Truck,
  RotateCcw,
  Camera,
  Upload,
  RefreshCw,
  Download,
  Sparkles,
  ArrowLeft,
  Plus,
  Minus,
} from "lucide-react";
import { useApp, useAppActions, Product } from "@/context/AppContext";
import { allProducts } from "@/data/products";
import { IndusaIcon } from "@/components/IndusaLogo";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useApp();
  const actions = useAppActions();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [roomPhoto, setRoomPhoto] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Find product by ID
  useEffect(() => {
    if (id) {
      const foundProduct = allProducts.find((p) => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setIsWishlisted(
          state.wishlist.some((item) => item.id === foundProduct.id),
        );
        // Set try mode based on product category
        actions.setTryMode(
          foundProduct.category === "clothing" ? "clothes" : "decor",
        );
      }
    }
  }, [id, state.wishlist]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <Button onClick={() => navigate("/catalog")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Button>
        </div>
      </div>
    );
  }

  // Mock additional product images
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const handleAddToCart = () => {
    if (product.category === "clothing" && !selectedSize) {
      return; // Show error for missing size
    }
    actions.addToCart(product);
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      actions.removeFromWishlist(product.id);
    } else {
      actions.addToWishlist(product);
    }
    setIsWishlisted(!isWishlisted);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (state.tryMode === "clothes") {
          setUserPhoto(imageUrl);
          actions.setUserPhoto(imageUrl);
        } else {
          setRoomPhoto(imageUrl);
          actions.setRoomPhoto(imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    const currentPhoto = state.tryMode === "clothes" ? userPhoto : roomPhoto;

    if (!currentPhoto) {
      // Prompt to upload photo
      document.getElementById("photo-upload")?.click();
      return;
    }

    setIsProcessing(true);
    actions.setSelectedProduct(product);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setPreviewImage(currentPhoto);
      actions.setPreviewImage(currentPhoto);
    } catch (error) {
      console.error("Try-on failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const currentPhoto = state.tryMode === "clothes" ? userPhoto : roomPhoto;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/catalog")}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left Half - Product Details */}
        <div className="w-full lg:w-1/2 p-6">
          <div className="space-y-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-neutral rounded-lg overflow-hidden">
                <img
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-neutral rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="capitalize">
                    {product.category}
                  </Badge>
                  {product.isNew && (
                    <Badge className="bg-primary text-primary-foreground">
                      New
                    </Badge>
                  )}
                  {product.onSale && (
                    <Badge className="bg-destructive text-destructive-foreground">
                      Sale
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground">{product.brand}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                {product.reviews && (
                  <span className="text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-foreground">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.onSale && product.originalPrice && (
                  <Badge className="bg-success text-success-foreground">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100,
                    )}
                    % OFF
                  </Badge>
                )}
              </div>

              {/* Size Selection */}
              {product.category === "clothing" && product.size && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Size</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.size.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Color & Material */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Color
                  </label>
                  <p className="font-medium">{product.color}</p>
                </div>
                {product.material && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Material
                    </label>
                    <p className="font-medium capitalize">{product.material}</p>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-8 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="w-full"
                  disabled={product.category === "clothing" && !selectedSize}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart - ${product.price * quantity}
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleToggleWishlist}
                    className="flex-1"
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                    {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Product Details */}
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="space-y-4">
                  <p className="text-muted-foreground">
                    This {product.name.toLowerCase()} is crafted with attention
                    to detail and quality materials. Perfect for modern living
                    and designed to complement your personal style.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Premium {product.material} construction</li>
                    <li>Available in {product.color.toLowerCase()}</li>
                    <li>Modern design with timeless appeal</li>
                    <li>Easy care and maintenance</li>
                  </ul>
                </TabsContent>
                <TabsContent value="details" className="space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Brand:</span>
                      <p>{product.brand}</p>
                    </div>
                    <div>
                      <span className="font-medium">Material:</span>
                      <p className="capitalize">{product.material}</p>
                    </div>
                    <div>
                      <span className="font-medium">Color:</span>
                      <p>{product.color}</p>
                    </div>
                    <div>
                      <span className="font-medium">Category:</span>
                      <p className="capitalize">{product.category}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="shipping" className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Free Shipping</p>
                      <p className="text-sm text-muted-foreground">
                        On orders over $75
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Easy Returns</p>
                      <p className="text-sm text-muted-foreground">
                        30-day return policy
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Ruler className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Size Guide</p>
                      <p className="text-sm text-muted-foreground">
                        Find your perfect fit
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Right Half - Try-On */}
        <div className="w-full lg:w-1/2 border-l bg-card">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Try It On</h3>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </div>

            {!currentPhoto ? (
              // Upload Photo State
              <div className="flex-1 flex items-center justify-center">
                <Card className="w-full max-w-sm p-6 text-center">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Camera className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        {state.tryMode === "clothes"
                          ? "Upload Your Photo"
                          : "Upload Room Photo"}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {state.tryMode === "clothes"
                          ? "See how this item looks on you"
                          : "Visualize this item in your space"}
                      </p>
                    </div>
                    <div className="border-2 border-dashed border-muted rounded-lg p-4">
                      <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <Button
                      onClick={() =>
                        document.getElementById("photo-upload")?.click()
                      }
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                  </div>
                </Card>
              </div>
            ) : (
              // Photo Uploaded State
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">
                    {state.tryMode === "clothes"
                      ? "Your Try-On"
                      : "Room Visualization"}
                  </h4>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        document.getElementById("photo-upload")?.click()
                      }
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                    {previewImage && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex-1 relative bg-white rounded-lg overflow-hidden mb-4">
                  <img
                    src={previewImage || currentPhoto}
                    alt="Try-on preview"
                    className="w-full h-full object-contain"
                  />

                  {/* Processing Overlay */}
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                        <p className="text-sm">Processing...</p>
                      </div>
                    </div>
                  )}

                  {/* Brand Watermark */}
                  {previewImage && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border">
                        <div className="flex items-center gap-2">
                          <IndusaIcon className="w-5 h-5" />
                          <div className="text-xs">
                            <p className="font-bold bg-gradient-to-r from-pink-500 via-orange-400 to-pink-600 bg-clip-text text-transparent">
                              Indusa
                            </p>
                            <p className="text-muted-foreground leading-none">
                              AI Try-On
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Product Information Watermark */}
                  {previewImage && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg border border-white/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                              <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">
                                {product.name}
                              </p>
                              <p className="text-xs opacity-90">
                                {product.brand} • Virtual Try-On by Indusa AI
                              </p>
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs">
                                  {product.rating}
                                </span>
                                {product.reviews && (
                                  <span className="text-xs opacity-75">
                                    ({product.reviews})
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">
                              ${product.price}
                            </p>
                            {product.originalPrice && (
                              <p className="text-xs line-through opacity-75">
                                ${product.originalPrice}
                              </p>
                            )}
                            <Button
                              size="sm"
                              className="mt-2 bg-white text-black hover:bg-white/90 font-medium"
                              onClick={handleAddToCart}
                            >
                              <ShoppingBag className="w-3 h-3 mr-1" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Corner Brand Watermark */}
                  {previewImage && (
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-xs">
                        <span className="font-bold text-primary">
                          TrySpace.ai
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleTryOn}
                  disabled={isProcessing}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Try {state.tryMode === "clothes" ? "On Me" : "In My Room"}
                    </>
                  )}
                </Button>

                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
