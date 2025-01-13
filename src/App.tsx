import {
  Box,
  Grid
} from "@mui/material";
import "./App.css";
import { CourseContent } from "./components/CourseContent";
import { NavBar } from "./components/NavBar";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
          margin: 0,
          width: "100%",
        }}
      >
        <Grid container>
          <Grid item xs={12} lg={9}>
            <VideoPlayer src="http://localhost:8000/output.m3u8
" />
          </Grid>
          <Grid item xs={12} lg={3}>
            <CourseContent />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
