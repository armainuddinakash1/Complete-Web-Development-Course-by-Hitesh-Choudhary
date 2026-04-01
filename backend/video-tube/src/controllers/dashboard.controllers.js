import mongoose from "mongoose";
import { Video } from "../models/video.models.js";
import { Subscription } from "../models/subscription.models.js";
import { Like } from "../models/like.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Get total videos
  const totalVideos = await Video.countDocuments({ owner: userId });

  // Get total views across all videos
  const videoStats = await Video.aggregate([
    { $match: { owner: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: null, totalViews: { $sum: "$views" } } },
  ]);

  const totalViews = videoStats.length > 0 ? videoStats[0].totalViews : 0;

  // Get total subscribers
  const totalSubscribers = await Subscription.countDocuments({
    channel: userId,
  });

  // Get total likes on videos
  const likeStats = await Like.aggregate([
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "videoDetails",
      },
    },
    {
      $match: {
        videoDetails: { $ne: [] },
        "videoDetails.owner": new mongoose.Types.ObjectId(userId),
      },
    },
    { $group: { _id: null, totalLikes: { $sum: 1 } } },
  ]);

  const totalLikes = likeStats.length > 0 ? likeStats[0].totalLikes : 0;

  const stats = {
    totalVideos,
    totalViews,
    totalSubscribers,
    totalLikes,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, stats, "Channel stats fetched successfully"));
});

const getChannelVideos = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const videos = await Video.find({ owner: userId }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Channel videos fetched successfully"));
});

export { getChannelStats, getChannelVideos };
