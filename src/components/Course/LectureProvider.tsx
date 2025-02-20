import { useSortable } from "@dnd-kit/sortable";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import { createContext, memo, useState } from "react";
import UpdateAttributeFeild from "./UpdateAttributeFied";
import { Lecture } from "../../types/types";

const LectureContext = createContext({});

export const useLecture = () => {
  const context = LectureContext;
  if (!context) {
    throw new Error("useLecture must be used within a LectureProvider");
  }
  return context;
};

export const LectureProvider = memo(
  ({ children, lecture }: { children: React.ReactNode; lecture: Lecture }) => {
    const { attributes, listeners } = useSortable({ id: lecture.id });
    const [lectureTitle, setLectureTitle] = useState<string>(lecture.title);
    const [lectureDescription, setLectureDescription] = useState<string>(
      lecture.description
    );

    const [isAddingTitle] = useState(false);
    const [isAddingDescription] = useState(false);

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
            <Box
              sx={{
                display: "flex",
                alignItems: "center", // ✅ Vertically center items
                justifyContent: "flex-start", // ✅ Align items to the start (left)
                width: "100%",
                gap: 1, // ✅ Adds space between the icon and text
              }}
            >
              <Box display="flex" alignItems="center">
                <IconButton {...attributes} {...listeners}>
                  <DragIndicatorIcon />
                </IconButton>
              </Box>
              <Typography component="span">{lectureTitle || "---"}</Typography>
            </Box>
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
