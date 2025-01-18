import React, { createContext, useState, useContext } from "react";

const DiscordAuthContext = createContext();

export const DiscordAuthProvider = ({ children }) => {
  const [discordUser, setDiscordUser] = useState(null);

  const loginWithDiscord = () => {
    const CLIENT_ID = "YOUR_DISCORD_CLIENT_ID";
    const REDIRECT_URI = encodeURIComponent("YOUR_REDIRECT_URL");
    const SCOPE = "identify email";

    window.location.href = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;
  };

  return (
    <DiscordAuthContext.Provider
      value={{ discordUser, setDiscordUser, loginWithDiscord }}
    >
      {children}
    </DiscordAuthContext.Provider>
  );
};

export const useDiscordAuth = () => useContext(DiscordAuthContext);
