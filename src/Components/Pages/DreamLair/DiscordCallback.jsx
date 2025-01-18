import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DiscordAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const savedState = localStorage.getItem("discord-state");

    if (code && state === savedState) {
      console.log("Discord auth code:", code);
      localStorage.setItem("discord-logged-in", "true");
      localStorage.setItem("discord-auth-code", code);
      localStorage.removeItem("discord-state");
      navigate("/dreamlair");
    } else {
      navigate("/dreamlair");
    }
  }, [navigate]);

  return <div>Authenticating with Discord...</div>;
};

export default DiscordAuthCallback;
