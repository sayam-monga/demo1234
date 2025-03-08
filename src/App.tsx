import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Checkout from "./pages/Checkout";
import MyPasses from "./pages/MyPasses";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/ContactUs";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/Refund";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-passes" element={<MyPasses />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Terms" element={<Terms />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/refund" element={<RefundPolicy />} />
            {/* <Route path="/privacy" element={<PrivacyPolicy />} /> */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
