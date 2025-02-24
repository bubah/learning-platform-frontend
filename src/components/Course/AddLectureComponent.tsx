import { Card, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { Description } from "@mui/icons-material";
import { Lecture, Section } from "../../types/types";

export const AddLectureComponent = <T extends Lecture | Section>({
  onCancel,
  saveItem,
}: {
  onCancel: () => void;
  saveItem: (item: T) => void;
}) => {
  const [item, setItem] = useState<T>({
    title: "",
    description: "",
    id: null,
    order: -1,
  } as T);

  const createItem = () => {
    console.log("Printing item", item);
    saveItem(item);
  };

  return (
    <Card sx={{ textAlign: "center", marginTop: 2, padding: 2 }}>
      <TextField
        fullWidth
        label="Add title"
        value={item?.title ?? ""}
        onChange={(e) => {
          setItem((prevState: T) => {
            return {
              ...prevState,
              title: e.target.value,
            };
          });
        }}
      />
      <TextField
        fullWidth
        label="Add description"
        value={item?.description ?? ""}
        onChange={(e) => {
          setItem((prevState: T) => {
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
        <Button onClick={createItem} variant="contained" fullWidth>
          Save
        </Button>
        <Button onClick={onCancel} variant="outlined" fullWidth>
          Cancel
        </Button>
      </Box>
    </Card>
  );
};
