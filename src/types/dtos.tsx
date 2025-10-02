import { AxiosResponse } from "axios";
import { completedPart } from "./types";

export type GetContractResponse = AxiosResponse<CourseDTO, any>;

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
  lectureId?: string;
  content?: string;
};

export type CourseDTO = {
  id?: string;
  title: string;
  description?: string;
  lectures?: LectureDTO[];
  category: string;
};

export type UserDTO = {
  id?: string;
  email: string;
  username: string;
  role: string;
};

export type UploadMediaInitRequestDTO = {
  fileName: string;
  sectionId: string;
};

export type UploadMediaInitResponseDTO = {
  uploadId: string;
  key: string;
};

export type GetPresignedUrlsRequestDTO = {
  key: string;
  partCount: number;
  uploadId: string;
};

export type GetPresingedUrlsResponseDTO = {
  presignedUrls: string[];
};

export type UploadMediaCompleteRequestDTO = {
  completedParts: completedPart[];
  key: string;
  uploadId: string;
};

export type UploadMediaCompleteResponseDTO = {
  status: string;
};
