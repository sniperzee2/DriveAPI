const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, path.join(process.cwd(), 'audio-files'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp3)$/)) {
      return cb(new Error("Please upload MP3 only"));
    }
    cb(undefined, true);
  },
});

module.exports = upload;
