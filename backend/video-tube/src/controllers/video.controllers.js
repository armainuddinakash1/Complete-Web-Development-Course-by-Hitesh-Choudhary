import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }
  // get all videos based on query, sort, pagination
  const filter = { isPublished: true };
  if (query) {
    filter.$or = [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ];
  }
  if (userId) {
    filter.owner = userId;
  }
  const sortOptions = {};
  if (sortBy) {
    sortOptions[sortBy] = sortType === "desc" ? -1 : 1;
  } else {
    sortOptions.createdAt = -1; // default sort by newest
  }
  const videos = await Video.find(filter)
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  const totalVideos = await Video.countDocuments(filter);
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        videos,
        pagination: {
          total: totalVideos,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(totalVideos / limit),
        },
      },
      "Videos fetched successfully"
    )
  );
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!description) {
    description = undefined;
  }
  // get video, upload to cloudinary, create video
  const videoPath = req.files?.video?.[0]?.path;
  if (!videoPath) {
    throw new ApiError(400, "Video file is required");
  }

  if (!req.files?.video[0]?.originalname.match(/\.(mp4|mov|avi|mkv)$/)) {
    throw new ApiError(
      400,
      "Invalid video file format. Allowed formats: mp4, mov, avi, mkv"
    );
  }
  const videoFile = await uploadOnCloudinary(videoPath, "video");

  const thumbnailPath = req.files?.thumbnail?.[0]?.path;
  let thumbnail = undefined;
  if (thumbnailPath) {
    if (!req.files.thumbnail[0].originalname.match(/\.(jpg|jpeg|png)$/)) {
      throw new ApiError(
        400,
        "Invalid thumbnail file format. Allowed formats: jpg, jpeg, png"
      );
    }
    thumbnail = await uploadOnCloudinary(thumbnailPath, "image");
    thumbnail = { url: thumbnail.secure_url, public_id: thumbnail.public_id };
  }
  const video = await Video.create({
    owner: req.user._id,
    title,
    description,
    videoFile: { url: videoFile.secure_url, public_id: videoFile.public_id },
    thumbnail: thumbnail,
    duration: videoFile.duration,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, video, "Video published successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }
  // get video by id
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }
  // update video details like title, description, thumbnail
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to perform this action");
  }
  const { title, description } = req.body;
  if (title) video.title = title;
  if (description) video.description = description;
  if (req.file) {
    if (!req.file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      throw new ApiError(
        400,
        "Invalid thumbnail file format. Allowed formats: jpg, jpeg, png"
      );
    }
    const thumbnail = await uploadOnCloudinary(req.file.path, "image");
    video.thumbnail = {
      url: thumbnail.secure_url,
      public_id: thumbnail.public_id,
    };
  }
  await video.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }
  const video = await Video.findByIdAndDelete(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to perform this action");
  }

  // delete video
  await deleteFromCloudinary(video.videoFile.public_id, "video");
  if (video.thumbnail?.public_id) {
    await deleteFromCloudinary(video.thumbnail.public_id, "image");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to perform this action");
  }

  // toggle publish status of video
  video.isPublished = !video.isPublished;
  await video.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, video, "Publish status updated successfully"));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
