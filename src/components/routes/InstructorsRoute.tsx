// components/routes/InstructorsRoute.tsx
import { CourseProvider } from "../../hooks/CourseProvider";
import { CourseList } from "../../pages/instructor/CourseListPage";
import CourseManagementScreen from "../../pages/instructor/MangeCoursesPage";
import { CoursePage } from "../shared/CoursePage";
import { ProtectedRoute } from "../shared/ProtectedRoute";

interface Props {
  page: "courses" | "course-detail" | "manage-course";
}

const InstructorsRoute = ({ page }: Props) => {
  const pageMap = {
    courses: <CourseList />,
    "course-detail": (
      <CourseProvider>
        <CoursePage />
      </CourseProvider>
    ),
    "manage-course": (
      <CourseProvider>
        <CourseManagementScreen />
      </CourseProvider>
    ),
  };

  return <ProtectedRoute>{pageMap[page]}</ProtectedRoute>;
};

export default InstructorsRoute;
