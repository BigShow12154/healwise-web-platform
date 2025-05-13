
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import SymptomsPage from "./pages/SymptomsPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import WearablesPage from "./pages/WearablesPage";
import FamilyPage from "./pages/FamilyPage";
import DoctorsPage from "./pages/DoctorsPage";
import ShopPage from "./pages/ShopPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/symptoms" element={<SymptomsPage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/wearables" element={<WearablesPage />} />
          <Route path="/family" element={<FamilyPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/settings" element={<ProfilePage />} />
          <Route path="/appointments" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
