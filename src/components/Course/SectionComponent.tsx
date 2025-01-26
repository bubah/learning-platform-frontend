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
import UpdateAttributeFeild from "./UpdateAttributeFied";

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
    const [isAddingTitle, setIsAddingTitle] = useState(false);
    const [isAddingDescription, setIsAddingDescription] = useState(false);

    const handleSaveV2 = (value: string) => {
      console.log("Printing value", value);
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
            <UpdateAttributeFeild
              attributeValue={sectionState.title}
              inEditing={isAddingTitle}
              label="Title"
              handleUpdate={handleSaveV2}
            />

            <UpdateAttributeFeild
              attributeValue={sectionState.description}
              inEditing={isAddingDescription}
              label="Description"
              handleUpdate={handleSaveV2}
            />

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
            <Button size="small" variant="outlined" onClick={() => {}}>
              cancel
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  }
);
