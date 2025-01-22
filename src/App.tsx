import "./App.css";
import { CoursePage } from "./components/Course/CoursePage";
import { Curriculum } from "./components/Course/Curriculum";
import { EditCourse } from "./components/Course/EditCourse";
import CourseManagementScreen from "./components/Course/MangeCoursesPage";
import { NavBar } from "./components/NavBar";
function App() {
  return (
    <div style={{ minWidth: "650px" }}>
      {/* <NavBar /> */}
      {/* <CoursePage /> */}
      <CourseManagementScreen />
      {/* <EditCourse /> */}
      {/* <Curriculum /> */}
    </div>
  );
}

export default App;
