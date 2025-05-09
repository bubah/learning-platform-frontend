import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useCourse } from "./CourseProvider";
import { httpClient } from "../../client/httpClient";

export const CourseOverViewEdit = () => {
  const { course } = useCourse();

  const [formData, setFormData] = useState({
    title: course?.title,
    description: course?.description || "",
    category: course?.category,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prevFromData) => ({
      ...prevFromData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handle submit fire ", formData);
    const requestBody = formData;
    httpClient
      .patch(`/courses/${course?.id}`, requestBody)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "300px",
        margin: "auto",
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      {/* Title Input */}
      <TextField
        label="Course Title"
        name="title"
        variant="outlined"
        fullWidth
        value={formData.title}
        onChange={(e) => handleChange(e)}
      />

      {/* Category Input */}
      <TextField
        label="Category"
        name="category"
        variant="outlined"
        fullWidth
        value={formData.category}
        onChange={(e) => handleChange(e)}
      />

      <TextField
        label="Description"
        name="description"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={formData.description}
        onChange={(e) => handleChange(e)}
      />

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};
