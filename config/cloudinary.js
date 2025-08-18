const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "scatch/profiles", // Organize files in folders
            transformation: [
                { width: 300, height: 300, crop: "fill", gravity: "face" }, // Auto crop to face
                { quality: "auto:good" }, // Optimize quality
                { format: "webp" } // Modern format for better compression
            ]
        });
        
        console.log("File uploaded to Cloudinary:", response.secure_url);
        
        // Delete local file after successful upload
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        
        return response;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        
        // Clean up local file even if upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        
        return null;
    }
};

const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("File deleted from Cloudinary:", result);
        return result;
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        return null;
    }
};

module.exports = { uploadOnCloudinary, deleteFromCloudinary };
