import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import texture from "../../../assets/images/textures/Texture.png";
import dreamrunnerimg from "../../../assets/images/bg/dreamrunnerbg.png";
import dreamrunnerlogo from "../../../assets/images/bg/dreamrunnerlogo.png";
import loadingImg from "../../../assets/images/dreamrunnerpfp/loading.png";
import promptImg from "../../../assets/images/dreamrunnerpfp/promptnobutton.png";
import createFlairImg from "../../../assets/images/dreamrunnerpfp/createflair.png";
import generateBtn from "../../../assets/images/dreamrunnerpfp/generate.png";
import confirmBtn from "../../../assets/images/dreamrunnerpfp/confirm.png";
import nameTextbox from "../../../assets/images/dreamrunnerpfp/nametextbox.png";
import shareButton from "../../../assets/images/dreamrunnerpfp/sharebutton.png";
import shareImg from "../../../assets/images/dreamrunnerpfp/share.png";
import flameVideo from "../../../assets/videos/flame.mp4";
import digitalVideo from "../../../assets/videos/digital.webm";
// import digVideo from "../../../assets/videos/dig.mp4";
import usePFPMint from "../../../hooks/usePFPMint";
import placeholder1 from "../../../assets/images/dreamrunnerpfp/placeholder1.png";
import placeholder2 from "../../../assets/images/dreamrunnerpfp/placeholder2.png";
import placeholder3 from "../../../assets/images/dreamrunnerpfp/placeholder3.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect } from "wagmi";
import connectDream from "../../../assets/images/buttons/connectwallet.png";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { toast } from "react-hot-toast";

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
console.log("Flame video path:", flameVideo);
console.log("Digital video path:", digitalVideo);

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
  } = usePFPMint();
  const [currentPhase, setCurrentPhase] = useState(MINT_PHASES.LOADING);
  const [promptText, setPromptText] = useState("");
  const [selectedRunner, setSelectedRunner] = useState(null);
  const [confirmedImage, setConfirmedImage] = useState(null);
  const [runnerName, setRunnerName] = useState("");
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

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

  const handleGenerate = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    if (!promptText.trim()) return;
    console.log("🎨 Starting generation with prompt:", promptText);
    setCurrentPhase(MINT_PHASES.LOADING_WITH_FLAMES);
    await generateImages(promptText);
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
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      toast.loading("Please confirm the transaction in your wallet...", {
        id: "mint",
      });
      await mintDreamrunner(imageData);
      toast.success("Successfully minted your Dreamrunner!", { id: "mint" });
      nextPhase();
    } catch (err) {
      console.error("Mint error:", err);
      toast.error("Failed to mint. Please try again.", { id: "mint" });
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
    "h-12 w-auto transition-all duration-300 hover:scale-105 hover:filter hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]";

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
    console.log("🔗 Available connectors:", connectors);

    if (isConnected) {
      openAccountModal?.();
    } else {
      openConnectModal?.();
    }
  };

  // Render current phase content
  const renderPhaseContent = () => {
    const images = Array.isArray(generatedImages) ? generatedImages : [];

    switch (currentPhase) {
      case MINT_PHASES.LOADING:
        return (
          <div className="flex flex-col items-center gap-8">
            <div className="flex justify-center items-center gap-8 mt-[250px]">
              {[0, 1, 2].map((id) => (
                <div
                  key={id}
                  className="relative w-[200px] md:w-[250px] h-auto"
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
                    <img
                      src={loadingImg}
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
                            src={[placeholder1, placeholder2, placeholder3][id]}
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
                              className="w-[85%] h-[85%] object-cover"
                            >
                              <source src={flameVideo} type="video/mp4" />
                            </video>
                          )}
                        </>
                      )}
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
              DISCOVER YOUR LEGACY
            </h2>

            <div className="relative">
              <img
                src={promptImg}
                alt="Prompt"
                className="w-[400px] md:w-[500px] h-auto"
              />
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Enter your dream prompt..."
                className="absolute top-[10%] left-[3%] w-[67%] h-[80%] px-4 py-2 text-[#fcdfc5] placeholder-[#858585] !font-[AveriaSerifLibre] resize-none bg-transparent border-none outline-none"
              />
              <div className="absolute right-[3%] top-1/2 -translate-y-1/2">
                <button onClick={handleGenerate} disabled={isLoading}>
                  <img
                    src={generateBtn}
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
            <div className="flex justify-center items-center gap-8 mt-[250px]">
              {[0, 1, 2].map((id) => (
                <div
                  key={id}
                  className="relative w-[200px] md:w-[250px] h-auto"
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
                    <img
                      src={loadingImg}
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

            <div className="relative">
              <img
                src={shareImg}
                alt="Prompt"
                className="w-[400px] md:w-[500px] h-auto"
              />
              <div className="absolute inset-0 flex justify-center items-center gap-20 -translate-y-1">
                <button
                  onClick={() => {
                    setCurrentPhase(MINT_PHASES.LOADING);
                    clearImages();
                    setPromptText("");
                    setSelectedRunner(null);
                    setConfirmedImage(null);
                  }}
                >
                  <img
                    src={generateBtn}
                    alt="Generate"
                    className={buttonClasses}
                  />
                </button>
                {selectedRunner !== null && (
                  <button onClick={handleConfirm}>
                    <img
                      src={confirmBtn}
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
          <div className="flex flex-col items-center gap-8">
            <div className="flex justify-center items-center mt-[250px] relative z-[2]">
              <div
                className="relative w-[200px] md:w-[250px] h-auto"
                style={{
                  filter:
                    "drop-shadow(0 4px 6px rgba(0,0,0,0.9)) drop-shadow(0 1px 3px rgba(0,0,0,0.9))",
                }}
              >
                <div className="relative">
                  <img
                    src={loadingImg}
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

            <h2
              className="text-xs md:text-lg !font-[AveriaSerifLibre-Bold] text-[#858585]"
              style={gradientTextStyle}
            >
              MINT YOUR DREAMRUNNER
            </h2>

            <div className="relative">
              <img
                src={shareImg}
                alt="Confirm"
                className="w-[400px] md:w-[500px] h-auto"
              />
              <div className="absolute inset-0 flex justify-center items-center gap-20 -translate-y-1">
                <button
                  onClick={() => handleMint(confirmedImage)}
                  disabled={isMinting}
                >
                  <img
                    src={confirmBtn}
                    alt="Confirm"
                    className={`${buttonClasses} ${
                      isMinting ? "opacity-50" : ""
                    }`}
                  />
                </button>
                {error && <div className="text-red-500">{error}</div>}
              </div>
            </div>
          </div>
        );
      case MINT_PHASES.SHARE_RUNNER:
        return (
          <div className="flex flex-col items-center gap-8">
            <div className="flex justify-center items-center gap-8 mt-[250px]">
              <div
                className="relative w-[200px] md:w-[250px] h-auto"
                style={{
                  filter:
                    "drop-shadow(0 4px 6px rgba(0,0,0,0.9)) drop-shadow(0 1px 3px rgba(0,0,0,0.9))",
                }}
              >
                <div className="relative">
                  <img
                    src={loadingImg}
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
                          src={shareImg}
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
                            src={shareButton}
                            alt="Share"
                            className={buttonClasses}
                          />
                        </button>
                      </>
                    )}
                    {id === 3 && (
                      <>
                        <img
                          src={shareImg}
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
                            src={confirmBtn}
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
          </div>
        );
      case MINT_PHASES.WHITELIST_SECURED:
        return (
          <div className="text-white text-center">Whitelist Secured Phase</div>
        );
      case MINT_PHASES.LOADING_WITH_FLAMES:
        return (
          <div className="flex flex-col items-center gap-8">
            <div className="flex justify-center items-center gap-8 mt-[250px]">
              {[0, 1, 2].map((id) => (
                <div
                  key={id}
                  className="relative w-[200px] md:w-[250px] h-auto"
                  style={{
                    filter:
                      "drop-shadow(0 4px 6px rgba(0,0,0,0.9)) drop-shadow(0 1px 3px rgba(0,0,0,0.9))",
                  }}
                >
                  <div className="relative">
                    <img
                      src={loadingImg}
                      alt="Loading Frame"
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-[85%] h-[85%] object-cover"
                      >
                        <source src={flameVideo} type="video/mp4" />
                      </video>
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
              LOADING
            </h2>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col p-4 min-w-[500px] overflow-visible relative bg-[#3B3F3F]">
      {/* Digital video overlay - now global */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            background: "transparent",
            mixBlendMode: "screen",
            filter: "brightness(1.5) contrast(1.2)",
            opacity: "0.3", // Reduced opacity
          }}
        >
          <source src={digitalVideo} type="video/webm" />
        </video>
      </div>

      <div className="absolute top-4 right-4 z-50">
        <div className="relative cursor-pointer" onClick={handleConnect}>
          <img src={connectDream} alt="Connect Wallet" className="h-8 w-auto" />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#858585] font-averia text-xs w-full text-center">
            {isConnected ? "Connected" : "Connect Wallet"}
          </span>
        </div>
      </div>

      {/* Background texture */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${texture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[2]">
        {/* Background elements */}
        <div className="absolute left-1/2 top-[5%] -translate-x-1/2 z-10 flex flex-col items-center min-w-[500px]">
          <img
            src={createFlairImg}
            alt="Create Flair"
            className="w-[500px] h-auto"
          />
          <img
            src={dreamrunnerlogo}
            alt="Dreamrunner Logo"
            className="w-[500px] h-auto"
          />
        </div>

        <div
          className="absolute inset-0 top-[0%] z-0 min-w-[500px] min-h-screen overflow-visible"
          style={{
            backgroundImage: `url(${dreamrunnerimg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            opacity: 1,
            mixBlendMode: "normal",
            transform: "scale(0.75)",
            transformOrigin: "center center",
          }}
        />

        {/* Debug Navigation Arrows */}
        <div className="fixed inset-y-0 left-4 flex items-center z-50">
          <button
            onClick={prevPhase}
            className="text-white text-4xl opacity-50 hover:opacity-100"
          >
            ←
          </button>
        </div>
        <div className="fixed inset-y-0 right-4 flex items-center z-50">
          <button
            onClick={nextPhase}
            className="text-white text-4xl opacity-50 hover:opacity-100"
          >
            →
          </button>
        </div>

        {/* Phase Content */}
        <div className="flex-1 flex items-center justify-center z-10">
          {renderPhaseContent()}
        </div>

        {/* Footer */}
        <div className="mt-auto w-full text-center z-10">
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

      {/* Commented out dig video overlay */}
      {/* <div className="absolute inset-0 z-[2]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover mix-blend-screen"
        >
          <source src={digVideo} type="video/mp4" />
        </video>
      </div> */}
    </div>
  );
};

export default PFPMint;
