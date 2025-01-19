import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import { useState } from "react";

import { memo } from "react";

export const SectionComponent = memo(
  ({
    description,
    lectureId,
    title,
  }: {
    description: string;
    lectureId: string;
    title: string;
  }) => {
    const [sectionState, setSectionState] = useState<{
      title: string;
      description: string;
    }>({ title, description });

    const handleChange = (field: string, value: string) => {
      setSectionState((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    };

    const handleSave = () => {
      // Call the API to save the section
      // POST /lectures/{lecture_id}/sections
      const body = {
        ...sectionState,
      };
      console.log("Saving section...");
      console.log(`/lectures/${lectureId}/sections`, body);
    };

    return (
      <Box>
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
              value={sectionState.title}
              onChange={(e) => handleChange("title", e.target.value)}
              sx={{ display: "block", marginBottom: 2 }}
            ></TextField>
            <TextField
              label="Description"
              value={sectionState.description}
              onChange={(e) => handleChange("description", e.target.value)}
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
            <Button size="small" variant="outlined" onClick={handleSave}>
              save
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  }
);
