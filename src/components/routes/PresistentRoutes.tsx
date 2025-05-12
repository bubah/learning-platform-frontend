import { Route, Routes } from "react-router-dom";
import LandingPage from "../../pages/shared/LandingPage";
import VerificationComponent from "../../pages/auth/AccountVerificationScreen";
import LoginScreen from "../../pages/auth/LoginScreen";

const PresistentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/account-verify" element={<VerificationComponent />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/sign-up" element={<LoginScreen />} />
    </Routes>
  );
};

export default PresistentRoutes;
