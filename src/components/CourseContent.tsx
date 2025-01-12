import {
  AccordionSummary,
  Typography,
  Box,
  AccordionProps,
  styled,
  Checkbox,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const sections = [
  {
    title: "Introduction to React",
    description: "Learn the basics of React",
    lessons: [
      {
        title: "Lesson 1",
        description: "Introduction to JSX",
      },
      {
        title: "Lesson 2",
        description: "Components",
      },
      {
        title: "Lesson 3",
        description: "Props",
      },
      {
        title: "Lesson 4",
        description: "State",
      },
    ],
  },
  {
    title: "Introduction to TypeScript",
    description: "Learn the basics of TypeScript",
    lessons: [
      {
        title: "Lesson 1",
        description: "Introduction to TypeScript",
      },
      {
        title: "Lesson 2",
        description: "Type Annotations",
      },
      {
        title: "Lesson 3",
        description: "Interfaces",
      },
      {
        title: "Lesson 4",
        description: "Classes",
      },
    ],
  },
  {
    title: "Introduction to GraphQL",
    description: "Learn the basics of GraphQL",
    lessons: [
      {
        title: "Lesson 1",
        description: "Introduction to GraphQL",
      },
      {
        title: "Lesson 2",
        description: "Queries",
      },
      {
        title: "Lesson 3",
        description: "Mutations",
      },
      {
        title: "Lesson 4",
        description: "Subscriptions",
      },
    ],
  },
  {
    title: "Introduction to Node.js",
    description: "Learn the basics of Node.js",
    lessons: [
      {
        title: "Lesson 1",
        description: "Introduction to Node.js",
      },
      {
        title: "Lesson 2",
        description: "Modules",
      },
      {
        title: "Lesson 3",
        description: "NPM",
      },
      {
        title: "Lesson 4",
        description: "Express",
      },
    ],
  },
  {
    title: "Introduction to MongoDB",
    description: "Learn the basics of MongoDB",
    lessons: [
      {
        title: "Lesson 1",
        description: "Introduction to MongoDB",
      },
      {
        title: "Lesson 2",
        description: "CRUD Operations",
      },
      {
        title: "Lesson 3",
        description: "Indexes",
      },
      {
        title: "Lesson 4",
        description: "Aggregation",
      },
    ],
  },
  {
    title: "Introduction to Docker",
    description: "Learn the basics of Docker",
    lessons: [
      {
        title: "Lesson 1",
        description: "Introduction to Docker",
      },
      {
        title: "Lesson 2",
        description: "Containers",
      },
      {
        title: "Lesson 3",
        description: "Images",
      },
      {
        title: "Lesson 4",
        description: "Docker Compose",
      },
    ],
  },
  {
    title: "Introduction to Kubernetes",
    description: "Learn the basics of Kubernetes",
    lessons: [
      {
        title: "Lesson 1",
        description: "Introduction to Kubernetes",
      },
      {
        title: "Lesson 2",
        description: "Pods",
      },
      {
        title: "Lesson 3",
        description: "Deployments",
      },
      {
        title: "Lesson 4",
        description: "Services",
      },
    ],
  },
  {
    title: "Introduction to AWS",
    description: "Learn the basics of AWS",
    lessons: [
      {
        title: "Lesson 1",
        description: "Introduction to AWS",
      },
      {
        title: "Lesson 2",
        description: "EC2",
      },
      {
        title: "Lesson 3",
        description: "S3",
      },
    ],
  },
];

export const CourseContent = () => {
  return (
    <Box>
      <Box sx={{ marginLeft: "auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            backgroundColor: "#fff",
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            color: "black",
            height: 36,
          }}
        >
          <Typography component="span">Course Content</Typography>
        </Box>
        {sections.map((section) => (
          <Accordion key={section.title}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">{section.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ textAlign: "left" }}>
                {section.lessons.map((lesson, idx) => (
                  <Box
                    display={"flex"}
                    key={lesson.title}
                    flexWrap={"nowrap"}
                    alignItems={"center"}
                  >
                    <Checkbox />
                    <Box
                      key={lesson.title}
                      display={"flex"}
                      alignContent={"center"}
                    >
                      <Typography marginRight={1}>{idx + 1}.</Typography>
                      <Typography>{lesson.description}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};
