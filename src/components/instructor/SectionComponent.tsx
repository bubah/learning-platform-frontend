import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
} from "@mui/material";
import { useRef, useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { memo } from "react";
import { useSection } from "../../hooks/SectionProvider";
import UpdateAttributeFeild from "../shared/UpdateAttributeFied";
import CourseUploadProgress from "./CourseUploadProgress";
import VideoUploadInput from "./VideoUploadInput";

export const SectionComponent = memo(() => {
  const { section } = useSection();
  const { title, description, id } = section;
  const { attributes, listeners } = useSortable({ id: id || "" });
  const { onDeleteSection } = useSection();

  const [sectionState] = useState<{
    title: string;
    description: string;
  }>({ title, description });

  const handleSaveV2 = (value: string) => {
    console.log("Printing value", value);
  };

  return (
    <Box>
      <Card
        sx={{
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
              label="Title"
              handleUpdate={handleSaveV2}
            />

            <UpdateAttributeFeild
              attributeValue={sectionState.description}
              label="Description"
              handleUpdate={handleSaveV2}
            />
            <VideoUploadInput />
            <CourseUploadProgress />
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
                  console.log("section id ", id);
                  onDeleteSection(id!);
                }}
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
