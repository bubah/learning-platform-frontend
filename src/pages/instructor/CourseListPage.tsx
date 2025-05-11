import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { httpClient } from "../../clients/httpClient";
import { CourseDTO } from "../../types/dtos";
import { Course } from "../../types/types";
import {
  convertToCourses,
  convertToCourse,
} from "../../utils/incoming-request";

export const CourseList = () => {
  const [courses, setCourses] = useState<Course[] | []>([]);
  const [displayAddNewCourse, setDisplayAddNewCourse] = useState(false);

  const navigate = useNavigate();

  const handleCourseClick = (course: Course) => {
    const id = course.id;
    navigate(`/manage/course/${id}`);
  };

  useEffect(() => {
    // setCourses([mockCourse, mockCourse]);
    httpClient.get<CourseDTO[]>("/courses").then((res) => {
      setCourses(convertToCourses(res.data));
    });
  }, []);

  const createNewCourse = (requestBody: CourseDTO) => {
    httpClient
      .post<CourseDTO>("/courses", requestBody)
      .then((res) => {
        const course = convertToCourse(res.data);
        setCourses((prevCourses) => [...prevCourses, course]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCourse = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    const pristineCourses = courses;

    setCourses((prevCourses) => [
      ...prevCourses.filter((course) => course.id !== id),
    ]);

    e.stopPropagation();

    httpClient
      .delete(`/courses/${id}`)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.log(error);
        setCourses(pristineCourses);
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
            <Button
              onClick={(e) => deleteCourse(e, course.id!)}
              sx={{ color: "white", backgroundColor: "red" }}
            >
              Delete
            </Button>
          </Card>
        ))}
      </Box>

      {displayAddNewCourse && (
        <NewCourseModule
          setDisplayAddNewCourse={setDisplayAddNewCourse}
          createNewCourse={createNewCourse}
        />
      )}
    </Box>
  );
};

const NewCourseModule = ({
  createNewCourse,
  setDisplayAddNewCourse,
}: {
  createNewCourse: (requestBody: CourseDTO) => void;
  setDisplayAddNewCourse: (value: boolean) => void;
}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleSaveCourse = () => {
    setDisplayAddNewCourse(false);
    const requestBody: CourseDTO = {
      title: title,
      category: category,
    };
    createNewCourse(requestBody);
  };

  return (
    <Box>
      <TextField
        label="Course Title"
        variant="outlined"
        color="primary"
        size="small"
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
  );
};
