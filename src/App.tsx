import { Box, Card, createTheme, Grid, Tab, Tabs, ThemeProvider, useMediaQuery } from "@mui/material";
import "./App.css";
import { CourseContent } from "./components/CourseContent";
import { NavBar } from "./components/NavBar";
import VideoPlayer from "./components/VideoPlayer";
import { CourseDetails } from "./components/CourseDetails";
const theme = createTheme();
function App() {
  const isMdOrLower = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <ThemeProvider theme={theme}>
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
            <VideoPlayer
              src="http://localhost:8000/output.m3u8
"
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            {!isMdOrLower && <CourseContent />}
          </Grid>
          <Grid item xs={12} lg={12}>
            <CourseDetails isMobileView={isMdOrLower}/>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
