import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { AddLectureComponent } from "./AddLectureComponent";
import { DragAndDropList } from "./DragAndDropList";
import { useCourse } from "./CourseProvider";
import { Lecture } from "../../types/types";

export const Curriculum = () => {
  const [displayAddLecture, setDisplayAddLecture] = useState<boolean>(false);
  const { course, saveLecture, deleteLecture } = useCourse();

  const handleSaveLecture = (lecture: any) => {
    saveLecture(lecture);
    setDisplayAddLecture(false);
  };

  console.log("Course", course);

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
          courseLectures={course.lectures}
        />
      )}

      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Button onClick={() => setDisplayAddLecture(true)}>Add Lecture</Button>
      </Box>

      {displayAddLecture && (
        <AddLectureComponent<Lecture>
          saveItem={handleSaveLecture}
          onCancel={() => setDisplayAddLecture(false)}
        />
      )}
    </Box>
  );
};
