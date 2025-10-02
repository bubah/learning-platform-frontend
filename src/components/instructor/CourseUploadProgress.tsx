import { Box, Button, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useResumeUpload } from "../../hooks/ResumeUploadProvider";

const CourseUploadProgress = () => {
  const { progress, canResumeUpload } = useResumeUpload();

  if (!canResumeUpload) return null;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Button variant="contained" component="span" fullWidth>
        Resume Upload
      </Button>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
        >{`${Math.round(progress)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default CourseUploadProgress;
