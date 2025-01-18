import { useState } from "react";
import {
  useWriteContract,
  useAccount,
  useChainId,
  usePublicClient,
} from "wagmi";
import { parseEther } from "viem";
import { arbitrumSepolia } from "wagmi/chains";
import { toast } from "react-hot-toast";
import {
  DREAM_LAIR_ADDRESS,
  DREAM_LAIR_ABI,
  TIER_COSTS,
  TIER_TOKEN_IDS,
} from "../../../contracts/dreamLairConfig";

export const useMint = () => {
  const [isMinting, setIsMinting] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();

  const mint = async (tierIndex) => {
    let toastId;
    try {
      setIsMinting(true);
      const tokenId = TIER_TOKEN_IDS[tierIndex];
      const cost = TIER_COSTS[tierIndex];

      // Check token state first
      const tokenState = await publicClient.readContract({
        address: DREAM_LAIR_ADDRESS,
        abi: DREAM_LAIR_ABI,
        functionName: "tokens",
        args: [tokenId],
      });

      console.log("Token state before mint:", {
        tokenId,
        cost: tokenState[0],
        maxSupply: tokenState[1],
        currentSupply: tokenState[2],
        sentValue: parseEther(cost),
      });

      toastId = toast.loading("Confirming transaction...");

      const hash = await writeContractAsync({
        address: DREAM_LAIR_ADDRESS,
        abi: DREAM_LAIR_ABI,
        functionName: "mint",
        args: [tokenId, 1],
        value: parseEther(cost),
      });

      toast.dismiss(toastId);
      toast.success(`Successfully minted! Transaction: ${hash}`);
      return hash;
    } catch (error) {
      console.error("Mint error:", error);
      toast.dismiss(toastId);
      toast.error("Failed to mint");
      throw error;
    } finally {
      setIsMinting(false);
    }
  };

  return {
    mint,
    isMinting,
    isWrongNetwork: chainId !== arbitrumSepolia.id,
  };
};
