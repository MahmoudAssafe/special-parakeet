
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScanPage from "./pages/ScanPage";
import LivePage from "./pages/LivePage";
import GroupsPage from "./pages/GroupsPage";
import ChatPage from "./pages/ChatPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import WelcomeQRBanner from "./components/WelcomeQRBanner";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-chatqr-dark text-white">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/scan" element={
                <>
                  <Navbar />
                  <Sidebar />
                  <div className="mr-[75px]">
                    <ScanPage />
                  </div>
                  <WelcomeQRBanner />
                </>
              } />
              <Route path="/live" element={
                <>
                  <Navbar />
                  <Sidebar />
                  <div className="mr-[75px]">
                    <LivePage />
                  </div>
                  <WelcomeQRBanner />
                </>
              } />
              <Route path="/groups" element={
                <>
                  <Navbar />
                  <Sidebar />
                  <div className="mr-[75px]">
                    <GroupsPage />
                  </div>
                  <WelcomeQRBanner />
                </>
              } />
              <Route path="/chat" element={
                <>
                  <Navbar />
                  <Sidebar />
                  <div className="mr-[75px]">
                    <ChatPage />
                  </div>
                  <WelcomeQRBanner />
                </>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
