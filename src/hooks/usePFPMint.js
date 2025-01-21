import { useState } from "react";

const usePFPMint = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);

  const generateImages = async (prompt) => {
    console.log("🚀 Generating images for prompt:", prompt);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://dream-dev.blightfell.com/get_dreamrunner",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
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
      console.log("📦 Response data structure:", Object.keys(data));
      const imageArray =
        data.success?.map((base64) => `data:image/png;base64,${base64}`) || [];
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

  return {
    isLoading,
    error,
    generatedImages,
    generateImages,
    clearImages,
  };
};

export default usePFPMint;
