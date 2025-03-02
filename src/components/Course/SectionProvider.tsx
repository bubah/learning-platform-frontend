import { createContext, ReactNode, useContext } from "react";
import { useCourse } from "./CourseProvider";
import { Section } from "../../types/types";

type SectionContextType = {
  section: Section;
  onSaveSection: (section: Section) => void;
  onDeleteSection: (id: string) => void;
};

const SectionContext = createContext({} as SectionContextType);

export const useSection = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSection must be used within a SectionProvider");
  }
  return context;
};

export const SectionProvider = ({
  children,
  section,
}: {
  children: ReactNode;
  section: Section;
}) => {
  const { saveSection, deleteSection } = useCourse();

  const onSaveSection = (section: Section) => {
    console.log("save section called", section)
    saveSection(section);
  };

  const onDeleteSection = (id: string) => {
    console.log("section id at use Section :", id)
    deleteSection(id);
  };

  return (
    <SectionContext.Provider
      value={{ section, onSaveSection, onDeleteSection }}
    >
      {children}
    </SectionContext.Provider>
  );
};
