import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { CourseList } from "./components/Course/CourseListPage";
import { CoursePage } from "./components/Course/CoursePage";
import { LoginForm } from "./components/Course/LoginForm";
import { NavBar } from "./components/NavBar";
import { Curriculum } from "./components/Course/Curriculum";
import { ProtectedRoute } from "./components/Course/ProtectedRoute";
import { AuthenticationProvider } from "./components/Course/AuthenticationProvider";

function App() {
  
  return (
    <BrowserRouter>
    <AuthenticationProvider>
      {/* we will pass down user to nav bar and conditionally render based on role. */}
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<CourseList />} />
        <Route path="/courses/:id" element={<CoursePage />} />
        <Route
          path="/login"
          element={<LoginForm />}
        />

        {/* Protected Routes (assuming `ProtectedRoute` is properly implemented) */}
        <Route
          path="/curriculum"
          element={
            <ProtectedRoute >
              <Curriculum />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} /> */}
      </Routes>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
