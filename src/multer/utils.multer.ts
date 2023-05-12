export function getStoragePath(file: Express.Multer.File) {
    switch (process.env.STORAGE_ADAPTER) {
        default:
            return `${process.env.BASE_URL}/media/${file.filename}`
    }
}