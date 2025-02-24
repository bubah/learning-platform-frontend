import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { SectionDragAndDropList } from "./SectionDragAndDropList";

import { useEffect, useState } from "react";
import { LectureDTO, ReorderResourceDTO } from "../../types/dtos";
import { Lecture } from "../../types/types";
import { LectureComponent } from "./LectureComponent";

export const DragAndDropList = ({
  courseLectures,
  id,
  deleteLecture,
}: {
  courseLectures: Lecture[];
  id: string | null;
  deleteLecture: (id: string) => void;
}) => {
  const [lectures, setLectures] = useState<Lecture[] | []>(courseLectures);

  useEffect(() => {
    setLectures(courseLectures);
  }, [courseLectures]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const pristineLectures = sortedLectures;

    const oldIndex = sortedLectures.findIndex((l) => l.id === active.id);
    const newIndex = sortedLectures.findIndex((l) => l.id === over.id);
    const updatedLectures: Lecture[] = arrayMove(
      sortedLectures,
      oldIndex,
      newIndex
    ).map((l, i) => ({
      title: l.title,
      description: l.description,
      id: l.id,
      order: i,
    }));

    setLectures(updatedLectures);

    const requestBody: ReorderResourceDTO = {
      lectures: toLectureDTO(updatedLectures),
    };

    axios
      .post(`http://localhost:8080/lecture-reorder/${id}`, requestBody)
      .catch((error) => {
        console.log(error);
        setLectures(pristineLectures);
      });
  };

  const sortedLectures = [...lectures].sort((a, b) => a.order - b.order);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={sortedLectures
          .map((l) => l.id)
          .filter((id): id is string => id !== null)}
        strategy={verticalListSortingStrategy}
      >
        {sortedLectures.map((lecture) => (
          <SortableLecture
            deleteLecture={deleteLecture}
            key={lecture.id}
            lecture={lecture}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

const SortableLecture = ({
  lecture,
  deleteLecture,
}: {
  lecture: Lecture;
  deleteLecture: (id: string) => void;
}) => {
  const { setNodeRef, transform, transition } = useSortable({
    id: lecture.id ?? "",
  });

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
    <div ref={setNodeRef} style={style}>
      <LectureComponent lecture={lecture}>
        <SectionDragAndDropList
          lectureId={lecture.id || ""}
          lectureSections={lecture.sections || []}
        />
        <Box sx={{ marginTop: 2 }}>
          <Button variant="outlined">Add Section</Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Button>Save Lecture</Button>
          </Box>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Button
              onClick={() => deleteLecture(lecture.id || "")}
              sx={{ backgroundColor: "red", color: "white" }}
            >
              Delete Lecture
            </Button>
          </Box>
        </Box>
      </LectureComponent>
    </div>
  );
};
function toLectureDTO(updatedLectures: Lecture[]): LectureDTO[] {
  return updatedLectures.map((l) => ({
    id: l.id,
    order: l.order,
    title: l.title,
    description: l.description,
    sections: l.sections?.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      order: s.order,
    })),
  }));
}
