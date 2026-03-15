import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // Return "https" URLs by setting secure: true
  secure: true,
});

// Log the configuration
console.log(cloudinary.config());

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    await fs.promises.unlink(localFilePath);
    console.log("File uploaded on cloudinary. File src: " + response.url);
    return response;
  } catch {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
