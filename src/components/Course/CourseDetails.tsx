import { Box, Tabs, Tab } from "@mui/material";
import Card from "@mui/material/Card/Card";
import { useState } from "react";
import { CourseContent } from "./CourseContent";
import { Lecture, Section } from "../../mock-data/course";

const tabs = ["OVERVIEW", "NOTES", "Q/A"];

export const CourseDetails = ({
  isMobileView,
  lectures,
}: {
  isMobileView: boolean;
  lectures: Lecture[];
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  return (
    <Card sx={{ marginTop: 2, padding: 2, minHeight: 480 }}>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          {isMobileView && <Tab label="COURSE CONTENT" />}
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab} />
          ))}
        </Tabs>
        {isMobileView && activeTab === 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              width: "100%",
            }}
          >
            <CourseContent lectures={lectures} />
          </Box>
        )}
        {activeTab === (isMobileView ? 1 : 0) && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 200,
              backgroundColor: "#fff",
            }}
          >
            OVERVIEW
          </Box>
        )}
        {activeTab === (isMobileView ? 2 : 1) && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 200,
              backgroundColor: "#fff",
            }}
          >
            NOTES
          </Box>
        )}
        {activeTab === (isMobileView ? 3 : 2) && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 200,
              backgroundColor: "#fff",
            }}
          >
            Q/A
          </Box>
        )}
      </Box>
    </Card>
  );
};
