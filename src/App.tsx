import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthenticationProvider } from "./hooks/AuthenticationProvider";
import { NavBar } from "./layouts/NavBar";
import { RouteWrapper } from "./components/RouteWrapper"; // Adjust the path as needed

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <NavBar />
        <PresistentRoutes />
        <RouteWrapper />

        {/* <Routes> */}
        {/* {RouteWrapper()} */}
        {/* <Route
            path="/"
            element={
              <Card>
                <Typography>LANDING PAGE</Typography>
              </Card>
            }
            />
          <Route path="/account-verify" element={<VerificationComponent />} />
          <Route path="/login" element={<LoginScreen />} />

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
            /> */}
        {/* </Routes> */}
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
