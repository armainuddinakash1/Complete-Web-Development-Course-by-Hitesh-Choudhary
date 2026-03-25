import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  changePassword,
  getUser,
  updateUser,
  updateUserAvatar,
  updateCoverImage,
  getWatchHistory,
  getUserChannelProfile,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Unsecured routes
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);

// Secured routes
router.use(verifyJWT);

router.route("/logout").post(logoutUser);
router.route("/me").get(getUser);
router.route("/update-user").patch(updateUser);
router.route("/c/:username").get(getUserChannelProfile);
router.route("/history").get(getWatchHistory);
router.route("/avatar").patch(upload.single("avatar"), updateUserAvatar);
router.route("/cover-image").patch(upload.single("coverImage"), updateCoverImage);
router.route("/password").patch(changePassword);

export default router;
