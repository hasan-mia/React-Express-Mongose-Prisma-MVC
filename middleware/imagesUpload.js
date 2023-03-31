const multer = require("multer");
const path = require("path");

// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/upload/images");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

// upload video middleware
const imagesUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50, // 50MB
  },
  fileFilter: (req, file, callback) => {
    const filetypes = /png/ || /jpg/ || /jpeg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return callback(null, true);
    } else {
      callback("Error: Only png, jpg, jpeg files are allowed.");
    }
  },
}).array("images");

module.exports = imagesUpload;
