import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

type Learners = {
  objectives: string[];
  prerequisites: string[];
  intendedFor: string[];
};

/**
 * EditCourse component allows instructors to edit the details of a course.
 *
 * This component provides fields for instructors to specify:
 * - Learning objectives of the course
 * - Prerequisites required for the course
 * - Intended audience for the course
 *
 * Each section allows the instructor to add multiple entries dynamically.
 *
 * @returns {JSX.Element} The EditCourse component.
 */
export const EditCourse = () => {
  const [objectives, setObjectives] = React.useState<string[]>([]);
  const [prerequisites, setPrerequisites] = React.useState<string[]>([]);
  const [intendedFor, setIntendedFor] = React.useState<string[]>([]);

  const [objectiveCounts, setObjectiveCounts] = React.useState<number>(3);
  const [prerequisiteCounts, setPrerequisiteCounts] = React.useState<number>(3);
  const [intendedForCounts, setIntendedForCounts] = React.useState<number>(3);

  const handleSave = () => {
    const learners: Learners = {
      objectives,
      prerequisites,
      intendedFor,
    };
    console.log(learners);
  };
  return (
    <Box
      sx={{
        justifyContent: "center",
        margin: "auto",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography color="black">Edit Course</Typography>

      <Card variant="outlined" sx={{ padding: "1rem", textAlign: "left" }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Typography fontWeight="bold">
              What are the learning objectives of this course?
            </Typography>

            {Array.from({ length: objectiveCounts }).map((_, index) => (
              <TextField
                key={index}
                fullWidth
                label={`Objective ${index + 1}`}
                value={objectives[index] || ""}
                slotProps={{
                  input: {
                    inputProps: {
                      maxLength: 150, // Pass maxLength to inputProps here
                    },
                  },
                }}
                onChange={(e) => {
                  const newObjectives = [...objectives];
                  newObjectives[index] = e.target.value;
                  setObjectives(newObjectives);
                }}
                sx={{ marginBottom: "1rem" }}
              />
            ))}
            <Typography
              onClick={() => setObjectiveCounts(objectiveCounts + 1)}
              sx={{ cursor: "pointer", color: "blue" }}
            >
              + add objective
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography fontWeight="bold">
              What are the prerequisites for this course?
            </Typography>
            {Array.from({ length: prerequisiteCounts }).map((_, index) => (
              <TextField
                key={index}
                fullWidth
                label={`Prerequisite ${index + 1}`}
                value={prerequisites[index] || ""}
                slotProps={{
                  input: {
                    inputProps: {
                      maxLength: 150, // Pass maxLength to inputProps here
                    },
                  },
                }}
                onChange={(e) => {
                  const newPrerequisites = [...prerequisites];
                  newPrerequisites[index] = e.target.value;
                  setPrerequisites(newPrerequisites);
                }}
                sx={{ marginBottom: "1rem" }}
              />
            ))}
            <Typography
              onClick={() => setPrerequisiteCounts(prerequisiteCounts + 1)}
              sx={{ cursor: "pointer", color: "blue" }}
            >
              + add course prerequisite
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography fontWeight="bold">
              Who is this course intended for?
            </Typography>
            {Array.from({ length: intendedForCounts }).map((_, index) => (
              <TextField
                key={index}
                fullWidth
                label={`Intended For ${index + 1}`}
                value={intendedFor[index] || ""}
                slotProps={{
                  input: {
                    inputProps: {
                      maxLength: 150, // Pass maxLength to inputProps here
                    },
                  },
                }}
                onChange={(e) => {
                  const newIntendedFor = [...intendedFor];
                  newIntendedFor[index] = e.target.value;
                  setIntendedFor(newIntendedFor);
                }}
                sx={{ marginBottom: "1rem" }}
              />
            ))}
            <Typography
              onClick={() => setIntendedForCounts(intendedForCounts + 1)}
              sx={{ cursor: "pointer", color: "blue" }}
            >
              + add intended audience
            </Typography>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Card>
    </Box>
  );
};
