export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/png",
    "application/pdf"
];
export function getFileMetadata(file) {
    if (!file)
        return null;
    return {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
    };
}
export function validateDocumentFile(file) {
    if (!file) {
        return "This document is required.";
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return "Only JPG, PNG, or PDF files are accepted.";
    }
    if (file.size > MAX_FILE_SIZE) {
        return "File size must not exceed 5 MB.";
    }
    return null;
}
export function collectFileUploads(identificationDocument, insuranceDocument) {
    return {
        identificationDocument: getFileMetadata(identificationDocument),
        insuranceDocument: getFileMetadata(insuranceDocument)
    };
}
//# sourceMappingURL=files.js.map