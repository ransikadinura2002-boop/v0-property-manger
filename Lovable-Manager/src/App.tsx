import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Tenants from "./pages/Tenants";
import Maintenance from "./pages/Maintenance";
import Inspections from "./pages/Inspections";
import Issues from "./pages/Issues";
import ServiceProviders from "./pages/ServiceProviders";
import LeaseAgreements from "./pages/LeaseAgreements";
import NotFound from "./pages/NotFound";
import { ClipboardCheck, AlertCircle, UserCheck, FileText } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/inspections" element={<Inspections />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/providers" element={<ServiceProviders />} />
            <Route path="/leases" element={<LeaseAgreements />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
