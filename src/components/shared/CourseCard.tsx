// src/components/CourseCard.tsx
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";

interface Course {
  title: string;
  instructor: string;
  price: string;
  image: string;
}

export const CourseCard = ({ course }: { course: Course }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="250"
        image={course.image}
        alt={course.title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="subtitle1" fontWeight={700}>
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Instructor: {course.instructor}
        </Typography>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
          {course.price}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              position: "relative",
              overflow: "hidden",
              "&::after": {
                content: '""',
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "0%",
                height: "3px",
                backgroundColor: "#FFD700",
                transition: "width 0.3s ease",
              },
              "&:hover::after": {
                width: "100%",
              },
            }}
          >
            Learn More
          </Button>
          <Button
            fullWidth
            variant="contained"
            size="small"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{
              transition: "all 0.3s ease",
              backgroundColor: hovered ? "#D4AF37" : "primary.main",
              color: hovered ? "#0B3D2E" : "#fff",
              fontWeight: hovered ? "bold" : "normal",
            }}
          >
            {hovered ? course.price : "Purchase Now"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
