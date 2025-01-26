import { createContext, useState } from "react";
import { memo } from "react";
import {
  Box,
  Button,
  Card,
  Icon,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";
import UpdateAttributeFeild from "./UpdateAttributeFied";

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
    courseId,
    description,
    title,
  }: {
    children: React.ReactNode;
    courseId: string;
    description: string;
    title: string;
  }) => {
    const [lectureState, setLectureState] = useState<{
      title: string;
      description: string;
    }>({ title, description });
    const [enableEdit, setEnableEdit] = useState(false);
    const [isAddingTitle, setIsAddingTitle] = useState(false);
    const [isAddingDescription, setIsAddingDescription] = useState(false);

    const updateTitle = (value: string) => {
      console.log("Updating title to: ", value);
    };

    const updateDescription = (value: string) => {
      console.log("Updating description to: ", value);
    };

    return (
      <LectureContext.Provider value={{}}>
        <Card
          variant="outlined"
          sx={{ padding: "1rem", textAlign: "left", marginBottom: 5 }}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box flexGrow={1}>
                <UpdateAttributeFeild
                  attributeValue={lectureState.title}
                  inEditing={isAddingTitle}
                  handleUpdate={updateTitle}
                  label="Title"
                />
               
              {lectureState.description || isAddingDescription ? (
                <UpdateAttributeFeild
                  attributeValue={lectureState.description}
                  inEditing={isAddingDescription}
                  handleUpdate={updateDescription}
                  label="Description"
                />
              ) : (
                <Button
                  variant="outlined"
                  sx={{ display: "block" }}
                  onClick={() => setIsAddingDescription(true)}
                >
                  add description
                </Button>
              )}
            </Box>
          </Box>
          {children}
        </Card>
      </LectureContext.Provider>
    );
  }
);
