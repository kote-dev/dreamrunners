import { S3_BASE_URL } from "./constants";

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
