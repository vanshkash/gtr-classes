import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      default: "",
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: null,
    },
    type: {
      type: String,
      enum: ["notes", "test-series"],
      default: "notes",
    },

    price: {
      type: Number,
      default: 0,
    },

    pdfUrl: {
      type: String,
      required: true,
    },

    cloudinaryId: {
      type: String,
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Note || mongoose.model("Note", noteSchema);
