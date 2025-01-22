import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { EditCourse } from "./EditCourse";
import { Curriculum } from "./Curriculum";

export default function CourseManagementScreen() {
  return (
    <Tabs
      aria-label="Vertical tabs"
      orientation="vertical"
      sx={{ minWidth: 300, height: "100vh" }}
    >
      <TabList sx={{ minWidth: 300 }}>
        <Tab>Edit Course</Tab>
        <Tab>Second tabsge</Tab>
        <Tab>Third tab</Tab>
      </TabList>
      <TabPanel value={0}>
        <EditCourse />
      </TabPanel>
      <TabPanel value={1}>
        <Curriculum />
      </TabPanel>
      <TabPanel value={2}>
        <b>Third</b> tab panel
      </TabPanel>
    </Tabs>
  );
}
