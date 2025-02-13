import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { CourseList } from "./components/Course/CourseListPage";
import { CoursePage } from "./components/Course/CoursePage";
import { LoginForm } from "./components/Course/LoginForm";
import { Switch } from "@mui/material";
import { useState } from "react";
import { Login } from "@mui/icons-material";
import { LoginCredentials } from "./types/types";
import { NavBar } from "./components/NavBar";
import { Curriculum } from "./components/Course/Curriculum";
import { ProtectedRoute } from "./components/Course/ProtectedRoute";

function App() {
  const [user, setUser] = useState<LoginCredentials | null>(null);

  const onLogin = (user: LoginCredentials) => {
    console.log("log on ");
    setUser(user);
  };

  return (
    <BrowserRouter>
      {/* we will pass down user to nav bar and conditionally render based on role. */}
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<CourseList />} />
        <Route path="/courses/:id" element={<CoursePage />} />
        <Route
          path="/login"
          element={<LoginForm onLogin={(user) => onLogin(user)} />}
        />
        {/* <Route path="/" element={<HomePage />} /> */}

        {/* Protected Routes (assuming `ProtectedRoute` is properly implemented) */}
        <Route
          path="/curriculum"
          element={
            <ProtectedRoute user={user}>
              <Curriculum />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
