import { Card, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { Lecture } from "../../mock-data/course";

export const AddLectureComponent = ({ onCancel }: { onCancel: () => void }) => {
  const [lecture, setLecture] = useState<Lecture | undefined>(undefined);

  const saveLecture = () => {
    // API Call
    console.log("Saving new lecture", lecture);
  };

  return (
    <Card sx={{ textAlign: "center", marginTop: 2, padding: 2 }}>
      <TextField
        fullWidth
        label="Add Lecture title"
        value={lecture?.title ?? ""}
        onChange={(e) => {
          setLecture({
            title: e.target.value,
            description: "",
            sections: [],
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
        <Button onClick={saveLecture} variant="contained" fullWidth>
          Save
        </Button>
        <Button onClick={onCancel} variant="outlined" fullWidth>
          Cancel
        </Button>
      </Box>
    </Card>
  );
};
