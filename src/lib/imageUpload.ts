/**
 * Image upload utilities for handling file uploads
 * Supports JPEG, PNG, WebP, GIF formats
 */

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export interface ImageUploadResult {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

/**
 * Validate image file before upload
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: JPEG, PNG, WebP, GIF. Got: ${file.type}`,
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size must be less than 5MB. Got: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
    };
  }

  return { valid: true };
}

/**
 * Convert file to base64 string (for local storage or display)
 */
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}

/**
 * Get file extension from MIME type
 */
export function getFileExtension(mimeType: string): string {
  const mimeToExt: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };
  return mimeToExt[mimeType] || "jpg";
}

/**
 * Generate unique filename
 */
export function generateFilename(originalName: string, mimeType: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  const ext = getFileExtension(mimeType);
  return `img_${timestamp}_${random}.${ext}`;
}
