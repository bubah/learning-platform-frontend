import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { CourseList } from "./components/Course/CourseListPage";
import { CoursePage } from "./components/Course/CoursePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/id" element={<CoursePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
