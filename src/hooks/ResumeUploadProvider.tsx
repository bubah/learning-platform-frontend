import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { completedPart, Section } from "../types/types";
import { data } from "react-router-dom";

type FileMetadata = {
  fileName: string;
  fileSize: number;
  status: "INPROGRESS" | "COMPLETE" | "ABORTED";
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
  onCompleteUpload: () => void;
  onInitUpload: (uploadId: string, file: File) => void;
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
}: ResumeUploadProviderProps) => {
  const [resumable, setResumable] = useState<FileMetadata | null>(
    getFileMetadata(section.id || "", null),
  );

  useEffect(() => {
    //Sync resumable state with state from backend
    //setResumable(data)
    // sync localstorage
  }, []);

  const onInitUpload = (uploadId: string, file: File) => {
    setResumable((prev) => {
      if (!prev) {
        const fileData = {
          uploadId,
          fileName: file.name,
          fileSize: file.size,
          status: "INPROGRESS",
          lastModified: file.lastModified,
          uploadedParts: [],
        } as FileMetadata;
        updateLocalStorage(section.id, fileData);
        return fileData;
      }

      if (uploadId !== prev.uploadId) return prev;
      const updatedMetadata = {
        ...prev,
      };
      updateLocalStorage(section.id, updatedMetadata);
      return updatedMetadata;
    });
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
        const updateMetadata = {
          uploadId,
          fileName: file.name,
          fileSize: file.size,
          status: "INPROGRESS",
          lastModified: file.lastModified,
          uploadedParts: [completedPart],
        } as FileMetadata;

        updateLocalStorage(section.id, updateMetadata);
        return updateMetadata;
      }

      if (uploadId !== prev.uploadId) return prev;
      const updatedMetadata = {
        ...prev,
        uploadedParts: [...prev.uploadedParts, completedPart],
      };
      updateLocalStorage(section.id, updatedMetadata);
      return updatedMetadata;
    });
  };

  const onCompleteUpload = () => {
    setResumable(() => {
      removeLocalStorage(section.id);
      return null;
    });
  };

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
        onCompleteUpload,
        onInitUpload,
      }}
    >
      {children}
    </ResumeUploadContext.Provider>
  );
};

export default ResumeUploadProvider;

const updateLocalStorage = (
  sectionId: string | null,
  fileMetadata: FileMetadata,
) => {
  if (!sectionId) return;

  localStorage.setItem(
    `upload-metadata-${sectionId}`,
    JSON.stringify(fileMetadata),
  );
};

const removeLocalStorage = (sectionId: string | null) => {
  if (!sectionId) return;

  localStorage.removeItem(`upload-metadata-${sectionId}`);
};

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
