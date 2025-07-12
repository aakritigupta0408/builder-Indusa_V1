import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ExternalLink,
  MapPin,
  Calendar,
  Search,
  Store,
  Instagram,
  Twitter,
  ArrowRight,
  Filter,
  X,
} from "lucide-react";
import { designers, Designer } from "@/data/designers";

const specialties = [
  "All",
  "Fashion",
  "Home Decor",
  "Sustainable Fashion",
  "Modern Design",
  "Basics",
  "Innovation",
  "Furniture",
];

const locations = [
  "All",
  "Spain",
  "Sweden",
  "Japan",
  "Brooklyn, NY",
  "Chicago, IL",
];

export default function Designers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // Filter and sort designers
  const filteredDesigners = designers
    .filter((designer) => {
      const matchesSearch =
        designer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        designer.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === "All" ||
        designer.specialty.some((spec) => spec.includes(selectedSpecialty));

      const matchesLocation =
        selectedLocation === "All" || designer.location === selectedLocation;

      return matchesSearch && matchesSpecialty && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "products":
          return b.totalProducts - a.totalProducts;
        case "founded":
          return parseInt(a.founded) - parseInt(b.founded);
        default:
          return 0;
      }
    });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSpecialty("All");
    setSelectedLocation("All");
    setSortBy("name");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Store className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Shop by Designer
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover curated collections from the world's leading fashion and
              home decor designers. Each designer brings their unique vision and
              style.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search designers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3 items-center">
                <Select
                  value={selectedSpecialty}
                  onValueChange={setSelectedSpecialty}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="products">Products</SelectItem>
                    <SelectItem value="founded">Founded</SelectItem>
                  </SelectContent>
                </Select>

                {(searchQuery ||
                  selectedSpecialty !== "All" ||
                  selectedLocation !== "All") && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Active Filters */}
            {(selectedSpecialty !== "All" || selectedLocation !== "All") && (
              <div className="flex gap-2 mt-4">
                {selectedSpecialty !== "All" && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Specialty: {selectedSpecialty}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setSelectedSpecialty("All")}
                    />
                  </Badge>
                )}
                {selectedLocation !== "All" && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Location: {selectedLocation}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setSelectedLocation("All")}
                    />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Designers Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Results count */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                {filteredDesigners.length} designer
                {filteredDesigners.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Designers Grid */}
            {filteredDesigners.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  No designers found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria
                </p>
                <Button onClick={clearFilters}>Clear all filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDesigners.map((designer) => (
                  <Card
                    key={designer.id}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/designer/${designer.id}`)}
                  >
                    {/* Cover Image */}
                    <div className="relative h-48 bg-neutral overflow-hidden">
                      <img
                        src={designer.coverImage}
                        alt={`${designer.name} cover`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Designer Logo */}
                      <div className="absolute bottom-4 left-4">
                        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden border-2 border-white shadow-lg">
                          <img
                            src={designer.image}
                            alt={designer.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Product Count */}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-black">
                          {designer.totalProducts} Products
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      {/* Designer Info */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {designer.name}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                          {designer.description}
                        </p>
                      </div>

                      {/* Specialties */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {designer.specialty.slice(0, 3).map((spec) => (
                            <Badge
                              key={spec}
                              variant="secondary"
                              className="text-xs"
                            >
                              {spec}
                            </Badge>
                          ))}
                          {designer.specialty.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{designer.specialty.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Founded {designer.founded}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{designer.location}</span>
                        </div>
                      </div>

                      {/* Social & Website */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {designer.social?.instagram && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                  `https://instagram.com/${designer.social?.instagram?.replace("@", "")}`,
                                  "_blank",
                                );
                              }}
                            >
                              <Instagram className="w-4 h-4" />
                            </Button>
                          )}
                          {designer.social?.twitter && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                  `https://twitter.com/${designer.social?.twitter?.replace("@", "")}`,
                                  "_blank",
                                );
                              }}
                            >
                              <Twitter className="w-4 h-4" />
                            </Button>
                          )}
                          {designer.website && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                  `https://${designer.website}`,
                                  "_blank",
                                );
                              }}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        <Button
                          size="sm"
                          className="group-hover:translate-x-1 transition-transform"
                        >
                          View Store
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
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
