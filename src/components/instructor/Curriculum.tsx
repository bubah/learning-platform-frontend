import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Button, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import { useCourse } from "../../hooks/CourseProvider";
import { LectureProvider } from "../../hooks/LectureProvider";
import { SectionProvider, useSection } from "../../hooks/SectionProvider";
import { Lecture } from "../../types/types";
import { AddLectureComponent } from "./AddLectureComponent";
import { DragAndDropList } from "./DragAndDropList";
import { LectureComponent } from "./LectureComponent";
import { SectionComponent } from "./SectionComponent";
import { SectionDragAndDropList } from "./SectionDragAndDropList";
import ResumeUploadProvider from "../../hooks/ResumeUploadProvider";

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
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 800,
        margin: "auto",
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Typography color="black" variant="h3">
        Course: {course?.title}
      </Typography>

      <DragAndDropList>
        {sortedLectures.map((lecture) => {
          const sortedSections = [...(lecture?.sections || [])].sort(
            (a, b) => a.order - b.order,
          );
          return (
            <LectureProvider key={lecture.id} lecture={lecture}>
              <LectureComponent>
                <SectionDragAndDropList>
                  {sortedSections?.map((section) => (
                    <ResumeUploadProvider key={section.id} section={section}>
                      <SectionProvider key={section.id} section={section}>
                        <SortabelSection>
                          <SectionComponent />
                        </SortabelSection>
                      </SectionProvider>
                    </ResumeUploadProvider>
                  ))}
                </SectionDragAndDropList>
              </LectureComponent>
            </LectureProvider>
          );
        })}
      </DragAndDropList>

      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Button onClick={() => setDisplayAddLecture(true)} variant="outlined">
          + Add Lecture
        </Button>
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

const SortabelSection = ({ children }: { children: ReactNode }) => {
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
      {children}
    </div>
  );
};
