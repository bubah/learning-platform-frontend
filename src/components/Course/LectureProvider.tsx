import { createContext, ReactNode, useContext } from "react";
import { Lecture } from "../../types/types";

type LectureContextType = {
  lecture: Lecture;
  //   saveLecture: (lecture: Lecture) => void;
  //   deleteLecture: (id: string) => void;
};

const LectureContext = createContext({} as LectureContextType);

export const useLecture = () => {
  const context = useContext(LectureContext);
  if (!context) {
    throw new Error("useLecture must be used within a LectureProvider");
  }
  return context;
};

export const LectureProvider = ({
  children,
  lecture,
}: {
  children: ReactNode;
  lecture: Lecture;
}) => {
  return (
    <LectureContext.Provider value={{ lecture }}>
      {children}
    </LectureContext.Provider>
  );
};
