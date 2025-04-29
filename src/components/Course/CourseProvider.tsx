import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Course, Lecture, Section } from "../../types/types";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LectureDTO, ReorderResourceDTO } from "../../types/dtos";

type CourseContextType = {
  course: Course | undefined;
  saveLecture: (lecture: Lecture) => void;
  deleteLecture: (id: string) => void;
  saveSection: (section: Section) => void;
  deleteSection: (id: string) => void;
  reorderLectures: (
    pristineLecture: Lecture[],
    updatedLecture: Lecture[],
  ) => void;
  isLoading:boolean;
};

const CourseContext = createContext({} as CourseContextType);

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [isLoading, setIsLoading]  = useState<boolean>(true);

  const { id } = useParams();

  const saveLecture = (lecture: Lecture) => {
    const lectureDTO: LectureDTO = {
      title: lecture.title,
      description: lecture.description,
      sections: lecture.sections?.map((s) => ({
        title: s.title,
        description: s.description,
        order: s.order,
        id: s.id,
      })),
      courseId: course?.id || undefined,
      id: null,
      order: course?.lectures.length || 0,
    };

    axios
      .post("http://localhost:8080/lectures", lectureDTO)
      .then((res) => {
        setCourse((prevCourse) => ({
          ...prevCourse!,
          lectures: [...prevCourse!.lectures, res.data],
        }));
      })
      .catch((error) => console.log(error));
  };

  const deleteLecture = (id: string) => {
    const pristineCourse = course;
    const lectures = course?.lectures;

    setCourse((prevCourse) => ({
      ...prevCourse!,
      lectures: lectures?.filter((lecture) => lecture.id !== id) || [],
    }));

    axios.delete(`http://localhost:8080/lectures/${id}`).catch((error) => {
      setCourse(pristineCourse);
      console.log(error);
    });
  };

  const saveSection = (section: Section) => {
    const pristineCourse = course;
    const lectures = course?.lectures;

    axios
      .post("http://localhost:8080/sections", {
        title: section.title,
        description: section.description,
        order:
          lectures?.find((lecture) => lecture.id === section.lectureId)
            ?.sections?.length || 0,
        lectureId: section.lectureId,
        content: "place holder",
      })
      .then((res) => {
        console.log(res);
        setCourse((prevCourse) => ({
          ...prevCourse!,
          lectures: [
            ...prevCourse!.lectures.map((lecture) => {
              return lecture.id === res.data.lectureId
                ? {
                    ...lecture,
                    sections: [...(lecture.sections || []), res.data],
                  }
                : lecture;
            }),
          ],
        }));
      })
      .catch((error) => {
        setCourse(pristineCourse);
        console.log(error);
      });
  };

  const deleteSection = (id: string) => {
    console.log("section id at useCourse :", id);
    const pristineCourse = course;
    const lectures = course?.lectures;

    setCourse((prevCourse) => ({
      ...prevCourse!,
      lectures:
        lectures?.map((lecture) => ({
          ...lecture,
          sections: lecture.sections?.filter((section) => section.id !== id),
        })) || [],
    }));

    axios.delete(`http://localhost:8080/sections/${id}`).catch((error) => {
      setCourse(pristineCourse);
      console.log(error);
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/courses/${id}`).then((res) => {
      const { data } = res;
      setCourse(data);
      setIsLoading(false)
    });
  }, []);

  // console.log("course Provider", course);

  const reorderLectures = (
    pristineLectures: Lecture[],
    updatedLectures: Lecture[],
  ) => {
    const requestBody: ReorderResourceDTO = {
      lectures: toLectureDTO(updatedLectures),
    };

    setCourse((prevCourse) => ({
      ...prevCourse!,
      lectures: updatedLectures,
    }));

    axios
      .post(`http://localhost:8080/lecture-reorder/${course?.id}`, requestBody)
      .then((res) => {
        const { lectures } = res.data;
        console.log(lectures);
        // console.log("updated lecture order: ", lectures)
        // setCourse((prevCourse) => (
        //   {
        //     ...prevCourse!,
        //           lectures

        //   }
        // ))
      })
      .catch((error) => {
        console.log(error);
        setCourse((prevCourse) => ({
          ...prevCourse!,
          lectures: pristineLectures,
        }));
      });
  };

  return (
    <CourseContext.Provider
      value={{
        course,
        saveLecture,
        deleteLecture,
        saveSection,
        deleteSection,
        reorderLectures,
        isLoading
      }}
    >
      {children}
    </CourseContext.Provider>
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
