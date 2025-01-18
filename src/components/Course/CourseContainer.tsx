import { Box, createTheme, Grid, useMediaQuery } from "@mui/material";
import { CourseContent } from "./CourseContent";
import { CourseDetails } from "./CourseDetails";
import { CourseHeaderInfo } from "./CourseHeaderInfo";
import VideoPlayer from "../VideoPlayer";
import { useEffect, useState } from "react";
import { Course, mockCourse } from "../../mock-data/course";
const theme = createTheme();

export const CoursePage = () => {
  const isMdOrLower = useMediaQuery(theme.breakpoints.down("lg"));
  const [course, setCourse] = useState<Course | undefined>(undefined);

  useEffect(() => {
    setCourse(mockCourse);
  }, []);

  return (
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
        <Grid item xs={12}>
          <CourseHeaderInfo course={course} />
        </Grid>
        <Grid item xs={12} lg={9}>
          <VideoPlayer
            src="http://localhost:8000/output.m3u8"
          />
        </Grid>
        <Grid item xs={12} lg={3} sx={{ position: "sticky", top: 0 }}>
          {!isMdOrLower && <CourseContent lectures={course?.lectures ?? []} />}
        </Grid>
        <Grid item xs={12} lg={12}>
          <CourseDetails
            isMobileView={isMdOrLower}
            lectures={course?.lectures ?? []}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
