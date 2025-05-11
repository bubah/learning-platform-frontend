import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import {
  CourseDTO,
  LectureDTO,
  ReorderResourceDTO,
  SectionDTO,
} from "../types/dtos";
import { Course, Lecture, Section } from "../types/types";
import { httpClient } from "../clients/httpClient";
import {
  convertToCourse,
  convertToLecture,
  convertToSection,
} from "../utils/incoming-request";

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
  reorderSections: (
    pristineSection: Section[],
    updatedSection: Section[],
    lectureId: string,
  ) => void;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

    httpClient
      .post<LectureDTO>("/lectures", lectureDTO)
      .then((res) => {
        const updatedLecture = convertToLecture(res.data);
        setCourse((prevCourse) => ({
          ...prevCourse!,
          lectures: [...prevCourse!.lectures, updatedLecture],
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

    httpClient.delete(`/lectures/${id}`).catch((error) => {
      setCourse(pristineCourse);
      console.log(error);
    });
  };

  const saveSection = (section: Section) => {
    const pristineCourse = course;
    const lectures = course?.lectures;

    httpClient
      .post<SectionDTO>("/sections", {
        title: section.title,
        description: section.description,
        order:
          lectures?.find((lecture) => lecture.id === section.lectureId)
            ?.sections?.length || 0,
        lectureId: section.lectureId,
        content: "place holder",
      })
      .then((res) => {
        setCourse((prevCourse) => ({
          ...prevCourse!,
          lectures: [
            ...prevCourse!.lectures.map((lecture) => {
              return lecture.id === res.data.lectureId
                ? {
                    ...lecture,
                    sections: [
                      ...(lecture.sections || []),
                      convertToSection(res.data),
                    ],
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

    httpClient.delete(`/sections/${id}`).catch((error) => {
      setCourse(pristineCourse);
      console.log(error);
    });
  };

  useEffect(() => {
    httpClient.get<CourseDTO>(`/courses/${id}`).then((res) => {
      setCourse(convertToCourse(res.data));
      setIsLoading(false);
    });
  }, []);

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

    httpClient
      .post<CourseDTO>(`/lecture-reorder/${course?.id}`, requestBody)
      .catch((error) => {
        console.log(error);
        setCourse((prevCourse) => ({
          ...prevCourse!,
          lectures: pristineLectures,
        }));
      });
  };

  const reorderSections = (
    pristineSections: Section[],
    updatedSections: Section[],
    lectureId: string,
  ) => {
    const requestBody: ReorderResourceDTO = {
      sections: toSectionDTO(updatedSections),
    };
    setCourse((prevCourse) => ({
      ...prevCourse!,
      lectures: prevCourse!.lectures.map((lecture) => {
        return lecture.id === lectureId
          ? { ...lecture, sections: updatedSections }
          : lecture;
      }),
    }));
    httpClient
      .post<LectureDTO>(`/section-reorder/${lectureId}`, requestBody)
      .catch((error) => {
        console.log(error);
        setCourse((prevCourse) => ({
          ...prevCourse!,
          lectures: prevCourse!.lectures.map((lecture) => {
            return lecture.id === pristineSections[0].lectureId
              ? { ...lecture, sections: pristineSections }
              : lecture;
          }),
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
        reorderSections,
        isLoading,
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

function toSectionDTO(updatedSections: Section[]): LectureDTO[] {
  return updatedSections.map((s) => ({
    id: s.id,
    order: s.order,
    title: s.title,
    description: s.description,
  }));
}
