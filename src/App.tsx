import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { NavBar } from "./components/NavBar";
import {
  AccordionProps,
  AccordionSummary,
  Box,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { CourseContent } from "./components/CourseContent";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  const [count, setCount] = useState(0);

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
          <Grid item md={12} lg={9}>
            <VideoPlayer src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" />
          </Grid>
          <Grid item md={12} lg={3}>
            <CourseContent />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
