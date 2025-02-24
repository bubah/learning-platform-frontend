import { AxiosResponse } from "axios";

export type GetContractResponse = AxiosResponse<CourseDTO, any>

export type ReorderResourceDTO = {
  lectures?: LectureDTO[];
  sections?: SectionDTO[];
};

export type LectureDTO = {
  id: string | null;
  title: string;
  description: string;
  order: number;
  sections?: SectionDTO[];
  courseId?: string;
};

export type SectionDTO = {
  id: string | null;
  title: string;
  description: string;
  order: number;
};

export type CourseDTO = {
  id: string;
  title: string;
  description: string;
  order: number;
  lectures: LectureDTO[];
};
