import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export { cloudinary }

// Helper function to generate signed upload parameters for client-side uploads
export async function getCloudinarySignature(folder: string = "airc-portal") {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const params = {
    timestamp,
    folder,
  }

  const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET!)

  return {
    signature,
    timestamp,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder,
  }
}

// Upload preset configuration recommendations:
// 1. Go to Cloudinary Console > Settings > Upload > Upload presets
// 2. Create a preset named "airc-portal"
// 3. Set upload mode to "unsigned" for client-side uploads
// 4. Configure: folder = "airc-portal", allowed formats = "jpg,png,gif,svg,webp,mp4,mov,pdf"
export const CLOUDINARY_UPLOAD_PRESET = "airc-portal"

// Cloudinary folder structure
export const CLOUDINARY_FOLDERS = {
  PROJECTS: "airc-portal/projects",
  PROJECT_MEDIA: "airc-portal/projects/media",
  PROJECT_DOCUMENTS: "airc-portal/projects/documents",
  USERS: "airc-portal/users",
  DEPARTMENTS: "airc-portal/departments",
  NEWSLETTERS: "airc-portal/newsletters/pdfs",
}

// File type configurations
export const FILE_CONFIG = {
  images: {
    maxSize: 4 * 1024 * 1024, // 4MB
    accept: "image/jpeg,image/png,image/gif,image/webp,image/svg+xml",
    formats: ["jpg", "jpeg", "png", "gif", "webp", "svg"],
  },
  videos: {
    maxSize: 100 * 1024 * 1024, // 100MB (Cloudinary will compress)
    accept: "video/mp4,video/quicktime,video/webm",
    formats: ["mp4", "mov", "webm"],
  },
  documents: {
    maxSize: 10 * 1024 * 1024, // 10MB
    accept: "application/pdf",
    formats: ["pdf"],
  },
  newsletters: {
    maxSize: 30 * 1024 * 1024, // 30MB for newsletter PDFs
    accept: "application/pdf",
    formats: ["pdf"],
  },
}
