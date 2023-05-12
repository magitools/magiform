import { diskStorage } from "multer";
import {randomBytes} from "crypto"
export const DiskStorage = diskStorage({
    destination: process.env.STORAGE_PATH,
    filename: async (req, file, callback) => {
        if (process.env.STORAGE_RANDOMIZE) {
            try {
                const bytes = await randomBytes(16)
                callback(null, bytes.toString("hex"))
            } catch (error) {
                callback(error, undefined);
            }

        } else {
            const time = new Date();
            const ts = Date.parse(time.toString());
            callback(null, `${ts / 1000}_${file.originalname}`)
        }
    },
})