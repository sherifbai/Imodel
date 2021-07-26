const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    title: {
      type: String,
    },
    city: {
      type: String,
    },
    district: {
      type: String,
    },
    category: {
      type: String,
    },
    deadline: {
      type: Date,
    },
    budget: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "completed", "moderate"],
      default: "active",
    },
    takenBy: {
      type: Schema.Types.ObjectId,
      ref: "Model",
    },
    orderBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
