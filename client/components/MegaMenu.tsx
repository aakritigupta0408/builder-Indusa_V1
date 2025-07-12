import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ChevronDown, ArrowRight } from "lucide-react";
import { categories } from "@/data/subcategories";

interface MegaMenuProps {
  isActive: (path: string) => boolean;
}

export function MegaMenu({ isActive }: MegaMenuProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-6">
        {categories.map((category) => (
          <NavigationMenuItem key={category.id}>
            <NavigationMenuTrigger
              className={`font-semibold transition-all duration-300 px-3 py-2 rounded-lg relative group bg-transparent hover:bg-primary/5 data-[state=open]:bg-primary/10 ${
                isActive(`/catalog?category=${category.id}`)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <span className="text-sm">{category.name.split(" & ")[0]}</span>
              <ChevronDown className="ml-1 h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[600px] p-6">
                {/* Category Header */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <Link to={`/catalog?category=${category.id}`}>
                    <Button variant="outline" size="sm">
                      View All {category.name.split(" & ")[0]}
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>

                {/* Subcategories Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={`/catalog?category=${category.id}&subcategory=${subcategory.id}`}
                      className="group"
                    >
                      <Card className="border-0 shadow-none hover:shadow-md transition-all duration-200 hover:bg-primary/5">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                                {subcategory.name}
                              </h4>
                              {subcategory.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {subcategory.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* Popular Items Preview */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold text-sm text-foreground mb-3">
                    Popular in {category.name.split(" & ")[0]}
                  </h4>
                  <div className="flex gap-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-16 h-16 bg-neutral rounded-lg overflow-hidden"
                      >
                        <img
                          src="/placeholder.svg"
                          alt="Popular item"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <Link
                      to={`/catalog?category=${category.id}`}
                      className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors group"
                    >
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    </Link>
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
