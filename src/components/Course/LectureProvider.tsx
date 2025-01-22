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

    return (
      <LectureContext.Provider value={{}}>
        <Card
          variant="outlined"
          sx={{ padding: "1rem", textAlign: "left", marginBottom: 5 }}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box flexGrow={1}>
              <TextField
                fullWidth
                disabled={!enableEdit}
                label="Title"
                value={lectureState.title}
                onChange={(e) =>
                  setLectureState((prevState) => ({
                    ...prevState,
                    title: e.target.value,
                  }))
                }
                sx={{ display: "block", marginBottom: 2 }}
              />
              <TextField
                disabled={!enableEdit}
                fullWidth
                label="Description"
                value={lectureState.description}
                onChange={(e) =>
                  setLectureState((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                  }))
                }
                sx={{ display: "block", marginBottom: 2 }}
              />
            </Box>
            <Box display="flex" flexDirection={"column"}>
              <IconButton onClick={() => setEnableEdit(!enableEdit)}>
                <EditIcon>Edit</EditIcon>
              </IconButton>
              <IconButton>
                <Delete>Delete</Delete>
              </IconButton>
            </Box>
          </Box>
          {children}
        </Card>
      </LectureContext.Provider>
    );
  }
);
