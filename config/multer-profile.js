const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads/profiles/');
  },
  filename: (req, file, cb) => {
    // Use session user ID or generate timestamp-based name
    const userId = req.session?.user?._id || req.user?._id || 'temp';
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    const filename = `user_${userId}_${timestamp}${extension}`;
    console.log('Generated filename:', filename); // Debug log
    cb(null, filename);
  }
});

const uploadProfile = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, JPG, PNG, WEBP, GIF) are allowed!'), false);
    }
  }
});

module.exports = uploadProfile;
