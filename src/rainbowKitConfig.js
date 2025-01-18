import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrumSepolia } from "wagmi/chains";

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
  appName: "dreamlair",
  projectId: "3ce3f1ebb2e8e4bc49354e9e1d7bffcf",
  chains: [customArbitrumSepolia],
  ssr: true,
});

export default config;
