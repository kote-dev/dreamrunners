import React, { useState } from "react";
import texture from "../../../assets/images/textures/Texture.png";
import connectDream from "../../../assets/images/buttons/connectwallet.png";
import connectDreamActive from "../../../assets/images/buttons/connectwallet.png";
import twitterButton from "../../../assets/images/buttons/twitterbutton.png";
import whitepaperButton from "../../../assets/images/buttons/whitepaperbutton.png";
import discordButton from "../../../assets/images/buttons/discordbutton.png";
import mintChoiceBG from "../../../assets/images/bg/mintchoiceBGoptimized.png";
import mintInfoBg from "../../../assets/images/bg/mintinfobgoptimized.png";
import flameIcon from "../../../assets/images/fire.png";
import skullIcon from "../../../assets/images/skull.png";
import leftFlair from "../../../assets/images/leftflair.png";
import rightFlair from "../../../assets/images/rightflair.png";
import tieredImg from "../../../assets/images/tieredimg.png";
import gachaImg from "../../../assets/images/gachaimg.png";
import PFPMint from "./PFPMint";
import { useNavigate } from "react-router-dom";

const DreamLairMint = () => {
  const [selectedMintType, setSelectedMintType] = useState(null);
  const [showPFPMint, setShowPFPMint] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    setSelectedMintType(null);
  };

  const handleMintSelection = (type) => {
    switch (type) {
      case "pfp":
        navigate("/mint/dreamrunner");
        break;
    }
  };

  const renderMintSelection = () => (
    <div className="flex flex-col justify-center md:h-[60vh] min-h-fit w-full md:translate-y-[30px]">
      <div className="flex w-full justify-center max-md:gap-8 md:gap-32 md:flex-row flex-col mt-16 md:mt-0">
        <div className="text-center md:w-auto w-full relative">
          <img src={flameIcon} alt="" className="w-6 mx-auto mb-2" />
          <h2
            className="text-2xl md:text-3xl mb-2 !font-[AveriaSerifLibre-Regular] uppercase"
            style={{
              background:
                "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.9))",
            }}
          >
            Tiered Mint
          </h2>
          <img src={leftFlair} alt="" className="w-48 mx-auto mb-2" />
          <p
            className="text-sm mb-2 max-md:mb-8 italic !font-[AveriaSerifLibre-Regular] text-white/80 max-w-[300px] mx-auto"
            style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.9))" }}
          >
            Choose your Rarity and know exactly what you will recieve with your
            purchase.
          </p>
          <button
            onClick={() => handleMintSelection("tiered")}
            className="relative md:translate-x-0 translate-x-12"
          >
            <div className="absolute max-md:right-[290px] right-[285px] top-[20%] text-right">
              <p className="text-base !font-[AveriaSerifLibre-Regular] text-gray-300">
                Common
              </p>
              <p className="text-base !font-[AveriaSerifLibre-Regular] text-[#90B74E]">
                Uncommon
              </p>
              <p className="text-base !font-[AveriaSerifLibre-Regular] text-[#4E7CFF]">
                Rare
              </p>
              <p className="text-base !font-[AveriaSerifLibre-Regular] text-[#A34EFF]">
                Epic
              </p>
              <p className="text-base !font-[AveriaSerifLibre-Regular] text-[#FFB84E]">
                Legendary
              </p>
              <p className="text-base !font-[AveriaSerifLibre-Regular] text-gray-300">
                Oneiric
              </p>
            </div>
            <img
              src={mintInfoBg}
              alt=""
              className="w-[275px] md:w-[275px] w-[250px] drop-shadow-[0_0_12px_rgba(0,0,0,0.7)]"
            />
            <img
              src={tieredImg}
              alt=""
              className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[180px] z-10 drop-shadow-[0_0_12px_rgba(0,0,0,0.7)]"
            />
            <div className="relative -mt-[200px] mb-[90px] text-center">
              <p
                className="text-sm italic !font-[AveriaSerifLibre-Regular] text-white/80 max-w-[215px] mx-auto max-md:mt-4 md:mt-4"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.9))" }}
              >
                Secure your Dream Lair with 6 Rarity Tiers for you to explore
                and choose from.
              </p>
              <p
                className="text-sm italic !font-[AveriaSerifLibre-Regular] text-white/80 max-w-[215px] mx-auto max-md:mt-8 md:mt-8"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.9))" }}
              >
                No RNG - know the exact Lair and $Dream Emissions you'll recieve
                with your purchase.
              </p>
            </div>
          </button>
        </div>

        <div className="text-center md:w-auto w-full relative">
          <img src={skullIcon} alt="" className="w-6 mx-auto mb-2" />
          <h2
            className="text-2xl md:text-3xl mb-2 !font-[AveriaSerifLibre-Regular] uppercase"
            style={{
              background:
                "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.9))",
            }}
          >
            Gacha Mint
          </h2>
          <img src={rightFlair} alt="" className="w-48 mx-auto mb-2" />
          <p
            className="text-sm mb-2 max-md:mb-8 italic !font-[AveriaSerifLibre-Regular] text-white/80 max-w-[300px] mx-auto"
            style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.9))" }}
          >
            Try your luck and recieve a random tier of Dream Lair and $Dream
            token allocation.
          </p>
          <button
            onClick={() => handleMintSelection("gacha")}
            className="relative md:translate-x-0 -translate-x-12"
          >
            <div className="absolute right-[-80px] top-[20%] text-left w-[70px]">
              <p className="text-base !font-[AveriaSerifLibre-Regular] text-gray-300">
                Common
              </p>
              <p className="text-base !font-[AveriaSerifLibre-Regular] text-[#90B74E]">
                Uncommon
              </p>
              <p className="text-base !font-[AveriaSerifLibre-Regular] text-[#4E7CFF]">
                Rare
              </p>
              <p className="text-base !font-[AveriaSerifLibre-Regular] text-[#A34EFF]">
                Epic
              </p>
            </div>
            <img
              src={mintInfoBg}
              alt=""
              className="w-[275px] md:w-[275px] w-[250px] drop-shadow-[0_0_12px_rgba(0,0,0,0.7)]"
            />
            <img
              src={gachaImg}
              alt=""
              className="absolute top-[15px] left-1/2 -translate-x-1/2 w-[180px] z-10 drop-shadow-[0_0_12px_rgba(0,0,0,0.7)]"
            />
            <div className="relative -mt-[200px] mb-[90px] text-center">
              <p
                className="text-sm italic !font-[AveriaSerifLibre-Regular] text-white/80 max-w-[215px] mx-auto max-md:mt-4 md:mt-4"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.9))" }}
              >
                Recieve a Dreamslip holding 1 to 10,000% of your mint price in
                $Dream allocation.
              </p>
              <p
                className="text-sm italic !font-[AveriaSerifLibre-Regular] text-white/80 max-w-[215px] mx-auto max-md:mt-8 md:mt-8"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.9))" }}
              >
                Hold your $Dream reward or immediately redeem your slip for 25%
                of it's value in Eth.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex flex-col p-4 min-w-[320px] max-w-[100vw] overflow-x-hidden"
      style={{
        backgroundImage:
          selectedMintType || showPFPMint
            ? `url(${texture})`
            : `url(${mintChoiceBG})`,
        backgroundBlendMode: "multiply",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex justify-between items-center px-8 pt-4 md:pt-2">
        <div className="z-50">
          <button
            onClick={() => navigate("/mint/dreamrunner")}
            className="relative"
          >
            <img src={connectDream} alt="PFP Mint" className="h-8 w-auto" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#858585] font-averia text-xs w-full text-center">
              Dreamrunner Mint
            </span>
          </button>
        </div>

        <div className="flex items-center gap-4 z-50">
          <button
            className="relative z-50 cursor-pointer"
            onClick={() => window.open("https://x.com/dreamrunnergg", "_blank")}
          >
            <img
              src={twitterButton}
              alt="Twitter"
              className="h-8 w-auto drop-shadow-[0_0_12px_rgba(0,0,0,0.7)]"
            />
          </button>
          <button
            className="relative z-50 cursor-pointer"
            onClick={() =>
              window.open("https://whitepaper.dreampro.ai", "_blank")
            }
          >
            <img
              src={whitepaperButton}
              alt="Whitepaper"
              className="h-8 w-auto drop-shadow-[0_0_12px_rgba(0,0,0,0.7)]"
            />
          </button>
          <button
            className="relative z-50 cursor-pointer"
            onClick={() => window.open("https://discord.gg/kote", "_blank")}
          >
            <img
              src={discordButton}
              alt="Discord"
              className="h-8 w-auto drop-shadow-[0_0_12px_rgba(0,0,0,0.7)]"
            />
          </button>
        </div>
      </div>

      {showPFPMint && <PFPMint />}
      {!showPFPMint && selectedMintType === null && (
        <>
          {renderMintSelection()}
          <div className="text-center mt-[0px]">
            <h1
              className="text-3xl md:text-4xl mb-2 !font-[AveriaSerifLibre-Bold]"
              style={{
                background:
                  "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.9))",
              }}
            >
              DREAM LAIR MINT
            </h1>
            <p
              className="text-lg md:text-xl !font-[AveriaSerifLibre-Regular]"
              style={{
                background:
                  "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.9))",
              }}
            >
              Mint your way, with our dual mint structure
            </p>
          </div>
        </>
      )}
      {!showPFPMint && selectedMintType === "tiered" && <TieredMint />}
      {!showPFPMint && selectedMintType === "gacha" && <GachaMint />}
    </div>
  );
};

export default DreamLairMint;
