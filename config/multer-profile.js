const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads/profiles/');
  },
  filename: (req, file, cb) => {
    const userId = req.user._id;
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    const filename = `user_${userId}_${timestamp}${extension}`;
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
