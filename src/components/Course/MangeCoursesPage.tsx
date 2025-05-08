import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Curriculum } from "./Curriculum";
import { EditCourse } from "./EditCourse";
import { useCourse } from "./CourseProvider";
import { CourseOverViewEdit } from "./CourseOverViewEdit";

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
  const { isLoading } = useCourse();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
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
        <Tab label="Course Overview" />
        <Tab label="Edit Course" />
        <Tab label="Curriculum" />
      </Tabs>
      {!isLoading && (
        <Box sx={{ flexGrow: 1 }}>
          <TabPanel value={value} index={0}>
            <CourseOverViewEdit />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EditCourse />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Curriculum />
          </TabPanel>
        </Box>
      )}
    </Box>
  );
}
