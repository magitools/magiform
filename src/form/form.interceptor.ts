import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { DiskStorage } from "../multer/disk.multer";

export function getFileInterceptor(): MulterOptions {
    switch(process.env.STORAGE_ADAPTER) {
        case "disk":
            return {
                storage: DiskStorage,
                limits: {
                    fileSize: process.env.STORAGE_FILE_LIMIT ? parseInt(process.env.STORAGE_FILE_LIMIT)  : 8000000
                }
            }
        default:
            return {}
    }
}