import { Box, Button } from "@mui/material";
import { useState, useRef } from "react";
import { useResumeUpload } from "../../hooks/ResumeUploadProvider";
import mediaUploadService from "../../features/services/mediaUploadService";
import { useSection } from "../../hooks/SectionProvider";
import { completedPart } from "../../types/types";

const VideoUploadInput = () => {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { canResumeUpload, missingParts, addFileCompletedPart } =
    useResumeUpload();
  const { section } = useSection();

  const handleFileSelect = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChangeVideoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file: ", file);
    }
    setFile(file || null);
  };

  const handleUpload = async () => {
    console.log("Handle upload cliccked");
    if (!file) return;

    const chunks: Blob[] = [];

    const chunkSize = 5 * 1024 * 1024; // 5MB
    for (let start = 0; start < file.size; start += chunkSize) {
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      chunks.push(chunk);
    }

    console.log("HandleUploaad: Chunks", chunks);

    const { uploadId, key } = await mediaUploadService.initiateUpload(
      section.id || "",
      file.name,
    );

    console.log("After init upload", uploadId, key);

    mediaUploadService.upload({
      key,
      uploadId,
      chunks,
      type: file.type,
      config: {
        onUploadSingleChunkComplete: (args: {
          completedPart: completedPart;
        }) => {
          console.log(
            "On upload single chunk complete",
            args.completedPart,
            uploadId,
          );
          addFileCompletedPart({
            completedPart: args.completedPart,
            uploadId,
            file,
          });
        },

        onUploadAllChunksComplete: () => {
          console.log("on upload all success");
        },
      },
    });
  };

  if (canResumeUpload) return null;

  return (
    <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2}>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        accept="video/*"
        onChange={handleChangeVideoFile}
      />
      <Button
        disabled={!file}
        variant="contained"
        component="span"
        sx={{ width: 110 }}
        onClick={handleUpload}
      >
        Upload File
      </Button>
      <Box
        sx={{
          border: "1px dashed #ccc",
          padding: "8px",
          minWidth: "200px",
          display: "flex",
        }}
      >
        {file ? (
          file.name.toLowerCase()
        ) : (
          <Button onClick={handleFileSelect}>Select a file</Button>
        )}
      </Box>
    </Box>
  );
};

export default VideoUploadInput;
