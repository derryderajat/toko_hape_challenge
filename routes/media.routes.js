const router = require("express").Router();

const {
  storageImage,
  storageImages,
  storageVideo,
  storageFile,
} = require("../controllers/media.controllers");
const storage = require("../libs/multer");

router.post("/image", [storage.image.single("image")], storageImage);
// router.post("/images", storage.image.array("images", 3), storageImages);
// router.post("/videos", storage.video.single("video"), storageVideo);
// router.post("/files", storage.file.single("file"), storageFile);

module.exports = router;
