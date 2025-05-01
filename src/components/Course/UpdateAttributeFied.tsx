import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const UpdateAttributeFeild = ({
  attributeValue,
  label,
  handleUpdate,
}: {
  attributeValue: string;

  label: string;
  handleUpdate: (value: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(attributeValue);

  const handleSave = () => {
    handleUpdate(newValue);
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        border: isEditing ? "1px solid #E5E7EB" : "none",
        borderRadius: isEditing ? "5px" : "0",
      }}
    >
      {attributeValue || isEditing ? (
        <Box padding={1}>
          {!isEditing ? (
            <Box
              sx={{
                height: 10,
                display: "flex",
                justifyContent: "space-between",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography fontWeight="bold">{attributeValue}</Typography>
              <Button variant="outlined" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            </Box>
          ) : (
            <Box justifyContent={"center"} alignItems={"center"}>
              <TextField
                id="courseTitle"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                label={label}
                placeholder="Enter new course title"
                fullWidth
                sx={{
                  marginBottom: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#E5E7EB",
                    },
                    "&:hover fieldset": {
                      borderColor: "gray",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "gray",
                    },
                  },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  width: 200,
                  margin: "0 auto",
                }}
              >
                <Button variant="contained" onClick={handleSave} fullWidth>
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                  fullWidth
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Button
          variant="outlined"
          sx={{ display: "block", marginTop: 2 }}
          onClick={() => setIsEditing(true)}
        >
          add {label}
        </Button>
      )}
    </Box>
  );
};

export default UpdateAttributeFeild;
