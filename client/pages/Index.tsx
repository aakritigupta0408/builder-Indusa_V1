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
      <section className="relative bg-gradient-to-br from-neutral via-background to-secondary py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              🚀 Now with AI-Powered Virtual Try-On
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Try Before You Buy —{" "}
              <span className="bg-gradient-to-r from-primary to-luxury bg-clip-text text-transparent">
                On You. In Your Space.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the future of shopping with our AI-powered virtual
              try-on technology. See how clothes look on you and how furniture
              fits your space before you buy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <Button size="lg" className="text-lg px-8 py-6">
                  Shop Now
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/try-on">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6"
                >
                  Start Try-On
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link>
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground">
              Discover our curated collections
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link to="/catalog?category=clothing" className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-64 bg-gradient-to-br from-primary/10 to-luxury/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShirtIcon className="w-16 h-16 text-primary" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Clothing
                    </h3>
                    <p className="text-muted-foreground">
                      Try on our latest fashion pieces with AI
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/catalog?category=decor" className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-64 bg-gradient-to-br from-success/10 to-warning/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Home className="w-16 h-16 text-success" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Home Decor
                    </h3>
                    <p className="text-muted-foreground">
                      Visualize furniture in your space
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
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
      <section className="py-16 bg-gradient-to-r from-primary to-luxury text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Sparkles className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Get Your Perfect Fit from a Single Photo
            </h2>
            <p className="text-lg text-white/90 mb-6">
              Our AI technology analyzes your body shape and suggests the
              perfect size for any garment, reducing returns by up to 60%.
            </p>
            <Link to="/ai-sizing">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                Try AI Sizing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Shop With TrySpace
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
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-luxury rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                TrySpace
              </span>
            </div>
            <p className="text-muted-foreground">
              © 2024 TrySpace. The future of shopping is here.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
