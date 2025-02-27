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
import { Lecture, Section } from "../../types/types";
import { LectureComponent } from "./LectureComponent";
// import { AddLectureComponent } from "./AddLectureComponent";
// import { LectureProvider, useLecture } from "./LectureProvider";
import { useCourse } from "./CourseProvider";

export const DragAndDropList = ({
   children
}: {
  children:React.ReactNode
}) => {
  const { course, reorderLectures } = useCourse();
  // const [lectures, setLectures] = useState<Lecture[] | []>(courseLectures);

  // useEffect(() => {
  //   setLectures(courseLectures);
  // }, [courseLectures]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const pristineLectures = sortedLectures;

    console.log('active : ', active)
    console.log('over : ', over)
    console.log("sortable lectures :", sortedLectures)
    
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
    reorderLectures(pristineLectures,updatedLectures);
    console.log("updated lectures :", updatedLectures)

    // setLectures(updatedLectures);

    // const requestBody: ReorderResourceDTO = {
      // lectures: toLectureDTO(updatedLectures),
    // };

    // axios
      // .post(`http://localhost:8080/lecture-reorder/${course?.id}`, requestBody)
      // .catch((error) => {
        // console.log(error);
        // setLectures(pristineLectures);
        // need a hook to send new order of lectures to back end 
      // });
  };
  const sortedLectures = [...(course?.lectures || [])].sort((a, b) => a.order - b.order);

  console.log("Sorted Lectures", sortedLectures);
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={sortedLectures
          .map((l) => l.id)
          .filter((id): id is string => id !== null)}
        strategy={verticalListSortingStrategy}
      >
        {/* {sortedLectures.map((lecture) => (
          <LectureProvider key={lecture.id} lecture={lecture}>
            <SortableLecture />
          </LectureProvider>
        ))} */}
         {/* <div ref={setNodeRef} style={style}> */}
          {children}
         {/* </div> */}
      </SortableContext>
    </DndContext>
  );
};

// const SortableLecture = () => {
  // const { onSaveSection } = useSection();
  // const { lecture } = useLecture();
  // const { deleteLecture, saveSection } = useCourse();
  // const { setNodeRef, transform, transition } = useSortable({
  //   id: lecture?.id ?? "",
  // });
  // const [displayAddSection, setDisplayAddSection] = useState(false);

  // const handleSaveSection = (section: Section) => {
  //   saveSection({ ...section, lectureId: lecture.id || "" });
  //   setDisplayAddSection(false);
  // };

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  //   padding: "0px",
  //   margin: "5px 0",
  //   backgroundColor: "#f0f0f0",
  //   borderRadius: "4px",
  //   cursor: "grab",
  // };

//   return (
//     <div ref={setNodeRef} style={style}>
//       <LectureComponent>
//         {/* <Box sx={{ textAlign: "center", marginTop: 2 }}>
//           <SectionDragAndDropList />
//           <Box sx={{ marginTop: 2 }}>
//             <Button
//               variant="outlined"
//               onClick={() => setDisplayAddSection(true)}
//             >
//               Add Section
//             </Button>
//           </Box>
//           {displayAddSection && (
//             <AddLectureComponent<Section>
//               saveItem={(item) => {
//                 console.log("here", item);
//                 handleSaveSection(item);
//               }}
//               onCancel={() => setDisplayAddSection(false)}
//             />
//           )}
//         </Box>
//         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Box sx={{ textAlign: "center", marginTop: 2 }}>
//             <Button>Save Lecture</Button>
//           </Box>
//           <Box sx={{ textAlign: "center", marginTop: 2 }}>
//             <Button
//               onClick={() => deleteLecture(lecture.id || "")}
//               sx={{ backgroundColor: "red", color: "white" }}
//             >
//               Delete Lecture
//             </Button>
//           </Box>
//         </Box> */}
//       </LectureComponent>
//     </div>
//   );
// };

// function toLectureDTO(updatedLectures: Lecture[]): LectureDTO[] {
//   return updatedLectures.map((l) => ({
//     id: l.id,
//     order: l.order,
//     title: l.title,
//     description: l.description,
//     sections: l.sections?.map((s) => ({
//       id: s.id,
//       title: s.title,
//       description: s.description,
//       order: s.order,
//     })),
//   }));
// }
