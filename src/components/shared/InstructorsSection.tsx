// src/components/InstructorsSection.tsx
import { Box, Container, Typography } from "@mui/material";
import { InstructorCard } from "./InstructorCard";
import { instructors } from "../../data/instructorData";

export const InstructorsSection = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: "#fff" }}>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight="bold" textAlign={"left"} mb={1}>
          Learn from World-class Islamic Scholars
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          textAlign={"left"}
          mb={4}
        >
          Authentic knowledge from trusted instructors
        </Typography>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          gap={2}
        >
          {instructors.map((inst, i) => (
            <InstructorCard key={i} instructor={inst} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};
