import { useState } from "react";
import { ReorderResourceDTO, Section } from "../../mock-data/course";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SectionComponent } from "./SectionComponent";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";

export const SectionDragAndDropList = ({lectureSections,lectureId}:{lectureSections:Section[], lectureId:number}) => {

    const [sections, setSections] = useState<Section[] | []>(lectureSections);

    const handleDragEnd = (event: DragEndEvent) => {
        const prevSectionOrder = sections;
        const { active, over } = event;
    
        if(!over || active.id === over.id) return; 
    
        const oldIndex = sections.findIndex((s) => s.id === active.id)
        const newIndex = sections.findIndex((s) => s.id === over.id)
        const newArray = arrayMove(sections,oldIndex,newIndex);
        
        setSections(newArray)
    
    
        const requestBody:ReorderResourceDTO= {sections:newArray.map((s,i) => {
            
            return{
                title:s.title,
                description:s.description,
                id:s.id,
                order:i
            }
        })}
    
        axios.post(`http://localhost:8080/section-reorder/${lectureId}`,requestBody).then((res) => {
            const {data} = res;
            console.log(data);
        }).catch((error) => {
            console.log(error);
            setSections(prevSectionOrder);
        })
      };

      return(
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={sections?.map((section) => section.id)}
          strategy={verticalListSortingStrategy}
        >
          {sections?.map((section) => (
            <SortabelSection key={section.id} section={section} />
          ))}
        </SortableContext>
      </DndContext>
    );
      

};


const SortabelSection = ({section}:{section:Section}) => {
    const { setNodeRef, transform, transition } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "0px",
        margin: "5px 0",
        backgroundColor: "#f0f0f0",
        borderRadius: "4px",
        cursor: "grab",
      };


      return(
        <div ref={setNodeRef} style={style}>
      <SectionComponent section={section}/>

    </div>
  );
    
}