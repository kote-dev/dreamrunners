import React from "react";
import { IMAGES } from "../../config/assetUrls";
import { Link } from "react-router-dom";
import { Picture } from "../../Components/Picture";

const Home = () => {
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
            className="mb-8 w-32 group-hover:opacity-80 transition-all duration-200 group-hover:scale-105"
          />
        </Link>

        <div className="w-full mb-8 relative flex justify-center">
          <div className="relative w-full max-w-[800px]">
            <Picture
              sources={IMAGES.bg.videobox}
              alt=""
              className="w-full h-auto object-contain"
            />
            <video
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[92%] rounded-lg"
              autoPlay
              loop
              muted
              controls
              playsInline
              src="https://s3.us-east-1.amazonaws.com/assets.knightsoftheether.com/dreampro/optimized.mp4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
