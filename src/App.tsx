import "./App.css";
import { CourseList } from "./components/Course/CourseListPage";
import { CoursePage } from "./components/Course/CoursePage";
import CourseManagementScreen from "./components/Course/MangeCoursesPage";
function App() {
  return (
    <div style={{ minWidth: "650px" }}>
      {/* <NavBar /> */}
      {/* <CoursePage /> */}
      {/* <CourseManagementScreen /> */}
      <CourseList/>
    </div>
  );
}

export default App;
