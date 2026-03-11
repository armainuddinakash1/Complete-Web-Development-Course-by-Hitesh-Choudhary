import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId,
      reff: "User",
      required: true,
    },
    channel: {
      type: Schema.Types.ObjectId,
      reff: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
