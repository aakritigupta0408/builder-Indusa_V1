import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  Sparkles,
  X,
  Shirt,
  Home,
  Sofa,
  Tags,
} from "lucide-react";
import { useApp, useAppActions } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { searchProducts } from "@/data/products";
import { IndusaLogo } from "./IndusaLogo";
import { CartSidebar } from "./CartSidebar";

export default function Navigation() {
  const { state } = useApp();
  const actions = useAppActions();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = state.cart.reduce(
    (count, item) => count + item.quantity,
    0,
  );
  const wishlistCount = state.wishlist.length;

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    {
      path: "/catalog?category=clothing",
      label: "Apparel",
      icon: Tags,
      description: "Fashion & Clothing",
    },
    {
      path: "/catalog?category=decor",
      label: "Home & Decor",
      icon: Sofa,
      description: "Furniture & Decor",
    },
    { path: "/try-on", label: "Virtual Try-On", icon: Sparkles },
    { path: "/ai-sizing", label: "AI Sizing" },
    {
      path: "/wardrobe",
      label: "My Wardrobe",
      icon: Shirt,
      description: "Personal Collection",
    },
  ];

  // Search functionality
  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    const results = searchProducts(query);
    actions.setSearchQuery(query);
    actions.setSearchResults(results);

    // Navigate to catalog with search results
    navigate(`/catalog?search=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      const results = searchProducts(value);
      actions.setSearchResults(results);
    } else {
      actions.setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    actions.setSearchQuery("");
    actions.setSearchResults([]);
  };

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center gap-8">
        {/* Logo - Enhanced Design with Mascot */}
        <Link to="/" className="flex items-center space-x-4 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 p-2 rounded-2xl border border-primary/20 transition-all duration-300 group-hover:scale-110">
              <div className="relative">
                <IndusaLogo
                  size="lg"
                  className="transition-opacity duration-300 group-hover:opacity-0"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <IndusaLogo size="lg" variant="mascot" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-black bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight leading-none">
              INDUSA
            </span>
            <span className="text-xs font-semibold text-primary/80 tracking-widest uppercase leading-none mt-1 bg-gradient-to-r from-primary/60 to-accent/60 bg-clip-text text-transparent">
              Made by Humans • Delivered By AI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center flex-1 justify-center">
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 font-semibold transition-all duration-300 px-3 py-2 rounded-lg relative group whitespace-nowrap ${
                  isActive(item.path)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span className="text-sm">{item.label}</span>
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transform transition-transform duration-300 ${
                    isActive(item.path)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          {/* Search */}
          <div className="relative hidden lg:flex">
            <Button
              variant="outline"
              className="relative h-9 w-48 justify-start rounded-md border border-input bg-transparent px-3 py-2 text-sm text-muted-foreground shadow-none hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Search...</span>
              <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Wishlist */}
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-4 w-4" />
            {wishlistCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                {wishlistCount}
              </Badge>
            )}
          </Button>

          {/* Cart */}
          <CartSidebar />

          {/* User Account */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden md:block">
                {user?.name}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard")}
                className="relative"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetTitle className="text-left">Menu</SheetTitle>
              <SheetDescription className="text-left mb-6">
                Navigate through our platform
              </SheetDescription>
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 text-sm font-bold transition-all duration-300 py-3 px-2 rounded-lg ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-400/20 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-primary hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-500/10"
                    }`}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <div className="flex flex-col">
                      <span className="leading-none">{item.label}</span>
                      {item.description && (
                        <span className="text-xs text-muted-foreground/70 leading-none mt-1">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
                <div className="border-t pt-4 mt-6">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary py-2"
                  >
                    <User className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground py-2">
                    <Search className="h-4 w-4" />
                    Search
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <Command shouldFilter={false}>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Search for products, brands, colors..."
              value={searchQuery}
              onValueChange={handleSearchInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  handleSearch(searchQuery);
                }
              }}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={clearSearch}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <CommandList>
            {searchQuery && state.searchResults.length === 0 ? (
              <CommandEmpty>No products found for "{searchQuery}"</CommandEmpty>
            ) : (
              <>
                {searchQuery && state.searchResults.length > 0 && (
                  <CommandGroup
                    heading={`${state.searchResults.length} products found`}
                  >
                    {state.searchResults.slice(0, 8).map((product) => (
                      <CommandItem
                        key={product.id}
                        onSelect={() => {
                          navigate(`/product/${product.id}`);
                          setIsSearchOpen(false);
                          clearSearch();
                        }}
                        className="flex items-center gap-3 p-3"
                      >
                        <div className="w-12 h-12 bg-neutral rounded-md flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.brand} • {product.color}
                          </p>
                          <p className="text-sm font-semibold text-primary">
                            ${product.price}
                          </p>
                        </div>
                        <Badge variant="secondary" className="capitalize">
                          {product.category}
                        </Badge>
                      </CommandItem>
                    ))}
                    {state.searchResults.length > 8 && (
                      <CommandItem
                        onSelect={() => handleSearch(searchQuery)}
                        className="text-center p-3 text-primary font-medium"
                      >
                        See all {state.searchResults.length} results →
                      </CommandItem>
                    )}
                  </CommandGroup>
                )}
                {!searchQuery && (
                  <CommandGroup heading="✨ Quick Actions">
                    <CommandItem
                      onSelect={() => {
                        navigate("/catalog?category=clothing");
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <span>👗</span>
                      <div>
                        <p className="font-medium">Shop Apparel</p>
                        <p className="text-xs text-muted-foreground">
                          Clothes & Fashion
                        </p>
                      </div>
                    </CommandItem>
                    <CommandItem
                      onSelect={() => {
                        navigate("/catalog?category=decor");
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <span>🏠</span>
                      <div>
                        <p className="font-medium">Shop Home Decor</p>
                        <p className="text-xs text-muted-foreground">
                          Furniture & Decor
                        </p>
                      </div>
                    </CommandItem>
                    <CommandItem
                      onSelect={() => {
                        navigate("/try-on");
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <span>✨</span>
                      <div>
                        <p className="font-medium">Virtual Try-On</p>
                        <p className="text-xs text-muted-foreground">
                          AI-Powered Experience
                        </p>
                      </div>
                    </CommandItem>
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </header>
  );
}
