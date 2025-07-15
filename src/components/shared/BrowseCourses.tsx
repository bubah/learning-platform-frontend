import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import { courseData } from "../../data/courseData";
import { CourseCard } from "./CourseCard";
import { CourseCategoryTabs } from "./CourseCategoryTabs";

export const BrowseCourses = () => {
  const [activeCategory, setActiveCategory] = useState("Quranic Studies");

  return (
    <Container maxWidth="xl">
      <Box sx={{ px: { xs: 2 }, py: 6 }}>
        <Typography variant="h4" fontWeight={700} textAlign="left" gutterBottom>
          Explore Islamic Knowledge
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="left"
          color="text.secondary"
          mb={4}
        >
          Browse diverse subjects and deepen your understanding
        </Typography>

        <CourseCategoryTabs
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
            mt: 4,
          }}
        >
          {courseData[activeCategory]?.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};
