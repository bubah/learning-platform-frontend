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
        <Grid container spacing={2}>
          <Grid item md={12} lg={9}>
            <Box>
              <div>
                <a href="https://vite.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img
                    src={reactLogo}
                    className="logo react"
                    alt="React logo"
                  />
                </a>
              </div>
              <h1>Vite + React</h1>
              <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button>
                <p>
                  Edit <code>src/App.tsx</code> and save to test HMR
                </p>
              </div>
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>
            </Box>
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
