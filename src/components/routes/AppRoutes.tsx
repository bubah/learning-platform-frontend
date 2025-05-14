import { Routes, Route } from "react-router-dom";
import { useAuth } from "../../hooks/AuthenticationProvider";
import VerificationComponent from "../../pages/auth/AccountVerificationScreen";
import LoginScreen from "../../pages/auth/LoginScreen";
import LandingPage from "../../pages/shared/LandingPage";
import NotFound from "../../pages/shared/NotFound";
import InstructorsRoute from "./InstructorsRoute";

const AppRoutes = () => {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase();

  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/account-verify" element={<VerificationComponent />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/sign-up" element={<LoginScreen />} />

      {/* instructor routes (protected) */}
      {user !== null && role === "instructor" && (
        <>
          <Route
            path="/courses"
            element={<InstructorsRoute page="courses" />}
          />
          <Route
            path="/courses/:id"
            element={<InstructorsRoute page="course-detail" />}
          />
          <Route
            path="/manage/course/:id"
            element={<InstructorsRoute page="manage-course" />}
          />
        </>
      )}

      {/* fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
