import { Box, createTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {  useState } from "react";
import VideoPlayer from "../VideoPlayer";
import { LessonsList } from "./LessonsList";
import { CourseDetails } from "./CourseDetails";
import { CourseHeaderInfo } from "./CourseHeaderInfo";
import { Course } from "../../types/types";
const theme = createTheme();

export const CoursePage = () => {
  const isMdOrLower = useMediaQuery(theme.breakpoints.down("lg"));
  const [course] = useState<Course | undefined>(undefined);

  // useEffect(() => {
  //   setCourse(mockCourse);
  // }, []);

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
        <Grid size={{ xs: 12 }}>
          <CourseHeaderInfo course={course} />
        </Grid>
        <Grid size={{ xs: 12, lg: 9 }}>
          <VideoPlayer src="http://localhost:8000/output.m3u8" />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }} sx={{ position: "sticky", top: 0 }}>
          {!isMdOrLower && <LessonsList lectures={course?.lectures ?? []} />}
        </Grid>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CourseDetails
            isMobileView={isMdOrLower}
            lectures={course?.lectures ?? []}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
