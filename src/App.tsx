import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ThankYouPage } from "./pages/ThankYouPage";
import OtoPage from "./pages/OtoPage";
import { ThankYouPageOtoFb } from "./pages/ThankuPageOtoFb";
import OtoPageGa from "./pages/OtoPageGa";
import { ThankYouPageOtoGa } from "./pages/ThankuPageOtoGa";
import { ThankYouPageGa } from "./pages/ThankYouPageGa";
import IndexGa from "./pages/IndexGa";
import { OTOWatchPage } from "./pages/OTOWatchPage";
import { OTOThankYouPage } from "./pages/OTOThankYouPage";
import Watch from "./pages/Watch";
import { ThankYouPageWatch } from "./pages/ThankuWatch";


import WatchGa from "./pages/watch-pages/WatchGa";
import { ThankuWatchGa } from "./pages/watch-pages/ThankuWatchGa";
import { OTOWatchPageGa } from "./pages/watch-pages/OTOWatchPageGa"; 
import { OTOThankYouPageGa } from "./pages/watch-pages/OTOThankYouPageGa"; 
import { usePageViewGTM } from "./hooks/use-pageview-gtm";


const queryClient = new QueryClient();


const AppRoutes = () => {
  usePageViewGTM(); // ← hook goes here

  return (
    <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/oto-fb" element={<OtoPage />} />
            <Route path="/ty-fb" element={<ThankYouPage />} />
            <Route path="/ty-oto-fb" element={<ThankYouPageOtoFb />} />

            <Route path="/ga" element={<IndexGa />} />
            <Route path="/ty-ga" element={<ThankYouPageGa />} />
            <Route path="/oto-ga" element={<OtoPageGa />} />
            <Route path="/ty-oto-ga" element={<ThankYouPageOtoGa />} />

            {/* watch */}
            <Route path="/watch-fb" element={<Watch />} />
            <Route path="/watch-fb-ty" element={<ThankYouPageWatch />} />
            <Route path="/oto-watch-fb" element={<OTOWatchPage />} />
            <Route path="/oto-watch-fb-ty" element={<OTOThankYouPage />} />

            <Route path="/watch-ga" element={<WatchGa />} />
            <Route path="/watch-ga-ty" element={<ThankuWatchGa />} />
            <Route path="/oto-watch-ga" element={<OTOWatchPageGa />} />
            <Route path="/oto-watch-ga-ty" element={<OTOThankYouPageGa />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
  );
};


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
