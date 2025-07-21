
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MedicalTrends from "./pages/MedicalTrends";
import AINewsFeed from "./pages/AINewsFeed";
import NotFound from "./pages/NotFound";
import MedicalChatbot from "./pages/MedicalChatbot";
import Subscription from "./pages/Subscription";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Safety from "./pages/Safety";
import OurTeam from "./pages/OurTeam";
import AdvisoryBoard from "./pages/AdvisoryBoard";
import MedicalTeam from "./pages/MedicalTeam";
import EditorialTeam from "./pages/EditorialTeam";
import Business from "./pages/Business";
import Blog from "./pages/Blog";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/medical-trends" element={<MedicalTrends />} />
                <Route path="/ai-news" element={<AINewsFeed />} />
                <Route path="/medical-chatbot" element={<MedicalChatbot />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/safety" element={<Safety />} />
                <Route path="/our-team" element={<OurTeam />} />
                <Route path="/advisory-board" element={<AdvisoryBoard />} />
                <Route path="/medical-team" element={<MedicalTeam />} />
                <Route path="/editorial-team" element={<EditorialTeam />} />
                <Route path="/business" element={<Business />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
