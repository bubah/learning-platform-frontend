import { useSortable } from "@dnd-kit/sortable";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  IconButton,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { AddLectureComponent } from "./AddLectureComponent";
import { httpClient } from "../../clients/httpClient";
import { useCourse } from "../../hooks/CourseProvider";
import { useLecture } from "../../hooks/LectureProvider";
import { LectureDTO } from "../../types/dtos";
import { Section } from "../../types/types";
import { convertToLecture } from "../../utils/incoming-request";
import UpdateAttributeFeild from "../shared/UpdateAttributeFied";

export const LectureComponent = ({ children }: { children: ReactNode }) => {
  const { deleteLecture, saveSection } = useCourse();
  const [displayAddSection, setDisplayAddSection] = useState(false);

  const handleSaveSection = (section: Section) => {
    saveSection({ ...section, lectureId: lecture.id || "" });
    setDisplayAddSection(false);
  };

  const { lecture } = useLecture();
  const { attributes, listeners } = useSortable({ id: lecture.id || "" });
  const [lectureTitle, setLectureTitle] = useState<string>(lecture.title);
  const [lectureDescription, setLectureDescription] = useState<string>(
    lecture.description,
  );

  const updateTitle = (value: string) => {
    console.log("Updating title to: ", value);
    const requestBody = { title: value };
    httpClient
      .put<LectureDTO>(`/lectures/${lecture.id}`, requestBody)
      .then((res) => {
        const { title } = convertToLecture(res.data);
        setLectureTitle(title);
      });
  };

  const updateDescription = (value: string) => {
    console.log("Updating description to: ", value);
    const requestBody = { description: value };
    httpClient
      .put<LectureDTO>(`/lectures/${lecture.id}`, requestBody)
      .then((res) => {
        const { description } = convertToLecture(res.data);
        setLectureDescription(description);
      });
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center", // ✅ Vertically center itemsg
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
                handleUpdate={updateTitle}
                label="Title"
              />

              <UpdateAttributeFeild
                attributeValue={lectureDescription}
                handleUpdate={updateDescription}
                label="Description"
              />
            </Box>
          </Box>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            {children}
            <Box sx={{ marginTop: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setDisplayAddSection(true)}
              >
                Add Section
              </Button>
            </Box>
            {displayAddSection && (
              <AddLectureComponent<Section>
                saveItem={(item) => {
                  console.log("here", item);
                  handleSaveSection(item);
                }}
                onCancel={() => setDisplayAddSection(false)}
              />
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Button>Save Lecture</Button>
            </Box>
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Button
                onClick={() => deleteLecture(lecture.id || "")}
                sx={{ backgroundColor: "red", color: "white" }}
              >
                Delete Lecture
              </Button>
            </Box>
          </Box>
          {/* {children}  this is part of refactor will be deleted if refactor works properly  */}
        </Card>
      </AccordionDetails>
    </Accordion>
  );
};
