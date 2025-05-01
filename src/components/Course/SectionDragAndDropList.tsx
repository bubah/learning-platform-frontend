import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { ReactNode, useEffect, useState } from "react";
import { SectionDTO } from "../../types/dtos";
import { Section } from "../../types/types";
import { useCourse } from "./CourseProvider";
import { useLecture } from "./LectureProvider";

export const SectionDragAndDropList = ({children}: {children: ReactNode}) => {
  const { reorderSections } = useCourse();
  const { lecture } = useLecture();
  const [sections, setSections] = useState<Section[] | []>(
    lecture.sections || [],
  );

  useEffect(() => {
    setSections(lecture.sections || []);
  }, [lecture.sections]);

  const handleDragEnd = (event: DragEndEvent) => {
    const pristineSections = sortedSections;
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sortedSections.findIndex((s) => s.id === active.id);
    const newIndex = sortedSections.findIndex((s) => s.id === over.id);
    const updatedSections: Section[] = arrayMove(
      sortedSections,
      oldIndex,
      newIndex,
    ).map((s, i) => {
      return {
        title: s.title,
        description: s.description,
        id: s.id,
        order: i,
      };
    });

    reorderSections(pristineSections, updatedSections, lecture.id || "");

    // const requestBody: ReorderResourceDTO = {
    //   sections: toSectionDTO(updatedSections),
    // };

    // axios
    //   .post(`http://localhost:8080/section-reorder/${lecture.id}`, requestBody)
    //   .catch((error) => {
    //     console.log(error);
    //     setSections(pristineSections);
    //   });
  };

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  console.log("sorted sections :", sortedSections);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={
          sortedSections
            ?.map((section) => section.id)
            .filter((id) => id !== null) as string[]
        }
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};

function toSectionDTO(updaatedSections: Section[]): SectionDTO[] {
  return updaatedSections.map((s) => ({
    title: s.title,
    description: s.description,
    id: s.id,
    order: s.order,
  }));
}
