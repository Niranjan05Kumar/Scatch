const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

// Debug environment variables
console.log("Cloudinary Configuration Debug:");
console.log("CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME ? "✓ Set" : "✗ Missing");
console.log("API_KEY:", process.env.CLOUDINARY_API_KEY ? "✓ Set" : "✗ Missing");
console.log("API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "✓ Set" : "✗ Missing");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log("Starting Cloudinary upload for:", localFilePath);
        
        if (!localFilePath) {
            console.error("No file path provided");
            return null;
        }

        // Check if file exists
        if (!fs.existsSync(localFilePath)) {
            console.error("File does not exist:", localFilePath);
            return null;
        }

        console.log("File exists, proceeding with upload...");
        
        // Simple upload first (without transformations for testing)
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "scatch/profiles", // Organize files in folders
        });
        
        console.log("File uploaded to Cloudinary successfully:", response.secure_url);
        
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
