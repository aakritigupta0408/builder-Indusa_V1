import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  LogOut,
  ShoppingBag,
  Heart,
  Camera,
  Settings,
  Package,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getProviderBadgeColor = (provider?: string) => {
    switch (provider) {
      case "google":
        return "bg-blue-100 text-blue-800";
      case "instagram":
        return "bg-pink-100 text-pink-800";
      case "facebook":
        return "bg-blue-100 text-blue-800";
      case "apple":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-muted-foreground">
                Manage your account and shopping preferences
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* User Profile */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-4">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-primary" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl">{user.name}</CardTitle>
                  <CardDescription className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </CardDescription>
                  {user.provider && (
                    <Badge
                      className={`capitalize mt-2 ${getProviderBadgeColor(
                        user.provider,
                      )}`}
                    >
                      {user.provider === "email"
                        ? "Email Account"
                        : user.provider}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Dashboard Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Jump into your favorite shopping experiences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col gap-2"
                      onClick={() => navigate("/try-on")}
                    >
                      <Camera className="w-6 h-6 text-primary" />
                      <span className="font-medium">Virtual Try-On</span>
                      <span className="text-xs text-muted-foreground">
                        Try clothes virtually
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col gap-2"
                      onClick={() => navigate("/ai-sizing")}
                    >
                      <TrendingUp className="w-6 h-6 text-primary" />
                      <span className="font-medium">AI Sizing</span>
                      <span className="text-xs text-muted-foreground">
                        Get perfect fit
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col gap-2"
                      onClick={() => navigate("/catalog")}
                    >
                      <ShoppingBag className="w-6 h-6 text-primary" />
                      <span className="font-medium">Browse Catalog</span>
                      <span className="text-xs text-muted-foreground">
                        Discover products
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col gap-2"
                      onClick={() => navigate("/catalog")}
                    >
                      <Heart className="w-6 h-6 text-primary" />
                      <span className="font-medium">Wishlist</span>
                      <span className="text-xs text-muted-foreground">
                        Saved items
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Orders</p>
                          <p className="text-sm text-muted-foreground">
                            View order history
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                          <Heart className="w-5 h-5 text-success" />
                        </div>
                        <div>
                          <p className="font-medium">Wishlist</p>
                          <p className="text-sm text-muted-foreground">
                            Saved for later
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                          <Settings className="w-5 h-5 text-warning" />
                        </div>
                        <div>
                          <p className="font-medium">Settings</p>
                          <p className="text-sm text-muted-foreground">
                            Account preferences
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest interactions with Indusa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      No recent activity yet
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start shopping to see your activity here
                    </p>
                    <Button onClick={() => navigate("/catalog")}>
                      Browse Products
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
