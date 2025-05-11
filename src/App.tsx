import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthenticationProvider } from "./hooks/AuthenticationProvider";
import { NavBar } from "./layouts/NavBar";
import { Card, Typography } from "@mui/material";
import VerificationComponent from "./pages/auth/AccountVerificationScreen";
import { CoursePage } from "./components/shared/CoursePage";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import LoginScreen from "./pages/auth/LoginScreen";
import { CourseList } from "./pages/instructor/CourseListPage";
import CourseManagementScreen from "./pages/instructor/MangeCoursesPage";

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <Card>
                <Typography>LANDING PAGE</Typography>
              </Card>
            }
          />
          <Route path="/account-verify" element={<VerificationComponent />} />
          <Route path="/login" element={<LoginScreen />} />

          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <CourseList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:id"
            element={
              <ProtectedRoute>
                <CoursePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage/course/:id"
            element={
              <ProtectedRoute>
                <CourseManagementScreen />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
