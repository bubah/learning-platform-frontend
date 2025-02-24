import { useEffect, useState } from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Course } from "../../types/types";

export const CourseList = () => {
  const [courses, setCourses] = useState<Course[] | []>([]);
  const navigate = useNavigate();

const handleCourseClick = (course:Course) => {
  const id = course.id;
  navigate(`/curriculum/${id}`)
}
  
  
  
  useEffect(() => {
    // setCourses([mockCourse, mockCourse]);
    axios.get(`http://localhost:8080/courses`).then((res) => {
      const {data} = res;
      setCourses(data);
    })
  }, []);


  return (
    <Box sx={{ margin: 10 }}>
      {courses.map((course, index) => (
        <Card 
        onClick={() => handleCourseClick(course)}
        key={index} variant="outlined" sx={{ marginBottom: 5, display: "flex", cursor:"pointer" }}>
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
