import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Course, Lecture } from "../../types/types";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LectureDTO } from "../../types/dtos";

type CourseContextType = {
  course: Course | undefined;
  saveLecture: (lecture: Lecture) => void;
  deleteLecture: (id: string) => void;
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

  useEffect(() => {
    axios.get(`http://localhost:8080/courses/${id}`).then((res) => {
      const { data } = res;
      setCourse(data);
    });
  }, []);

  return (
    <CourseContext.Provider value={{ course, saveLecture, deleteLecture }}>
      {children}
    </CourseContext.Provider>
  );
};
