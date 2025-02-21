import React from "react";
import { IMAGES } from "../../config/assetUrls";
import { Link } from "react-router-dom";
import { Picture } from "../../Components/Picture";

const Home = () => {
  const [highQualityLoaded, setHighQualityLoaded] = React.useState(false);

  return (
    <div
      className="min-h-screen flex flex-col p-4 min-w-[320px] max-w-[100vw] overflow-x-hidden"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#3B3F3F",
      }}
    >
      <div className="md:absolute top-[3%] md:top-[6%] right-[8%] flex items-center gap-4">
        <button
          className="relative z-50 cursor-pointer"
          onClick={() => window.open("https://x.com/dreamrunnergg", "_blank")}
        >
          <Picture
            sources={IMAGES.buttons.twitter}
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
          <Picture
            sources={IMAGES.buttons.whitepaper}
            alt="Whitepaper"
            className="h-8 w-auto drop-shadow-[0_0_12px_rgba(0,0,0,0.7)]"
          />
        </button>
        <button
          className="relative z-50 cursor-pointer"
          onClick={() => window.open("https://discord.gg/kote", "_blank")}
        >
          <Picture
            sources={IMAGES.buttons.discord}
            alt="Discord"
            className="h-8 w-auto drop-shadow-[0_0_12px_rgba(0,0,0,0.7)]"
          />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow">
        <img
          src={IMAGES.bg.dreamrunnerLogo.high}
          alt="Dreamrunner Logo"
          className={`w-full max-w-[800px] h-auto mb-6 ${
            highQualityLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setHighQualityLoaded(true)}
          style={{ transition: "opacity 0.3s ease-in" }}
        />
        <img
          src={IMAGES.bg.dreamrunnerLogo.low}
          alt="Dreamrunner Logo"
          className={`w-full max-w-[800px] h-auto mb-6 absolute ${
            highQualityLoaded ? "opacity-0" : "opacity-100"
          }`}
          style={{ transition: "opacity 0.3s ease-in" }}
        />

        <h2
          className="text-[#858585] mb-12 font-averia !font-[AveriaSerifLibre] text-lg md:text-2xl text-center"
          style={{
            background:
              "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
          }}
        >
          The bleeding edge of AI x NFTs x Gaming
        </h2>

        <Link
          to="/mint/dreamrunner"
          className="group cursor-pointer flex flex-col items-center"
        >
          <h1 className="text-[#858585] mb-2 font-averia italic !font-[AveriaSerifLibre] text-lg md:text-xl text-center hover:text-[#a0a0a0] transition-all duration-200 group-hover:scale-105 group-hover:text-[#a0a0a0]">
            Mint Your Dreamrunner
          </h1>
          <Picture
            sources={IMAGES.buttons.titleDecor}
            alt="Title Decoration"
            className="w-32 group-hover:opacity-80 transition-all duration-200 group-hover:scale-105"
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
