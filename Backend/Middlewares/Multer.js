import multer from "multer";

// Multer storage setup (temporary for Cloudinary upload)
const storage = multer.diskStorage({}); // Temporarily stores files locally

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only images are allowed."), false); // Reject the file
  }
};

// Multer configuration with file size limit and filtering
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter
});


   