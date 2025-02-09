import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";
import {
  DREAM_LAIR_ADDRESS,
  DREAM_LAIR_ABI,
} from "../contracts/dreamLairConfig";
import { toast } from "react-hot-toast";

const usePFPMint = () => {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [txHash, setTxHash] = useState(null);

  const { writeContractAsync } = useWriteContract();

  const {
    data: receipt,
    isSuccess: isConfirmed,
    isLoading: isMinting,
    status,
    error: txError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
    onSuccess(data) {
      console.log("✅ Transaction receipt:", data);
      console.log("Transaction status:", status);
      console.log("Is confirmed?", isConfirmed);
      console.log("Is mining?", isMinting);
    },
    onError(error) {
      console.error("❌ Transaction failed:", error);
      console.log("Transaction status:", status);
      console.log("Is confirmed?", isConfirmed);
      console.log("Is mining?", isMinting);
      setError(error.message);
    },
  });

  const generateImages = async (prompt) => {
    if (!address) {
      toast.error("Please connect your wallet first", {
        position: "top-center",
        style: {
          background: "#fff",
          color: "#333",
          padding: "16px",
          borderRadius: "8px",
        },
      });
      return;
    }

    console.log("🚀 Generating images for prompt:", prompt);
    console.log("👛 Using wallet address:", address);
    setIsLoading(true);
    setError(null);

    const requestBody = {
      prompt,
      wallet_address: address,
    };
    console.log("📤 Sending request with body:", requestBody);

    try {
      const response = await fetch(
        "https://dream-dev.blightfell.com/get_dreamrunner",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log("📡 Response status:", response.status);
      console.log("📡 Response headers:", Object.fromEntries(response.headers));

      if (!response.ok) {
        throw new Error(
          `Failed to generate images: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("📦 Response data:", data);

      const imageArray = data.images.map((item) => ({
        image: `data:image/png;base64,${item.image}`,
        uuid: item.uuid,
        signature: item.signature,
      }));

      setGeneratedImages(imageArray);
    } catch (err) {
      console.error("❌ Detailed error info:", {
        name: err.name,
        message: err.message,
        cause: err.cause,
        stack: err.stack,
      });
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearImages = () => {
    setGeneratedImages([]);
  };

  const mintDreamrunner = async (imageData) => {
    console.log("🎮 Attempting on-chain mint with data:", imageData);
    try {
      setTxHash(null);
      setError(null);

      const hash = await writeContractAsync({
        address: DREAM_LAIR_ADDRESS,
        abi: DREAM_LAIR_ABI,
        functionName: "mint",
        args: [imageData.signature, BigInt(imageData.uuid)],
        value: parseEther("0.01"),
      });

      console.log("📝 Transaction submitted with hash:", hash);
      console.log("Current status:", status);
      console.log("Is mining?", isMinting);
      setTxHash(hash);
      return hash;
    } catch (err) {
      console.error("❌ Mint error:", err);
      throw new Error("Failed to mint");
    }
  };

  return {
    isLoading,
    isMinting,
    isConfirmed,
    error,
    generatedImages,
    generateImages,
    clearImages,
    mintDreamrunner,
    txHash,
  };
};

export default usePFPMint;
