import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      reff: "User",
      required: true,
    },
    videoFile: {
      type: string,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

export const Video = mongoose.model("Video", videoSchema);
