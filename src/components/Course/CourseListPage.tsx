import { useEffect, useState } from "react";
import { Course, mockCourse } from "../../mock-data/course";
import { Box, Card, CardMedia, Typography } from "@mui/material";

export const CourseList = () => {
  const [corses, setCourses] = useState<Course[] | []>([]);

  useEffect(() => {
    setCourses([mockCourse, mockCourse]);
  }, []);
  return (
    <Box sx={{ margin: 10 }}>
      {corses.map((course) => (
        <Card variant="outlined" sx={{ marginBottom: 5, display: "flex" }}>
          <Box>
            <CardMedia
              component="img"
              sx={{ height: 150 }}
              image="https://picsum.photos/150/150"
              alt="green iguana"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography>{course.title}</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography>Meta Data</Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
};
