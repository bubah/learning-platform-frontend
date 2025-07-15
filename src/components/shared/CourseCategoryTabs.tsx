// src/components/CourseCategoryTabs.tsx
import { Box, Tab, Tabs } from "@mui/material";
import { categories } from "../../data/courseData";

interface Props {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const CourseCategoryTabs = ({
  activeCategory,
  setActiveCategory,
}: Props) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto" }}>
      <Tabs
        value={activeCategory}
        onChange={(_e, newValue) => setActiveCategory(newValue)}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {categories.map((cat) => (
          <Tab key={cat} label={cat} value={cat} sx={{ fontWeight: 600 }} />
        ))}
      </Tabs>
    </Box>
  );
};
