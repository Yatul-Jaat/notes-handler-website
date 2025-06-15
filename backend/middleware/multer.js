

import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Reconstruct __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure files directory exists
const uploadDir = path.join(__dirname, "../files");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // use full path to avoid relative path issues
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    // Create a safe, string-based filename
    const sanitizedOriginalName = file.originalname.replace(/\s+/g, '_');// adjust space into _ 
    cb(null, `${timestamp}_${sanitizedOriginalName}`);
  }
});

const upload = multer({ storage });

export default upload;
