import React, { useState, useEffect } from "react";
import { IMAGES, VIDEOS } from "../../config/assetUrls";
import { Link } from "react-router-dom";
import { Picture } from "../../Components/Picture";

const Home = () => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col p-4 min-w-[320px] max-w-[100vw] overflow-x-hidden relative bg-[#3B3F3F]">
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

      {/* Background texture */}
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
      </div>

      {/* Dreamrunner background - With progressive loading */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${IMAGES.bg.dreamrunnerBg.preview})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            opacity: bgLoaded ? 0 : 1,
            transform: "scale(0.75)",
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
            transform: "scale(0.75)",
            transformOrigin: "center center",
            transition: "opacity 0.3s ease",
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

      <div className="md:absolute top-[3%] md:top-[6%] right-[8%] flex items-center gap-4 z-10">
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

      <div className="flex flex-col items-center justify-center flex-grow z-10">
        <div className="relative w-full max-w-[800px]">
          <img
            src={IMAGES.bg.dreamrunnerLogo.preview}
            alt="Dreamrunner Logo Preview"
            className={`w-full h-auto mb-6 transition-opacity duration-300 ${
              logoLoaded ? "opacity-0" : "opacity-100"
            }`}
            style={{ transform: "none" }}
          />
          <img
            src={IMAGES.bg.dreamrunnerLogo.original}
            alt="Dreamrunner Logo"
            className={`w-full h-auto mb-6 absolute top-0 left-0 transition-opacity duration-300 ${
              logoLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: "none" }}
            onLoad={() => setLogoLoaded(true)}
          />
        </div>

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
          <div className="relative">
            <img
              src={IMAGES.buttons.blank}
              alt="Mint Button"
              className="h-12 w-auto transition-all duration-300 transform-gpu hover:scale-105 drop-shadow-[0_0_3px_rgba(0,0,0,0.5)] hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transform origin-center translate-y-1"
            />
            <span
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#858585] font-averia italic !font-[AveriaSerifLibre] text-lg md:text-xl text-center whitespace-nowrap translate-y-[-10px]"
              style={{
                background:
                  "linear-gradient(180deg, #fcdfc5 0%, #a88d6b 50%, #fcdfc5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
              }}
            >
              Mint
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
