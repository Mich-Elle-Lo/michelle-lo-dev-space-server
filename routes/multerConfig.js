const multer = require("multer");
const path = require("path");

// Post Storage Config
const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/posts"));
  },
  filename: function (req, file, cb) {
    const userId = req.body.user_id;
    const uniqueSuffix =
      userId + "_" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

// Avatar Storage Config
const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/avatars"));
  },
  filename: function (req, file, cb) {
    const userId = req.body.user_id;
    const uniqueSuffix =
      userId + "_" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Not an image or video file"), false);
  }
};

// Upload Middleware for Posts
const uploadPost = multer({
  storage: postStorage,
  fileFilter: fileFilter,
  limits: {
    fieldNameSize: 500,
    fieldSize: 1024 * 1024 * 10,
    fileSize: 1024 * 1024 * 100,
  },
});

// Upload Middleware for Avatars
const uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter: fileFilter,
  limits: {
    fieldNameSize: 500,
    fileSize: 1024 * 1024 * 10,
  },
});

module.exports = {
  uploadPost,
  uploadAvatar,
};
