const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads/profiles/');
  },
  filename: (req, file, cb) => {
    // Get user ID from session or JWT (since req.user might not be set)
    let userId = 'unknown';
    
    // Try to get user ID from session first
    if (req.session && req.session.user && req.session.user._id) {
      userId = req.session.user._id;
    } 
    // Try to get from JWT token
    else if (req.cookies && req.cookies.token) {
      try {
        const jwt = require("jsonwebtoken");
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY || "generatekaro");
        userId = decoded.email.replace('@', '_').replace('.', '_'); // Use email as fallback
      } catch (err) {
        console.log("JWT decode failed in multer");
      }
    }
    
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
