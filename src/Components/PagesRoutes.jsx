import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../components/Pages/Home";
import DreamLair from "../components/Pages/DreamLair/DreamLair";
import PFPMint from "../components/Pages/DreamLair/PFPMint";
import DiscordCallback from "../components/Pages/DreamLair/DiscordCallback";

const PagesRoutes = () => {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dreamlair" element={<DreamLair />} />
        <Route path="/mint/dreamrunner" element={<PFPMint />} />
        <Route path="/discord-auth" element={<DiscordCallback />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default PagesRoutes;
