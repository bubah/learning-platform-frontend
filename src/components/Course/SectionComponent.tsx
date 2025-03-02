import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  TextField,
} from "@mui/material";
import { useState } from "react";

import { memo } from "react";
import UpdateAttributeFeild from "./UpdateAttributeFied";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useSortable } from "@dnd-kit/sortable";
import { Section } from "../../types/types";
import { useSection } from "./SectionProvider";

export const SectionComponent = memo(({ section }: { section: Section }) => {
  const { title, description, id } = section;
  const { attributes, listeners } = useSortable({ id: id || "" });

  const [sectionState] = useState<{
    title: string;
    description: string;
  }>({ title, description });
  const [isAddingTitle] = useState(false);
  const [isAddingDescription] = useState(false);

  const { onDeleteSection } = useSection();

  const handleSaveV2 = (value: string) => {
    console.log("Printing value", value);
  };

  // console.log("section: ", section)

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
        <CardContent sx={{ display: "flex" }}>
          <Box marginRight="5">
            <IconButton
              sx={{ alignItems: "start" }}
              {...attributes}
              {...listeners}
            >
              <DragIndicatorIcon />
            </IconButton>
          </Box>
          <Box sx={{ width: "100%", marginLeft: "25px" }}>
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
              sx={{ display: "block", marginBottom: 2, marginTop: 2 }}
              slotProps={{
                htmlInput: {
                  accept: "video/*",
                },
              }}
            />
            <CardActions>
              <Button size="small" variant="outlined" onClick={() => {}}>
                cancel
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                // onClick={() => onDeleteSection(section.id!)}
                onClick={() => {
                  console.log("section id ", id)
                  onDeleteSection(id!)}
                }
              >
                DELETE SECTION
              </Button>
            </CardActions>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
});
