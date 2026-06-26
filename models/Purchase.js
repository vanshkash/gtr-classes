import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    noteId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Note",
  required: true,
},

    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
    },

    razorpayPaymentId: {
      type: String,
      required: true,
      unique: true,
    },

    razorpaySignature: {
      type: String,
      required: true,
    },

   amount: {
  type: Number,
  required: true,
},

    status: {
      type: String,
      enum: ["paid", "failed", "refunded"],
      default: "paid",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Purchase ||
  mongoose.model("Purchase", purchaseSchema);