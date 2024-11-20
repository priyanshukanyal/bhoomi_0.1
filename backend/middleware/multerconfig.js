import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage(); // Use memory storage for direct Azure upload

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit per file
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error('Only JPEG and PNG files are allowed');
      error.status = 400;
      return cb(error, false);
    }
    cb(null, true);
  },
});

export default upload;
