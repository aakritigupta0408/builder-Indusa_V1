import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sparkles,
  Camera,
  Home,
  ShirtIcon,
  Star,
  Upload,
  Heart,
  TrendingUp,
  Shield,
  Truck,
  RefreshCw,
} from "lucide-react";
import { IndusaLogo } from "@/components/IndusaLogo";

// Mock featured products
const featuredProducts = [
  {
    id: 1,
    name: "Oversized Blazer",
    price: 129,
    originalPrice: 189,
    category: "clothing",
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 128,
    isNew: true,
  },
  {
    id: 2,
    name: "Silk Midi Dress",
    price: 245,
    category: "clothing",
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 203,
    isNew: true,
  },
  {
    id: 3,
    name: "Minimalist Sofa",
    price: 899,
    originalPrice: 1299,
    category: "decor",
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 89,
    isNew: false,
  },
  {
    id: 4,
    name: "Modern Floor Lamp",
    price: 159,
    category: "decor",
    image: "/placeholder.svg",
    rating: 4.3,
    reviews: 67,
    isNew: false,
  },
];

export default function Index() {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/10 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-8">
                <Badge className="inline-flex items-center gap-2 bg-primary/10 text-primary border-primary/20 px-4 py-2">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Virtual Try-On Technology
                </Badge>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Try Before You Buy
                  <span className="text-primary block">
                    On You. In Your Space.
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Experience the future of shopping with our AI-powered virtual
                  try-on technology. See how clothes look on you and how
                  furniture fits your space before you buy.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/catalog">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto px-8 py-6 text-lg"
                    >
                      Shop Now
                      <TrendingUp className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/try-on">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto px-8 py-6 text-lg border-2"
                    >
                      Start Try-On
                      <Sparkles className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center gap-8 pt-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>99% Accuracy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Instant Results</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>1M+ Users</span>
                  </div>
                </div>
              </div>

              {/* Visual Element */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/20 rounded-2xl p-8 relative overflow-hidden">
                  <div
                    className={
                      'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(215,84%,20%)" stroke-width="0.5" opacity="0.1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)" /%3E%3C/svg%3E\')]'
                    }
                  ></div>

                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                        <Sparkles className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary">
                        AI Virtual Try-On
                      </h3>
                      <p className="text-muted-foreground">
                        Revolutionary shopping experience powered by artificial
                        intelligence
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Try-On Module */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Quick Try-On Experience
              </h2>
              <p className="text-muted-foreground">
                Upload your photo and see instant recommendations
              </p>
            </div>

            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Upload Your Photo</h3>
                    <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                      {uploadedImage ? (
                        <div className="space-y-4">
                          <img
                            src={uploadedImage}
                            alt="Uploaded"
                            className="w-32 h-32 object-cover rounded-lg mx-auto"
                          />
                          <p className="text-sm text-muted-foreground">
                            Photo uploaded successfully!
                          </p>
                          <Button size="sm" variant="outline">
                            Change Photo
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                          <div>
                            <p className="text-sm font-medium">
                              Drop your photo here or click to browse
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG up to 10MB
                            </p>
                          </div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="photo-upload"
                          />
                          <Button asChild>
                            <label
                              htmlFor="photo-upload"
                              className="cursor-pointer"
                            >
                              <Camera className="w-4 h-4 mr-2" />
                              Upload Photo
                            </label>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Recommended for You</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {featuredProducts.slice(0, 3).map((product) => (
                      <Card
                        key={product.id}
                        className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <div className="aspect-square bg-neutral">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-3">
                          <p className="font-medium text-sm line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-sm font-semibold">
                            ${product.price}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                    <Card className="border-dashed border-2 border-muted flex items-center justify-center aspect-square">
                      <div className="text-center">
                        <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">
                          Upload photo
                          <br />
                          for more
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Category Tiles */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full blur-3xl opacity-15 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-2xl opacity-25 animate-bounce"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="text-4xl">🔥</span>
              <h2 className="text-4xl md:text-6xl font-black text-white">
                SHOP BY
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent ml-4">
                  CATEGORY
                </span>
              </h2>
              <span className="text-4xl">🔥</span>
            </div>
            <p className="text-xl text-white/80 font-bold">
              Pick your vibe! What's your mood today? ✨
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Apparel Category */}
            <Link to="/catalog?category=clothing" className="group">
              <div className="relative bg-gradient-to-br from-pink-500 via-purple-600 to-pink-700 rounded-3xl p-8 overflow-hidden transform group-hover:scale-105 transition-all duration-500 shadow-2xl border-4 border-white/20">
                {/* Background pattern */}
                <div
                  className={
                    'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="dots" width="60" height="60" patternUnits="userSpaceOnUse"%3E%3Ccircle cx="30" cy="30" r="2" fill="white" opacity="0.1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23dots)" /%3E%3C/svg%3E\')] opacity-30'
                  }
                ></div>

                {/* Floating elements */}
                <div className="absolute top-4 right-4 text-6xl animate-bounce">
                  👗
                </div>
                <div className="absolute top-8 left-8 text-3xl animate-pulse delay-500">
                  ✨
                </div>
                <div className="absolute bottom-8 right-12 text-2xl animate-ping delay-1000">
                  💫
                </div>

                <div className="relative z-10 h-80 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="text-white font-black text-sm">
                        TRENDING NOW
                      </span>
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>

                    <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                      SHOP
                      <br />
                      <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                        APPAREL
                      </span>
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ShirtIcon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-white font-bold text-lg">
                        AI Try-On Ready
                      </span>
                    </div>

                    <p className="text-white/90 font-medium text-lg">
                      🌟 See how clothes look on YOU before buying! From
                      streetwear to formal - we got your fits!
                    </p>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-black text-sm">
                          VIRTUAL TRY-ON
                        </span>
                        <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Home Decor Category */}
            <Link to="/catalog?category=decor" className="group">
              <div className="relative bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 rounded-3xl p-8 overflow-hidden transform group-hover:scale-105 transition-all duration-500 shadow-2xl border-4 border-white/20">
                {/* Background pattern */}
                <div
                  className={
                    'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="40" height="40" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="squares" width="40" height="40" patternUnits="userSpaceOnUse"%3E%3Crect x="0" y="0" width="20" height="20" fill="white" opacity="0.05"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23squares)" /%3E%3C/svg%3E\')] opacity-40'
                  }
                ></div>

                {/* Floating elements */}
                <div className="absolute top-4 right-4 text-6xl animate-bounce delay-300">
                  🏠
                </div>
                <div className="absolute top-8 left-8 text-3xl animate-pulse delay-700">
                  🪴
                </div>
                <div className="absolute bottom-8 right-12 text-2xl animate-ping delay-500">
                  🛋️
                </div>

                <div className="relative z-10 h-80 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="text-white font-black text-sm">
                        ROOM GOALS
                      </span>
                      <Home className="w-4 h-4 text-white" />
                    </div>

                    <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                      SHOP
                      <br />
                      <span className="bg-gradient-to-r from-cyan-300 to-green-300 bg-clip-text text-transparent">
                        HOME DECOR
                      </span>
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Home className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-white font-bold text-lg">
                        Room Visualization
                      </span>
                    </div>

                    <p className="text-white/90 font-medium text-lg">
                      🏡 Transform your space! Visualize furniture in YOUR room
                      before you buy. Make it aesthetic!
                    </p>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-black text-sm">
                          AR PLACEMENT
                        </span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Bottom decorative text */}
          <div className="text-center mt-16">
            <p className="text-white/60 font-bold text-lg">
              💎 Choose your adventure and start shopping! 💎
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Popular picks from our community
              </p>
            </div>
            <Link to="/catalog">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-white text-black hover:bg-white/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/try-on");
                        }}
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
                          // Add to wishlist functionality would go here
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
      </section>

      {/* AI Sizing Banner */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-yellow-300/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-300/15 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-20 w-12 h-12 bg-green-300/20 rounded-full animate-bounce delay-500"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Icon with enhanced styling */}
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-white/30">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>

            {/* Main headline with better visibility */}
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
              GET YOUR
              <span className="bg-gradient-to-r from-yellow-300 via-white to-cyan-300 bg-clip-text text-transparent">
                {" "}
                PERFECT FIT
              </span>
              <br />
              FROM A SINGLE PHOTO! 📸
            </h2>

            {/* Enhanced description */}
            <p className="text-xl md:text-2xl text-white font-bold mb-8 drop-shadow-lg max-w-3xl mx-auto leading-relaxed">
              💫 Our AI technology analyzes your body shape and suggests the
              perfect size for any garment!
              <span className="text-yellow-300 font-black">
                {" "}
                No more returns, no more guessing!{" "}
              </span>
              Reducing returns by up to 60%. 🎯
            </p>

            {/* Enhanced CTA button */}
            <Link to="/ai-sizing">
              <Button
                size="lg"
                className="text-xl px-12 py-8 font-black bg-white text-black hover:bg-yellow-300 shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-black"
              >
                📏 TRY AI SIZING NOW
                <Sparkles className="ml-3 h-6 w-6" />
              </Button>
            </Link>

            {/* Additional trust elements */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-white/90 font-bold">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <span>🎯</span>
                <span>99% Accuracy</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <span>⚡</span>
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <span>💎</span>
                <span>Used by 1M+ People</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Shop With Indusa
            </h2>
            <p className="text-muted-foreground">
              Experience the future of online shopping
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-0 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Try-On</h3>
              <p className="text-muted-foreground">
                See how clothes look on you and furniture in your space with our
                advanced AI technology.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-sm">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-muted-foreground">
                60% fewer returns thanks to our try-on technology. Free returns
                within 30 days.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-sm">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-warning" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground">
                Free shipping on orders over $75. Express delivery available.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <IndusaLogo size="lg" />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 via-orange-400 to-pink-600 bg-clip-text text-transparent">
                Indusa
              </span>
            </div>
            <p className="text-muted-foreground">
              © 2024 Indusa. Where tradition meets innovation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
