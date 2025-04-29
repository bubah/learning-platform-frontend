import { createContext, ReactNode, useContext } from "react";
import { Lecture } from "../../types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  const { setNodeRef, transform, transition } = useSortable({
    id: lecture?.id ?? "",
  });
  // console.log("LectureProvider", lecture);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "0px",
    margin: "5px 0",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    cursor: "grab",
  };

  return (
    <LectureContext.Provider value={{ lecture }}>
      <div ref={setNodeRef} style={style}>
        {children}
      </div>
    </LectureContext.Provider>
  );
};
