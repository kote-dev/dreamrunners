import "./App.css";
import PagesRoutes from "./Components/PagesRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { RainbowKitProvider, ConnectButton } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import config from "./rainbowKitConfig";
import { S3_BASE_URL } from "./config/constants";
import ReactGA from "react-ga4";
import { DiscordAuthProvider } from "./context/DiscordAuthContext";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

// Initialize GA4
ReactGA.initialize("G-MR5RGZ4W02");

const App = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Toaster position="top-right" />
            <DiscordAuthProvider>
              <Router>
                <PagesRoutes />
              </Router>
            </DiscordAuthProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  );
};

export default App;
