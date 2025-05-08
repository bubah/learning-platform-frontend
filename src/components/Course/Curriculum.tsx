import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Lecture } from "../../types/types";
import { AddLectureComponent } from "./AddLectureComponent";
import { useCourse } from "./CourseProvider";
import { DragAndDropList } from "./DragAndDropList";
import { LectureComponent } from "./LectureComponent";
import { LectureProvider } from "./LectureProvider";
import { SectionComponent } from "./SectionComponent";
import { SectionDragAndDropList } from "./SectionDragAndDropList";
import { SectionProvider, useSection } from "./SectionProvider";

export const Curriculum = () => {
  const [displayAddLecture, setDisplayAddLecture] = useState<boolean>(false);
  const { course, saveLecture } = useCourse();

  const handleSaveLecture = (lecture: any) => {
    saveLecture(lecture);
    setDisplayAddLecture(false);
  };

  const sortedLectures = [...(course?.lectures || [])].sort(
    (a, b) => a.order - b.order
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
        {sortedLectures.map((lecture) => {
          const sortedSections = [...(lecture?.sections || [])].sort(
            (a, b) => a.order - b.order
          );
          return (
            <LectureProvider key={lecture.id} lecture={lecture}>
              <LectureComponent>
                <SectionDragAndDropList>
                  {sortedSections?.map((section) => (
                    <SectionProvider key={section.id} section={section}>
                      <SortabelSection />
                    </SectionProvider>
                  ))}
                </SectionDragAndDropList>
              </LectureComponent>
            </LectureProvider>
          );
        })}
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

const SortabelSection = () => {
  const { section } = useSection();
  const { setNodeRef, transform, transition } = useSortable({
    id: section.id || "",
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "0px",
    margin: "5px 0",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <SectionComponent />
    </div>
  );
};
