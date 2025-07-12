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
} from "lucide-react";
import { useApp, useAppActions } from "@/context/AppContext";
import { searchProducts } from "@/data/products";
import { IndusaLogo } from "./IndusaLogo";

export default function Navigation() {
  const { state } = useApp();
  const actions = useAppActions();
  const location = useLocation();
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = state.cart.length;
  const wishlistCount = state.wishlist.length;

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Home" },
    {
      path: "/catalog?category=clothing",
      label: "Shop Apparel",
      badge: "👗",
      description: "Clothes & Fashion",
    },
    {
      path: "/catalog?category=decor",
      label: "Shop Home Decor",
      badge: "🏠",
      description: "Furniture & Decor",
    },
    { path: "/try-on", label: "Try-On", icon: Sparkles, badge: "✨" },
    { path: "/ai-sizing", label: "AI Sizing", badge: "📏" },
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
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <IndusaLogo size="lg" />
          <div className="flex flex-col">
            <span className="text-xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              INDUSA
            </span>
            <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest -mt-1">
              ✨ AI FASHION ✨
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                isActive(item.path)
                  ? "bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-400/20 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-primary hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-500/10"
              }`}
            >
              {item.badge && <span className="text-sm">{item.badge}</span>}
              {item.icon && <item.icon className="h-4 w-4" />}
              <div className="flex flex-col">
                <span className="leading-none">{item.label}</span>
                {item.description && (
                  <span className="text-[10px] text-muted-foreground/70 leading-none mt-0.5">
                    {item.description}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:flex">
            <Button
              variant="outline"
              className="relative h-9 w-64 justify-start rounded-md border border-input bg-transparent px-3 py-2 text-sm text-muted-foreground shadow-none hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Search products...</span>
              <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
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
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>

          {/* User Account */}
          <Link to="/login">
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
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
                    {item.badge && (
                      <span className="text-lg">{item.badge}</span>
                    )}
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
