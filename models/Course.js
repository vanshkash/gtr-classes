import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    description: String,
    thumbnail: String,
    price: Number,
    isFree: Boolean,
    features: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Course ||
  mongoose.model("Course", CourseSchema);