import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./api-error.js";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // Return "https" URLs by setting secure: true
  secure: true,
});
// 6:22
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    await fs.promises.unlink(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);

    // Handle specific Cloudinary errors
    if (error.message?.includes("File size too large")) {
      throw new ApiError(
        400,
        "File size too large. Please upload a file smaller than 10MB."
      );
    }

    if (error.message?.includes("Invalid file type")) {
      throw new ApiError(
        400,
        "Invalid file type. Please upload a valid image file."
      );
    }

    if (error.http_code === 401) {
      throw new ApiError(
        500,
        "Cloudinary authentication failed. Please contact support."
      );
    }

    // Generic error
    throw new ApiError(
      500,
      "Failed to upload file to cloud storage. Please try again."
    );
  }
};

const deleteFromCloudinary = async (publicId, resourceType) => {
  try {
    await cloudinary.uploader.destroy(publicId, {resource_type: resourceType});
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to delete file from cloud storage. Please try again."
    );
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
