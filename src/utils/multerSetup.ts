import multer, { StorageEngine }  from 'multer';

// Define storage configuration
 const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Initialize multer with the storage configuration
export const MULTER_UPLOAD = multer({ storage: storage });