import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from "sonner";
import Index from "./pages/Index";
import About from "./pages/About";
import Shop from "./pages/Shop";
import IconDetail from "./pages/IconDetail";
import NotFound from "./pages/NotFound";
import { useCartSync } from "./hooks/useCartSync";
import { SHOPIFY_CONFIG_STATUS } from "./lib/shopify";

const queryClient = new QueryClient();

function AppInner() {
  useCartSync();

  useEffect(() => {
    if (!SHOPIFY_CONFIG_STATUS.isConfigured) {
      toast.error("Shopify is not configured", {
        description: SHOPIFY_CONFIG_STATUS.errors.join(" "),
        duration: 10000,
      });
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/icon/001" element={<IconDetail />} />
      <Route path="/products/:handle" element={<IconDetail />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppInner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
