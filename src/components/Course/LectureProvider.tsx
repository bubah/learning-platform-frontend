import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Typography,
} from "@mui/material";
import axios from "axios";
import { createContext, memo, useState } from "react";
import UpdateAttributeFeild from "./UpdateAttributeFied";
import { Lecture } from "../../mock-data/course";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const LectureContext = createContext({});

export const useLecture = () => {
  const context = LectureContext;
  if (!context) {
    throw new Error("useLecture must be used within a LectureProvider");
  }
  return context;
};

export const LectureProvider = memo(
  ({
    children,
    // description,
    // title,
    // id,
    lecture,
  }: {
    children: React.ReactNode;
    // description: string;
    // title: string;
    // id:string
    lecture: Lecture;
  }) => {
    const [lectureTitle, setLectureTitle] = useState<string>(lecture.title);
    const [lectureDescription, setLectureDescription] =
      useState<string>(lecture.description);

    const [enableEdit, setEnableEdit] = useState(false);
    const [isAddingTitle, setIsAddingTitle] = useState(false);
    const [isAddingDescription, setIsAddingDescription] = useState(false);

    const updateTitle = (value: string) => {
      console.log("Updating title to: ", value);
      const requestBody = { title: value };
      axios
        .put(`http://localhost:8080/lectures/${lecture.id}`, requestBody)
        .then((res) => {
          const { data } = res;
          setLectureTitle(data.title);
        });
    };

    const updateDescription = (value: string) => {
      console.log("Updating description to: ", value);
      const requestBody = { description: value };
      axios
        .put(`http://localhost:8080/lectures/${lecture.id}`, requestBody)
        .then((res: any) => {
          const { data } = res;
          setLectureDescription(data.description);
        });
    };

    return (
      <LectureContext.Provider value={{}}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">{lectureTitle || "---"}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card
              variant="outlined"
              sx={{ padding: "1rem", textAlign: "left", marginBottom: 5 }}
            >
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box flexGrow={1}>
                  <UpdateAttributeFeild
                    attributeValue={lectureTitle}
                    inEditing={isAddingTitle}
                    handleUpdate={updateTitle}
                    label="Title"
                  />

                  <UpdateAttributeFeild
                    attributeValue={lectureDescription}
                    inEditing={isAddingDescription}
                    handleUpdate={updateDescription}
                    label="Description"
                  />
                </Box>
              </Box>
              {children}
            </Card>
          </AccordionDetails>
        </Accordion>
      </LectureContext.Provider>
    );
  }
);
