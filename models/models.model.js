const mongoose = require("mongoose");

const { Schema } = mongoose;

const modelsSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active",
    },
    type: {
      type: String,
      enum: ["model"],
    },
    lastName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    gender: {
      type: String,
    },
    city: {
      type: String,
    },
    region: {
      type: String,
    },
    age: {
      type: String,
    },
    height: {
      type: String,
    },
    hairColor: {
      type: String,
    },
    eyes: {
      type: String,
    },
    shoeSize: {
      type: String,
    },
    dressSize: {
      type: String,
    },
    about: {
      type: String,
    },
    hip: {
      type: String,
    },
    waist: {
      type: String,
    },
    chest: {
      type: String,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    isPhoneProof: {
      type: Boolean,
      default: false,
    },
    invitedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    code: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Model", modelsSchema);
