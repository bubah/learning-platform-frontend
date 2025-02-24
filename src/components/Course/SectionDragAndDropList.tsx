import { useState } from "react";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SectionComponent } from "./SectionComponent";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";
import { Section } from "../../types/types";
import { ReorderResourceDTO } from "../../types/dtos";

export const SectionDragAndDropList = ({
  lectureSections,
  lectureId,
}: {
  lectureSections: Section[];
  lectureId: string;
}) => {
  const [sections, setSections] = useState<Section[] | []>(lectureSections);

  const handleDragEnd = (event: DragEndEvent) => {
    const prevSections = sections;
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    const newArray = arrayMove(sections, oldIndex, newIndex);

    setSections(newArray);

    const requestBody: ReorderResourceDTO = {
      sections: newArray.map((s, i) => {
        return {
          title: s.title,
          description: s.description,
          id: s.id,
          order: i,
        };
      }),
    };

    axios
      .post(`http://localhost:8080/section-reorder/${lectureId}`, requestBody)
      .then((res) => {
        const { data } = res;
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setSections(prevSections);
      });
  };

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={sortedSections?.map((section) => section.id).filter(id => id !== null) as string[]}
        strategy={verticalListSortingStrategy}
      >
        {sections?.map((section) => (
          <SortabelSection key={section.id} section={section} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

const SortabelSection = ({ section }: { section: Section }) => {
  const { setNodeRef, transform, transition } = useSortable({ id: section.id || "" });

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
      <SectionComponent section={section} />
    </div>
  );
};
