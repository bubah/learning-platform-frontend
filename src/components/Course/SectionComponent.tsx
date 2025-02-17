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
import axios from "axios";

export const SectionComponent = memo(
  ({
    description,
    lectureId,
    title,
    id,
  }: {
    description: string;
    lectureId: string;
    title: string;
    id:string
  }) => {

    const[sectionTitle,setSectionTitle] = useState<string>(title);
    const[sectionDescription, setSectionDescription] = useState<string>(description);

    const [isAddingTitle, setIsAddingTitle] = useState(false);
    const [isAddingDescription, setIsAddingDescription] = useState(false);

    const updateSectionTitle = (value: string) => {
      console.log("Printing value", value);
      console.log(id);
      const requestBody = {title:value};
      axios.put(`http://localhost:8080/sections/${id}`,requestBody)
      .then((res) => {
        const {updatedTitle} = res.data.title;
        console.log(updatedTitle);
        setSectionTitle(updatedTitle);
      })
    };

    const updateSectionDescription = (value: string) => {
      console.log("Printing value", value);
      const requestBody = {description:value};
      console.log(id);
      axios.put(`http://localhost:8080/sections/${id}`,requestBody)
      .then((res) => {
        const {description} = res.data.description;
        setSectionDescription(description);
      })
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
              attributeValue={sectionTitle}
              inEditing={isAddingTitle}
              label="Title"
              handleUpdate={updateSectionTitle}
            />

            <UpdateAttributeFeild
              attributeValue={sectionDescription}
              inEditing={isAddingDescription}
              label="Description"
              handleUpdate={updateSectionDescription}
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
