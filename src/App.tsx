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
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CoursePage />} />
          <Route path="/login" element={<LoginScreen />} />
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
