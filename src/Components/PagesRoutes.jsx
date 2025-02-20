import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../Components/Pages/Home";
import DreamLair from "../Components/Pages/DreamLair/DreamLair";
import PFPMint from "../Components/Pages/DreamLair/PFPMint";
import DiscordCallback from "../Components/Pages/DreamLair/DiscordCallback";

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
