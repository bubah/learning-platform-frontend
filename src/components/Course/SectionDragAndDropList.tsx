import { useState } from "react";
import { Section } from "../../mock-data/course";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Box, Button } from "@mui/material";
import { SectionComponent } from "./SectionComponent";
import { CSS } from "@dnd-kit/utilities";

export const SectionDragAndDropList = ({lectureSections}:{lectureSections:Section[]}) => {

    const [sections, setSections] = useState<Section[] | []>(lectureSections);

    const handleDragEnd = (event: any) => {
        const prevLectureOrder = lectures;
        const { active, over } = event;
    
        // if(!over || active.id === over.id) return; 
    
        // const oldIndex = lectures.findIndex((l) => l.id === active.id)
        // const newIndex = lectures.findIndex((l) => l.id === over.id)
        // const newArray = arrayMove(lectures,oldIndex,newIndex);
        
        // setLectures(newArray)
    
    
        // const requestBody:ReorderResourceDTO= {lectures:newArray.map((l,i) => {
            
        //     return{
        //         title:l.title,
        //         description:l.description,
        //         id:l.id,
        //         order:i
        //     }
        // })}
    
        // axios.post(`http://localhost:8080/lecture-reorder/${id}`,requestBody).then((res) => {
        //     const {data} = res;
        //     console.log(data);
        // }).catch((error) => {
        //     console.log(error);
        //     setLectures(prevLectureOrder);
        // })
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
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: section.id });

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
        <div ref={setNodeRef} style={style} >
      <SectionComponent
       id={section.id}
    //    key={`section-${sectionIndex}`}
       title={section.title}
       description={section.description}
    //    lectureId={lecture.id}
       section={section}>
        {/* ✅ Sections now render inside AccordionDetails again */}
        {/* {lecture.sections.map((section, sectionIndex) => (
          <SectionComponent
            id={section.id}
            key={`section-${sectionIndex}`}
            title={section.title}
            description={section.description}
            lectureId={lecture.id}
          />
        ))} */}
        <Box sx={{ marginTop: 2 }}>
          <Button variant="outlined">Add Section</Button>
        </Box>
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Button>Save Lecture</Button>
        </Box>
      </SectionComponent>
    </div>
  );
    
}