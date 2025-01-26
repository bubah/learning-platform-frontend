import "./App.css";
import { CoursePage } from "./components/Course/CoursePage";
import { Curriculum } from "./components/Course/Curriculum";
import { EditCourse } from "./components/Course/EditCourse";
import CourseManagementScreen from "./components/Course/MangeCoursesPage";
import UpdateAttributeField from "./components/Course/UpdateAttributeFied";
import { NavBar } from "./components/NavBar";
function App() {
  return (
    <div style={{ minWidth: "650px" }}>
      {/* <NavBar /> */}
      {/* <CoursePage /> */}
      <CourseManagementScreen />
      {/* <UpdateAttributeField /> */}
      {/* <EditCourse /> */}
      {/* <Curriculum /> */}
    </div>
  );
}

export default App;
