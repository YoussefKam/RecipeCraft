const cloudinary = require("cloudinary").v2; // Make sure to import v2 for Cloudinary
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload to Cloudinary
const uploadToCloudinary = (path, folder) => {
  return cloudinary.uploader
    .upload(path, {
      folder,
    })
    .then((data) => {
      return { url: data.url, public_id: data.public_id };
    })
    .catch((error) => {
      console.error("Error uploading to Cloudinary:", error);
      throw error; // Rethrow the error to handle it in the route
    });
};

// Function to remove from Cloudinary
const removeFromCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    console.log("File removed from Cloudinary:", result);
    return result;
  } catch (error) {
    console.error("Error removing from Cloudinary:", error);
    throw error; // Rethrow the error to handle it in the route
  }
};

module.exports = { uploadToCloudinary, removeFromCloudinary };
