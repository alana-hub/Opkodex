import type {
  FileMetadata,
  FileUploads
} from "../types/smartcare.js";

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf"
] as const;

export function getFileMetadata(file: File | null): FileMetadata | null {
  if (!file) return null;

  return {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified
  };
}

export function validateDocumentFile(
  file: File | null
): string | null {
  if (!file) {
    return "This document is required.";
  }

  if (
    !ALLOWED_FILE_TYPES.includes(
      file.type as (typeof ALLOWED_FILE_TYPES)[number]
    )
  ) {
    return "Only JPG, PNG, or PDF files are accepted.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File size must not exceed 5 MB.";
  }

  return null;
}

export function collectFileUploads(
  identificationDocument: File | null,
  insuranceDocument: File | null
): FileUploads {
  return {
    identificationDocument: getFileMetadata(
      identificationDocument
    ),
    insuranceDocument: getFileMetadata(
      insuranceDocument
    )
  };
}
