import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthenticationProvider } from "./components/Course/AuthenticationProvider";
import { CourseList } from "./components/Course/CourseListPage";
import { CoursePage } from "./components/Course/CoursePage";
import { LoginForm } from "./components/Course/LoginForm";
import CourseManagementScreen from "./components/Course/MangeCoursesPage";
import { ProtectedRoute } from "./components/Course/ProtectedRoute";
import { NavBar } from "./components/NavBar";
import { CourseProvider } from "./components/Course/CourseProvider";

function App() {
  return (
    <BrowserRouter>
    <AuthenticationProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/courses/:id" element={<CoursePage />} />
        <Route
          path="/login"
          element={<LoginForm />}
        />
        <Route
          path="/manage/course/:id"
          element={
            <ProtectedRoute>
              <CourseProvider>
              <CourseManagementScreen />
              </CourseProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
