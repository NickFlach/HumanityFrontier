import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { WalletProvider, createWalletManager } from "@pitchfork/wallet";
import NotFound from "@/pages/not-found";
import Home from "./pages/Home";
import QuantumDashboard from "./pages/QuantumDashboard";
import MainLayout from "./layouts/MainLayout";
import { HumanityFrontierCommunicationHub } from "./pages/CommunicationHub";

// Lazy load adventure pages
const Adventure = lazy(() => import("./pages/Adventure"));
const QuestLog = lazy(() => import("./components/adventure/QuestLog"));
const ArtifactGallery = lazy(() => import("./components/adventure/ArtifactGallery"));
const CipherPuzzle = lazy(() => import("./components/adventure/CipherPuzzle"));
const HiddenPassages = lazy(() => import("./components/adventure/HiddenPassages"));

function Router() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-[#0a0e27] text-white">Loading...</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/quantum-dashboard" component={QuantumDashboard} />
        <Route path="/communication-hub" component={HumanityFrontierCommunicationHub} />
        <Route path="/adventure" component={Adventure} />
        <Route path="/adventure/quests" component={QuestLog} />
        <Route path="/adventure/artifacts" component={ArtifactGallery} />
        <Route path="/adventure/cipher" component={CipherPuzzle} />
        <Route path="/adventure/passages" component={HiddenPassages} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Router />
      </MainLayout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
