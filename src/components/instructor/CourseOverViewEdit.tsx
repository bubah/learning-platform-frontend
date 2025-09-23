import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { httpClient } from "../../clients/httpClient";
import { useCourse } from "../../hooks/CourseProvider";

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
    <Card
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100",
        margin: "auto",
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: (theme) => theme.palette.background.default,
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

      <Typography variant="h5" color="textSecondary">
        Course Image
      </Typography>
      <Card
        sx={{ padding: 2, border: "1px dashed #ccc", width: 200, height: 200 }}
      ></Card>
      <input type="file" name="courseImage" accept="image/*" />

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Card>
  );
};
