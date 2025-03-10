import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrumSepolia } from "wagmi/chains";
import { http } from "wagmi";

const customArbitrumSepolia = {
  ...arbitrumSepolia,
  rpcUrls: {
    ...arbitrumSepolia.rpcUrls,
    default: {
      http: [
        "https://arb-sepolia.g.alchemy.com/v2/_ppGcgEKgmgFXlx5IH8yQaWVBeW1w2HH",
      ],
    },
    public: {
      http: [
        "https://arb-sepolia.g.alchemy.com/v2/_ppGcgEKgmgFXlx5IH8yQaWVBeW1w2HH",
      ],
    },
  },
};

const config = getDefaultConfig({
  appName: "dreampad",
  projectId: "6333eaddec4872e1d8075bc192fb8326",
  chains: [customArbitrumSepolia],
  ssr: true,
  transports: {
    [customArbitrumSepolia.id]: http(
      "https://arb-sepolia.g.alchemy.com/v2/_ppGcgEKgmgFXlx5IH8yQaWVBeW1w2HH"
    ),
  },
});

export default config;
