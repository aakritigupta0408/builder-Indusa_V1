import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  Truck,
  Shield,
  CheckCircle,
  Package,
  MapPin,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { useApp, useAppActions, CartItem } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { state } = useApp();
  const actions = useAppActions();
  const { user, isAuthenticated } = useAuth();

  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (state.cart.length === 0 && !orderComplete) {
      navigate("/catalog");
    }
  }, [state.cart.length, navigate, orderComplete]);

  // Calculate totals
  const subtotal = state.cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const shippingCost =
    shippingMethod === "express"
      ? 15.99
      : shippingMethod === "overnight"
        ? 29.99
        : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleShippingChange = (field: string, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleBillingChange = (field: string, value: string) => {
    setBillingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      actions.clearCart();
    }, 3000);
  };

  const isFormValid = () => {
    return (
      shippingInfo.firstName &&
      shippingInfo.lastName &&
      shippingInfo.email &&
      shippingInfo.address &&
      shippingInfo.city &&
      shippingInfo.state &&
      shippingInfo.zipCode &&
      paymentInfo.cardNumber &&
      paymentInfo.expiryDate &&
      paymentInfo.cvv &&
      paymentInfo.cardholderName
    );
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Order Confirmed!
              </h1>
              <p className="text-muted-foreground mb-6">
                Thank you for your purchase. Your order has been placed
                successfully and you will receive a confirmation email shortly.
              </p>
              <div className="bg-muted/50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-2">Order Details</h3>
                <p className="text-sm text-muted-foreground">
                  Order #: ORD-{Date.now()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Total: {formatPrice(total)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Estimated delivery: 3-5 business days
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                <Link to="/catalog">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
                <Link to="/dashboard">
                  <Button>View Orders</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={shippingInfo.firstName}
                      onChange={(e) =>
                        handleShippingChange("firstName", e.target.value)
                      }
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={shippingInfo.lastName}
                      onChange={(e) =>
                        handleShippingChange("lastName", e.target.value)
                      }
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) =>
                        handleShippingChange("email", e.target.value)
                      }
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        handleShippingChange("phone", e.target.value)
                      }
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) =>
                      handleShippingChange("address", e.target.value)
                    }
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) =>
                        handleShippingChange("city", e.target.value)
                      }
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select
                      onValueChange={(value) =>
                        handleShippingChange("state", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={(e) =>
                        handleShippingChange("zipCode", e.target.value)
                      }
                      placeholder="12345"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Shipping Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    shippingMethod === "standard"
                      ? "border-primary bg-primary/5"
                      : "border-muted"
                  }`}
                  onClick={() => setShippingMethod("standard")}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Standard Shipping</p>
                      <p className="text-sm text-muted-foreground">
                        5-7 business days
                      </p>
                    </div>
                    <p className="font-semibold">{formatPrice(5.99)}</p>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    shippingMethod === "express"
                      ? "border-primary bg-primary/5"
                      : "border-muted"
                  }`}
                  onClick={() => setShippingMethod("express")}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Express Shipping</p>
                      <p className="text-sm text-muted-foreground">
                        2-3 business days
                      </p>
                    </div>
                    <p className="font-semibold">{formatPrice(15.99)}</p>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    shippingMethod === "overnight"
                      ? "border-primary bg-primary/5"
                      : "border-muted"
                  }`}
                  onClick={() => setShippingMethod("overnight")}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Overnight Shipping</p>
                      <p className="text-sm text-muted-foreground">
                        Next business day
                      </p>
                    </div>
                    <p className="font-semibold">{formatPrice(29.99)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={(e) =>
                      handlePaymentChange("cardNumber", e.target.value)
                    }
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      value={paymentInfo.cardholderName}
                      onChange={(e) =>
                        handlePaymentChange("cardholderName", e.target.value)
                      }
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={paymentInfo.cvv}
                      onChange={(e) =>
                        handlePaymentChange("cvv", e.target.value)
                      }
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    value={paymentInfo.expiryDate}
                    onChange={(e) =>
                      handlePaymentChange("expiryDate", e.target.value)
                    }
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-4">
                  {state.cart.map((item, index) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="border rounded-lg p-3"
                    >
                      <div className="flex gap-3 mb-3">
                        <div className="w-12 h-12 bg-neutral rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-1">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-semibold">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>

                      {/* Item Options */}
                      <div className="space-y-2">
                        {item.selectedSize && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Size:</span>
                            <span className="bg-muted px-2 py-1 rounded">
                              {item.selectedSize}
                            </span>
                          </div>
                        )}

                        {/* Color Selection */}
                        {item.product.availableColors &&
                        item.product.availableColors.length > 1 ? (
                          <div className="space-y-1">
                            <span className="text-xs text-muted-foreground">
                              Color:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {item.product.availableColors.map((color) => (
                                <button
                                  key={color}
                                  onClick={() => {
                                    // Remove old item and add new one with different color
                                    actions.removeFromCart(item.product.id);
                                    actions.addToCart(
                                      item.product,
                                      item.quantity,
                                      item.selectedSize,
                                      color,
                                    );
                                  }}
                                  className={`px-2 py-1 rounded text-xs border transition-all ${
                                    item.selectedColor === color
                                      ? "border-primary bg-primary/10 text-primary font-medium"
                                      : "border-muted hover:border-muted-foreground text-muted-foreground"
                                  }`}
                                >
                                  {color}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          item.selectedColor && (
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                Color:
                              </span>
                              <span className="bg-muted px-2 py-1 rounded">
                                {item.selectedColor}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-success" />
                    <span className="text-muted-foreground">
                      Your payment is secured with 256-bit SSL encryption
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={!isFormValid() || isProcessing}
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>Place Order • {formatPrice(total)}</>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By placing your order, you agree to our Terms of Service and
                  Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
