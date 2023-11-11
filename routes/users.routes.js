const express = require("express");
const {
  modify_photo_profile,
  profile,
} = require("../controllers/users.controller");
const { isAuthenticate, isAuthorize, isUserAvail } = require("../middleware");

const router = express.Router();
const storage = require("../libs/multer");
router.get(
  "/users/:id/photo_profile",
  [isUserAvail, isAuthenticate, isAuthorize],
  profile
);
router.put(
  "/users/:id/photo_profile",
  [isUserAvail, isAuthenticate, isAuthorize, storage.image.single("image")],
  modify_photo_profile
);

module.exports = router;
