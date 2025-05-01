import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Lecture } from "../../types/types";
import { useCourse } from "./CourseProvider";

export const DragAndDropList = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { course, reorderLectures } = useCourse();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const pristineLectures = sortedLectures;

    console.log("active : ", active);
    console.log("over : ", over);
    console.log("sortable lectures :", sortedLectures);

    const oldIndex = sortedLectures.findIndex((l) => l.id === active.id);
    const newIndex = sortedLectures.findIndex((l) => l.id === over.id);
    const updatedLectures: Lecture[] = arrayMove(
      sortedLectures,
      oldIndex,
      newIndex,
    ).map((l, i) => ({
      title: l.title,
      description: l.description,
      id: l.id,
      order: i,
    }));
    reorderLectures(pristineLectures, updatedLectures);
  };
  const sortedLectures = [...(course?.lectures || [])].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={sortedLectures
          .map((l) => l.id)
          .filter((id): id is string => id !== null)}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};
