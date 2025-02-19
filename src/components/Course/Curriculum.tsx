import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Course, Lecture} from "../../mock-data/course";
import { AddLectureComponent } from "./AddLectureComponent";
import { LectureProvider } from "./LectureProvider";
import { SectionComponent } from "./SectionComponent";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { DragAndDropList } from "./DragAndDropList";


export const Curriculum = () => {
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [displayAddLecture, setDisplayAddLecture] = useState<boolean>(false);
  const [newlyAddedLecture, setNewlyAddedLecture] = useState<
    Lecture | undefined
  >(undefined);
  const {id}  = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/courses/${id}`).then((res) =>{
    const {data} = res;
    console.log(data);
    setCourse(data);  
})
  }, []);



  const handleAddSection = useCallback(
    (lectureIndex: number): void => {
      setCourse((prevState) => {
        if (!prevState) return prevState;
        return {
          ...prevState,
          lectures: prevState.lectures.map((lecture, index) => {
            if (index === lectureIndex) {
              return {
                ...lecture,
                sections: [...lecture.sections, { id:'',title: "", description: "" }],
              };
            }
            return lecture;
          }),
        };
      });
      // setLectures((prevState) => {
      //   return prevState.map((lecture, index) => {
      //     if (index === lectureIndex) {
      //       return {
      //         ...lecture,
      //         sections: [...lecture.sections, { title: "", description: "" }],
      //       };
      //     }
      //     return lecture;
      //   });
      // });
    },
    [course]
  );

  const saveLecture = () => {
    // Call the API to save the lecture
    // POST /courses/{course_id}/lectures
    setDisplayAddLecture(false);
    console.log("Before saving lecture...", newlyAddedLecture);
    // TODO: Remove Next line and call the API to save the lecture
    setCourse((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        lectures: [...prevState.lectures, newlyAddedLecture!],
      };
    });
    setNewlyAddedLecture(undefined);
    console.log("Saving lecture...");
    // console.log(`/courses/${course?.id}/lectures`, course);
  };

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
      <Typography alignSelf="flex-start" color="black">
        Lectures:
      </Typography>
    {course && 
    <DragAndDropList id = {course?.id} courseLectures = {course?.lectures || []}/>
  }
      
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Button onClick={() => setDisplayAddLecture(true)}>Add Lecture</Button>
      </Box>

      {displayAddLecture && <AddLectureComponent onCancel={() => setDisplayAddLecture(false)} />}
    </Box>
  );
};
