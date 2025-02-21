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
import { v4 as uuidv4 } from "uuid";

const usePFPMint = () => {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [txHash, setTxHash] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [generationStatus, setGenerationStatus] = useState(null);
  const [statusInterval, setStatusInterval] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

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

  const checkGenerationStatus = async (reqId) => {
    try {
      console.log(`🔄 Checking status for ${reqId}...`);
      const response = await fetch(
        `https://dream-dev.blightfell.com/job_state/${reqId}`
      );
      const data = await response.json();
      console.log(`🔍 Raw status response for ${reqId}:`, data);
      setGenerationStatus(data);
      return data;
    } catch (err) {
      console.error(`❌ Status check failed for ${reqId}:`, err);
      return null;
    }
  };

  const generateImages = async (prompt) => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    const reqId = uuidv4();
    console.log(`🎨 Starting generation ${reqId} for ${address}`);
    setRequestId(reqId);
    setIsLoading(true);
    setError(null);

    // Start polling immediately
    const interval = setInterval(async () => {
      console.log(
        `⏱️ Polling tick for ${reqId} at ${new Date().toLocaleTimeString()}`
      );
      const status = await checkGenerationStatus(reqId);
      console.log(`📊 Status state:`, status?.state, "Full status:", status);

      if (status?.state?.toUpperCase() === "COMPLETED") {
        console.log(`✨ Generation completed for ${reqId}`);
        clearInterval(interval);
        setIsLoading(false);
      } else if (status?.state?.toUpperCase() === "FAILED") {
        console.error(`❌ Generation failed:`, status);
        clearInterval(interval);
        setIsLoading(false);
        setError(status.error || "Generation failed");
      }
    }, 2000);
    setStatusInterval(interval);

    // Store timeout reference
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (isLoading) {
        console.error(`⏰ Generation ${reqId} timed out`);
        setIsLoading(false);
        setError("Generation timed out");
      }
    }, 300000);
    setTimeoutId(timeout);

    // Make the initial request after starting polling
    const requestBody = {
      prompt,
      wallet_address: address,
      request_id: reqId,
    };

    try {
      console.log(`📤 Sending request:`, requestBody);
      const response = await fetch(
        "https://dream-dev.blightfell.com/get_dreamrunner",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        clearInterval(interval);
        const errorData = await response.json().catch(() => null);
        console.error(`❌ API error (${response.status}):`, errorData);
        throw new Error(
          errorData?.message || `Generation failed: ${response.status}`
        );
      }

      // Handle the initial response with images
      const responseData = await response.json();
      console.log(`📥 Initial response with images:`, responseData);

      if (responseData.images) {
        console.log(`🖼️ Received ${responseData.images.length} images`);
        const imageArray = responseData.images.map((item) => ({
          image: `data:image/png;base64,${item.image}`,
          uuid: item.uuid,
          signature: item.signature,
        }));
        setGeneratedImages(imageArray);
        clearInterval(interval); // Clear polling since we got images
        setStatusInterval(null); // Clear the interval reference
        setIsLoading(false);
      }
    } catch (err) {
      clearInterval(interval);
      console.error(`❌ Generation error:`, err);
      setError(err.message);
      setIsLoading(false);
      return null;
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

  const resetState = () => {
    // Clear any existing intervals/timeouts
    if (statusInterval) {
      clearInterval(statusInterval);
      setStatusInterval(null);
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    setIsLoading(false);
    setError(null);
    setGeneratedImages([]);
    setTxHash(null);
    setRequestId(null);
    setGenerationStatus(null);
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
    generationStatus,
    resetState,
  };
};

export default usePFPMint;
