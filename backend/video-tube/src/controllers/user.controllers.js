import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Failed to generate tokens: " + error.message);
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  let avatar;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
  } catch (error) {
    throw new ApiError(500, "Failed to upload avatar");
  }

  let coverImage = undefined;
  if (coverImageLocalPath) {
    try {
      coverImage = await uploadOnCloudinary(coverImageLocalPath);
    } catch (error) {
      console.log("Error uploading cover image", error);
      throw new ApiError(500, "Failed to upload cover image");
    }
  }

  if (coverImage) {
    coverImage = {
      url: coverImage.url,
      public_id: coverImage.public_id,
    };
  }

  try {
    const user = await User.create({
      username,
      email,
      fullName,
      avatar: {
        url: avatar.url,
        public_id: avatar.public_id,
      },
      coverImage,
      password,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering a user");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  } catch (error) {
    console.log("Failed to create user");

    if (avatar) {
      await deleteFromCloudinary(avatar.public_id);
    }

    if (coverImage) {
      await deleteFromCloudinary(coverImage.public_id);
    }

    throw new ApiError(
      500,
      "Something went wrong while registering a user and deleted the images",
      [error]
    );
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(400, "Refresh token is required");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const user = await User.findById(decodedToken?._id).select("-password");

  if (!user) {
    throw new ApiError(401, "Invalid refresh token - user not found");
  }

  if (user.refreshToken !== incomingRefreshToken) {
    throw new ApiError(401, "Invalid refresh token - token mismatch");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user,
          accessToken,
          refreshToken,
        },
        "Access token refreshed successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;

  await User.findByIdAndUpdate(user._id, { $unset: { refreshToken: 1 } });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  const user = req.user;
  const { currentPassword, newPassword } = req.body;

  const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid credentials");
  }

  if (!newPassword || newPassword.trim() === "") {
    throw new ApiError(400, "New password is required");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully"));
});

// const getUser = asyncHandler(async (req, res) => {
//   const userId = req.params.id;

//   const user = await User.findById(userId).select("-password -refreshToken");

//   if (!user) {
//     throw new ApiError(404, "User not found");
//   }

//   return res
//     .status(200)
//     .json(new ApiResponse(200, { user }, "User fetched successfully"));
// });

const getUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "User fetched successfully"));
});

const updateUser = asyncHandler(async (req, res) => {
  const user = req.user;
  const { fullName, email } = req.body;

  const payload = {};
  if (fullName && fullName.trim()) payload.fullName = fullName.trim();
  if (email && email.trim()) payload.email = email.trim();

  if (Object.keys(payload).length === 0)
    throw new ApiError(400, "At least one field is required");

  const updatedUser = await User.findByIdAndUpdate(user._id, payload, {
    new: true,
    runValidators: true,
  }).select("-password -refreshToken");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: updatedUser },
        "User details updated successfully"
      )
    );
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const user = req.user;
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  try {
    await deleteFromCloudinary(user.avatar.public_id);
  } catch (error) {
    console.log("Error deleting old avatar from Cloudinary:", error);
    // Continue with upload even if deletion fails
    logger.error(
      `Failed to delete old avatar from Cloudinary for user ${user._id} (publicId: ${user.avatar.public_id}): `,
      error
    );
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(500, "Error uploading avatar");
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { avatar: { url: avatar.url, public_id: avatar.public_id } },
    { new: true, runValidators: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: updatedUser }, "Avatar updated successfully")
    );
});

const updateCoverImage = asyncHandler(async (req, res) => {
  const user = req.user;
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image file is required");
  }

  if (user.coverImage?.public_id) {
    try {
      await deleteFromCloudinary(user.coverImage.public_id);
    } catch (error) {
      // Continue with upload even if deletion fails
      logger.error(
        `Failed to delete old cover image from Cloudinary for user ${user._id} (publicId: ${user.coverImage.public_id}): `,
        error
      );
    }
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!coverImage) {
    throw new ApiError(500, "Error uploading cover image");
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { coverImage: { url: coverImage.url, public_id: coverImage.public_id } },
    { new: true, runValidators: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: updatedUser },
        "Cover image updated successfully"
      )
    );
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) {
    throw new ApiError(400, "Username is required");
  }
  const channel = await User.aggregate([
    { $match: { username: username.trim().toLowerCase() } },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscriptions",
      },
    },
    {
      $addFields: {
        subscriberCount: { $size: "$subscribers" },
        subscriptionCount: { $size: "$subscriptions" },
        isSubscribed: {
          $cond: {
            if: { $in: [req.user._id, "$subscribers.subscriber"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        email: 1,
        username: 1,
        fullName: 1,
        avatar: 1,
        coverImage: 1,
        subscriberCount: 1,
        subscriptionCount: 1,
        isSubscribed: 1,
      },
    },
  ]);

  if (!channel?.length) {
    throw new ApiError(404, "Channel not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { channel: channel[0] },
        "Channel profile fetched successfully"
      )
    );
});

const getWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    { $match: { _id: req.user._id } },
    { $unwind: "$watchHistory" },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "videoDetails",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "ownerDetails",
              pipeline: [
                {
                  $project: {
                    username: 1,
                    fullName: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      $project: {
        video: 1,
        videoDetails: 1,
      },
    },
    {
      $addFields: {
        owner: { $arrayElemAt: ["$videoDetails.ownerDetails", 0] },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { watchHistory: user || [] },
        "Watch history fetched successfully"
      )
    );
});

export {
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
};
