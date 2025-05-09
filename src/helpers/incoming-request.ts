import { CourseDTO, LectureDTO, SectionDTO } from "../types/dtos";
import { Course, Lecture, Section } from "../types/types";

export const convertToCourses = (courseDTOs: CourseDTO[]): Course[] => {
  return courseDTOs.map((courseDTO) => convertToCourse(courseDTO));
};

export const convertToLectures = (
  lecturesDTO: LectureDTO[] | undefined,
): Lecture[] => {
  return lecturesDTO?.map((lectureDTO) => convertToLecture(lectureDTO)) || [];
};

export const convertToSections = (
  sectionsDTO: SectionDTO[] | undefined,
): Section[] => {
  return sectionsDTO?.map((sectionDTO) => convertToSection(sectionDTO)) || [];
};

export const convertToCourse = (courseDTO: CourseDTO): Course => {
  return {
    id: courseDTO.id,
    title: courseDTO.title,
    description: courseDTO.description,
    category: courseDTO.category,
    lectures: convertToLectures(courseDTO.lectures),
  };
};

export const convertToLecture = (lectureDTO: LectureDTO): Lecture => {
  return {
    id: lectureDTO.id,
    title: lectureDTO.title,
    description: lectureDTO.description,
    order: lectureDTO.order,
    sections: lectureDTO.sections?.map((section) => ({
      id: section.id,
      title: section.title,
      description: section.description,
      order: section.order,
    })),
  };
};

export const convertToSection = (sectionDTO: SectionDTO): Section => {
  return {
    id: sectionDTO.id,
    title: sectionDTO.title,
    description: sectionDTO.description,
    order: sectionDTO.order,
  };
};
