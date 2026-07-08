import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      required: true,
    },

    otpExpires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Automatically delete document after expiry
pendingUserSchema.index(
  { otpExpires: 1 },
  { expireAfterSeconds: 0 }
);

export default mongoose.models.PendingUser ||
  mongoose.model("PendingUser", pendingUserSchema);