import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    comment: {
      type: Schema.Types.ObjectId,
      reff: "Comment",
    },
    video: {
      type: Schema.Types.ObjectId,
      reff: "Video",
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      reff: "User",
      required: true,
    },
    tweet: {
      type: Schema.Types.ObjectId,
      reff: "Tweet",
    },
  },
  {
    timestamps: true,
  }
);

likeSchema.pre("validate", function (next) {
  const fields = [this.video, this.comment, this.tweet].filter(Boolean);
  if (fields.length !== 1) {
    next(new Error("A like must reference exactly one of: video, comment, or tweet."));
  } else {
    next();
  }
});

export const Like = mongoose.model("Like", likeSchema);
