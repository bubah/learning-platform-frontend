import {
  Box,
  Button,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { CourseOverViewEdit } from "../../components/instructor/CourseOverViewEdit";
import { Curriculum } from "../../components/instructor/Curriculum";
import { EditCourse } from "../../components/instructor/EditCourse";
import { useCourse } from "../../hooks/CourseProvider";
import DropDownMenu from "../../components/instructor/DropDownMenu";

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
  const isMobile = useMediaQuery("(max-width:900px)");
  const labels = ["Course Overview", "Edit Course", "Curriculum"];

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {!isMobile ? (
        <Box sx={{ display: "flex", paddingLeft: 2 }}>
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
              alignItems: "flex-start",
            }}
          >
            {labels.map((label, index) => (
              <Tab
                key={index}
                label={label}
                sx={{ alignItems: "flex-start" }}
              />
            ))}
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
      ) : (
        <>
          <DropDownMenu
            onChange={handleChange}
            items={labels}
            selected={value}
          />
          <Box sx={{ p: 2 }}>
            {!isLoading && value === 0 && <CourseOverViewEdit />}
            {!isLoading && value === 1 && <EditCourse />}
            {!isLoading && value === 2 && <Curriculum />}
          </Box>
        </>
      )}
    </>
  );
}
