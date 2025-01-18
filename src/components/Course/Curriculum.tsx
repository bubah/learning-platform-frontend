import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  CardContent,
  CardActions,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Course, Lecture, mockCourse, Section } from "../../mock-data/course";
import { on } from "video.js/dist/types/utils/events";

const emptyLecture = [
  {
    title: "",
    description: "",
    sections: [
      {
        title: "",
        description: "",
        video: "",
      },
    ],
  },
];

type Lectures = {
  [key: number]: {
    title: string;
    description: string;
    sections: {
      [key: number]: Section;
    };
  };
};

export const Curriculum = () => {
  const [lectures, setLectures] = useState<Lectures>({});

  useEffect(() => {
    const updatedLectures: Lectures = {};
    mockCourse.lectures.forEach((lecture, index) => {
      updatedLectures[index] = {
        title: lecture.title,
        description: lecture.description,
        sections: {},
      };
      lecture.sections.forEach((section, sectionIndex) => {
        updatedLectures[index].sections[sectionIndex] = section;
      });
    });

    setLectures(updatedLectures);
  }, []);

  const handleSectionChange = useCallback((index: number, field: string, value: string) => {
    setLectures((prevLectures) => ({
      ...prevLectures,
      [index]: {
        ...prevLectures[index],
        [field]: value,
      },
    }));
  }, []);

  const handleSave = (lectureIndex: number | string, sectionIndex: number | string) => {
    if (
      lectures[lectureIndex as number] &&
      lectures[lectureIndex as number].sections[sectionIndex as number]
    ) {
      console.log(
        "section exists",
        lectures[lectureIndex as number].sections[sectionIndex as number]
      );
    }
  };

  function handleAddLecture(): void {
    const newLectures = { ...lectures };
    newLectures[Object.keys(lectures).length] = {
      title: "",
      description: "",
      sections: {
        0: {
          title: "",
          description: ""        },
      },
    };
    setLectures(newLectures);
  }

  function handleAddSection(lectureIndex: number | string): void {
    const newLectures = { ...lectures };
    const sections = newLectures[lectureIndex as number].sections;
    const newSectionIndex = Object.keys(sections).length;
    sections[newSectionIndex] = {
      title: "",
      description: "",
    };
    setLectures(newLectures);
  }

  const handleChange = (
    lectureIndex: number,
    sectionIndex: number,
    field: string,
    value: string
  ) => {
    const newLectures = { ...lectures };
    newLectures[lectureIndex].sections[sectionIndex] = {
      ...newLectures[lectureIndex].sections[sectionIndex],
      [field]: value,
    };
    setLectures(newLectures);
  };

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
      {Object.entries(lectures).map(([index, lecture]) => (
        <Card
          key={index}
          variant="outlined"
          sx={{ padding: "1rem", textAlign: "left", marginBottom: 5 }}
        >
          {lecture?.title}
          <Typography>Sections:</Typography>
          {Object.entries(lecture.sections).map(([sectionIndex, section]) => (
            <Box key={sectionIndex}>
              <Card
                sx={{
                  padding: "1rem",
                  textAlign: "left",
                  backgroundColor: "#f2f2f2",
                  marginBottom: 2,
                }}
              >
                <CardContent>
                  <TextField
                    label="Title"
                    value={section.title}
                    onChange={(e) => handleChange(Number(index), Number(sectionIndex), "title", e.target.value)}
                    sx={{ display: "block", marginBottom: 2 }}
                  ></TextField>
                  <TextField
                    label="Description"
                    value={section.description}
                    onChange={(e) => handleChange(Number(index), Number(sectionIndex), "description", e.target.value)}
                    sx={{ display: "block", marginBottom: 2 }}
                  ></TextField>
                  <TextField
                    type="file"
                    sx={{ display: "block", marginBottom: 2 }}
                    slotProps={{
                      htmlInput: {
                        accept: "video/*",
                      },
                    }}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleSave(index, sectionIndex)}
                  >
                    save
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Button onClick={() => handleAddSection(index)}>Add Section</Button>
          </Box>
        </Card>
      ))}
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Button onClick={handleAddLecture}>Add Lecture</Button>
      </Box>
    </Box>
  );
};
