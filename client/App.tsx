import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import TryOn from "./pages/TryOn";
import AISizing from "./pages/AISizing";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Designers from "./pages/Designers";
import Designer from "./pages/Designer";
import Wardrobe from "./pages/Wardrobe";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/try-on" element={<TryOn />} />
              <Route path="/ai-sizing" element={<AISizing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/designers" element={<Designers />} />
              <Route path="/designer/:id" element={<Designer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
