import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { AddLectureComponent } from "./AddLectureComponent";
import { DragAndDropList } from "./DragAndDropList";
import { useCourse } from "./CourseProvider";
import { Lecture } from "../../types/types";
import { LectureProvider } from "./LectureProvider";
import { LectureComponent } from "./LectureComponent";

export const Curriculum = () => {
  const [displayAddLecture, setDisplayAddLecture] = useState<boolean>(false);
  const { course, saveLecture } = useCourse();

  const handleSaveLecture = (lecture: any) => {
    saveLecture(lecture);
    setDisplayAddLecture(false);
  };

  const sortedLectures = [...(course?.lectures || [])].sort(
    (a, b) => a.order - b.order,
  );

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

      <DragAndDropList>
        {sortedLectures.map((lecture) => (
          <LectureProvider key={lecture.id} lecture={lecture}>
            <LectureComponent />
          </LectureProvider>
        ))}
      </DragAndDropList>

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
