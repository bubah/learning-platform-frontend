import { Box, Typography, CircularProgress } from "@mui/material";
import { Course } from "../../mock-data/course";

export const CourseHeaderInfo = ({
  course,
}: {
  course: Course | undefined;
}) => {
  const learningProgress = 50;
  return (
    <Box display={"flex"} sx={{ backgroundColor: "black" }}>
      <Box flex={1} padding={2}>
        <Typography>{"<"} HOME</Typography>
      </Box>
      <Box
        flex={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", // Align items to the left
          padding: 2,
          width: "100%",
        }}
      >
        <Typography>{course?.title}</Typography>
      </Box>
      <Box
        flex={2}
        sx={{
          display: "flex",
          // margin: 3,
          alignItems: "center",
          position: "relative",
        }}
      >
        <CircularProgress
          variant="determinate"
          color="info"
          value={learningProgress}
          sx={{ margin: 1 }}
        />
        <Box
          sx={{
            top: 0,
            left: 13,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "fit-content",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            sx={{ color: "text.info", fontSize: "0.75rem" }}
          >{`${Math.round(learningProgress)}%`}</Typography>
        </Box>
        <Typography>Your Progress</Typography>
      </Box>
    </Box>
  );
};
