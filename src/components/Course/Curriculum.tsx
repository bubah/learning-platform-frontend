import {
  Box,
  Button,
  Typography
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddLectureComponent } from "./AddLectureComponent";
import { DragAndDropList } from "./DragAndDropList";
import { Course } from "../../types/types";

export const Curriculum = () => {
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [displayAddLecture, setDisplayAddLecture] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/courses/${id}`).then((res) => {
      const { data } = res;
      setCourse(data);
    });
  }, []);

  return (
    <Box
      sx={{
        justifyContent: "center",
        margin: "auto",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography color="black">Curriculum</Typography>

      {course && (
        <DragAndDropList
          id={course.id}
          courseLectures={course.lectures}
        />
      )}

      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Button onClick={() => setDisplayAddLecture(true)}>Add Lecture</Button>
      </Box>

      {displayAddLecture && (
        <AddLectureComponent onCancel={() => setDisplayAddLecture(false)} />
      )}
    </Box>
  );
};
