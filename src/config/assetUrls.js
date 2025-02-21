import { S3_BASE_URL } from "./constants";

// Preload function
const preloadAssets = () => {
  console.log("🚀 Starting asset preload...");
  let loadedCount = 0;
  let totalAssets = 0;

  // Helper function to preload image
  const preloadImage = (url) => {
    totalAssets++;
    const img = new Image();
    img.onload = () => {
      loadedCount++;
      console.log(
        `✅ Loaded image: ${url
          .split("/")
          .pop()} (${loadedCount}/${totalAssets})`
      );
    };
    img.onerror = () => {
      loadedCount++;
      console.error(`❌ Failed to load image: ${url.split("/").pop()}`);
    };
    img.src = url;
  };

  // Helper function to preload video
  const preloadVideo = (url) => {
    totalAssets++;
    const video = document.createElement("video");
    video.preload = "auto";

    video.onloadeddata = () => {
      loadedCount++;
      console.log(
        `🎥 Loaded video: ${url
          .split("/")
          .pop()} (${loadedCount}/${totalAssets})`
      );
    };
    video.onerror = () => {
      loadedCount++;
      console.error(`❌ Failed to load video: ${url.split("/").pop()}`);
    };
    video.src = url;
  };

  // Preload all images
  Object.entries(IMAGES).forEach(([category, assets]) => {
    console.log(`📁 Preloading ${category} assets...`);
    if (typeof assets === "object") {
      Object.entries(assets).forEach(([key, item]) => {
        if (typeof item === "string") {
          preloadImage(item);
        } else if (typeof item === "object") {
          Object.values(item).forEach((url) => preloadImage(url));
        }
      });
    }
  });

  // Preload all videos
  console.log("🎬 Preloading videos...");
  Object.entries(VIDEOS).forEach(([key, url]) => {
    preloadVideo(url);
  });

  console.log(`⏳ Queued ${totalAssets} assets for preloading`);
};

export const IMAGES = {
  textures: {
    main: {
      webp: `${S3_BASE_URL}/images/textures/Texture.webp`,
      original: `${S3_BASE_URL}/images/textures/Texture.png`,
      preview: `${S3_BASE_URL}/images/textures/preview/Texture.png`,
    },
    glow: {
      original: `${S3_BASE_URL}/images/bg/glow.webp`,
      preview: `${S3_BASE_URL}/images/bg/preview/glow.webp`,
    },
  },
  bg: {
    dreamrunnerBg: {
      original: `${S3_BASE_URL}/images/bg/dreamrunnerbg.png`,
      preview: `${S3_BASE_URL}/images/bg/preview/dreamrunnerbg.png`,
    },
    dreamrunnerLogo: {
      original: `${S3_BASE_URL}/images/bg/dreamrunnerlogo.png`,
      preview: `${S3_BASE_URL}/images/bg/preview/dreamrunnerlogo.png`,
    },
    videobox: {
      webp: `${S3_BASE_URL}/images/bg/videobox.webp`,
      original: `${S3_BASE_URL}/images/bg/videobox.png`,
    },
    mintinfobg: `${S3_BASE_URL}/images/bg/mintinfobg.png`,
    pack: `${S3_BASE_URL}/images/bg/pack.png`,
  },
  buttons: {
    twitter: {
      webp: `${S3_BASE_URL}/images/buttons/twitterbutton.webp`,
      original: `${S3_BASE_URL}/images/buttons/twitterbutton.png`,
    },
    whitepaper: {
      webp: `${S3_BASE_URL}/images/buttons/whitepaperbutton.webp`,
      original: `${S3_BASE_URL}/images/buttons/whitepaperbutton.png`,
    },
    discord: {
      webp: `${S3_BASE_URL}/images/buttons/discordbutton.webp`,
      original: `${S3_BASE_URL}/images/buttons/discordbutton.png`,
    },
    connectWallet: `${S3_BASE_URL}/images/buttons/connectDream.png`,
    connectWalletActive: `${S3_BASE_URL}/images/buttons/connectDreamACTIVE.png`,
    titleDecor: `${S3_BASE_URL}/images/buttons/titledecor.png`,
    flair: `${S3_BASE_URL}/images/buttons/flair.png`,
    createFlair: `${S3_BASE_URL}/images/buttons/createflair.png`,
    blank: `${S3_BASE_URL}/images/buttons/button_blank.png`,
  },
  dreamrunnerpfp: {
    loading: `${S3_BASE_URL}/images/dreamrunnerpfp/loading.png`,
    prompt: `${S3_BASE_URL}/images/dreamrunnerpfp/promptnobutton.png`,
    createFlair: `${S3_BASE_URL}/images/dreamrunnerpfp/createflair.png`,
    generate: `${S3_BASE_URL}/images/dreamrunnerpfp/generate.png`,
    confirm: `${S3_BASE_URL}/images/dreamrunnerpfp/confirm.png`,
    nameTextbox: `${S3_BASE_URL}/images/dreamrunnerpfp/nametextbox.png`,
    sharebutton: `${S3_BASE_URL}/images/dreamrunnerpfp/sharebutton.png`,
    share: `${S3_BASE_URL}/images/dreamrunnerpfp/share.png`,
    placeholder1: `${S3_BASE_URL}/images/dreamrunnerpfp/placeholder1.png`,
    placeholder2: `${S3_BASE_URL}/images/dreamrunnerpfp/placeholder2.png`,
    placeholder3: `${S3_BASE_URL}/images/dreamrunnerpfp/placeholder3.png`,
  },
};

export const VIDEOS = {
  flame: `${S3_BASE_URL}/videos/flame.mp4`,
  digital: `${S3_BASE_URL}/videos/digital.webm`,
  withBg: `${S3_BASE_URL}/videos/WithBG.mp4`,
};

// Execute preload
preloadAssets();

export default { IMAGES, VIDEOS };
