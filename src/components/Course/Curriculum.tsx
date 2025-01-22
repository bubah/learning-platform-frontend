import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Course, Lecture, mockCourse } from "../../mock-data/course";
import { LectureProvider } from "./LectureProvider";
import { SectionComponent } from "./SectionComponent";

export const Curriculum = () => {
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [displayAddLecture, setDisplayAddLecture] = useState<boolean>(false);
  const [newlyAddedLecture, setNewlyAddedLecture] = useState<
    Lecture | undefined
  >(undefined);

  useEffect(() => {
    // Fetch course data from the server
    setCourse(mockCourse);
  }, []);

  const handleAddLecture = useCallback((): void => {
    setCourse((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        lectures: [
          ...prevState.lectures,
          {
            title: "",
            description: "",
            sections: [{ title: "", description: "" }],
          },
        ],
      };
    });
  }, [course]);

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
                sections: [...lecture.sections, { title: "", description: "" }],
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

  const saveLecture = useCallback(() => {
    // Call the API to save the lecture
    // POST /courses/{course_id}/lectures
    setDisplayAddLecture(false);
    console.log("Before saving lecture...", newlyAddedLecture);
    // TODO: Remove Next line and call the API to save the lecture
    setCourse((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        lectures: [
          ...prevState.lectures,
          newlyAddedLecture!,
        ],
      };
    });
    setNewlyAddedLecture(undefined);
    console.log("Saving lecture...");
    // console.log(`/courses/${course?.id}/lectures`, course);
  }, [newlyAddedLecture]);

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
      {course?.lectures.map((lecture, index) => (
        <Accordion key={`lecture-${index}`}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">{lecture.title || "---"}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <LectureProvider
              courseId={"course.id"}
              key={`lecture-${index}`}
              title={lecture.title}
              description={lecture.description}
            >
              {lecture.sections.map((section, sectionIndex) => (
                <SectionComponent
                  key={`section-${sectionIndex}`}
                  title={section.title}
                  description={section.description}
                  lectureId={"lecture.id"}
                />
              ))}
              <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <Button onClick={() => handleAddSection(index)}>
                  Add Section
                </Button>
              </Box>
              <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <Button onClick={() => saveLecture()}>Save Lecture</Button>
              </Box>
            </LectureProvider>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Button onClick={() => setDisplayAddLecture(true)}>Add Lecture</Button>
      </Box>

      {displayAddLecture && (
        <Card sx={{ textAlign: "center", marginTop: 2, padding: 2 }}>
          <TextField
            fullWidth
            label="Add Lecture title"
            value={newlyAddedLecture?.title}
            onChange={(e) => {
              console.log("Newly added lecture title: ", newlyAddedLecture, e.target.value);
              setNewlyAddedLecture((prevState) => {
                if (!prevState) return { title: e.target.value, description: "", sections: [] };  
                return { ...prevState, title: e.target.value };
              });
            }}
          />
          <Button onClick={() => saveLecture()}>Save</Button>
        </Card>
      )}
    </Box>
  );
};
