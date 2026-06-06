import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    youtubeId: {
      type: String,
      required: true,
    },

    notesUrl: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Lecture =
  mongoose.models.Lecture ||
  mongoose.model("Lecture", LectureSchema);

export default Lecture;