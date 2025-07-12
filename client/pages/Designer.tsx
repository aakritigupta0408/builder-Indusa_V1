import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  Calendar,
  Store,
  Instagram,
  Twitter,
  Star,
  Heart,
  ShoppingBag,
  Filter,
  TrendingUp,
  Award,
} from "lucide-react";
import { designers, Designer } from "@/data/designers";
import { allProducts } from "@/data/products";
import { useAppActions, Product } from "@/context/AppContext";

const categories = ["all", "clothing", "decor"];
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export default function Designer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const actions = useAppActions();

  const [designer, setDesigner] = useState<Designer | null>(null);
  const [designerProducts, setDesignerProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Find designer by ID
  useEffect(() => {
    if (id) {
      const foundDesigner = designers.find((d) => d.id === parseInt(id));
      if (foundDesigner) {
        setDesigner(foundDesigner);

        // Get products by this designer/brand
        const products = allProducts.filter(
          (product) =>
            product.brand.toLowerCase() === foundDesigner.name.toLowerCase(),
        );
        setDesignerProducts(products);
      } else {
        navigate("/designers");
      }
    }
  }, [id, navigate]);

  // Filter and sort products
  const filteredAndSortedProducts = designerProducts
    .filter((product) => {
      if (selectedCategory === "all") return true;
      return product.category === selectedCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case "popular":
        default:
          return b.rating - a.rating;
      }
    });

  const handleTryOn = (product: Product) => {
    actions.setSelectedProduct(product);
    if (product.category === "clothing") {
      actions.setTryMode("clothes");
    } else {
      actions.setTryMode("decor");
    }
    navigate("/try-on");
  };

  if (!designer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Designer not found</h2>
          <p className="text-muted-foreground mb-4">
            The designer you're looking for doesn't exist.
          </p>
          <Link to="/designers">
            <Button>Browse All Designers</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg overflow-hidden">
                <img
                  src={designer.image}
                  alt={designer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-xl font-bold">{designer.name} Store</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Designer Hero Section */}
      <section className="relative">
        {/* Cover Image */}
        <div className="h-64 md:h-80 bg-gradient-to-br from-primary/5 to-accent/10 relative overflow-hidden">
          <img
            src={designer.coverImage}
            alt={`${designer.name} cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Designer Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              {/* Designer Logo */}
              <div className="w-24 h-24 bg-white rounded-xl overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
                <img
                  src={designer.image}
                  alt={designer.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Designer Details */}
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {designer.name}
                </h1>
                <p className="text-lg text-white/90 mb-4 max-w-2xl">
                  {designer.description}
                </p>

                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Founded {designer.founded}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{designer.location}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <Store className="w-4 h-4" />
                    <span className="text-sm">
                      {designerProducts.length} Products
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-2 flex-shrink-0">
                {designer.social?.instagram && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    onClick={() =>
                      window.open(
                        `https://instagram.com/${designer.social?.instagram?.replace("@", "")}`,
                        "_blank",
                      )
                    }
                  >
                    <Instagram className="w-4 h-4" />
                  </Button>
                )}
                {designer.social?.twitter && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/${designer.social?.twitter?.replace("@", "")}`,
                        "_blank",
                      )
                    }
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                )}
                {designer.website && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    onClick={() =>
                      window.open(`https://${designer.website}`, "_blank")
                    }
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties & Achievements */}
      <section className="py-8 bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Specialties */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Specialties
                </h3>
                <div className="flex flex-wrap gap-2">
                  {designer.specialty.map((spec) => (
                    <Badge key={spec} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Featured In */}
              {designer.featuredIn && designer.featuredIn.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Featured In
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {designer.featuredIn.map((publication) => (
                      <Badge key={publication} variant="outline">
                        {publication}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Products Header */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Products</h2>
                <p className="text-muted-foreground">
                  {filteredAndSortedProducts.length} product
                  {filteredAndSortedProducts.length !== 1 ? "s" : ""} available
                </p>
              </div>

              {/* Filters */}
              <div className="flex gap-3 items-center">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="decor">Home Decor</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
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

            {/* Products Grid */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground">
                  This designer doesn't have products in the selected category.
                </p>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
