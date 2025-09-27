import {
  Box,
  Button,
  Card,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { httpClient } from "../../clients/httpClient";
import { useCourse } from "../../hooks/CourseProvider";

export const CourseOverViewEdit = () => {
  const { course } = useCourse();
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    course?.imageUrl || null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: course?.title,
    description: course?.description || "",
    category: course?.category,
  });

  const handleUploadImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
    console.log("Selected file: ", file);
  };

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

  console.log("selected file", selectedFile);

  return (
    <Card
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 800,
        margin: "auto",
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Typography variant="h5" color="textSecondary">
        Title
      </Typography>
      <TextField
        placeholder="Enter course title"
        name="title"
        variant="outlined"
        fullWidth
        value={formData.title}
        onChange={(e) => handleChange(e)}
      />

      <Typography variant="h5" color="textSecondary">
        Category
      </Typography>
      <TextField
        // label="Category"
        placeholder="e.g., Development, Business, Design"
        name="category"
        variant="outlined"
        fullWidth
        value={formData.category}
        onChange={(e) => handleChange(e)}
      />
      <Typography variant="h5" color="textSecondary">
        Description
      </Typography>
      <TextField
        placeholder="Brief description of the course"
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
      <Box display={"flex"} flexDirection="row" gap={2}>
        <Box>
          <Card
            sx={{
              // padding: 2,
              border: "1px dashed #ccc",
              width: 300,
              height: 200,
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image={previewUrl ? previewUrl : "/assets/online-learning.svg"}
              height={200}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain", // ✅ keeps aspect ratio, fits inside
                // p: 1, // optional padding for breathing room
              }}
            />
          </Card>
        </Box>
        <Box>
          <Typography variant="body2" color="textSecondary" mb={1}>
            Upload an image that represents your course. Recommended size:
            800x400 pixels. Image formats: JPG, PNG, JPEG or GIF.
          </Typography>
          {/* Hidden file input */}
          <input
            type="file"
            ref={inputRef}
            style={{ display: "none" }}
            accept=".jpg, .jpeg, .png, .gif"
            onChange={handleChangeImage}
          />
          <Button
            variant="contained"
            component="span"
            sx={{ width: 110 }}
            onClick={handleUploadImageClick}
          >
            Upload File
          </Button>
        </Box>
      </Box>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Card>
  );
};
