import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { S3_BASE_URL } from "../../../config/constants";
import ReactGA from "react-ga4";
import { useMint } from "./useMint";
import { TIER_DATA } from "./tierData"; // Add this import

// Define all image URLs as constants
const connectDream = `${S3_BASE_URL}/images/buttons/connectwallet.png`;
const connectDreamActive = `${S3_BASE_URL}/images/buttons/connectwallet.png`;
const texture = `${S3_BASE_URL}/images/textures/Texture.png`;
const twitterButton = `${S3_BASE_URL}/images/buttons/twitterbutton.png`;
const whitepaperButton = `${S3_BASE_URL}/images/buttons/whitepaperbutton.png`;
const discordButton = `${S3_BASE_URL}/images/buttons/discordbutton.png`;
const titleDecor = `${S3_BASE_URL}/images/buttons/titledecor.png`;
const commonTextbox = `${S3_BASE_URL}/images/textboxes/commonbox.png`;
const uncommonTextbox = `${S3_BASE_URL}/images/textboxes/uncommonbox.png`;
const rareTextbox = `${S3_BASE_URL}/images/textboxes/rarebox.png`;
const epicTextbox = `${S3_BASE_URL}/images/textboxes/epicbox.png`;
const legendaryTextbox = `${S3_BASE_URL}/images/textboxes/legendarybox.png`;
const onericTextbox = `${S3_BASE_URL}/images/textboxes/oneiricbox.png`;
const magicCircle = `${S3_BASE_URL}/images/textboxes/magiccircle.png`;
const buyNowDisabled = `${S3_BASE_URL}/images/buttons/buynowdisabled.png`;
const buyNow = `${S3_BASE_URL}/images/buttons/buynow.png`;
const commonGif = `${S3_BASE_URL}/images/tiers/optimized/Lair Common.gif`;
const uncommonGif = `${S3_BASE_URL}/images/tiers/optimized/Lair Uncommon.gif`;
const rareGif = `${S3_BASE_URL}/images/tiers/optimized/Lair Rare.gif`;
const epicGif = `${S3_BASE_URL}/images/tiers/optimized/Lair Epic.gif`;
const legendaryGif = `${S3_BASE_URL}/images/tiers/optimized/Lair Legendary.gif`;
const onericGif = `${S3_BASE_URL}/images/tiers/optimized/Lair Oneiric.gif`;
const commonStatic = `${S3_BASE_URL}/images/tiers/static/Lair Common_static.png`;
const uncommonStatic = `${S3_BASE_URL}/images/tiers/static/Lair Uncommon_static.png`;
const rareStatic = `${S3_BASE_URL}/images/tiers/static/Lair Rare_static.png`;
const epicStatic = `${S3_BASE_URL}/images/tiers/static/Lair Epic_static.png`;
const legendaryStatic = `${S3_BASE_URL}/images/tiers/static/Lair Legendary_static.png`;
const onericStatic = `${S3_BASE_URL}/images/tiers/static/Lair Oneiric_static.png`;
const cellBackground = `${S3_BASE_URL}/images/buttons/cellbackground.png`;
const cellOverlay = `${S3_BASE_URL}/images/buttons/celloverlay.png`;
const successBg = `${S3_BASE_URL}/images/success/bg.png`;

const TieredMint = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const [entropy] = useState(Math.floor(Math.random() * 1000000));
  const [expires] = useState(Math.floor(Date.now() / 1000) + 60 * 60);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [utmCampaign, setUtmCampaign] = useState(null);
  const [selectedCell, setSelectedCell] = useState(0);
  const [isBuyEnabled, setIsBuyEnabled] = useState(false);
  const { mint, isMinting } = useMint();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const campaign = urlParams.get("utm_campaign");
    if (campaign) {
      setUtmCampaign(campaign);
      console.log("Campaign detected:", campaign);
    }
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      const eventData = {
        category: "Wallet",
        action: "Connect",
        label: "Wallet Connected",
        value: 1,
        wallet_address: address,
        utm_campaign: utmCampaign || "direct",
      };
      ReactGA.event(eventData);
    }
  }, [isConnected, address, utmCampaign]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          setSelectedCell((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "ArrowRight":
          setSelectedCell((prev) => (prev < 5 ? prev + 1 : prev));
          break;
        case "ArrowUp":
          setSelectedCell((prev) => (prev >= 3 ? prev - 3 : prev));
          break;
        case "ArrowDown":
          setSelectedCell((prev) => (prev < 3 ? prev + 3 : prev));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMint = async () => {
    try {
      if (!isConnected) {
        alert("Please connect your wallet first");
        return;
      }

      const tx = await mint(selectedCell);
      console.log("Transaction initiated:", tx);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error in mint button:", error);
      alert(`Failed to mint: ${error.message || "Unknown error"}`);
    }
  };

  if (showSuccess) {
    const gifMap = [
      commonGif,
      uncommonGif,
      rareGif,
      epicGif,
      legendaryGif,
      onericGif,
    ];

    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-between py-8"
        style={{
          backgroundImage: `url(${successBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-8 left-8">
          <button onClick={() => setShowSuccess(false)} className="relative">
            <img src={connectDream} alt="Back" className="h-8 w-auto" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#858585] !font-[AveriaSerifLibre] text-sm w-full text-center">
              Back
            </span>
          </button>
        </div>

        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4">
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <h1
              className="text-3xl md:text-4xl mb-2 !font-[AveriaSerifLibre-Regular] uppercase max-w-[90%] md:max-w-full mx-auto tracking-wide"
              style={{
                background:
                  "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter:
                  "drop-shadow(0 4px 6px rgba(0,0,0,0.9)) drop-shadow(0 6px 8px rgba(0,0,0,0.4))",
              }}
            >
              DREAM LAIR ACQUIRED
            </h1>
            <img
              src={titleDecor}
              alt="Title Decoration"
              className="w-48 mb-6"
            />

            <div className="relative w-[200px] h-[200px] mb-2">
              <div className="absolute inset-0 border-4 border-white/10"></div>
              <img
                src={gifMap[selectedCell]}
                alt="Minted NFT"
                className="w-full h-full object-contain"
              />
            </div>

            <h2
              className="text-lg mb-2 !font-[AveriaSerifLibre-Regular] uppercase"
              style={{
                background:
                  "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter:
                  "drop-shadow(0 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 3px 6px rgba(0,0,0,0.4))",
              }}
            >
              DREAM LAIR #9999
            </h2>

            <button
              onClick={() => window.open("#", "_blank")}
              className="mb-8 text-xs !font-[AveriaSerifLibre-Regular] uppercase underline decoration-gray-500/50 text-gray-500 hover:text-gray-400 transition-colors italic"
              style={{
                filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
              }}
            >
              VIEW TX
            </button>

            <div className="flex flex-col items-center mb-4">
              <p
                className="text-xl mb-4 !font-[AveriaSerifLibre-Regular] uppercase max-w-[90%] md:max-w-full mx-auto"
                style={{
                  background:
                    "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.9))",
                }}
              >
                Show off your Dream Lair on X for 7 years of good luck!
              </p>

              <button
                onClick={() =>
                  window.open(
                    "https://x.com/intent/tweet?text=Just%20minted%20my%20Dream%20Lair%20@dreamrunnergg%20🏰✨",
                    "_blank"
                  )
                }
                className="relative"
              >
                <img
                  src={connectDream}
                  alt="Share"
                  className="h-8 md:h-8 w-auto"
                />
                <span
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !font-[AveriaSerifLibre-Bold] text-xs md:text-sm uppercase w-full text-center whitespace-nowrap"
                  style={{
                    background:
                      "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
                  }}
                >
                  SHARE
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4 min-w-[320px] max-w-[100vw] overflow-x-hidden">
      <div className="md:absolute top-[15%] left-1/2 md:-translate-x-1/2 flex flex-col items-center">
        <h1 className="text-[#858585] mb-2 font-averia italic !font-[AveriaSerifLibre] text-lg md:text-xl text-center">
          Your Dream Lair Awaits
        </h1>
        <img src={titleDecor} alt="Title Decoration" className="mb-8 w-32" />
      </div>

      <div className="md:absolute top-[22%] md:top-[30%] left-1/2 md:-translate-x-1/2 w-full">
        <div className="flex flex-col md:flex-row md:items-start md:justify-center md:gap-8">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-[25px] lg:gap-[25px] w-fit mx-auto">
            {["Common", "Uncommon", "Rare", "Epic", "Legendary", "Oneiric"].map(
              (label, index) => {
                const gifMap = [
                  `${S3_BASE_URL}/images/tiers/optimized/Lair Common.gif`,
                  `${S3_BASE_URL}/images/tiers/optimized/Lair Uncommon.gif`,
                  `${S3_BASE_URL}/images/tiers/optimized/Lair Rare.gif`,
                  `${S3_BASE_URL}/images/tiers/optimized/Lair Epic.gif`,
                  `${S3_BASE_URL}/images/tiers/optimized/Lair Legendary.gif`,
                  `${S3_BASE_URL}/images/tiers/optimized/Lair Oneiric.gif`,
                ];
                const staticMap = [
                  `${S3_BASE_URL}/images/tiers/static/Lair Common_static.png`,
                  `${S3_BASE_URL}/images/tiers/static/Lair Uncommon_static.png`,
                  `${S3_BASE_URL}/images/tiers/static/Lair Rare_static.png`,
                  `${S3_BASE_URL}/images/tiers/static/Lair Epic_static.png`,
                  `${S3_BASE_URL}/images/tiers/static/Lair Legendary_static.png`,
                  `${S3_BASE_URL}/images/tiers/static/Lair Oneiric_static.png`,
                ];

                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center gap-2 transition-all duration-200 w-[85px] md:w-[85px] lg:w-[115px] ${
                      selectedCell === index
                        ? "scale-125 md:scale-115 lg:scale-125"
                        : ""
                    }`}
                    onClick={() => setSelectedCell(index)}
                  >
                    <div className="relative">
                      <img
                        src={cellBackground}
                        alt="Cell Background"
                        className="w-[85px] h-[85px] md:w-[85px] md:h-[85px] lg:w-[115px] lg:h-[115px] object-contain cursor-pointer transform-gpu drop-shadow-[0_0_15px_rgba(0,0,0,0.7)]"
                      />
                      <img
                        src={
                          selectedCell === index
                            ? gifMap[index]
                            : staticMap[index]
                        }
                        alt={`${label} Animation`}
                        className="absolute top-0 left-0 w-[85px] h-[85px] md:w-[85px] md:h-[85px] lg:w-[115px] lg:h-[115px] object-contain"
                        style={{
                          pointerEvents: "none",
                          WebkitTransform: "translate3d(0,0,0)",
                          transform: "translate3d(0,0,0)",
                          WebkitBackfaceVisibility: "hidden",
                          backfaceVisibility: "hidden",
                        }}
                      />
                      <img
                        src={cellOverlay}
                        alt="Cell Overlay"
                        className="absolute top-0 left-0 w-[85px] h-[85px] md:w-[85px] md:h-[85px] lg:w-[115px] lg:h-[115px] object-contain"
                        style={{ pointerEvents: "none" }}
                      />
                    </div>
                    <span
                      className="text-[#fcdfc5] !font-[AveriaSerifLibre] text-sm md:text-sm lg:text-lg"
                      style={{
                        background:
                          "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                );
              }
            )}
          </div>

          <div className="mt-12 md:mt-4 md:absolute md:top-[130%] md:left-1/2 md:-translate-x-1/2 md:w-full">
            {selectedCell !== null && (
              <div className="flex items-center justify-center w-full px-2 md:px-4">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
                  <div
                    className="relative w-[500px] origin-top
                    scale-[0.7]  // mobile
                    md:scale-[0.85]  // medium screens 
                    xl:scale-100" // extra large screens
                  >
                    <img
                      src={
                        [
                          commonTextbox,
                          uncommonTextbox,
                          rareTextbox,
                          epicTextbox,
                          legendaryTextbox,
                          onericTextbox,
                        ][selectedCell]
                      }
                      alt="Tier Description"
                      className="w-full object-contain drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                    />
                    <div className="absolute inset-0 flex flex-col p-6 pt-2">
                      <h2
                        className="text-xl md:text-2xl mb-8 !font-[AveriaSerifLibre]"
                        style={{
                          background:
                            "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.9))",
                        }}
                      >
                        {Object.keys(TIER_DATA)[selectedCell]} [$
                        {TIER_DATA[Object.keys(TIER_DATA)[selectedCell]].price}]
                      </h2>
                      <div className="flex justify-center gap-8">
                        <ul className="space-y-1 !font-[AveriaSerifLibre] font-bold leading-[1.2] -ml-4 w-[180px]">
                          <li
                            className="!font-[AveriaSerifLibre] text-[16px] md:text-[18px] mb-1"
                            style={{
                              background:
                                "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.9))",
                            }}
                          >
                            Includes:
                          </li>
                          <li
                            style={{ color: "#d4b69c" }}
                            className="text-[14px] md:text-[14px] flex justify-between"
                          >
                            <span>Airdrop Multiplier:</span>
                            <span>
                              {
                                TIER_DATA[Object.keys(TIER_DATA)[selectedCell]]
                                  .multiplier
                              }
                            </span>
                          </li>
                          <li
                            style={{ color: "#d4b69c" }}
                            className="text-[14px] md:text-[14px] flex justify-between"
                          >
                            <span>Monthly $Dream Emissions:</span>
                            <span>
                              {
                                TIER_DATA[Object.keys(TIER_DATA)[selectedCell]]
                                  .monthlyEmissions
                              }
                            </span>
                          </li>
                          <li
                            style={{ color: "#d4b69c" }}
                            className="text-[14px] md:text-[14px] flex justify-between"
                          >
                            <span>Total $Dream:</span>
                            <span>
                              {
                                TIER_DATA[Object.keys(TIER_DATA)[selectedCell]]
                                  .totalEmissions
                              }
                            </span>
                          </li>
                        </ul>

                        <ul className="space-y-1 !font-[AveriaSerifLibre] font-bold leading-[1.2] w-[180px]">
                          <li
                            className="!font-[AveriaSerifLibre] text-[14px] md:text-[16px] mb-1"
                            style={{
                              background:
                                "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.9))",
                            }}
                          >
                            Break Even Dates:
                          </li>
                          <li
                            style={{ color: "#d4b69c" }}
                            className="text-[14px] md:text-[14px] flex justify-between"
                          >
                            <span>(25m FDV):</span>
                            <span>
                              {
                                TIER_DATA[Object.keys(TIER_DATA)[selectedCell]]
                                  .breakEven.fdv25m
                              }{" "}
                              months
                            </span>
                          </li>
                          <li
                            style={{ color: "#d4b69c" }}
                            className="text-[14px] md:text-[14px] flex justify-between"
                          >
                            <span>(50m FDV):</span>
                            <span>
                              {
                                TIER_DATA[Object.keys(TIER_DATA)[selectedCell]]
                                  .breakEven.fdv50m
                              }{" "}
                              months
                            </span>
                          </li>
                          <li
                            style={{ color: "#d4b69c" }}
                            className="text-[14px] md:text-[14px] flex justify-between"
                          >
                            <span>(100m FDV):</span>
                            <span>
                              {
                                TIER_DATA[Object.keys(TIER_DATA)[selectedCell]]
                                  .breakEven.fdv100m
                              }{" "}
                              months
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div
                    className="relative -mt-12 md:-mt-8 md:mt-0 
                    scale-[1.1] 
                    sm:scale-[1.1] 
                    md:scale-[0.85] 
                    xl:scale-100
                    transform-gpu
                    mb-8"
                  >
                    <img
                      src={magicCircle}
                      alt="Magic Circle"
                      className="w-[180px] object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.7)]"
                    />
                    <button
                      onClick={handleMint}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      disabled={isMinting || !isConnected}
                    >
                      <img
                        src={connectDream}
                        alt="Mint"
                        className="w-44 md:w-32 object-contain"
                      />
                      <span
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#858585] font-averia italic !font-[AveriaSerifLibre] text-base md:text-xl w-full text-center"
                        style={{
                          background:
                            "linear-gradient(180deg, #858585 0%, #4a4a4a 50%, #858585 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
                        }}
                      >
                        {isMinting ? "Minting..." : "Mint"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isAuthenticated && (
        <div className="text-[#4CAF50] font-averia italic !font-[AveriaSerifLibre] text-center">
          Thanks, you have been added to our list ✓
        </div>
      )}

      <div className="mt-auto w-full text-center">
        <a
          href="/mint"
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
        </a>
        <span
          className="text-[#fcdfc5] !font-[AveriaSerifLibre] text-xs md:text-sm"
          style={{
            background:
              "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
          }}
        >
          {" | "}
        </span>
        <span
          className="text-[#fcdfc5] !font-[AveriaSerifLibre] text-xs md:text-sm opacity-50"
          style={{
            background:
              "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
          }}
        >
          ALTERNATE MINT PAGE &gt;
        </span>
      </div>
    </div>
  );
};

export default TieredMint;
