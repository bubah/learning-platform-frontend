import { Box, Button, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Lecture, mockCourse } from "../../mock-data/course";
import { LectureProvider } from "./LectureProvider";
import { SectionComponent } from "./SectionComponent";

export const Curriculum = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);

  useEffect(() => {
    setLectures(mockCourse.lectures);
  }, []);

  const handleAddLecture = useCallback((): void => {
    setLectures((prevState) => {
      return [
        ...prevState,
        {
          title: "",
          description: "",
          sections: [{ title: "", description: "" }],
        },
      ];
    });
  }, [lectures]);

  const handleAddSection = useCallback(
    (lectureIndex: number): void => {
      setLectures((prevState) => {
        return prevState.map((lecture, index) => {
          if (index === lectureIndex) {
            return {
              ...lecture,
              sections: [...lecture.sections, { title: "", description: "" }],
            };
          }
          return lecture;
        });
      });
    },
    [lectures]
  );

  console.log("lectures", lectures);

  return (
    <Box
      sx={{
        width: "50%",
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
      {lectures.map((lecture, index) => (
        <LectureProvider
          key={`${index}-${lecture.title}`}
          title={lecture.title}
          description={lecture.description}
        >
          {lecture.sections.map((section, sectionIndex) => (
            <SectionComponent
              key={`${index}-${sectionIndex}`}
              title={section.title}
              description={section.description}
            />
          ))}
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Button onClick={() => handleAddSection(index)}>Add Section</Button>
          </Box>
        </LectureProvider>
      ))}
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Button onClick={() => handleAddLecture()}>Add Lecture</Button>
      </Box>
    </Box>
  );
};
