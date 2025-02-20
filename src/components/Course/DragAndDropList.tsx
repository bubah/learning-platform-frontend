import { useEffect, useState } from "react";
import { Lecture, ReorderResourceDTO } from "../../mock-data/course";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
    arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { LectureProvider } from "./LectureProvider";
import { Box, Button, IconButton } from "@mui/material";
import { SectionComponent } from "./SectionComponent";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import axios from "axios";
import { SectionDragAndDropList } from "./SectionDragAndDropList";


export const DragAndDropList = ({
  courseLectures,id
  
}: {
  courseLectures: Lecture[];
  id:string
}, 

) => {
  const [lectures, setLectures] = useState<Lecture[] | []>(courseLectures);

  const handleDragEnd = (event: any) => {
    const prevLectureOrder = lectures;
    const { active, over } = event;

    if(!over || active.id === over.id) return; 

    const oldIndex = lectures.findIndex((l) => l.id === active.id)
    const newIndex = lectures.findIndex((l) => l.id === over.id)
    const newArray = arrayMove(lectures,oldIndex,newIndex);
    
    setLectures(newArray)


    const requestBody:ReorderResourceDTO= {lectures:newArray.map((l,i) => {
        
        return{
            title:l.title,
            description:l.description,
            id:l.id,
            order:i
        }
    })}

    axios.post(`http://localhost:8080/lecture-reorder/${id}`,requestBody).then((res) => {
        const {data} = res;
        console.log(data);
    }).catch((error) => {
        console.log(error);
        setLectures(prevLectureOrder);
    })
  };


  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={lectures.map((lecture) => lecture.id)}
        strategy={verticalListSortingStrategy}
      >
        {lectures.map((lecture) => (
          <SortableLecture key={lecture.id} lecture={lecture} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

const SortableLecture = ({ lecture }: { lecture: Lecture }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lecture.id });

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
    <div ref={setNodeRef} style={style} >
      <LectureProvider lecture={lecture}>
        
        {/* {lecture.sections.map((section, sectionIndex) => (
          <SectionComponent
            id={section.id}
            key={`section-${sectionIndex}`}
            title={section.title}
            description={section.description}
            lectureId={lecture.id}
          />
        ))} */}
        <SectionDragAndDropList lectureId = {lecture.id} lectureSections={lecture.sections || []} />
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
