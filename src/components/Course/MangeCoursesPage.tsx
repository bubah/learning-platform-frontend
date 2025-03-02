import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Curriculum } from "./Curriculum";
import { EditCourse } from "./EditCourse";
import { CourseProvider } from "./CourseProvider";
import { SectionProvider } from "./SectionProvider";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CourseManagementScreen() {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <CourseProvider>
      <Box display={"flex"} sx={{ display: "flex", paddingLeft: 2 }}>
        <Tabs
          aria-label="Vertical tabs"
          orientation="vertical"
          value={value}
          onChange={handleChange}
          sx={{
            minWidth: 300,
            height: "100vh",
            borderRight: 1,
            borderColor: "divider",
          }}
        >
          <Tab label="Edit Course" />
          <Tab label="Curriculum" />
          <Tab label="Course Overview" />
        </Tabs>
        <Box sx={{ flexGrow: 1 }}>
          <TabPanel value={value} index={0}>
            <EditCourse />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Curriculum />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <b>Third</b> tab panel
          </TabPanel>
        </Box>
      </Box>
    </CourseProvider>
  );
}
