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

import { useState } from "react";
import { GetContractResponse, ReorderResourceDTO } from "../../types/dtos";
import { Lecture } from "../../types/types";
import { LectureProvider } from "./LectureProvider";
import { SectionComponent } from "./SectionComponent";

export const DragAndDropList = ({
  courseLectures,
  id,
}: {
  courseLectures: Lecture[];
  id: string;
}) => {
  const [lectures, setLectures] = useState<Lecture[] | []>(courseLectures);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const pristineLectures = lectures;

    const oldIndex = lectures.findIndex((l) => l.id === active.id);
    const newIndex = lectures.findIndex((l) => l.id === over.id);
    const updatedLectures = arrayMove(lectures, oldIndex, newIndex);

    setLectures(updatedLectures);

    const requestBody: ReorderResourceDTO = {
      lectures: updatedLectures.map((l, i) => ({
        title: l.title,
        description: l.description,
        id: l.id,
        order: i,
      })),
    };

    axios
      .post(`http://localhost:8080/lecture-reorder/${id}`, requestBody)
      .then((res: GetContractResponse) => {
        const { data } = res;
        console.log(data);

        setLectures(updatedLectures);
      })
      .catch((error) => {
        console.log(error);
        setLectures(pristineLectures);
      });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={lectures} strategy={verticalListSortingStrategy}>
        {lectures.map((lecture) => (
          <SortableLecture key={lecture.id} lecture={lecture} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

const SortableLecture = ({ lecture }: { lecture: Lecture }) => {
  const { setNodeRef, transform, transition } = useSortable({ id: lecture.id });

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
      <LectureProvider lecture={lecture}>
        <SectionDragAndDropList
          lectureId={lecture.id}
          lectureSections={lecture.sections || []}
        />
        <Box sx={{ marginTop: 2 }}>
          <Button variant="outlined">Add Section</Button>
        </Box>
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Button>Save Lecture</Button>
        </Box>
      </LectureProvider>
    </div>
  );
};
