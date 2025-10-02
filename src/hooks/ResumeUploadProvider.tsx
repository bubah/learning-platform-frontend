import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { completedPart, Section } from "../types/types";

type FileMetadata = {
  fileName: string;
  fileSize: number;
  lastModified: number;
  uploadId: string;
  uploadedParts: completedPart[];
};

type ResumeUploadProviderProps = {
  children: ReactNode;
  section: Section;
};

type ResumeUploadContextType = {
  progress: number;
  missingParts: number[];
  canResumeUpload: boolean;
  addFileCompletedPart: (params: {
    completedPart: completedPart;
    uploadId: string;
    file: File;
  }) => void;
  clearFileMetadata: (params: { sectionId: string; uploadId: string }) => void;
};

const ResumeUploadContext = createContext<ResumeUploadContextType | null>(null);

export const useResumeUpload = () => {
  const context = useContext(ResumeUploadContext);
  if (!context) {
    throw new Error(
      "useResumeUpload must be used within a ResumeUploadProvider",
    );
  }
  return context;
};

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

const ResumeUploadProvider = ({
  children,
  section,
}: {
  children: ReactNode;
  section: Section;
}) => {
  const [resumable, setResumable] = useState<FileMetadata | null>(
    getFileMetadata(section.id || "", null),
  );

  const storeFileMetadata = ({
    file,
    sectionId,
    uploadId,
    uploadedParts,
  }: {
    file: File;
    sectionId: string;
    uploadId: string;
    uploadedParts: completedPart[];
  }) => {
    // call backend to store file metadata and get uploadId
    localStorage.setItem(
      `upload-metadata-${sectionId}`,
      JSON.stringify({
        fileName: file.name,
        fileSize: file.size,
        lastModified: file.lastModified,
        uploadId,
        uploadedParts,
      }),
    );
  };

  const clearFileMetadata = ({
    sectionId,
    uploadId,
  }: {
    sectionId: string;
    uploadId: string;
  }) => {
    localStorage.removeItem(`upload-metadata-${sectionId}`);
  };

  const addFileCompletedPart = ({
    completedPart,
    uploadId,
    file,
  }: {
    completedPart: completedPart;
    uploadId: string;
    file: File;
  }) => {
    console.log("Add file compl", file, file.size, file.lastModified);
    setResumable((prev) => {
      if (!prev) {
        return {
          fileName: file.name,
          fileSize: file.size,
          uploadId,
          lastModified: file.lastModified,
          uploadedParts: [completedPart],
        };
      }

      if (uploadId !== prev.uploadId) return prev;

      return {
        ...prev,
        uploadedParts: [...prev.uploadedParts, completedPart],
      };
    });
  };

  // useEffect(() => {
  //   const metadata = getFileMetadata(section.id || "", null);
  //   if (!metadata) return;
  //   const { fileSize, chunkSize, uploadedParts } = metadata;
  //   setFileSize(fileSize || 0);
  //   setChunkSize(chunkSize || 0);
  //   setUploadedParts(uploadedParts || []);
  //   setCanResumeUpload(true);
  // }, [section]);

  // const {
  //   uploadId,
  //   uploadedParts,
  //   fileName,
  //   chunkSize,
  //   fileSize,
  //   lastModified,
  // } = {
  //   uploadId: "abc123",
  //   fileName: "lecture1.mp4",
  //   fileSize: 52428800,
  //   lastModified: 1696118400000,
  //   chunkSize: 5242880,
  //   uploadedParts: [
  //     { partNumber: 1, eTag: "etag1" },
  //     { partNumber: 2, eTag: "etag2" },
  //   ],
  // };

  // figure out missing parts
  const allParts = resumable
    ? Math.ceil(resumable.fileSize / (CHUNK_SIZE || 1))
    : 100;
  const uploadedPartNumbers =
    resumable?.uploadedParts.map((p) => p.partNumber) || [];
  const missingParts = [];

  for (let i = 1; i <= allParts; i++) {
    if (!uploadedPartNumbers.includes(i)) missingParts.push(i);
  }

  const progress = Math.round(100 * (uploadedPartNumbers.length / allParts));

  console.log("Before render");
  return (
    <ResumeUploadContext.Provider
      value={{
        progress,
        missingParts,
        canResumeUpload: !!resumable,
        addFileCompletedPart,
        clearFileMetadata,
      }}
    >
      {children}
    </ResumeUploadContext.Provider>
  );
};

export default ResumeUploadProvider;

// get file metadata from local storage
const getFileMetadata = (sectionId: string, file: File | null) => {
  if (!sectionId) return null;
  const key = `upload-metadata-${sectionId}`;
  const metadata = localStorage.getItem(key);
  if (!metadata) {
    return null;
  }

  if (fileMisMatch(file, metadata)) {
    return null;
  }
  // const map = new Map<string, FileMetadata>();
  // map.set(key, JSON.parse(metadata) as FileMetadata);
  return JSON.parse(metadata) as FileMetadata;
};
function fileMisMatch(file: File | null, metadata: string) {
  if (!file) return false;
  const { fileName, fileSize, lastModified } = JSON.parse(metadata);
  return (
    file.name !== fileName ||
    file.size !== fileSize ||
    file.lastModified !== lastModified
  );
}
