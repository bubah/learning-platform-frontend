import { Routes, Route } from "react-router-dom";
import { CourseList } from "../../pages/instructor/CourseListPage";
import CourseManagementScreen from "../../pages/instructor/MangeCoursesPage";
import { CoursePage } from "../shared/CoursePage";
import { ProtectedRoute } from "../shared/ProtectedRoute";

const InstructorsRoute = () => {
  return (
    <Routes>
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
  );
};

export default InstructorsRoute;
