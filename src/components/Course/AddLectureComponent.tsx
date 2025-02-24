import { Card, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { Description } from "@mui/icons-material";
import { Lecture } from "../../types/types";

export const AddLectureComponent = ({
  onCancel,
  saveLecture,
}: {
  onCancel: () => void;
  saveLecture: (lecture: Lecture) => void;
}) => {
  const [lecture, setLecture] = useState<Lecture>({
    title: "",
    description: "",
    sections: [],
    id: null,
    order: -1,
  });

  const createLecture = () => {
    saveLecture(lecture);
  };

  return (
    <Card sx={{ textAlign: "center", marginTop: 2, padding: 2 }}>
      <TextField
        fullWidth
        label="Add Lecture title"
        value={lecture?.title ?? ""}
        onChange={(e) => {
          setLecture((prevState: Lecture) => {
            return {
              ...prevState,
              title: e.target.value,
            };
          });
        }}
      />
      <TextField
        fullWidth
        label="Add Lecture description"
        value={lecture?.description ?? ""}
        onChange={(e) => {
          setLecture((prevState: Lecture) => {
            return {
              ...prevState,
              description: e.target.value,
            };
          });
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          width: 200,
          marginTop: 2,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Button onClick={createLecture} variant="contained" fullWidth>
          Save
        </Button>
        <Button onClick={onCancel} variant="outlined" fullWidth>
          Cancel
        </Button>
      </Box>
    </Card>
  );
};
