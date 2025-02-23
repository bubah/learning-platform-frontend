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
import { Course, Lecture } from "../../types/types";
import { LectureDTO } from "../../types/dtos";

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

  const saveLecture = (lecture:Lecture) => {
    console.log("Saving new lecture", lecture);

    const lectureDTO:LectureDTO = {
      title:lecture.title, 
      description:lecture.description,
      sections:lecture.sections.map((s) => ({ title:s.title, description:s.description,order:s.order,id:s.id})), 
      courseId:course?.id, 
      id:null, 
      order:course?.lectures.length || 0
    }

    axios.post("http://localhost:8080/lectures",lectureDTO).then((res) => {
      console.log(res.data)
    setCourse((prevCourse) => ({ 
      ...prevCourse!, 
      lectures:[
        ...prevCourse!.lectures,
          res.data
      ]
    }))
    
    })
      
      .catch((error) => console.log(error))
    setDisplayAddLecture(false);
  };

  console.log("Course Object with new lecture added ", course);
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
        <AddLectureComponent saveLecture = {saveLecture} onCancel={() => setDisplayAddLecture(false)} />
      )}
    </Box>
  );
};
