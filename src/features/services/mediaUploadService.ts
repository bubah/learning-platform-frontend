import axios, { AxiosResponse } from "axios";
import { HttpClient, httpClient } from "../../clients/httpClient";
import {
  GetPresignedUrlsRequestDTO,
  GetPresingedUrlsResponseDTO,
  UploadMediaCompleteRequestDTO,
  UploadMediaCompleteResponseDTO,
  UploadMediaInitRequestDTO,
  UploadMediaInitResponseDTO,
} from "../../types/dtos";
import { completedPart } from "../../types/types";

class MediaUploadService {
  private static instance: MediaUploadService;
  private httpClient: HttpClient;
  constructor() {
    this.httpClient = httpClient;
  }

  static getInstance(): MediaUploadService {
    if (!MediaUploadService.instance) {
      MediaUploadService.instance = new MediaUploadService();
    }
    return MediaUploadService.instance;
  }

  public async upload({
    key,
    uploadId,
    chunks,
    type,
    config,
  }: {
    key: string;
    uploadId: string;
    chunks: Blob[];
    type: string;
    config: {
      onUploadSingleChunkComplete: (args: {
        completedPart: completedPart;
      }) => void;
      onUploadAllChunksComplete: () => void;
    };
  }): Promise<any> {
    const presignedUrls = await this.fetchPresignedUrls(key, uploadId, chunks);

    const unsettledCompletedParts: Promise<completedPart>[] = [];

    chunks.map((chunk, index) =>
      unsettledCompletedParts.push(
        this.uploadVideosToS3({
          presignedUrl: presignedUrls[index],
          chunk,
          type,
          index,
          onSuccess: config.onUploadSingleChunkComplete,
        }),
      ),
    );

    const settledParts = await Promise.allSettled(unsettledCompletedParts);

    if (settledParts.some((part) => part.status === "rejected")) {
      return;
    }

    const completedParts: completedPart[] = [];

    settledParts.forEach((part) => {
      if (part.status === "fulfilled") {
        completedParts.push(part.value);
      }
    });

    const status = await this.sendCompleteStatus({
      key,
      uploadId,
      completedParts,
    });

    if (status === "sucess") {
      config.onUploadAllChunksComplete();
    }

    console.log("Upload complete status:", status);
  }

  async initiateUpload(
    sectionId: string,
    fileName: string,
  ): Promise<UploadMediaInitResponseDTO> {
    return new Promise((resolve) => {
      const upload = async () => {
        const res = await this.httpClient.post<
          UploadMediaInitResponseDTO,
          UploadMediaInitRequestDTO
        >("/upload/media/init", {
          sectionId,
          fileName,
        });
        resolve(res.data);
      };

      upload();
    });
  }

  private async fetchPresignedUrls(
    key: string,
    uploadId: string,
    chunks: Blob[],
  ): Promise<string[]> {
    return new Promise((resolve) => {
      const fetchUrls = async () => {
        const res = await httpClient.post<
          GetPresingedUrlsResponseDTO,
          GetPresignedUrlsRequestDTO
        >("/upload/media/parts", {
          key,
          uploadId,
          partCount: chunks.length,
        });

        const presignedUrls = res.data.presignedUrls;
        console.log("Presigned URLs: ", presignedUrls);
        resolve(presignedUrls);
      };

      fetchUrls();
    });
  }

  private async uploadVideosToS3({
    presignedUrl,
    chunk,
    type,
    index,
    onSuccess,
  }: {
    presignedUrl: string;
    chunk: Blob;
    type: string;
    index: number;
    onSuccess: (args: { completedPart: completedPart }) => void;
  }): Promise<completedPart> {
    return new Promise((resolve) => {
      const upload = async () => {
        try {
          const res: AxiosResponse = await axios.put(presignedUrl, chunk, {
            headers: {
              "Content-Type": type,
            },
          });
          const completedPart = {
            partNumber: index + 1,
            eTag: res.headers.etag,
          };
          onSuccess({ completedPart });
          resolve(completedPart);
          console.log(`Chunk ${index + 1} uploaded successfully`, res);
        } catch (error) {
          console.error(`Error uploading chunk ${index + 1}`, error);
          throw error;
        }
      };

      upload();
    });
  }

  private async sendCompleteStatus({
    key,
    uploadId,
    completedParts,
  }: {
    key: string;
    uploadId: string;
    completedParts: completedPart[];
  }): Promise<string> {
    return new Promise((resolve) => {
      const complete = async () => {
        const res = await httpClient.post<
          UploadMediaCompleteResponseDTO,
          UploadMediaCompleteRequestDTO
        >("/upload/media/complete", {
          key,
          uploadId,
          completedParts,
        });

        resolve(res.data.status);
      };

      complete();
    });
  }
}

export default MediaUploadService.getInstance();
