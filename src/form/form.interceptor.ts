import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";

export function getFileInterceptor(): MulterOptions {
    switch(process.env.STORAGE_ADAPTER) {
        case "disk":
            return {
                dest: process.env.STORAGE_PATH,
                preservePath:true
            }
        default:
            return {}
    }
}