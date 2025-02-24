import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { AddLectureComponent } from "./AddLectureComponent";
import { DragAndDropList } from "./DragAndDropList";
import { useCourse } from "./CourseProvider";

export const Curriculum = () => {
  const [displayAddLecture, setDisplayAddLecture] = useState<boolean>(false);
  const { course, saveLecture, deleteLecture } = useCourse();

  const handleSaveLecture = (lecture: any) => {
    saveLecture(lecture);
    setDisplayAddLecture(false);
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

      {course && (
        <DragAndDropList
          id={course.id}
          courseLectures={course.lectures}
          deleteLecture={deleteLecture}
        />
      )}

      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Button onClick={() => setDisplayAddLecture(true)}>Add Lecture</Button>
      </Box>

      {displayAddLecture && (
        <AddLectureComponent
          saveLecture={handleSaveLecture}
          onCancel={() => setDisplayAddLecture(false)}
        />
      )}
    </Box>
  );
};
