import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      reff: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    video: {
      type: Schema.Types.ObjectId,
      reff: "Video",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment", commentSchema);
