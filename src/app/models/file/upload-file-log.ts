export interface UploadFileLogStru {
    id: number;
    deleteFlag?: number;
    uploadType?: number;
    flag?: number;
    status?: number;
    orginFileName?: string;
    storageFileName?: string;
    storageFullPath?: string;
    fileNameExtension?: string;
    fileSize?: number;
    downloadCount?: number;
    likeCount?: number;
    description?: string;
}
