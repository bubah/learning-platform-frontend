import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthenticationProvider } from "./components/Course/AuthenticationProvider";
import { CourseList } from "./components/Course/CourseListPage";
import { CoursePage } from "./components/Course/CoursePage";
import CourseManagementScreen from "./components/Course/MangeCoursesPage";
import { ProtectedRoute } from "./components/Course/ProtectedRoute";
import { NavBar } from "./components/NavBar";
import { Card, Typography } from "@mui/material";
import LoginScreen from "./components/Course/LoginScreen";
import VerificationComponent from "./components/Course/AccountVerificationScreen";

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
          <Route
            path="/account-verify"
            element={
              <VerificationComponent />
            }
          />
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
