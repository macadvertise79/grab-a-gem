import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from "sonner";
import { useCartSync } from "./hooks/useCartSync";
import { SHOPIFY_CONFIG_STATUS } from "./lib/shopify";

const queryClient = new QueryClient();
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Shop = lazy(() => import("./pages/Shop"));
const IconDetail = lazy(() => import("./pages/IconDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageFallback() {
  return <div className="min-h-screen bg-background" />;
}

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
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/icon/001" element={<IconDetail />} />
        <Route path="/products/:handle" element={<IconDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
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
