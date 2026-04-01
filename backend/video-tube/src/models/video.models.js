
import mongoose, { Schema } from "mongoose";

const mediaSchema = new mongoose.Schema({
  url: {
    type: String,
    trim: true,
    require: true
  },
  public_id: {
    type: String,
    trim: true,
  },
});


const videoSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      reff: "User",
      required: true,
    },
    videoFile: {
      type: mediaSchema,
    },
    thumbnail: {
      type: mediaSchema,
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
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Video = mongoose.model("Video", videoSchema);
