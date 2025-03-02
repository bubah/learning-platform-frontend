import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Course } from "../../types/types";
import { CourseDTO } from "../../types/dtos";

export const CourseList = () => {

// ************ include loading functionality to show axios request to add new course is being processed. ****************

  const [courses, setCourses] = useState<Course[] | []>([]);
  const [displayAddNewCourse, setDisplayAddNewCourse] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const handleCourseClick = (course: Course) => {
    const id = course.id;
    navigate(`/manage/course/${id}`);
  };

  useEffect(() => {
    // setCourses([mockCourse, mockCourse]);
    axios.get(`http://localhost:8080/courses`).then((res) => {
      const { data } = res;
      setCourses(data);
    });
  }, []);


  const createNewCourse = (requestBody:CourseDTO) => {   
    axios
      .post("http://localhost:8080/courses", requestBody)
      .then((res) => {
        setCourses((prevCourses) => [...prevCourses, res.data]);
      })
      .catch((error) => {
        console.log(error);
      }); 
  };



  return (
    <Box sx={{ margin: 10 }}>
      <Box display="flex" width="100%">
        <Button
          onClick={() => setDisplayAddNewCourse(true)}
          sx={{
            margin: "auto",
            marginRight: "0",
            backgroundColor: "blue",
            color: "white",
          }}
        >
          <Typography>Add Course</Typography>
        </Button>
      </Box>
      <Box>
        {courses.map((course, index) => (
          <Card
            onClick={() => handleCourseClick(course)}
            key={index}
            variant="outlined"
            sx={{ marginBottom: 5, display: "flex", cursor: "pointer" }}
          >
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

      {displayAddNewCourse && (
      <NewCourseModule setDisplayAddNewCourse={setDisplayAddNewCourse} createNewCourse={createNewCourse}/>
      )}
    </Box>
  );
};

const NewCourseModule  = ({ createNewCourse, setDisplayAddNewCourse}:{ createNewCourse:(requestBody:CourseDTO) => void, setDisplayAddNewCourse:(value:boolean) => void}) => {

  const[title, setTitle] = useState('')
  const[category, setCategory] = useState('')

  const handleSaveCourse = () => {
    setDisplayAddNewCourse(false)
    const requestBody: CourseDTO = {
      title: title,
      category: category,
    };
    createNewCourse(requestBody)
  }

  return(
    <Box>
    <TextField
      label="Course Title"
      variant="outlined" // "filled" | "standard"
      color="primary" // "secondary" | "error" | "success"
      size="small" // "medium" | "small"
      fullWidth
      margin="normal"
      onChange={(e) => setTitle(e.target.value)}
    />

   <TextField
      label="Course Category"
      variant="outlined" // "filled" | "standard"
      color="primary" // "secondary" | "error" | "success"
      size="small" // "medium" | "small"
      fullWidth
      margin="normal"
      onChange={(e) => setCategory(e.target.value)}
    />


    <Button onClick={handleSaveCourse}>Save</Button>

    <Button onClick={() => setDisplayAddNewCourse(false)}>cancel</Button>
  </Box>

  )
}
