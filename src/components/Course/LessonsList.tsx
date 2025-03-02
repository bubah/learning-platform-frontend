import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  AccordionProps,
  AccordionSummary,
  Box,
  Checkbox,
  styled,
  Typography,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Lecture } from "../../types/types";

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

export const LessonsList = ({ lectures }: { lectures: Lecture[] }) => {
  return (
    <Box
      sx={{
        height: "100%",
        maxHeight: 480,
        backgroundColor: "#fff",
        overflow: "auto",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          backgroundColor: "#fff",
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          color: "black",
          height: 36,
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <Typography component="span">Course Content</Typography>
      </Box>
      {lectures.map((lecture) => (
        <Accordion key={lecture.title}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">{lecture.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ textAlign: "left" }}>
              {lecture?.sections?.map((lesson, idx) => (
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
  );
};
