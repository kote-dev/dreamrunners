import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMAGES, VIDEOS } from "../../../config/assetUrls";
import usePFPMint from "../../../hooks/usePFPMint";
import { toast } from "react-hot-toast";
import { Picture } from "../../../Components/Picture";
import { useAccount } from "wagmi";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";

// Enum for mint phases
const MINT_PHASES = {
  LOADING: 0,
  LOADING_WITH_FLAMES: 1,
  CHOOSE_RUNNER: 2,
  PAYMENT: 3,
  SHARE_RUNNER: 4,
  WHITELIST_SECURED: 5,
};

// Log both paths to compare
console.log("Flame video path:", VIDEOS.flame);
console.log("Digital video path:", VIDEOS.digital);

const PFPMint = () => {
  const navigate = useNavigate();
  const {
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
  } = usePFPMint();
  const [currentPhase, setCurrentPhase] = useState(MINT_PHASES.LOADING);
  const [promptText, setPromptText] = useState("");
  const [selectedRunner, setSelectedRunner] = useState(null);
  const [confirmedImage, setConfirmedImage] = useState(null);
  const [runnerName, setRunnerName] = useState("");
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const [currentImageIndex, setCurrentImageIndex] = useState(1); // Start with middle image
  const [loadingMessage, setLoadingMessage] = useState("LOADING");
  const [bgLoaded, setBgLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [textureLoaded, setTextureLoaded] = useState(false);

  const nextPhase = () => {
    setCurrentPhase((prev) => {
      const phases = Object.values(MINT_PHASES);
      const currentIndex = phases.indexOf(prev);
      return phases[Math.min(currentIndex + 1, phases.length - 1)];
    });
  };

  const prevPhase = () => {
    setCurrentPhase((prev) => {
      const phases = Object.values(MINT_PHASES);
      const currentIndex = phases.indexOf(prev);
      return phases[Math.max(currentIndex - 1, 0)];
    });
  };

  useEffect(() => {
    if (generationStatus?.state === "processing") {
      setLoadingMessage("GENERATING YOUR DREAMRUNNER");
    } else if (generationStatus?.state === "failed") {
      setLoadingMessage("GENERATION FAILED");
      toast.error(generationStatus.error || "Failed to generate images");
      setCurrentPhase(MINT_PHASES.LOADING);
    }
  }, [generationStatus]);

  useEffect(() => {
    // Remove initial load state after component mounts
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerate = async () => {
    if (!isConnected) {
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
    if (!promptText.trim()) {
      toast.error("Please enter a prompt", {
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

    setCurrentPhase(MINT_PHASES.LOADING_WITH_FLAMES);
    setLoadingMessage("STARTING GENERATION");

    try {
      await generateImages(promptText);
    } catch (err) {
      console.error("Generation failed:", err);
      toast.error(err.message || "Failed to generate images");
      setCurrentPhase(MINT_PHASES.LOADING);
    }
  };

  const handleConfirm = () => {
    if (selectedRunner !== null) {
      console.log("🎯 Selecting image:", selectedRunner);
      console.log("📸 Image data:", generatedImages[selectedRunner]);
      setConfirmedImage(generatedImages[selectedRunner]);
      nextPhase();
    }
  };

  const handleMint = async (imageData) => {
    if (!isConnected) {
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

    try {
      toast.loading("Please confirm the transaction in your wallet...", {
        id: "mint",
        position: "top-center",
        style: {
          background: "#fff",
          color: "#333",
          padding: "16px",
          borderRadius: "8px",
        },
      });
      await mintDreamrunner(imageData);
      toast.success("Successfully minted your Dreamrunner!", {
        id: "mint",
        position: "top-center",
        style: {
          background: "#fff",
          color: "#333",
          padding: "16px",
          borderRadius: "8px",
        },
      });
      nextPhase();
    } catch (err) {
      console.error("Mint error:", err);
      toast.error("Failed to mint. Please try again.", {
        id: "mint",
        position: "top-center",
        style: {
          background: "#fff",
          color: "#333",
          padding: "16px",
          borderRadius: "8px",
        },
      });
    }
  };

  const handleShare = () => {
    const shareText = "I just minted my Dreamrunner! 🎮✨";
    const shareUrl = "https://www.dreampad.ai";
    const hashtags = "Dreamrunner,NFT,Web3";

    // Construct Twitter share URL
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(
      hashtags
    )}`;

    // Open in new window
    window.open(twitterUrl, "_blank");
  };

  useEffect(() => {
    if (generatedImages.length > 0) {
      setCurrentPhase(MINT_PHASES.CHOOSE_RUNNER);
    }
  }, [generatedImages]);

  const buttonClasses =
    "h-12 w-auto transition-all duration-300 transform-gpu hover:scale-105 drop-shadow-[0_0_3px_rgba(0,0,0,0.5)] hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transform origin-center translate-y-1";

  const gradientTextStyle = {
    background:
      "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    filter:
      "drop-shadow(0 4px 6px rgba(0,0,0,0.9)) drop-shadow(0 1px 3px rgba(0,0,0,0.9))",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
  };

  const handleConnect = () => {
    console.log("🔌 Connect wallet clicked");
    console.log("📱 Current connection status:", isConnected);
    console.log("🏠 Connected address:", address);

    if (isConnected) {
      openAccountModal?.();
    } else {
      openConnectModal?.();
    }
  };

  // Add navigation functions
  const nextImage = () => {
    if (generatedImages && generatedImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % 3);
    }
  };

  const prevImage = () => {
    if (generatedImages && generatedImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + 3) % 3);
    }
  };

  // Render current phase content
  const renderPhaseContent = () => {
    const images = Array.isArray(generatedImages) ? generatedImages : [];

    switch (currentPhase) {
      case MINT_PHASES.LOADING:
        return (
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mt-[80px] md:mt-[120px] px-4">
              {/* Mobile Navigation */}
              {generatedImages && generatedImages.length > 0 && (
                <div className="flex items-center justify-between w-full md:hidden px-4">
                  <button
                    onClick={prevImage}
                    className="text-[#fcdfc5] text-4xl opacity-80 hover:opacity-100 transition-opacity absolute left-4 top-1/2 -translate-y-1/2 z-10"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="text-[#fcdfc5] text-4xl opacity-80 hover:opacity-100 transition-opacity absolute right-4 top-1/2 -translate-y-1/2 z-10"
                  >
                    →
                  </button>
                </div>
              )}

              {[0, 1, 2].map((id) => (
                <div
                  key={id}
                  className={`relative w-[300px] md:w-[250px] h-auto ${
                    id !== currentImageIndex ? "hidden md:block" : ""
                  }`}
                  style={{
                    filter:
                      "drop-shadow(0 4px 6px rgba(0,0,0,0.9)) drop-shadow(0 1px 3px rgba(0,0,0,0.9))",
                  }}
                  onClick={() => {
                    if (images[id]) {
                      setSelectedRunner(id);
                      setCurrentPhase(MINT_PHASES.CHOOSE_RUNNER);
                    }
                  }}
                >
                  <div className="relative">
                    <Picture
                      sources={IMAGES.dreamrunnerpfp.loading}
                      alt="Loading Frame"
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {images[id] ? (
                        <img
                          src={images[id].image}
                          alt={`Generated ${id + 1}`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <>
                          <img
                            src={
                              [
                                IMAGES.dreamrunnerpfp.placeholder1,
                                IMAGES.dreamrunnerpfp.placeholder2,
                                IMAGES.dreamrunnerpfp.placeholder3,
                              ][id]
                            }
                            alt={`Placeholder ${id + 1}`}
                            className="w-[90%] h-[90%] object-contain opacity-50"
                            style={{ display: isLoading ? "none" : "block" }}
                          />
                          {isLoading && (
                            <video
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-[90%] h-[90%] object-cover"
                            >
                              <source src={VIDEOS.flame} type="video/mp4" />
                            </video>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative w-full max-w-[500px] px-4 mt-auto mb-16">
              <div className="mb-4 relative">
                <img
                  src={IMAGES.dreamrunnerpfp.prompt}
                  alt="Prompt"
                  className="w-full h-auto"
                />
                <textarea
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Enter your dream prompt..."
                  className="absolute top-[10%] left-[3%] w-[94%] md:w-[67%] h-[80%] px-4 py-2 text-[#fcdfc5] placeholder-[#858585] !font-[AveriaSerifLibre] resize-none bg-transparent border-none outline-none"
                />
                <div className="absolute right-[3%] top-1/2 -translate-y-1/2 hidden md:block">
                  <button onClick={handleGenerate} disabled={isLoading}>
                    <img
                      src={IMAGES.dreamrunnerpfp.generate}
                      alt="Generate"
                      className={`${buttonClasses} ${
                        isLoading ? "opacity-50" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex justify-center md:hidden">
                <button onClick={handleGenerate} disabled={isLoading}>
                  <img
                    src={IMAGES.dreamrunnerpfp.generate}
                    alt="Generate"
                    className={`${buttonClasses} ${
                      isLoading ? "opacity-50" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        );
      case MINT_PHASES.CHOOSE_RUNNER:
        return (
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mt-[80px] md:mt-[120px] px-4">
              {/* Mobile Navigation */}
              {generatedImages && generatedImages.length > 0 && (
                <div className="flex items-center justify-between w-full md:hidden px-4">
                  <button
                    onClick={prevImage}
                    className="text-[#fcdfc5] text-4xl opacity-80 hover:opacity-100 transition-opacity absolute left-4 top-1/2 -translate-y-1/2 z-10"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="text-[#fcdfc5] text-4xl opacity-80 hover:opacity-100 transition-opacity absolute right-4 top-1/2 -translate-y-1/2 z-10"
                  >
                    →
                  </button>
                </div>
              )}

              {[0, 1, 2].map((id) => (
                <div
                  key={id}
                  className={`relative w-[300px] md:w-[250px] h-auto ${
                    id !== currentImageIndex ? "hidden md:block" : ""
                  }`}
                  style={{
                    filter:
                      "drop-shadow(0 4px 6px rgba(0,0,0,0.9)) drop-shadow(0 1px 3px rgba(0,0,0,0.9))",
                  }}
                  onClick={() => {
                    if (images[id]) {
                      setSelectedRunner(id);
                      setCurrentPhase(MINT_PHASES.CHOOSE_RUNNER);
                    }
                  }}
                >
                  {selectedRunner === id && (
                    <div
                      className="absolute inset-0 z-0"
                      style={{
                        background: `linear-gradient(to right, 
                          rgba(64,255,220,0) 0%, 
                          rgba(64,255,220,0.2) 50%, 
                          rgba(64,255,220,0) 100%
                        )`,
                        transform: "scale(1.1)",
                        filter: "blur(15px)",
                        animation: "pulse 2s infinite",
                      }}
                    />
                  )}
                  <div className="relative">
                    <Picture
                      sources={IMAGES.dreamrunnerpfp.loading}
                      alt="Loading Frame"
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={images[id] ? images[id].image : null}
                        alt={`Dreamrunner ${id + 1}`}
                        className={`w-[93%] h-[93%] object-contain cursor-pointer mb-[5px]
                          ${
                            selectedRunner !== null && selectedRunner !== id
                              ? "opacity-30"
                              : "opacity-100"
                          }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2
              className="text-xs md:text-lg !font-[AveriaSerifLibre-Bold] text-[#858585]"
              style={{
                background:
                  "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter:
                  "drop-shadow(0 4px 6px rgba(0,0,0,0.9)) drop-shadow(0 1px 3px rgba(0,0,0,0.9))",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              Choose a Dreamrunner or generate new ones
            </h2>

            <div className="relative mt-auto mb-16">
              <img
                src={IMAGES.dreamrunnerpfp.share}
                alt="Prompt"
                className="w-[400px] md:w-[500px] h-auto"
              />
              <div className="absolute inset-0 flex justify-center items-center gap-20 -translate-y-1">
                <button
                  onClick={() => {
                    resetState();
                    setCurrentPhase(MINT_PHASES.LOADING);
                    setPromptText("");
                    setSelectedRunner(null);
                    setConfirmedImage(null);
                  }}
                >
                  <img
                    src={IMAGES.dreamrunnerpfp.generate}
                    alt="Generate"
                    className={buttonClasses}
                  />
                </button>
                {selectedRunner !== null && (
                  <button onClick={handleConfirm}>
                    <img
                      src={IMAGES.dreamrunnerpfp.confirm}
                      alt="Confirm"
                      className={buttonClasses}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      case MINT_PHASES.PAYMENT:
        return (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-4 mt-[80px] md:mt-[120px]">
            {/* Left side - Image */}
            <div className="flex justify-center items-center relative z-[2]">
              <div
                className="relative w-[300px] md:w-[250px] h-auto"
                style={{
                  filter:
                    "drop-shadow(0 4px 6px rgba(0,0,0,0.9)) drop-shadow(0 1px 3px rgba(0,0,0,0.9))",
                }}
              >
                <div className="relative">
                  <Picture
                    sources={IMAGES.dreamrunnerpfp.loading}
                    alt="Loading Frame"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {confirmedImage && (
                      <img
                        src={confirmedImage.image}
                        alt="Selected Dreamrunner"
                        className="w-[93%] h-[93%] object-contain"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Text and Button */}
            <div className="flex flex-col items-center gap-4">
              <h2
                className="text-xs md:text-lg !font-[AveriaSerifLibre-Bold] text-[#858585]"
                style={gradientTextStyle}
              >
                MINT YOUR DREAMRUNNER
              </h2>

              <div className="relative">
                <img
                  src={IMAGES.dreamrunnerpfp.share}
                  alt="Confirm"
                  className="w-[400px] md:w-[500px] h-auto"
                />
                <div className="absolute inset-0 flex justify-center items-center gap-20 -translate-y-1">
                  <button
                    onClick={() => handleMint(confirmedImage)}
                    disabled={isMinting}
                  >
                    <img
                      src={IMAGES.dreamrunnerpfp.confirm}
                      alt="Confirm"
                      className={`${buttonClasses} ${
                        isMinting ? "opacity-50" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case MINT_PHASES.SHARE_RUNNER:
        return (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-4 mt-[80px] md:mt-[120px]">
            <div
              className="relative w-[200px] md:w-[250px] h-auto"
              style={{
                filter:
                  "drop-shadow(0 4px 6px rgba(0,0,0,0.9)) drop-shadow(0 1px 3px rgba(0,0,0,0.9))",
              }}
            >
              <div className="relative">
                <Picture
                  sources={IMAGES.dreamrunnerpfp.loading}
                  alt="Loading Frame"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  {confirmedImage && (
                    <img
                      src={confirmedImage.image}
                      alt="Selected Dreamrunner"
                      className="w-[93%] h-[93%] object-contain"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2
                className="text-xs md:text-lg !font-[AveriaSerifLibre-Bold] text-[#858585]"
                style={gradientTextStyle}
              >
                UNLOCK YOUR WL
              </h2>

              {[1, 3].map((id) => (
                <div
                  key={id}
                  className="relative w-[400px] md:w-[500px] h-[60px]"
                >
                  {id === 1 && (
                    <>
                      <img
                        src={IMAGES.dreamrunnerpfp.share}
                        alt="Share Input"
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute top-[28%] left-[3%] w-[67%] px-4 text-[#fcdfc5] !font-[AveriaSerifLibre]"
                        style={gradientTextStyle}
                      >
                        SHARE YOUR CREATION ON X
                      </div>
                      <button
                        onClick={handleShare}
                        className="absolute right-[3%] top-1/2 -translate-y-[55%]"
                      >
                        <img
                          src={IMAGES.dreamrunnerpfp.sharebutton}
                          alt="Share"
                          className={buttonClasses}
                        />
                      </button>
                    </>
                  )}
                  {id === 3 && (
                    <>
                      <img
                        src={IMAGES.dreamrunnerpfp.share}
                        alt="Confirm Input"
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute top-[28%] left-[3%] w-[67%] px-4 text-[#fcdfc5] !font-[AveriaSerifLibre]"
                        style={gradientTextStyle}
                      >
                        CONFIRM YOUR WHITELIST
                      </div>
                      <button
                        onClick={nextPhase}
                        className="absolute right-[3%] top-1/2 -translate-y-[55%]"
                      >
                        <img
                          src={IMAGES.dreamrunnerpfp.confirm}
                          alt="Confirm"
                          className={buttonClasses}
                        />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case MINT_PHASES.WHITELIST_SECURED:
        return (
          <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden mt-[40px] md:mt-[60px]">
            <div
              className="text-center z-2 text-3xl !font-[AveriaSerifLibre-Bold] -mt-20"
              style={{
                background:
                  "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter:
                  "drop-shadow(0 6px 8px rgba(0,0,0,0.95)) drop-shadow(0 2px 4px rgba(0,0,0,0.9))",
                textShadow: "3px 3px 6px rgba(0,0,0,0.7)",
              }}
            >
              WHITELIST SECURED
            </div>

            <div
              className="relative cursor-pointer mt-8"
              onClick={() => {
                resetState();
                setCurrentPhase(MINT_PHASES.LOADING);
                setPromptText("");
                setSelectedRunner(null);
                setConfirmedImage(null);
              }}
            >
              <img src={IMAGES.buttons.blank} alt="" className="h-8 w-auto" />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#858585] font-averia text-xs w-full text-center">
                MINT AGAIN
              </span>
            </div>
          </div>
        );
      case MINT_PHASES.LOADING_WITH_FLAMES:
        return (
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-[80px] md:mt-[120px]">
              {/* Mobile Navigation */}
              {generatedImages && generatedImages.length > 0 && (
                <div className="flex items-center justify-between w-full md:hidden px-4">
                  <button
                    onClick={prevImage}
                    className="text-[#fcdfc5] text-4xl opacity-80 hover:opacity-100 transition-opacity absolute left-4 top-1/2 -translate-y-1/2 z-10"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="text-[#fcdfc5] text-4xl opacity-80 hover:opacity-100 transition-opacity absolute right-4 top-1/2 -translate-y-1/2 z-10"
                  >
                    →
                  </button>
                </div>
              )}

              {[0, 1, 2].map((id) => (
                <div
                  key={id}
                  className={`relative w-[300px] md:w-[250px] h-auto ${
                    id !== currentImageIndex ? "hidden md:block" : ""
                  }`}
                  style={{
                    filter:
                      "drop-shadow(0 4px 6px rgba(0,0,0,0.9)) drop-shadow(0 1px 3px rgba(0,0,0,0.9))",
                  }}
                >
                  <div className="relative">
                    <Picture
                      sources={IMAGES.dreamrunnerpfp.loading}
                      alt="Loading Frame"
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="w-[85%] h-[85%] object-cover"
                        onError={(e) => {
                          console.error("Video failed to load:", e);
                          // Retry loading
                          e.target.load();
                        }}
                      >
                        <source src={VIDEOS.flame} type="video/mp4" />
                        {/* Fallback for browsers that don't support MP4 */}
                        <source
                          src={VIDEOS.flame.replace(".mp4", ".webm")}
                          type="video/webm"
                        />
                        {/* Fallback content */}
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <span className="text-white">Loading...</span>
                        </div>
                      </video>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2
              className="text-4xl !font-[AveriaSerifLibre-Bold] flex items-center"
              style={{
                background:
                  "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter:
                  "drop-shadow(0 4px 6px rgba(0,0,0,0.9)) drop-shadow(0 1px 3px rgba(0,0,0,0.9))",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              LOADING
              <span className="loading-dots"></span>
            </h2>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 overflow-x-hidden relative bg-[#3B3F3F]">
      {/* Digital video overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            background: "transparent",
            mixBlendMode: "soft-light",
            filter: "brightness(1.2) contrast(1.1)",
            opacity: "0.2",
          }}
        >
          <source src={VIDEOS.digital} type="video/webm" />
        </video>
      </div>

      <div className="absolute top-4 right-4 z-50">
        <div className="relative cursor-pointer" onClick={handleConnect}>
          <img src={IMAGES.buttons.blank} alt="" className="h-8 w-auto" />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#858585] font-averia text-xs w-full text-center">
            {isConnected ? "Connected" : "Connect Wallet"}
          </span>
        </div>
      </div>

      {/* Background texture and glow */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${IMAGES.textures.main.preview})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: textureLoaded ? 0 : 1,
          }}
        />
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${IMAGES.textures.main.original})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: textureLoaded ? 1 : 0,
          }}
        />
        {/* Preload texture */}
        <img
          src={IMAGES.textures.main.original}
          alt=""
          style={{ display: "none" }}
          onLoad={() => setTextureLoaded(true)}
        />

        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${IMAGES.textures.glow.original})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: currentPhase === MINT_PHASES.WHITELIST_SECURED ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>

      {/* Background elements - With progressive loading */}
      <div className="absolute left-1/2 top-[15%] md:top-[5%] -translate-x-1/2 z-10 flex flex-col items-center w-full">
        <img
          src={IMAGES.dreamrunnerpfp.createFlair}
          alt="Create Flair"
          className="w-full max-w-[500px] h-auto px-4"
          style={{
            display:
              currentPhase === MINT_PHASES.WHITELIST_SECURED ? "none" : "block",
          }}
        />
        <div className="relative w-full max-w-[500px]">
          <img
            src={IMAGES.bg.dreamrunnerLogo.preview}
            alt="Dreamrunner Logo Preview"
            className={`w-full h-auto px-4 transition-opacity duration-300 ${
              logoLoaded ? "opacity-0" : "opacity-100"
            }`}
            style={{
              transform:
                currentPhase === MINT_PHASES.WHITELIST_SECURED
                  ? "translateY(115px)"
                  : "none",
            }}
          />
          <img
            src={IMAGES.bg.dreamrunnerLogo.original}
            alt="Dreamrunner Logo"
            className={`w-full h-auto px-4 absolute top-0 left-0 transition-opacity duration-300 ${
              logoLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform:
                currentPhase === MINT_PHASES.WHITELIST_SECURED
                  ? "translateY(115px)"
                  : "none",
            }}
            onLoad={() => setLogoLoaded(true)}
          />
        </div>
      </div>

      {/* Dreamrunner background - With progressive loading */}
      <div className="absolute inset-0 top-[0%] z-0 min-h-screen overflow-visible">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${IMAGES.bg.dreamrunnerBg.preview})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            opacity: bgLoaded ? 0 : 1,
            transform:
              currentPhase === MINT_PHASES.WHITELIST_SECURED
                ? "scale(0.4) translateY(-75%)"
                : "scale(0.75)",
            transformOrigin: "center center",
            transition: "opacity 0.3s ease",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${IMAGES.bg.dreamrunnerBg.original})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            opacity: bgLoaded ? 1 : 0,
            transform:
              currentPhase === MINT_PHASES.WHITELIST_SECURED
                ? "scale(0.4) translateY(-75%)"
                : "scale(0.75)",
            transformOrigin: "center center",
            transition: isInitialLoad ? "opacity 0.3s ease" : "all 0.3s ease",
          }}
        />
        {/* Preload bg */}
        <img
          src={IMAGES.bg.dreamrunnerBg.original}
          alt=""
          style={{ display: "none" }}
          onLoad={() => setBgLoaded(true)}
        />
      </div>

      {/* Debug Navigation Arrows */}
      <div className="fixed inset-y-0 left-4 flex items-center z-50">
        <button
          onClick={prevPhase}
          className="text-[#fcdfc5] text-2xl opacity-30 hover:opacity-80 transition-opacity"
          style={{
            background:
              "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
          }}
        >
          ←
        </button>
      </div>
      <div className="fixed inset-y-0 right-4 flex items-center z-50">
        <button
          onClick={nextPhase}
          className="text-[#fcdfc5] text-2xl opacity-30 hover:opacity-80 transition-opacity"
          style={{
            background:
              "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
          }}
        >
          →
        </button>
      </div>

      {/* Phase Content */}
      <div className="flex-1 flex items-center justify-center z-10">
        {renderPhaseContent()}
      </div>

      {/* Footer - Adjusted margin */}
      <div className="fixed bottom-0 left-0 right-0 w-full text-center z-10 mb-4 px-4">
        <Link
          to="/mint"
          className="text-[#fcdfc5] !font-[AveriaSerifLibre] text-xs md:text-sm hover:text-[#858585] transition-colors"
          style={{
            background:
              "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
          }}
        >
          &lt; RETURN TO MINT SELECTION
        </Link>
      </div>
    </div>
  );
};

export default PFPMint;
